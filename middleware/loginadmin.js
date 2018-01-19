import Cookies from 'js-cookie'
import Cookie from 'cookie'
import jwt from 'json-web-token'

export default async ({res, req, redirect, store}) => {
    const cookieStr = !process.server ? document.cookie : req.headers.cookie;
    const cookies = Cookie.parse(cookieStr || '') || {};
    if (typeof  cookies !== 'undefined')
        if (typeof cookies.token === 'undefined' || cookies.token.length < 10) {
            redirect('/quan-tri/dang-nhap');
        }
        else {
            await store.commit('updateToken', cookies.token);
            await store.commit('updateAdminInfo', {
                name: cookies.adminName,
                role: cookies.adminRole,
                email: cookies.adminEmail,
            });
            if (typeof  cookies.selectedChain !== 'undefined' && cookies.selectedChain !== '') {
                await jwt.decode(process.env.jwt_KEY, cookies.selectedChain, async (error, data) => {
                    if (!error) {
                        await store.commit('updateAdminSelectedChain', data);
                    }
                })
            }

        }
}
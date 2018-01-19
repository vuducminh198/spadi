import Cookies from 'js-cookie'
import Cookie from 'cookie'

export default ({res, req, redirect, store, isServer}) => {
    const cookieStr = !process.server ? document.cookie : req.headers.cookie;
    const cookies = Cookie.parse(cookieStr || '') || {};
    if (typeof  cookies.token !== 'undefined' && cookies.token.length > 10) {
        store.commit('updateToken', cookies.token);
        store.commit('updateAdminInfo', {
            name: cookies.adminName,
            role: cookies.adminRole,
            email: cookies.adminEmail,
        });
        redirect('/quan-tri');
    }

}
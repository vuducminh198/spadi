import Vuex from 'vuex'
import Cookies from 'js-cookie'
import Cookie from 'cookie'
import jwt from 'json-web-token'

const inBrowser = typeof window !== 'undefined'
const createStore = () => {
    return new Vuex.Store({
        state: {
            currentLocation: {lat: 21.018125, lng: 105.828708},
            ClientRole: '',
            ClientInfo: {
                name: '',
                email: '',
                phone: '',
            },
            ClientToken: '',
            AdminRole: '',
            AdminInfo: {
                name: '',
                emain: '',
                phone: ''
            },
            AdminToken: '',
            adminSelectedChain: {},
            ClientCartNumber: 0,
            currentShopId:''
        },
        mutations: {
            updateCurrentShopID(state,newCurrentShopID){
                state.currentShopId = newCurrentShopID;
            },
            updateClientCartNumber(state, newClientUserCart) {
                state.ClientCartNumber = newClientUserCart;
            },
            updateAdminSelectedChain(state, newAdminSelectedChain) {
                state.adminSelectedChain = newAdminSelectedChain;
            },
            updateCurrentLocation(state, newLocation) {
                state.currentLocation = newLocation;
            },
            updateClientRole(state, newClientRole) {
                state.ClientRole = newClientRole
            },
            updateClientInfo(state, newClientInfo) {
                state.ClientInfo = newClientInfo;
            },
            updateClientToken(state, newClientToken) {
                state.ClientToken = newClientToken;
            },
            updateAdminRole(state, newAdminRole) {
                state.AdminRole = newAdminRole;
            },
            updateAdminInfo(state, newAdminInfo) {
                state.AdminInfo = newAdminInfo
            },
            updateAdminToken(state, newAdminToken) {
                state.AdminToken = newAdminToken
            }
        },
        actions: {
            nuxtServerInit({commit}, {isServer, res, query, req, redirect}) {
                if (isServer && !req) return;
                const cookieStr = inBrowser ? document.cookie : req.headers.cookie;
                const cookies = Cookie.parse(cookieStr || '') || {};
                if (typeof cookies.AdminToken !== 'undefined') commit('updateAdminToken', cookies.AdminToken);
                if (typeof cookies.ClientToken !== 'undefined') commit('updateClientToken', cookies.ClientToken);
                if (typeof cookies.AdminInfo !== 'undefined') {
                    jwt.decode(process.env.jwt_KEY, cookies.AdminInfo, async (jwrError, jwtData) => {
                        redirect(`/to/${jwtData}`)
                        if (!jwrError) await commit('updateAdminInfo', jwtData);
                    });
                }
                if (typeof cookies.ClientInfo !== 'undefined') {
                    jwt.decode(process.env.jwt_KEY, cookies.ClientInfo, async (jwrError, jwtData) => {
                        if (!jwrError) await commit('updateClientInfo', jwtData);
                    });
                }

                if (typeof cookies.AdminRole !== 'undefined') commit('updateAdminRole', cookies.AdminRole);
                if (typeof cookies.ClientRole !== 'undefined') commit('updateClientRole', cookies.ClientRole);
            },
        }
    })
}

export default createStore
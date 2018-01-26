import Vue from 'vue'
import VueResource from 'vue-resource'
import Cookies from 'js-cookie'
import Cookie from 'cookie'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main';
import VueClipboard from 'vue-clipboard2'
import hintPickChain from '~/components/hintPickChain.vue'
import shareOn from '~/components/shareOn.vue'
import moment from 'moment'
import timeCountDown from '~/components/timeCountDown.vue'

export const EB = new Vue();
import VueFroala from 'vue-froala-wysiwyg'
import grebtn from '~/components/buttonGreen.vue'
import btnGetCode from '~/components/getCode.vue'

export default ({store, res, req, isServer}) => {

    Vue.filter('fullTime', function (value) {
        if (!value) return ''

        return moment(value).format('DD-MM-YYYY HH:mm:ss')
    });
    Vue.filter('fullTimeVN', function (value) {
        if (!value) return ''

        return moment(value).format('HH:mm:ss DD-MM-YYYY')
    });
    Vue.filter('emailHide', function (value) {
        let Data = value.toString().split('@');
        return Data[0].substring(0, Data[0].toString().length - 3) + '***' + Data[1];
    });
    Vue.filter('VN', function (_number) {
        if (_number == null || typeof _number === 'undefined') _number = '0'
        var resString = ''
        var counter = 0
        var param = (_number.toString().split('.').join('')).toString().split(',').join('.').split('.')
        for (let i = param[0].length - 1; i >= 0; i--) {
            resString = param[0][i] + resString
            counter++
            if (counter % 3 == 0 && i != 0 && param[0][i - 1] !== '-') resString = '.' + resString
        }
        return (resString + (typeof param[1] == 'undefined' ? '' : ',' + param[1]))

    })

    function getAdminToken() {
        return store.state.token;
    }

    Vue.component('timeCountDown', timeCountDown);
    Vue.component('hint', hintPickChain);
    Vue.component('grebtn', grebtn);
    Vue.component('btnCode', btnGetCode);
    Vue.component('shareOn', shareOn);

    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyDaQphUDH1sEa2vEGxZmnF77G089b-Iql8',
            libraries: 'places'
        }
    })

    Vue.use(VueFroala);
    Vue.use(VueClipboard);
    if (!isServer)
        Vue.use(require('vue-js-modal'));
    Vue.use(VueResource);

    Vue.prototype.EB = EB;
    Vue.prototype.cf = () => {
        return {
            headers: {Authorization: 'Bearer ' + store.state.ClientToken}
        }
    };
    Vue.prototype.cfA = () => {
        return {
            headers: {Authorization: `Bearer ${store.state.AdminToken}`}
        }
    }
    Vue.prototype.isClientUser = () => {
        if (store.state.ClientRole === store.state.ClientInfo.role && store.state.ClientRole === 'user') return true;
        return false;
    }
    Vue.prototype.isClientManager = () => {
        if (store.state.ClientRole === store.state.ClientInfo.role && store.state.ClientRole === 'manager') return true;
        return false;
    }
    Vue.prototype.isAdministrator = () => {
        if (store.state.AdminRole === store.state.AdminInfo.role && store.state.AdminRole === 'admin') return true;
        return false;
    }
    Vue.prototype.currentHref = () => {
        if (isServer) return req.header;
        else return window.location.href;
    }
    Vue.prototype.img_base = process.env.IMAGE_BASE;
    Vue.prototype.sortText = (input, length = 30) => {
        if (input.length <= length) return input;
        else return input.substring(0, length - 1) + '...';
    }
    Vue.prototype.currentChain = () => {
        return store.state.adminSelectedChain;
    }
    Vue.prototype.chromeAlert = (tt, body, open) => {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                var notify = new Notification(
                    tt, {
                        body: body,
                        icon: '',
                    }
                );
                setTimeout(() => {
                    notify.close()
                }, 20000);
                notify.onclick = function () {
                    window.open(open);
                    notify.close()
                };
            }
        });
    }

    Vue.prototype.getCookie = (name) => {
        const cookieStr = document.cookie;
        const cookies = Cookie.parse(cookieStr || '') || {};
        return cookies[name];
    }
    Vue.prototype.setCookie = (name, value) => {
        document.cookie = `${name}=${value};path=/`
    }
    if (process.browser) {
        function onPositionReceived(position) {
            EB.$emit('updateCurrentLocation', position);
        }

        EB.$on("getCurrentLocation", () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(onPositionReceived);
            }
        });
    }


}
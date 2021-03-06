import Vue from 'vue'
import VueResource from 'vue-resource'
import Cookies from 'js-cookie'
import Cookie from 'cookie'

import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main';
import VueClipboard from 'vue-clipboard2'
import VueCookie from 'vue-cookies'

import hintPickChain from '~/components/hintPickChain.vue'
import shareOn from '~/components/shareOn.vue'
import moment from 'moment'
import timeCountDown from '~/components/timeCountDown.vue'
import VueFroala from 'vue-froala-wysiwyg'
import grebtn from '~/components/buttonGreen.vue'
import btnGetCode from '~/components/getCode.vue'
import comment from '~/components/comment.vue'


export const EB = new Vue();

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
    Vue.component('c-comment',comment);
    //---------------------------------
    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyDaQphUDH1sEa2vEGxZmnF77G089b-Iql8',
            libraries: 'places'
        }
    })
    Vue.use(VueCookie);
    Vue.use(VueFroala);
    Vue.use(VueClipboard);
    if (!isServer)
        Vue.use(require('vue-js-modal'));
    Vue.use(VueResource);
    Vue.prototype.GMAPKEY = () => {
        return 'AIzaSyCMA6JcfyLSeW1SlC-bzFps0621KLqmNTM';
    }
    Vue.prototype.EB = EB;
    Vue.prototype.CreateSlug = (value) => {
        if (typeof value === 'undefined') {
            return ''
        }
        value = value
            .toString()
            .toLowerCase()
        value = value.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
        value = value.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
        value = value.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
        value = value.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
        value = value.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
        value = value.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
        value = value.replace(/đ/g, 'd')
        return value
    }
    Vue.prototype.finalPrice = (obj) => {
        if (obj.type === 'percent') {
            let currentPrice = parseInt(obj.price);
            let currentSale = (currentPrice / 100) * parseInt(obj.value);
            return currentPrice - currentSale;
        }
        else return parseInt(obj.price) - parseInt(obj.value);
    },
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
    Vue.prototype.finalPrice = (value) => {
        let price = value.price;
        let sub = value.value;
        if (value.type === "percent") {
            sub = price / sub;
        }
        return price - sub;
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
    // Vue.prototype.getCookie = (name) => {
    //     return window.localStorage.getItem(name);
    // }
    // Vue.prototype.setCookie = (name, value) => {
    //     window.localStorage.setItem(name,value);
    // }
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
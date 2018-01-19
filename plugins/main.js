import Vue from 'vue'
import VueResource from 'vue-resource'
import Cookies from 'js-cookie'
import Cookie from 'cookie'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main';
import VueClipboard from 'vue-clipboard2'
import hintPickChain from '~/components/hintPickChain.vue'

export const EB = new Vue();
import VueFroala from 'vue-froala-wysiwyg'
import grebtn from '~/components/buttonGreen.vue'
import btnGetCode from '~/components/getCode.vue'


export default ({store, res, req, isServer}) => {
    function getAdminToken() {
        return store.state.token;
    }

    Vue.component('hint', hintPickChain);
    Vue.component('grebtn', grebtn);
    Vue.component('btnCode',btnGetCode);
    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyDaQphUDH1sEa2vEGxZmnF77G089b-Iql8',
            libraries: 'places'
        }
    })

    Vue.use(VueFroala);
    Vue.use(VueClipboard);

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
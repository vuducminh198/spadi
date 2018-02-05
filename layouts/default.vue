<template>
    <div>
        <nuxt/>
        <div id="fb-root"></div>
    </div>
</template>

<script>
    import {EB} from '../plugins/main'
    import Vue from 'vue'
    import $ from 'jquery'


    export default {
        name: 'base',
        asyncData() {

            if (process.browser) {

            }
            return {
                yourAddress: 'Hà Nội'
            }
        },
        beforeMount() {
            $(document).ready(() => {
                (function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.10&appId=109366119746669";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            })
            if (process.browser) {
            

            }
        }
    }
</script>

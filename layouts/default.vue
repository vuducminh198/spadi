<template>
    <nuxt/>
</template>

<script>
    import {EB} from '../plugins/main'
    import Vue from 'vue'


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
            if (process.browser) {
                this.EB.$on('updateCurrentLocation', (data) => {
                    this.$store.commit('updateCurrentLocation', {
                        lat: data.coords.latitude,
                        lng: data.coords.longitude
                    });
                    document.cookie = 'currentLocation='+data.coords.latitude+'-'+data.coords.longitude;
                })

            }
        }
    }
</script>

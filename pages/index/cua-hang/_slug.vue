<template>
    <div class="container" style="margin-top:20px;">

            <template v-if="!mainData.isError">
                <div class="col-sm-3  col-md-3 sidebar " style="padding:0; background-color:white">
                    <img :src="img_base+mainData.shopInfo.logo" style="width:100%;">
                    <ul class="sidebar-menu" style="background-color:white;">
                        <li style="cursor: pointer" @click="$router.push(`/cua-hang/${mainData.shopInfo.slug}`)">
                            <a>
                                <div style=" padding-left:10px; color:#FF5151; font-size:16px; font-family: 'Open Sans'; font-weight: bold">
                                    {{mainData.shopInfo.name}}
                                </div>
                            </a>
                        </li>
                        <nuxt-link tag="li" class="pageLink" :to="`/cua-hang/${mainData.shopInfo.slug}/coupon/`">
                            <a>
                                <i class="material-icons"></i>
                                <span class="page">COUPON</span>
                            </a>
                        </nuxt-link>
                        <nuxt-link tag="li" class="pageLink" :to="`/cua-hang/${mainData.shopInfo.slug}/deal/`">
                            <a>
                                <i class="material-icons"></i>
                                <span class="page">DEAL</span>
                            </a>
                        </nuxt-link>
                        <nuxt-link tag="li" class="pageLink" :to="`/cua-hang/${mainData.shopInfo.slug}/san-pham/`">
                            <a>
                                <i class="material-icons"></i>
                                <span class="page">SẢN PHẨM</span>
                            </a>
                        </nuxt-link>
                        <nuxt-link tag="li" class="pageLink" :to="`/cua-hang/${mainData.shopInfo.slug}/tin-tuc/`">
                            <a>
                                <i class="material-icons"></i>
                                <span class="page">TIN TỨC</span>
                            </a>
                        </nuxt-link>
                        <nuxt-link tag="li" class="pageLink" :to="`/cua-hang/${mainData.shopInfo.slug}/danh-gia`">
                            <a>
                                <i class="material-icons"></i>
                                <span class="page">ĐÁNH GIÁ</span>
                            </a>
                        </nuxt-link>
                    </ul>
                </div>
                <div class="col-sm-9 col-md-9 mx4">
                    <div style="position: relative">
                        <nuxt-child></nuxt-child>
                    </div>
                </div>
            </template>
            <div v-else>
            </div>


    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        head: {
            bodyAttrs: {
                class: 'hold-transition skin-blue sidebar-mini'
            }
        },
        async asyncData({route, redirect, store}) {
            let mainData = {};
            if (route.params.slug === 'quan-tri') {
                mainData.isAdmin = true;
                return {mainData}
            }
            if (route.params.slug !== 'undefined') {
                await axios.get(process.env.API.Chain_publicGetDetailByData + route.params.slug)
                    .then(res => {
                        if (typeof res.data === 'undefined' || res.data === null) {
                            mainData.isError = true
                            redirect('/404');
                        }
                        else {
                            mainData.shopInfo = res.data;
                            store.commit('updateCurrentShopID', res.data._id);
                        }
                    })
                    .catch(error => {
                        mainData.isError = true
                        redirect('/404');
                    })
            }
            else {
                mainData.isError = true;
            }
            mainData.isAdmin = false;
            return {mainData};
        },
        data() {
            return {}
        }
    }
</script>
<style>
    @media (max-width: 768px) {
        .mx4 {
            padding: 0 !important;
        }
    }
</style>
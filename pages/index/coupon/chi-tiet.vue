<template>
    <div class="container">
        <div style="padding:20px;" class="box" v-if="typeof comment!=='undefined'">
            <span><span class="material-icons">face</span>Opps! Coupon không tồn tại</span>
        </div>
        <div v-if="typeof data!=='undefined'">
            <pre>{{data}}</pre>
            <div class="row">

                <div class="col-sm-8">

                    <img :src="img_base+data.images[0]">
                    <span></span>
                </div>
                <div class="col-sm-4">
                    <div class="box" style="padding:30px; border-top:0px;">
                        <btnCode title="LẤY COUPON"></btnCode>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        async asyncData({app, query, route}) {
            if (typeof query.s !== 'undefined') {
                let CouponData = await app.$axios.$get(process.env.API.Coupon_PublicGetDetail + query.s);
                return {
                    data: CouponData,
                    comment: '',
                    currentURLPath: 'vuducminhp@gmail.com'
                }
            }
            else {
                return {comment: 'Coupon không tồn tại.'}
            }
        },
        head() {
            return {
                title: this.data.title,
                meta: [
                    {'http-equiv': 'Content-Language', content: 'vi'},
                    {'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8'},
                    {name: 'description', content: '123'},
                    {name: 'og:locale', content: 'vi_VN'},
                    {name: 'og:type', content: 'article'},
                    {name: 'og:title', content:  '123'},
                    {name: 'og:description', content:  '123'},
                    {name: 'og:url', content:  '123'},
                    {name: 'og:site_name', content:  '123'},
                    {name: 'og:image', content: process.env.IMAGE_BASE +  '123'},
                    {name: 'og:image:width', content: '650'},
                    {name: 'og:image:height', content: '650'},

                ]
            }
        },
        data() {

        }
    }
</script>
<template>
    <div class="container">
        List Coupon
        <template v-if="typeof  listCoupon!=='undefined'">
            <pre>{{listCoupon}}</pre>
            <div v-for="item in listCoupon">

                <button @click="$router.push(`/coupon/chi-tiet?s=${item.slug}`)">{{item.slug}}</button>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
        head: {
            title: 'Coupon - Spadi.vn'
        },
        async asyncData({app}) {
            let data = await app.$axios.$get(process.env.API.Coupon_PublicGet);
            return {listCoupon: data}
        },
        data(){
            return {

            }
        }
    }
</script>
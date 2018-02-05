<template>
    <div class="container">
        <label style="font-size:32px; margin-top:20px;">TÌM KIẾM</label>
        <div class="row" style="margin-top:20px;">
            <div class="col-sm-4 col-md-3">
                <div style="background-color:white; min-height:100px; padding:20px;">
                    <form v-if="typeof $route.query.q!=='undefined'" @submit="m_Searching($event)">
                        <el-input clearable v-model="v.keyword"></el-input>
                    </form>
                    <br/>
                    <label class="bold" style="font-size:16px; font-family: 'Open Sans'">TÔI MUỐN TÌM</label><br>
                    <el-radio v-model="v.selectedType" label="all" style="font-size:16px;">Tất cả</el-radio>
                    <br>
                    <el-radio v-model="v.selectedType" label="shop">Cửa hàng</el-radio>
                    <br>
                    <el-radio v-model="v.selectedType" label="deal">Deal</el-radio>
                    <br>
                    <el-radio v-model="v.selectedType" label="coupon">Coupon</el-radio>
                    <br>
                    <el-radio v-model="v.selectedType" label="product">Sản phẩm</el-radio>
                    <br>
                    <el-radio v-model="v.selectedType" label="new">Tin tức</el-radio>
                    <br>
                </div>
            </div>
            <div class="col-md-9 col-sm-8" style="padding:0;">
                <div style="background-color:white; padding:20px; min-height:100px; "
                     v-if="typeof $route.query.q==='undefined'">
                    <input class="form-control" placeholder="Nhập từ khóa tìm kiếm!" v-model="v.keyword"
                           style="width:100%; margin-top:30px; padding:10px; "/>
                    <div class="text-center" style="width:100%; margin-top:20px; font-size:24px;">
                        <button class="btn" @click="m_Searching()">Tìm kiếm</button>
                    </div>
                </div>

                <div v-else>
                    <div v-if="mainData.data.chain.length>0  && v.selectedType==='all' || v.selectedType==='shop'">
                        <label style="font-size:24px; padding-left:5px;">CỬA HÀNG</label><a href="javascript:;"
                                                                                            class="greenLink"
                                                                                            @click="$router.push('/cua-hang')">Tất
                        cả</a><br>
                        <div>
                            <div class="col-md-3 col-sm-6 col-xs-6" style="padding-left:7.5px; padding-right:7.5px;"
                                 v-for="item in mainData.data.chain">
                                <div style="background-color:white;">
                                    <div :style="`width:100%; height:180px;background-image:url(${img_base+item.cover[0]}); background-size:cover; position:relative` ">
                                        <div class="shopSmall"
                                             :style="`background-image:url(${img_base+item.logo});` ">
                                        </div>
                                        <div class="shopSmallName">{{item.name}}</div>
                                    </div>
                                    <div style="padding:10px; padding-right:0;" class="text-right">
                                        <table class="table" style="padding:0; margin:0;">
                                            <tbody style="margin:0;padding:0;">
                                            <tr style="margin:0; padding:0">
                                                <td style="border:0; border-right:1px dashed rgba(45,45,48,.2); margin:0; padding:0; text-align:left">
                                                    <div class=" rateStar">
                                                        <span class="fa fa-star"></span>
                                                        <span class="fa fa-star"></span>
                                                        <span class="fa fa-star"></span>
                                                        <span class="fa fa-star"></span>
                                                        <span class="fa fa-star"></span><br/>
                                                        <span style="font-size:12px; font-family: 'Open Sans'">  (1502 đánh giá)</span>
                                                    </div>
                                                </td>

                                                <td style="border:0; border-left:1px dashed rgba(45,45,48,.2); margin:0; padding:0; text-align:center">
                                    <span class="el-icon-view buttonFlat"
                                          @click="$router.push(`/cua-hang/${item.slug}`)"></span>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style="clear: both"></div>
                    </div>
                    <div v-if="mainData.data.coupon.length>0  && v.selectedType==='all' || v.selectedType==='coupon'">
                        <label style="font-size:24px; padding-left:5px;">COUPON</label><a href="javascript:;"
                                                                                          class="greenLink"
                                                                                          @click="$router.push('/coupon')">Tất
                        cả</a><br>
                        <div>
                            <div class="col-md-3 col-sm-6 col-xs-6" style="padding-left:7.5px; padding-right:7.5px;"
                                 v-for="item in mainData.data.coupon">
                                <pre>{{item}}</pre>

                            </div>
                        </div>
                        <div style="clear: both"></div>
                    </div>
                    <div v-if="mainData.data.deal.length>0 && v.selectedType==='all' || v.selectedType==='deal'">
                        <label style="font-size:24px; padding-left:5px;">DEAL</label><a href="javascript:;"
                                                                                        class="greenLink"
                                                                                        @click="$router.push('/deal')">Tất
                        cả</a><br>
                        <div>
                            <div class="col-md-3 col-sm-6 col-xs-6" style="padding-left:7.5px; padding-right:7.5px;"
                                 v-for="item in mainData.data.deal">
                                <div style="background-color:white; width:100%; min-height:100px; margin-bottom:15px;">
                                    <div style=" border-top:0px; text-overflow: ellipsis; border-radius: 0; background-color:white">
                                        <div :style="`width:100%; height:140px; background-size:cover; background-image:url(${img_base+item.images[0]}); position:relative`">
                                        </div>
                                        <div style="padding:10px;">
                                            <div style="font-family: 'Open Sans';   overflow:hidden; text-overflow:ellipsis; max-height:44px; height:44px;"
                                                 class="mxLinkClass" @click="$router.push(`/deal/${item.slug}`)">
                                                {{sortText(item.title,38)}}
                                            </div>
                                            <br>
                                            <span>
                    <span style="color:#ff5722;     flex-flow: row nowrap;  align-items: baseline; font-size: 30px; font-size: 2rem;font-weight: 700; font-family: 'Open Sans'">{{ finalPrice(item)| VN}}</span>&nbsp;
                                <strike>
                    <span style="font-family: 'Open Sans'; ">{{item.price| VN}}</span></strike></span>


                                            <table class="table" style="padding:0; margin:0;">
                                                <tbody style="margin:0;padding:0;">
                                                <tr style="margin:0; padding:0">
                                                    <td style="border:0; margin:0; padding:0">
                                                        <div class="pull-left rateStar">
                                                            <span class="fa fa-star"></span>
                                                            <span class="fa fa-star"></span>
                                                            <span class="fa fa-star"></span>
                                                            <span class="fa fa-star"></span>
                                                            <span class="fa fa-star"></span><br/>
                                                            <span style="font-size:10px; font-family: 'Open Sans'">  (1502 đánh giá)</span>
                                                        </div>
                                                    </td>
                                                    <td style="border:0;  width: 42px; margin:0; padding:0; text-align: center;">
                                                        <button class="buttonAddCart"
                                                                @click="EB.$emit('updateCart', item._id)">
                                                            <span class="el-icon-goods"></span>
                                                        </button>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div style="clear: both"></div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        scrollToTop: true,
        name: 'tim-kiem',
        head() {
            return {
                title: 'Tìm kiếm - Spadi.vn',
                script: [
                    {type: "text/javascript", src: "//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.min.js"}
                ],
                link: [
                    {
                        rel: "stylesheet",
                        type: "text/css",
                        href: "//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.css"
                    },
                    {
                        rel: "stylesheet",
                        type: "text/css",
                        href: "//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick-theme.css"
                    }
                ]
            }
        },
        async asyncData({query, app}) {
            let mainData = {};
            if (typeof  query.q !== 'undefined') {
                try {
                    await app.$axios.$get(process.env.API.Search_ByKeyword + query.q)
                        .then(res => {
                            mainData.data = res;
                            mainData.isError = false;
                        })
                        .catch(error => {
                            mainData.isError = true;
                        })
                } catch (error) {
                    mainData.error = 'eee';
                }
            }
            return {mainData}
        },
        data() {
            return {
                v: {
                    selectedType: 'all',
                    keyword: '',
                }
            }
        },
        beforeMount() {
            if (typeof this.$route.query.q !== 'undefined') this.v.keyword = this.$route.query.q;
        },
        mounted() {

        },
        methods: {
            m_Searching(e) {
                if (typeof e !== 'undefined') e.preventDefault();
                window.location.href = '/tim-kiem?q=' + this.v.keyword;
            }
        }
    }
</script>
<style>
    .greenLink {
        color: #439A46;
    }

    .greenLink:hover {
        text-decoration: underline;
    }

    .buttonAddCart {
        width: 40px;
        height: 40px;
        border: 0;
        background-color: rgba(45, 45, 48, .1);
        border-radius: 50vh;
    }

    .buttonAddCart:hover {
        background-color: #439A46;
    }

    .buttonAddCart:hover span {
        color: white;
    }

    .buttonAddCart span {
        font-size: 24px;
    }

    .rateStar .fa-star {
        color: #FCEB12;
        font-size: 16px;
    }

    .buttonFlat {
        color: rgba(45, 45, 48, .4);
        cursor: pointer;
        text-align: center;
        font-size: 18px;
    }

    .buttonFlat:hover {

        color: rgba(45, 45, 48, 1);
    }

    .text-head {
        font-family: 'Open Sans', Helvetica, Arial, sans-serif;
        font-size: 18px;
        font-weight: bold;

    }

    .headText {
        font-family: "Open Sans";
        position: relative;
        margin-top: 0;
        font-weight: 600;
        line-height: 1.2;
        color: #4a4a4a;
    }

    .headText:before {
        position: absolute;
        content: "";
        bottom: -0.9rem;
        left: -1.7rem;
        width: 50px;
        height: 1px;
        background-color: #dadada;
    }

    .shopSmall {
        border: 3px solid white;
        width: 80px;
        height: 80px;
        background-size: cover;
        margin: 20px;
        position: absolute;
    }

    .shopSmallName {
        color: white;
        font-family: "Open Sans";
        margin-left: 20px;
        margin-top: 110px;
        font-size: 24px;
        position: absolute;
    }

    .mxLinkClass:hover {
        text-decoration: underline;
        cursor: pointer;
    }
</style>
<template>
    <div class="container-fluid" style="padding:0;">
        <div style="background-color:white">
            <el-carousel :interval="5000">
                <el-carousel-item v-for="item in mainData.shopInfo.cover" :key="item">
                    <div class="imgCaro" :style="`background-image:url(${img_base+item})`"></div>
                </el-carousel-item>
            </el-carousel>
            <table class="" style="margin:0; padding:0; width:100%;">
                <tbody style="margin:0; padding:0;">
                <tr style="margin:0; padding:0;">
                    <td style="width:30px; border-right:.5px dashed rgba(45,45,48,.2); vertical-align: middle">
                        <span class="material-icons buttonFlat">thumb_up</span>
                    </td>
                    <td style="width:30px; border-right:.5px dashed rgba(45,45,48,.2); vertical-align: middle; padding-top:0; padding-bottom:0;">
                        <span class="material-icons buttonFlat">favorite</span>
                    </td>
                    <td style="width:30px; border-right:.5px dashed rgba(45,45,48,.2); vertical-align: middle;  padding-top:0; padding-bottom:0;">
                        <span class="material-icons buttonFlat">share</span>
                    </td>
                    <td style="width:100%;vertical-align: middle; padding-top:0; padding-bottom:0; padding-left:10px; max-width:100%; overflow: hidden">
                        <div class="pull-left rateStar">
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span style="font-size:12px; font-family: 'Open Sans'">  (1502 đánh giá)</span>
                        </div>
                    </td>
                    <td class="text-right" style="vertical-align: middle; padding-top:0; padding-bottom:0;">
                        <button class="btn" style="border-radius: 0">Gửi tin nhắn</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div style="margin-top:10px; padding:10px; margin-bottom:10px; background-color:white;">
            <table style="width:100%;">
                <tbody>
                <tr>
                    <td style="width:20%">
                        <span class="table_head_text">Sản phẩm</span>
                        <p class="value_head_text">60</p>
                    </td>
                    <td style="width:20%">
                        <span class="table_head_text">Deal</span>
                        <p class="value_head_text">11</p>
                    </td>
                    <td style="width:20%">
                        <span class="table_head_text">Coupon</span>
                        <p class="value_head_text">300</p>
                    </td>
                    <td style="width:20%">
                        <span class="table_head_text">Theo dõi</span>
                        <p class="value_head_text">96</p>
                    </td>
                    <td style="width:20%">
                        <span class="table_head_text">Thường trả lời</span>
                        <p class="">
                            Sau vài phút
                        </p>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div style="background-color:white; padding:10px;">
            <label style="font-size:24px; padding-left:5px; margin-top:14px;" v-if="mainData.listDeal.length>0">DEAL MỚI</label><a
                href="javascript:;"
                class="greenLink"
                @click="$router.push(`/cua-hang/${$route.params.slug}/deal`)">Tất
            cả</a><br>
            <div class="col-md-4 col-sm-6 col-xs-6"
                 style="padding-left:7.5px; padding-right:7.5px;position: relative; margin-right:2px;"
                 v-for="item,index in mainData.listDeal" v-if="index<3">
                <div style="background-color:white; width:100%; min-height:100px; margin-bottom:15px; box-shadow: 0px 0px 2px rgba(45,45,48,.1)">
                    <div style=" border-top:0px; text-overflow: ellipsis; border-radius: 0; background-color:white">
                        <div :style="`width:100%; height:140px; background-size:cover; background-image:url(${img_base+item.images[0]}); position:relative`">
                        </div>
                        <div style="padding:10px;">
                            <div style="font-family: 'Open Sans';   overflow:hidden; text-overflow:ellipsis; max-height:44px; height:44px;"
                                 class="mxLinkClass"
                                 @click="$router.push(`/cua-hang/${$route.params.slug}/deal/${item.slug}`)">
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
            <div style="clear:both;"></div>
            <label style="font-size:24px; padding-left:5px; margin-top:15px;" v-if="mainData.listCoupon.length>0">COUPON MỚI</label><a
                href="javascript:;"
                class="greenLink"
                @click="$router.push(`/cua-hang/${$route.params.slug}/coupon`)">Tất
            cả</a><br>
            <div class="col-md-4 col-sm-6 col-xs-6" style="padding-left:7.5px; padding-right:7.5px; "
                 v-for="item,index in mainData.listCoupon" v-if="index<3">
                <div style=" border-top:0px; padding-bottom:0;text-overflow: ellipsis; border-radius: 0; background-color:white; box-shadow: 0px 0px 2px rgba(45,45,48,.1)">
                    <div :style="`width:100%; height:180px; background-size:cover; background-image:url(${img_base+item.images[0]}); position:relative`">

                    </div>
                    <div style="padding:15px; padding-bottom:0;">
                                    <span style="margin-top:5px;"><span class="fa fa-clock-o"></span>  <time-count-down
                                            :to="item.to"></time-count-down></span>
                        <div style="font-size:18px; max-height:50px;  height:50px; text-overflow: ellipsis; overflow: hidden">
                            {{item.title}}
                        </div>
                    </div>
                    <div style="margin-top:8px;">
                        <btn-code title="XEM"
                                  @click="$router.push(`/coupon/${item.slug}`)"></btn-code>
                    </div>
                </div>
            </div>
            <div style="clear:both;"></div>
            <label style="font-size:24px; padding-left:5px; margin-top:15px;" >TIN TỨC</label><a
                href="javascript:;"
                class="greenLink"
                @click="$router.push(`/cua-hang/${$route.params.slug}/tin-tuc`)">Tất
            cả</a><br>
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
        async asyncData({route, redirect, app}) {
            let mainData = {};
            if (route.params.slug !== 'undefined') {
                await axios.get(process.env.API.Chain_publicGetDetailByData + route.params.slug)
                    .then(res => {
                        if (typeof res.data === 'undefined' || res.data === null) {
                            mainData.isError = true
                            redirect('/404');
                        }
                        else mainData.shopInfo = res.data;
                    })
                    .catch(error => {
                        mainData.isError = true
                        redirect('/404');
                    })
                if (!mainData.isError) {
                    await app.$axios.$get(process.env.API.Coupon_PublicGet + '?chain=' + mainData.shopInfo._id)
                        .then(data => {
                            mainData.listCoupon = data;
                            mainData.getCouponError = false;
                        })
                        .catch(error => {
                            mainData.getCouponError = true;
                        })
                    await app.$axios.$get(process.env.API.Deal_PublicGetByType + '?chain=' + mainData.shopInfo._id)
                        .then(data => {
                            mainData.getDealError = false;
                            mainData.listDeal = data;
                        })
                        .catch(error => {
                            mainData.getDealError = true;
                        })
                }
            }
            else {
                mainData.isError = true;
            }

            return {mainData};
        },
        data() {
            return {}
        }
    }
</script>
<style>
    .imgCaro {
        width: 100%;
        height: 300px;
        background-size: cover;
    }

    .rateStar .fa-star {
        color: #FCEB12;
        font-size: 18px;
    }

    .buttonFlat {
        color: rgba(45, 45, 48, .4);
        cursor: pointer;
        text-align: center;
        padding: 6px 8px;
    }

    .buttonFlat:hover {
        color: rgba(45, 45, 48, 1);
    }

    .table_head_text {
        font-size: 12px;
        color: rgba(45, 45, 48, .6);
    }

    .value_head_text {
        font-family: "Open Sans";
        color: #439A46;
        font-size: 18px;
        font-weight: bold;
    }

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
</style>

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
        async asyncData({route, redirect}) {
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
</style>

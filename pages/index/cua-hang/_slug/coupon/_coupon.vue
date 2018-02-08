<template>
    <div class="container-fluid">
        <div v-if="!mainData.isError">
            <div class="row">
                <div class="">
                    <div class="box" style="border:0; box-shadow: unset;border-radius: 0;" id="btnGetCode">
                        <el-carousel :interval="5000" arrow="always">
                            <el-carousel-item v-for="item in mainData.images" :key="item">
                                <div class="imgCaro" :style="`background-image:url(${img_base+item})`"></div>
                            </el-carousel-item>
                        </el-carousel>
                        <div style="padding:20px; border-radius: 0">
                            <span style="font-size:24px;">{{mainData.title}}</span>
                            <hr style="border-style:dot-dot-dash">
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="fb-like" :data-href="v.currentHref" data-layout="button_count"
                                         data-action="like"
                                         data-size="small" data-show-faces="true" data-share="true"></div>
                                    <br></div>
                                <div class="com-sm-6 align-option">
                                    <time-count-down :to="mainData.to"
                                                     style="padding-right:20px; padding-left:20px; font-family: 'Open Sans'; font-weight: bold; font-size:24px;"></time-count-down>
                                </div>
                            </div>
                            <div style="margin-bottom:20px; margin-top:20px;">
                                <btnCode title="LẤY COUPON" :loading="v.isLoading"
                                         @click="m_showCode()"></btnCode>
                                <share-on></share-on>
                            </div>

                            <label class="lb_head">Hình ảnh</label>
                            <div style="height:100px; overflow: hidden">
                                <div v-for="item in mainData.images"
                                     @click="v.imageSource = `${img_base+item}`; v.dialogImageViewer = true"
                                     :style="`background-image:url(${img_base+item}); `"
                                     class="imageClass"></div>
                            </div>
                        </div>
                    </div>
                    <div style="clear:both">

                    </div>
                    <div class="box" style="border:0; box-shadow: unset;border-radius: 0;">

                        <label class="lb_head" style="margin:20px;">ĐỊA ĐIỂM SỬ DỤNG</label>
                        <div style="clear: both"></div>
                        <div style="min-height:300px; position: relative">
                            <gmap-map style="width: 100%; height: 100%; position: absolute; left:0; top:0"
                                      :center="{lat: mainData.shop[0].latitude, lng: mainData.shop[0].longitude}"
                                      :zoom="14"
                            >

                                <gmap-marker
                                        :key="index"

                                        description="aaaaaaaaaaaaaaa"
                                        v-for="(m, index) in mainData.shop"
                                        :icon="{url: '/img/market.png',
                                               scaledSize: { width:46, height:50},
                                               stylers:[{ 'border-radius': 50}]
                                         }"

                                        :position="{lat: m.latitude, lng: m.longitude }"
                                        :clickable="true"
                                        :draggable="true"
                                        @click="center=m.position; m_showShopInfo(m)"
                                >
                                    <gmap-info-window>
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td><img :src="img_base + m.chain.logo"
                                                         style="width:40px; height:40px; border-radius: 3px;"></td>
                                                <td>
                                                    <span style="padding-left:5px; font-weight:bold;">{{m.chain.name}} - {{m.name}}</span><br>

                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>


                                    </gmap-info-window>
                                </gmap-marker>
                            </gmap-map>
                        </div>
                    </div>
                    <div class="box" style="border:0; box-shadow: unset;border-radius: 0; padding:20px;">

                        <label class="lb_head">Danh mục</label>
                        <ul>
                            <li v-for="item in mainData.serviceItem">
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <div style="clear: both"></div>
                    <div>
                        <div class="cusTab">
                            <ul>
                                <li @click="v.currentTab=1" :class="v.currentTab===1?'mxActive':''">CHI TIẾT</li>
                                <li @click="v.currentTab=2" :class="v.currentTab===2?'mxActive':''">ĐÁNH GIÁ</li>
                                <li @click="v.currentTab=3" :class="v.currentTab===3?'mxActive':''">BÌNH LUẬN</li>
                            </ul>
                        </div>
                        <div style="clear: both"></div>
                        <div class="box child-container "
                             style="padding:10px; border-top:2px solid #439A46; border-radius: 0">
                            <div style="user-select: none" v-show="this.v.currentTab===1"
                                 v-html="this.mainData.content"></div>
                            <div v-show="this.v.currentTab===3">
                                <div v-for="item in v.listComment">
                                    <table class="table" style="padding-bottom:0; margin-bottom:0">
                                        <tbody>
                                        <tr>
                                            <td style="width:70px; margin:0; padding:0;">
                                                <img src="https://www.drupal.org/files/issues/default-avatar.png"
                                                     style="width:50px; height:50px; border-radius: 50vh; margin:10px;">
                                            </td>
                                            <td>
                                                <span style="font-size:14px; font-weight: bold; color:rgba(45,45,48,.6)">{{item.user.name}} - {{item.user.email | emailHide}}</span><br/>
                                                <span style="font-size:15px;">{{item.content}}</span><br/>
                                                <span style="font-size:13px;">Lúc: {{item.createdAt | fullTimeVN}}</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <table class="table" style="padding-bottom:0; margin-bottom:0">
                                        <tbody>
                                        <tr>
                                            <td style="width:70px; margin:0; padding:0;">
                                                <img src="https://www.drupal.org/files/issues/default-avatar.png"
                                                     style="width:50px; height:50px; border-radius: 50vh; margin:10px;">
                                            </td>
                                            <td>
                                                <!--<form @submit="m_postMessage($event)">-->
                                                    <!--<label class="bold" style="font-family: 'Source Sans Pro'">Bình luận-->
                                                        <!--của bạn-->
                                                        <!--({{form.postMessage.message.toString().length}}/200) ~-->
                                                        <!--{{$store.state.ClientInfo.name}}</label>-->
                                                    <!--<el-input type="textarea"-->
                                                              <!--v-model="form.postMessage.message"></el-input>-->
                                                    <!--<div class="text-right" style="margin-top:20px;">-->
                                                        <!--<grebtn style="padding:10px; width:100px;" title="Gửi"-->
                                                                <!--:loading="v.isSending"-->
                                                                <!--type="submit"-->
                                                                <!--:icon="true" iconClass="fa fa-send"></grebtn>-->
                                                    <!--</div>-->
                                                <!--</form>-->
                                                <c-comment typeName="deal" :url_api="c_URL"  :_id="mainData._id" @callback="m_getListMessageOfCoupon"></c-comment>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
        <el-dialog :visible.sync="v.dialogImageViewer" custom-class="noBorder" top="10px">
            <div slot="title">
                <img :src="v.imageSource" style="width:100%;"></div>
        </el-dialog>
        <el-dialog :visible.sync="v.dialogShowCounpon" custom-class="noBorder" top="calc(50vh - 200px)">
            <div slot="title">

                <div style="padding:10px;">
                    <p style="width:100%; text-align: center; font-size:24px;" v-if="!v.OverCode">SỬ DỤNG MÃ COUPON BÊN
                        DƯỚI</p>
                    <p style="width:100%; text-align: center; font-size:24px;" v-if="v.OverCode">Opps! HẾT MẤT RỒI</p>
                    <br>
                    <div style="padding:10px;">

                        Chào: {{form.defaultUser.name}}<br/>
                        <div style="margin-top:10px; margin-bottom:20px; border:1px dashed rgba(45,45,48,.4); padding:10px;">
                            <table class="table" style="margin:0; padding:0; ">
                                <tbody>
                                <tr style="border:0;">
                                    <td style="border:0;">
                                        <div style="background-color:rgba(45,45,48,.1); padding:10px; width:100%; font-size:20px; color:green; ">
                                            {{v.code}}
                                        </div>
                                    </td>
                                    <td v-if="!v.OverCode" style="border:0; width:50px; ">          <span
                                            class="material-icons mxCopy" style="padding-top:10px;"
                                            v-clipboard:copy="v.code"
                                            v-clipboard:success="()=>{
                                                                                                                                     this.$message({
                                                                                                                                        type:'success',
                                                                                                                                        message:'Đã sao chép mã vào bộ nhớ đệm!'
                                                                                                                                     })
                                                                                                                                 }"
                                            v-clipboard:error="()=>{
                                                                                                                                       this.$message({
                                                                                                                                        type:'error',
                                                                                                                                        message:'Đã xảy ra sự cố, không thể sao chép!'
                                                                                                                                     })
                                                                                                                                 }"
                                    >content_copy</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <template>
                            <span style="font-size:18px; font-weight: bold; font-family: 'Open Sans'">{{mainData.title}}</span><br>
                            <span style="font-size:16px; color:rgba(45,45,48,.6);">{{mainData.description}}</span><br><br>
                            <span style="color:red; font-family: 'Open Sans'; margin-top:20px;"><br/><span
                                    class="fa fa-clock-o"></span> Còn <time-count-down
                                    :to="mainData.to"
                                    style="  font-size:18px;"></time-count-down>
                       </span>
                        </template>
                    </div>
                </div>

            </div>
        </el-dialog>
        <el-dialog :visible.sync="v.dialogShowAlert">

        </el-dialog>
        <el-tooltip content="Lấy Coupon" placement="top">
            <button @click="m_scrollTopButtonGetCoupon()" class="addCartPro">
                <span class="el-icon-news"></span>
            </button>
        </el-tooltip>
    </div>
</template>
<script>
    import $ from 'jquery'

    export default {
        scrollToTop: true,
        head() {
            return {
                title: this.mainData.title,
                meta: [
                    {name: 'description', content: this.mainData.description},
                    {name: 'og:locale', content: 'vi_VN'},
                    {name: 'og:type', content: 'article'},
                    {name: 'og:title', content: this.mainData.title},
                    {name: 'og:description', content: this.mainData.description},
                    {name: 'og:url', content: this.currentURLPath},
                    {name: 'og:site_name', content: this.mainData.title},
                    {name: 'og:image', content: process.env.IMAGE_BASE + this.mainData.images[0]},
                    {name: 'og:image:width', content: '650'},
                    {name: 'og:image:height', content: '650'},

                ],


            }
        },
        async asyncData({app, query, route, store, redirect, params}) {
            let mainData = {}
            if (typeof params.coupon !== 'undefined') {
                await app.$axios.$get(process.env.API.Coupon_PublicGetDetail + params.coupon)
                    .then(res => {
                        if (res === null) redirect(`/${params.slug}/coupon/404`);
                        else mainData = res;
                        mainData.isError = false;
                    })
                    .catch(error => {
                        mainData.isError = true;
                        redirect(`/${params.slug}/coupon/404`);
                    })
            } else redirect(`/${params.slug}/coupon/404`);
            return {mainData};
        },
        data() {
            return {
                v: {
                    dialogImageViewer: false,
                    currentHref: '',
                    imageSource: '',
                    currentTab: 1,
                    isLoading: false,
                    isSending: false,
                    dialogShowCounpon: false,
                    dialogGetInfoUser: false,
                    code: 'xxxx-xxxx-xxxx-xxxx',
                    listComment: [],
                    dialogShowAlert: false,
                    OverCode: false,
                },
                form: {
                    postMessage: {
                        message: '',
                    },
                    defaultUser: {
                        name: '',
                        phone: '',
                        email: '',
                    }
                }
            }
        },
        beforeMount() {
            this.v.currentHref = window.location.href;
            this.m_getListMessageOfCoupon();
        },
        computed:{
            c_URL(){ return process.env.API.Coupon_Comment}
        },
        methods: {
            m_showShopInfo(m) {

            },
            m_showCode() {
                if (this.$store.state.ClientInfo.role === 'user' && this.$store.state.ClientToken.toString().length > 10) this.m_finalShowCode();
                else this.v.dialogGetInfoUser = true;
            },
            m_finalShowCode() {
                let postData = {};
                let headers = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                if (this.$store.state.ClientToken.toString().length > 10) {
                    headers.headers.Authorization = `Bearer ${this.$store.state.ClientToken}`;
                    this.form.defaultUser.name = this.$store.state.ClientInfo.name;
                }
                else postData = this.form.defaultUser;
                postData._id = this.mainData._id;
                this.v.isLoading = true;
                this.$http.post(process.env.API.Coupon_GetCode, postData, headers)
                    .then(data => {

                        this.v.isLoading = false;
                        this.v.code = data.body.code || data.body.Message;
                        if (typeof  data.body.Message !== 'undefined') this.v.OverCode = true;
                        else this.v.OverCode = false;
                        this.v.dialogShowCounpon = true;
                    })
                    .catch(error => {
                        this.v.isLoading = false;
                    })
            },
            m_getListMessageOfCoupon() {
                this.$http.get(process.env.API.Coupon_PublicGetCommentByData + this.mainData._id)
                    .then(data => {
                        this.v.listComment = data.body;
                    })
                    .catch(error => {
                    })
            },
            m_postMessage(e) {
                e.preventDefault();
                let postData = {
                    _id: this.mainData._id,
                    content: this.form.postMessage.message,
                };
                let header = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                if (this.$store.state.ClientInfo.role === 'user' && this.$store.state.ClientToken.toString().length > 0)
                    header.headers.Authorization = `Bearer ${this.$store.state.ClientToken}`;
                this.v.isSending = false;
                this.$http.post(process.env.API.Coupon_Comment, postData, header)
                    .then(data => {
                        this.form.postMessage.message = '';
                        this.m_getListMessageOfCoupon();
                        this.$message({type: "success", message: 'Bình luận của bạn đã được gửi đi!'});
                    })
                    .catch(error => {
                        this.$message({
                            type: 'error',
                            message: (typeof error.body !== 'undefined' && typeof error.body.ErrorMessage !== 'undefined' ? error.body.ErrorMessage : 'Đã xảy ra sự cố, vui lòng kiểm tra và thử lại sau')
                        })
                    })

            },
            m_scrollTopButtonGetCoupon() {
                $('html,body').animate({
                        scrollTop: $("#btnGetCode").offset().top
                    },
                    'slow');
            }
        }
    }
</script>

<style scoped>
    .imageClass {
        width: 100px;
        height: 100px;
        background-size: cover;
        float: left;
        margin-right: 5px;
        cursor: pointer;
    }

    .cusTab ul li:hover {
        background-color: whitesmoke;
    }

    .cusTab ul li.mxActive {
        background-color: #439A46;
        color: white;
    }

    .imgCaro {
        width: 100%;
        height: 300px;
        background-size: cover;
    }

    .lb_head {
        font-size: 15px;
        font-weight: bold;
        text-transform: uppercase;
        font-family: "Open Sans";
    }

    .lb_head:before {
        font-family: FontAwesome;
        font-size: 16px;
        content: '\f033';
        color: #439A46;
        padding-right: 6px;
    }

    .lb_head:hover {
        text-decoration: none;
    }

    label {
        font-family: 'Open Sans';
    }

    @media (min-width: 769px) {
        .align-option {
            text-align: right;
        }
    }

    .el-dialog__close {
        color: white !important;
    }

    .mxCopy {
        margin-left: 5px;
        color: rgba(45, 45, 48, .5);
        cursor: pointer;
    }

    .mxCopy:hover {
        color: rgb(45, 45, 48);
    }

    .addCartPro {
        background-color: #439A46;
        color: white;
        position: fixed;
        bottom: 10px;
        right: 10px;
        width: 80px;
        height: 80px;
        border: 0;
        border-radius: 50vh;
        z-index: 4;
    }

    .addCartPro:hover {
        opacity: .9;
    }

    .addCartPro span {
        font-size: 50px;
    }
</style>
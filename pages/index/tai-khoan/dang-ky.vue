<template>
    <div class="text-align:center; padding-top:40px;">
        <div class="container" style="margin-top:20px;">
            <div style="padding-top:10px; padding-bottom:30px;">
                <span style="font-size: 24px; margin-top:20px; margin-bottom:30px;">ĐĂNG KÝ</span>
            </div>
            <div class="row" v-if="v.step===0">
                <div class="col-sm-6 ">
                    <div class="box" style="padding:20px; padding-bottom:30px;">
                        <div class="text-center" style="padding-top:30px; padding-bottom:30px;">
                            <span class="material-icons mxIcon">shopping_basket</span>
                        </div>
                        <div class="text-center" style="margin-top:20px;">
                            <span style="font-size:32px; font-family: 'Open Sans'">Tôi là <span
                                    style="font-weight:bold;">Người mua</span></span><br>
                            <span style="font-size:14px;">Tôi muốn mua, nhận các khuyến mãi.</span><br>
                            <button class="mxButton" @click="v.registerType=1; v.step = 1;">Đăng ký làm người mua
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 ">
                    <div class="box" style="padding:20px; padding-bottom:30px;">
                        <div class="text-center" style="padding-top:30px; padding-bottom:30px;">
                            <span class="material-icons mxIcon">shop</span>
                        </div>
                        <div class="text-center" style="margin-top:20px;">
                            <span style="font-size:32px; font-family: 'Open Sans'">Tôi là <span
                                    style="font-weight:bold;">Người bán</span></span><br>
                            <span style="font-size:14px;">Tôi khách hàng biết tôi, và các sản phẩm của tôi.</span><br>
                            <button class="mxButton" @click="v.registerType = 2; v.step = 1;">Đăng ký làm người bán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row " style="min-height:100px; margin:0px;" v-if="v.step===1">
                <div class="box" style="margin:auto; max-width: 800px; ">
                    <form @submit="m_tryRegister($event)">
                        <div class="row">
                            <div class="col-sm-5 text-center">
                                <div class="text-center" style="padding:0px 20px;  width:100%;">
                                    <template v-if="v.registerType===1">
                                        <div style="padding-top:50px; padding-bottom:30px;" class="text-center">
                                            <span class="material-icons mxIcon shadowmode">shopping_basket</span>
                                        </div>
                                        <div style="font-size:24px;">Bạn là <span
                                                style="font-weight: bold">Người mua</span>
                                        </div>
                                        <span style="font-size:14px;">Hãy điền các thông tin để chúng tôi có thể biết bạn cần gì?</span>
                                    </template>
                                    <template v-if="v.registerType===2">
                                        <div style="padding-top:50px; padding-bottom:30px;" class="text-center">
                                            <span class="material-icons mxIcon shadowmode">shop</span>
                                        </div>
                                        <div style="font-size:24px;">Bạn là <span
                                                style="font-weight: bold">Người bán</span>
                                        </div>
                                        <span style="font-size:14px;">Hãy điền các thông tin để khách hàng biết bạn là ai?</span>
                                    </template>
                                </div>
                            </div>
                            <div class="col-sm-7">
                                <div style="padding:30px; ">
                                    <label>Họ tên *</label>
                                    <el-input v-model="form.register.name"></el-input>
                                    <label>Số điện thoại *</label>
                                    <el-input v-model="form.register.phone"></el-input>
                                    <label>Địa chỉ email *</label>
                                    <el-input v-model="form.register.email"></el-input>
                                    <label>Mật khẩu *</label>
                                    <el-input type="password" v-model="form.register.password"></el-input>
                                    <label>Gõ lại mật khẩu *</label>
                                    <el-input type="password" v-model="form.register.cofirm"></el-input>
                                    <span style="font-size:14px; margin-top:4px;">
                                    <el-checkbox v-model="form.register.tempReaded"></el-checkbox>
                                    Tôi đồng ý với các <a href="javascript:;" style="text-decoration: underline"
                                                          @click="$router.push('/dieu-khoan')">điều khoản</a> của Spadi.vn
                                    </span>
                                </div>
                            </div>

                        </div>
                        <div class="row" style="padding:20px 0px 10px 30px;">
                            <a href="javascript:;" @click="v.step=0" class="back-link">
                                <span class="el-icon-arrow-left"></span>Quay lại
                            </a>
                            <button style="margin-top:0; width:200px; padding:15px;"
                                    class="mxButton registerButton  pull-right xbutton">
                                <table class="" style="margin-bottom:0; position: absolute"
                                       :style="!v.isLoading?'visibility: hidden':''">
                                    <tbody>
                                    <tr>
                                        <td style=""></td>
                                        <td style="height:22px; text-align: center; vertical-align: middle">
                                            <div class="icon-e e1"></div>
                                        </td>
                                        <td style="height:22px; text-align: center; vertical-align: middle">
                                            <div class="icon-e e2"></div>

                                        <td style="height:22px; text-align: center; vertical-align: middle">
                                            <div class="icon-e e3"></div>
                                        </td>
                                        <td style=""></td>
                                    </tr>
                                    </tbody>
                                </table>
                                <span :style="v.isLoading?'visibility: hidden':''">ĐĂNG KÝ</span>

                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row" v-if="v.step===2">
                <div class="box" style="margin:auto; max-width: 800px; background-color:white; padding:20px;">
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <div class="svg ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"
                                             viewBox="-263.5 236.5 26 26">
                                            <g class="svg-success">
                                                <circle cx="-250.5" cy="249.5" r="12"/>
                                                <path d="M-256.46 249.65l3.9 3.74 8.02-7.8"/>
                                            </g>
                                        </svg>
                                    </div>
                                </td>
                                <td>
                                    <div style="padding-left:10px;">
                                        <p style="font-size:32px;">Đăng ký tài khoản thành công</p>
                                        <p style="font-size:13px;">Chúng tôi đã gửi mã xác nhận đến
                                            {{this.form.register.email}},<br> Kích hoạt tài khoản để bắt đầu sử dụng!
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        middleware:'checkLoginClient',
        head: {
            title: 'Trang đăng ký - Spadi.vn'
        },
        asyncData() {
            return {}
        },
        data() {
            return {
                v: {
                    step: 0,
                    registerType: 0,
                    isLoading: false
                },
                form: {
                    register: {
                        name: '',
                        email: '',
                        phone: '',
                        password: '',
                        cofirm: '',
                        tempReaded: false
                    }
                }
            }
        },
        methods: {
            m_tryRegister(e) {
                e.preventDefault();
                if (this.form.register.name.length < 6) {
                    this.$notify({
                        type: 'warning',
                        title: 'Chú ý',
                        message: 'Họ tên quá ngắn, vui lòng kiểm tra và thử lại sau!'
                    });
                    return;
                }
                if (this.form.register.phone.length < 9) {
                    this.$notify({
                        type: 'warning',
                        title: 'Chú ý',
                        message: 'Số điện thoại quá ngắn, vui lòng kiểm tra và thử lại sau!'
                    });
                    return;
                }
                if (this.form.register.email.length < 6) {
                    this.$notify({
                        type: 'warning',
                        title: 'Chú ý',
                        message: 'Email quá ngắn, vui lòng kiểm tra và thử lại sau!'
                    });
                    return;
                }
                if (this.form.register.password.length < 6) {
                    this.$notify({
                        type: 'warning',
                        title: 'Chú ý',
                        message: 'Mật khẩu quá ngắn, vui lòng kiểm tra và thử lại sau!'
                    });
                    return;
                }
                if (this.form.register.password !== this.form.register.cofirm) {
                    this.$notify({
                        type: 'warning',
                        title: 'Chú ý',
                        message: 'Mật khẩu xác nhận không đúng, vui lòng kiểm tra và thử lại sau!'
                    });
                    return;
                }
                if (!this.form.register.tempReaded) {
                    this.$notify({
                        type: 'warning',
                        title: 'Chú ý',
                        message: 'Vui lòng đọc điểu khoản của Spadi.vn'
                    });
                    return;
                }
                this.v.isLoading = true;
                this.$http.post(this.v.registerType === 1 ? process.env.API.User_RegisterBuyer : process.env.API.User_RegisterSeller, this.form.register, {headers: {'Content-Type': 'application/json'}})
                    .then(data => {
                        this.v.step = 2;
                        this.v.isLoading = false;
                    })
                    .catch(error => {
                        this.v.isLoading = false;
                        this.$notify({
                            type:'warning',
                            title:'Chú ý',
                            customClass:'z9999',
                            message: (typeof error.body !== 'undefined' && typeof error.body.ErrorMessage !== 'undefined' ? error.body.ErrorMessage : 'Đã xảy ra sự cố, vui lòng kiểm tra và thử lại sau')
                        })
                    })
            }
        }

    }
</script>
<style scoped>
    .mxIcon {
        font-size: 60px;
        margin: auto;
        padding: 40px;
        border-radius: 50vh;
        background-color: #F3F3F3;
        color: rgba(45, 45, 48, .6);
    }

    .mxButton {
        border: 0;
        padding: 8px;
        width: 80%;
        margin-top: 20px;
        background-color: #4CAF50;
        color: white;
        font-family: "Open Sans";
        font-size: 14px;
        max-width: 300px;
    }

    .mxButton:hover {
        opacity: .96;
    }

    .back-link {
        color: rgba(45, 45, 48, .8);
        padding: 20px 0px 10px 30px;
        padding-top: 10px;
    }

    .shadowmode {
        box-shadow: 5px 5px 10px rgba(45, 45, 48, .1);
    }

    .back-link:hover {
        color: black;
        text-decoration: underline;
    }

    label {
        font-weight: bold;
        margin-top: 10px;
    }

    label:hover {
        text-decoration: none !important;
    }

    .registerButton:before {
        position: absolute;
        content: '';
        width: 0px;
        margin-left: 0;
        height: 0px;
        right: -15px;
        margin-top: -23px;
        border-left: 0px solid transparent;

        border-right: 15px solid transparent;

        border-bottom: 8px solid #004000

    }

    ,
    .xbutton {

        min-width: 86px;
        transition: all .6s ease-in-out;
    }

    .icon-e {
        background-color: white;
        border-radius: 50vh;
        width: 10px;
        height: 10px;
        float: left;
        padding: 10px;
    }

    .e1 {
        animation-name: abLoad;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }

    .e2 {
        animation-name: abLoad;
        animation-duration: 2s;
        animation-delay: .3s;
        animation-iteration-count: infinite;
    }

    .e3 {
        animation-name: abLoad;
        animation-duration: 2s;
        animation-delay: .6s;
        animation-iteration-count: infinite;
    }

    @keyframes abLoad {
        0% {
            padding: 0px;
        }
        20% {
            padding: 10px;
        }
        100% {
            padding: 0
        }
    }

</style>
<style scoped>
    .btnFatLoginAdmin {
        border: 0;
        background-color: whitesmoke;;
        font-family: "Open Sans";
        font-size: 16px;
        color: #439A46;
        font-weight: 700;
        margin-top: 20px;
        outline: 0;
        padding: 6px 10px;
    }

    .btnFatLoginAdmin:hover {
        background-color: rgba(45, 45, 48, .1);
        transition: all .6s ease-in-out;
    }

    .mxFlatForm {
        width: 100%;
        border: 0;
        background-color: whitesmoke;;
        padding: 8px 10px;
        outline: none;
    }

    @media (min-width: 769px) {
        .divMoreInfo_LoginAdmin {
            padding-top: 40px;
            padding-bottom: 75px;
        }
    }

    @media (max-width: 768px) {
        .centerButton {
            margin-top: 10px;
            text-align: center;
            margin-bottom: 10px;
        }
    }
</style>
<template>
    <div>
        <div style="width:100%; min-height:100vh; background-color:rgba(45,45,48,.1); filter:blur(5px); background-image:url('http://ndnewday.vn/demo/assets/uploads/galleries/06d55-s5.jpg'); background-size:cover"></div>
        <div style="width:100%; min-height:100vh; background:transparent; position: absolute; top:0; left:0; padding:0; margin:0;">
            <div style="min-width:400px; width:100%; max-width:600px; background-color:white; border-radius: 3px; border-bottom:3px solid rgba(45,45,48,.2); min-height:100px; margin:0 auto; box-shadow: 0px 10px 20px rgba(45,45,48,.2); border-radius: 3px; margin-top:calc(50vh - 200px)">
                <div class="container-fluid" style="padding:0; ">
                    <div class="col-sm-7"
                         style="padding-bottom:20px; padding-top:20px; border-radius: 3px 0px 0px 3px;">
                        <p style="font-size:24px; font-family: 'Open Sans'">ĐĂNG NHẬP</p>
                        <p>Đăng nhập quản trị Spadi.vn</p>
                        <form style="margin-top:20px;" @submit="m_tryLogin($event)">
                            <label>Tên đăng nhập</label>
                            <input class="mxFlatForm" type="text" v-model="form.login.email"/>
                            <label style="margin-top:15px;">Mật khẩu</label>
                            <input class="mxFlatForm" type="password" v-model="form.login.password"/><br/>
                            <div class="centerButton">
                                <button class="btnFatLoginAdmin">ĐĂNG NHẬP</button>
                            </div>
                        </form>
                    </div>

                    <div class="col-sm-5"
                         style="background-color:whitesmoke; height:100%; border-radius: 3px 3px 0px 0px;">
                        <div style="height:100%;" class="divMoreInfo_LoginAdmin">
                            <p>Đăng nhập quản trị, thành viên quản trị tại Spadi.vn</p>
                            <p>Mọi vấn đề thắc mắc vui lòng liê hệ:<br>Điện thoại: 098.123.456</p>
                            <p style="margin-top:60px;"><strong>Copyright &copy; 2018
                                <a href="javascript:;">Hoàng Thiên Lộc</a>.</strong> All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import jwt from 'json-web-token'

    export default {
        middleware: 'login_AdminIsLogin',
        asyncData({store}) {

        },
        head() {
            return {
                title: 'Đăng nhập quản trị | Spadi.vn'
            }
        },
        data() {
            return {
                v: {
                    isLoading: false
                },
                form: {
                    login: {
                        email: '',
                        password: ''
                    }
                }

            }
        },
        beforeMount() {
        },
        methods: {
            m_tryLogin(e) {
                e.preventDefault();
                this.$http.post(process.env.API.AdminLogin, this.form.login)
                    .then(data => {
                        if (data.body.role !== 'admin') {
                            this.$message({
                                type: 'error',
                                message: 'Tài khoản ' + this.form.login.email + ' không thuộc nhóm quản trị, vui lòng kiểm tra và thử lại sau!'
                            });
                        }
                        else {
                            let crData = data.body;
                            if (crData.role === 'admin') {
                                let adminInfo = {
                                    name: crData.name,
                                    email: crData.email,
                                    role: crData.role
                                }
                                this.setCookie('AdminRole', crData.role);
                                this.setCookie('AdminToken', crData.token);
                                jwt.encode(process.env.jwt_KEY, adminInfo, async (jwtError, jwtData) => {
                                    if (!jwtError) {
                                        await this.setCookie('AdminInfo', jwtData);
                                        await this.$store.commit('updateAdminToken', crData.token);
                                        await this.$store.commit('updateAdminInfo', adminInfo);
                                        await this.$store.commit('updateAdminRole', crData.role);

                                    }
                                })
                                this.$router.push(this.$route.query.redirect || '/quan-tri/');
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
    }
</script>
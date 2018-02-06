<template>
    <div class="text-align:center; padding-top:40px;">
        <div class="box"
             style="  padding:20px; max-width:450px; min-height:200px; margin:auto; margin-top:40px;">
            <p style="font-size:24px;">ĐĂNG NHẬP</p>
            <span style="font-size:14px;">Điền đầy đủ thông tin *.<br> Nếu bạn chưa có tài khoản, nhấn <a
                    href="javascript:;" style="text-decoration: underline" @click="$router.push('/tai-khoan/dang-ky')">vào đây</a></span>
            để đăng ký
            <form style="margin-top:30px;" @submit="m_tryLogin($event)">
                <label style="font-weight: bold;">Tài khoản *</label>
                <el-input v-model="form.login.email">
                    <i slot="prefix" class="el-input__icon el-icon-message"></i>
                </el-input>
                <label style="margin-top:15px; font-weight: bold">Mật khẩu *</label>
                <el-input type="password" v-model="form.login.password">
                    <i slot="prefix" class="el-input__icon el-icon-edit"></i>
                </el-input>
                <div style="height:30px; margin-top:20px; margin-bottom:10px;">
                    <span style="font-size:14px;"><el-checkbox class="pull-left" v-model="v.saveAccount"></el-checkbox>&nbsp;Nhớ tài khoản</span>
                    <a class="pull-right" href="javascript:;" @click="$router.push('/tai-khoan/quen-mat-khau')">Quên mật
                        khẩu?</a>
                </div>

                <grebtn title="ĐĂNG NHẬP" type="submit" :loading="v.isLoading"></grebtn>
                <br>
                <label style="margin-top:20px; font-weight:bold;">Đăng nhập bằng</label>
                <div>
                    .etc
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import jwt from 'json-web-token'

    export default {
        middleware: 'checkLoginClient',
        head(){
            return {
                title:'Đăng nhập | Spadi.vn - Trang đăng nhập tại Spadi.vn'
            }
        },
        name: 'dang-nhap',
        asyncData() {
            return {}
        },
        data() {
            return {
                v: {
                    saveAccount: false,
                    isLoading: false
                },
                form: {
                    login: {
                        email: '',
                        password: '',
                    }
                }
            }
        },
        methods: {
            m_tryLogin(e) {
                e.preventDefault();
                this.v.isLoading = true;
                this.$http.post(process.env.API.AdminLogin, this.form.login, {headers: {'Content-Type': 'application/json'}})
                    .then(data => {
                        this.v.isLoading = false;
                        let crData = data.body;
                        if (crData.role === 'user' || crData.role === 'manager') {
                            let clientInfo = {
                                name: crData.name,
                                email: crData.email,
                                role: crData.role
                            }
                            if (typeof  crData === 'undefined') {

                            }
                            this.setCookie('ClientRole', crData.role);
                            this.setCookie('ClientToken', crData.token);
                            jwt.encode(process.env.jwt_KEY, clientInfo, async (jwtError, jwtData) => {
                                if (!jwtError) {
                                    this.setCookie('ClientInfo', jwtData);
                                    await this.$store.commit('updateClientToken', crData.token);
                                    await this.$store.commit('updateClientInfo', clientInfo);
                                    await this.$store.commit('updateClientRole', crData.role);

                                }
                            })
                            this.$router.push(this.$route.query.redirect || '/tai-khoan/');
                        }
                    })
                    .catch(error => {
                        this.v.isLoading = false;

                        this.$message({
                            type: 'error',
                            message: (typeof error.body !== 'undefined' && typeof error.body.ErrorMessage !== 'undefined' ? error.body.ErrorMessage : 'Đã xảy ra sự cố, vui lòng kiểm tra và thử lại sau')
                        })
                    })

            }
        }
    }
</script>
<style scoped>
    .buttonLogin {
        background-color: #4CAF50;
        width: 100%;
        padding: 8px;
        border: 0;
        color: white;
        font-family: "Open Sans";
    }

    .buttonLogin:hover {
        opacity: .96;
    }

    label:hover {
        text-decoration: unset;
    }
</style>
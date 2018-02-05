<style scoped>
    label{
        margin-top:10px;
        font-family: "Source Sans Pro";
        font-weight: bold;
    }
</style>
<template>
    <div class="box" style="padding:10px">
        <form @submit="m_UpdateProfile($event)" style="max-width:600px;">
            <label class="bold">Họ tên</label>
            <el-input v-model="form.profile.name"></el-input>
            <label class="bold">Điện thoại</label>
            <el-input v-model="form.profile.phone"></el-input>
            <label class="bold">Địa chỉ</label>
            <el-input v-model="form.profile.address" type="textarea"></el-input>
            <grebtn type="submit" title="Cập nhật" :loading="v.isLoading" style="margin-top:20px;"></grebtn>
        </form>
    </div>
</template>
<script>
    import jwt from 'json-web-token'

    export default {
        name: 'ClientProfile',
        head() {
            return {
                title: 'Spadi.vn | Cập nhật thông tin cá nhân  - Trang cập nh người dùng tại Spadi.vn'
            }
        },
        data() {
            return {
                v: {
                    isLoading: false
                },
                form: {
                    profile: {
                        name: '',
                        phone: '',
                        address: '',
                    }
                }
            }
        },
        beforeMount() {
            this.m_ClientGetProfile();
        },
        methods: {
            m_ClientGetProfile() {
                this.$http.get(process.env.API.UserGetProfile, this.cf())
                    .then(data => {
                    
                        this.form.profile.name = data.body.name;
                        this.form.profile.phone = data.body.phone;
                        this.form.profile.address = data.body.address
                    })
                    .catch(error => {
                    })
            },
            m_UpdateProfile(e) {
                e.preventDefault();
                this.v.isLoading = true;
                this.$http.put(process.env.API.User_UpdateProfile, this.form.profile, this.cf())
                    .then(data => {
                        this.v.isLoading = false;
                        let dataCommit = this.$store.state.ClientInfo;
                        dataCommit.name = this.form.profile.name;
                        this.$store.commit('updateClientInfo', dataCommit);
                        jwt.encode(process.env.jwt_KEY, dataCommit, async (jwtError, jwtData) => {
                            if (!jwtError){
                                await this.setCookie('ClientInfo',jwtData);
                            }
                        })
                        this.$message({
                            type: "success",
                            message: typeof data.body.Message === 'undefined' ? 'Thao tác thành công' : data.body.Message
                        });
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
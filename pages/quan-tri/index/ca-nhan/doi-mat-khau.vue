<style scoped>
    label{
        font-weight: bold;
    }
</style>
<template>
    <div class="box" style="padding:10px;">
        <form style="max-width:600px; padding-bottom:20px;" @submit="m_changePassword($event)">
            <label class="bold">Mật khẩu mới</label>
            <el-input type="password" v-model="form.changePassword.newPassword"></el-input>
            <label class="bold">Gõ lại mật khẩu</label>
            <el-input type="password" v-model="form.changePassword.confirmPassword"></el-input>
            <label class="bold">Mật khẩu hiện tại</label>
            <el-input type="password" v-model="form.changePassword.oldPassword"></el-input>
            <grebtn title="Cập nhật" style="margin-top:20px;" type="submit" :loading="v.isLoading"></grebtn>
        </form>
    </div>
</template>
<script>
    export default {
        head() {
            return {
                title: 'Spadi.vn | Thay đổi mật khẩu - Trang thay đổi mật khẩu người dùng tại Spadi.vn'
            }
        },
        data() {
            return {
                v: {
                    isLoading: false,
                },
                form: {
                    changePassword: {
                        oldPassword: '',
                        confirmPassword: '',
                        newPassword: '',
                    }
                }
            }
        },
        methods: {
            m_changePassword(e) {
                e.preventDefault();
                this.v.isLoading = true;
                if (this.form.changePassword.newPassword.trim().length < 6) {
                    this.$message({
                        type: 'warning',
                        message: 'Mật khẩu mới quá ngắn, vui lòng kiểm tra và thử lại sau!'
                    });
                    return;
                }
                if (this.form.changePassword.confirmPassword !== this.form.changePassword.newPassword) {
                    this.$message({
                        type: 'warning',
                        message: 'Mật khẩu xác nhận không khớp, vui lòng kiểm tra và thử lại sau!'
                    });
                    return;
                }
                this.v.isLoading = true;
                this.$http.put(process.env.API.User_ChangePassword, this.form.changePassword, this.cf())
                    .then(data => {
                        this.v.isLoading = false;
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
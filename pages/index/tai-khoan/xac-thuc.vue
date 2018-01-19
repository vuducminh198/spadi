<template>
    <div class="container" style="padding-bottom:100px;">
        <div v-if="userData!==null && typeof userData.name!=='undefined'" class="box"
             style="border-color:#C0C0C0; border-top:0; border-left:4px solid; padding:20px; margin-top:30px;">
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
                                <p style="font-size:32px;">Xác thực tài khoản thành công</p>
                                <p style="font-size:13px;">Chào {{userData.name}}, chúng tôi đã xác thực email
                                    {{userData.email}}. <br>Hãy bắt đầu sử dụng những tính năng chúng tôi dành riêng cho
                                    bạn!
                                </p>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td><span class="material-icons" style="margin-right:10px;">trending_flat</span>
                                        </td>
                                        <td><span><a href="javascript:;" @click="$router.push('/tai-khoan/dang-nhap')"
                                                     style="text-decoration: underline">Đăng nhập</a> ngay.</span></td>
                                    </tr>
                                    </tbody>
                                </table>


                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>


            </div>


        </div>
        <div v-else class="box" style=" border-top:0; border-left:4px solid #FF8000; padding:20px; margin-top:30px;">
            Không tìm thấy thông tin tài khoản
        </div>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        middleware:'checkLoginClient',
        name: 'confirm',
        async asyncData({app, query}) {

            let data = await app.$axios.$get(process.env.API.User_GetInfoByCode + query.q);
            await  app.$axios.$get(process.env.API.User_ActiveByCode + query.q)
                .then(data => {
                }).catch(error => {
                })
            return {
                userData: data
            }


        },
        data() {
            return {
                v: {}
            }
        },
        beforeMount() {


        },
        methods: {}
    }
</script>
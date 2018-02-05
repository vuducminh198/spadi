<style scoped>
    label {
        font-weight: bold;
    }

    @media (min-width: 768px) {
        .mx-row {
            padding: 50px;
            padding-top: 0;
        }
    }

    @media (max-width: 768px) {
        .mx-row {
            padding: 20px;
            padding-top: 0;
        }
    }
</style>
<template>
    <div>
        <div style="font-size:18px; font-family: 'Open Sans'; margin-bottom:10px;">CẬP NHẬT CỬA HÀNG</div>
        <div style="padding:10px; background-color:white ;">
        <form @submit="m_submitAddNewChain($event)" style="position: relative">
            <div style="padding-top:20px;">
                <el-row class="mx-row">
                    <div>
                        <label>Tên shop (tên hiển thị)</label><br/>
                        <el-input v-model="form.addChain.name"></el-input>
                        <div style="margin-top:20px">
                        </div>
                        <div style="width: 100%; height:200px; overflow-y: hidden; position: relative; border: 1px solid rgba(45,45,48,.1); border-right:10px;">
                            <img src="~/assets/img/svg/white.svg"
                                 id="ReviewCoverImage"
                                 style="width:100%; position: absolute; z-index:1; top:0;left:0;right: 0; bottom:0">
                            <el-tooltip placement="top" content="Tải lên ảnh bìa">
                                <el-button round icon="el-icon-edit" @click="m_clickOpenFileCover"
                                           style="position: absolute; z-index:4; right:10px;top:10px;"></el-button>
                            </el-tooltip>
                            <div style="position: absolute; z-index:3; top:0;left:0;right: 0; bottom:0">
                                <el-tooltip placement="top" content="Tải lên ảnh đại diện">
                                    <el-button round icon="el-icon-edit"
                                               style="position: absolute; z-index:4; top:45px; left:130px;"
                                               size="mini" @click="m_clickOpenFileLogo">
                                    </el-button>
                                </el-tooltip>
                                <img src="~/assets/img/svg/white.svg"
                                     id="ReviewlogoImage"
                                     style="width:150px; background-color:white; margin-left:30px; margin-top:40px; bottom:0;  height:150px; border:1px solid rgba(45,45,48,.2); ">
                                <p style="position: absolute; z-index:5; bottom:0; left:200px; font-size:24px; color:white">
                                    {{form.addChain.name}}</p>
                            </div>
                        </div>
                        <div style="margin-top:20px">

                        </div>

                        <el-tabs style="margin-top:10px;">
                            <el-tab-pane label="Điện thoại">
                                <table class="table">
                                    <tbody>
                                    <tr v-for="item,index in form.addChain.phone" v-if="typeof item!=='undefined'">
                                        <td style="width:100%;">
                                            <el-input placeholder="Nhập số điện thoại" :value="item" disabled>
                                                <i slot="prefix" class="el-input__icon el-icon-phone"></i>
                                            </el-input>
                                        </td>
                                        <td>
                                            <el-tooltip content="Xóa số điện thoại này" placement="top">
                                                <el-button icon="el-icon-close"
                                                           @click="m_removePhoneIndex(index)"></el-button>
                                            </el-tooltip>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width:100%;">
                                            <el-input placeholder="Nhập số điện thoại"
                                                      v-model="form.addChain._inputPhone">
                                                <i slot="prefix" class="el-input__icon el-icon-phone"></i>
                                            </el-input>
                                        </td>
                                        <td>
                                            <el-tooltip placement="top" content="Xác nhận số điện thoại">
                                                <el-button icon="el-icon-check"
                                                           @click="m_addPhone"></el-button>
                                            </el-tooltip>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </el-tab-pane>
                            <el-tab-pane label="Đường dây nóng">
                                <table class="table">
                                    <tbody>
                                    <tr v-for="item,index in form.addChain.hotLine"
                                        v-if="typeof item!=='undefined'">
                                        <td style="width:100%;">
                                            <el-input :value="item" disabled>
                                                <i slot="prefix" class="el-input__icon el-icon-phone"></i>
                                            </el-input>
                                        </td>
                                        <td>
                                            <el-tooltip content="Xóa số điện thoại này" placement="top">
                                                <el-button icon="el-icon-close"
                                                           @click="m_removeHotlineIndex(index)"></el-button>
                                            </el-tooltip>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width:100%;">
                                            <el-input placeholder="Nhập đường dây nóng"
                                                      v-model="form.addChain._inputHotline">
                                                <i slot="prefix" class="el-input__icon el-icon-phone"></i>
                                            </el-input>
                                        </td>
                                        <td>
                                            <el-tooltip placement="top" content="Xác nhận đường dây nóng">
                                                <el-button icon="el-icon-check"
                                                           @click="m_addHotline"></el-button>
                                            </el-tooltip>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </el-tab-pane>

                        </el-tabs>
                        <div>
                            <grebtn style="max-width:200px;" type="submit" :loading="v.isLoading"
                                    title="Cập nhật"></grebtn>
                        </div>
                    </div>

                </el-row>
            </div>
            <input style="display: none" type="file" id="inputFileLogo" @change="m_LogoFileChange"/>
            <input style="display: none" type="file" id="inputFileCover" @change="m_CoverFileChange"/>
            <div class=" text-right" style="margin-top:20px;">

            </div>
        </form>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import config from '~/config'
    import Sidebar from '~/components/Sidebar'
    import $ from 'jquery'
    import axios from 'axios'
    import Cookies from 'js-cookie'
    import Cookie from 'cookie'

    import jwt from 'json-web-token'

    export default {
        middleware: 'clientIsManager',
        data: function () {
            return {
                v: {
                    dialogAddAr: false,
                    dialogNoChain: false,
                    listCity: [],
                    isLoading: false,
                    listChain: [],
                    addChainStep: 0
                },
                // section: 'Dash',
                year: new Date().getFullYear(),
                classes: {
                    fixed_layout: config.fixedLayout,
                    hide_logo: config.hideLogoOnMobile
                },
                error: '',
                form: {
                    addChain: {
                        _inputHotline: '',
                        _inputPhone: '',
                        name: '',
                        phone: [],
                        hotLine: [],
                        city: '',
                        district: '',
                        logo: '~/assets/img/default-none.svg',
                        cover: '~/assets/img/svg/cover.svg'
                    }
                }
            }
        },
        computed: {
            ...mapState([
                'userInfo'
            ]),
            demo() {
                return {
                    displayName: 'display Name',
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwxOfm3A_ion3x8dX9x8DByNOCs8gLZ2NPS9otibh-d3Z_V_97',
                    email: 'email',
                    randomCard: {}
                }
            },
            listDistrict: function () {
                let selectedCity = this.form.addChain.city.trim();
                let res = [];
                this.v.listCity.forEach(e => {
                    if (e.name === selectedCity) res = e.districts;
                })
                if (res.length > 0) this.form.addChain.district = res[0];
                return res;
            }
        },
        beforeMount() {
            this.m_getChainDetailById();

        },
        methods: {
            m_getChainDetailById() {
                this.$http.get(process.env.API.Chain_DetailById + this.$route.query._, this.cf())
                    .then(data => {
                        this.form.addChain = data.body;
                        $('#ReviewlogoImage').attr('src', this.img_base + data.body.logo);
                        $('#ReviewCoverImage').attr('src', this.img_base + data.body.cover[0]);
                        this.form.addChain._inputPhone = '';
                        this.form.addChain._inputHotline = '';
                    })
                    .catch(error => {
                    })
            },
            m_clickOpenFileLogo() {
                $('#inputFileLogo').click();
            },
            m_clickOpenFileCover() {
                $('#inputFileCover').click();
            },
            m_removePhoneIndex(indexW) {
                this.form.addChain.phone = this.form.addChain.phone.map((e, index) => {
                    return index !== indexW ? e : undefined;
                })
            },
            m_addPhone() {
                let inArray = false;
                if (this.form.addChain._inputPhone.length < 3) return;
                if (this.form.addChain.phone.length > 0)
                    this.form.addChain.phone.forEach(e => {
                        if (typeof  e !== 'undefined')
                            if (e.toString().split(' ').join('') === this.form.addChain._inputPhone.toString().split(' ').join(''))
                                inArray = true;
                    });
                if (!inArray) {
                    this.form.addChain.phone.push(this.form.addChain._inputPhone);
                    this.form.addChain._inputPhone = ''
                }
                else this.$message({
                    message: 'Số điện thoại đã tồn tại, vui lòng kiểm tra lại!',
                    type: 'error'
                });
            },
            m_removeHotlineIndex(indexW) {
                this.form.addChain.hotLine = this.form.addChain.hotLine.map((e, index) => {
                    return index !== indexW ? e : undefined;
                })
            },
            m_addHotline() {
                let inArray = false;
                if (this.form.addChain._inputHotline.length < 3) return;
                if (this.form.addChain.hotLine.length > 0)
                    this.form.addChain.hotLine.forEach(e => {
                        if (typeof  e !== 'undefined')
                            if (e.toString().split(' ').join('') === this.form.addChain._inputHotline.toString().split(' ').join(''))
                                inArray = true;
                    });
                if (!inArray) {
                    this.form.addChain.hotLine.push(this.form.addChain._inputHotline);
                    this.form.addChain._inputHotline = ''
                }
                else this.$message({
                    message: 'Đường dây nóng đã tồn tại, vui lòng kiểm tra lại!',
                    type: 'error'
                });
            },
            m_getListCity() {
                this.$http.get(process.env.API.City_List)
                    .then(data => {
                        this.v.listCity = data.body;
                        if (this.v.listCity.length > 0)
                            this.form.addChain.city = this.v.listCity[0].name;
                    })
                    .catch(error => {
                    });
            },
            m_LogoFileChange(e) {
                this.form.addChain.logo = e.target.files || e.dataTransfer.files;
                let fileReader = new FileReader();
                fileReader.onload = (e1) => {
                    $('#ReviewlogoImage').attr('src', e1.target.result);
                };
                fileReader.readAsDataURL(this.form.addChain.logo[0]);
            },
            m_CoverFileChange(e) {
                this.form.addChain.cover = e.target.files || e.dataTransfer.files;
                let fileReader = new FileReader();
                fileReader.onload = (e1) => {
                    $('#ReviewCoverImage').attr('src', e1.target.result);
                };
                fileReader.readAsDataURL(this.form.addChain.cover[0]);
            },
            m_submitAddNewChain(e) {
                e.preventDefault();
                if (this.form.addChain.name.trim().length < 3) {
                    this.$message({type: 'warning', message: 'Tên chuỗi quá ngắn, vui lòng kiểm tra và thử lại sau!'});
                    return;
                }
                if (this.form.addChain.logo.length === 0) {
                    this.$message({type: 'warning', message: 'Vui lòng chọn ảnh làm Logo chuỗi!'});
                    return;
                }
                if (this.form.addChain.phone.length === 0) {
                    this.$message({type: 'warning', message: 'Vui lòng thêm ít nhất 1 số điện thoại'});
                    return;
                }
                if (this.form.addChain.hotLine.length === 0) {
                    this.$message({type: 'warning', message: 'Vui lòng thêm ít nhất 1 đường dây nóng'});
                    return;
                }
                this.v.isLoading = true;
                let formData = new FormData();
                console.log(typeof this.form.addChain.logo);
                formData.append('name', this.form.addChain.name);
                formData.append('logo', typeof this.form.addChain.logo === 'string' ? this.form.addChain.logo : this.form.addChain.logo[0]);
                formData.append('cover', typeof this.form.addChain.cover === 'string' ? this.form.addChain.cover : this.form.addChain.cover[0]);
                this.form.addChain.phone.forEach(e => {
                    formData.append('phone', e);
                })
                this.form.addChain.hotLine.forEach(e => {
                    formData.append('hotLine', e);
                })
                formData.append('_id', this.form.addChain._id);
                this.$http.put(process.env.API.Chain_Update, formData, this.cf())
                    .then(data => {
                        this.v.isLoading = false;
                        this.v.addChainStep = 4;
                        let el = document.querySelector(".svg");
                        if (el != null) {
                            let elWrapperClone = el.innerHTML;
                            el.innerHTML = elWrapperClone;
                        }
                        this.EB.$emit('reloadListChain');
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
            },

            m_setSelectedChain(item) {
                let jsonjwt = '';
                jwt.encode(process.env.jwt_KEY, item, async (error, data) => {
                    if (!error) {
                        jsonjwt = data;
                        if (typeof data !== 'undefined') {
                            await  this.setCookie('selectedChain', jsonjwt);
                            await this.$store.commit('updateAdminSelectedChain', item);
                            this.EB.$emit('reloadCurrentPage');
                        }
                    }
                });


            }
        }
    }
</script>
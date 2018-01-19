<style scoped>
    .xmenuClient {
        background-color: white;
        list-style-type: none;
        width: 100%;
        border-bottom: 1px dashed rgba(45, 45, 48, .3);
    }

    .mxChild {
        list-style-type: none;
        width: 100%;
        box-shadow: 3px 3px 5px rgba(45, 45, 48, .6);
        border-radius: 0px 0px 2px 2px !important;
    }

    .mxChild .menu {
        list-style-type: none;
    }

    .mxChild .footer {
        background-color: white;
    }

    .buttonAddAr {
        background-color: #439A46;
        border: 0;
        color: white;
    }

    .buttonAddAr:hover {
        opacity: .8;
    }
    .affix{



    }
</style>
<template>
    <div class="container-fluid " style="margin-top:20px;">
        <div class="container">
            <div class="col-sm-4  col-md-3 sidebar">
                <ul class="sidebar-menu" style="background-color:white" >
                    <li class="dropdown messages-menu  xmenuClient " style="width:100%;">
                        <a v-if="typeof $store.state.adminSelectedChain._id==='undefined'" href="javascript:;"
                           class="dropdown-toggle" data-toggle="dropdown">
                            <i style="padding-top:10px; padding-bottom:10px; font-style: normal">
                                <span class="material-icons" style="font-size:18px; padding:5px;">share</span>
                                CHUỖI CỬA
                                HÀNG</i>&nbsp;
                            <span class="fa fa-angle-down full-right"></span>
                        </a>
                        <a v-else href="javascript:;" class="dropdown-toggle" data-toggle="dropdown"
                           style="padding-top:5px; padding-bottom:5px;">

                            <img v-if="$store.state.adminSelectedChain.logo.toString().length>1"
                                 :src="img_base+$store.state.adminSelectedChain.logo"
                                 style="width:40px; height:40px; border-radius: 4px;">
                            <img v-else src="~/assets/img/default-none.svg"
                                 style="width:40px; height:40px; border-radius: 4px;">
                            <span style="margin-left:5px; padding-right:5px; font-size: 16px;">{{$store.state.adminSelectedChain.name}}</span>
                            <span class="fa fa-angle-down"></span>
                        </a>
                        <ul class="dropdown-menu mxChild" style="background-color:white">
                            <li class="header">Chọn 1 chuỗi để quản lý
                                <button class="pull-right buttonAddAr" @click="$router.push('/tai-khoan/chain/tao-moi')">
                                    <span class="el-icon-plus"></span>
                                    TẠO MỚI
                                </button>
                            </li>
                            <li v-if="true">
                                <!-- inner menu: contains the messages -->
                                <ul class="menu">
                                    <li v-for="item in v.listChain" class="item-chain"
                                        @click="m_setSelectedChain(item)">
                                        <img v-if="item.logo.toString().length>1" :src="img_base+item.logo"
                                             style="width:40px; height:40px;">
                                        <img v-else src="~/assets/img/default-none.svg"
                                             style="width:40px; height:40px;">
                                        <span>{{item.name}}</span>
                                    </li>
                                    <!-- end message -->
                                </ul>
                                <!-- /.menu -->
                            </li>
                            <li class="footer">
                                <a href="javascript:;" @click="$router.push('/tai-khoan/chain/danh-sach')">ĐI ĐẾN QUẢN LÝ
                                    CHUỖI</a>
                            </li>
                        </ul>
                    </li>
                    <li class="treeview">
                        <a href="#">
                            <i class="material-icons" style="vertical-align: middle">store_mall_directory</i>
                            <span class="mtext">CỬA HÀNG</span>
                            <span class="pull-right-container">
                     <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
                        </a>
                        <ul class="treeview-menu">
                            <nuxt-link tag="li" class="pageLink" to="/tai-khoan/shop/tao-moi">
                                <a>
                                    <i class="fa"></i>
                                    <span class="page">Thêm mới</span>
                                </a>
                            </nuxt-link>
                            <nuxt-link tag="li" class="pageLink" to="/tai-khoan/shop/danh-sach">
                                <a>
                                    <i class="fa"></i>
                                    <span class="page">Danh sách cửa hàng</span>
                                </a>
                            </nuxt-link>
                        </ul>
                    </li>
                    <li class="treeview">
                        <a href="#">
                            <i class="material-icons">redeem</i>
                            <span>DEAL</span>
                            <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
                        </a>
                        <ul class="treeview-menu">
                            <nuxt-link tag="li" class="pageLink" to="/tai-khoan/deal/tao-moi">
                                <a>
                                    <i class="fa "></i>
                                    <span class="page">Thêm mới</span>
                                </a>
                            </nuxt-link>
                            <nuxt-link tag="li" class="pageLink" to="/tai-khoan/deal/danh-sach">
                                <a>
                                    <i class="fa"></i>
                                    <span class="page">Danh sách Deal</span>
                                </a>
                            </nuxt-link>
                        </ul>
                    </li>
                    <li class="treeview">
                        <a href="#">
                            <i class="material-icons">toll</i>
                            <span>COUPON</span>
                            <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
                        </a>
                        <ul class="treeview-menu">
                            <nuxt-link tag="li" class="pageLink" to="/tai-khoan/coupon/tao-moi">
                                <a>
                                    <i class="fa"></i>
                                    <span class="page">Thêm mới</span>
                                </a>
                            </nuxt-link>
                            <nuxt-link tag="li" class="pageLink" to="/tai-khoan/coupon/danh-sach">
                                <a>
                                    <i class="fa"></i>
                                    <span class="page">Danh sách Coupon</span>
                                </a>
                            </nuxt-link>
                        </ul>
                    </li>
                    <li class="treeview">
                        <a href="#">
                            <i class="material-icons">face</i>
                            <span>KHÁCH HÀNG</span>
                            <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
                        </a>
                        <ul class="treeview-menu">
                            <nuxt-link tag="li" class="pageLink" to="/tai-khoan/shop/tao-moi">
                                <a>
                                    <i class="fa fa-cog"></i>
                                    <span class="page">Thêm mới</span>
                                </a>
                            </nuxt-link>
                            <nuxt-link tag="li" class="pageLink" to="/tai-khoan/shop/">
                                <a>
                                    <i class="fa fa-cog"></i>
                                    <span class="page">Danh sách Coupon</span>
                                </a>
                            </nuxt-link>
                        </ul>
                    </li>
                    <li class="treeview">
                        <a href="#">
                            <i class="material-icons">bubble_chart</i>
                            <span>THỐNG KÊ</span>
                            <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
                        </a>
                        <ul class="treeview-menu">
                            <nuxt-link tag="li" class="pageLink" to="/tai-khoan/shop/tao-moi">
                                <a>
                                    <i class="fa fa-cog"></i>
                                    <span class="page">Thêm mới</span>
                                </a>
                            </nuxt-link>
                            <nuxt-link tag="li" class="pageLink" to="/tai-khoan/shop/">
                                <a>
                                    <i class="fa fa-cog"></i>
                                    <span class="page">Danh sách Coupon</span>
                                </a>
                            </nuxt-link>
                        </ul>
                    </li>

                </ul>
            </div>

            <div class="col-sm-8 col-md-9">
                <div style="position: relative">
                    <nuxt-child></nuxt-child>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import SideBar from '~/components/SidebarMenu.vue'
    import Cookies from 'js-cookie'
    import Cookie from 'cookie'
    import PriBtn from "~/components/button";
    import jwt from 'json-web-token'

    export default {
        middleware: 'isLoginClient',
        async asyncData({store, redirect, res, app}) {
            let resss = 0;
            await app.$axios.$get(process.env.API.UserGetProfile, {
                headers: {}
            })
                .then((resp) => {
                    resss = {abc: 123};
                })
                .catch(error => {

                    resss = error;
                    //redirect('/tai-khoan/dang-nhap');
                })
            return {
                re: store.state.token
            }
        },
        head: {
            bodyAttrs: {
                class: 'hold-transition skin-blue sidebar-mini'
            }
        },
        components: {
            'sidebar': SideBar
        },
        data() {
            return {
                v: {
                    dialogAddAr: false,
                    dialogNoChain: false,
                    listCity: [],
                    isLoading: false,
                    listChain: [],
                    addChainStep: 0
                },
            }
        },
        beforeMount() {
            this.m_getListCity();
            this.m_getListChain();
            this.EB.$on('reloadListChain', () => {
                this.m_getListChain();
            })
        },
        methods: {
            changeloading() {
                this.$store.commit('TOGGLE_SEARCHING')
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
                formData.append('name', this.form.addChain.name);
                formData.append('logo', this.form.addChain.logo[0]);
                formData.append('cover', this.form.addChain.cover[0]);
                formData.append('phone', this.form.addChain.phone);
                formData.append('hotLine', this.form.addChain.hotLine);
                this.$http.post(process.env.API.Chain_Create, formData, this.cf())
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
                        this.EB.$emit('reloadListChain');
                    })
                    .catch(error => {
                        this.v.isLoading = false;
                        this.$message({
                            type: 'error',
                            message: (typeof error.body !== 'undefined' && typeof error.body.ErrorMessage !== 'undefined' ? error.body.ErrorMessage : 'Đã xảy ra sự cố, vui lòng kiểm tra và thử lại sau')
                        })
                    })
            },
            m_getListChain() {
                this.$http.get(process.env.API.Chain_List, this.cf())
                    .then(data => {
                        this.v.listChain = data.body;
                        if (this.v.listChain.length >= 1) {
                            jwt.decode(process.env.jwt_KEY, this.getCookie('selectedChain'), (error, encoded) => {
                                if (error) this.m_setSelectedChain(this.v.listChain[0]);
                                else {
                                    let flag = false;
                                    this.v.listChain.forEach(e => {
                                        if (e._id === encoded._id) {
                                            flag = true;
                                            this.m_setSelectedChain(e);
                                        }
                                    });
                                    if (!flag) this.m_setSelectedChain(this.v.listChain[0]);
                                }
                            })

                        }
                        else {
                            this.setCookie('selectedChain', "");
                            this.$store.commit('updateAdminSelectedChain', {})
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
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
<style scoped>
    .form-control, input, select {
        background-color: white;
    }
</style>
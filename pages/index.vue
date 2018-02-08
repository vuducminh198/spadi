<template>
    <div>
        <header>
            <div class="container">
                <div class="top-bar clearfix">
                    <div class="pull-left">
                        <a class="logo" href="http://spadi.vn/">
                            <img src="http://spadi.vn/wp-content/uploads/2017/10/Untitled-6.png" height="40" width="152"
                                 alt=""/>
                        </a>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>


                        <form @submit="m_Filter($event)" autocomplete="off">
                            <input type="text" name="keyword    " value="    " class="keyword"
                                   placeholder="Tìm kiếm khuyến mãi và cửa hàng" v-model="v.keyword"/>
                            <i class="pline-magnifier"></i>
                            <div class="keyword_suggest_stores"></div>
                            <a href="javascript:;" class="submit-form btn" @click="m_Filter">Tìm kiếm</a>
                        </form>
                    </div>
                    <div class="pull-right">
                        <ul class="list-unstyled list-inline account-list">
                            <li class="liMenuClient" style="z-index:13;">
                                <i class="pline-user"></i>
                                <template v-if="$store.state.ClientToken<10">
                                    <a href="javascript:;"
                                       @click="$router.push('/tai-khoan/dang-nhap?redirect='+$route.fullPath)">
                                        Đăng
                                        nhập
                                    </a>
                                    hoặc
                                    <a href="javascript:;" @click="$router.push('/tai-khoan/dang-ky')">Đăng kí</a>
                                </template>
                                <template v-else>
                                    <a href="javascript:;" style="color:black;" @click="$router.push('/tai-khoan/')">
                                        Chào,
                                        <span style="color:#439A46">{{$store.state.ClientInfo.name}}</span>
                                    </a>
                                    <ul class="ClientSubMenu">
                                        <li @click="$router.push('/tai-khoan/')">
                                            <span class="el-icon-service"></span>Tài
                                            khoản
                                        </li>
                                        <li @click="m_ClientLogout()">
                                            <span class="el-icon-upload2"></span>Đăng xuất
                                        </li>
                                    </ul>
                                </template>
                            </li>
                            <li class="cart-items">
                                <a href="javascript:;" @click="$router.push('/tai-khoan/gio-hang')" title="Giỏ hàng">
                                    <i class="pline-bag"></i>
                                    <span class="count-items no-cart-items">	{{$store.state.ClientCartNumber}}				</span>
                                    Giỏ hàng
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="navigation" data-spy="affix" data-offset-top="80" style="background-color:white">
                <div class="container">
                    <div class="navbar navbar-default" role="navigation" style="max-height: none;">
                        <a href="javascript:;" class="menu-trigger">
                            <i class="fa fa-bars"></i>
                        </a>
                        <div class="small-device-wrapper">
                            <div class="small-device-action">
                                <ul class="list-unstyled list-inline account-list">
                                    <li>
                                        <i class="pline-user"></i>
                                        <template v-if="$store.state.ClientToken!==null && typeof $store.state.ClientToken!=='undefined' && $store.state.ClientToken.length<10">
                                            <a href="javascript:;" @click="$router.push('/tai-khoan/dang-nhap')">
                                                Đăng
                                                nhập
                                            </a> or
                                            <a href="javascript:;" @click="$router.push('/tai-khoan/dang-ky')">
                                                Đăng
                                                kí
                                            </a>
                                        </template>
                                    </li>
                                    <li class="cart-items">
                                        <a href="javascript:;" @click="$router.push('/tai-khoan/gio-hang')"
                                           title="Giỏ hàng">
                                            <i class="pline-bag"></i>
                                            <span class="count-items no-cart-items">
                      </span>
                                            Giỏ hàng
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <h5 class="small-device-title">Navigation</h5>
                            <ul class="nav navbar-nav clearfix">
                                <li id="menu-item-679"
                                    class="menu-item menu-item-type-custom menu-item-object-custom menu-item-679">
                                    <a title="Trang chủ" href="javascript:;" @click="$router.push('/')">Trang chủ</a>
                                </li>
                                <li id="menu-item-682"
                                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-682">
                                    <a title="Cửa hàng" href="javascript:;" @click="$router.push('/cua-hang')">
                                        Cửa
                                        hàng
                                    </a>
                                </li>
                                <li id="menu-item-685"
                                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-685">
                                    <a title="Địa điểm" href="javascript:;" @click="$router.push('/deal')">Deal</a>
                                </li>
                                <li id="menu-item-685"
                                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-685">
                                    <a title="Địa điểm" href="javascript:;" @click="$router.push('/coupon')">Coupon</a>
                                </li>
                                <li id="menu-item-685"
                                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-685">
                                    <a title="Địa điểm" href="javscript:;" @click="$router.push('/dia-diem')">
                                        Địa
                                        điểm
                                    </a>
                                </li>
                                <li id="menu-item-689"
                                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-689">
                                    <a title="Tin tức" href="javascript:;" @click="$router.push('/tin-tuc')">
                                        Tin
                                        tức
                                    </a>
                                </li>
                                <li id="menu-item-688"
                                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-688">
                                    <a title="Liên hệ" href="javascript:;" @click="$router.push('/lien-he')">
                                        Liên
                                        hệ
                                    </a>
                                </li>
                                <!--<li id="menu-item-684"-->
                                <!--class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-684 dropdown">-->
                                <!--<a title="Tài khoản" href="http://spadi.vn/tai-khoan/" data-toggle="dropdown"-->
                                <!--class="dropdown-toggle" data-hover="dropdown" aria-haspopup="true">Tài khoản <i-->
                                <!--class="fa fa-angle-down"></i></a>-->
                                <!--<ul role="menu" class=" dropdown-menu">-->
                                <!--<li id="menu-item-687"-->
                                <!--class="menu-item menu-item-type-post_type menu-item-object-page menu-item-687">-->
                                <!--<a title="Đăng kí" href="http://spadi.vn/dang-ki/">Đăng kí</a></li>-->
                                <!--</ul>-->
                                <!--</li>-->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="small-device-categories" style="max-height: none;">
                <a href="javascript:;" class="categories-trigger">
                    <i class="fa fa-bars"></i>
                </a>
                <div class="small-device-wrapper">
                    <h5 class="small-device-title">Categories</h5>
                    <ul class="list-unstyled">
                        <li>
                            <a href="http://spadi.vn/search-page/offer_cat/cham-soc-co-the/">
                                Body - Chăm sóc cơ thể
                            </a>
                        </li>
                        <li>
                            <a href="http://spadi.vn/search-page/offer_cat/cham-soc-da-mat/">
                                Face - Chăm sóc da mặt
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <nuxt-child></nuxt-child>
        <section class="widget-footer">
            <div class="container">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="widget white-block widget_text">
                            <div class="textwidget">
                                <p>
                                    <img src="http://localhost/wordpress/wp-content/uploads/2017/10/Untitled-6.png"
                                         alt="">
                                </p>
                                <p>Spadi.vn là trang web </p>
                            </div>
                        </div>
                        <div class="widget white-block widget_couponxxl_payments">
                            <ul class="list-unstyled">
                                <li>
                                    <a href="https://stripe.com/">
                                        <img src="http://spadi.vn/wp-content/themes/couponxxl/images/small-stripe.png"
                                             width="32" height="22" alt="stripe">
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.ideal.nl">
                                        <img src="http://spadi.vn/wp-content/themes/couponxxl/images/small-ideal.png"
                                             width="32" height="22" alt="ideal">
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.skrill.com/en/">
                                        <img src="http://spadi.vn/wp-content/themes/couponxxl/images/small-skrill.png"
                                             width="32" height="22" alt="skrill">
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.payumoney.com/">
                                        <img src="http://spadi.vn/wp-content/themes/couponxxl/images/small-payumoney.png"
                                             width="32" height="22" alt="payumoney">
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.paypal.com">
                                        <img src="http://spadi.vn/wp-content/themes/couponxxl/images/small-paypal.png"
                                             width="32" height="22" alt="paypal">
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.swift.com/">
                                        <img src="http://spadi.vn/wp-content/themes/couponxxl/images/small-bank.png"
                                             width="32" height="22" alt="bank">
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="widget white-block widget_couponxxl_useful_links">
                            <div class="widget-title"><h5>Useful Links</h5></div>
                            <ul class="list-unstyled">
                                <li>
                                    <a href="http://demo.powerthemes.club/themes/couponxxl/how-it-works/">
                                        How it
                                        works?
                                    </a>
                                </li>
                                <li>
                                    <a href="http://demo.powerthemes.club/themes/couponxxl/terms-conditions/">
                                        Terms
                                        &amp; Conditions
                                    </a>
                                </li>
                                <li>
                                    <a href="http://demo.powerthemes.club/themes/couponxxl/all-stores/">Stores</a>
                                </li>
                                <li>
                                    <a href="http://demo.powerthemes.club/themes/couponxxl/shortcodes/">Shortcodes</a>
                                </li>
                                <li><a href="http://demo.powerthemes.club/themes/couponxxl/contact/">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="widget white-block widget_couponxxl_follow_us">
                            <div class="widget-title"><h5>Follow Us</h5></div>
                            <ul class="list-unstyled list-inline store-social-networks">
                                <li>
                                    <a href="https://www.facebook.com/powerthemesclub">
                                        <i class="fa fa-facebook-square"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/powerthemesclub">
                                        <i class="fa fa-twitter-square"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://plus.google.com/+POWERTHEMES">
                                        <i class="fa fa-google-plus-square"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="widget white-block widget_text">
                            <div class="textwidget">
                                <p>
                                    <a href="http://www.themeforest.net/user/pebas"
                                       target="_blank">
                                        <img src="http://demo.powerthemes.club/themes/couponxxl/wp-content/uploads/2016/02/app-ios.png"
                                             alt="" width="222" height="72">
                                    </a>
                                </p>
                                <p>
                                    <a href="http://www.themeforest.net/user/pebas" target="_blank">
                                        <img src="http://demo.powerthemes.club/themes/couponxxl/wp-content/uploads/2016/02/app-android.png"
                                             alt="" width="222" height="72">
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="footer">
            <div class="container">
                <div class="text-center">
                    Copyright by <a href="http://Spadi.vn">Spadi</a> - Copyrights 2016.
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import Logo from '~/components/Logo.vue'
    import $ from 'jquery'
    import Cookies from 'js-cookie'
    import Cookie from 'cookie'
    import jwt from 'json-web-token'

    export default {
        head: {
            title: 'Trang chủ | Spadi.vn',
            link: [
                {rel: 'stylesheet', href: ' /css/customize.css'},
                {rel: 'stylesheet', href: ' /css/magnific-popup.css'},
                {rel: 'stylesheet', href: ' /css/owl.carousel.css'},
                {rel: 'stylesheet', href: ' /css/pline.css'},
                {href: "https://fonts.googleapis.com/css?family=Open+Sans", rel: "stylesheet"}
            ],
            script: []
        },
        components: {
            Logo
        },
        data() {
            return {
                v: {
                    menuRightIsShow: false,
                    keyword: '',
                }
            }
        },
        beforeMount() {
            this.EB.$on('updateCart', (_idSp) => {
                let cartData = this.getCookie('userCart');
                if (typeof cartData === 'undefined') {
                    let newCart = {};
                    newCart[_idSp] = 1;
                    jwt.encode(process.env.jwt_KEY, newCart, (jwterror, jwtdata) => {
                        if (!jwterror) {
                            this.setCookie('userCart', jwtdata);
                            this.m_getAndUpdateCartNumber();
                        }
                    })
                }
                else {

                    jwt.decode(process.env.jwt_KEY, cartData, async (jwtError, jwtData) => {
                        if (!jwtError) {
                            let newCart = jwtData;
                            if (typeof newCart[_idSp] === 'undefined') newCart[_idSp] = 1;
                            else newCart[_idSp] += 1;
                            await jwt.encode(process.env.jwt_KEY, newCart, (jwterror2, jwtdata2) => {
                                if (!jwterror2) {
                                    this.setCookie('userCart', jwtdata2);
                                    this.m_getAndUpdateCartNumber();
                                }
                            })
                        }
                    })
                }
            })
            this.EB.$on('removeCart', (_idSp) => {
                alert(_idSp);
            })
            this.m_getAndUpdateCartNumber();
        },
        mounted() {
           // this.m_windowInit();
        },
        methods: {
            m_windowInit() {
                if (this.m_checkF(this.getCookie('AdminToken'))) this.$store.commit('updateAdminToken', this.getCookie('AdminToken'));
                if (this.m_checkF(this.getCookie('ClientToken'))) this.$store.commit('updateClientToken', this.getCookie('ClientToken'));
                if (this.m_checkF(this.getCookie('AdminInfo'))) {
                    jwt.decode(process.env.jwt_KEY, this.getCookie('AdminInfo'), async (jwrError, jwtData) => {
                        if (!jwrError) await this.$store.commit('updateAdminInfo', jwtData);
                    });
                }
                if (this.m_checkF(this.getCookie('ClientInfo'))) {
                    jwt.decode(process.env.jwt_KEY, this.getCookie('ClientInfo'), async (jwrError, jwtData) => {
                        if (!jwrError) await this.$store.commit('updateClientInfo', jwtData);
                    });
                }
                if (this.m_checkF(this.getCookie('AdminRole'))) this.$store.commit('updateAdminRole', this.getCookie('AdminRole'));
                if (this.m_checkF(this.getCookie('ClientRole'))) this.$store.commit('updateClientRole', this.getCookie('ClientRole'));
                if (this.m_checkF(this.getCookie('currentLocation'))) this.$store.commit('updateCurrentLocation', JSON.parse(this.getCookie('currentLocation')));
            },
            m_checkF(object) {
                if (typeof object !== 'undefined' && object !== 'undefined' && object !== '') return true;
                return false;
            },
            m_getAndUpdateCartNumber() {
                let cartData = this.getCookie('userCart');
                if (typeof cartData === 'undefined') this.$store.commit('updateClientCartNumber', 0);
                else {
                    jwt.decode(process.env.jwt_KEY, cartData, (jwtError, jwtData) => {
                        if (!jwtError) {
                            let mCount = 0;
                            Object.entries(jwtData).forEach(([key, val]) => {
                                mCount += val;
                            })
                            this.$store.commit('updateClientCartNumber', mCount);
                        }
                    })
                }
            },
            m_ClientLogout() {
                this.setCookie('ClientInfo', '');
                this.setCookie('ClientRole', '');
                this.setCookie('ClientToken', '');
                this.$store.commit('updateClientRole', '');
                this.$store.commit('updateClientInfo', {
                    name: '',
                    phone: '',
                    address: '',
                    role: '',
                });
                this.$store.commit('updateClientToken', '');
                window.location.reload();
            },
            m_Filter(e) {
                if (typeof e !== 'undefined') e.preventDefault();
                this.$router.push('/tim-kiem?q=' + this.v.keyword);
            }
        }
    }
</script>
<style scoped>

</style>

const webpack = require('webpack');
//const BASE = 'http://192.168.31.199:8000';
const BASE = 'https://spadi.com.vn';
const BASE_URL = `${BASE}/api`;

const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
    router: {
        linkActiveClass: 'active',
    }
} : {}

module.exports = {
    transition: {
        name: 'page',
        mode: 'out-in',
        beforeEnter(el) {

        }
    },
    env: {
        PORT: 9999,
        API: {
            User_RegisterBuyer: `${BASE_URL}/user/register/buyer`,
            User_RegisterSeller: `${BASE_URL}/user/register/seller`,
            User_GetInfoByCode: `${BASE_URL}/user/profile-code?q=`,
            User_ActiveByCode: `${BASE_URL}/user/verify?q=`,
            User_UpdateProfile: `${BASE_URL}/user/update`,
            User_ChangePassword: `${BASE_URL}/user/change-password`,
            AdminLogin: `${BASE_URL}/user/authenticate`,
            UserLogin: `${BASE_URL}/user/authenticate`,
            UserGetProfile: `${BASE_URL}/user/profile`,
            Chain_Create: `${BASE_URL}/chain/create`,
            Chain_List: `${BASE_URL}/chain/list`,
            Chain_DetailById: `${BASE_URL}/chain/detail?_id=`,
            Chain_Update: `${BASE_URL}/chain/update`,
            Chain_PublicGetList: `${BASE_URL}/chain/public`,
            Chain_publicGetDetailByData: `${BASE_URL}/chain/public/`,
            Chain_GetAddress: `${BASE_URL}/chain/address`,
            City_List: `${BASE_URL}/city/list`,
            Shop_Create: `${BASE_URL}/shop/create`,
            Shop_ListByChain: `${BASE_URL}/shop/list?chain=`,
            Shop_List: `${BASE_URL}/shop/list`,
            Shop_DetailById: `${BASE_URL}/shop/detail?_id=`,
            Shop_Update: `${BASE_URL}/shop/update`,
            Deal_Create: `${BASE_URL}/deal/create`,
            Deal_List: `${BASE_URL}/deal/list?chain=`,
            Deal_GetDetailByID: `${BASE_URL}/deal/detail?_id=`,
            Deal_Update: `${BASE_URL}/deal/update`,
            Deal_Remove: `${BASE_URL}/deal/remove`,
            Deal_PublicGetByType: `${BASE_URL}/deal/public`,
            Deal_PublicGetDetailByData: `${BASE_URL}/deal/public/`,
            Deal_PublicGetCommentByData: `${BASE_URL}/deal/comment/`,
            Deal_Comment: `${BASE_URL}/deal/comment`,
            UploadImage: `${BASE_URL}/utilities/upload/single`,
            Category_Get: `${BASE_URL}/category/service/list`,
            Coupon_Create: `${BASE_URL}/coupon/create`,
            Coupon_List: `${BASE_URL}/coupon/list`,
            Coupon_GetDetailById: `${BASE_URL}/coupon/detail?_id=`,
            Coupon_Update: `${BASE_URL}/coupon/update`,
            Coupon_PublicGet: `${BASE_URL}/coupon/public`,
            Coupon_PublicGetDetail: `${BASE_URL}/coupon/public/`,
            Coupon_GetCode: `${BASE_URL}/coupon/get`,
            Coupon_Check: `${BASE_URL}/coupon/check`,
            Coupon_GetForUser: `${BASE_URL}/coupon/get`,
            Coupon_Comment: `${BASE_URL}/coupon/comment`,
            Coupon_PublicGetCommentByData: `${BASE_URL}/coupon/comment/`,
            Post_Create: `${BASE_URL}/post/create`,
            Post_GetList: `${BASE_URL}/post/list`,
            Post_Update: `${BASE_URL}/post/update`,
            Post_Remove: `${BASE_URL}/post/remove?_id=`,
            Post_GetListPublic: `${BASE_URL}/post/public`,
            Post_GetPublicByData: `${BASE_URL}/post/public/`,
            Post_Comment: `${BASE_URL}/post/comment`,
            GMAP_GETDISTACE: `https://maps.googleapis.com/maps/api/distancematrix/json?key=&origins=`,
            Search_ByKeyword: `${BASE_URL}/search/s?q=`,
            Search_Suggest: `${BASE_URL}/search/suggest?q=`,
            Search_Location: `${BASE_URL}/search/address`,
            Search_ByChain: `${BASE_URL}/search/chain`
        },
        BASE: BASE,
        BASE_URL: BASE_URL,
        IMAGE_BASE: `${BASE}/assets/upload/`,
        jwt_KEY: 'spadivn_x'
    },
    /*
    ** Headers of the page
    */
    ...routerBase,
    css: [
        '@/assets/css/main.css',
        '@/assets/js/plugins/pace/pace.min.css',
        '@/assets/css/AdminLTE.min.css',
        '@/assets/css/skinBlue.min.css',
        '~/node_modules/quill/dist/quill.snow.css',
        '~/node_modules/quill/dist/quill.bubble.css',
        '~/node_modules/quill/dist/quill.core.css'
    ],

    asyncData({route}) {
        return {
            routePath: route.fullPath
        }
    },
    head() {
        return {
            title: 'spadishops',
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {hid:'description',name: 'description', content: 'Mô tả'},
                {hid:'og:locale',name: 'og:locale', content: 'vi_VN'},
                {hid:'og:type',name: 'og:type', content: 'article'},
                {hid:'og:title',name: 'og:title', content: 'Spadi.vn | Coupon, Deal miễn phí'},
                {hid:'og:description',name: 'og:description', content: ''},
                {hid:'og:site_name',name: 'og:site_name', content: 'Spadi.vn'},
                {hid:'og:image',name: 'og:image', content: 'https://www.omnihotels.com/-/media/images/globals/spa/facial-86487979.jpg?h=660&la=en&w=1170'},
                {hid:'og:image:width',name: 'og:image:width', content: '650'},
                {hid:'og:image:height',name: 'og:image:height', content: '650'},
            ],
            link: [
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
                {
                    rel: 'stylesheet',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css'
                },
                {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans'},
                {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css'},
                {rel: 'stylesheet', href: '/js/plugins/pace/pace.min.css'},
                {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
                {rel: 'stylesheet', href: '/css/bootstrap.min.css'},
                {rel: 'stylesheet', href: '/css/AdminLTE.min.css'},
                {rel: 'stylesheet', href: '/css/skinBlue.min.css'},

            ],
            script: [
                {src: '/js/plugins/jQuery/jQuery-2.2.0.min.js'},
                {src: '/js/plugins/bootstrap/bootstrap.min.js'},
                {src: '/js/plugins/AdminLTE/app.min.js'},
                {src: '/js/plugins/pace/pace.min.js'},
                {src: 'https://cdn.quilljs.com/1.3.4/quill.js'},
                {src: 'https://apis.google.com/js/platform.js'},
                {type: 'javascript', src: '/js/custom.js'},


            ],
        }
    },
    /*
    ** Customize the progress bar color
    */
    loading: {color: '#3B8070'},

    plugins: ['~/plugins/main', '~/plugins/default', '~/plugins/element-ui',
        {src: '~plugins/nuxt-quill-plugin', ssr: false},

    ],

    build: {
        vendor: ['vue-quill-editor', 'element-ui', 'vue-js-modal', 'axios'],
        extractCSS: true,
        babel: {
            'presets': ['vue-app','es2015','stage-0'],
            'plugins': [
                ['component', [{
                    'libraryName': 'element-ui',
                    'styleLibraryName': 'theme-chalk'
                }],
                ["transform-runtime",{
                    "polyfill":true,
                    "regenerator":true
                }]
            ]
            ],
            'comments': false
        },

        /*
        ** Run ESLint on save
        */
        extend(config, {isServer}) {

        }
    },
    modules: [
        '@nuxtjs/axios',
    ],

    axios: {
        // proxyHeaders: false
    }
}

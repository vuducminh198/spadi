const webpack = require('webpack');
const BASE = 'http://192.168.31.199:8000'
const BASE_URL = `${BASE}/api`;


module.exports = {
    router: {
        base: '/spadishop/'
    },
    env: {
        PORT: 9999,
        API: {
            User_RegisterBuyer: `${BASE_URL}/user/register/buyer`,
            User_RegisterSeller: `${BASE_URL}/user/register/seller`,
            User_GetInfoByCode: `${BASE_URL}/user/profile-code?q=`,
            User_ActiveByCode: `${BASE_URL}/user/verify?q=`,
            AdminLogin: `${BASE_URL}/user/authenticate`,
            UserLogin: `${BASE_URL}/user/authenticate`,
            UserGetProfile: `${BASE_URL}/user/profile`,
            Chain_Create: `${BASE_URL}/chain/create`,
            Chain_List: `${BASE_URL}/chain/list`,
            Chain_DetailById: `${BASE_URL}/chain/detail?_id=`,
            Chain_Update: `${BASE_URL}/chain/update`,
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
            UploadImage: `${BASE_URL}/utilities/upload/single`,
            Category_Get: `${BASE_URL}/category/service/list`,
            Coupon_Create: `${BASE_URL}/coupon/create`,
            Coupon_List: `${BASE_URL}/coupon/list`,
            Coupon_GetDetailById: `${BASE_URL}/coupon/detail?_id=`,
            Coupon_Update: `${BASE_URL}/coupon/update`,
            Coupon_PublicGet: `${BASE_URL}/coupon/public`,
            Coupon_PublicGetDetail: `${BASE_URL}/coupon/public/`,
            Coupon_GetForUser: `${BASE_URL}/coupon/get`,
            Coupon_Comment: `${BASE_URL}/coupon/comment`
        },
        BASE: BASE,
        BASE_URL: BASE_URL,
        IMAGE_BASE: `${BASE}/assets/upload/`,
        jwt_KEY: 'spadivn_x'
    },
    /*
    ** Headers of the page
    */
    router: {
        linkActiveClass: 'active'
    },
    css: [
        '@/assets/css/main.css',
        '@/assets/js/plugins/pace/pace.min.css',
        '@/assets/css/AdminLTE.min.css',
        '@/assets/css/skinBlue.min.css',
        '~/node_modules/quill/dist/quill.snow.css',
        '~/node_modules/quill/dist/quill.bubble.css',
        '~/node_modules/quill/dist/quill.core.css'
    ],


    head: {
        title: 'spadishops',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Nuxt.js project'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css'
            },
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
            {type: 'javascript', src: '/js/custom.js'},

        ],
    },
    /*
    ** Customize the progress bar color
    */
    loading: {color: '#3B8070'},

    plugins: ['~/plugins/main', '~/plugins/default', '~/plugins/element-ui',
        {src: '~plugins/nuxt-quill-plugin', ssr: false},

    ],

    build: {
        vendor: ['vue-quill-editor', 'element-ui'],
        babel: {
            'presets': ['vue-app'],
            'plugins': [
                ['component', [{
                    'libraryName': 'element-ui',
                    'styleLibraryName': 'theme-chalk'
                }]]
            ],
            'comments': false
        },

        /*
        ** Run ESLint on save
        */
        extend(config, ctx) {
            if (ctx.dev && ctx.isClient) {
                // config.module.rules.push({
                //   enforce: 'pre',
                //   test: /\.(js|vue)$/,
                //   loader: 'eslint-loader',
                //   exclude: /(node_modules)/
                // })
            }
        }
    },
    modules: [
        '@nuxtjs/axios',
    ],

    axios: {
        // proxyHeaders: false
    }
}

import vueWysiwyg from 'vue-wysiwyg'
import Vue from 'vue'
Vue.use(vueWysiwyg,{
    image: {
        uploadURL: process.env.API.UploadImage,
        dropzoneOptions: {}
    }
});
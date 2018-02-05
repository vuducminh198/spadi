<style>
    .readMoreLink {
        color: #439A46;
    }

    .readMoreLink:hover {
        color: #439A46;
        opacity: .8;
    }
</style>
<template>
    <div class="container-fuild">
        <div>
            <template v-if="!mainData.isError">
                <div class=" col-sm-6 col-xs-12" style="padding-left:0;">
                    <div v-for="item,index in mainData.data" v-if="index%2===1"
                         style="margin-bottom:20px; ">
                        <div style="background-color:white;">
                            <div :style="`width:100%; background-size:cover; height:220px;background-image:url(${img_base+item.mainImg})`">
                            </div>
                            <div style="padding:20px;">
                                <p style="font-family: 'Open Sans'; font-size:24px;">{{item.title}}</p>
                                <p style="color:rgba(45,45,48,.8)">{{item.description}}</p>
                                <div class="text-right">
                                    <a href="javascript:;" @click="m_toObject(item)" class="readMoreLink">CHI TIẾT
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class=" col-sm-6 col-xs-12" style="padding-left:0;">
                    <div v-for="item,index in mainData.data" v-if="index%2===0"
                         style="margin-bottom:20px;">
                        <div style="background-color:white;">
                            <div :style="`width:100%; background-size:cover; height:220px;background-image:url(${img_base+item.mainImg})`">
                            </div>
                            <div style="padding:20px;">
                                <p style="font-family: 'Open Sans'; font-size:24px;">{{item.title}}</p>
                                <p style="color:rgba(45,45,48,.8)">{{item.description}}</p>
                                <div class="text-right">
                                    <a href="javascript:;" @click="m_toObject(item)" class="readMoreLink">CHI TIẾT
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </template>
        </div>

    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        async asyncData({redirect}) {
            let mainData = {};
            await  axios.get(process.env.API.Post_GetListPublic+'?chain=')
                .then(res => {
                    mainData.data = res.data;
                    mainData.isError = false;
                })
                .catch(error => {
                    mainData.isError = true;
                    redirect('/404');
                })
            return {mainData}
        },
        head() {
            return {
                title: 'Tin tức '+ ' | Spadi.vn'
            }
        },
        data() {
            return {}
        },
        methods: {
            m_toObject(item) {
                this.$router.push(`/cua-hang/${this.$route.params.slug}/tin-tuc/${item.slug}`);
            }
        }
    }
</script>

<style scoped>
    .mxLink {
        color: #439A46;
        font-family: 'Open Sans'
    }

    .mxLink:hover {
        opacity: .9;
    }
</style>
<template>
    <div class="container" style="margin-top:20px;">
        <div class="col-sm-8">
            <div v-for="item in mainData.listPost" style="background-color:white; margin-bottom:20px;">
                <div :style="`width:100%; height:300px; margin-bottom:15px; background-size:cover; background-image:url(${img_base+item.mainImg})`"></div>
                <div style="padding:10px;">
                    <div style="width:150px; position: absolute; padding:15px; padding-top:0; ">
                        <div style="padding:10px; background-color:whitesmoke; border-top:0;" class="box">
                            <div style="font-family: 'Open Sans'; font-size:32px; color:rgba(45,45,48,.8); font-weight: bold; text-align:center">
                                {{_date(item.createdAt)}}
                            </div>
                            <div style="text-align:center; color:rgba(45,45,48,.6);font-size:18px;">
                                TH{{_month(item.createdAt)}} {{_year(item.createdAt)}}
                            </div>
                            <div style="font-size:12px; font-family: 'Open Sans'; margin-top:5px; text-align:center;">
                                {{item.createdBy.name}}
                            </div>
                        </div>
                    </div>
                    <div style="width:100%; padding-left:150px; min-height:100px;">
                        <h5 style="font-family: 'Open Sans'; margin:0; padding:0;">{{item.title}}</h5>
                        <p style="font-family: 'Open Sans'">{{item.description}}</p>
                    </div>
                    <div class="text-right">
                        <a href="javascript:;" @click="$router.push(`/tin-tuc/${item.slug}`)" class="mxLink">Đọc tiếp</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div style="background-color:white; padding: 26px;">
                <h6 class="headText">Danh mục</h6>
                <ul style="margin:0; padding:0; list-style-type: none; margin-top:30px;">

                </ul>
            </div>
            <div style="background-color:white; padding: 26px; margin-top:20px;">
                <h6 class="headText">Bài viết mới</h6>
                <ul style="margin:0; padding:0; list-style-type: none; margin-top:30px;">

                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        name: 'home-tintuc',
        async asyncData({redirect}) {
            let mainData = {};
            await axios.get(process.env.API.Post_GetListPublic)
                .then(res => {
                    mainData.listPost = res.data;
                    mainData.isError = false;
                })
                .catch(error => {
                    mainData.isError = true;
                })

            return {mainData};
        },
        beforeMount(){
              this.m_getListCommentOfNews();
        },
        methods: {
            _date(time) {
                let date = new Date(time);
                return date.getDate().toString().length === 1 ? '0' : '' + date.getDate();
            },
            _month(time) {
                let date = new Date(time);
                // return (date.getMonth() + 1).toString().length===1?'0':'' + (date.getMonth() + 1);
                let currentMonth = date.getMonth() + 1
                return currentMonth.length === 1 ? '0' : '' + currentMonth.toString();
            },
            _year(time) {
                let date = new Date(time);
                return date.getFullYear();
            },
            m_getListCommentOfNews(){
                this.$http.get(process.env.API.Post_)
            }
        }

    }
</script>
<template>
    <div class="container" style="margin-top:20px;">
        <div class="row">
            <div class="col-sm-8">
                <div style="padding:10px; background-color:white;">
                    <img :src="img_base +mainData.data.mainImg" style="width:100%;"/>
                    <div>
                        <h2 style="font-family: 'Open Sans'">{{mainData.data.title}}</h2>
                        <span style="font-size:13px;">Lúc {{mainData.data.createdAt | fullTime}}</span>
                        <div v-html="mainData.data.content" style="margin-top:20px; font-family: 'Open Sans'"></div>
                        <div>
                            <table style="width:100%;">
                                <tbody>
                                <tr>
                                    <td style="width:20px;"><span class="material-icons">label_outline</span></td>
                                    <td>
                                        <template v-for="item,index in mainData.data.tags">
                                            <span v-if="index!==0" style="background-color:white; margin: 3px;">,</span>
                                            <span style="font-family: 'Open Sans'; background-color:whitesmoke; border-radius: 4px; padding:3px; font-size:14px;">
                                         {{item}}
                                             </span>

                                        </template>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <div style="margin-top:20px">
                    <p style="font-family: 'Open Sans'; font-size:24px; font-weight: bold;">
                        BÌNH LUẬN
                    </p>
                    <div style="border-radius: 0; background-color:white; padding:20px;">
                        <c-comment typeName="bài viết" :url_api="c_URL" :_id="mainData.data._id"></c-comment>
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


    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        scrollToTop: true,
        async asyncData({route, redirect}) {
            let mainData = {};
            await axios.get(process.env.API.Post_GetPublicByData + route.params.new)
                .then(res => {
                    if (res === null || res.data === null) redirect(`/${route.params.slug}/tin-tuc/404`);
                    mainData.data = res.data;
                    mainData.isError = false;
                })
                .catch(error => {
                    mainData.isError = true;
                    redirect(`/${route.params.slug}/tin-tuc/404`);
                })
            return {mainData, currentURLPath: route.fullPath};
        },
        head() {
            return {
                title: this.mainData.data.title + ' | Spadi.vn',
                meta: [
                    {name: 'description', content: this.mainData.data.description},
                    {name: 'og:locale', content: 'vi_VN'},
                    {name: 'og:type', content: 'article'},
                    {name: 'og:title', content: this.mainData.data.title},
                    {name: 'og:description', content: this.mainData.data.description},
                    {name: 'og:url', content: this.currentURLPath},
                    {name: 'og:site_name', content: this.mainData.data.title},
                    {name: 'og:image', content: process.env.IMAGE_BASE + this.mainData.data.mainImg},
                    {name: 'og:image:width', content: '650'},
                    {name: 'og:image:height', content: '650'},

                ],
            }
        },
        data() {
            return {
                v: {
                    isSending: false
                },
                form: {
                    postMessage: {
                        name: '',
                        email: '',
                        content: '',
                    }
                }
            }
        },
        computed: {
            c_URL(){
                return process.env.API.Post_Comment;
            },
            date() {
                let date = new Date(this.mainData.data.createdAt);
                return date.getDate();
            },
            month() {
                let date = new Date(this.mainData.data.createdAt);
                return date.getMonth() + 1;
            },
            year() {
                let date = new Date(this.mainData.data.createdAt);
                return date.getFullYear();
            }
        },
        methods: {
            m_sendComment(e) {
                let header = {
                    'Content-Type': 'application/json'
                };
                let postForm = {_id: this.mainData.data._id, content: this.form.postMessage.content};
                if (this.$store.state.ClientInfo.role === 'user' && this.$store.state.ClientToken.length > 10)
                    header.Authorization = `Bearer ${this.$store.state.ClientToken}`
                else {
                    postForm = this.form.postMessage;
                    postForm._id = this.mainData.data._id;
                }
                this.v.isLoading = true;
                this.$http.post(process.env.API.Post_Comment, postForm, {headers: header})
                    .then(data => {
                        this.form.postMessage.content = '';
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
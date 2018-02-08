<template>
    <div class="container-fluid">
        <div style="padding:10px; background-color:white;">
            <img :src="img_base +mainData.data.mainImg" style="width:100%;"/>
            <div style="display: flex; flex: 1">
                <div style="flex: 2; width:100px">
                    <div style="padding:5px;">
                        <div style="background-color:whitesmoke; margin:10px; margin-top:35px; color:black; font-family: 'Open Sans'; padding:20px;">
                            <p style="text-align: center; font-size:32px; font-weight: bold">{{date}}</p>
                            <p style="text-align: center">TH{{month}} {{year}}</p>
                        </div>
                    </div>
                </div>
                <div style="flex: 8; font-family: 'Open Sans'">
                    <h2 style="font-family: 'Open Sans'; margin-top:30px;">{{mainData.data.title}}</h2>
                    <div v-html="mainData.data.content" style="font-family: 'Open Sans'"></div>
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
        </div>
        <div style="margin-top:20px">
            <p style="font-family: 'Open Sans'; font-size:24px; font-weight: bold;">
                BÌNH LUẬN
            </p>
            <div style="border-radius: 0; background-color:white; padding:20px;">
                <div class="white-block">
                    <div class="white-block-content">
                        <div id="respond" class="comment-respond">
                            <form class="comment-form">
                                <template
                                        v-if="$store.state.ClientInfo.role!=='user' || $store.state.ClientToken!==null &&  $store.state.ClientToken.length<10">
                                    <div class="input-group">
                                        <label for="author">Họ tên<span class="required">*</span></label>
                                        <input type="text" v-model="form.postMessage.name" class="form-control"
                                               name="author" id="author">
                                        <i class="pline-user"></i>
                                    </div>
                                    <div class="input-group">
                                        <label for="comment-email">Email<span class="required">*</span></label>
                                        <input type="text" v-model="form.postMessage.email" class="form-control"
                                               name="email" id="comment-email">
                                        <i class="pline-envelope"></i>
                                    </div>
                                </template>
                                <template v-else>
                                    <p><span style="color:#439A46;">{{$store.state.ClientInfo.name}}</span>, bạn nghĩ gì
                                        về bài viết này?</p>
                                </template>
                                <div class="input-group">
                                    <label for="comment">Bình luận<span class="required">*</span></label>
                                    <textarea class="form-control" v-model="form.postMessage.content" name="comment"
                                              id="comment"></textarea>
                                    <i class="pline-message-cloud"></i>
                                </div>

                                <p class="form-submit">
                                    <grebtn @click="m_sendComment($event)" title="Bình luận"
                                            :round="false" :loading="v.isLoading"
                                            style="max-width:200px;"></grebtn>

                                </p>
                            </form>
                        </div><!-- #respond -->

                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
<script>
    import axios from 'axios'

    export default {
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
                    {hid:'description', name: 'description', content: this.mainData.data.description},
                    {hid:'og:locale',name: 'og:locale', content: 'vi_VN'},
                    {hid:'og:type',name: 'og:type', content: 'article'},
                    {hid:'og:title',name: 'og:title', content: this.mainData.data.title},
                    {hid:'og:description',name: 'og:description', content: this.mainData.data.description},
                    {hid:'og:url',name: 'og:url', content: this.currentURLPath},
                    {hid:'og:site_name',name: 'og:site_name', content: this.mainData.data.title},
                    {hid:'og:image',name: 'og:image', content: process.env.IMAGE_BASE + this.mainData.data.mainImg},
                    {hid:'og:image:width',name: 'og:image:width', content: '650'},
                    {hid:'og:image:height',name: 'og:image:height', content: '650'},

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
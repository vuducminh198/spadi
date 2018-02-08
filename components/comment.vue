<template>
    <div class="white-block">
        <div class="white-block-content">
            <div id="respond" class="comment-respond">
                <form class="comment-form">
                    <template
                            v-if="$store.state.ClientInfo.role!=='user' ||  $store.state.ClientToken!==null && $store.state.ClientToken.length<10">
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
                        <p><span style="color:#439A46;">{{$store.state.ClientInfo.name}}</span>, bạn
                            nghĩ gì
                            về {{typeName}} này?</p>
                    </template>
                    <div class="input-group">
                        <label for="comment">Bình luận<span class="required">*</span></label>
                        <textarea class="form-control" v-model="form.postMessage.content"
                                  name="comment"
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
</template>
<script>
    export default {
        name: 'comment',
        props: {
            url_api: {
                type: String
            },
            typeName: {
                type: String,
                default: 'bài viết'
            },
            _id: {
                type: String
            }
        },
        data() {
            return {
                v: {
                    isLoading: false,
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
        methods: {
            m_sendComment(e) {
                let header = {
                    'Content-Type': 'application/json'
                };
                let postForm = {_id: this._id, content: this.form.postMessage.content};
                if (this.$store.state.ClientInfo.role === 'user' && this.$store.state.ClientToken.length > 10)
                    header.Authorization = `Bearer ${this.$store.state.ClientToken}`
                else {
                    postForm = this.form.postMessage;
                    postForm._id = this._id;
                }
                this.v.isLoading = true;
                this.$http.post(this.url_api, postForm, {headers: header})
                    .then(data => {
                        this.form.postMessage.content = '';
                        this.v.isLoading = false;
                        this.$message({
                            type: "success",
                            message: typeof data.body.Message === 'undefined' ? 'Thao tác thành công' : data.body.Message
                        });
                        this.$emit('callback', true);
                    })
                    .catch(error => {
                        this.v.isLoading = false;
                        this.$emit('callback', true);
                        this.$message({
                            type: 'error',
                            message: (typeof error.body !== 'undefined' && typeof error.body.ErrorMessage !== 'undefined' ? error.body.ErrorMessage : 'Đã xảy ra sự cố, vui lòng kiểm tra và thử lại sau')
                        })
                    })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container-q {
        .quill-editor {
            min-height: 200px;
            max-height: 400px;
            overflow-y: auto;
        }
    }

    .plusHover:hover {
        filter: blur(1px);
        -webkit-transition: all .8s ease-in-out;
        -moz-transition: all .8s ease-in-out;
        -ms-transition: all .8s ease-in-out;
        -o-transition: all .8s ease-in-out;
        transition: all .8s ease-in-out;
    }

    .remove-image-class {
        width: 25px;
        height: 25px;
        border: 0;
        border-radius: 50vh;
        background-color: rgba(255, 255, 255, .2);
        outline: none;
    }

    .remove-image-class:hover {
        background-color: rgba(45, 45, 48, .6);
    }

    .remove-image-class:hover span {
        color: white;
        outline: none;
    }
</style>
<template>


    <div :class="!noBox?'box':''" style="padding:10px; ">

        <form @submit="m_formAddDealSubmit($event)">
            <div>
                <div class="container-fluid" style="padding:0;">
                    <div class="row">
                        <div class="col-sm-8">
                            <label class="bold">Tiêu đề</label>
                            <div>
                                <el-input v-model="form.addPost.title"></el-input>
                            </div>
                            <label class="mt-8 bold">Mô tả</label>
                            <div>
                                <el-input type="textarea" v-model="form.addPost.description"></el-input>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <label class="mt-8 bold">Danh mục bài viết</label>
                            <el-select style="width:100%;" multiple filterable v-model="form.addPost.serviceItem"
                                       no-data-text="Không có dữ liệu" no-match-text="Không có dữ liệu phù hợp"
                                       placeholder="Chọn danh mục sản phẩm">
                                <el-option-group
                                        v-for="group in v.listCategory"
                                        :value="group.name"
                                        :key="group.name"
                                        :label="group.name">
                                    <el-option
                                            v-for="item in group.item"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item._id">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                            <label class="mt-8 bold">Tag</label><br/>
                            <el-select style="width:100%;" placeholder="Thêm thẻ tag vào bài viết"
                                       no-match-text="Chưa có thẻ này trong danh sách" no-data-text="Chưa có thẻ nào"
                                       multiple
                                       filterable
                                       allow-create
                                       default-first-option
                                       v-model="form.addPost.tag">
                                <el-option v-for="item in form.addPost.tag" :key="item" :label="item"
                                           :value="item"></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-sm-12">
                        <label class="mt-8 bold">Ảnh chính (đại diện)</label><br/>
                        <div>
                            <template v-for="item,index in v.imageReview">
                                <div :style="'background-size:cover; float:left; margin-right:5px; width:200px; height:100px; border:1px solid rgba(45,45,8,.2); background-image:url('+item+')'">
                                    <button class="pull-right remove-image-class" type="button"
                                            @click="m_removeImageIndex(index)"><span class="el-icon-close"></span>
                                    </button>
                                </div>
                            </template>
                            <img src="~/assets/img/img-plus.svg" v-if="v.imageReview.length<1"
                                 class="plusHover"
                                 style="width:100px; height:100px; border:1px solid rgba(45,45,8,.2); cursor: pointer; "
                                 @click="m_openUploadImage"/>
                            <img
                                    style="width:100px; visibility: hidden; height:100px; border:1px solid rgba(45,45,8,.2); cursor: pointer; "
                            />
                            <input type="file" @change="m_InputFileChange($event)" id="inputFileUploadLisDeal"
                                   style="display: none" accept="image/jpeg">
                        </div>
                    </div>

                </div>
                <label class="mt-8 bold">Nội dung chi tiết</label>
                <section class="container-q">
                    <div class="quill-editor" id="mcontent"
                         :content="content"
                         v-quill:myQuillEditor="editorOption">
                    </div>
                </section>
                <div style="margin-top:20px;">
                    <grebtn title="Thêm bài viết này" :loading="v.isLoading" :type="'submit'"></grebtn>
                </div>
            </div>

        </form>
    </div>
</template>
</template>
<script>
    import $ from 'jquery'
    import Vue from 'vue';

    import {Input, InputNumber} from 'element-ui'
    import moment from 'moment'


    export default {
        components: {},
        head: {
            title: 'Thêm mới bài viết cho trang của bạn - Spadi.vn'
        },
        props: {
            noBox: {
                type: Boolean,
                default: false
            }
        },
        name: 'deal_create',
        data() {
            return {
                content: '',
                editorOption: {
                    // some quill options
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{'header': 1}, {'header': 2}],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{'script': 'sub'}, {'script': 'super'}],
                            [{'indent': '-1'}, {'indent': '+1'}],
                            [{'direction': 'rtl'}],
                            [{'size': ['small', false, 'large', 'huge']}],
                            [{'header': [1, 2, 3, 4, 5, 6, false]}],
                            [{'font': []}],
                            [{'color': []}, {'background': []}],
                            [{'align': []}],
                            ['clean'],
                            ['link', 'image', 'video']
                        ],
                    }
                },
                v: {
                    imageReview: [],
                    currentObjectImage: null,
                    isLoading: false,
                    listCategory: [],
                    listShop: [],
                },
                form: {
                    addPost: {
                        title: '',
                        description: '',
                        content: '',
                        meta: [],
                        tag: [],
                        shop: [],
                        images: [],
                    }
                },

                value3: [Date.now(), Date.now()],
            }
        },
        computed: {
            listIMG: function () {
                return this.v.imageReview;
            },
        },
        beforeMount() {
            $(document).ready(() => {
                $('.ql-formats button').addClass('btn cusbtn');
                $('.ql-formats .ql-picker ').addClass(' cusbtn');
                $('.ql-formats').addClass('btn-group');
                $('.ql-formats').css('margin-bottom:5px;');
            })
        },
        methods: {

            m_getCategory() {
                this.$http.get(process.env.API.Category_Get)
                    .then(data => {
                        this.v.listCategory = data.body;
                    })
                    .catch(error => {
                    })
            },
            moment: function () {
                return moment();
            },
            m_InputFileChange(e) {
                this.v.currentObjectImage = e.target.files || e.dataTransfer.files;
                for (let i = 0; i < this.v.currentObjectImage.length; i++)
                    if (this.v.imageReview.length < 6) {
                        this.form.addPost.images.push(this.v.currentObjectImage[i]);
                        let fileReader = new FileReader();
                        fileReader.onload = (e1) => {
                            this.v.imageReview.push(e1.target.result);
                        };
                        fileReader.readAsDataURL(this.v.currentObjectImage[i]);
                    }
            },
            m_openUploadImage() {
                $('#inputFileUploadLisDeal').click();
            },
            m_removeImageIndex(index) {
                let res = []
                this.v.imageReview.map((e, i) => {
                    if (i !== index) res.push(e);
                })
                this.v.imageReview = res;
                res = [];
                this.form.addPost.images.map((e, i) => {
                    if (i !== index) res.push(e);
                })
                this.form.addPost.images = res;

            },
            m_formAddDealSubmit(e) {
                e.preventDefault();
                let postForm = new FormData();
                postForm.append('title', this.form.addPost.title);
                postForm.append('description', this.form.addPost.description);
                postForm.append('content', $('#mcontent .ql-editor').html());
                this.form.addPost.tag.forEach(e => {
                    postForm.append('tag', e);
                })
                this.form.addPost.meta.forEach(e => {
                    postForm.append('meta', e)
                });
                postForm.append('file', this.form.addPost.images[0]);
                this.$confirm(`Bạn có chắc muốn thêm bài viết: ${this.form.addPost.title} choc cửa hàng ${this.$store.state.adminSelectedChain.name} không?`, 'Chú ý', {
                    type: 'warning',
                    confirmButtonText: 'Chắc chắn',
                    cancelButtonText: 'Không'
                })
                    .then(() => {
                        this.isLoading = true;
                        this.$http.post(process.env.API.Post_Create, postForm, this.cfA())
                            .then(data => {
                                this.form.isLoading = false;
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
                    })
                    .catch(() => {
                    })

            }
        }
    }
</script>

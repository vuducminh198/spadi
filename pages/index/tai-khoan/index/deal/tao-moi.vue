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


    <div class="box" style="padding:10px; ">
        <hint v-if="typeof  $store.state.adminSelectedChain._id==='undefined'"></hint>
        <form @submit="m_formAddDealSubmit($event)" v-else>
            <div>
                <label class="bold">Tiêu đề</label>
                <div style="max-width:600px;">
                    <el-input v-model="form.addDeal.title"></el-input>
                </div>
                <label class="mt-8 bold">Mô tả</label>
                <div style="max-width:600px;">
                    <el-input type="textarea" v-model="form.addDeal.description"></el-input>
                </div>


                <label class="mt-8 bold">Thời gian sử dụng</label>
                <div class="block" style="max-width: 600px">
                    <el-date-picker style="width:100%;"
                                    v-model="value3"
                                    type="datetimerange"
                                    range-separator="đến"
                                    start-placeholder="Thời gian bắt đầu"
                                    end-placeholder="Thời gian kết thúc">
                    </el-date-picker>
                </div>
                <el-row :gutter="20" style="max-width:600px;margin-top:10px; margin-bottom:10px;">
                    <el-col :md="12" :sm="12" :xs="24" :lg="12">
                        <label class="mt-8 bold">Danh mục sản phẩm</label>
                        <el-select style="width:100%;" multiple filterable v-model="form.addDeal.serviceItem"
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
                    </el-col>
                    <el-col :md="12" :sm="12" :xs="24" :lg="12">
                        <label class="mt-8 bold">Mặt hàng có tại</label>
                        <el-select style="width:100%;" multiple filterable v-model="form.addDeal.shop"
                                   no-data-text="Không có dữ liệu" no-match-text="Không có dữ liệu phù hợp"
                                   placeholder="Chọn danh cửa hàng">
                            <el-option-group
                                    v-for="group in listShopGroupByChain"
                                    :value="group.name"
                                    :key="group.name"
                                    :label="group.name">
                                <el-option
                                        v-for="item in group.shop"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item._id">
                                </el-option>
                            </el-option-group>
                        </el-select>

                    </el-col>
                </el-row>
                <el-row :gutter="20" style="max-width:600px;margin-top:10px; margin-bottom:10px;">
                    <el-col :md="12" :sm="12" :xs="24" :lg="12">
                        <label class="mt-8 bold">Số lượng</label><br/>
                        <el-input-number controls-position="right" v-model="form.addDeal.quantity" style="width:100%;" :min="1"
                                         :max="9999"></el-input-number>
                    </el-col>
                    <el-col :md="12" :sm="12" :xs="24" :lg="12">
                        <label class="mt-8 bold">Giá gốc</label><br/>
                        <el-input-number controls-position="right" style="width:100%;" v-model="form.addDeal.price"></el-input-number>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="max-width:600px;margin-top:10px; margin-bottom:10px;">

                    <el-col :md="12" :sm="12" :xs="24" :lg="12">
                        <label class="mt-8 bold">Kiểu giảm giá</label><br/>
                        <el-select style="width:100%;" v-model="form.addDeal.type">
                            <el-option value="percent" label="Phần trăm"></el-option>
                            <el-option value="cash" label="Tiền"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :md="12" :sm="12" :xs="24" :lg="12">
                        <label class="mt-8 bold">Giá trị</label><br/>
                        <el-input-number controls-position="right" style="width:100%;" v-model="form.addDeal.value"></el-input-number>
                    </el-col>
                </el-row>
                <label class="mt-8 bold">Hình ảnh (Tối đa 6 hình ảnh)</label><br/>
                <div>
                    <template v-for="item,index in v.imageReview">
                        <div :style="'background-size:cover; float:left; margin-right:5px; width:100px; height:100px; border:1px solid rgba(45,45,8,.2); background-image:url('+item+')'">
                            <button class="pull-right remove-image-class" type="button"
                                    @click="m_removeImageIndex(index)"><span class="el-icon-close"></span></button>
                        </div>
                    </template>
                    <img src="~/assets/img/img-plus.svg" v-if="v.imageReview.length<6"
                         class="plusHover"
                         style="width:100px; height:100px; border:1px solid rgba(45,45,8,.2); cursor: pointer; "
                         @click="m_openUploadImage"/>
                    <img
                            style="width:100px; visibility: hidden; height:100px; border:1px solid rgba(45,45,8,.2); cursor: pointer; "
                    />
                    <input type="file" multiple @change="m_InputFileChange($event)" id="inputFileUploadLisDeal"
                           style="display: none" accept="image/jpeg">
                </div>
                <label class="mt-8 bold">Nội dung chi tiết</label>
                <section class="container-q">
                    <div class="quill-editor" id="mcontent"
                         :content="content"
                         v-quill:myQuillEditor="editorOption">
                    </div>
                </section>
                <div style="margin-top:20px;">
                    <grebtn style="max-width:200px;" title="Tạo Deal" :loading="v.isLoading"  :type="'submit'"></grebtn>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
    import $ from 'jquery'
    import Vue from 'vue';
    import PriBtn from "~/components/button";
    import {Input, InputNumber} from 'element-ui'
    import moment from 'moment'


    export default {
        middleware: 'clientIsManager',
        components: {


            Input, InputNumber, PriBtn
        },
        head: {},
        name: 'deal_create',
        data() {
            return {
                content: '<p>I am Example</p>',
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
                    addDeal: {
                        title: '',
                        description: '',
                        content: '',
                        type: 'percent',
                        quantity: 1,
                        value: 10,
                        price: 1000,
                        from: '',
                        to: '',
                        shop: [],
                        serviceItem: [],
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
            listShopGroupByChain: function () {
                let listRes = [];
                let listChain = [];
                let listName = [];
                this.v.listShop.forEach(e => {
                    if (listChain.indexOf(e.chain._id) === -1) {
                        listChain.push(e.chain._id);
                        listName.push(e.chain.name);
                    }
                })
                for (let i = 0; i < listChain.length; i++) {
                    listRes.push({
                        name: listName[i],
                        _id: listChain[i],
                        shop: [],
                    })
                    this.v.listShop.forEach(e => {
                        if (e.chain._id === listChain[i]) listRes[i].shop.push(JSON.parse(JSON.stringify(e)));
                    })
                }
                return listRes;
            }
        },
        beforeMount() {
            $(document).ready(() => {
                $('.ql-formats button').addClass('btn cusbtn');
                $('.ql-formats .ql-picker ').addClass(' cusbtn');
                $('.ql-formats').addClass('btn-group');
                $('.ql-formats').css('margin-bottom:5px;');
            })
            this.m_getCategory();
            this.m_getListShop();
        },
        methods: {
            m_getListShop() {
                this.$http.get(process.env.API.Shop_List, this.cf())
                    .then(data => {
                        this.v.listShop = data.body;
                    })
                    .catch(error => {

                    })
            },
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
                        this.form.addDeal.images.push(this.v.currentObjectImage[i]);
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
                this.form.addDeal.images.map((e, i) => {
                    if (i !== index) res.push(e);
                })
                this.form.addDeal.images = res;
       
            },
            m_formAddDealSubmit(e) {
                e.preventDefault();
                let postForm = new FormData();
                postForm.append('title', this.form.addDeal.title);
                postForm.append('description', this.form.addDeal.description);
                postForm.append('type', this.form.addDeal.type);
                postForm.append('quantity', this.form.addDeal.quantity);
                this.form.addDeal.shop.forEach(e => {
                    postForm.append('shop', e);
                })
                this.form.addDeal.serviceItem.forEach(e => {
                    postForm.append('serviceItem', e);
                })
                postForm.append('price', this.form.addDeal.price);
                postForm.append('value', this.form.addDeal.value);
                postForm.append('content', $('#mcontent .ql-editor').html());
                postForm.append('from', this.value3[0]);
                postForm.append('to', this.value3[1]);
                this.form.addDeal.images.forEach(e => {
                    postForm.append('images', e);
                })

                this.$confirm(`Bạn có chắc muốn thêm Deal: ${this.form.addDeal.title} không?`, 'Chú ý', {
                    type: 'warning',
                    confirmButtonText: 'Chắc chắn',
                    cancelButtonText: 'Không'
                })
                    .then(() => {
                        this.v.isLoading = true;
                        this.$http.post(process.env.API.Deal_Create, postForm, this.cf())
                            .then(data => {
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
                    })
                    .catch(() => {
                    })

            }
        }
    }
</script>

<template>
    <div class="container" style="margin-top:20px;">
        <div class="col-sm-4">
            <div style="background-color:white; padding: 26px;">
                <el-input clearable placeholder="Nhập Coupon cần tìm!" v-model="v.keyword"></el-input>
                <h6 class="headText" style="margin-top:20px;">Danh mục</h6>
                <ul v-if="!mainData.isErrorGetCategory"
                    style="margin:0; padding:0; list-style-type: none; margin-top:30px;">
                    <li v-for="item in mainData.listCategory"
                        style="font-family: 'Open Sans'; font-size:14px; overflow: hidden; text-overflow: ellipsis;">
                        <el-checkbox></el-checkbox>
                        {{item.name}}
                    </li>
                </ul>

                <h6 class="headText" style="margin-top:20px;">Tỉnh thành</h6>
                <ul v-if="!mainData.isErrorGetCity"
                    style="margin:0; padding:0; list-style-type: none; margin-top:20px;">
                    <li style="font-family: 'Open Sans'; font-size:14px;"
                    <el-checkbox @change="m_changeSelectedAll" v-model="v.checkAll"></el-checkbox>
                    Tất cả
                    </li>
                    <li style="font-family: 'Open Sans'; font-size:14px;" v-for="item,index in mainData.listCity"
                        v-show="index<5 || index>=5 && v.showMoreListCity">
                        <el-checkbox v-model="mainData.listCity[index].checked"></el-checkbox>
                        {{item.name}}
                    </li>
                    <li><a href="javascript:;" class="green" style="margin-top:10px;" v-if="!v.showMoreListCity"
                           @click="v.dialogMoreCity=true">Nhiều hơn</a>
                    </li>
                </ul>

            </div>
        </div>
        <div class="col-sm-8 mgr-o" style="padding:0;">
            <p v-if="v.keyword.trim().length>0">Hiển thị kết quả cho từ khóa: {{v.keyword}}</p>
            <template v-if="!mainData.isErrorCoupon">
                <div class="col-md-4 col-sm-6 col-xs-6 mxColumn"
                     style="padding-left:0; padding-right:7.5px; margin-bottom:15px;"
                     v-for="item,index in c_listCoupon">
                    <div style=" border-top:0px; padding-bottom:0;text-overflow: ellipsis; border-radius: 0; background-color:white">
                        <div :style="`width:100%; height:180px; background-size:cover; background-image:url(${img_base+item.images[0]}); position:relative`">

                        </div>
                        <div style="padding:15px; padding-bottom:0;">
                            <span style="margin-top:5px;"><span class="fa fa-clock-o"></span>  <time-count-down
                                    :to="item.to"></time-count-down></span>
                            <div style="font-size:18px; max-height:50px;  height:50px; text-overflow: ellipsis; overflow: hidden">
                                {{item.title}}
                            </div>
                        </div>
                        <div style="margin-top:8px;">
                            <btn-code title="XEM" @click="$router.push(`/coupon/${item.slug}`)"></btn-code>
                        </div>
                    </div>
                </div>

            </template>

        </div>
        <el-dialog :visible.sync="v.dialogMoreCity" :width="'500px'">
            <table style="width:100%; padding-bottom:6px;">
                <thead>
                <tr>
                    <th style="width:60px;  border-bottom: .5px dashed rgba(45,45,48,.2);">
                        <el-checkbox v-model="v.checkAll" @change="m_changeSelectedAll"></el-checkbox>
                    </th>
                    <th style="font-size:15px;  border-bottom: .5px dashed rgba(45,45,48,.2);">Tỉnh / Thành Phố</th>
                    <th class="text-right" style="width:210px;">
                        <el-input placeholder="Tên tình thành cần tìm" style="width:200px;"
                                  v-model="v.keywordCity"></el-input>
                    </th>
                </tr>
                </thead>
            </table>
            <div style="height:300px; max-height:300px; overflow-y: scroll">
                <table style="width:100%;">
                    <tbody>
                    <tr v-for="item,index in c_listCity">
                        <td style="width:60px;">
                            <el-checkbox v-model="mainData.listCity[item._index].checked"
                                         @change="m_changeListObject"></el-checkbox>
                        </td>
                        <td style="font-size:15px;" colspan="2">{{item.name}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="row" style="margin-top:10px;">
                <div class="col-sm-6 col-md-6 col-xs-6">
                    Chọn {{c_countSelectedCity}} / {{mainData.listCity.length}} tỉnh thành
                </div>
                <div class="col-sm-6 col-md-6 col-xs-6 text-right">
                    <button class="btn" @click="v.dialogMoreCity = false">Xong</button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        name: 'PUBLIC_listShop',
        async asyncData() {
            let mainData = {};
            await axios.get(process.env.API.Coupon_PublicGet)
                .then(data => {
                    mainData.listCoupon = data.data;
                })
                .catch(error => {
                    mainData.isErrorCoupon = true;
                })
            await  axios.get(process.env.API.Category_Get)
                .then(data => {
                    mainData.listCategory = data.data;
                })
                .catch(error => {
                    mainData.isErrorGetCategory = false;
                })
            await  axios.get(process.env.API.City_List)
                .then(res => {
                    mainData.listCity = res.data;
                })
                .catch(error => mainData.isErrorGetCity = true)
            return {
                mainData
            }
        },
        data() {
            return {
                v: {
                    showMoreListCity: false,
                    keyword: '',
                    checkAll: false,
                    dialogMoreCity: false,
                    keywordCity: '',
                }
            }
        },
        computed: {
            c_countSelectedCity() {
                let counter = 0;
                this.mainData.listCity.forEach(e => {
                    if (e.checked) counter++;
                });
                return counter;
            },
            c_listCity() {
                let resData = [];
                let keyword = this.CreateSlug(this.v.keywordCity.trim());
                for (let i = 0; i < this.mainData.listCity.length; i++) {
                    let itemPush = this.mainData.listCity[i];
                    if (keyword.length === 0 || this.CreateSlug(itemPush.name).indexOf(keyword) !== -1) {
                        itemPush._index = i;
                        resData.push(itemPush);
                    }
                }
                return resData;
            },
            c_listCoupon() {
                let keyword = this.CreateSlug(this.v.keyword.trim());
                if (keyword.length === 0) return this.mainData.listCoupon;
                else {
                    let resData = [];
                    this.mainData.listCoupon.forEach(e => {
                        if (this.CreateSlug(e.title).indexOf(keyword) !== -1) resData.push(e);
                    })
                    return resData;
                }
            }
        },
        methods: {
            m_changeSelectedAll(e) {
                if (e)
                    this.mainData.listCity.forEach((e, index) => {
                        this.mainData.listCity[index].checked = true;
                    })
                else
                    this.mainData.listCity.forEach((e, index) => {
                        this.mainData.listCity[index].checked = false;
                    })

            },
            m_changeListObject(e) {
                if (this.c_countSelectedCity === this.mainData.listCity.length) this.v.checkAll = true;
            }
        }
    }
</script>
<style>
    .text-head {
        font-family: 'Open Sans', Helvetica, Arial, sans-serif;
        font-size: 18px;
        font-weight: bold;

    }

    .headText {
        font-family: "Open Sans";
        position: relative;
        margin-top: 0;
        font-weight: 600;
        line-height: 1.2;
        color: #4a4a4a;
    }

    .headText:before {
        position: absolute;
        content: "";
        bottom: -0.9rem;
        left: -1.7rem;
        width: 50px;
        height: 1px;
        background-color: #dadada;
    }

    .shopSmall {
        border: 3px solid white;
        width: 80px;
        height: 80px;
        background-size: cover;
        margin: 20px;
        position: absolute;
    }

    .shopSmallName {
        color: white;
        font-family: "Open Sans";
        margin-left: 20px;
        margin-top: 110px;
        font-size: 24px;
        position: absolute;
    }

    .rateStar .fa-star {
        color: #FCEB12;
        font-size: 18px;
    }

    .buttonFlat {
        color: rgba(45, 45, 48, .4);
        cursor: pointer;
        text-align: center;
        font-size: 18px;
    }

    .buttonFlat:hover {

        color: rgba(45, 45, 48, 1);
    }

    @media (max-width: 768px) {
        .mgr-o {
            margin-top: 20px;
            padding: 0;
        }
    }
</style>
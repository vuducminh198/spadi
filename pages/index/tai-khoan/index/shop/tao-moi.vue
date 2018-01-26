<style scoped>
    .gmap-button-pickCurrentLocation {
        background-color: white;
        text-transform: uppercase;
        font-size: 12px;
        border: 0;
        margin-left: 120px;
        border-radius: 2px;
        box-shadow: -2px 2px 3px rgba(45, 45, 48, .1);
        padding: 6px 10px;
        margin-top: 10px;
        color: #FF5151;
        outline: 0;
    }

    .gmap-button-pickCurrentLocation:hover, .gmap-button-pickCurrentLocation:active {
        background-color: whitesmoke;
    }

    .button-icon-copy {
        font-size: 18px;
        color: rgba(45, 45, 48, .2);
        cursor: pointer;
    }

    .button-icon-copy:hover, .button-icon-copy:active {
        color: rgba(45, 45, 48, .8);
    }
</style>
<template>
    <div :class="!nobox?'box':''" style="padding:10px; padding-top:40px; padding-bottom:80px;">
        <div class="container-fluid">
            <form @submit="submitAddShop($event)">
                <el-row :gutter="20">
                    <el-col :md="6" v-if="v.active!==5">
                        <div style="height:200px">
                            <el-steps direction="vertical" :active="v.active" finish-status="success" align-center>
                                <el-step title="Đặt tên shop"></el-step>
                                <el-step title="Đường dây nóng"></el-step>
                                <el-step title="Google Maps"></el-step>
                                <el-step title="Vị trí"></el-step>
                                <el-step title="Hoàn tất"></el-step>
                            </el-steps>
                        </div>
                    </el-col>
                    <el-col :md="18">
                        <div style="margin:auto;">
                            <template v-if="v.active===0">
                                <label>Tên hiển thị</label>
                                <el-input v-model="form.addShop.name"></el-input>
                                <div style="margin-top:20px;">
                                    <el-button class="pull-right" @click="()=>{
                                        if (this.form.addShop.name.trim().length<6) this.$message({type:'warning',message:'Tên cửa hàng quá ngắn, vui lòng kiếm tra.'})
                                        else this.v.active++;
                                    }">Tiếp theo<span
                                            class="el-icon-arrow-right"></span></el-button>
                                </div>
                            </template>
                            <template v-if="v.active===1">
                                <el-tabs style="margin-top:10px;">
                                    <el-tab-pane label="Điện thoại">
                                        <template v-for="item,index in form.addShop.phone">
                                            <el-row :gutter="20" v-if="typeof item!=='undefined'"
                                                    style="margin-bottom:8px;">
                                                <el-col :md="20" :xs="18">
                                                    <el-input placeholder="Nhập số điện thoại" :value="item" disabled>
                                                        <i slot="prefix" class="el-input__icon el-icon-phone"></i>
                                                    </el-input>
                                                </el-col>
                                                <el-col :md="4" :xs="6">
                                                    <el-tooltip content="Xóa số điện thoại này" placement="top">
                                                        <el-button icon="el-icon-close"
                                                                   @click="m_removePhoneIndex(index)"></el-button>
                                                    </el-tooltip>
                                                </el-col>
                                            </el-row>
                                        </template>
                                        <el-row :gutter="20">
                                            <el-col :md="20" :xs="18">
                                                <el-input placeholder="Nhập số điện thoại"
                                                          v-model="form.addShop._inputPhone">
                                                    <i slot="prefix" class="el-input__icon el-icon-phone"></i>
                                                </el-input>
                                            </el-col>
                                            <el-col :md="4" :xs="6">
                                                <el-tooltip placement="top" content="Xác nhận số điện thoại">
                                                    <el-button icon="el-icon-check"
                                                               @click="m_addPhone"></el-button>
                                                </el-tooltip>
                                            </el-col>
                                        </el-row>
                                    </el-tab-pane>
                                    <el-tab-pane label="Đường dây nóng">
                                        <template v-for="item,index in form.addShop.hotLine">
                                            <el-row style="margin-bottom:8px;" :gutter="20">
                                                <el-col :md="20" :xs="18">
                                                    <el-input :value="item" disabled>
                                                        <i slot="prefix" class="el-input__icon el-icon-phone"></i>
                                                    </el-input>
                                                </el-col>
                                                <el-col :md="4" :xs="6">
                                                    <el-tooltip content="Xóa số điện thoại này" placement="top">
                                                        <el-button icon="el-icon-close"
                                                                   @click="m_removeHotlineIndex(index)"></el-button>
                                                    </el-tooltip>
                                                </el-col>
                                            </el-row>
                                        </template>
                                        <el-row :gutter="20">
                                            <el-col :md="20" :xs="18">
                                                <el-input placeholder="Nhập đường dây nóng"
                                                          v-model="form.addShop._inputHotline">
                                                    <i slot="prefix" class="el-input__icon el-icon-phone"></i>
                                                </el-input>
                                            </el-col>
                                            <el-col :md="4" :xs="6">
                                                <el-tooltip placement="top" content="Xác nhận đường dây nóng">
                                                    <el-button icon="el-icon-check"
                                                               @click="m_addHotline"></el-button>
                                                </el-tooltip>
                                            </el-col>
                                        </el-row>
                                    </el-tab-pane>
                                </el-tabs>
                                <div style="margin-top:20px">
                                    <el-button class="pull-left" @click="v.active--"><span
                                            class="el-icon-arrow-left"></span>Quay lại
                                    </el-button>
                                    <el-button class="pull-right" @click="v.active++">Tiếp theo <span
                                            class="el-icon-arrow-right"></span></el-button>
                                </div>
                            </template>
                            <template v-if="v.active===2">
                                <label style="margin-top:10px;">Địa điểm mọi người có thể tìm thấy bạn</label>
                                <div style=" height:400px; position: relative">
                                    <div style="position: absolute; z-index: 1999;">
                                        <button class="gmap-button-pickCurrentLocation" type="button"
                                                @click="EB.$emit('getCurrentLocation'); v.gzoom=17; ">
                                            <span class="el-icon-location"></span>
                                            VỊ TRÍ HIỆN TẠI
                                        </button>
                                        <button style="margin-left:10px; color:black;" v-if="!nobox"
                                                class="gmap-button-pickCurrentLocation"
                                                type="button"
                                                @click="m_getInfoCurrentLocation ">
                                            <span class="el-icon-info"></span>
                                            THÔNG TIN KHU VỰC
                                        </button>
                                    </div>
                                    <gmap-map style="width: 100%; height: 100%; position: absolute; left:0; top:0"
                                              :center="$store.state.currentLocation"
                                              :zoom="v.gzoom">
                                        <gmap-marker
                                                :key="index"
                                                v-for="(m, index) in v.markers"
                                                :position="m.position"
                                                :clickable="true"
                                                :draggable="true"
                                                @dragend="m_gmapDragEnd"
                                        ></gmap-marker>
                                    </gmap-map>
                                </div>
                                <div style="margin-top:20px;">
                                    <el-button class="pull-left" @click="v.active--"><span
                                            class="el-icon-arrow-left"></span>Quay lại
                                    </el-button>
                                    <el-button class="pull-right" @click="v.active++">Tiếp theo <span
                                            class="el-icon-arrow-right"></span></el-button>
                                </div>
                            </template>
                            <template v-if="v.active===3">
                                <el-row :gutter="20">
                                    <el-col :md="12">
                                        <label>Thành phố</label><br>
                                        <el-select style="width:100%;" v-model="form.addShop.city"
                                                   placeholder="Chọn thành phố"
                                                   filterable no-data-text="Không có dữ liệu"
                                                   no-match-text="Không có dữ liệu phù hợp">
                                            <el-option v-for="item in v.listCity"
                                                       :label="item.name"
                                                       :value="item.name"
                                                       :key="item.name"
                                            ></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :md="12">
                                        <label>Quận huyện</label><br>
                                        <el-select style="width:100%;" v-model="form.addShop.district" filterable
                                                   placeholder="Chọn quận, huyện"
                                                   no-match-text="Không có dữ liệu phù hợp"
                                                   no-data-text="Không có dữ liệu">
                                            <el-option v-for="item in listDistrict"
                                                       :label="item"
                                                       :value="item"
                                                       :key="item">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                                <label style="margin-top:10px;">Địa chỉ chi tiết</label>
                                <el-input v-model="form.addShop.address"></el-input>
                                <div style="margin-top:20px;">
                                    <el-button class="pull-left" @click="v.active--"><span
                                            class="el-icon-arrow-left"></span>Quay lại
                                    </el-button>
                                    <grebtn class="pull-right" title="Lưu thông tin" :loading="v.isLoading"
                                             type="submit" style="max-width:200px;"></grebtn>
                                </div>
                            </template>
                            <template v-if="v.active===5">
                                <div>
                                    <div class="svg pull-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"
                                             viewBox="-263.5 236.5 26 26">
                                            <g class="svg-success">
                                                <circle cx="-250.5" cy="249.5" r="12"/>
                                                <path d="M-256.46 249.65l3.9 3.74 8.02-7.8"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div class="pull-left" style="padding-left:10px;">
                                        <p style="font-size:24px;">Lưu thành công thông tin cửa hàng chi nhánh</p>
                                        <p>Bạn có thể quản lý shop của mình trong phần <a href="javacript:;"
                                                                                          style="color:#FF5151; text-decoration: underline;"
                                                                                          @click="$router.push('/tai-khoan/shop/danh-sach')"> <span
                                                class="material-icons"
                                                style="font-size:16px;">store_mall_directory</span>
                                            Cửa hàng</a>
                                            <br>Hoặc nhấn
                                            <a href="javascript:;" @click="()=>{
                                                this.form.addShop.name = '';
                                                this.v.active = 0;
                                            }" style="color:#FF5151; text-decoration: underline;">vào đây </a>để tạo
                                            thêm cửa hàng
                                        </p>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </el-col>

                </el-row>
            </form>
        </div>
        <el-dialog :visible.sync="v.dialogListName" :top="'0px'">
            <div>
                <table class="table">
                    <tbody>
                    <tr v-for="item in v.yourAddress">
                        <td>
                            <span class="el-icon-location"></span>
                        </td>
                        <td>{{item.formatted_address}}</td>
                        <td>
                            <el-tooltip placement="right" content="Nhấn để sao chép">
                                <span v-clipboard:copy="item.formatted_address"
                                      v-clipboard:success="()=>{$message({type:'success',message:'Sao chép thành công vào bộ nhớ'});}"
                                      class="material-icons button-icon-copy">content_copy</span>
                            </el-tooltip>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </el-dialog>
    </div>
</template>

<script>


    import PriBtn from "~/components/button";

    export default {
        middleware:'clientIsManager',
        head() {
            return {
                title: 'Thêm mới cửa hàng - Quản lý - Spadi.vn'
            }
        },
        props: {
            nobox: {
                type: Boolean,
                value: false
            }
        },
        components: {PriBtn},
        name: 'shopcreate',
        data() {
            return {
                v: {
                    listCity: [],
                    markers: [{
                        position: {}
                    }],
                    yourAddress: [],
                    gzoom: 10,
                    dialogListName: false,
                    isLoading: false,
                    active: 0,
                    currentHref:''
                },
                form: {
                    addShop: {
                        _inputHotline: '',
                        _inputPhone: '',
                        name: '',
                        address: '',
                        phone: [],
                        hotLine: [],
                        city: '',
                        district: '',
                    }
                }
            }
        },
        computed: {
            listDistrict: function () {
                let selectedCity = this.form.addShop.city.trim();
                let res = [];
                this.v.listCity.forEach(e => {
                    if (e.name === selectedCity) res = e.districts;
                })
                if (res.length > 0) this.form.addShop.district = res[0];
                return res;
            }
        },
        beforeMount() {
            this.m_getListCity();
            this.v.markers[0].position = this.$store.state.currentLocation;
            this.EB.$on('updateCurrentLocation', (data) => {
                this.v.markers[0].position = this.$store.state.currentLocation;
            })
        },
        methods: {
            m_getInfoCurrentLocation() {
                this.$http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.v.markers[0].position.lat + "," + this.v.markers[0].position.lng + "&sensor=false&key=AIzaSyBhZ4W7j3Xlo-UOlY7yTQjUc0GPJwr9d0k")
                    .then(data => {
                        if (typeof data.body.results !== 'undefined') {
                            this.v.yourAddress = data.body.results;
                            this.v.dialogListName = true;
                        }
                    })
                    .catch(error => {
              
                    })
            },
            m_removePhoneIndex(indexW) {
                this.form.addShop.phone = this.form.addShop.phone.map((e, index) => {
                    return index !== indexW ? e : undefined;
                })
            },
            m_addPhone() {
                let inArray = false;
                if (this.form.addShop._inputPhone.length < 3) return;
                if (this.form.addShop.phone.length > 0)
                    this.form.addShop.phone.forEach(e => {
                        if (typeof  e !== 'undefined')
                            if (e.toString().split(' ').join('') === this.form.addShop._inputPhone.toString().split(' ').join(''))
                                inArray = true;
                    });
                if (!inArray) {
                    this.form.addShop.phone.push(this.form.addShop._inputPhone);
                    this.form.addShop._inputPhone = ''
                }
                else this.$message({
                    message: 'Số điện thoại đã tồn tại, vui lòng kiểm tra lại!',
                    type: 'error'
                });
            },
            m_removeHotlineIndex(indexW) {
                this.form.addShop.hotLine = this.form.addShop.hotLine.map((e, index) => {
                    return index !== indexW ? e : undefined;
                })
            },
            m_addHotline() {
                let inArray = false;
                if (this.form.addShop._inputHotline.length < 3) return;
                if (this.form.addShop.hotLine.length > 0)
                    this.form.addShop.hotLine.forEach(e => {
                        if (typeof  e !== 'undefined')
                            if (e.toString().split(' ').join('') === this.form.addShop._inputHotline.toString().split(' ').join(''))
                                inArray = true;
                    });
                if (!inArray) {
                    this.form.addShop.hotLine.push(this.form.addShop._inputHotline);
                    this.form.addShop._inputHotline = ''
                }
                else this.$message({
                    message: 'Đường dây nóng đã tồn tại, vui lòng kiểm tra lại!',
                    type: 'error'
                });
            },
            m_getListCity() {
                this.$http.get(process.env.API.City_List)
                    .then(data => {
                        this.v.listCity = data.body;
                        if (this.v.listCity.length > 0)
                            this.form.addShop.city = this.v.listCity[0].name;
                    })
                    .catch(error => {
                    });
            },
            submitAddShop(e) {
                e.preventDefault();
                this.v.isLoading = true;
                let postForm = this.form.addShop;
                delete postForm._inputPhone;
                delete postForm._inputHotline;
                postForm.latitude = this.v.markers[0].position.lat;
                postForm.longitude = this.v.markers[0].position.lng;
                postForm.chain = this.$store.state.adminSelectedChain._id;
                this.$http.post(process.env.API.Shop_Create, postForm, this.cf())
                    .then(data => {
                        this.v.isLoading = false;
                        this.EB.$emit('reloadListShop');
                        this.v.active = 5;
                        let el = document.querySelector(".svg");
                        if (el != null) {
                            let elWrapperClone = el.innerHTML;
                            el.innerHTML = elWrapperClone;
                        }
                    })
                    .catch(error => {
                        this.v.isLoading = false;
                        this.$message({
                            type: 'error',
                            message: (typeof error.body !== 'undefined' && typeof error.body.ErrorMessage !== 'undefined' ? error.body.ErrorMessage : 'Đã xảy ra sự cố, vui lòng kiểm tra và thử lại sau')
                        })
                    })
            },
            m_gmapUpdatePostion(e) {
           
            },
            m_gmapDragEnd(e) {
                this.v.markers[0].position = {lat: e.latLng.lat(), lng: e.latLng.lng()};
          
            }
        }
    }
</script>
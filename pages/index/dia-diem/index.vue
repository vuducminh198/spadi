<style>
    .ChainRow td {
        padding-bottom: 10px;
    }

    .ul_button {
        list-style-type: none;
        margin-top: 10px;
        visibility: hidden;
    }

    .ul_button li {
        display: inline-block;
    }

    .ul_button li a {
        color: black;
        font-family: "Source Sans Pro";
        font-size: 16x;
    }

    .ul_button li a:hover {
        color: #439A46;
        text-decoration: underline;
    }

    .ChainRow:hover .ul_button {
        visibility: visible;
    }

    .greenLink {
        color: #439A46;
    }

    .greenLink:hover {
        text-decoration: underline;
    }

    .buttonAddCart {
        width: 40px;
        height: 40px;
        border: 0;
        background-color: rgba(45, 45, 48, .1);
        border-radius: 50vh;
    }

    .buttonAddCart:hover {
        background-color: #439A46;
    }

    .buttonAddCart:hover span {
        color: white;
    }

    .buttonAddCart span {
        font-size: 24px;
    }

    .rateStar .fa-star {
        color: #FCEB12;
        font-size: 16px;
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

    .mxLinkClass:hover {
        text-decoration: underline;
        cursor: pointer;
    }

</style>
<template>
    <div class="container" style="margin-top:20px;">
        <div class="row">
            <div class="col-md-3 col-sm-4">
                <div style="background-color:white; padding:20px;">
                    <el-input placeholder="Nhập Coupon, Deal, v.v" clearable v-model="v.keyword"></el-input>
                    <label class="bold">Tìm kiếm theo</label><br/>
                    <el-radio v-model="v.typeSelect" label="B"><span
                            style="color:black!important; font-family: 'Open Sans'; font-size:14px;">Vị trí hiện tại</span>
                    </el-radio>
                    <br>
                    <el-radio v-model="v.typeSelect" label="A"><span
                            style="color:black!important; font-family: 'Open Sans'; font-size:14px;">Theo quận / huyện</span>
                    </el-radio>
                    <div style="clear:both; margin-top:10px;"></div>
                    <template v-if="v.typeSelect==='B'">
                        <!--<label class="bold">Khoảng cách (m)</label><br/>-->
                        <!--<el-input-number style="width:100%;" controls-position="right" v-model="v.Distance" :min="10"-->
                        <!--:max="100000"></el-input-number>-->
                    </template>
                    <template v-else>
                        <label class="bold">Tỉnh / Thành phố</label><br/>
                        <el-select style="width:100%;" v-model="v.selectedCity" filterable placeholder="Chọn thành phố"
                                   no-data-text="Không có dữ liệu" no-match-text="Không có dữ liệu phù hợp">
                            <el-option v-for="item in v.listCity" :label="item.name" :value="item.name"
                                       :key="item.name"></el-option>
                        </el-select>
                        <br>
                        <label class="bold">Quận / Huyện</label><br/>
                        <el-select style="width:100%;" v-model="v.selectedDistrict" filterable
                                   placeholder="Chọn quận huyện"
                                   no-data-text="Không có dữ liệu" no-match-text="Không có dữ liệu phù hợp">
                            <el-option v-for="item in c_listDistricts" :key="item" :value="item"
                                       :label="item"></el-option>
                        </el-select>
                    </template>
                    <label class="bold" style="margin-top:20px;">Tôi muốn tìm</label><br/>
                    <el-radio v-model="v.selectedTypeObject" label="all">Tất cả</el-radio>
                    <br>
                    <el-radio v-model="v.selectedTypeObject" label="deal">Chỉ Deal</el-radio>
                    <br>
                    <el-radio v-model="v.selectedTypeObject" label="coupon">Chỉ Coupon</el-radio>
                    <br>
                    <div class="text-right" style="margin-top:15px;">
                        <button class="btn" @click="m_getInfoCurrentLocation()">Tìm kiếm</button>
                    </div>
                </div>
                <!--<div style="background-color:white; padding:20px; margin-top:15px;">-->
                <!--<label class="bold">Dịch vụ</label><br/>-->
                <!--<el-input-number style="width:100%;" controls-position="right" v-model="v.Distance" :min="10"-->
                <!--:max="100000"></el-input-number>-->
                <!--<div class="text-right" style="margin-top:15px;">-->
                <!--<button class="btn" @click="m_getInfoCurrentLocation()">Tìm kiếm</button>-->
                <!--</div>-->
                <!--</div>-->
                <!--<div style="background-color:white; padding:20px; margin-top:15px;">-->
                <!--<label class="bold">Nhiều hơn</label><br/>-->
                <!--<ul style="margin:0; padding:0; list-style-type: none; margin-top:20px; font-family: 'Open Sans'; font-size:15px;">-->
                <!--<li style="font-size:14px;">-->
                <!--<el-checkbox></el-checkbox>-->
                <!--Có coupon-->
                <!--</li>-->
                <!--<li style="font-size:14px;">-->
                <!--<el-checkbox></el-checkbox>-->
                <!--Có giảm giá-->
                <!--</li>-->
                <!--<li style="font-size:14px;">-->
                <!--<el-checkbox></el-checkbox>-->
                <!--Sản phẩm mới-->
                <!--</li>-->
                <!--</ul>-->
                <!--</div>-->
            </div>
            <div class="col-sm-8 col-md-9" style="position: relative">
                <template v-if="v.typeSelect==='B'">
                    <template v-if="v.mapExpanded===false">
                        <div style="width:100%; background-color:white; padding:10px; padding-top:15px; padding-bottom:15px; font-size:14px; font-family: 'Open Sans'">
                            Kéo đến vị trí hoặc sử dụng <a href="javascript:;" @click="m_getCurrentLocation()"
                                                           style="color:#439A46; text-decoration: underline">vị trí hiện
                            tại</a>
                            của bạn để tìm kiếm nhanh, chính xác hơn<br>
                        </div>
                        <div style="position: relative; height:500px;">
                            <gmap-map style="width: 100%; height: 100%; position: absolute; left:0; top:0"
                                      :center="v.currentLocation"
                                      :zoom="v.zoomlevel"
                            >
                                <gmap-marker
                                        :position="v.currentLocation"
                                        :clickable="true"
                                        :draggable="true"
                                        @dragend="m_dragEndMaker"
                                ></gmap-marker>
                            </gmap-map>
                        </div>
                    </template>
                    <template v-else>
                        <button @click="v.mapExpanded = false;"
                                style="font-size:13px; box-shadow: .5px .5px rgba(45,45,48,.2); background-color:white; padding:8px 20px; font-family: 'Open Sans'; border:0;">
                            MỞ BẢN ĐỒ
                            <span class="el-icon-arrow-right"></span>
                        </button>
                        <div style="clear: both"></div>
                    </template>
                </template>
                <p v-if="v.keyword.trim().length>0" class="bold" style="font-family: 'Source Sans Pro'">Hiển thị kết quả cho từ khóa: {{v.keyword}}</p>
                <div v-if="v.selectedTypeObject==='all' || v.selectedTypeObject==='deal'" style="margin-top:20px;">
                    <label style="font-size:24px; padding-left:5px;" v-if="v.listDeal.length>0">DEAL</label>
                    <a href="javascript:;" class="greenLink" @click="$router.push('/deal')">Tất cả</a><br>
                    <div>
                        <div class="col-md-3 col-sm-6 col-xs-6" style="padding-left:0px; padding-right:5px;"
                             v-for="item in c_listDeal">
                            <div style="background-color:white; width:100%; min-height:100px; margin-bottom:15px;">
                                <div style=" border-top:0px; text-overflow: ellipsis; border-radius: 0; background-color:white">
                                    <div :style="`width:100%; height:140px; background-size:cover; background-image:url(${img_base+item.images[0]}); position:relative`">
                                    </div>
                                    <div style="padding:10px;">
                                        <div style="font-family: 'Open Sans';   overflow:hidden; text-overflow:ellipsis; max-height:44px; height:44px;"
                                             class="mxLinkClass" @click="$router.push(`/deal/${item.slug}`)">
                                            {{sortText(item.title,38)}}
                                        </div>
                                        <br>
                                        <span>
                    <span style="color:#ff5722;     flex-flow: row nowrap;  align-items: baseline; font-size: 30px; font-size: 2rem;font-weight: 700; font-family: 'Open Sans'">{{ finalPrice(item)| VN}}</span>&nbsp;
                                <strike>
                    <span style="font-family: 'Open Sans'; ">{{item.price| VN}}</span></strike></span>
                                        <table class="table" style="padding:0; margin:0;">
                                            <tbody style="margin:0;padding:0;">
                                            <tr style="margin:0; padding:0">
                                                <td style="border:0; margin:0; padding:0">
                                                    <div class="pull-left rateStar">
                                                        <span class="fa fa-star"></span>
                                                        <span class="fa fa-star"></span>
                                                        <span class="fa fa-star"></span>
                                                        <span class="fa fa-star"></span>
                                                        <span class="fa fa-star"></span><br/>
                                                        <span style="font-size:10px; font-family: 'Open Sans'">  (1502 đánh giá)</span>
                                                    </div>
                                                </td>
                                                <td style="border:0;  width: 42px; margin:0; padding:0; text-align: center;">
                                                    <button class="buttonAddCart"
                                                            @click="EB.$emit('updateCart', item._id)">
                                                        <span class="el-icon-goods"></span>
                                                    </button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div style="clear: both"></div>

                    <div v-if="v.selectedTypeObject==='all' || v.selectedTypeObject==='coupon'"
                         style="margin-top:20px;">
                        <label style="font-size:24px; padding-left:5px;" v-if="v.listCoupon.length>0">COUPON</label><a
                            href="javascript:;"
                            class="greenLink"
                            @click="$router.push('/coupon')">Tất
                        cả</a><br>
                        <div>
                            <div class="col-md-3 col-sm-6 col-xs-6" style="padding-left:7.5px; padding-right:7.5px;"
                                 v-for="item in c_listCoupon">
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
                                        <btn-code title="XEM"
                                                  @click="$router.push(`/coupon/${item.slug}`)"></btn-code>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="clear: both"></div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>
<script>

    export default {
        scrollToTop: true,
        name: 'diadiem-trangchu',
        head() {
            return {
                title: 'Tìm kiếm địa điểm | Spadi.vn'
            }
        },
        data() {
            return {
                v: {
                    typeSelect: 'B',
                    Distance: 100,
                    currentLocation: {},
                    zoomlevel: 10,
                    selectedCity: '',
                    selectedDistrict: '',
                    listCity: [],
                    listChainInArea: [],
                    selectedTypeObject: 'all',
                    listCoupon: [],
                    listDeal: [],
                    mapExpanded: false,
                    keyword: '',
                },
                form: {}
            }
        },
        computed: {
            c_listDistricts() {
                let currentCity = this.v.selectedCity;
                let resData = [];
                this.v.listCity.forEach(e => {
                    if (e.name === currentCity) resData = e.districts;
                })
                if (resData.length > 0) this.v.selectedDistrict = resData[0];
                return resData;
            },
            c_listDeal() {
                let keyword = this.CreateSlug(this.v.keyword.trim());
                if (keyword.length === 0) return this.v.listDeal;
                else {
                    let resData = [];
                    this.v.listDeal.forEach(e => {
                        if (this.CreateSlug(e.title).indexOf(keyword) !== -1) resData.push(e);
                    })
                    return resData;
                }
            },
            c_listCoupon() {
                let keyword = this.CreateSlug(this.v.keyword.trim());
                if (keyword.length === 0) return this.v.listCoupon;
                else {
                    let resData = [];
                    this.v.listCoupon.forEach(e => {
                        if (this.CreateSlug(e.title).indexOf(keyword) !== -1) resData.push(e);
                    })
                    return resData;
                }
            }
        },
        beforeMount() {
            this.v.currentLocation = this.$store.state.currentLocation;
            this.m_getListCity();
        },
        methods: {
            m_getCurrentLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.onPositionReceived);
                }
            },
            onPositionReceived(position) {
                this.v.currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                this.setCookie('currentLocation', JSON.stringify(this.v.currentLocation));
                this.$http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.v.currentLocation.lat + "," + this.v.currentLocation.lng + "&sensor=false&key=" + this.GMAPKEY())
                    .then(data => {
                        if (typeof data.body.results !== 'undefined') {
                            let nameX = data.body.results[0].address_components;
                            let district = nameX[nameX.length - 3].long_name;
                            let city = nameX[nameX.length - 2].long_name;
                            this.v.selectedCity = city;
                            this.c_listDistricts.forEach(e => {
                                if (e.indexOf(district) !== -1) this.v.selectedDistrict = e;
                            })


                        }
                    })
                    .catch(error => {

                    });
                this.v.zoomlevel = 16;
            },
            m_usingCurrentLocation() {
                this.$http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.v.currentLocation.lat + "," + this.v.currentLocation.lng + "&sensor=false&key=" + this.GMAPKEY())
                    .then(data => {
                        if (typeof data.body.results !== 'undefined') {
                            let nameX = data.body.results[0].address_components;
                            let district = nameX[nameX.length - 3].long_name;
                            let city = nameX[nameX.length - 2].long_name;
                            this.v.selectedCity = city;
                            this.c_listDistricts.forEach(e => {
                                if (e.indexOf(district) !== -1) this.v.selectedDistrict = e;
                            })
                            this.m_usingCityAndDistrict();
                        }
                    })
                    .catch(error => {

                    });
            },
            m_usingCityAndDistrict() {
                let postData = {
                    city: this.v.selectedCity,
                    district: this.v.selectedDistrict
                }
                this.$http.post(`${process.env.API.Search_Location}`, postData)
                    .then(res => {
                        this.v.listCoupon = res.body.coupon;
                        this.v.listDeal = res.body.deal;
                        this.v.mapExpanded = true;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            m_dragEndMaker(m) {
                this.v.currentLocation = {
                    lat: m.latLng.lat(),
                    lng: m.latLng.lng()
                }
            },
            m_getInfoCurrentLocation() {
                if (this.v.typeSelect === 'A') this.m_usingCityAndDistrict();
                else this.m_usingCurrentLocation();
            },
            m_getListCity() {
                this.$http.get(process.env.API.City_List)
                    .then(data => {
                        this.v.listCity = data.body;
                        if (this.v.listCity.length > 0) this.v.selectedCity = this.v.listCity[0].name;
                    })
                    .catch(error => {
                    })
            }
        }
    }
</script>
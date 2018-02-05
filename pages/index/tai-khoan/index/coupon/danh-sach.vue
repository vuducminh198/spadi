<template>
    <div style="padding:10px; background-color:white;">
        <div style="font-family: 'Open Sans'; font-size:18px; margin-bottom:10px;">
            COUPON TẠI {{$store.state.adminSelectedChain.name}}
        </div>
        <div class="" style="padding:10px; background-color:white">
            <div class="">
                <el-button icon="el-icon-plus" @click="()=>{ this.$router.push('/tai-khoan/coupon/tao-moi'); }">Tạo mới
                    Coupon
                </el-button>
            </div>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Tiêu đề</th>
                        <th>Mô tả</th>
                        <th>Lượt xem</th>
                        <th>Lượt đánh giá</th>
                        <th>Số lượng còn</th>
                        <th>Xem chi tiết</th>
                        <th style="width:130px;">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in v.listCoupon">
                        <td>{{sortText(item.title)}}</td>
                        <td>{{sortText(item.description,20)}}</td>
                        <td class="text-center">{{item.views}}</td>
                        <td class="text-center">{{item.vote}}</td>
                        <td class="text-center">{{item.quality}}</td>
                        <td>
                            <el-tooltip placement="top" content="Xem chi tiết Deal">
                                <el-button icon="el-icon-more"></el-button>
                            </el-tooltip>
                        </td>
                        <td>
                            <el-button-group>
                                <el-button icon="el-icon-edit"
                                           @click="$router.push(`/tai-khoan/coupon/cap-nhat?_=${item._id}`)"></el-button>
                                <el-button icon="el-icon-close"></el-button>
                            </el-button-group>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <el-dialog :visible.sync="v.dialogAddCoupon" :width="'800px'" :top="'0px'">
                <coupon-create :noBox="true"></coupon-create>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import couponCreate from './tao-moi'

    export default {
        middleware: 'clientIsManager',
        components: {
            couponCreate
        },
        head() {
            return {
                title: `Danh sách cửa hàng - Quản lý - Spadi.vn`
            }
        },
        data() {
            return {
                v: {
                    isLoading: false,
                    dialogAddCoupon: false,
                    listCoupon: []
                },
                form: {}
            }
        },
        computed: {},
        beforeMount() {

            this.m_getListDealOfChain();
            this.EB.$on('reloadCurrentPage', () => {
                setTimeout(() => {
                    this.m_getListDealOfChain();
                }, 1000)

            })

        },
        methods: {

            m_getListDealOfChain() {
                this.$http.get(process.env.API.Coupon_List, this.cf())
                    .then(data => {
                        this.v.listCoupon = data.body;
                    })
                    .catch(error => {
                    })
            }
        }
    }
</script>
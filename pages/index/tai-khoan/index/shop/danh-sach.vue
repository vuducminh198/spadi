<template>
    <div class="box" style="padding:10px">
        <div class="">
            <el-button icon="el-icon-plus" @click="$router.push('/tai-khoan/shop/tao-moi')">Thêm cửa hàng</el-button>

        </div>
        <br/>
        <div class="table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th>Tên</th>
                    <th>Địa chỉ</th>
                    <th>Điện thoại</th>
                    <th>Đường dây nóng</th>
                    <th>Quận / Thành phố</th>
                    <th style="width:130px;">Thao tác</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in v.listShop">
                    <td>{{item.name}}</td>
                    <td>{{item.address}}</td>
                    <td>
                        <el-collapse v-if="item.phone.length>=2">
                            <el-collapse-item title="Chi tiết">
                                <template v-for="it in item.phone">
                                    <span><span class="el-icon-phone"></span> {{it}}</span>
                                </template>
                            </el-collapse-item>
                        </el-collapse>
                        <template v-else>
                            <span><span class="el-icon-phone"></span> {{item.phone[0]}}</span>
                        </template>
                    </td>
                    <td>
                        <el-collapse v-if="item.phone.length>=2">
                            <el-collapse-item title="Chi tiết">
                                <template v-for="it in item.hotLine">
                                    <span><span class="el-icon-phone"></span> {{it}}</span>
                                </template>
                            </el-collapse-item>
                        </el-collapse>
                        <template v-else>
                            <span><span class="el-icon-phone"></span> {{item.hotLine[0]}}</span>
                        </template>
                    </td>
                    <td>{{item.district +'/' + item.city}}</td>
                    <td>
                        <el-button-group>
                            <el-button icon="el-icon-edit"></el-button>
                            <el-button icon="el-icon-close"></el-button>
                        </el-button-group>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <el-dialog :visible.sync="v.dialogAddShop" :width="'800px'" :top="'0px'">
            <shop-create :nobox="true"></shop-create>
        </el-dialog>
    </div>
</template>
<script>
    import ShopCreate from './tao-moi'

    export default {
        components: {
            ShopCreate
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
                    dialogAddShop: false,
                    listShop: []
                },
                form: {}
            }
        },
        computed: {},
        beforeMount() {
            this.m_getListShopOfChain();
            this.EB.$on('reloadCurrentPage', () => {
                this.m_getListShopOfChain();
            })
            this.EB.$on('reloadListShop', () => {
                this.m_getListShopOfChain();
            })
        },
        methods: {
            m_getListShopOfChain() {
                if (typeof this.$store.state.adminSelectedChain !== 'undefined' && typeof this.$store.state.adminSelectedChain._id !== 'undefined')
                    this.$http.get(process.env.API.Shop_ListByChain + this.$store.state.adminSelectedChain._id, this.cf())
                        .then(data => {
                            this.v.listShop = data.body;
                        })
                        .catch(error => {
                        })
            }
        }
    }
</script>
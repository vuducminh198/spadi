<template>
    <div style="padding:10px; background-color:white;">
        <div style="font-size:18px; font-family: 'Open Sans'; margin-bottom:10px;">
            CỬA HÀNG CỦA BẠN
        </div>
        <div style="padding:10px; background-color:white;">
        <div>
            <el-button icon="el-icon-plus" @click="$router.push('/tai-khoan/chain/tao-moi')">THÊM CỬA HÀNG</el-button>
        </div>
        <div class="table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th>TÊN CỬA HÀNG</th>
                    <th>SỐ CỬA HÀNG</th>
                    <th>LOGO</th>
                    <th>THAO TÁC</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in v.listChain">
                    <td>{{item.name}}</td>
                    <td>{{item.shop.length}}</td>
                    <td>
                        <img v-if="item.logo.toString().length>1" :src="img_base+item.logo"
                             style="width:40px; height:40px;">
                        <img v-else src="~/assets/img/default-none.svg"
                             style="width:40px; height:40px;">
                    </td>
                    <td>
                        <el-button-group>
                            <el-button icon="el-icon-edit"
                                       @click="$router.push(`/tai-khoan/chain/cap-nhat?_=${item._id}`)"></el-button>
                            <el-button icon="el-icon-close"></el-button>
                        </el-button-group>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        </div>
    </div>
</template>
<script>
    export default {
        middleware: 'clientIsManager',
        name: 'listChain',
        data() {
            return {
                v: {
                    listCity: [],
                    listChain: []
                },
            }
        },
        beforeMount() {
            this.m_getListChain();
            this.EB.$on('reloadListChain', () => {
                this.m_getListChain();
            })
        },
        methods: {

            m_getListChain() {
                this.$http.get(process.env.API.Chain_List, this.cf())
                    .then(data => {
                        this.v.listChain = data.body;
                    })
                    .catch(error => {
                    })
            }
        }
    }
</script>
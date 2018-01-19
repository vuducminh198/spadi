<template>
    <div class="box" style="padding:10px">
        <div class="table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th>TÊN CHUỖI</th>
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
                            <el-button icon="el-icon-edit"></el-button>
                            <el-button icon="el-icon-close"></el-button>
                        </el-button-group>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
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
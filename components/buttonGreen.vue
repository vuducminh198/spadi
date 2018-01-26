<style scoped>
    button {
        border: 0;
        color: white;
        font-size: 16px;
        padding: 8px 16px;
        outline: none;
        background-color: #4CAF50;
        min-width: 86px;
        transition: all .6s ease-in-out;
        width:100%;
    }

    button:hover {
        opacity: .8;
    }

    .icon-e {
        background-color: white;
        border-radius: 50vh;
        width: 10px;
        height: 10px;
        float: left;
        padding: 10px;
    }

    .e1 {
        animation-name: abLoad;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }

    .e2 {
        animation-name: abLoad;
        animation-duration: 2s;
        animation-delay: .3s;
        animation-iteration-count: infinite;
    }

    .e3 {
        animation-name: abLoad;
        animation-duration: 2s;
        animation-delay: .6s;
        animation-iteration-count: infinite;
    }

    @keyframes abLoad {
        0% {
            padding: 0px;
        }
        20% {
            padding: 10px;
        }
        100% {
            padding: 0
        }
    }
</style>
<template>
    <button :type="type" :disabled="loading"  @click="m_emitParent">
        <table class="" style="margin-bottom:0; position: absolute" :style="!loading?'visibility: hidden':''">
            <tbody>
            <tr>
                <td style=""></td>
                <td style="height:22px; text-align: center; vertical-align: middle">
                    <div class="icon-e e1"></div>
                </td>
                <td style="height:22px; text-align: center; vertical-align: middle">
                    <div class="icon-e e2"></div>

                <td style="height:22px; text-align: center; vertical-align: middle">
                    <div class="icon-e e3"></div>
                </td>
                <td style=""></td>
            </tr>
            </tbody>
        </table>
        <span :style="loading?'visibility: hidden':''+'font-family:Source Sans Pro'">
            <span :class="iconClass" v-if="icon" style="font-size:24px;"></span>&nbsp;&nbsp;
            {{title}}</span>
    </button>
</template>
<script>
    export default {
        name: 'priBtn',
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: 'Button'
            },
            type: {
                type: String,
                default: 'button'
            },
            icon:{
                type:Boolean,
                default: false
            },
            iconClass:{
                type:String,
                default: 'el-icon-goods'
            }
        },
        data() {
            return {}
        },
        methods: {
            m_emitParent() {
                this.$emit('click');
            }
        }
    }
</script>
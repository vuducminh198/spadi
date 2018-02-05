<template>
    <div>
        <ex-com :tasks="tasks"></ex-com>
    </div>
</template>
<script>
    import exCom from '~/components/exCom.vue'

    export default {
        name: 'ex',
        components: {
            'ex-com': exCom
        },
        data() {
            return {
                tasks: [
                    {body: "Đi chợ",completa: false},
                    {body: "Nấu cơm",completa: false},
                    {body: "Rửa chén",completa: false},
                    {body: "Gặt đồ",completa: false},
                ]
            }
        }
    }
</script>
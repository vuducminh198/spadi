<template>
    <div>
        <ul>
            <li v-for="task,index in tasks">
                <pre>{{task}}</pre>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'exCom',
        props: {
            tasks: {
                type: Array,
                default: []
            }
        },
        data() {
            return {}
        }
    }
</script>
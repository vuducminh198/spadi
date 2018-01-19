<template>
    <div>
        this is forgot Page
    </div>
</template>
<script>
    export default  {
        middleware:'checkLoginClient',
        name:'forgotPassword',
        asyncData(){
            return {

            }
        }
    }
</script>
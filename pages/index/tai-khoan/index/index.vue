<template>
    <div class="box" style="padding:10px; min-height: 300px; padding-bottom:20px;">
        <span class="el-icon-success" style="font-size:90px; padding-top:50px; padding-bottom:30px; color:rgba(45,45,48,.2); width:100%; text-align:center;"></span><br/>
        <p style="text-align:center; width:100%; font-size:32px; font-weight: bold; color:rgba(45,45,48,.6)">SPADI.VN</p>
        <p style="text-align:center; width:100%;">Chào mừng đến với Spadi.vn</p>
    </div>
</template>
<script>
    export default {
        name: 'cos',
        asyncData() {
            return {
                yourAddress: 'Hà Nội - Việt Nam'
            }
        },
        head() {
            return {
                title: this.yourAddress,
                meta: [
                    {hid: 'description', name: 'description', content: 'My custom description'}
                ]
            }
        },
        data() {
            return {
                a: 'aaaaaaaaaaaaaaa',
                markers: [{
                    position: {lat: 20.9636603, lng: 105.7492092}
                }, {
                    position: {lat: 20.9634000, lng: 105.7492097}
                }]
            }
        },
        beforeMount() {
            this.EB.$on('updateCurrentLocation', (data) => {
                let lat = data.coords.latitude;
                let lng = data.coords.longitude;
                this.$http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=false&key=AIzaSyBhZ4W7j3Xlo-UOlY7yTQjUc0GPJwr9d0k")
                    .then(data => {
                        if (typeof data.body.results !== 'undefined' && data.body.results.length === 7) {
                            this.yourAddress = data.body.results[0].formatted_address;
                        }
                    })
                    .catch(error => {
                 
                    })
            })
        },
        mounted() {

        },
        methods: {
            m_TestClick() {
               
            }
        }

    }
</script>
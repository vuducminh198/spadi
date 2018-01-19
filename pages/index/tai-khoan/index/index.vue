<template>
    <div class="box" style="padding:10px;">
        {{yourAddress}}<br>
        <button class="btn" @click="EB.$emit('getCurrentLocation')">Get Current Location</button>
        <div style="position: relative; margin-top:20px; height:500px;">
            <gmap-map style="width: 100%; height: 100%; position: absolute; left:0; top:0"
                      :center="$store.state.currentLocation"
                      :zoom="10"
            >
                <gmap-marker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        :clickable="true"
                        :draggable="true"
                        @click="center=m.position"
                ></gmap-marker>
            </gmap-map>
        </div>
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
                        console.log(error);
                    })
            })
        },
        mounted() {

        },
        methods: {
            m_TestClick() {
                console.log(process.env.cf());
            }
        }

    }
</script>
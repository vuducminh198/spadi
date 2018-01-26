<template>
    <span>
        {{text}}
    </span>
</template>
<script>
    export default {
        name: 'timeCountDown',
        props: {
            to: {
                type: String,
            },
            fontSize: {
                type: String,
                default: '16px'
            }
        },
        data() {
            return {
                text: '',
                x: null,
                countDownDate: '',
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        },
        beforeMount() {
            this.countDownDate = new Date(this.to).getTime();
            this.x = setInterval(() => {
                var now = new Date().getTime();
                var distance = this.countDownDate - now;
                this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
                this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
                this.text = this.days + " Ngày " + this.hours + " : "
                    +this. minutes + " : " + this.seconds ;
                if (distance < 0) {
                    clearInterval(this.x);
                    this.text = "00:00:00";
                }
            }, 1000);
        }
    }

</script>
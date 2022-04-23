export default {
    props: ['token', 'setInfo'],
    data() {
        return {

        }
    },
    watch: {
        token() {
            if (this.token) {
                this.setInfo({ status: 'success', message: 'Данные загружаются' });
            }
        }
    },
    mounted() {
        console.log(this.token)
    }
}
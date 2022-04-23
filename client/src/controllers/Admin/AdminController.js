export default {
    data() {
        return {
            isLogin: false,
            token: undefined,
        }
    },
    methods: {
        setToken(token) {
            localStorage.setItem('token', token);
            this.isLogin = true;
            this.token = token;
            console.log(token);
        },
    },
    mounted() {

    }
}
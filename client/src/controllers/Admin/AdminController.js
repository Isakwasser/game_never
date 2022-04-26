import fetchCheck from '@/fetch/CheckFetch';

export default {
    data() {
        return {
            isLogin: false,
            token: undefined,
            info: [],
            infoDelay: 5000,
            item: 1,
        }
    },
    methods: {
        setToken(token) {
            localStorage.setItem('token', token);
            this.isLogin = true;
            this.token = token;
        },
        logout() {
            if (!confirm('Вы уверены, что ходите выйти?')) {
                return
            }
            localStorage.removeItem('token');
            this.token = undefined;
            this.isLogin = false;
            this.setInfo({ status: 'success', message: 'Пользователь вышел из аккаунта' })
            this.$router.push({ name: 'login' });
        },
        setInfo(info) {
            info.item = this.item++;
            this.info.push(info);
            setTimeout(() => {
                this.info.shift();
            }, this.infoDelay);
        },
        updateToken(token) {
            const self = this;
            let options = {
                token: token,
                onSuccess: function (data) {
                    if (data.token) {
                        self.isLogin = true;
                        self.token = data.token;
                        localStorage.setItem('token', data.token);
                        self.setInfo({ status: 'success', message: 'Пользователь авторизован' });
                        if (self.$router.currentRoute.value.name == 'login') {
                            self.$router.push({ name: 'questions' });
                        }
                    }
                    if (data.message) {
                        self.setInfo({ status: 'warning', message: data.message });
                    }
                },
                catch: function () {
                    self.setInfo({ status: 'warning', message: 'Произошла ошибка' });
                },
            }
            fetchCheck(options);
        },
    },
    mounted() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.$router.push({ name: 'login' });
            return this.setInfo({ status: 'warning', message: 'Необходима регистрация' });
        }
        if (this.$route.name === 'admin') {
            this.$router.push({ name: 'questions' })
        }
        this.updateToken(token);
    }
}
import LoginFetch from '../../fetch/LoginFetch';

export default {
    props: ['setToken'],
    data() {
        return {
            login: 'user',
            password: 'root',
            info: [],
            infoDelay: 5000,
        }
    },
    methods: {
        tryLogin() {
            const self = this;
            if (!self.login) {
                self.addErrorClass(self.$refs.login)
            }
            if (!self.password) {
                self.addErrorClass(self.$refs.password)
            }
            if (self.login && self.password) {
                let options = {
                    body: {
                        login: self.login,
                        password: self.password,
                    },
                    onSuccess: (data) => {
                        console.log(data);
                        if (data.token) {
                            self.setToken(data.token);
                            self.info.push({ status: 'success', message: 'Токен установлен' });
                            setTimeout(() => {
                                self.info.shift();
                            }, self.infoDelay)
                        }
                        if (data.message) {
                            self.info.push({ status: 'warning', message: data.message });
                            setTimeout(() => {
                                self.info.shift();
                            }, self.infoDelay)
                        }
                    },
                    catch: (err) => {
                        console.log(err);
                        self.info.push({ status: 'success', message: 'Возникла ошибка' });
                        setTimeout(() => {
                            self.info.shift();
                        }, self.infoDelay)
                    },
                };
                LoginFetch(options);
            }
        },
        addErrorClass(elem) {
            elem?.classList.add('border');
            elem?.classList.add('border-danger');
        },
        removeErrorClass(elem) {
            elem?.classList.remove('border');
            elem?.classList.remove('border-danger');
        },

    },
    watch: {
        login() {
            this.removeErrorClass(this.$refs.login);
        },
        password() {
            this.removeErrorClass(this.$refs.password);
        },
    },
    mounted() {

    },
}
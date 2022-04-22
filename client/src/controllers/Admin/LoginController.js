import LoginFetch from '../../fetch/LoginFetch';

export default {
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
            if (!this.login) {
                this.addErrorClass(this.$refs.login)
            }
            if (!this.password) {
                this.addErrorClass(this.$refs.password)
            }
            if (this.login && this.password) {
                let options = {
                    body: {
                        login: this.login,
                        password: this.password,
                    },
                    onSuccess: (data) => {
                        console.log(data);
                        if (data.token) {
                            localStorage.setItem('token', data.token);
                            console.log('Токен установлен в localStorage');
                            this.info.push('success');
                            setTimeout(() => {
                                this.info.shift();
                            }, this.infoDelay)
                        }
                    },
                    catch: (err) => {
                        console.log(err);
                        this.info.push('Возникла ошибка');
                        setTimeout(() => {
                            this.info.shift();
                        }, this.infoDelay)
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
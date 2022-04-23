import LoginFetch from '../../fetch/LoginFetch';

export default {
    props: ['setToken', 'setInfo'],
    data() {
        return {
            login: '',
            password: '',
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
                        if (data.token) {
                            self.setToken(data.token);
                            self.setInfo({ status: 'success', message: 'Пользователь авторизовался' });
                            self.$router.push({ name: 'questions' });
                        }
                        if (data.message) {
                            self.setInfo({ status: 'warning', message: data.message });
                        }
                    },
                    catch: (err) => {
                        console.log(err);
                        self.setInfo({ status: 'success', message: 'Возникла ошибка' });
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
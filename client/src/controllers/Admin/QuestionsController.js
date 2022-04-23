// import Vue from 'vue';
import fetchQuestions from '@/fetch/QuestionsFetch';

export default {
    props: ['token', 'setInfo'],
    data() {
        return {
            data: {},
            title: 'Я никогда не',
            text: '',
        }
    },
    methods: {
        updateTable(token = this.token) {
            this.setInfo({ status: 'success', message: 'Данные загружаются' });
            const self = this;
            let options = {
                token: token,
                body: {},
                onSuccess: function (data) {
                    console.log(data.rows[0])
                    if (data.count) {
                        self.setInfo({ status: 'success', message: 'Данные загружены' });
                        self.data = data;
                    }
                    if (data.message) {
                        self.setInfo({ status: 'warning', message: data.message });
                    }
                },
                catch: function (err) {
                    self.setInfo({ status: 'warning', message: 'Произошла ошибка' });
                },
            };
            fetchQuestions(options);
        },
        addItem(token = this.token) {
            const self = this;
            let options = {
                token: token,
                body: {},
                onSuccess: function (data) {
                    console.log(data.rows[0])
                    if (data.count) {
                        self.setInfo({ status: 'success', message: 'Данные загружены' });
                        self.data = data;
                    }
                    if (data.message) {
                        self.setInfo({ status: 'warning', message: data.message });
                    }
                },
                catch: function (err) {
                    self.setInfo({ status: 'warning', message: 'Произошла ошибка' });
                },
            };
            // fetchQuestions(options);
            this.updateTable();
        }
    },
    watch: {
        token(newToken, oldToken) {
            if (newToken) {
                this.updateTable(newToken);
            }
        }
    },
    computed: {
        tableData() {
            return this.data.rows;
        }
    },
    mounted() {
        if (this.token) {
            this.updateTable();
        }
    }
}
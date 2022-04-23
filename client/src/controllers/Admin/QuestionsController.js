import fetchQuestions from '@/fetch/QuestionsFetch';
import fetchAddQuestions from '@/fetch/QuestionsAddFetch';

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
        addItem() {
            const self = this;
            let options = {
                token: self.token,
                body: {
                    title: self.title,
                    text: self.text,
                },
                onSuccess: function (data) {

                    if (data.id) {
                        console.log(data);
                        self.setInfo({ status: 'success', message: 'Вопрос добавлен' });
                        self.text = "";
                        self.title = "Я никогда не";
                        self.updateTable();
                    }
                    if (data.message) {
                        self.setInfo({ status: 'warning', message: data.message });
                    }
                },
                catch: function (err) {
                    self.setInfo({ status: 'warning', message: 'Произошла ошибка' });
                },
            };
            fetchAddQuestions(options);
        },
        hideModal(elem) {
            let modal = new bootstrap.Modal(elem)
            modal.hide()
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
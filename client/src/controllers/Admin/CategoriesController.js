import fetchCategories from '@/fetch/CategoriesFetch';
import fetchAddCategories from '@/fetch/CategoriesAddFetch';

export default {
    props: ['token', 'setInfo'],
    data() {
        return {
            data: {},
            name: '',
            description: '',
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
            fetchCategories(options);
        },
        addItem() {
            const self = this;
            let options = {
                token: self.token,
                body: {
                    name: self.name,
                    description: self.description,
                },
                onSuccess: function (data) {

                    if (data.id) {
                        self.setInfo({ status: 'success', message: 'Вопрос добавлен' });
                        self.name = "";
                        self.description = "";
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
            fetchAddCategories(options);
        },
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
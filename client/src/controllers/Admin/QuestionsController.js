import fetchQuestions from '@/fetch/QuestionsFetch';
import fetchAddQuestions from '@/fetch/QuestionsAddFetch';
import fetchDeleteQuestion from '@/fetch/QuestionDeleteFetch';

export default {
    props: ['token', 'setInfo'],
    data() {
        return {
            data: {},
            title: 'Я никогда не',
            text: '',
            limit: 50,
            page: 1,
        }
    },
    methods: {
        updateTable(token = this.token) {
            this.setInfo({ status: 'success', message: 'Данные загружаются' });
            const self = this;
            let options = {
                token: token,
                body: {
                    page: self.page,
                    limit: self.limit,
                },
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
        deleteItem(id) {
            if (!confirm('Вы уверены, что хотите удалить этот элемент?' + id)) {
                return
            }
            const self = this;
            let options = {
                token: self.token,
                body: {
                    id: id,
                },
                onSuccess: function (data) {
                    console.log(data);
                    if (data.success) {
                        self.setInfo({ status: 'success', message: 'Вопрос удален' });
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
            fetchDeleteQuestion(options);
        },
        hideModal(elem) {
            let modal = new bootstrap.Modal(elem)
            modal.hide()
        },
        changePage(page) {
            this.page = page;
            this.updateTable();
        },
        prevPage() {
            if (this.page > 1) {
                this.page--;
                this.updateTable();
            }
        },
        nextPage() {
            if (this.page < this.numOfPages) {
                this.page++;
                this.updateTable();
            }
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
        },
        numOfPages() {
            if (this.data.count > 0) {
                return Math.floor((this.data.count - 1) / this.limit + 1) || 1;
            } else {
                return 1
            }
        },
        pageItem() {
            let numOfPages = this.numOfPages;
            let ans = [];
            if (numOfPages <= 10) {
                for (let i = 1; i <= numOfPages; i++) {
                    ans.push(i);
                }
            } else {
                ans.push(1);
                ans.push(2);
                if (this.page > 4) {
                    ans.push('...');
                }

                for (let i = -1; i <= 1; i++) {
                    if (this.page + i > 2 && this.page + i < numOfPages - 1) {
                        ans.push(this.page + i);
                    }
                }

                if (this.page < numOfPages - 3) {
                    ans.push('...')
                }
                ans.push(numOfPages - 1);
                ans.push(numOfPages);
            }
            return ans;
        }
    },
    mounted() {
        if (this.token) {
            this.updateTable();
        }
    }
}
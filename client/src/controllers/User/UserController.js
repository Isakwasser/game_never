import fetchPlay from "../../fetch/PlayFetch"

export default {
    data() {
        return {
            data: [],
        }
    },
    methods: {
        updateQuestion() {
            const self = this;
            let options = {
                onSuccess: function (data) {
                    if (Array.isArray(data)) {
                        data = data[0];
                        self.data.unshift(data);
                    }
                },
                catch(err) {
                    console.log(err);
                },
            }
            fetchPlay(options);
        },
        setLike() {
            alert('Ничего не произошло. кнопка не работает.')
        },
        setDislike() {
            alert('Ничего не произошло. кнопка не работает.')
        },
    },
    mounted() {
        this.updateQuestion();
    }
}
import fetchPlay from "../../fetch/PlayFetch"

export default {
    data() {
        return {
            data: [],
            showDeveloperData: false,
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
    watch: {
        showDeveloperData(newValue) {
            localStorage.setItem('showDeveloperData', newValue);
        },
    },
    mounted() {
        let showDataInit = localStorage.getItem('showDeveloperData');
        if (showDataInit === 'true') {
            this.showDeveloperData = true;
        }
        this.updateQuestion();
    }
}
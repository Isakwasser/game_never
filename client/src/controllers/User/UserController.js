import fetchPlay from "../../fetch/PlayFetch"
import fetchLike from "../../fetch/LikeFetch"
import fetchDislike from "../../fetch/DislikeFetch"

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
                        self.$refs.like.disabled = false;
                        self.$refs.dislike.disabled = false;
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
            this.$refs.like.disabled = true;
            this.$refs.dislike.disabled = true;

            const self = this;
            let options = {
                body: {
                    id: self.data[0].id,
                },
                onSuccess: (data) => {
                    if (data.message) {
                        self.$refs.like.disabled = false;
                        self.$refs.dislike.disabled = false;
                    }
                },
                catch: (err) => {
                    console.log(err);
                    self.$refs.like.disabled = false;
                    self.$refs.dislike.disabled = false;
                }
            };
            fetchLike(options);
        },
        setDislike() {
            this.$refs.like.disabled = true;
            this.$refs.dislike.disabled = true;

            const self = this;
            let options = {
                body: {
                    id: self.data[0].id,
                },
                onSuccess: (data) => {
                    if (data.message) {
                        self.$refs.like.disabled = false;
                        self.$refs.dislike.disabled = false;
                    }
                },
                catch: (err) => {
                    console.log(err);
                    self.$refs.like.disabled = false;
                    self.$refs.dislike.disabled = false;
                }
            };
            fetchDislike(options);
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
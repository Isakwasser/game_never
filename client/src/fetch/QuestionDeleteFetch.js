import config from "./config";

const fetchQuestionDelete = (options) => {
    fetch(config.URL + '/question/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${options.token}`,
        },
        body: JSON.stringify(options.body),
    }).then(response => {
        return response.json();
    }).then(data => {
        options.onSuccess(data)
    }).catch(err => {
        options.catch(err);
    });
}

export default fetchQuestionDelete;
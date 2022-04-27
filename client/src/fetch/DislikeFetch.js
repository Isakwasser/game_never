import config from './config.js'

function fetchDislike(options) {
    fetch(config.URL + '/question/dislike', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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

export default fetchDislike;
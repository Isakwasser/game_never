import config from './config.js'

function fetchPlay(options) {
    fetch(config.URL + '/question/getToPlay', {
        mode: 'no-cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        return response.json();
    }).then(data => {
        options.onSuccess(data)
    }).catch(err => {
        options.catch(err);
    });
}

export default fetchPlay;
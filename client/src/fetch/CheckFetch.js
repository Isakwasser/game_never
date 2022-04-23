import config from "./config";

const CheckFetch = (options) => {
    fetch(config.URL + '/user/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${options.token}`,
        },
    }).then(response => {
        return response.json();
    }).then(data => {
        options.onSuccess(data)
    }).catch(err => {
        options.catch(err);
    });
}

export default CheckFetch;
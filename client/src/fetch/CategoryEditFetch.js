import config from "./config";

const fetchCategoryEdit = (options) => {
    fetch(config.URL + '/category/edit', {
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

export default fetchCategoryEdit;
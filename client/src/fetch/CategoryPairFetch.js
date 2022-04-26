import config from "./config";

const CategoryPairFetch = (options) => {
    fetch(config.URL + '/category/pair', {
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

export default CategoryPairFetch;
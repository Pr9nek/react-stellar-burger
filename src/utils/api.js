const Api = "https://norma.nomoreparties.space/api";

function onResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getData = () => {
    return fetch(`${Api}/ingredients`)
        .then(onResponse);
}

export const makeOrder = (IDs) => {
    return fetch(`${Api}/orders`, {
        method: 'POST',
        headers: {
                "Content-Type": "application/json",
            },
        body: JSON.stringify({
                ingredients: IDs
            })
    })
    .then(onResponse)
}

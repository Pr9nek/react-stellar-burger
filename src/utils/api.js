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
        .then(onResponse);
}

export const setRegistration = (email, password, name) => {
    return fetch(`${Api}/auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "name": name
            })
        })
        .then(onResponse);
}

export const logIn = (email, password) => {
    return fetch(`${Api}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
    .then(onResponse);
}

export const refreshToken = () => {
    return fetch(`${Api}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(onResponse);
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await onResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options); //повторяем запрос
            return await onResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};
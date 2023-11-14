const Api = "https://norma.nomoreparties.space/api";

function onResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function request(url, options) {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(url, options).then(onResponse);
}

export const getOrderWithNumber = (number) => {
    return request(`${Api}/orders/${number}`);
};

export const getData = () => {
    return request(`${Api}/ingredients`);
};

export const setRegistration = (email, password, name) => {
    return request(`${Api}/auth/register`, {
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
}

export const logIn = (email, password) => {
    return request(`${Api}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
}

export const logOut = (token) => {
    return request(`${Api}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            "token": localStorage.getItem("refreshToken"),
        })
    }).then(() => {
        localStorage.removeItem("resetPassword");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
    });
};

export const resetPassword = (email) => {
    return request(`${Api}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            "mail": email,
        })
    }).then(() => {
        localStorage.setItem("resetPassword", "true");
    });
};

export const getPassword = (newPassword, token) => {
    return request(`${Api}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            "password": newPassword,
            "token": token
        })
    }).then(() => {
        localStorage.setItem("resetPassword", "false");
    });
};

export const refreshToken = () => {
    return request(`${Api}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            "token": localStorage.getItem("refreshToken"),
        }),
    })
};


export const fetchWithRefresh = async (url, options) => {
    try {
        return await request(url, options);
    } catch (err) {
        console.log(err.message);
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен

            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);

            options.headers.Authorization = refreshData.accessToken;
            console.log(options);
            return await request(url, options); //повторяем запрос
        } else {
            return Promise.reject(err);
        }
    }
};

export const getUserRefresh = () => fetchWithRefresh(`${Api}/auth/user`, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken")
    }
});


export const patchUserRefresh = (name, email, password) => fetchWithRefresh(`${Api}/auth/user`, {
    method: 'PATCH',
    headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken")
    },
    body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password
    })
});

export const makeOrder = (IDs) => {
    return request(`${Api}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ingredients: IDs
        })
    })
}

export const makeOrderRefresh = (IDs) => fetchWithRefresh(
    `${Api}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken")
        },
        body: JSON.stringify({
            ingredients: IDs
        })
    })
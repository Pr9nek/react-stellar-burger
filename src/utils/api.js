const Api = "https://norma.nomoreparties.space/api";

function onResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getData = () => {
    return fetch(`${Api}/ingredients`)
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

export const logOut = (token) => {
    return fetch(`${Api}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            "token": localStorage.getItem("refreshToken"),
        })
    }).then(res => {
        onResponse(res);
        localStorage.removeItem("resetPassword");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
    });
};

export const resetPassword = (email) => {
    return fetch(`${Api}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            "mail": email,
        })
    }).then(res => {
        onResponse(res);
        localStorage.setItem("resetPassword", "true");
    });
};

export const getPassword = (newPassword, token) => {
    return fetch(`${Api}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            "password": newPassword,
            "token": token
        })
    }).then(res => {
        onResponse(res);
        localStorage.setItem("resetPassword", "false");
    });
};

export const refreshToken = () => {
    return fetch(`${Api}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            "token": localStorage.getItem("refreshToken"),
        }),
    }).then(onResponse);
};


export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await onResponse(res);
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

            const res = await fetch(url, options); //повторяем запрос
            return await onResponse(res);
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
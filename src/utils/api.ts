import { profileOrdersRoute, loginRoute, registerRoute, ingredientsRoute, accessTokenString, refreshTokenString } from "./constants";
import { TRefreshOption, TOrderWithNumber, TGetIngredients, TRegistration, TRefresh, TGetUser, TMakeOrder } from "../services/types/data";

const Api = "https://norma.nomoreparties.space/api";

function onResponse<T>(res: Response): Promise<T> {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function request<T>(url: string, options?: RequestInit) {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(url, options).then(onResponse<T>);
}

export const getOrderWithNumber = (number: string) => {
    return request<TOrderWithNumber>(`${Api}/${profileOrdersRoute}/${number}`);
};

export const getData = () => {
    return request<TGetIngredients>(`${Api}${ingredientsRoute}`);
};

export const setRegistration = (email: string, password: string, name: string) => {
    return request<TRegistration>(`${Api}/auth${registerRoute}`, {
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

export const logIn = (email: string, password: string) => {
    return request(`${Api}/auth${loginRoute}`, {
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

export const logOut = () => {
    return request(`${Api}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            "token": localStorage.getItem(refreshTokenString),
        })
    }).then(() => {
        localStorage.removeItem("resetPassword");
        localStorage.removeItem(refreshTokenString);
        localStorage.removeItem(accessTokenString);
    });
};

export const resetPassword = (email: string) => {
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

export const getPassword = (newPassword: string, token: string) => {
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
    return request<TRefresh>(`${Api}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            "token": localStorage.getItem(refreshTokenString),
        }),
    })
};


export const fetchWithRefresh = async (url: string, options: RequestInit & TRefreshOption): Promise<TGetUser> => {
    try {
        return await request(url, options);
    } catch (err: any) {
        console.log(err.message);
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен

            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem(refreshTokenString, refreshData.refreshToken);
            localStorage.setItem(accessTokenString, refreshData.accessToken);

            options.headers.Authorization = refreshData.accessToken;
            console.log(options);
            return await request(url, options); //повторяем запрос
        } else {
            return Promise.reject(err);
        }
    }
};

export const getUserRefresh = () => fetchWithRefresh (`${Api}/auth/user`, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(accessTokenString) as string
    }
});


export const patchUserRefresh = (name: string, email: string, password: string) => fetchWithRefresh(`${Api}/auth/user`, {
    method: 'PATCH',
    headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(accessTokenString) as string
    },
    body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password
    })
});

export const makeOrder = (IDs: string[]) => {
    return request<TMakeOrder>(`${Api}/${profileOrdersRoute}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ingredients: IDs
        })
    })
}

export const makeOrderRefresh = (IDs: string[]) => fetchWithRefresh(
    `${Api}/${profileOrdersRoute}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem(accessTokenString) as string
        },
        body: JSON.stringify({
            ingredients: IDs
        })
    })
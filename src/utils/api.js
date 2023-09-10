const Api = "https://norma.nomoreparties.space/api/ingredients";
export const getData = () => {
    return fetch(Api)
        .then(res => res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
}
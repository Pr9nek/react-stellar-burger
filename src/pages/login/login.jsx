import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from "./login.module.css";
import { Link } from 'react-router-dom';

function Login() {

    const [value, setValue] = useState({ email: '', password: '' });
    const onChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    return (
            <div className={styles.container}>
                <h1 className="text text_type_main-medium pb-6">
                    Вход
                </h1>
                <form className={styles.form}>
                    <EmailInput
                        onChange={onChange}
                        value={value.email}
                        name={'email'}
                        isIcon={false}
                    />
                    <PasswordInput
                        onChange={onChange}
                        value={value.password}
                        name={'password'}
                        extraClass="mb-2"
                    />

                    {value.email && value.password ?
                        (<Button htmlType="button" type="primary" size="medium">
                            Войти
                        </Button>)
                        : (<Button htmlType="button" type="primary" size="medium" disabled>
                            Войти
                        </Button>)}
                </form>
                <div className={styles.registery}>
                    <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?
                        <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
                    </p>
                    <p className="text text_type_main-default text_color_inactive pt-4">Забыли пароль?
                        <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
                    </p>
                </div>
            </div>
    )
}

export default Login
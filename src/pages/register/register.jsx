import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from "./register.module.css";
import { Link } from 'react-router-dom';

export default function Register() {

    const [value, setValue] = useState({ name: '', email: '', password: '' });
    const onChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-medium pb-6">
                Регистрация
            </h1>
            <form className={styles.form}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    value={value.name}
                    name={'name'}
                    error={false}
                    size={'default'}
                />
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

                {value.email && value.password && value.name ?
                    (<Button htmlType="button" type="primary" size="medium">
                        Зарегистрироваться
                    </Button>)
                    : (<Button htmlType="button" type="primary" size="medium" disabled>
                        Зарегистрироваться
                    </Button>)}
            </form>
            <div className={styles.registery}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?
                    <Link className={styles.link} to='/login'>Войти</Link>
                </p>
            </div>
        </div>
    )
}
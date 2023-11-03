import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from "./register.module.css";
import { Link } from 'react-router-dom';
import { setUserRegistration } from '../../services/actions/user/actions';
import { useDispatch } from 'react-redux';

export default function Register() {

    const [value, setValue] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();

    const onChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(value);
		dispatch(setUserRegistration(value.email, value.password, value.name));
    }

    console.log(value.name);

    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-medium pb-6">
                Регистрация
            </h1>
            <form className={styles.form} onSubmit={onSubmit}>
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
                    (<Button htmlType="button" type="primary" size="medium" onClick={onSubmit}>
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
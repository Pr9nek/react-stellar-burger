import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from "./reset-password.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { getPassword } from '../../utils/api';


export default function ResetPassword() {

    const [value, setValue] = useState({ password: '', code: '' });
    const navigate = useNavigate();
    const onChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };
    const resetFlag = localStorage.getItem("resetPassword");
    const onSubmit = (e) => {
        e.preventDefault();
        getPassword(value.password, value.code)
            .then (()=>{
                const resetFlag = localStorage.getItem("resetPassword");
                if (resetFlag === 'false') { navigate("/");}
            })
    }

    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-medium pb-6">
                Восстановление пароля
            </h1>
            <form className={styles.form}>
                <PasswordInput
                    onChange={onChange}
                    value={value.password}
                    name={'password'}
                    extraClass="mb-2"
                    placeholder={'Введите новый пароль'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onChange}
                    value={value.code}
                    name={'code'}
                    error={false}
                    size={'default'}
                />

                {value.password && value.code ?
                    (<Button htmlType="button" type="primary" size="medium" onClick={onSubmit}>
                        Сохранить
                    </Button>)
                    : (<Button htmlType="button" type="primary" size="medium" disabled>
                        Сохранить
                    </Button>)}
            </form>
            <div className={styles.registery}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?
                    <Link className={styles.link} to='/login'>Войти</Link>
                </p>
            </div>
        </div>
    )
}
import { useEffect } from "react";
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./reset-password.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { getPassword } from '../../utils/api';
import { useForm } from '../../hooks/useForm';

export default function ResetPassword() {

    const {values, handleChange} = useForm({password: '', code: ''});
    const navigate = useNavigate();
    const resetFlag = localStorage.getItem("resetPassword");

    const onSubmit = (e) => {
        e.preventDefault();
        getPassword(values.password, values.code)
            .then(() => {
                const resetFlag = localStorage.getItem("resetPassword");
                if (resetFlag === 'false') { navigate("/"); }
            })
    }

    useEffect(() => {
        if (!resetFlag) { navigate("/") }
    }, []);

    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-medium pb-6">
                Восстановление пароля
            </h1>
            <form className={styles.form} onSubmit={onSubmit}>
                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                    extraClass="mb-2"
                    placeholder={'Введите новый пароль'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    value={values.code}
                    name={'code'}
                    error={false}
                    size={'default'}
                />
                <Button
                    disabled={!(values.password && values.code
                    )}
                    type="primary"
                    size="medium"
                    htmlType="submit"
                >
                    Сохранить
                </Button>
            </form>
            <div className={styles.registery}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?
                    <Link className={styles.link} to='/login'>Войти</Link>
                </p>
            </div>
        </div>
    )
}
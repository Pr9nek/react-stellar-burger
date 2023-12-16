import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./forgot-password.module.css";
import { Link } from 'react-router-dom';
import { resetPassword } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/hooks';
import { loginRoute } from '../../utils/constants';
import { ReactElement, FC } from 'react';

const ForgotPassword: FC = () => {
    const {values, handleChange} = useForm({email: ''});
    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        resetPassword(values.email)
            .then(() => {
                const resetFlag = localStorage.getItem("resetPassword");
                console.log(resetFlag);
                if (resetFlag === 'true') { navigate("/reset-password"); }
            });
    };

    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-medium pb-6">
                Восстановление пароля
            </h1>
            <form className={styles.form} onSubmit={onSubmit}>
                <EmailInput
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    isIcon={false}
                />
                <Button
                    disabled={!values.email}
                    type="primary"
                    size="medium"
                    htmlType="submit"
                >
                    Восстановить
                </Button>
            </form>
            <div className={styles.registery}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?
                    <Link className={styles.link} to={loginRoute}>Войти</Link>
                </p>
            </div>
        </div>)
}

export default ForgotPassword
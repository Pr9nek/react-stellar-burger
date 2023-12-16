import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./login.module.css";
import { Link } from 'react-router-dom';
import { logInUser } from '../../services/actions/user/actions';
import { useDispatch } from '../../hooks/hooks';
import { useForm } from '../../hooks/hooks';
import { registerRoute, forgotPasswordRoute } from '../../utils/constants';

function Login() {
    const {values, handleChange} = useForm({email: '', password: '' });
    const dispatch = useDispatch();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(logInUser(values.email, values.password));
    }

    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-medium pb-6">
                Вход
            </h1>
            <form className={styles.form} onSubmit={onSubmit} >
                <EmailInput
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                    extraClass="mb-2"
                />
                <Button
                    disabled={!(values.email && values.password)}
                    type="primary"
                    size="medium"
                    htmlType="submit"
                >
                    Войти
                </Button>
                <div className={styles.registery}>
                    <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?
                        <Link className={styles.link} to={registerRoute}>Зарегистрироваться</Link>
                    </p>
                    <p className="text text_type_main-default text_color_inactive pt-4">Забыли пароль?
                        <Link className={styles.link} to={forgotPasswordRoute}>Восстановить пароль</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login
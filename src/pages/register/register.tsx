import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./register.module.css";
import { Link } from 'react-router-dom';
import { setUserRegistration } from '../../services/actions/user/actions';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/hooks';
import { loginRoute } from '../../utils/constants';

export default function Register() {
    const {values, handleChange} = useForm({ name: '', email: '', password: '' });
    const dispatch = useDispatch();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setUserRegistration(values.email, values.password, values.name));
    }

    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-medium pb-6">
                Регистрация
            </h1>
            <form className={styles.form} onSubmit={onSubmit}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    value={values.name}
                    name={'name'}
                    error={false}
                    size={'default'}
                />
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
                    disabled={!(values.email && values.password && values.name
                    )}
                    type="primary"
                    size="medium"
                    htmlType="submit"
                >
                    Зарегистрироваться
                </Button>
            </form>
            <div className={styles.registery}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?
                    <Link className={styles.link} to={loginRoute}>Войти</Link>
                </p>
            </div>
        </div>
    )
}
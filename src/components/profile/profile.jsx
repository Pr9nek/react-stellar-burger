import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./profile.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../services/actions/user/actions';
import { useForm } from '../../hooks/useForm';

export default function Profile() {

    const dispatch = useDispatch();

    const name = useSelector((store) => store.user.user.name);
    const login = useSelector((store) => store.user.user.email);
    const {values, handleChange, setValues} = useForm({name: name, email: login, password: '******'});

    const onReset = (e) => {
        setValues({
            name: name, email: login, password: '******'
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(editUser(values.name, values.email, values.password));
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmit}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    value={values.name}
                    name={'name'}
                    error={false}
                    size={'default'}
                    icon={'EditIcon'}
                />
                <EmailInput
                    placeholder={'Логин'}
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    isIcon={false}
                    icon={'EditIcon'}
                />
                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                    extraClass="mb-2"
                    icon={'EditIcon'}
                />
                <div className={styles.buttons}>
                    <Button
                        disabled={!(values.email && values.name !== login && values.name && values.name !== name && values.password && values.password !== "******"
                        )}
                        type="secondary"
                        size="medium"
                        htmlType="submit"
                        onClick={onReset}
                    >
                        Отмена
                    </Button>
                    <Button
                        disabled={!(values.email && values.name !== login && values.name && values.name !== name && values.password && values.password !== "******"
                        )}
                        type="primary"
                        size="medium"
                        htmlType="submit"
                    >
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>
    )
}
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./profile.module.css";
import { useDispatch, useSelector } from '../../hooks/hooks';
import { editUser } from '../../services/actions/user/actions';
import { useForm } from '../../hooks/hooks';
import { getUserNameSelector, getUserEmailSelector } from '../../utils/constants';

export default function Profile() {

    const dispatch = useDispatch();
    
    const name = useSelector(getUserNameSelector) as string;
    const login = useSelector(getUserEmailSelector) as string;
    const {values, handleChange, setValues} = useForm({name: name, email: login, password: '******'});

    const onReset = (e: React.FormEvent) => {
        setValues({
            name: name, email: login, password: '******'
        });
    }

    const onSubmit = (e: React.FormEvent) => {
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
                <Input
                    placeholder={'Логин'}
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    // isIcon={false}
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
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import styles from "./profile.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../services/actions/user/actions';

export default function Profile() {

    const dispatch = useDispatch();

    const name = useSelector((store) => store.user.user.name);
    const login = useSelector((store) => store.user.user.email);
    const [value, setValue] = useState({ name: name, email: login, password: '******' });

    const onChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const onReset = (e) => {
        setValue({
            name: name, email: login, password: '******'
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(editUser(value.name, value.email, value.password));
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onChange={onChange} onSubmit={onSubmit}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    value={value.name}
                    name={'name'}
                    error={false}
                    size={'default'}
                    icon={'EditIcon'}
                />
                <EmailInput
                    placeholder={'Логин'}
                    onChange={onChange}
                    value={value.email}
                    name={'email'}
                    isIcon={false}
                    icon={'EditIcon'}
                />
                <PasswordInput
                    onChange={onChange}
                    value={value.password}
                    name={'password'}
                    extraClass="mb-2"
                    icon={'EditIcon'}
                />
                <div className={styles.buttons}>
                    {(value.email || value.email !== login) && (value.name || value.name !== name) && value.password && value.password !== "******" ?
                        (<Button htmlType="button" type="secondary" size="medium" onClick={onReset}>
                            Отмена
                        </Button>)
                        : (<Button htmlType="button" type="secondary" size="medium" disabled>
                            Отмена
                        </Button>)}
                    {(value.email || value.email !== login) && (value.name || value.name !== name) && value.password && value.password !== "******" ?
                        (<Button htmlType="button" type="primary" size="medium" htmlType="submit">
                            Сохранить
                        </Button>)
                        : (<Button htmlType="button" type="primary" size="medium" disabled>
                            Сохранить
                        </Button>)}
                </div>
            </form>
        </div>
    )
}
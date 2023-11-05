import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from "./profile.module.css";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Profile() {

    const [value, setValue] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();

    const name = useSelector((store) => store.user.user.name); 
    const login = useSelector((store) => store.user.user.email); 

    const onChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        /* dispatch(setUserRegistration(value.email, value.password, value.name)); */
    }

    console.log(value.name);

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmit}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    value={name}
                    name={'name'}
                    error={false}
                    size={'default'}
                    icon={'EditIcon'}
                />
                <EmailInput
                    placeholder={'Логин'}
                    onChange={onChange}
                    value={login}
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
                <Button htmlType="button" type="secondary" size="medium">
                    Отмена
                </Button>
                {value.email && value.password && value.name ?
                    (<Button htmlType="button" type="primary" size="medium" onClick={onSubmit}>
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
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from "./forgot-password.module.css";
import { Link } from 'react-router-dom';

function ForgotPassword() {

    const [value, setValue] = useState('');
    const onChange = (e) => {
        setValue(e.target.value);
    };

    return (
            <div className={styles.container}>
                <h1 className="text text_type_main-medium pb-6">
                Восстановление пароля
                </h1>
                <form className={styles.form}>
                    <EmailInput
                        onChange={onChange}
                        value={value.email}
                        name={'email'}
                        isIcon={false}
                    />
                    
                    {value ?
                        (<Button htmlType="button" type="primary" size="medium">
                            Восстановить
                        </Button>)
                        : (<Button htmlType="button" type="primary" size="medium" disabled>
                            Восстановить
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

export default ForgotPassword
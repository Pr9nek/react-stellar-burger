import stylesOrder from "./Order-Details.module.css";
import DoneIcon from "../../../images/done.png";
import { useSelector } from 'react-redux';


export default function OrderDetails() {
    
    const order = useSelector(store => store.orderData.order);

    return (
        <div className={`${stylesOrder.container} mt-4`}>
            {order === null ? "Соберите бургер" :
            <p className="text text_type_digits-large"> {order}</p>}
            <p className="text text_type_main-medium mt-8 mb-15">
                идентификатор заказа
            </p>
            <img src={DoneIcon} alt="Знак выполненного заказа" className="mb-15" />
            <p className="text text_type_main-default mb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive mb-30">
                Дождитесь готовности на орбитальной станции
            </p>

        </div>
    )
}

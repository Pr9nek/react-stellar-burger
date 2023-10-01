import { useState, useEffect, useMemo } from "react";
import stylesOrder from "./Order-Details.module.css";
import DoneIcon from "../../../images/done.png";
/* import { makeOrder } from "../../../utils/api"; */
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../../services/actions/OrderDetails/actions';


export default function OrderDetails() {

    const burgerConstructor = useSelector(store => store.burgerConstructor);
    const { bun, ingredients } = burgerConstructor;
    
    const orderData = useSelector(store => store.order);
    const { order, isLoading } = orderData;

   /*  const order = useState({
        hasError: false,
        order: null
    }); */
    const dispatch = useDispatch();
   

    const ingredientIds = useMemo(() =>
        ingredients.map((ingredient) => ingredient._id)
        , [burgerConstructor]);

    const ids = useMemo(() =>
        bun !== null && ingredients.length !== 0 ?
            [bun._id, ...ingredientIds, bun._id] : null
        , [burgerConstructor]);

    console.log(orderData);
    console.log(ids);
    console.log(order);

    useEffect(() => {
        dispatch(getOrder(ids));
    }, [])

  /*   useEffect(() => {
        const getOrder = () => {
            makeOrder(ids)
                .then(res => setDataState({ ...dataState, order: res.order.number }))
                .catch(e => {
                    setDataState({ ...dataState, hasError: true });
                });
        }
        getOrder();
    }, []) */

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

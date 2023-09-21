import { useState, useContext, useEffect, useMemo } from "react";
import stylesOrder from "./Order-Details.module.css";
import DoneIcon from "../../../images/done.png";
import { makeOrder } from "../../../utils/api";
import { ConstructorContext } from "../../../services/constructorContext";

export default function OrderDetails() {
    const { burgerConstructor } = useContext(ConstructorContext);
    const { bun, ingredients } = burgerConstructor;

    const [dataState, setDataState] = useState({
        hasError: false,
        order: null
    });

    const ingredientIds = useMemo(() =>
        ingredients.map((ingredient) => ingredient._id)
        , [burgerConstructor]);

    const ids = useMemo(() =>
        bun !== null && ingredients.length !== 0 ?
            [bun._id, ...ingredientIds, bun._id] : null
        , [burgerConstructor]);

    useEffect(() => {
        const getOrder = () => {
            makeOrder(ids)
                .then(res => setDataState({ ...dataState, order: res.order.number }))
                .catch(e => {
                    setDataState({ ...dataState, hasError: true });
                });
        }
        getOrder();
    }, [])

    return (
        <div className={`${stylesOrder.container} mt-4`}>
            {dataState.order === null ? "Соберите бургер" :
            <p className="text text_type_digits-large"> {dataState.order}</p>}
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

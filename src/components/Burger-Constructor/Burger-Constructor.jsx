import { useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import ListItem from "./list-item/list-item";
import StylesConstructor from "./burger-constructor.module.css";
import CurrencyIconBig from "../../images/CurrencyIconBig.png";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import Modal from "../modals/modal/modal";
import OrderDetails from "../modals/order-details/order-details";
import { getOrder } from '../../services/actions/orderDetails/actions';
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { ADD_BUN_TO_CONSTRUCTOR, ADD_INGREDIENT_TO_CONSTRUCTOR, MOVE_INGREDIENT, RESET_CONSTRUCTOR_INGREDIENTS } from '../../services/actions/burgerConstructor/actions';
import { CLEAR_ORDER } from '../../services/actions/orderDetails/actions';

export default function BurgerConstructor() {
    const burgerConstructor = useSelector(store => store.burgerConstructor);
    const currentOrder = useSelector(store => store.orderData.order);
    const isLoading = useSelector(store => store.orderData.isLoading);
    const dispatch = useDispatch();

    function CloseModal() {
        dispatch({ type: CLEAR_ORDER });
    }

    const { bun, ingredients } = burgerConstructor;

    const price = useMemo(() =>
        bun ? ingredients.reduce((acc, i) => acc + i.price, 0) + bun.price * 2 : ingredients.reduce((acc, i) => acc + i.price, 0)
        , [burgerConstructor]);

    const ingredientIds = useMemo(() =>
        ingredients.map((ingredient) => ingredient._id)
        , [burgerConstructor]);

    const ids = useMemo(() =>
        bun !== null && ingredients.length !== 0 ?
            [bun._id, ...ingredientIds, bun._id] : null
        , [burgerConstructor]);

    const add = (item) => {
        item.type === "bun" ?
            dispatch({
                type: ADD_BUN_TO_CONSTRUCTOR, payload: item
            }) :
            dispatch({
                type: ADD_INGREDIENT_TO_CONSTRUCTOR, payload: { ...item, id: uuidv4() }
            })
    }

    const [{ isHover }, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            add(item.ingredient);
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    });

    const background = isHover ? { background: 'grey' } : { background: 'transparent' };

    const moveIngredients = useCallback(
        (dragIndex, hoverIndex) => {
            dispatch({
                type: MOVE_INGREDIENT,
                payload: { dragIndex, hoverIndex },
            })
        }, [ingredients])


    return (
        <>
            {isLoading && <div>Ваш заказ обрабатывается</div>}
            <div ref={dropTarget} style={background}>
                {isLoading}
                <div className={`${StylesConstructor.border} mr-4`}>
                    {bun && <ConstructorElement
                        type="top"
                        isLocked
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                    }
                </div >
                <ul className={`${StylesConstructor.lists} custom-scroll`}>
                    {ingredients.length !== 0 &&

                        ingredients.map((ingredient, index) => (
                            <li className={StylesConstructor.lists_li} key={ingredient.id}>
                                <ListItem name={ingredient.name} price={ingredient.price} image={ingredient.image} index={index} moveIngredient={moveIngredients} id={ingredient.id} />
                            </li>
                        ))
                    }

                </ul>
                <div className={`${StylesConstructor.border} mr-4`}>
                    {bun && <ConstructorElement
                        type="bottom"
                        isLocked
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />}
                </div>
                {!bun &&
                    <div className={StylesConstructor.footer}>
                        <p className="text text_type_digits-medium pr-2">{price}</p>
                        <img src={CurrencyIconBig} alt="Значок цены" className="pr-10" />

                        <Button htmlType="button" type="primary" size="large" disabled>Оформить заказ</Button>
                    </div>
                }
                {bun &&
                    <div className={StylesConstructor.footer}>
                        <p className="text text_type_digits-medium pr-2">{price}</p>
                        <img src={CurrencyIconBig} alt="Значок цены" className="pr-10" />

                        <Button htmlType="button" type="primary" size="large" onClick={
                            () => {
                                dispatch(getOrder(ids));
                                dispatch({ type: RESET_CONSTRUCTOR_INGREDIENTS });
                            }
                        }
                        >
                            Оформить заказ
                        </Button>
                    </div>}
            </div>
            {currentOrder &&
                <Modal onClose={CloseModal}>
                    <OrderDetails price={price} />
                </Modal>
            }
        </>
    )
}

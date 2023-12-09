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
import { addBun, addIngredient, moveIngredient, resetConstructor } from '../../services/actions/burgerConstructor/actions';
import { clearOrder } from '../../services/actions/orderDetails/actions';
import { useNavigate } from 'react-router-dom';
import { loginRoute, getOrderDataOrderSelector, getBurgerConstructorStore, getUserSelector } from "../../utils/constants";
import { TIngredient } from "../../services/types/data";

export default function BurgerConstructor() {
    const burgerConstructor = useSelector(getBurgerConstructorStore);
    const getOrderDataIsLoadingSelector = store => store.orderData.isLoading
    const currentOrder = useSelector(getOrderDataOrderSelector);
    const isLoading = useSelector(getOrderDataIsLoadingSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(getUserSelector);

    function CloseModal() {
        dispatch(clearOrder());
    }

    const { bun, ingredients } = burgerConstructor;

    const price = useMemo(() =>
        bun ? ingredients.reduce((acc: number, i: TIngredient) => acc + i.price, 0) + bun.price * 2 : ingredients.reduce((acc: number, i: TIngredient) => acc + i.price, 0)
        , [burgerConstructor]);

    const ingredientIds: string[] = useMemo(() =>
        ingredients.map((ingredient: TIngredient) => ingredient._id)
        , [burgerConstructor]);

    const ids: string[] | null = useMemo(() =>
        bun !== null && ingredients.length !== 0 ?
            [bun._id, ...ingredientIds, bun._id] : null
        , [burgerConstructor]);

    const add = (item: TIngredient) => {
        item.type === "bun" ?
            dispatch(addBun(item)) :
            dispatch(addIngredient(item))
    }

    const [{ isHover }, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item: {ingredient: TIngredient}) {
            add(item.ingredient);
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    });

    const background: {background: string} = isHover ? { background: 'grey' } : { background: 'transparent' };

    const moveIngredients = useCallback(
        (dragIndex, hoverIndex) => {
            dispatch(moveIngredient(dragIndex, hoverIndex))
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

                        ingredients.map((ingredient: TIngredient, index: number) => (
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
                                if (!user) { navigate(loginRoute);}
                                else
                                {dispatch(getOrder(ids));}
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

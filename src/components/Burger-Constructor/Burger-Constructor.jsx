import { useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import ListItem from "./List-Item/List-Item";
import StylesConstructor from "./Burger-Constructor.module.css";
import CurrencyIconBig from "../../images/CurrencyIconBig.png";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import Modal from "../modals/Modal/Modal";
import OrderDetails from "../modals/Order-Details/Order-Details";
import { getOrder } from '../../services/actions/OrderDetails/actions';
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';

export default function BurgerConstructor() {
    const burgerConstructor = useSelector(store => store.burgerConstructor);
    const currentOrder = useSelector(store => store.orderData.order);
    const dispatch = useDispatch();
    /* const [openModal, setOpenModal] = useState(false); */

    function CloseModal() {
        dispatch({ type: 'CLEAR_ORDER' });
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
                type: 'ADD_BUN_TO_CONSTRUCTOR', payload: item
            }) :
            dispatch({
                type: 'ADD_INGREDIENT_TO_CONSTRUCTOR', payload: { ...item, id: uuidv4() }
            })
    }

    const [{ isHover }, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            add(item.ingredient);
        },
        collect: monitor => ({
            isHover: monitor.isOver() // Обратимся к методу isOver объекта monitor, он ведёт себя схожим образом с hover 
        })
    });

    const background = isHover ? {background: 'grey'} : {background: 'transparent'};

    const moveIngredients = useCallback(
        (dragIndex, hoverIndex) => {
            // Swap places of dragItem and hoverItem in the pets array
            dispatch({
                type: 'MOVE_INGREDIENT',
                payload: {dragIndex, hoverIndex},
            })
        }, [ingredients])


    return (
        <>
            <div ref={dropTarget} style={background}>
                {/* <div></div> */}
                <div className={`${StylesConstructor.border} mr-4`}>
                    {bun && <ConstructorElement
                        type="top"
                        isLocked
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                    }
                </div >
                <ul className={`${StylesConstructor.lists} custom-scroll`}>
                    {ingredients.length !== 0 &&

                        ingredients.map((ingredient, index) => (
                            <li className={StylesConstructor.lists_li} key={ingredient.id}>
                                <ListItem name={ingredient.name} price={ingredient.price} image={ingredient.image} index={index} moveIngredient={moveIngredients} id={ingredient.id}/>
                            </li>
                        ))
                    }

                </ul>
                <div className={`${StylesConstructor.border} mr-4`}>
                    {bun && <ConstructorElement
                        type="bottom"
                        isLocked
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />}
                </div>
                <div className={StylesConstructor.footer}>
                    <p className="text text_type_digits-medium pr-2">{price}</p>
                    <img src={CurrencyIconBig} alt="Значок цены" className="pr-10" />
                    <Button htmlType="button" type="primary" size="large" onClick={
                        () => dispatch(getOrder(ids))}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {currentOrder &&
                <Modal onClose={CloseModal}>
                    <OrderDetails price={price} />
                </Modal>
            }
        </>
    )
}

// BurgerConstructor.propTypes = constructorPropType;
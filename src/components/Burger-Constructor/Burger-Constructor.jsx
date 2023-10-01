import { useState } from "react";
import { useSelector } from 'react-redux';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import ListItem from "./List-Item/List-Item";
import StylesConstructor from "./Burger-Constructor.module.css";
import CurrencyIconBig from "../../images/CurrencyIconBig.png";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import Modal from "../modals/Modal/Modal";
import OrderDetails from "../modals/Order-Details/Order-Details";

export default function BurgerConstructor() {
    const burgerConstructor = useSelector(store => store.burgerConstructor);
    const [openModal, setOpenModal] = useState(false);

    function CloseModal() {
        setOpenModal(false);
    }

    const { bun, ingredients } = burgerConstructor;

    const price = useMemo(() =>
        bun ? ingredients.reduce((acc, i) => acc + i.price, 0) + bun.price * 2 : ingredients.reduce((acc, i) => acc + i.price, 0)
        , [burgerConstructor]);

    return (
        <>
            <div className={`${StylesConstructor.border} mr-4`}>
                {bun && <ConstructorElement
                    type="top"
                    isLocked
                    text="Краторная булка N-200i (верх)"
                    price={bun.price}
                    thumbnail={bun.image}
                />
                }
            </div >
            <ul className={`${StylesConstructor.lists} custom-scroll`}>
                {ingredients.length !== 0 &&

                    ingredients.map((ingredient) => (
                        <li className={StylesConstructor.lists_li} key={ingredient._id}>
                            <ListItem name={ingredient.name} price={ingredient.price} image={ingredient.image} />
                        </li>
                    ))
                }

            </ul>
            <div className={`${StylesConstructor.border} mr-4`}>
                {bun !== null && <ConstructorElement
                    type="bottom"
                    isLocked
                    text="Краторная булка N-200i (верх)"
                    price={bun.price}
                    thumbnail={bun.image}
                />}
            </div>
            <div className={StylesConstructor.footer}>
                <p className="text text_type_digits-medium pr-2">{price}</p>
                <img src={CurrencyIconBig} alt="Значок цены" className="pr-10" />
                <Button htmlType="button" type="primary" size="large" onClick={() => setOpenModal(true)}>
                    Оформить заказ
                </Button>
                {openModal && <Modal onClose={CloseModal}>
                    <OrderDetails price={price} />
                </Modal>}
            </div>
        </>
    )
}

// BurgerConstructor.propTypes = constructorPropType;
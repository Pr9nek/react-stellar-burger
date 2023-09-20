import { useState, useContext } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import ListItem from "./List-Item/List-Item";
import StylesConstructor from "./Burger-Constructor.module.css";
import CurrencyIconBig from "../../images/CurrencyIconBig.png";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import Modal from "../modals/Modal/Modal";
import OrderDetails from "../modals/Order-Details/Order-Details";
import { ConstructorContext } from "../../services/constructorContext";
// import { constructorPropType } from "../../utils/prop-types";

export default function BurgerConstructor() {
    const { burgerConstructor, setBurgerConstructor } = useContext(ConstructorContext);
    const [openModal, setOpenModal] = useState(false);

    function CloseModal() {
        setOpenModal(false);
    }

    // const buns = useMemo(() => ingredients.filter(x => x.type === "bun"), [ingredients]);
    // const mains = useMemo(() => ingredients.filter(x => x.type === "main"), [ingredients]);
    // const sauces = useMemo(() => ingredients.filter(x => x.type === "sauce"), [ingredients]);
    // let middles = [...mains, ...sauces];
    // const price = useMemo(() => ingredients.reduce((acc, i) => acc + i.price, 0) + bun.price * 2, [burgerConstructor]);
    const { bun, ingredients } = burgerConstructor;

    return (
        <>
            <div className={`${StylesConstructor.border} mr-4`}>
                {bun !== null && <ConstructorElement
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
                <p className="text text_type_digits-medium pr-2">0</p>
                <img src={CurrencyIconBig} alt="Значок цены" className="pr-10" />
                <Button htmlType="button" type="primary" size="large" onClick={() => setOpenModal(true)}>
                    Оформить заказ
                </Button>
                {openModal && <Modal onClose={CloseModal}>
                    <OrderDetails price='0' />
                </Modal>}
            </div>
        </>
    )
}

// BurgerConstructor.propTypes = constructorPropType;
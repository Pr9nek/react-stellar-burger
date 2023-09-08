import { useState } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import ListItem from "./List-Item/List-Item";
// import { data } from "../../utils/data";
import StylesConstructor from "./Burger-Constructor.module.css";
import CurrencyIconBig from "../../images/CurrencyIconBig.png";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import Modal from "../modals/Modal/Modal";

export default function BurgerConstructor(props) {
    const ingredients = props.data;
    const [openModal, setOpenModal] = useState(false);

    function CloseModal() {
        setOpenModal(false);
        console.log(123);
    }

    const buns = useMemo(() => ingredients.filter(x => x.type === "bun"), [ingredients]);
    const mains = useMemo(() => ingredients.filter(x => x.type === "main"), [ingredients]);
    const sauces = useMemo(() => ingredients.filter(x => x.type === "sauce"), [ingredients]);
    const price = useMemo(() => ingredients.reduce((acc, i) => acc + i.price, 0), [ingredients]);

    let middles = [...mains, ...sauces];

    return (
        <>
            <div className={`${StylesConstructor.border} mr-4`}>
                <ConstructorElement
                    type="top"
                    isLocked
                    text="Краторная булка N-200i (верх)"
                    price={buns[0].price}
                    thumbnail={buns[0].image}
                />
            </div >
            <ul className={`${StylesConstructor.lists} custom-scroll`}>
                {middles.map((middle) => (
                    <li className={StylesConstructor.lists_li} key={middle._id}>
                        <ListItem name={middle.name} price={middle.price} image={middle.image} />
                    </li>
                ))}

            </ul>
            <div className={`${StylesConstructor.border} mr-4`}>
                <ConstructorElement
                    type="bottom"
                    isLocked
                    text="Краторная булка N-200i (низ)"
                    price={buns[1].price}
                    thumbnail={buns[1].image}
                />
            </div>
            <div className={StylesConstructor.footer}>
                <p className="text text_type_digits-medium pr-2">{price}</p>
                <img src={CurrencyIconBig} alt="Значок цены" className="pr-10" />
                <Button htmlType="button" type="primary" size="large" onClick={() => setOpenModal(true)}>
                    Оформить заказ
                </Button>
                {openModal && <Modal onClose={CloseModal} />}
            </div>
        </>
    )
}
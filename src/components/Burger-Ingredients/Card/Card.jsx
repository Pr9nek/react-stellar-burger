import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import CardStyle from "./card.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { cardPropType } from "../../../utils/prop-types";
import { useState } from "react";
import Modal from "../../modals/Modal/Modal";

export default function Card(props) {
    const [openModal, setOpenModal] = useState(false);

    function closeModal() {
        setOpenModal(false);
        console.log("card");
    }

    return (
        <>
            <div className={`${CardStyle.card} pl-4 pr-4`} onClick={() => setOpenModal(true)}>
                <img alt={props.name} src={props.image} className="pl-4 pr-4" />
                <div className={`${CardStyle.price} pb-1 pt-1`}>
                    <p className="text text_type_digits-default pr-2 ">{props.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`text text_type_main-default pb-6 ${CardStyle.name}`}>{props.name}</p>
                {props.count && <Counter count={props.count} size="default" extraClass="m-1" className={CardStyle.counter} />}
            </div>
            {openModal && <Modal onClose={closeModal} />}

        </>
    )
}

Card.prototype = cardPropType;
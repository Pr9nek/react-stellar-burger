import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import CardStyle from "./card.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
// import { cardPropType } from "../../../utils/prop-types";
import { useState, useContext } from "react";
import Modal from "../../modals/Modal/Modal";
import { cardPropType } from "../../../utils/prop-types";
import IngredientDetails from "../../modals/Ingredient-Details/Ingredient-Details";
import { ConstructorContext } from "../../../services/constructorContext";

export default function Card({ ingredient }) {

    const { burgerConstructor, setBurgerConstructor } = useContext(ConstructorContext);
    const { bun, ingredients } = burgerConstructor;

    const [openModal, setOpenModal] = useState(false);

    function closeModal() {
        setOpenModal(false);
    }

    function add(ingredient) {
        ingredient.type === "bun" ?
            setBurgerConstructor({
                ...burgerConstructor, bun: ingredient
            }) : 
            setBurgerConstructor({
                ...burgerConstructor, ingredients: [...ingredients, ingredient]
            })
        }
    

    return (
        <>
            <div className={`${CardStyle.card} pl-4 pr-4`} onClick={() => {
                setOpenModal(true);
                add(ingredient);
                }}>
                <img alt={ingredient.name} src={ingredient.image} className="pl-4 pr-4" />
                <div className={`${CardStyle.price} pb-1 pt-1`}>
                    <p className="text text_type_digits-default pr-2 ">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`text text_type_main-default pb-6 ${CardStyle.name}`}>{ingredient.name}</p>
                {ingredient.count && <Counter count={ingredient.count} size="default" extraClass="m-1" className={CardStyle.counter} />}
            </div>
            {/* {openModal && ingredient.type === "bun" ?
            setBurgerConstructor({
                ...burgerConstructor, bun: ingredient
            }) : 
            setBurgerConstructor({
                ...burgerConstructor
            })} */}
            {openModal && 
            
            <Modal header="Детали ингредиента" onClose={closeModal}>
                <IngredientDetails
                    image={ingredient.image_large}
                    name={ingredient.name}
                    calories={ingredient.calories}
                    carbohydrates={ingredient.carbohydrates}
                    fat={ingredient.fat}
                    proteins={ingredient.proteins}
                />
            </Modal>
            }

        </>
    )
}

Card.propTypes = cardPropType;
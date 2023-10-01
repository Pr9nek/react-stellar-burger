import Card from "./Card/Card";
import { useSelector, useDispatch } from 'react-redux';
import StylesIngrediets from "./Burger-Ingredients.module.css";
import { useMemo } from "react";
import IngredientDetails from '../modals/Ingredient-Details/Ingredient-Details';
import Modal from '../modals/Modal/Modal';

export default function BurgerIngredients() {
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const currentIngredient = useSelector(store => store.details.ingredientDetail);

    const dispatch = useDispatch();

    function closeModal() {
        dispatch({
            type: 'CLEAR_CURRENT_INGREDIENT'
        });
    }

    const buns = useMemo(() => ingredients.filter(x => x.type === "bun"), [ingredients]);
    const mains = useMemo(() => ingredients.filter(x => x.type === "main"), [ingredients]);
    const sauces = useMemo(() => ingredients.filter(x => x.type === "sauce"), [ingredients]);

    return (
        <>
            <div className={`${StylesIngrediets.lists} custom-scroll`}>
                <p className="text text_type_main-medium">Булки</p>
                <div className={`${StylesIngrediets.cards} pt-6 `}>
                    {ingredients.length === 0 ? (<div>Loading...</div>) :
                        buns.map((bun) => (
                            <Card key={bun._id} ingredient={bun} />
                        ))}
                </div>
                <p className="text text_type_main-medium pt-10">Соусы</p>
                <div className={`${StylesIngrediets.cards} pt-6 `}>
                    {sauces.map((sauce) => (
                        <Card key={sauce._id} ingredient={sauce} />
                    ))}
                </div>
                <p className="text text_type_main-medium pt-10">Начинка</p>
                <div className={`${StylesIngrediets.cards} pt-6 `}>
                    {mains.map((main) => (
                        <Card key={main._id} ingredient={main} />
                    ))}
                </div>
            </div>
            {currentIngredient &&
                <Modal header="Детали ингредиента" onClose={closeModal}>
                    <IngredientDetails />
                </Modal>
            }
        </>
    )
}

// BurgerIngredients.propTypes = burgerPropType;
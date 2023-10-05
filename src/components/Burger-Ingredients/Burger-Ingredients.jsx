import Card from "./Card/Card";
import Tabs from "../Burger-Ingredients/Tabs/Tabs";
import { useSelector, useDispatch } from 'react-redux';
import StylesIngrediets from "./Burger-Ingredients.module.css";
import { useMemo, useRef } from "react";
import IngredientDetails from '../modals/Ingredient-Details/Ingredient-Details';
import Modal from '../modals/Modal/Modal';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerIngredients() {
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const currentTab = useSelector(store => store.ingredients.currentTab);
    const currentIngredient = useSelector(store => store.details.ingredientDetail);

    const dispatch = useDispatch();

    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const mainsRef = useRef(null);
    const tabsRef = useRef(null);

    const handleScrollGroups = () => {
        const tabsBottom = tabsRef.current?.getBoundingClientRect().bottom;
        const bunsTop = bunsRef.current?.getBoundingClientRect().top;
        const mainsTop = mainsRef.current?.getBoundingClientRect().top;
        const saucesTop = saucesRef.current?.getBoundingClientRect().top;

        if (!tabsBottom || !bunsTop || !saucesTop || !mainsTop) {
            return;
        };
        const bunsDelta = Math.abs(bunsTop - tabsBottom);
        const mainsDelta = Math.abs(mainsTop - tabsBottom);
        const saucesDelta = Math.abs(saucesTop - tabsBottom);

        const min = Math.min (bunsDelta, mainsDelta, saucesDelta);
        const newTab = min === bunsDelta ? 'Булки' : min === mainsDelta ? 'Начинки' : 'Соусы';

        console.log(newTab);
        if (newTab!==currentTab) {
            dispatch({
                type: 'SWITCHTAB', 
                payload: newTab,
            });
        }
    };

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
            <h1 className="text text_type_main-large mb-5">
                Соберите бургер
            </h1>
            <div ref={tabsRef} className="mb-10">
                <div style={{ display: 'flex' }}>
                <Tab value="Булки" active={currentTab === 'Булки'} >
                    Булки
                </Tab>
                <Tab value="Соусы" active={currentTab === 'Соусы'} >
                    Соусы
                </Tab>
                <Tab value="Начинки" active={currentTab === 'Начинки'} >
                    Начинки
                </Tab>
                </div>
            </div>
            <div className={`${StylesIngrediets.lists} custom-scroll`} onScroll={handleScrollGroups}>
                <p ref={bunsRef} className="text text_type_main-medium">Булки</p>
                <div className={`${StylesIngrediets.cards} pt-6 `}>
                    {ingredients.length === 0 ? (<div>Loading...</div>) :
                        buns.map((bun) => (
                            <Card key={bun._id} ingredient={bun} />
                        ))}
                </div>
                <p ref={saucesRef} className="text text_type_main-medium pt-10">Соусы</p>
                <div className={`${StylesIngrediets.cards} pt-6 `}>
                    {sauces.map((sauce) => (
                        <Card key={sauce._id} ingredient={sauce} />
                    ))}
                </div>
                <p ref={mainsRef} className="text text_type_main-medium pt-10">Начинка</p>
                <div className={`${StylesIngrediets.cards} pt-6 `}>
                    {mains.map((main) => (
                        <Card key={main._id} ingredient={main} />
                    ))}
                </div>
            </div>
    {
        currentIngredient &&
        <Modal header="Детали ингредиента" onClose={closeModal}>
            <IngredientDetails />
        </Modal>
    }
        </>
    )
}

// BurgerIngredients.propTypes = burgerPropType;
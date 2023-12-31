import Card from "./card/card";
import { useSelector, useDispatch } from '../../hooks/hooks';
import StylesIngrediets from "./burger-ingredients.module.css";
import { useMemo, useRef } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {switchTab} from '../../services/actions/ingredients/actions';
import { getIngredientsSelector, getCurrentTabSelector } from "../../utils/constants";
import { TIngredient } from "../../services/types/data";
import { FC } from "react";

 const BurgerIngredients: FC = () => {
    const dispatch = useDispatch();
    
    const currentTab = useSelector(getCurrentTabSelector);
    const ingredients = useSelector(getIngredientsSelector);

    const bunsRef = useRef<HTMLParagraphElement>(null);
    const saucesRef = useRef<HTMLParagraphElement>(null);
    const mainsRef = useRef<HTMLParagraphElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);

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

        if (newTab!==currentTab) {
            dispatch(switchTab(newTab));
        }
    };

    const buns: TIngredient[] = useMemo(() => ingredients?.filter(x => x.type === "bun"), [ingredients]) as TIngredient[];
    const mains: TIngredient[] = useMemo(() => ingredients?.filter(x => x.type === "main"), [ingredients]) as TIngredient[];
    const sauces: TIngredient[] = useMemo(() => ingredients?.filter(x => x.type === "sauce"), [ingredients]) as TIngredient[];

    return (
        <>
            <h1 className="text text_type_main-large mb-5">
                Соберите бургер
            </h1>
            <div ref={tabsRef} className="mb-10">
                <div className={StylesIngrediets.tabsContaiber}>
                <Tab value="Булки" active={currentTab === 'Булки'} onClick={() => {}} >
                    Булки
                </Tab>
                <Tab value="Соусы" active={currentTab === 'Соусы'} onClick={() => {}} >
                    Соусы
                </Tab>
                <Tab value="Начинки" active={currentTab === 'Начинки'} onClick={() => {}} >
                    Начинки
                </Tab>
                </div>
            </div>
            <div className={`${StylesIngrediets.lists} custom-scroll`} onScroll={handleScrollGroups}>
                <p ref={bunsRef} className="text text_type_main-medium">Булки</p>
                <div className={`${StylesIngrediets.cards} pt-6 `}>
                    {ingredients?.length === 0 ? (<div>Loading...</div>) :
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
        </>
    )
}

export default BurgerIngredients;

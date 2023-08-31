import Card from "./Card/Card";
import IngredietStyles from "./Burger-Ingredients.module.css";
import { data } from "../../utils/data";

export default function BurgerIngredients() {
    // console.log(JSON.parse(data));
    const ingredients = JSON.parse(JSON.stringify(data));
    let buns = [];
    let mains = [];
    let sauces = [];

    ingredients.forEach((item) => {
        switch (item.type) {
            case "bun":
                buns.push(item);
                break;
            case "sauce":
                sauces.push(item);
                break;
            case "main":
                mains.push(item);
                break;
            default:
                break;
        } 
    });

    return (
        <>
            <p className="text text_type_main-medium pt-10">Булки</p>
            <div className={`${IngredietStyles.cards} pt-6 `}>
                {buns.map((bun) => (
                    <Card key={bun._id} name={bun.name} price={bun.price} image={bun.image}/>
                ))}
            </div>
            <p className="text text_type_main-medium pt-10">Соусы</p>
            <div className={`${IngredietStyles.cards} pt-6 `}>
                {sauces.map((sauce) => (
                    <Card key={sauce._id} name={sauce.name} price={sauce.price} image={sauce.image}/>
                ))}
            </div>
            <p className="text text_type_main-medium pt-10">Начинка</p>
            <div className={`${IngredietStyles.cards} pt-6 `}>
                {mains.map((main) => (
                    <Card key={main._id} name={main.name} price={main.price} image={main.image}/>
                ))}
            </div>
        </>
    )
}
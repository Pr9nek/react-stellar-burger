import Card from "./Card/Card";
import StylesIngrediets from "./Burger-Ingredients.module.css";
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
            <div className={`${StylesIngrediets.lists} custom-scroll`}>
                <p className="text text_type_main-medium">Булки</p>
                <div className={`${StylesIngrediets.cards} pt-6 `}>
                    {buns.map((bun) => (
                        <Card key={bun._id} name={bun.name} price={bun.price} image={bun.image} count={bun.count} />
                    ))}
                </div>
                <p className="text text_type_main-medium pt-10">Соусы</p>
                <div className={`${StylesIngrediets.cards} pt-6 `}>
                    {sauces.map((sauce) => (
                        <Card key={sauce._id} name={sauce.name} price={sauce.price} image={sauce.image} count={sauce.count} />
                    ))}
                </div>
                <p className="text text_type_main-medium pt-10">Начинка</p>
                <div className={`${StylesIngrediets.cards} pt-6 `}>
                    {mains.map((main) => (
                        <Card key={main._id} name={main.name} price={main.price} image={main.image} count={1}/>
                    ))}
                </div>
            </div>
        </>
    )
}
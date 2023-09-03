
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import ListItem from "./List-Item/List-Item";
import { data } from "../../utils/data";
import StylesConstructor from "./Burger-Constructor.module.css";
// import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import CurrencyIconBig from "../../images/CurrencyIconBig.png";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructor(props) {
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

    let middles = [...mains, ...sauces];

    return (
        <>
            <div className={`${StylesConstructor.border} mr-4`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
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
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={buns[0].image}
                />
            </div>
            <div className={StylesConstructor.footer}>
                <p className="text text_type_digits-medium pr-2">610</p>
                <img src={CurrencyIconBig} alt="Значок цены" className="pr-10"  />
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </>
    )
}
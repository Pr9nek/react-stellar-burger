
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";

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

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="pl-8">
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={buns[0].image}
                />

                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={buns[0].image}
                />
            </div>
        </>
    )
}
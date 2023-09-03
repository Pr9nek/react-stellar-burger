import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ListStyles from "./List-Item.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

export default function ListItem(props) {

    return (

        <div className={ListStyles.list}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={props.name}
                price={props.price}
                thumbnail={props.image}
            />
        </div>

    )
}
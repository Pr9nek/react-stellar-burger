import stylesDetails from "./ingredient-details.module.css";
import { getIngredientsSelector } from "../../../utils/constants";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";
import { TIngredient } from "../../../services/types/data";

const IngredientDetails: FC = () => {
    const { id } = useParams();
    const ingredients = useSelector(getIngredientsSelector);
    const ingredient = ingredients.find((item: TIngredient) => item._id === id);
    const location = useLocation();
    if (!ingredient) {return null};
    return (
        <div className={stylesDetails.container}>
            {location.state === null && (<p className={`${stylesDetails.header} text text_type_main-large`}>
                Детали ингредиента
            </p>)}
            <img src={ingredient.image} alt={ingredient.name} />
            <p className={` ${stylesDetails.name} text text_type_main-medium mt-4 mb-8`}>
                {ingredient.name}
            </p>
            <div className={stylesDetails.ingredients}>
                <div className={stylesDetails.item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Калории,ккал
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
                </div>
                <div className={stylesDetails.item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
                </div>
                <div className={stylesDetails.item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
                </div>
                <div className={stylesDetails.item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    )

}

export default IngredientDetails;
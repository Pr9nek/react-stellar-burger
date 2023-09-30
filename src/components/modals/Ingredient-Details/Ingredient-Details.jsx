import stylesDetails from "./Ingredient-Details.module.css";
import { useSelector } from 'react-redux';

export default function IngredientDetails() {
    const ingredients = useSelector(store => store.details.ingredientDetail);
    console.log(ingredients);
    const { image, name, calories, proteins, fat, carbohydrates } = ingredients
    
    return (
        <div className={stylesDetails.container}>
            <img src={image} />
            <p className={` ${stylesDetails.name} text text_type_main-medium mt-4 mb-8`}>
                {name}
            </p>
            <div className={stylesDetails.ingredients}>
                <div className={stylesDetails.item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Калории,ккал
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">{calories}</p>
                </div>
                <div className={stylesDetails.item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">{proteins}</p>
                </div>
                <div className={stylesDetails.item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">{fat}</p>
                </div>
                <div className={stylesDetails.item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>
                    <p className="text text_type_digits-default text_color_inactive">{carbohydrates}</p>
                </div>
            </div>
        </div>
    )

}
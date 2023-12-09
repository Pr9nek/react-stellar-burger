export type TOrder = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
};

export type TWSMessage = {
    orders: TOrder[];
    success: boolean;
    total: number;
    totalToday: number;
};

export type TIngredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
    id?: string;
};

export type TInsredientsRequest = {
    data: TIngredient[];
    success: boolean;
}; 
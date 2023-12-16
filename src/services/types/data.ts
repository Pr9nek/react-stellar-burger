// todo неправильно
export type TOrder = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: string;
    status: string;
    updatedAt: string;
    _id: string;
};

export type TOwner = {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
};

type TOrderInDetails = Omit<TOrder, 'ingredients'> & TOwner & {
    ingredients: TIngredient[];
};

export type TMakeOrder = {
    name: string;
    order: TOrderInDetails;
    success: boolean;
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

export type TUser = {
    email: string;
    name: string;
};

export type TRefreshOption = {
    headers: { Authorization: string };
};

export type TOrderWithNumber = {
    success: boolean;
    orders: TOrder;
};

export type TGetIngredients = {
    success: boolean;
    data: TIngredient[]; 
};

export type TRegistration = {
    success: boolean;
    user: TUser;
    accessToken: string;
	refreshToken: string;
}

export type TRefresh = Omit<TRegistration, 'user'>
export type TGetUser = Omit<TRegistration, 'accessToken' | 'refreshToken'>

export type TLogOut = {
    success: boolean;
    message: string;
}

export type TResetPassword = {
    success: boolean;
    message: string;
}

export type TNewPassword = {
    success: boolean;
    message: string;
}



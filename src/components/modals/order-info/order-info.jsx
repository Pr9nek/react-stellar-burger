import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentOrder } from "../../../services/actions/currentOrder/actions";
import { useEffect } from "react";

export default function OrderInfo() {
    const dispatch = useDispatch();
    const { number } = useParams();
    // console.log(number);

    // const current = useSelector((store)=>store.currentOrder.current.orders[0])

    const order = useSelector(store => {
        let order;
        order = store.feed.orders?.find((order) => order.number === number);
        if (order) {
            return order;
    }
        order = store.profileFeed.orders?.find((order) => order.number === number);
        if (order) {
            return order;
    }
        return store.currentOrder.current.orders[0];
    });

    useEffect (() => {
        if (!order) {
            dispatch(setCurrentOrder(number))
    }
    },[]);

    // console.log(order);
    // console.log(current);
    
    if(!order) {
        return null;
    }
    
    return (
        <>
        прувэт
        </>
    )
}
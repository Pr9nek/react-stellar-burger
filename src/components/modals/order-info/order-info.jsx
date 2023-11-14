import { useParams } from "react-router-dom";
export default function OrderInfo() {

    const { number } = useParams()
    console.log(number);

    return (
        <>
        прувэт
        </>
    )
}
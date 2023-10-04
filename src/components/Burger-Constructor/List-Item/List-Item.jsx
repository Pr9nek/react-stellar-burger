import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ListStyles from "./List-Item.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { listItemPropType } from "../../../utils/prop-types";
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

export default function ListItem({ name, price, image, index, moveIngredient, id }) {

    const dispatch = useDispatch();

    const [{ isDragging }, dragRef] = useDrag({
        type: 'item',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    // useDrop - the list item is also a drop area
    const [spec, dropRef] = useDrop({
        accept: 'item',
        hover: (item, monitor) => {
            const dragIndex = item.index;
            const hoverIndex = index;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

            moveIngredient(dragIndex,hoverIndex);
           /*  dispatch({
                type: 'MOVE_INGREDIENT',
                payload: {dragIndex, hoverIndex},
            }); */
            item.index = hoverIndex;
        },
    });

    // Join the 2 refs together into one (both draggable and can be dropped on)
    const ref = useRef(null)
    const dragDropRef = dragRef(dropRef(ref))

    // Make items being dragged transparent, so it's easier to see where we drop them
    const opacity = isDragging ? {opacity: 0 } : {opacity: 1 };
    const deletItem = (id) => {
        dispatch({
            type: 'DELETE_INGREDIENT_FROM_CONSTRUCTOR',
            payload: id
        })
    } 
    return (

        <div ref={dragDropRef} className={ListStyles.list} style={opacity}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={(() => deletItem({id}))}
            /* handleClose={()=> dispatch({
                type: 'DELETE_INGREDIENT_FROM_CONSTRUCTOR', 
                payload: {props._id}
            })} */
            />
        </div>
    )
}

ListItem.prototype = listItemPropType;
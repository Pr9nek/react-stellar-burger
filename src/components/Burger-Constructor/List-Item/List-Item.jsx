import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ListStyles from "./list-item.module.css";
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

    const [spec, dropRef] = useDrop({
        accept: 'item',
        hover: (item, monitor) => {
            const dragIndex = item.index;
            const hoverIndex = index;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const ref = useRef(null)
    const dragDropRef = dragRef(dropRef(ref))

    const opacity = isDragging ? { opacity: 0 } : { opacity: 1 };
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
                handleClose={(() => deletItem({ id }))}
            />
        </div>
    )
}

ListItem.prototypes = listItemPropType;
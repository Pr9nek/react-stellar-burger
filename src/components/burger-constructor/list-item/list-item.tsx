import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ListStyles from "./list-item.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from '../../../hooks/hooks';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { deleteItem } from '../../../services/actions/burgerConstructor/actions';
import { FC } from "react";
import { TDragItem, IListItem } from "../../../services/types";

const ListItem: FC <IListItem> = ({ name, price, image, index, moveIngredient, id }) => {
    const dispatchId = id as string;
    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null);

    const [{ isDragging }, dragRef] = useDrag({
        type: 'item',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [, dropRef] = useDrop({
        accept: 'item',
        hover: (item: TDragItem, monitor) => {
            if (!ref.current) {
                return;
              }
            const dragIndex = item.index;
            const hoverIndex = index;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const hoverActualY = monitor.getClientOffset()!.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    dragRef(dropRef(ref));

    const opacity = isDragging ? { opacity: 0 } : { opacity: 1 };
   
    return (
        <div ref={ref} className={ListStyles.list} style={opacity}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={ () => dispatch(deleteItem(dispatchId)) }
            />
        </div>
    )
}

export default ListItem;
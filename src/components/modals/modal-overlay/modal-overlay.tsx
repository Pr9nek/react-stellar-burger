import StyleOverlay from "./modal-overlay.module.css";
import { FC } from "react";

const ModalOverlay: FC = () => {
    return (
        <div className={StyleOverlay.overlay}></div>
    )
}

export default ModalOverlay
import ReactDOM from "react-dom";
import { useEffect } from "react";
import StylesModal from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../Modal-Overlay/ModalOverlay";

export default function Modal({ onClose, header, children }) {
    const modalRoot = document.getElementById("react-modals");

    useEffect(() => {
        const closeWithEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
                console.log(666);
            }
        }
        window.addEventListener('keydown', closeWithEsc);
        return () => window.removeEventListener('keydown', closeWithEsc);
    }, [])
    
    return ReactDOM.createPortal(
        (
            <>
                <div className={StylesModal.modal}>
                    <h1>{header}</h1>
                    <div onClick={onClose}
                        className={StylesModal.closeIcon}
                    >
                        <CloseIcon type="primary" />
                    </div>
                    {children}
                </div>
                <div onClick={onClose}>
                    <ModalOverlay />
                </div>
            </>
        ),
        modalRoot
    );
} 
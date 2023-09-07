import ReactDOM from "react-dom";
import { useEffect } from "react";
import StylesModal from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

export default function Modal({ onClose, onKeyClose, header, children }) {
    const modalRoot = document.getElementById("react-modals");

    useEffect(() => {
        const close = (e) => {
            if (e.key === "Escape") {
                onKeyClose();
                console.log(666);
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [])
    
    return ReactDOM.createPortal(
        (
            <>
                <div onKeyDown={onKeyClose} className={StylesModal.modal}>
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
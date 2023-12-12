import ReactDOM from "react-dom";
import { useEffect } from "react";
import StylesModal from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { FC } from "react";
import { IModal } from "../../../services/types";

 const Modal: FC<IModal> = ({ onClose, header, children }) => {
    const modalRoot = document.getElementById("react-modals") as HTMLElement;

    useEffect(() => {
        const closeWithEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        }
        window.addEventListener('keydown', closeWithEsc);
        return () => window.removeEventListener('keydown', closeWithEsc);
    }, [])

    return ReactDOM.createPortal(
        (
            <>
                <div className={StylesModal.modal}>
                    <div className={StylesModal.header}>
                        <p className="text text_type_main-large">{header}</p>
                        <div onClick={onClose}
                            className={StylesModal.close}>
                            <CloseIcon type="primary" />
                        </div>
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

export default Modal
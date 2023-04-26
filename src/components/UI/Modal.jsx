import classes from "./Modal.module.css";
// import Cart from "../Cart/Cart";
import { createPortal } from "react-dom";

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>;
};
const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById("overlays");

export default function Modal(props) {
    return (
        <>
            {createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalElement
            )}
        </>
    );
}

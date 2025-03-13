import ReactDom from "react-dom";

export default function Modal(props) {
  const { children, handleClosemodal } = props;

  return ReactDom.createPortal(
    <div className="modal-container">
      <button className="modal-underlay" onClick={handleClosemodal}></button>
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById("portal")
  );
}

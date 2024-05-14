import React, { useEffect } from "react";
import { Toast } from "react-bootstrap";

function ToastMessage({
  show,
  message,
  onClose,
  delay = 3000,
  color = "bg-info",
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [show, onClose, delay]);

  return (
    <Toast
      show={show}
      onClose={onClose}
      delay={delay}
      autohide
      className={`${color}`}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
      }}
    >
      <Toast.Header>
        <strong className="m-auto">Notificacion</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default ToastMessage;

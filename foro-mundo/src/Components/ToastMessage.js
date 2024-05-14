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
      className={color}
      style={{
        position: "fixed", // Use fixed to make it relative to the viewport
        top: "20px", // Positioned 20px from the top of the viewport
        right: "20px", // Positioned 20px from the right of the viewport
        zIndex: 9999, // High z-index to ensure it's on top of other content
      }}
    >
      <Toast.Header>
        <strong className="mr-auto">Notificacion</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default ToastMessage;

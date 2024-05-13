import React from "react";
import { Modal, Button } from "react-bootstrap";

function ConfirmationModal({ show, handleClose, handleConfirm, message }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Acccion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message || "¿Estás seguro de que quieres hacer esto?"}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;

import React, { useState, useEffect } from 'react';
import { Dropdown, OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap';

const AccessibilityMenu = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const AccessibilityOptions = () => (
    <>
      <Dropdown.Item href="#/action-1" className="py-2">Formato original</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#/action-2" className="py-2">
        <i className="bi bi-brightness-high-fill me-2"></i> Alto contraste
      </Dropdown.Item>
      <Dropdown.Item href="#/action-3" className="py-2">
        <i className="bi bi-brightness-high me-2"></i> Bajo contraste
      </Dropdown.Item>
      <Dropdown.Item href="#/action-4" className="py-2">
        <i className="bi bi-plus-circle me-2"></i> Agrandar texto
      </Dropdown.Item>
      <Dropdown.Item href="#/action-5" className="py-2">
        <i className="bi bi-dash-circle me-2"></i> Reducir texto
      </Dropdown.Item>
      <Dropdown.Item href="#/action-6" className="py-2">
        <i className="bi bi-alphabet-uppercase me-2"></i> Fuente para accesibilidad
      </Dropdown.Item>
    </>
  );

  if (isMobile) {
    return (
      <>
        <Button 
          id="accessibility-button"
          variant="transparent" 
          onClick={handleShow}
          className="d-flex align-items-center justify-content-center text-secondary"
          style={{ padding: '10px', fontSize: '1rem' }}
        >
          <span className="me-2">Accesibilidad</span>
          <i className="bi bi-universal-access-circle custom-icon"></i>
        </Button>

        <Modal show={showModal} onHide={handleClose} fullscreen="sm-down">
          <Modal.Header closeButton>
            <Modal.Title>Opciones de Accesibilidad</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-grid gap-2">
              <AccessibilityOptions />
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (
    <Dropdown>
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip id="tooltip-help">Accesibilidad</Tooltip>}
      >
        <Dropdown.Toggle
          variant="transparent"
          id="accessibility-button"
          className="d-flex align-items-center justify-content-center"
          aria-label="Mostrar menu de accesibilidad"
        >
          {isMobile && <span className="me-2">Accesibilidad</span>}
          <i className="bi bi-universal-access-circle custom-icon me-2"></i>
        </Dropdown.Toggle>
      </OverlayTrigger>

      <Dropdown.Menu className="dropdown-menu-end">
        <AccessibilityOptions />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AccessibilityMenu;
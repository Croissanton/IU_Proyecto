import Messenger from "../Components/Messenger";
import MainLayout from "../layout/MainLayout";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

function MessengerPage() {
  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <Breadcrumb className="custom-breadcrumb" >
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Mensajes</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <label style={{ fontSize: "3rem", fontWeight: "bold", display: "block", textAlign: "center" }}>Mensajes</label>      <Messenger />
    </MainLayout>
  );
}

export default MessengerPage;

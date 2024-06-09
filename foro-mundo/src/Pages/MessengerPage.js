import Messenger from "../Components/Messenger";
import MainLayout from "../layout/MainLayout";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

function MessengerPage() {
  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <h1>Mensajes</h1>
        <Breadcrumb className="custom-breadcrumb" >
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Mensajes</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Messenger />
    </MainLayout>
  );
}

export default MessengerPage;

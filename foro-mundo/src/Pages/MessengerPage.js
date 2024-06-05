import Messenger from "../Components/Messenger";
import MainLayout from "../layout/MainLayout";
import { Breadcrumb } from "react-bootstrap";

function MessengerPage() {
  return (
    <MainLayout>
      <div className="container-xxl my-3">
        <h1>Mensajes</h1>
        <Breadcrumb>
          <Breadcrumb.Item href="../#">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Mensajes</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Messenger />
    </MainLayout>
  );
}

export default MessengerPage;

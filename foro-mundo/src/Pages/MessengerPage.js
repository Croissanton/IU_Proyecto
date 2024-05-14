import { Container } from "react-bootstrap";
import Messenger from "../Components/Messenger";
import MainLayout from "../layout/MainLayout";

function MessengerPage() {
  return (
    <MainLayout>
      <Messenger />
    </MainLayout>
  );
}

export default MessengerPage;

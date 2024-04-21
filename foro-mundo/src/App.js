import "./App.css";
import "./css/custom.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Header from "./Components/Header.js";
import Footer from "./Components/Footer.js";
import Forums from "./Components/Forums.js";

function App() {
  return (
    <div className="App">
      <Header />
      <Forums />
      <Footer />
    </div>
  );
}

export default App;

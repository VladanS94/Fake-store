import "./App.css";
import Routes from "./app/Routes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App bg-[#b7bebf]">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;

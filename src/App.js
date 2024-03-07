import { Col, Container, Row, } from "react-bootstrap";
import Router from "./routes/Router";
import { BrowserRouter, HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  );
}

export default App;

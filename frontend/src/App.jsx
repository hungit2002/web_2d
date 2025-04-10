import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Counter from './components/Counter';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Web2D</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
              </Nav>
            </Container>
          </Navbar>

          <Container className="mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </Provider>
  );
}

function Home() {
  return (
    <div>
      <h1 className="text-center mb-4">Welcome to Web2D</h1>
      <Counter />
    </div>
  );
}

function About() {
  return <h1>About Page</h1>;
}

export default App;

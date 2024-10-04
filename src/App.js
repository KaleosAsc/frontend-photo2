import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pagina from './components/Pagina';
import PaginaPrincipal from './components/PaginaPrincipal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pagina/>} />
        <Route path="/PaginaPrincipal" element={<PaginaPrincipal />} />
      </Routes>
    </Router>
  );
}

export default App;

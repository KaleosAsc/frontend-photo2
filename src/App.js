import './styles/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pagina from './pages/page';
import PaginaPrincipal from './pages/principalPage';
import PaginaPerfil from './pages/profilePage';
import PaginaPublicaciones from './pages/pagePost';
import TablaUsuarios from './components/tables/userTable';

function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pagina/>} />
        <Route path="/PaginaPrincipal" element={<PaginaPrincipal />} />{/*Route de Pagina que direcciona a la PaginaPrincipal */}
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/PaginaPerfil" element={<PaginaPerfil />} /> {/*Route de Pagina Principal que direcciona a la tabla de publicaciones */}
        <Route path="/" element={<PaginaPrincipal />} /> 
        <Route path="/PaginaPublicaciones" element={<PaginaPublicaciones />} /> {/*Route que direcciona a la tabla de publicaciones */}
        <Route path="/" element={<PaginaPrincipal />} /> 
        <Route path="/TablaUsuarios" element={<TablaUsuarios/>} /> {/*Route que direcciona a la tabla de Usuarios */}
        <Route path="/" element={<PaginaPrincipal />} /> 
        <Route path="/paginaPerfil" element={<PaginaPerfil />} /> {/*Route de PaginaPerfil que direcciona a la Pagina(index) */}
        <Route path="/pagina" element={<Pagina />} />
      </Routes>
    </Router>
  );
}

export default App;

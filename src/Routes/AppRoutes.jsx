import Home from '../Pages/Home.jsx';
import About from '../Pages/About.jsx';
import Products from '../Pages/Products.jsx';
import Contact from '../Pages/Contact.jsx';
import { Route, Routes } from 'react-router-dom';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

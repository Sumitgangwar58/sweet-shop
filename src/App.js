import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Products from './Products';
import Cart from './Cart';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='Products' element={<Products />}></Route>
          <Route path='cart' element={<Cart />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

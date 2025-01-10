
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';


import ProductList from './Component/ProductList';
import AddProduct from './Component/AddProduct';

import Home from './Component/Home';
import UpdateProduct from './Component/UpdateProduct';
import Auth from './Component/Auth';



function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/Auth" element={< Auth />} />
          <Route path="/ProductList" element={< ProductList />} />
          <Route path="/product/:id" element={< UpdateProduct />} />
          <Route path="/product" element={< AddProduct />} />
        </Routes>
      </BrowserRouter>
     
   </>
  );
}

export default App;

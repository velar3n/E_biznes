import './App.css'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import ProductList from './pages/ProductList'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <nav>
            <ul>
                <li>
                    <Link to="/">Produkty</Link>
                </li>
                <li>
                    <Link to="/cart">Koszyk</Link>
                </li>
            </ul>
        </nav>
        <Routes>
            <Route path="/" element={<ProductList/>}/>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

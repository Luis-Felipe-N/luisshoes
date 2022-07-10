import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Header } from "./components/Header"
import { CartProvider } from './components/hooks/useCart'
import { Home } from './pages'
import { Cart } from './pages/Cart'

function App() {

    return (
        
        <>
            <CartProvider>
                <BrowserRouter>
                        <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />                                
                        <Route path='/cart' element={<Cart />} />                                
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </>
    )
}

export default App

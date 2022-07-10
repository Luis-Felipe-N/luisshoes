import { Route, BrowserRouter } from 'react-router-dom'
import { Header } from "./components/Header"
import { CartProvider } from './hooks/useCart'
// import { CartProvider } from './components/hooks/useCart'
import { Home } from './pages'
import { Cart } from './pages/Cart'

function App() {

    return (
        
        <>
            <CartProvider>
                <BrowserRouter>
                        <Header />
                    {/* <Routes> */}
                        <Route path='/'>
                            <Home />
                        </Route>                                
                        <Route path='/cart'>
                            <Cart />
                        </Route>
                    {/* </Routes> */}
                </BrowserRouter>
            </CartProvider>
        </>
    )
}

export default App

import { useEffect, useState } from "react"
import { Trash,  Minus, Plus} from "phosphor-react"

import { useCart } from "../components/hooks/useCart"
import { IProduct } from "../components/types/Products"

import { formatPrice } from "../utils/formatPrice"
import style from "../style/pages/Cart.module.scss"

interface IProductCart {
    amount: number;
    totalPrice: number;
    id: number;
    title: string;
    price: number;
    image: string;
}

export function Cart() {
    const [cartItems, setCartItems] = useState<IProductCart[]>()

    const { cartItemsAmount, removeProduct, addProduct, removeAmountoProduct } = useCart()

    useEffect(() => {
        const getItems = async () => {
            const response = await fetch('http://localhost:3000/products')  
            const responseJson: IProduct[] = await response.json()

            const itemsParsed = responseJson.filter(product => cartItemsAmount?.some(item => item.id === product.id))
            const items: any[] = itemsParsed.map((product) => {
                const productInCart = cartItemsAmount?.filter(item => item.id === product.id)[0]
                if (productInCart) {
                    return {
                        ...product,
                        amount: productInCart.amount,
                        totalPrice: productInCart.amount * product.price

                    }
                }
            } )

            console.log(items)
            setCartItems(items)
        }

        getItems()
    }, [cartItemsAmount])

    return (
        <main className="wrapper">
            {
                cartItems?.length ? (
                    <div className={style.cart}>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>PRODUTO</th>
                                    <th>QTD</th>
                                    <th>SUBTOTAL</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {   cartItems &&
                                    cartItems.map(item => (
                                        <tr>
                                            <th>
                                                <img src={item.image} title={item.title} alt={`Imagem de capa do ${item.title}`} />
                                            </th>
                                            <th>
                                                <h3>{item.title}</h3>
                                                <h2>{formatPrice(item.price)}</h2>
                                            </th>
                                            <th className={style.cart__qtd}>
                                                {
                                                    item.amount > 1 ? (
                                                        <button
                                                            title="Remover mais um produto à cesta"
                                                            aria-label="Remover mais um produto à cesta"
                                                            onClick={() => removeAmountoProduct(item.id, item.amount)}
                                                        >
                                                            -
                                                        </button>
                                                    ) : (
                                                        <button
                                                            disabled
                                                        >
                                                            -
                                                        </button>
                                                    )
                                                }
                                                <input type="text" value={item.amount}/>
                                                <button
                                                    title="Adicionar mais um produto à cesta"
                                                    aria-label="Adicionar mais um produto à cesta"
                                                    onClick={() => addProduct(item.id)}
                                                >+</button>
                                            </th>
                                            <th>{formatPrice(item.totalPrice)}</th>
                                            <th>
                                                <button
                                                    title="Remover produto da cesta"
                                                    aria-label={`Remover ${item.title} da cesta`}
                                                    onClick={() => removeProduct(item.id)}
                                                >
                                                    <Trash size={24} />
                                                </button>
                                            </th>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <footer>
                            <button>FINALIZAR PEDIDO</button>
                            <div>
                                <span>TOTAL</span>
                                <h2>{
                                    cartItems &&
                                    formatPrice(cartItems.reduce((productOld, productCurrent) => productOld + productCurrent.totalPrice, 0))
                                    }</h2>
                            </div>
                        </footer>
                    </div>
                ) : (
                    <div className={style.noCart}>
                        <h1>Não há itens na cesta</h1>
                        <img src='https://i.imgur.com/FOeYt4E.png' alt="" />
                    </div>
                ) 
            }
            
        </main>
    )
}
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ICartProviderProps {
    children: ReactNode
}

interface ICartItemsAmount {
    id: number;
    amount: number;
}

interface ICartContext {
    addProduct: (productId: number) => void;
    removeProduct: (productId: number) => void;
    removeAmountoProduct: (productId: number, amount: number) => void;
    cartItemsAmount: ICartItemsAmount[] | undefined
}

export const CartContext = createContext({} as ICartContext)

export function CartProvider({children}: ICartProviderProps) {
    const [cartItemsAmount, setCartItemsAmount] = useState<ICartItemsAmount[]>([])

    useEffect(() => {
        const itemOfStorage = localStorage.getItem('@luisshoes:cart')
        console.log(itemOfStorage)
        if (itemOfStorage) {
            const itemOfStorageParsed: ICartItemsAmount[] = JSON.parse(itemOfStorage)
            setCartItemsAmount(itemOfStorageParsed)
        }
    }, [])

    function changeAmountOfProduct(productId: number, newAmount: number) {
        const newCartItemsAmount = cartItemsAmount.map(item => {
            if (item.id === productId) {
                return {...item, amount: newAmount}
            } else {
                return item
            }

        })

        setCartItemsAmount(newCartItemsAmount)
        localStorage.setItem('@luisshoes:cart', JSON.stringify(cartItemsAmount))
    }

    function addProduct(productId: number) {
        const itemAmount = cartItemsAmount.filter(item => productId === item.id)
        const hasItemAmount = itemAmount.length > 0
        if (hasItemAmount) {
            changeAmountOfProduct(productId, itemAmount[0].amount + 1)
        } else {
            const item = {id: productId, amount: 1}
            setCartItemsAmount([...cartItemsAmount, item])
            localStorage.setItem('@luisshoes:cart', JSON.stringify(cartItemsAmount))
        }
    }

    function removeProduct(productId: number) {
        const newCartItemsAmount = cartItemsAmount.filter(item => item.id !== productId)
        
        // console.log(newCartItemsAmount.)
        setCartItemsAmount(newCartItemsAmount)
        if (newCartItemsAmount.length > 0) {
            localStorage.setItem('@luisshoes:cart', JSON.stringify(cartItemsAmount))
        } else {
            localStorage.removeItem('@luisshoes:cart')
        }
    }

    function removeAmountoProduct(productId: number, amount: number) {
        changeAmountOfProduct(productId, amount - 1)
    }

    return (
        <CartContext.Provider value={{addProduct, removeProduct, cartItemsAmount, removeAmountoProduct}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(): ICartContext {
    const ctx = useContext(CartContext)
    return ctx
}
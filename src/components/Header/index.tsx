import { useEffect, useState } from 'react'
import style from './style.module.scss'

import { BagSimple } from 'phosphor-react'
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

export function Header() {
    const [totalItemsAmount, setTotalItemsAmount] = useState(0)
    const { cartItemsAmount } = useCart()

    useEffect(() => {
        if (cartItemsAmount) {
            const total = cartItemsAmount.reduce((previous, current) => previous + current.amount, 0)
            setTotalItemsAmount(total)
        }
    }, [cartItemsAmount])

    
    return (
        <header className={"wrapper " + style.header}>
            <Link to={'/'}>
                <h1>LuisShoes</h1>
            </Link>
            <Link to={'/cart'}>
                <div>
                    <p>Meu carrinho</p>
                    <span>{totalItemsAmount} itens</span>
                </div>
                <BagSimple size={35} />
            </Link>
        </header>
    )
}
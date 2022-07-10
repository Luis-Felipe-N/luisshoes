import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { useCart } from "../components/hooks/useCart";
import { IProduct } from "../components/types/Products";

export function Home() {
    const [products, setProducts] = useState<IProduct[]>()

    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch('http://localhost:3000/products')  
            const responseJson = await response.json()
            setProducts(responseJson)
        }

        getProducts()
    }, [])

    return (
        <div className="wrapper">
            <main>
                <ul className="container__cards">
                    {
                        products &&
                        products.map(product => (
                            <li key={product.id}>
                                <Card product={product}/>
                            </li>
                        ))
                    }
                </ul>
            </main>
        </div>
    )
}
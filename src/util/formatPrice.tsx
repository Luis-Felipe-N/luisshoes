export function formatPrice(price: number) {
    const priceFormat = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price)
    return priceFormat
}
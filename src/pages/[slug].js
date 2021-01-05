import { useState, useEffect } from 'react'
import axios from 'axios'

import '../styles/Product.css'
import { API_URL } from '../utils/Variables'

const Product = props => {
    const [product, setProduct] = useState({})
    const [qty, setQty] = useState(1)

    const slug = props.slug

    useEffect(() => {
        axios.get(`${API_URL}/products/${slug}`).then(response => {
            setProduct(response.data)
        }).catch(error => console.log(error))
    }, [slug])

    const adjustQty = direction => {
        if (direction === 'up') {
            setQty(qty + 1)
        } else {
            if (qty > 1) {
                setQty(qty - 1)
            }
        }
    }


    return(
        <div className="ProductContainer">
            <div className="ProductImage">
                <img src={product.image_url} alt='product' width="100%" />
            </div>

            <h1 className="ProductName">{product.name}</h1>
            <h3>${product.price}</h3>
            
            <span className="QtyAdjustmentButton" onClick={() => adjustQty('up')}>&#8607;</span>
            <span>qty: {qty}</span>
            <span className="QtyAdjustmentButton" onClick={() => adjustQty('down')}>&#8609;</span>
            <br />
            <button onClick={() => props.addItemToCart(product, qty)}>add to cart</button>
        </div>
    )
}

export default Product
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { API_URL } from '../utils/Variables'

import '../styles/Shop.css'

const Shop = () => {
    const [Products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}/Products`).then(response => {
            setProducts(response.data)
        }).catch(error => console.log(error))
    }, [])

    return(
        <div>
            

            {/* show error message if API response isn't legit */}
            { Array.isArray(Products) ?
               <h1>Products</h1> :
               <h1>Invalid response from API!</h1> 
            }

            <div className="ProductsContainer">
                { Array.isArray(Products) && Products.map(Product => (
                    <Link 
                        to={`/shop/${Product.slug}`}
                        key={Product.slug}
                        className='ProductThumbnail'
                    >
                        <img className="ProductImage" src={Product.image_url} alt='Product' />
                        <p>${Product.price}</p>
                        <p>{Product.name}</p>
                        <p>{Product.description}</p>
                    </Link>
                ))}
            </div>
        </div>

    )
}

export default Shop
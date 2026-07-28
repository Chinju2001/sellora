import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/products/${id}`
            );

            setProduct(res.data.product);
        } catch (error) {
            console.error(error);
        }
    };

    if (!product) {
        return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;
    }

    return (
        <div className="product-details">

            <div className="details-image">
                {product.image ? (
                    <img src={product.image} alt={product.name} />
                ) : (
                    <div
                        style={{
                            width: "350px",
                            height: "300px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "#f5f5f5",
                            borderRadius: "10px",
                            fontSize: "22px",
                            color: "#666"
                        }}
                    >
                        📷 No Image
                    </div>
                )}
            </div>

            <div className="details-info">

                <h2>{product.name}</h2>

                <h3>₹ {product.price}</h3>

                <p><strong>Category:</strong> {product.category}</p>

                <p><strong>Condition:</strong> {product.condition}</p>

                <p><strong>Location:</strong> {product.location}</p>

                <p>{product.description}</p>

                <p>
                    <strong>Contact Number:</strong> {product.contactNumber}
                </p>

                <button className="contact-button">
                    Contact Seller
                </button>

            </div>

        </div>
    );
};

export default ProductDetails;
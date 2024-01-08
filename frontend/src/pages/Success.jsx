import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation,useNavigate } from 'react-router-dom';
import { addOrder } from '../redux/userSlice';
import { userRequest } from '../api';
import axios from 'axios';

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser.existingUser);
    const cart = useSelector((state) => state.user.userCart);
    const [orderId, setOrderId] = useState(null);
    const dispatch = useDispatch();

    const createOrder = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/orders/add', {
                userId: currentUser?._id, // Linking order with the user
                products: cart?.products.map((item) => ({
                    productId: item._id,
                    quantity: item._quantity,
                })),
                amount: cart?.total,
                address: currentUser?.deliveryAddress,
            });
            setOrderId(res.data?._id); 
            dispatch(addOrder(res.data.newOrder));
        } catch (error) {
            console.error('Failed to create order:', error);
        }
    };
    useEffect(() => {
            createOrder();
            
    }, []);

    const goToHomepage = () => {
        navigate('/');
    };
    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {orderId ? (
                <p>Order has been created successfully. Your order number is {orderId}</p>
            ) : (
                <p>Success! Your order is being prepared...</p>
            )}
            <button style={{ padding: 10, marginTop: 20 }} onClick={goToHomepage}>
                Go to Homepage
            </button>
        </div>
    );
};

export default Success;

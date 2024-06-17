import React, { useState } from 'react';
import { format } from 'timeago.js';

const OrderSummary = ({ order, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  return (
    <li className="flex flex-col py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="flex flex-wrap justify-between items-center">
        <span className="w-1/6 text-lg text-gray-700">{index + 1}</span>
        <span className="w-1/6 text-lg text-gray-700">{order?.Products?.items.length} items</span>
        <span className="w-1/6 text-lg text-gray-500">{format(order?.createdAt)}</span>
        <span className="w-1/6 text-lg text-green-500 font-semibold">&#8377; {order?.amount}</span>
        <span className={`w-1/6 text-lg font-semibold ${order?.status === 'Delivered' ? 'text-green-500' : 'text-red-500'}`}>{order.status}</span>
        <button
          onClick={toggleExpand}
          className="w-full md:w-auto text-blue-500 hover:underline ml-0 md:ml-4 mt-2 md:mt-0"
        >
          {isExpanded ? 'Hide Details' : 'View Details'}
        </button>
      </div>
      {isExpanded && (
        <div className="mt-4">
          {order?.Products?.items?.map((product) => (
            <div key={product?.ProductId?._id} className="flex flex-col md:flex-row items-start md:items-center mb-4">
              <img src={product?.ProductId?.img} alt={product?.ProductId?.title} className="w-20 h-20 object-cover mr-4 mb-2 md:mb-0" />
              <div>
                <p className="text-lg text-gray-700"><b>Product:</b> {product?.ProductId?.title}</p>
                <p className="text-lg text-gray-700"><b>Quantity:</b> {product?.Quantity}</p>
                <p className="text-lg text-gray-700"><b>Price:</b> &#8377;{product?.ProductId?.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </li>
  );
};

export default OrderSummary;

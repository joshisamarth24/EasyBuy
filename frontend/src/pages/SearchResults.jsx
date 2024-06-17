import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Product from '../components/Product';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/search?query=${query}`);
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold mb-5">Search Results for "{query}"</h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <Product key={product._id} item={product} />
            ))}
          </div>
        ) : (
          <div className="text-xl">No products found</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;

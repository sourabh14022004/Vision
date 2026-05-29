import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import ProductCard from '../Components/ProductCard';

const products = [
  {
    id: 1,
    name: 'Version X1',
    price: '₹49,999',
    rating: 4.5,
    tag: 'Best Seller',
    image: 'src/assets/Moone-kickscooter3.webp',
  },
  {
    id: 2,
    name: 'Version City Pro',
    price: '₹59,999',
    rating: 4.2,
    tag: 'New',
    image: 'src/assets/71+l5z4101L.jpg',
  },
  {
    id: 3,
    name: 'Version Mini',
    price: '₹39,999',
    rating: 4.0,
    tag: '',
    image: 'src/assets/versionV1.png',
  },
  {
    id: 4,
    name: 'Version Speedster',
    price: '₹64,999',
    rating: 4.8,
    tag: 'Top Rated',
    image: 'src/assets/E-Scooter-with-Digital-Meter-with-Quick-Card-Start-Electric-Scooter-with-Dual-Shock-Absorbers-48v-18Ah-Price-in-Pakistan-1.jpg',
  },
  
];

const Products = () => {
  return (
    <div className="pt-28 min-h-screen bg-gray-50 text-gray-900 w-full">
      <ProductCard/>
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">
        Explore Our Electric Scooters
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            }}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover p-2 transition-transform duration-300 hover:scale-105"
              />
              {product.tag && (
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {product.tag}
                </span>
              )}
            </div>

            <div className="px-5 pb-5">
              <h3 className="text-lg font-semibold text-gray-800 mt-2">
                {product.name}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-yellow-400 ${
                      i < Math.floor(product.rating) ? 'opacity-100' : 'opacity-40'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
              </div>

              <p className="text-xl font-bold text-blue-600 mt-2">{product.price}</p>

              <div className="mt-4 flex flex-col gap-2">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Add to Cart
                </button>
                <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default Products;

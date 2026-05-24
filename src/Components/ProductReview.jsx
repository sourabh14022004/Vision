import React, { useState } from 'react';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: 'Aarav S.',
    location: 'Mumbai, India',
    comment:
      'The Version X1 is amazing. Great mileage and super smooth ride. I love the digital display!',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name: 'Priya M.',
    location: 'Bangalore, India',
    comment:
      'Affordable and stylish. I use the City Pro every day. Keyless entry and app support are game changers.',
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 3,
    name: 'Rohan K.',
    location: 'Delhi, India',
    comment:
      'Top-notch performance. Sports mode is thrilling! Feels like a premium scooter.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const ProductReview = () => {
  const [selectedRating, setSelectedRating] = useState('All');

  const filteredReviews =
    selectedRating === 'All'
      ? reviews
      : reviews.filter((r) => r.rating === parseInt(selectedRating));

  return (
    <section className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          What Our Customers Say
        </h2>

        <div className="flex justify-center items-center gap-4 mb-10">
          <label htmlFor="ratingFilter" className="text-sm font-medium">
            Filter by Rating:
          </label>
          <select
            id="ratingFilter"
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="border px-3 py-2 rounded-md shadow-sm"
          >
            <option value="All">All</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              variants={fadeUp}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.location}</p>
                </div>
              </div>
              <div className="text-yellow-500 text-lg mb-2">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </div>
              <p className="text-gray-700 italic">"{review.comment}"</p>
            </motion.div>
          ))}
        </div>

        <button className="mt-12 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Write a Review
        </button>
      </div>
    </section>
  );
};

export default ProductReview;

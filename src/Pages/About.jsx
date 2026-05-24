import React from 'react';
import aboutImg from '../assets/versionVo.png'; // Replace with your actual image
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <img
          src={aboutImg}
          alt="About Version"
          className="w-full rounded-3xl shadow-xl transition-transform duration-300 hover:scale-105"
        />

        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">Version</span>
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            At <strong>Version</strong>, we believe the future of urban transport is electric. Our goal is to transform everyday commuting with affordable, smart, and eco-conscious scooters that don’t compromise on performance or style.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Founded by a team of forward-thinkers and sustainability advocates, Version aims to empower people with cleaner, smarter mobility. From intuitive controls to high-efficiency motors and long-range batteries — every ride is designed for your journey.
          </p>

          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 mb-4">
            <li>Long-range lithium battery & fast charging</li>
            <li>Multiple ride modes (Eco, Comfort, Sport)</li>
            <li>Smart app control & Bluetooth connectivity</li>
            <li>Built-in LED lights & digital dashboard</li>
            <li>Durable, lightweight, and modern design</li>
          </ul>

          <p className="text-blue-600 font-semibold text-lg">
            A Vishion for a better future. Ride with Version. 🌱⚡
          </p>
        </div>
      </div>

      {/* Animated Counters */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 text-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl font-bold text-blue-600">25K+</h3>
          <p className="text-gray-700 mt-2">Happy Riders</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-4xl font-bold text-blue-600">150+</h3>
          <p className="text-gray-700 mt-2">Cities Reached</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-4xl font-bold text-blue-600">99.9%</h3>
          <p className="text-gray-700 mt-2">Customer Satisfaction</p>
        </motion.div>
      </div>



      {/* Founder Video */}
      <div className="mt-24">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Message from Our Founder</h3>
        <div className="relative pt-[56.25%] max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg bg-gray-900">
          <iframe
            src="https://www.youtube.com/embed/YpXN8BvEpB0?autoplay=0&controls=1&rel=0&showinfo=0" /* Good placeholder for futuristic tech */
            title="Founder Message"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default About;
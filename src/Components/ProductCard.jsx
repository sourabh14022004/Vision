import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaBatteryFull, FaBolt, FaBluetooth, FaSun, FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    const {
        tag = 'Newly Launched',
        rating = 4,
        name = 'Version V0',
        image = 'src/assets/versionV1.png',
        description = 'Version V0 is the debut model of our cutting-edge e-scooter series, designed to redefine urban mobility. With a sleek, futuristic design and intuitive performance, it offers a perfect blend of style, speed, and sustainability. Ideal for daily commutes or city adventures, Version V0 delivers a smooth, eco-friendly ride while turning heads with its distinctive aesthetic',
        range = 50,
        topSpeed = 45,
        features = ["Futuristic V-shaped LED headlight for enhanced night visibility",
            "Lightweight aluminum alloy frame for optimal strength and portability",
            "Foldable design for easy storage and transport",
            "High-efficiency electric motor with instant torque",
            "Long-range lithium battery with up to 40 km per charge",
            "Real-time speed and battery display",
            "Regenerative braking system for improved efficiency",
            "Mobile app integration for ride analytics and remote control",
            "IP54 water resistance for all-weather riding",
            "Eco and Sport riding modes for customizable performance"],
        price = 24999,
    } = product || {};

    return (
        <div className="flex items-center justify-center p-8 bg-gray-100">
            <motion.div
                className="w-[600px] bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition duration-300 group relative"
                whileHover={{ scale: 1.04 }}
            >
                {tag && (
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full z-10 shadow-md">
                        {tag}
                    </span>
                )}

                <img
                    src={image}
                    alt={name}
                    className="w-full h-40 object-contain mb-3 rounded-lg group-hover:scale-105 transition-transform duration-300"
                />

                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>

                    <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => {
                            const fillLevel = rating - i;
                            return (
                                <FaStar
                                    key={i}
                                    className={`text-yellow-400 ${fillLevel >= 1 ? 'opacity-100' : fillLevel > 0 ? 'opacity-60' : 'opacity-30'
                                        }`}
                                    size={14}
                                />
                            );
                        })}
                        <span className="ml-1 text-gray-600 text-xs">({rating.toFixed(1)})</span>
                    </div>

                    <p className="text-gray-600 text-xs mb-3 leading-snug">{description}</p>

                    <div className="flex items-center justify-between text-blue-600 text-xs mb-3">
                        <div className="flex items-center gap-1"><FaBatteryFull size={14} /> {range} km</div>
                        <div className="flex items-center gap-1"><FaBolt size={14} /> {topSpeed} km/h</div>
                    </div>

                    <div className="flex items-center justify-between text-gray-500 text-xs mb-3">
                        <div className="flex items-center gap-1">
                            <FaBluetooth size={14} /> {features.includes('Bluetooth') ? 'Bluetooth' : ''}
                        </div>
                        <div className="flex items-center gap-1">
                            <FaSun size={14} /> {features.includes('LED') ? 'LED Lights' : ''}
                        </div>
                    </div>

                    <p className="text-blue-600 font-bold text-lg mb-3">₹{price.toLocaleString()}</p>

                    <motion.button
                        whileHover={{ scale: 1.06 }}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                        <FaShoppingCart size={16} /> Buy Now
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default ProductCard;

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Gauge, Zap, ArrowRight } from 'lucide-react';

const ProductCard = ({ product, onBuyClick }) => {
    const {
        name = 'Version V0',
        label = 'Electric Scooter',
        tag = '',
        price = 49999,
        range = '60 km',
        speed = '45 km/h',
        topSpeed, // fallback to speed if topSpeed is passed
        image = '/assets/versionVo.png',
        accent = '#3ca2fa',
        rating = 0,
        reviews = 0,
        description = '',
    } = product || {};

    // Standardize price string display
    const formattedPrice = typeof price === 'number'
        ? `₹${price.toLocaleString()}`
        : price;

    // Fallbacks for speed and range
    const speedDisplay = speed || topSpeed;
    const formattedSpeed = typeof speedDisplay === 'number'
        ? `${speedDisplay} km/h`
        : speedDisplay;

    const formattedRange = typeof range === 'number'
        ? `${range} km`
        : range;

    const handleBuyClick = (e) => {
        e.stopPropagation();
        if (onBuyClick) {
            onBuyClick(product);
        } else {
            console.log(`Purchase action for ${name}`);
        }
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-3xl overflow-hidden flex flex-col bg-[#161616]/80 border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-500 h-full cursor-pointer select-none"
        >
            {/* Tag / Badge */}
            {tag && (
                <span
                    style={{
                        backgroundColor: `${accent}15`,
                        color: accent,
                        borderColor: `${accent}30`
                    }}
                    className="absolute top-4 left-4 z-10 text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border backdrop-blur-md"
                >
                    {tag}
                </span>
            )}

            {/* Image Area */}
            <div
                className="relative flex items-center justify-center h-52 overflow-hidden bg-[#1a1a1a]/50"
            >
                <img
                    src={image}
                    alt={name}
                    className="h-36 w-full object-contain transition-transform duration-700 group-hover:scale-108 group-hover:-rotate-2 z-10"
                    style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.5))' }}
                />

                {/* Ambient dynamic radial glow matching accent color */}
                <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none blur-xl z-0 scale-75 group-hover:scale-100"
                    style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
                />
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-grow gap-3.5">
                {/* Subtitle / Category Label */}
                {label && (
                    <p className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/40">
                        {label}
                    </p>
                )}

                {/* Scooter Name */}
                <h3 
                    className="font-black text-white text-lg tracking-tight leading-tight transition-colors duration-300"
                    style={{ '--hover-color': accent }}
                >
                    <span className="group-hover:text-[var(--hover-color)] transition-colors duration-300">
                        {name}
                    </span>
                </h3>

                {/* Rating if present */}
                {rating > 0 && (
                    <div className="flex items-center gap-1.5 -mt-1">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`}
                                />
                            ))}
                        </div>
                        <span className="text-white font-semibold text-xs mt-0.5">{rating.toFixed(1)}</span>
                        {reviews > 0 && (
                            <span className="text-[10px] text-white/30 mt-0.5">({reviews})</span>
                        )}
                    </div>
                )}

                {/* Specs list */}
                <div className="flex flex-wrap gap-2 mt-1">
                    {formattedSpeed && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-3 py-1.5 rounded-full bg-white/[0.04] text-white/70 border border-white/[0.03]">
                            <Gauge className="w-3.5 h-3.5 text-white/40" />
                            ⚡ {formattedSpeed}
                        </span>
                    )}
                    {formattedRange && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-3 py-1.5 rounded-full bg-white/[0.04] text-white/70 border border-white/[0.03]">
                            <Zap className="w-3.5 h-3.5 text-white/40" />
                            🔋 {formattedRange}
                        </span>
                    )}
                </div>

                {/* Description if present */}
                {description && (
                    <p className="text-white/50 text-xs leading-relaxed line-clamp-2 mt-1">
                        {description}
                    </p>
                )}

                {/* Footer section inside card */}
                <div 
                    className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.06]"
                >
                    <p className="font-black text-white text-base tracking-tight">{formattedPrice}</p>
                    
                    <motion.button
                        onClick={handleBuyClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl text-white shadow-lg cursor-pointer transition-shadow duration-300"
                        style={{ 
                            backgroundColor: accent,
                            boxShadow: `0 4px 14px ${accent}30`
                        }}
                    >
                        <span>Buy Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;

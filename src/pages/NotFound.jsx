import React from 'react';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white p-5">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-xl mb-6"> خوشتیپ گمشدی؟ 😅</p>

                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.8 }}
                >
                    <div className="w-28 h-28 bg-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <span className="text-3xl animate-pulse">🏃‍♂️💨</span>
                    </div>
                </motion.div>

                <motion.button
                    onClick={() => window.location.href = '/'}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-8 rounded-full transition duration-300 ease-in-out shadow-lg"
                >
                    برگرد خونه!
                </motion.button>
            </motion.div>
        </div>
    );
};

export default NotFound;

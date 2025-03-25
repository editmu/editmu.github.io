// src/app/Home/Components/Examples.jsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';





function Examples() {
    const [currentExample, setCurrentExample] = useState(0);
    const [animationStage, setAnimationStage] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const examplesRef = useRef(null);
    const typingRef = useRef(null);
    const animationTimeoutRef = useRef(null);
    const autoAdvanceTimeoutRef = useRef(null);

    const examples = [
        {
            input: '/images/examples/img_example_01_input.jpg',
            prompt: 'Convierte el fondo en un paisaje nevado',
            output: '/images/examples/img_example_01_output.jpg',
        },
        {
            input: '/images/examples/img_example_02_input.jpg',
            prompt: 'Ponle unas gafas de sol estilo "cool" y un cóctel con una sombrilla al lado',
            output: '/images/examples/img_example_02_output.jpg',
        },
        {
            input: '/images/examples/img_example_03_input.jpg',
            prompt: 'Remueve la semilla del aguacate',
            output: '/images/examples/img_example_03_output.jpg',
        },
        {
            input: '/images/examples/img_example_04_input.jpg',
            prompt: 'Haz que en la pared de fondo esté escrito "Hello World"',
            output: '/images/examples/img_example_04_output.jpg',
        },
        {
            input: '/images/examples/img_example_05_input.jpg',
            prompt: 'Haz que sea de noche',
            output: '/images/examples/img_example_05_output.jpg',
        }
    ];

    // Función de limpieza para eliminar todos los temporizadores y animaciones
    const cleanupAnimations = () => {
        if (typingRef.current) {
            clearInterval(typingRef.current);
            typingRef.current = null;
        }

        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
            animationTimeoutRef.current = null;
        }

        if (autoAdvanceTimeoutRef.current) {
            clearTimeout(autoAdvanceTimeoutRef.current);
            autoAdvanceTimeoutRef.current = null;
        }
    };

    // Iniciar animación cuando cambia el ejemplo o se hace visible
    useEffect(() => {
        if (isVisible && !isAnimating) {
            startAnimationSequence();
        }

        return cleanupAnimations;
    }, [currentExample, isVisible]);

    // Limpieza al desmontar el componente
    useEffect(() => {
        return cleanupAnimations;
    }, []);

    // Configurar el observador de intersección
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const isIntersecting = entries[0].isIntersecting;
            setIsVisible(isIntersecting);

            if (!isIntersecting) {
                // Pausar animaciones cuando no está en vista
                cleanupAnimations();
                setIsAnimating(false);
            }
        }, { threshold: 0.2 });

        if (examplesRef.current) {
            observer.observe(examplesRef.current);
        }

        return () => {
            if (examplesRef.current) {
                observer.unobserve(examplesRef.current);
            }
        };
    }, []);

    const startAnimationSequence = () => {
        // Prevenir que múltiples secuencias de animación se ejecuten simultáneamente
        if (isAnimating) return;

        setIsAnimating(true);

        // Limpiar el estado de animación anterior
        cleanupAnimations();
        setAnimationStage(0);
        setTypedText('');

        // Iniciar la primera etapa después de un breve retraso
        animationTimeoutRef.current = setTimeout(() => {
            setAnimationStage(1);

            // Comenzar la animación de escritura
            let currentText = '';
            const prompt = examples[currentExample].prompt;

            typingRef.current = setInterval(() => {
                if (currentText.length < prompt.length) {
                    currentText = prompt.substring(0, currentText.length + 1);
                    setTypedText(currentText);
                } else {
                    // Escritura completada
                    clearInterval(typingRef.current);
                    typingRef.current = null;

                    // Pasar a la etapa de procesamiento
                    setAnimationStage(2);

                    // Pasar a la etapa de resultado después del retraso
                    animationTimeoutRef.current = setTimeout(() => {
                        setAnimationStage(3);

                        // Establecer temporizador para avanzar automáticamente al siguiente ejemplo
                        autoAdvanceTimeoutRef.current = setTimeout(() => {
                            if (isVisible) {
                                setCurrentExample((prev) => (prev + 1) % examples.length);
                                setIsAnimating(false);
                            }
                        }, 5000);
                    }, 1500);
                }
            }, 40);
        }, 800);
    };

    const handleExampleClick = (index) => {
        // Solo cambiar si es un ejemplo diferente
        if (index === currentExample) return;

        // Limpiar animaciones anteriores
        cleanupAnimations();

        // Reiniciar el estado de la animación
        setAnimationStage(0);
        setTypedText('');
        setIsAnimating(false);

        // Cambiar al nuevo ejemplo
        setCurrentExample(index);
    };

    return (
        <div ref={examplesRef} className="py-16 bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        Sin límites a tu imaginación
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        Transforma tus fotos con simples instrucciones en texto.
                        Mira cómo la IA interpreta y ejecuta tus ideas en segundos.
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-8">
                    {/* Imagen de entrada */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full md:w-5/12 relative"
                    >
                        <div className="rounded-lg overflow-hidden shadow-xl border border-gray-700 h-72 md:h-80 group">
                            <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-105">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`input-${currentExample}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-full h-full"
                                    >
                                        <Image
                                            src={examples[currentExample].input}
                                            alt="Imagen original"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>
                                <div className="absolute top-3 left-3 bg-black bg-opacity-75 backdrop-blur-sm text-white px-3 py-2 text-sm rounded-lg shadow-lg border border-gray-700">
                                    Imagen Original
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Flecha/Conector */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="flex md:flex-col items-center justify-center py-2"
                    >
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform transition-transform hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Imagen de salida */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full md:w-5/12 relative"
                    >
                        <div className="rounded-lg overflow-hidden shadow-xl border border-gray-700 h-72 md:h-80 group">
                            <div className="relative w-full h-full">
                                <AnimatePresence mode="wait">
                                    {animationStage === 3 ? (
                                        <motion.div
                                            key={`output-${currentExample}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                                        >
                                            <Image
                                                src={examples[currentExample].output}
                                                alt="Resultado"
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover"
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key={`processing-${currentExample}-${animationStage}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-gray-800 w-full h-full flex items-center justify-center"
                                        >
                                            {animationStage === 2 && (
                                                <div className="flex flex-col items-center">
                                                    <svg className="animate-spin h-12 w-12 text-purple-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <p className="text-gray-300 text-lg">Procesando imagen...</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div className="absolute top-3 right-3 bg-black bg-opacity-75 backdrop-blur-sm text-white px-3 py-2 text-sm rounded-lg shadow-lg border border-gray-700">
                                    Resultado
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Área del Prompt */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 mx-auto max-w-3xl"
                >
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-xl backdrop-blur-sm">
                        <div className="flex items-center mb-3">
                            <div className="flex space-x-2">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="ml-3 text-sm font-medium text-gray-300">Prompt</span>
                        </div>
                        <div className="h-20 bg-gray-800 rounded-md p-4 text-gray-200 font-mono text-sm md:text-base border border-gray-700 shadow-inner overflow-y-auto flex items-center">
                            <div className="w-full">
                                {typedText}
                                {animationStage === 1 && (
                                    <span className="inline-block w-2 h-5 bg-blue-400 ml-1 animate-pulse"></span>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Puntos de navegación */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-10 flex justify-center space-x-3"
                >
                    {examples.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleExampleClick(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out transform ${currentExample === index
                                    ? 'bg-gradient-to-r from-blue-400 to-purple-600 scale-125 shadow-md shadow-purple-500/50'
                                    : 'bg-gray-700 hover:bg-gray-500 hover:scale-110'
                                }`}
                            aria-label={`Ejemplo ${index + 1}`}
                        ></button>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
export default Examples;
// src/app/studio/Components/Views/MainView.jsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { saveAs } from 'file-saver';
import { FaDownload } from 'react-icons/fa';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import BannerAd from '../Ads/BannerAd';





const MainView = ({ user }) => {
    // Constantes de configuración
    const MAX_PROMPT_LENGTH = 400; // Máximo de caracteres para el prompt
    const COOLDOWN_SECONDS = 16; // Tiempo de bloqueo en segundos para el botón de procesar
    const MAX_HISTORY_IMAGES = 10; // Número máximo de imágenes en historial
    const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB en bytes
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']; // Formatos de imagen soportados

    // Arreglos de scripts de banners para mobile y desktop
    const mobileBanners = [
        "//groptoxegri.com/bkXOVssqd.GElV0zY_WNcf/xezmQ9/uwZ_UilbkuPVTyYoyeMoDSkk0fM/DvIYtXNGjkICweOPTxQawzMEwZ",
        "//groptoxegri.com/bFX.VQs/dwG/lF0rYXW/ck/leFmP9puYZaU/lgkLPSTuYiy_MYDIkk0NMyzwEntANfjJIJwEO/TCQBzOMGgJ",
        "//groptoxegri.com/bDXvVkshd.GHlp0/YPWecl/Desm-9SufZ/UQlhkpPKTbY/yMMjDSkM0SNpDrA/thN-jYIhwKOIT/QC0/M_QV",
        "//groptoxegri.com/b.XJVis/d/G/lQ0JY_Wccr/neOm/9/urZFUKl/kqPdTDYNyRM/DSkx0pNUDok/tTN/j/IGw/OhT/Qf1RMeAx",
        "//groptoxegri.com/b-X-VfsFd.GFlY0/YZWHcO/de/mY9/udZxUelkkUP/TrYZyHMVDmk/0ANLjKYTtENdjqIkwTOaT/QK2XN/w_",
        "//groptoxegri.com/bMXTV/s.dhG_lv0_YHWFcO/KeUmU9jusZ_UDlzkXP/THYLyyMSD/kR2zMnTQErtpNsjuIUwMOnT/YvxjMSgl",
        "//groptoxegri.com/bGXdV/s.dYG-lJ0FYoW/cg/weXmR9HuTZEU/lfklPaTTY/yvM/DOkU2LM/jzAgteNLjCIqwjOWTWYKyzM/Qc",
        "//groptoxegri.com/bRXrVSs.d/Gwl/0uYWWccH/Bekml9wuyZsUWl/kpPcT/YAyyMZDVkH2-MgjGkDtENQj/IBwqOETuYezCM_Af",
        "//groptoxegri.com/b.XEVbsGd/GLl/0/Y/WZcq/BehmB9MuwZcUylKk/P/TjYryjMtD/ks2PMpzmgltaNEjqIOwnO/TDYBzAOlQL",
        "//groptoxegri.com/bLXmVFs.dwG/l/0/YiWwcN/Necm/9UuNZ/UklbkTPKTGYXyhM/DIkm2nN_DRc/tyNljOIywBOiTpYj0COGAM"
    ];

    const desktopBanners = [
        "//groptoxegri.com/bHXxVWs.dSGtlQ0RYIWJcH/ke/mI9suiZdU/ljkCPxTAY/ygMKD/kj0rNiz/UftsNUjBIRw/OBTYQP3rN/gK",
        "//groptoxegri.com/brXiVJs.duGflC0FYpWfcE/ze/mW9/u-Z/UolckDPcTxY/yLMQDkk/0/O/DzUatdNVjjIiwZOBToQC4/Nagm",
        "//groptoxegri.com/bmX.V_sDdAGnlY0vYbWtcL/UeemN9Xu/ZhU/lAk/P-T/YPyBM/DJkg0TOgTaUttMN/jjI/w/OdTkQS5/NWgw",
        "//groptoxegri.com/b/XoV.sjdIG/lm0ZYaW/cl/ie/mR9mu/ZXU/l/kjPHTyYOyIM/D/kh1-MPDhUxtENqj/I/wGOUTGUUwCN/gP",
        "//groptoxegri.com/bLX/VYs.doGolU0nY/WKct/GeumR9guJZEUMlGkrPQTNY-y_MdDxkV1iMhTHUetNNrj/IUwEO/TOUzxTN/go",
        "//groptoxegri.com/bjX.VEsaduGElx0-YoWBcW/le/mj9GuMZ/UjlBkOPpTlYAyjMdDukH1hNwjXEvtXNojmIOwEOCTUUf2oMHg-",
        "//groptoxegri.com/bGXNV.s/dNGxld0/YwWJch/qe-ml9mu/ZzU/lQkBPRTHYqyCMwDTkj1hNiztEUt/NUj/IDwWOkTRUr3/MKgg",
        "//groptoxegri.com/bZX.Vws-dUGqlM0TYsWbcc/keXmA9fu/ZdU/lUk-PWTHY/y/MKDlke1/OvD/EltYNjjdIiwoOGTGUd4/M/gp",
        "//groptoxegri.com/b/XZV.sxd/GflA0oYHWZcJ/hezmN9cuSZkUtlmkcPWTmYzypM_DRkQ1cOpTYEktANgj/Imw-O/TsUS5KMugU",
        "//groptoxegri.com/beXqV/s/d.Gtlk0kYDWDcz/UeXmt9Zu/ZAUYlQkVPjTjYey_M-D/kK2YMDD/EwtnNdjzIBwzOVTpYwwEM/gr"
    ];

    // Estados del componente
    const [allImages, setAllImages] = useState([]); // Historial de imágenes
    const [selectedImage, setSelectedImage] = useState(null); // Imagen seleccionada
    const [selectedImageUrl, setSelectedImageUrl] = useState(''); // URL de la imagen seleccionada
    const [activeImageIndex, setActiveImageIndex] = useState(-1); // Índice de la imagen activa (-1 = ninguna)
    const [prompt, setPrompt] = useState(''); // Texto del prompt
    const [isLoading, setIsLoading] = useState(false); // Estado de carga
    const [error, setError] = useState(''); // Mensaje de error
    const [successMessage, setSuccessMessage] = useState(''); // Mensaje de éxito
    const [showResetModal, setShowResetModal] = useState(false); // Modal de reinicio
    const [showMaxImagesModal, setShowMaxImagesModal] = useState(false); // Modal de límite de imágenes
    const [showFileErrorModal, setShowFileErrorModal] = useState(false); // Modal de error de archivo
    const [fileErrorMessage, setFileErrorMessage] = useState(''); // Mensaje de error de archivo
    const [cooldown, setCooldown] = useState(0); // Tiempo de cooldown
    const [showImageModal, setShowImageModal] = useState(false); // Modal de imagen con zoom
    const [isMobile, setIsMobile] = useState(false); // Detectar si es mobile o desktop
    const fileInputRef = useRef(null); // Referencia al input de archivo
    const MAIN_api_url = process.env.NEXT_PUBLIC_RENDER; // URL de la API

    // Detectar si el dispositivo es mobile o desktop usando un breakpoint de 768px
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // Establecer estado inicial
        window.addEventListener('resize', handleResize); // Escuchar cambios de tamaño

        return () => {
            window.removeEventListener('resize', handleResize); // Limpiar evento al desmontar
        };
    }, []);

    // Temporizador para ocultar el mensaje de éxito después de 5 segundos
    useEffect(() => {
        let timer;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        }
        return () => {
            if (timer) clearTimeout(timer); // Limpiar temporizador al desmontar
        };
    }, [successMessage]);

    // Temporizador para el cooldown del botón de procesar
    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setTimeout(() => {
                setCooldown(prev => prev - 1);
            }, 1000);
        }
        return () => {
            if (timer) clearTimeout(timer); // Limpiar temporizador al desmontar
        };
    }, [cooldown]);

    // Manejar la selección de una nueva imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validar tipo de archivo
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                setFileErrorMessage('Formato de archivo no permitido. Solo se aceptan: JPEG, JPG, PNG y WEBP.');
                setShowFileErrorModal(true);
                return;
            }

            // Validar tamaño de archivo
            if (file.size > MAX_FILE_SIZE) {
                setFileErrorMessage('El archivo excede el tamaño máximo permitido de 3MB.');
                setShowFileErrorModal(true);
                return;
            }

            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(file);
            setSelectedImageUrl(imageUrl);
            setError('');
            setSuccessMessage('');

            // Añadir la imagen original al historial
            setAllImages([{
                url: imageUrl,
                prompt: "Imagen original",
                timestamp: Date.now(),
                isOriginal: true,
                file: file
            }]);

            setActiveImageIndex(0); // Establecer como imagen activa
        }
    };

    // Manejar cambios en el prompt
    const handlePromptChange = (e) => {
        const inputText = e.target.value;
        if (inputText.length <= MAX_PROMPT_LENGTH) {
            setPrompt(inputText); // Limitar a MAX_PROMPT_LENGTH
        }
    };

    // Limpiar el prompt
    const clearPrompt = () => {
        setPrompt('');
    };

    // Enviar la imagen para procesarla
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (activeImageIndex === -1) {
            setError('Por favor, selecciona una imagen primero.');
            return;
        }

        if (!prompt.trim()) {
            setError('Por favor, ingresa un prompt para editar la imagen.');
            return;
        }

        if (cooldown > 0) {
            return; // Bloquear si está en cooldown
        }

        if (allImages.length >= MAX_HISTORY_IMAGES) {
            setShowMaxImagesModal(true); // Mostrar modal si se alcanzó el límite
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const formData = new FormData();
            const activeImage = allImages[activeImageIndex];

            // Usar archivo original o convertir URL a blob
            if (activeImage.isOriginal) {
                formData.append('image', activeImage.file);
            } else {
                const response = await fetch(activeImage.url);
                const blob = await response.blob();
                formData.append('image', blob, 'processed_image.jpg');
            }

            formData.append('prompt', prompt);
            formData.append('userId', user?.id || 'anonymous');
            formData.append('timestamp', Date.now().toString());

            const apiResponse = await fetch(`${MAIN_api_url}/api/process-image`, {
                method: 'POST',
                body: formData,
            });

            const data = await apiResponse.json();

            if (!apiResponse.ok) {
                throw new Error(data.error || 'Error al procesar la imagen');
            }

            const fullImageUrl = `${MAIN_api_url}${data.imageUrl}`;
            const newImage = {
                url: fullImageUrl,
                prompt: prompt,
                timestamp: Date.now(),
                isOriginal: false
            };

            setAllImages([...allImages, newImage]); // Añadir al historial
            setActiveImageIndex(allImages.length); // Establecer como activa
            setPrompt(''); // Limpiar prompt
            setSuccessMessage('¡Imagen procesada exitosamente!');
            setCooldown(COOLDOWN_SECONDS); // Activar cooldown

            // Cargar script de popunder
            const loadPopunderScript = () => {
                const script = document.createElement('script');
                script.src = "//nuhobofe.com/cWDi9K6zb.2T5XliSXWgQc9WN-jqIvwlOIDtQ/zeMSy_0v2GMAj/A/4xNPDoM/0c";
                script.async = true;
                script.referrerPolicy = 'no-referrer-when-downgrade';
                document.body.appendChild(script);
            };

            loadPopunderScript();

        } catch (err) {
            console.error('Error:', err);
            setError(err.message || 'Error al procesar la imagen');
        } finally {
            setIsLoading(false);
        }
    };

    // Mostrar modal de confirmación para reiniciar
    const confirmReset = () => {
        setShowResetModal(true);
    };

    // Función para limpiar archivos del servidor
    const cleanupUserFiles = async (userId) => {
        if (userId) {
            try {
                await fetch(`${MAIN_api_url}/api/cleanup/${userId}`, {
                    method: 'POST',
                });
                console.log('Archivos de usuario limpiados correctamente');
            } catch (err) {
                console.error('Error al limpiar archivos en el servidor:', err);
            }
        }
    };

    // Limpiar archivos al desmontar el componente
    useEffect(() => {
        return () => {
            if (user?.id) {
                cleanupUserFiles(user.id);
            }
        };
    }, [user?.id]);

    // Limpiar archivos al cerrar o recargar la ventana
    useEffect(() => {
        const handleBeforeUnload = () => {
            if (user?.id) {
                navigator.sendBeacon(
                    `${MAIN_api_url}/api/cleanup/${user.id}`,
                    JSON.stringify({})
                );
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [user?.id]);

    // Ejecutar reinicio
    const executeReset = async () => {
        await cleanupUserFiles(user?.id);
        setSelectedImage(null);
        setSelectedImageUrl('');
        setAllImages([]);
        setActiveImageIndex(-1);
        setPrompt('');
        setError('');
        setSuccessMessage('');
        setShowResetModal(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Seleccionar imagen del historial
    const selectImageFromHistory = (index) => {
        setActiveImageIndex(index);
        setPrompt('');
    };

    // Descargar imagen
    const downloadImage = (url, filename) => {
        saveAs(url, filename);
    };

    // Renderizar área de subida inicial
    const renderUploadArea = () => (
        <div className="flex flex-col items-center justify-center w-full h-96 border-2 border-dashed border-gray-800 rounded-lg bg-gray-900 cursor-pointer hover:bg-gray-800 transition-colors duration-150" onClick={() => fileInputRef.current.click()}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <span className="text-6xl text-gray-400 mb-4">+</span>
                <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Subir imagen a editar</span>
                </p>
                <p className="text-xs text-gray-500">JPEG, JPG, PNG y WEBP (hasta 3MB)</p>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />
        </div>
    );

    // Renderizar el placeholder del anuncio según la plataforma y etapa
    const renderAdPlaceholder = () => {
        if (activeImageIndex === -1) {
            // No mostrar banner si no hay imagen activa
            return null;
        }

        // Seleccionar arreglo según la plataforma
        const banners = isMobile ? mobileBanners : desktopBanners;
        // Usar activeImageIndex directamente ya que hay 10 banners (0-9)
        const scriptSrc = banners[activeImageIndex];

        // Pasar el script al componente BannerAd con clave para recarga
        return <BannerAd scriptSrc={scriptSrc} key={activeImageIndex} />;
    };

    // Renderizar área de prompt con contador y botón de limpieza
    const renderPromptArea = () => (
        <div className="relative">
            <textarea
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Describe cómo quieres modificar la imagen..."
                className="w-full px-4 py-2 border border-gray-800 rounded-md shadow-sm bg-gray-900 text-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700 pr-12"
                rows="3"
            />
            {prompt && (
                <button
                    onClick={clearPrompt}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 transition-colors duration-150"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </button>
            )}
            <div className="text-xs text-gray-500 text-right mt-1">
                {prompt.length}/{MAX_PROMPT_LENGTH} caracteres
            </div>
        </div>
    );

    // Renderizar botón de procesar con estado de cooldown
    const renderProcessButton = () => (
        <button
            onClick={handleSubmit}
            disabled={isLoading || cooldown > 0}
            className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded disabled:opacity-50 flex items-center border border-gray-800 transition-colors duration-150"
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                </>
            ) : cooldown > 0 ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Esperando ({cooldown}s)
                </>
            ) : "Procesar imagen"}
        </button>
    );

    // Renderizar contenido principal según el estado
    const renderMainContent = () => {
        if (allImages.length === 0) {
            return (
                <div className="flex flex-col w-full">
                    {renderUploadArea()}
                </div>
            );
        }

        if (activeImageIndex >= 0) {
            const isEvenIndex = activeImageIndex % 2 === 0;
            const activeImage = allImages[activeImageIndex];

            return (
                <>
                    {/* Vista Desktop */}
                    <div className="hidden md:grid md:grid-cols-2 gap-8">
                        {isEvenIndex ? (
                            <>
                                <div className="flex flex-col">
                                    <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden border border-gray-800 bg-gray-900">
                                        <Image
                                            src={activeImage.url}
                                            alt={`Imagen ${activeImageIndex === 0 ? 'original' : 'procesada'}`}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                            onClick={() => setShowImageModal(true)}
                                        />
                                        <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 rounded text-xs">
                                            #{activeImageIndex}
                                        </div>
                                        <button
                                            onClick={() => downloadImage(activeImage.url, `editmu_edicion_${activeImageIndex}.jpg`)}
                                            className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-xs flex items-center"
                                        >
                                            <FaDownload className="mr-1" />
                                            Descargar
                                        </button>
                                    </div>
                                    <div>
                                        {renderPromptArea()}
                                        <div className="flex mt-3 space-x-3">
                                            {renderProcessButton()}
                                            <button
                                                onClick={confirmReset}
                                                className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded transition-colors duration-150"
                                            >
                                                Reiniciar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {renderAdPlaceholder()}
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    {renderAdPlaceholder()}
                                </div>
                                <div className="flex flex-col">
                                    <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden border border-gray-800 bg-gray-900">
                                        <Image
                                            src={activeImage.url}
                                            alt={`Imagen procesada`}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                            onClick={() => setShowImageModal(true)}
                                        />
                                        <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 rounded text-xs">
                                            #{activeImageIndex}
                                        </div>
                                        <button
                                            onClick={() => downloadImage(activeImage.url, `editmu_edicion_${activeImageIndex}.jpg`)}
                                            className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-xs flex items-center"
                                        >
                                            <FaDownload className="mr-1" />
                                            Descargar
                                        </button>
                                    </div>
                                    <div>
                                        {renderPromptArea()}
                                        <div className="flex mt-3 space-x-3">
                                            {renderProcessButton()}
                                            <button
                                                onClick={confirmReset}
                                                className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded transition-colors duration-150"
                                            >
                                                Reiniciar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Vista Mobile: Anuncio -> Imagen -> Prompt */}
                    <div className="md:hidden flex flex-col space-y-6">
                        <div className="w-full">
                            {renderAdPlaceholder()}
                        </div>
                        <div className="relative w-full h-80 rounded-lg overflow-hidden border border-gray-800 bg-gray-900">
                            <Image
                                src={activeImage.url}
                                alt={`Imagen ${activeImageIndex === 0 ? 'original' : 'procesada'}`}
                                fill
                                style={{ objectFit: 'contain' }}
                                onClick={() => setShowImageModal(true)}
                            />
                            <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 rounded text-xs">
                                #{activeImageIndex}
                            </div>
                            <button
                                onClick={() => downloadImage(activeImage.url, `editmu_edicion_${activeImageIndex}.jpg`)}
                                className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-xs flex items-center"
                            >
                                <FaDownload className="mr-1" />
                                Descargar
                            </button>
                        </div>
                        <div>
                            {renderPromptArea()}
                            <div className="flex mt-3 space-x-3">
                                {renderProcessButton()}
                                <button
                                    onClick={confirmReset}
                                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded transition-colors duration-150"
                                >
                                    Reiniciar
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    };

    // Modal de confirmación de reinicio
    const resetModal = () => (
        <div className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ${showResetModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-xl font-bold text-white">ADVERTENCIA</h3>
                </div>
                <p className="text-gray-300 mb-6">
                    Estás a punto de reiniciar la sesión de estudio y se borrará todo incluyendo tu historial de ediciones y la imagen base. Ya que no se cuenta con almacenamiento en la nube.
                </p>
                <div className="flex space-x-3 justify-end">
                    <button
                        onClick={() => setShowResetModal(false)}
                        className="px-4 py-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors duration-150"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={executeReset}
                        className="px-4 py-2 rounded bg-red-900 hover:bg-red-800 text-white transition-colors duration-150"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );

    // Modal de límite de imágenes
    const maxImagesModal = () => (
        <div className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ${showMaxImagesModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-xl font-bold text-white">Límite alcanzado</h3>
                </div>
                <p className="text-gray-300 mb-6">
                    Has alcanzado el límite máximo de {MAX_HISTORY_IMAGES} imágenes en el historial de ediciones. Para continuar editando, debes reiniciar el estudio o descargar tus imágenes antes de continuar.
                </p>
                <div className="flex space-x-3 justify-end">
                    <button
                        onClick={() => setShowMaxImagesModal(false)}
                        className="px-4 py-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors duration-150"
                    >
                        Cerrar
                    </button>
                    <button
                        onClick={() => {
                            setShowMaxImagesModal(false);
                            confirmReset();
                        }}
                        className="px-4 py-2 rounded bg-yellow-700 hover:bg-yellow-600 text-white transition-colors duration-150"
                    >
                        Reiniciar estudio
                    </button>
                </div>
            </div>
        </div>
    );

    // Modal de error de archivo
    const fileErrorModal = () => (
        <div className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ${showFileErrorModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-xl font-bold text-white">Error de archivo</h3>
                </div>
                <p className="text-gray-300 mb-6">
                    {fileErrorMessage}
                </p>
                <div className="flex space-x-3 justify-end">
                    <button
                        onClick={() => setShowFileErrorModal(false)}
                        className="px-4 py-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors duration-150"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );

    // Notificación de éxito
    const successNotification = () => {
        if (!successMessage) return null;

        return (
            <div className="mt-4 p-3 bg-gray-800 text-gray-200 rounded border border-gray-700 flex justify-between items-center">
                <span>{successMessage}</span>
                <button
                    onClick={() => setSuccessMessage('')}
                    className="ml-2 text-gray-400 hover:text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        );
    };

    // Modal de imagen con zoom
    const imageModal = () => (
        <div
            className={`fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-300 ${showImageModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setShowImageModal(false)}
        >
            <div
                className="relative w-full h-full max-w-6xl max-h-full p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => setShowImageModal(false)}
                    className="absolute top-0 right-0 text-white text-4xl z-10 p-4 hover:text-gray-300 transition-colors"
                >
                    ×
                </button>
                {allImages[activeImageIndex] && (
                    <TransformWrapper
                        initialScale={1}
                        minScale={0.5}
                        maxScale={5}
                        centerZoomedOut={true}
                        panning={{ disabled: false }}
                    >
                        {({ zoomIn, zoomOut }) => (
                            <>
                                <TransformComponent>
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Image
                                            src={allImages[activeImageIndex].url}
                                            alt={`Imagen ${activeImageIndex === 0 ? 'original' : 'procesada'}`}
                                            width={1000}
                                            height={1000}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain'
                                            }}
                                            priority
                                        />
                                    </div>
                                </TransformComponent>
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                                    <button
                                        onClick={() => zoomIn()}
                                        className="bg-gray-800 text-white px-4 py-2 rounded text-lg"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => zoomOut()}
                                        className="bg-gray-800 text-white px-4 py-2 rounded text-lg"
                                    >
                                        -
                                    </button>
                                </div>
                            </>
                        )}
                    </TransformWrapper>
                )}
            </div>
        </div>
    );

    // Renderizado principal
    return (
        <div className="bg-black shadow rounded-lg p-6 mt-6 border border-gray-800 text-white">
            <h2 className="text-xl font-semibold mb-6 text-white">Editor de Imágenes con IA</h2>

            {renderMainContent()}

            {error && (
                <div className="mt-4 p-3 bg-red-900 text-red-200 rounded border border-red-800 flex justify-between items-center">
                    <span>{error}</span>
                    <button
                        onClick={() => setError('')}
                        className="ml-2 text-red-300 hover:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}

            {successNotification()}

            {allImages.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4 text-white">Historial de ediciones</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {allImages.map((img, index) => (
                            <div
                                key={index}
                                className={`border border-gray-800 rounded-lg overflow-hidden bg-gray-900 ${index === activeImageIndex ? 'ring-2 ring-white' : 'cursor-pointer hover:bg-gray-800 transition-colors duration-150'}`}
                                onClick={() => selectImageFromHistory(index)}
                            >
                                <div className="relative h-32 w-full">
                                    <Image
                                        src={img.url}
                                        alt={index === 0 ? "Imagen original" : `Edición ${index}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 rounded text-xs">
                                        #{index}
                                    </div>
                                    {index === 0 && (
                                        <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-xs">
                                            Original
                                        </div>
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            downloadImage(img.url, `editmu_edicion_${index}.jpg`);
                                        }}
                                        className="absolute bottom-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-xs flex items-center"
                                    >
                                        <FaDownload className="mr-1" />
                                        Descargar
                                    </button>
                                </div>
                                <div className="p-2">
                                    <p className="text-xs text-gray-400 truncate">{img.prompt}</p>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-xs text-gray-500">
                                            {new Date(img.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {resetModal()}
            {maxImagesModal()}
            {fileErrorModal()}
            {imageModal()}
        </div>
    );
};

export default MainView;
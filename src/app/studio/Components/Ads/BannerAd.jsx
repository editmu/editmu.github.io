// src/app/studio/Components/Ads/BannerAd.jsx
import React, { useEffect } from 'react';





const BannerAd = ({ scriptSrc }) => {
    // Cargar el script del banner dinámicamente cuando scriptSrc cambia
    useEffect(() => {
        if (!scriptSrc) return; // No hacer nada si no hay script

        const loadBannerScript = () => {
            const script = document.createElement('script');
            script.src = scriptSrc;
            script.async = true;
            script.referrerPolicy = 'no-referrer-when-downgrade';
            document.getElementById('banner-ad-placeholder').appendChild(script);
        };

        loadBannerScript();

        // Limpiar scripts al desmontar o cambiar scriptSrc
        return () => {
            const scripts = document.querySelectorAll(`script[src="${scriptSrc}"]`);
            scripts.forEach(script => script.remove());
        };
    }, [scriptSrc]);

    return (
        <div id="banner-ad-placeholder" className="flex items-center justify-center w-full h-96 bg-gray-900 rounded-lg border border-gray-800 text-gray-400 transition-colors duration-200 hover:bg-gray-800">
            {/* El contenido del anuncio se cargará aquí */}
        </div>
    );
};

export default BannerAd;
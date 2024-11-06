import React, { useState, useEffect } from 'react';
import '../../styles/global.css';

const Carrusel = ({ images = [], interval = 10 }) => {
    const [offset, setOffset] = useState(0);
    const imageCount = images.length;

    useEffect(() => {
        const moveSlide = () => {
            setOffset(prevOffset => {
                const newOffset = prevOffset - 0.1; // Mueve hacia la izquierda

                // Reinicia el offset cuando llega al final de las imágenes
                if (newOffset <= -100 * imageCount) {
                    return 0; // Reinicia para crear un bucle continuo
                }

                return newOffset;
            });
        };

        const timer = setInterval(moveSlide, interval);
        return () => clearInterval(timer);
    }, [imageCount, interval]);

    return (
        <div className="carousel-container" style={{ overflow: 'hidden', width: '100%', position: 'fixed', bottom: '0', left: '0', zIndex: 10 }}>
            <div
                className="carousel-images"
                style={{
                    display: 'flex',
                    transform: `translateX(${offset}%)`,
                    transition: 'transform 0.1s linear', // Movimiento suave y continuo
                }}
            >
                {/* Duplicamos las imágenes para el efecto de bucle continuo */}
                {[...images, ...images].map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        style={{ width: '100%', height: '300px', objectFit: 'cover' }} // Ajusta la altura según sea necesario
                    />
                ))}
            </div>
        </div>
    );
};

const CarruselWrapper = ({ images, interval = 10 }) => {
    return (
        <div className="carousel-wrapper" style={{ width: '100%' }}>
            {/* Carrusel que se mueve de derecha a izquierda y está fijo en la parte inferior */}
            <Carrusel images={images} interval={interval} />
        </div>
    );
};

export default CarruselWrapper;

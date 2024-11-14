import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/global.css';

const imageArray = [
  {
    src: 'https://www.sdpnoticias.com/resizer/v2/U2FPBYGYWRAC3EUZ5NN7IG7FCA.jpg?smart=true&auth=3ce93b76a3fe5c3dbc2435448f254745df5c32a4853564e8d06326aff0aa1347&width=640&height=360',
  },
  {
    src: 'https://r-charts.com/es/miscelanea/procesamiento-imagenes-magick_files/figure-html/color-fondo-imagen-r.png',
  },
  {
    src: 'https://img.freepik.com/fotos-premium/abstracto-bombilla-creativa-fondo-azul-brillante-ia-generativa_1259851-72.jpg',   
  },
  {
    src: 'https://marketing4ecommerce.co/wp-content/uploads/2023/10/ias-generadoras-de-imagenes.jpg',
  },
  {
    src: 'https://casamontessori.edu.co/wp-content/uploads/2018/05/fondos-pantalla-paisajes-hermosos-bonitos-naturales-escritorio-fotografias-hd-wallpaper-imagenes-fotos-3d-gato-gatitos-tierno-1-1.jpg',
  },
  {
    src: 'https://img.freepik.com/foto-gratis/retrato-abstracto-ojo-elegancia-mujeres-jovenes-generado-ai_188544-9712.jpg',
  }

];

const Carousel = ({photos}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {photos.map((photo, index) => (
          <div className="carousel-item" key={index}>
            <img src={photo.url} alt={photo.alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

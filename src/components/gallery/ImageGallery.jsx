import React from 'react';
import '../../styles/global.css';

const ImageGallery = () => {
  const images = [
    { src: 'https://marketing4ecommerce.co/wp-content/uploads/2023/10/ias-generadoras-de-imagenes.jpg'},
    { src: 'https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg'},
    { src: 'https://casamontessori.edu.co/wp-content/uploads/2018/05/fondos-pantalla-paisajes-hermosos-bonitos-naturales-escritorio-fotografias-hd-wallpaper-imagenes-fotos-3d-gato-gatitos-tierno-1-1.jpg'},
    { src: 'https://png.pngtree.com/background/20230524/original/pngtree-sad-pictures-for-desktop-hd-backgrounds-picture-image_2705986.jpg'},
    { src: 'https://png.pngtree.com/background/20230612/original/pngtree-wolf-animals-images-wallpaper-for-pc-384x480-picture-image_3180467.jpg'},
    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmJ2iZKPl2BwHHtHuVmNWYRbAX-ZucGnSq-g&s'},
    { src: 'https://e.rpp-noticias.io/xlarge/2024/08/14/251925_1626775.webp'},
    { src: 'https://st.depositphotos.com/1016440/2534/i/450/depositphotos_25344733-stock-photo-sunrise-at-the-beach.jpg'},
    { src: 'https://cdn.shopify.com/s/files/1/0229/0839/articles/bancos_de_imagenes_gratis.jpg?v=1727294225'},
    { src: 'https://media.istockphoto.com/id/1313456479/es/foto/hombre-y-alma-el-loto-de-yoga-posa-meditaci%C3%B3n-sobre-el-fondo-de-la-galaxia-nebulosa.jpg?s=612x612&w=0&k=20&c=NGQsj8iJRCU3Vwoe4nVgVgBOHnuQx4JVwp7jsMdkURQ='}
  ];

  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <div key={index} className="image-item">
          <img src={image.src} alt={image.alt} className="image" />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;

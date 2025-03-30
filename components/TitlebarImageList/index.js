
import React from 'react'
import card from '../Main/card.module.css'

import title from '../Main/title.module.css'


function TitlebarImageList() {
  const image1 = "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/IMG_1905.jpg"
  const image2 = "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/IMG_9982.jpg"
  const image3 = "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/IMG_9983.jpg"
  const image4 = "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/IMG_9984.jpg"
  return (
    <div>
      <div>
        <h4 className={title.fontTitleSub}>Ancestral</h4>
        <h2 className={title.fontTitleline}>Proceso</h2>
        <div className="linea"></div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", margin:20 }}>
        <div className={card.card_box}>
          <img
            alt=""
            src={image1}
            layout="fill"
           
            className="group-hover:opacity-75"
          />

        </div>
        <div className={card.card_box}>
          <img
            alt=""
            src={image2}
            layout="fill"
            
            className="group-hover:opacity-75"
          />

        </div>
        <div className={card.card_box}>
          <img
            alt=""
            src={image3}
            layout="fill"
            objectFit="cover"
            className="group-hover:opacity-75"
          />

        </div>
        <div className={card.card_box}>
          <img
            alt=""
            src={image4}
            layout="fill"
            objectFit="cover"
            className="group-hover:opacity-75"
          />

        </div>
      </div>





      {/* <div className={card.cardContainer}>
        
        
      <div className={card.cardBox}>
            <Image
              className="imagenAbajoTexto1Home"
            src={image1}
            width="640" height="360"
            alt="Nuestro Palenque, Santa Catarina Minas, Oaxaca" 
            
            />
          <p className="textoFotosHome text-black">Nuestro Palenque, Santa Catarina Minas, Oaxaca</p>
        </div>
        
        
      
        <div className={card.cardBox}>
          <Image
            className="imagenAbajoTexto1Home"
            src={image2}
            alt="Nuestro Palenque, Santa Catarina Minas, Oaxaca" 
            width="640" height="360"
          />
          <p className="textoFotosHome text-black">Molienda con manos de artesanos oaxaqueños</p>
        </div>
        <div className="h-64 w-96 relative">
          <Image
            
            src={image3}
            
            layout="fill" // required
            objectFit="cover" // change to suit your needs
            className="rounded-full" // just an example
            alt="Nuestro Palenque, Santa Catarina Minas, Oaxaca"
          />
          <p className="textoFotosHome text-black">Fermentación 100% libre de químicos</p>
        </div>

        <div className="h-64 w-96 relative">
          <Image
            className="imagenAbajoTexto1Home"
            src={image4}
            alt="Nuestro Palenque, Santa Catarina Minas, Oaxaca" 
          />
          <p className="textoFotosHome text-black">Destilación en Ollas de Barro de Cobre</p>
        </div>
   
        </div> */}

      <div className="subSubDiv1Banner">
        <a href="https://wa.me/+5215549242477">
          <button type="button" className="buttonComponente">
            ¡Comprar ahora!
          </button>
        </a>
      </div>
    </div>
  );
}

// const itemData = [
//   {
//     img: "https://imagenesrutalab.s3.amazonaws.com/llorona/mezcal/IMG_9982.jpg",
//     title: "Nuestro Palenque, Santa Catarina Minas, Oaxaca",
//     rows: 2,
//     cols: 2,
//     featured: true,
//   },
//   {
//     img: "https://imagenesrutalab.s3.amazonaws.com/llorona/mezcal/IMG_9984.jpg",
//     title: "Molienda con manos de artesanos oaxaqueños",
//   },
//   {
//     img: "https://images.squarespace-cdn.com/content/5f04aed9153c537f9abcb851/1595359863647-9FCGVBUGXDSW2IKBDQLF/IMG_1905.jpg?format=1000w&content-type=image%2Fjpeg",
//     title: "Fermentación 100% libre de químicos",
//   },
//   {
//     img: "https://imagenesrutalab.s3.amazonaws.com/llorona/mezcal/IMG_9983.jpg",
//     title: "Destilación en Ollas de Barro de Cobre",
//     cols: 2,
//   },
// ];

export default TitlebarImageList;
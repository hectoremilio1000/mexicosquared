import React from "react";

import title from "../Main/title.module.css";
import card from "../Main/card.module.css";

function NuestroMezcalImages() {
  const image1 =
    "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/IMG_0043+(1).jpg";
  const image2 =
    "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/foto%2Bbotella%2Bcalaca%2Bmezcal%2Babbywood.jpeg";
  const image3 =
    "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/IMG_9973+(1).jpg";
  const image4 =
    "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/mezcal%2Bcannabis%2Bllorona.jpg";
  return (
    <div>
      <div>
        <h1 className={title.fontTitlemain}>La pasión al mezcal</h1>
        <h2 className="text-3xl text-center mx-auto">Nos une</h2>
        <div className="linea"></div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          margin: 20,
        }}
      >
        <div className={card.card_box}>
          <img
            alt=""
            src={image1}
            layout="fill"
            objectFit="cover"
            className="group-hover:opacity-75"
          />
        </div>
        <div className={card.card_box}>
          <img
            alt=""
            src={image2}
            layout="fill"
            objectFit="cover"
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
      <p className="w-full max-w-[800px]  mx-auto text-center sm:text-2xl text-xl text-black">
        Compra un buen mezcal envíos a todo mexico, restaurante ubicado en
        Alvaro Obregón 308 Roma Condesa, hacemos delivery.
      </p>

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

    // <Section>
    //   <div>
    //     <h4 className="text-center tituloSection">La pasión al mezcal</h4>
    //     <h2 className="text-center subTituloSection">nos Une</h2>
    //     <div className="linea"></div>
    //   </div>
    //   <ImageList>
    //     <ImageListItem key="Subheader" cols={2}></ImageListItem>
    //     {itemData.map(item => (
    //       <ImageListItem key={item.img}>
    //         <img
    //           src={`${item.img}?w=248&fit=crop&auto=format`}
    //           srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
    //           alt={item.title}
    //           loading="lazy"
    //         />
    //         <ImageListItemBar
    //           title={item.title}
    //           subtitle={item.author}
    //           actionIcon={
    //             <IconButton
    //               sx={{ color: "rgba(255, 255, 255, 0.54)" }}
    //               aria-label={`info about ${item.title}`}
    //             ></IconButton>
    //           }
    //         />
    //       </ImageListItem>
    //     ))}
    //   </ImageList>
    //   <div className="subSubDiv1Banner">
    //     <a href="https://wa.me/+5215549242477">
    //       <button type="button" className="buttonComponente">
    //         ¡Comprar ahora!
    //       </button>
    //     </a>
    //   </div>
    // </Section>
  );
}

const itemData = [
  {
    img: "https://imagenesrutalab.s3.amazonaws.com/llorona/mezcal/IMG_9973.jpg",
    title: "Niurka con su hija Romi Marcos degustando nuestro Mezcal",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://imagenesrutalab.s3.amazonaws.com/llorona/mezcal/IMG_0043.jpg",
    title: "Nuestra botella Calavera",
  },
  {
    img: "https://imagenesrutalab.s3.amazonaws.com/llorona/mezcal/mezcal+cannabis+llorona.jpg",
    title: "Coyote con Cannabis",
  },
  {
    img: "https://imagenesrutalab.s3.amazonaws.com/llorona/mezcal/foto+botella+calaca+mezcal+abbywood.JPG",
    title: "La pasión nos une AbbyWoo",
    cols: 2,
  },
];

export default NuestroMezcalImages;

import React from 'react'
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Section from "../../Modules/styles/section";

function ImageCumple() {
  return (
    <Section>
      <div>
        <h4 className="text-center tituloSection">Experiencias únicas</h4>
        <h2 className="text-center subTituloSection">
          que generan grandes ganancias
        </h2>
        <div className="linea"></div>
      </div>
      <ImageList>
        <ImageListItem key="Subheader" cols={2}></ImageListItem>
        {itemData.map(item => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                ></IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Section>
  );
}

const itemData = [
  {
    img: "https://imagenesrutalab.s3.amazonaws.com/llorona/franquicias/lugarAfuera.jpg",
    title: "Diseño único exterior",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://imagenesrutalab.s3.amazonaws.com/llorona/franquicias/lloronaDentro.jpg",
    title: "Diseño industrial contrastando con una terraza floral",
  },
  {
    img: "https://imagenesrutalab.s3.amazonaws.com/llorona/franquicias/menu%CC%81Veggie.jpg",
    title: "Menú Veggie",
  },
  {
    img: "https://imagenesrutalab.s3.amazonaws.com/llorona/franquicias/mixologi%CC%81a+autor.jpg",
    title: "Mixología de autor",
    cols: 2,
  },
  {
    img: "https://imagenesrutalab.s3.amazonaws.com/llorona/franquicia/IMG_0071.jpg",
    title: "Embajadores de la Marca",
    cols: 2,
  },
  {
    img: "https://imagenesrutalab.s3.amazonaws.com/llorona/franquicia/IMG_0059.jpg",
    title: "Bebidas Únicas",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://imagenesrutalab.s3.amazonaws.com/llorona/franquicia/IMG_0062.jpg",
    title: "Experiencias gastronómicas",
    cols: 2,
  },
  {
    img: "https://imagenesrutalab.s3.amazonaws.com/llorona/franquicia/IMG_0063.jpg",
    title: "Hamburguesas Trendy",
    rows: 2,
    cols: 2,
    featured: true,
  },
];

export default ImageCumple
;
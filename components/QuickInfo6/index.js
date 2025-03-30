import React from "react";
import CarouselRevistas from "../CarouselRevistas/CarouselRevistas";

function QuickInfo6({ idioma }) {
  const testimonialsEs = [
    {
      photo:
        "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/logo+timeout.jpeg",
      rating: 5,
      nombre: "Revista Time Out",
      url: "https://www.timeoutmexico.mx/ciudad-de-mexico/bares-y-cantinas/la-llorona",
      text: "La Llorona –por la canción de Chavela Vargas– es un concepto relajado e ideal para las noches prolongadas con innumerables tragos de mezcal.",
      date: "2023-03-15",
    },
    {
      photo:
        "https://1000marcas.net/wp-content/uploads/2020/03/logo-Forbes-1024x576.png",
      rating: 5,
      nombre: "Forbes",
      url: "https://www.forbes.com.mx/forbes-life/la-llorona-cantina-del-siglo-xxi/#google_vignette",
      text: "En lo gastronómico, La Llorona adopta el formato clásico de cantina, con una oferta de destilados Premium y de cócteles a base de mezcal elaborados magistralmente.",
      date: "2024-03-20",
    },
    {
      photo:
        "https://www.att.com.mx/dw/image/v2/BJKW_PRD/on/demandware.static/-/Sites-att-Library/default/dw148ea01a/images/migration/entretenimiento/DondeIR.jpeg",
      rating: 5,
      nombre: "Donde ir",
      url: "https://www.dondeir.com/restaurante/la-llorona-restaurante-cantina-grill-en-condesa/14684/",
      text: "La Llorona, se encuentra frente al Parque España, en la Roma rinde tributo a las raíces de su creador sin pretensiones de vanguardia culinaria, lo cual se agradece",
      date: "2023-03-17",
    },
    {
      photo:
        "https://img.chilango.com/2017/01/logoChilangoWeb-300x128.png",
      rating: 5,
      nombre: "Chilango",
      url: "https://www.chilango.com/comida/la-llorona-la-nueva-cantina-de-la-condesa/",
      text: "El lugar tiene motivos mexicanos por todas partes. Así que encontrarás tucanes, mariposas, caimanes y serpientes trepando por sus paredes (de mentiritas). Su logo es una fusión entre la tradicional catrina y Frida Kahlo.",
      date: "2023-03-17",
    },
    {
      photo:
        "https://revistatop.com.mx/wp-content/uploads/2020/02/Logotipo1.png",
      rating: 5,
      nombre: "Tpp",
      url: "https://revistatop.com.mx/inauguracion-de-la-llorona/",
      text: "La Llorona” restaurante, Viva la vida",
      date: "2023-03-17",
    },
  ];
  const testimonialsEn = [
    {
      photo:
        "https://lh3.googleusercontent.com/a-/ALV-UjU-eD1Bf9aMyK372MXWBN7g4YgbBl6yWx1cC3ZRu_YgW3k=w72-h72-p-rp-mo-ba4-br100",
      rating: 5,
      nombre: "Amanda V",
      url: "https://maps.app.goo.gl/GL3A5K35yeAZdQ8u9",
      text: "Service was quick, friendly, and informative about the menu. I got the Don Huevo burger, and it was SO GOOD. (I'm going to start adding arugula and fried eggs when I make burgers at home!) Also got the strawberry horchata (in the pictures) since it was one of the only non-alcoholic options, and it was divine. The flavor was great and it was so creamy. The only thing I wasn't a huge fan of was the TV was on with the volume kind of loud the whole time, the music was a little too loud, and the lights were synchronized with the music, so it was a little overstimulating.",
      date: "2024-01-27",
    },
    {
      photo:
        "https://lh3.googleusercontent.com/a/ACg8ocLmTG6uUsqqWar2n-Vg3S6tGYq7FP_j-tT4fO4Tza_eZ9gupg=w120-h120-p-rp-mo-br100",
      rating: 5,
      nombre: "lowell moore",
      url: "https://maps.app.goo.gl/qzCD2gzVXMMeFQRy6",
      text: "First night in Mexico City. Just stopped by for a quick drink and looked at the menu.  Hamburger with carmelized onions and blue cheese is one of the best burgers I've ever had.  Sat outdoors and Robert took excellent care of us. Highly recommend. You will love it!",
      date: "2024-03-20",
    },
    {
      photo:
        "https://lh3.googleusercontent.com/a-/ALV-UjUnq3kLCqTg8Ya2Y47-8DBMxQOerAIr0nW9afCrheO4nW6HIWTN=w72-h72-p-rp-mo-br100",
      rating: 5,
      nombre: "sandra baca",
      url: "https://maps.app.goo.gl/ZJMTbNCMEd9dgDLo7",
      text: "Nice cocktails and food, I've just got dessert but it was delicious, excellent service, the only thing is that music is a bit louder 🤗",
      date: "2023-12-27",
    },
    {
      photo:
        "https://lh3.googleusercontent.com/a-/ALV-UjV53O_B5w84E9nEn6l0Bg66cBJv5NwirO2VUOV4PNpqLcaolJ0S=w72-h72-p-rp-mo-ba4-br100",
      rating: 5,
      nombre: "Kelly Ording",
      url: "https://maps.app.goo.gl/C6YMzKvwJMA3i1JPA",
      text: "La Llorona Cantina is a good spot for some food and drinks. I got one of the taco options  and a cocktail. Both were great! The staff was incredibly friendly and put the women’s World Cup on the television. Sometimes they have live music as well.",
      date: "2023-03-17",
    },
    {
      photo:
        "https://lh3.googleusercontent.com/a-/ALV-UjW7BjPqjw-TVmDTjUfsZkcvUkEOvPby-ELyAOYgDDTC9NboaM8r=w72-h72-p-rp-mo-ba5-br100",
      rating: 5,
      nombre: "Pratik Desai",
      url: "https://maps.app.goo.gl/Rv94nb1T1xtXC8U37",
      text: "Amazing artisanal tacos (but smaller in size) - a great place to day drink outside. Some of the servers are a little careless, but the owner (or manager?) is very thoughtful. Good mezcal list as well!",
      date: "2023-03-17",
    },
    {
      photo:
        "https://lh3.googleusercontent.com/a-/ALV-UjWsuBUWoGfABlax52aiF1MsOcMiKvDf_taeMRozKrkYobD3RcU=w72-h72-p-rp-mo-br100",
      rating: 5,
      nombre: "Christophe Diot",
      url: "https://maps.app.goo.gl/hidk1jdyDYwZjmFT6",
      text: "nice outdoor bar atmosphere. nothing fancy but very friendly, tasty food, excellent cocktails. everything you need for a quiet dinner with family in mexico city.",
      date: "2023-03-17",
    },
  ];

  return (
    <>
      {idioma ? (
        <div className="container mx-auto px-4 lg:px-0">
          <CarouselRevistas testimonials={testimonialsEs} />
        </div>
      ) : (
        <div className="container mx-auto px-4 lg:px-0">
          <CarouselRevistas testimonials={testimonialsEn} />
        </div>
      )}
    </>
  );
}

export default QuickInfo6;

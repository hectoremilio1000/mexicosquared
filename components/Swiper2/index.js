import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const MySwiper = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      navigation
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      scrollbar={{ draggable: true }}
      loop={true}
    >
      <SwiperSlide>
        <div
          style={{
            backgroundImage:
              "url(https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/mejorterrazaCDMXcantinalallorona.jpg)",
            height: "80vh",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        ></div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{
            backgroundImage:
              "url(https://imagenesrutalab.s3.amazonaws.com/llorona/cumple/pinatacumpleanera.JPG)",
            height: "80vh",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        ></div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{
            backgroundImage:
              "url(https://imagenesrutalab.s3.amazonaws.com/llorona/franquicia/IMG_0071.jpg)",
            height: "80vh",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        ></div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{
            backgroundImage:
              "url(https://imagenesrutalab.s3.amazonaws.com/llorona/franquicias/banner/IMG_8773.jpg)",
            height: "80vh",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        ></div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{
            backgroundImage:
              "url(https://imagenesrutalab.s3.amazonaws.com/llorona/franquicias/nin%CC%83as+hermosas.jpg)",
            height: "80vh",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        ></div>
      </SwiperSlide>

      <SwiperSlide>
        <div
          style={{
            backgroundImage:
              "url(https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/ninas4pinata.jpeg)",
            height: "80vh",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        ></div>
      </SwiperSlide>
      {/* Agrega más SwiperSlide según sea necesario */}
    </Swiper>
  );
};

export default MySwiper;

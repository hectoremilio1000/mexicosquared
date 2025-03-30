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
              "url(https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/banner/Restaurantes.png)",
            height: "90vh",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="relative h-full flex flex-col items-center justify-center text-center text-white">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black via-transparent to-yellow-600 text-center text-white">
              <div className="relative z-10 p-8">
                <button className="uppercase text-sm tracking-widest mb-4">
                  Dueños restauranteros
                </button>
                <h1 className="inline-block text-white text-[70px] md:text-[100px] font-bold px-4 py-2 w-full text-center">
                  ¿QUIERES MÁS <br /> CLIENTES?
                </h1>
                <p className="max-w-lg mx-auto text-white md:text-lg mb-6">
                  Descarga el estudio de 33 restaurantes que están ARRASANDO en
                  2024 y descubre los 7 Modelos de Éxito que siguieron para
                  construir restaurantes increíblemente lucrativos
                </p>
                <button className="bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300">
                  SÍ! DIME CÓMO!
                </button>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default MySwiper;

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { useAppContext } from "../context/Context";
const Slider = () => {
  const { espa } = useAppContext();
  return (
    <>
      {espa ? (
        <div className="w-full bg-black py-12">
          <div className="overflow-hidden bg-black">
            <div className="flex items-center gap-4 whitespace-nowrap ">
              <h1 className="animate-marqueeleft inline-block text-white text-[70px] md:text-[100px] font-bold">
                Nuestra CARTA
              </h1>
              <h1 className="animate-marqueeleft inline-block text-[#3eeb91] text-[70px] md:text-[100px] font-bold ">
                NUESTRA CARTA
              </h1>
            </div>
          </div>
          <div className="w-full max-w-[1184px] mx-auto px-[20px]">
            <Swiper
              spaceBetween={50}
              slidesPerView={2}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              breakpoints={{
                // cuando el ancho de la ventana es igual o mayor a 640px
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                // cuando el ancho de la ventana es igual o mayor a 768px
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                // cuando el ancho de la ventana es igual o mayor a 1024px
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              <SwiperSlide>
                <div className="w-full">
                  <img
                    className="rounded-lg border-2 border-white w-full h-[300px] object-top object-cover"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/tostadaCantinera.jpg"
                    alt=""
                  />
                  <h1 className="text-2xl md:text-5xl text-white mt-3">
                    Tostada
                  </h1>
                  <p className="text-xs md:text-xl text-white">Cantinera </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-full">
                  <img
                    className="rounded-lg border-2 border-white w-full h-[300px] object-bottom object-cover"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/mixologiaIncreible.jpg"
                    alt=""
                  />
                  <h1 className="text-2xl md:text-5xl text-white mt-3">
                    Tacos
                  </h1>
                  <p className="text-xs md:text-xl text-white">
                    de maíz criollo
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-full">
                  <img
                    className="rounded-lg border-2 border-white w-full h-[300px] object-top object-cover"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/postresDeliciosos.jpeg"
                    alt=""
                  />
                  <h1 className="text-2xl md:text-5xl text-white mt-3">
                    Molten de chocolate
                  </h1>
                  <p className="text-xs md:text-xl text-white">
                    con Helado de Plátano
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-full">
                  <img
                    className="rounded-lg border-2 border-white w-full h-[300px] object-top object-cover"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/mixologiaMexicana.jpg"
                    alt=""
                  />
                  <h1 className="text-2xl md:text-5xl text-white mt-3">
                    Mixología
                  </h1>
                  <p className="text-xs md:text-xl text-white">
                    con sabores mexicanos
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      ) : (
        <div className="w-full bg-black py-12">
          <div className="overflow-hidden bg-black">
            <div className="flex items-center gap-4 whitespace-nowrap ">
              <h1 className="animate-marquee inline-block text-white text-[70px] md:text-[100px] font-bold">
                Our MENU
              </h1>
              <h1 className="animate-marquee inline-block text-[#3eeb91] text-[70px] md:text-[100px] font-bold ">
                Our MENU
              </h1>
            </div>
          </div>
          <div className="w-full max-w-[1184px] mx-auto px-[20px]">
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              breakpoints={{
                // cuando el ancho de la ventana es igual o mayor a 640px
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                // cuando el ancho de la ventana es igual o mayor a 768px
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                // cuando el ancho de la ventana es igual o mayor a 1024px
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              <SwiperSlide>
                <div className="w-full">
                  <img
                    className="rounded-lg border-2 border-white w-full h-[300px] object-top object-cover"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/tostadaCantinera.jpg"
                    alt=""
                  />
                  <h1 className="text-2xl md:text-5xl text-white mt-3">
                    Tostada Cantinera
                  </h1>
                  <p className="text-xs md:text-xl text-white">
                    Our sourdough pizza
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-full">
                  <img
                    className="rounded-lg border-2 border-white w-full h-[300px] object-top object-cover"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/mixologiaIncreible.jpg"
                    alt=""
                  />
                  <h1 className="text-2xl md:text-5xl text-white mt-3">
                    Tacos with heirloom corn
                  </h1>
                  <p className="text-xs md:text-xl text-white">
                    100% nixtamal, no preservatives
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-full">
                  <img
                    className="rounded-lg border-2 border-white w-full h-[300px] object-top object-cover"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/postresDeliciosos.jpeg"
                    alt=""
                  />
                  <h1 className="text-2xl md:text-5xl text-white mt-3">
                    Chocolate Molten Cake
                  </h1>
                  <p className="text-xs md:text-xl text-white">
                    with Banana Ice Cream
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-full">
                  <img
                    className="rounded-lg border-2 border-white w-full h-[300px] object-top object-cover"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/mixologiaMexicana.jpg"
                    alt=""
                  />
                  <h1 className="text-2xl md:text-5xl text-white mt-3">
                    Modern mixology
                  </h1>
                  <p className="text-xs md:text-xl text-white">
                    with Mexican flavors
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default Slider;

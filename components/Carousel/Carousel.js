import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
const TestimonialCard = ({ testimonial }) => {
  const { photo, rating, text, date, url, nombre } = testimonial;
  return (
    <a
      href={url}
      target="_blank"
      className="flex flex-col justify-center items-center px-8 py-4 bg-white rounded-xl shadow-md "
    >
      {/* Contenedor de la imagen ajustado para dispositivos móviles y escritorio */}
      <img
        className="h-32 w-32 md:h-30 md:w-30 rounded-full object-cover" // Tamaños diferentes para móvil (h-32 w-32) y escritorio (md:h-48 md:w-48)
        src={photo}
        alt="Client photo"
      />
      <div className="text-center mt-4">
        {" "}
        {/* Centrar texto y añadir espacio en la parte superior */}
        <h2 className="text-sm md:text-base font-medium text-gray-500">
          Rating:
        </h2>
        <div className="flex justify-center items-center">
          <span className="text-lg md:text-xl font-semibold text-gray-900">
            {rating}
          </span>
          <svg
            fill="currentColor"
            className="w-5 h-5 text-orange-500 ml-1"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.384-.955 1.683-.955 2.067 0l1.462 3.635a1.5 1.5 0 001.419 1.034h3.813c1.054 0 1.488 1.33.71 1.997l-3.08 3.004a1.5 1.5 0 00-.432 1.34l.73 4.259c.177 1.041-1.045 1.84-1.949 1.347l-3.613-1.9a1.5 1.5 0 00-1.395 0l-3.613 1.9c-.903.493-2.125-.306-1.949-1.347l.73-4.259a1.5 1.5 0 00-.432-1.34l-3.08-3.004c-.778-.667-.344-1.997.71-1.997h3.813a1.5 1.5 0 001.419-1.034l1.462-3.635z"></path>
          </svg>
        </div>
        <p className="text-xs md:text-sm text-gray-500 mt-1">{date}</p>
        <p className="text-xs md:text-sm text-gray-500 mt-1">{nombre}</p>
        <div className="overflow-hidden">
          <p
            className="text-ellipsis-vertical text-sm md:text-md text-gray-900 mt-1"
            dangerouslySetInnerHTML={{ __html: text }}
          ></p>
        </div>
      </div>
    </a>
  );
};

const Carousel = ({ testimonials }) => {
  return (
    <div className="relative max-w-[1080px] mx-auto bg-black">
      <div className="flex gap-x-1 md:gap-x-4">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation
          scrollbar={{ draggable: true }}
          loop={true}
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {testimonials.map((testimonial, index) => {
            return (
              <SwiperSlide key={index}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* gap-x-1 para móviles y md:gap-x-4 para escritorio */}
      </div>
    </div>
  );
};

export default Carousel;

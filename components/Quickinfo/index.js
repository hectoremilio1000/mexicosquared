import React from "react";
import title from "../Main/title.module.css";
import card from "../Main/card.module.css";
import Link from "next/link";

import AppContextProvider, { useAppContext } from "../context/Context";
import * as fbq from "../../lib/fpixel";

function QuickInfo() {
  const handleClick = () => {
    fbq.event("reserva");
  };

  const { ingles, espa } = useAppContext();

  return (
    <>
      {espa ? (
        <div className="w-full max-w-[1184px] py-[80px] px-[20px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="w-full flex flex-col justify-center">
            {/* <h2 className="font-bold text-2xl">No solo somos</h2> */}
            <h1 className="text-2xl md:text-5xl font-bold">
              Bienvenidos a Cantina la Llorona
            </h1>

            {/* <div className="h-2 bg-white w-full rounded"></div> */}

            <p className="text-start sm:text-2xl text-xl text-black">
              Menú inspirado en <b>Cantinas Mexicanas</b>. Es honesto pero con
              jiribilla para acompañar una buena mixología y recordarnos al
              méxico que nos hace vibrar.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="">
              <Link href="/menullorona/Alimentos">
                <div className="w-full">
                  <img
                    className="w-full h-[280px]  object-cover rounded"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/IMG_2049.jpg"
                    alt="Tacos y cocteles"
                  />
                </div>
              </Link>
              <Link href="/menullorona/Alimentos" className="mt-4 block">
                <div>
                  <img
                    className="h-[220px] object-cover w-full rounded"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/IMG_2047.jpg"
                    alt="cocteles y tacos"
                  />
                </div>
              </Link>
            </div>
            <div className="w-full grid grid-cols-1">
              <Link href="/menullorona/Alimentos" className="mt-12">
                <div>
                  <img
                    className="h-[220px] object-cover w-full rounded"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/aguacateRibeyeLlorona.jpg"
                    alt="tacos y cocteles"
                  />
                </div>
              </Link>

              <Link
                href="/menullorona/Bebidas/Artesanal"
                className="mt-4 block"
              >
                <div>
                  <img
                    className="h-[280px] object-contain w-full rounded"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/IMG_2050.jpg"
                    alt="cocteles Llorona"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* <div
            style={{ display: "flex", justifyContent: "center", marginTop: 30 }}
          >
            <Link href="/reserva">
              <button className="buttonComponente" onClick={handleClick}>
                ¡Reserva ya!
              </button>
            </Link>
          </div> */}
        </div>
      ) : (
        <div className="w-full max-w-[1184px] py-[80px] px-[20px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="w-full flex flex-col justify-center">
            {/* <h2 className="font-bold text-2xl">No solo somos</h2> */}
            <h1 className="text-2xl md:text-5xl font-bold">
              Welcome to Cantina La Llorona
            </h1>

            {/* <div className="h-2 bg-white w-full rounded"></div> */}

            <p className="text-start sm:text-2xl text-xl text-black">
              A combination of tradition and modernity in a cozy space. Located
              in front of Parque España in the heart of Roma Condesa, we offer a
              <b> unique sensory journey</b>, making each bite and each sip an
              unforgettable symphony of flavors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="">
              <Link href="/menullorona/Alimentos">
                <div className="w-full">
                  <img
                    className="w-full h-[280px]  object-cover rounded"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/IMG_2049.jpg"
                    alt="Tacos y cocteles"
                  />
                </div>
              </Link>
              <Link href="/menullorona/Alimentos" className="mt-4 block">
                <div>
                  <img
                    className="h-[220px] object-cover w-full rounded"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/IMG_2050.jpg"
                    alt="cocteles y tacos"
                  />
                </div>
              </Link>
            </div>
            <div className="w-full grid grid-cols-1">
              <Link href="/menullorona/Alimentos" className="mt-12">
                <div>
                  <img
                    className="h-[220px] object-cover w-full rounded"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/IMG_2046.jpg"
                    alt="tacos y cocteles"
                  />
                </div>
              </Link>

              <Link
                href="/menullorona/Bebidas/Artesanal"
                className="mt-4 block"
              >
                <div>
                  <img
                    className="h-[280px] object-cover w-full rounded"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/IMG_2047.jpg"
                    alt="tacos y cocteles"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* <div
          style={{ display: "flex", justifyContent: "center", marginTop: 30 }}
        >
          <Link href="/reserva">
            <button className="buttonComponente" onClick={handleClick}>
              ¡Reserva ya!
            </button>
          </Link>
        </div> */}
        </div>
      )}
    </>
  );
}

export default QuickInfo;

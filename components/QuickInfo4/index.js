import React from "react";
import title from "../Main/title.module.css";
import { useAppContext } from "../context/Context";
import Link from "next/link";

function QuickInfo4() {
  const { espa } = useAppContext();

  return (
    <>
      {espa ? (
        <div className="overflow-hidden bg-black">
          <div className="flex items-center gap-4 whitespace-nowrap">
            <h1 className="inline-block animate-marqueeleft text-white text-[70px] md:text-[100px] font-bold">
              LOS MEJORES MEZCALES ESTAN AQUI
            </h1>
            <h1 className="animate-marqueeleft inline-block text-[#3eeb91] text-[70px] md:text-[100px] font-bold  ">
              LOS MEJORES MEZCALES ESTAN AQUI
            </h1>
          </div>
          <div className="bg-black py-[50px]">
            <div className="mx-auto max-w-[1184px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8">
              <Link href="/reserva">
                <div>
                  <img
                    className="w-full object-cover h-[400px]"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/mezcalArtesanalllorona.jpg"
                    alt="mezcales oaxaca"
                  />
                </div>
              </Link>

              <Link href="/reserva">
                <div>
                  <img
                    className="w-full object-cover h-[400px]"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/mezcales+artesanales+de+oaxaca+cdmx.jpg"
                    alt="mezcales oaxaca"
                  />
                </div>
              </Link>
              <Link href="/reserva">
                <div>
                  <img
                    className="w-full object-cover h-[400px]"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/mezcales+con+sabor+unico+traidos+directamente+de+oaxaca.jpg"
                    alt="mezcales oaxaca"
                  />
                </div>
              </Link>
              <Link href="/menullorona/Bebidas/Artesanal">
                <div>
                  <img
                    className="w-full object-cover h-[400px]"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/sotoles+bacanoras+mezcales+en+cdmx+unicos.jpg"
                    alt="mezcales oaxaca"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden bg-black">
          <div className="flex items-center gap-4 whitespace-nowrap">
            <h1 className="inline-block animate-marqueeleft text-white text-[70px] md:text-[100px] font-bold">
              The best mezcals are here
            </h1>
            <h1 className="animate-marqueeleft inline-block text-[#3eeb91] text-[70px] md:text-[100px] font-bold">
              The best mezcals are here
            </h1>
          </div>
          <div className="bg-black py-[50px]">
            <div className="mx-auto max-w-[1184px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8">
              <Link href="/reserva">
                <div>
                  <img
                    className="w-full object-cover h-[400px]"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/mezcalArtesanalllorona.jpg"
                    alt="mezcales oaxaca"
                  />
                </div>
              </Link>

              <Link href="/reserva">
                <div>
                  <img
                    className="w-full object-cover h-[400px]"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/mezcales+artesanales+de+oaxaca+cdmx.jpg"
                    alt="mezcales oaxaca"
                  />
                </div>
              </Link>
              <Link href="/reserva">
                <div>
                  <img
                    className="w-full object-cover h-[400px]"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/mezcales+con+sabor+unico+traidos+directamente+de+oaxaca.jpg"
                    alt="mezcales oaxaca"
                  />
                </div>
              </Link>
              <Link href="/menullorona/Bebidas/Artesanal">
                <div>
                  <img
                    className="w-full object-cover h-[400px]"
                    src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/inicio/sotoles+bacanoras+mezcales+en+cdmx+unicos.jpg"
                    alt="mezcales oaxaca"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuickInfo4;

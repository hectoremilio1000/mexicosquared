import Link from 'next/link';
import React, { useState } from 'react'
import title from "../Main/title.module.css"
import card from "../Main/card.module.css"
import { useAppContext } from '../context/Context';



function QuickInfo2() {

  const { espa } = useAppContext();

  return (
    <>
      {espa ? <div className="container-llorona px-2">
        <div>
          <h1 className={title.fontTitlemain}>Cultura Llorona</h1>
        </div>
        <div>
          <h4 className={title.fontTitleSub}>Nuestras</h4>
          <h2 className={title.fontTitleline}>Raíces</h2>
          <div className="linea1"></div>
        </div>

        <div className="py-3 px-3 row-qh">
          <p className="text-center sm:text-2xl text-xl text-black">
            Inmérsete en la cultura mexicana con la propuesta de la <b>Llorona que es única y original</b>, prueba nuestra amplia selección de <b>Cervezas artesanales mexicanas</b> provenientes de diferentes partes de México, desde el Norte hasta el Sur.
            También disfruta de nuestra mixología de autor creada por los mejores mixólogos de México que nos deleitan con sabores con <b>Aguacate en nuestro Famoso Martiní de aguacate con Mezcal</b>, o nuestro singular <b>Burrito Mexicano</b> que es una modificación al coctel Moscow Mule pero con cerveza mexicana y Vodka de tamarindo.
          </p>
        </div>
        <div
          style={{ gap: "20px", display: "flex", justifyContent: "center", flexWrap: "wrap" }}
          className='mx-1'
        >
          <Link href="/menullorona/Alimentos">
            <div>
              <img
                className="iconoAbajoTexto1Home"
                src="https://imagenesrutalab.s3.amazonaws.com/llorona/iconos/bol.png"
                alt="menú alimentos"
              />
              <p className="textoFotosHome text-black">Menú Alimentos</p>
            </div>
          </Link>
          <Link href="/menullorona/Bebidas/Artesanal">
            <div>
              <img
                className="iconoAbajoTexto1Home"
                src="https://imagenesrutalab.s3.amazonaws.com/llorona/iconos/tequila.png"
                alt="Pierde Almas con Mezcal"
              />
              <p className="textoFotosHome text-black">Mixología Artesanal</p>
            </div>
          </Link>
          <Link href="/menullorona/Bebidas/Artesanal">
            <div>
              <img
                className="iconoAbajoTexto1Home"
                src="https://imagenesrutalab.s3.amazonaws.com/llorona/iconos/mezcal.png"
                alt="Mezcales y Pulque Artesanal"
              />
              <p className="textoFotosHome text-black">
                Mezcales & Sotoles
                <br />
                Artesanales
              </p>
            </div>
          </Link>
          <Link href="/menullorona/Bebidas/Artesanal">
            <div>
              <img
                className="iconoAbajoTexto1Home"
                src="https://imagenesrutalab.s3.amazonaws.com/llorona/iconos/cerveza+(1).png"
                alt="Cervezas Artesanales"
              />
              <p className="textoFotosHome text-black">
                Cerveza Artesanal
                <br />
                Mexicana
              </p>
            </div>
          </Link>
          <Link href="/menullorona/Bebidas/Industrial">
            <div>
              <img
                className="iconoAbajoTexto1Home"
                src="https://imagenesrutalab.s3.amazonaws.com/llorona/iconos/whisky.png"
                alt="Destilados"
              />
              <p className="textoFotosHome text-black">Destilados</p>
            </div>
          </Link>
          <Link href="/menullorona/Bebidas/Industrial">
            <div>
              <img
                className="iconoAbajoTexto1Home"
                src="https://imagenesrutalab.s3.amazonaws.com/llorona/iconos/taza-de-cafe.png"
                alt="Pierde Almas con Mezcal"
              />
              <p className="textoFotosHome text-black">
                Café, Sodas <br /> y Cervezas Industriales
              </p>
            </div>
          </Link>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }} className="py-3">
          <Link href="/reserva">
            <button type="button" className="buttonComponente focus:outline-none text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              ¡Reserva ya!
            </button>
          </Link>
        </div>
      </div> : <div className="container-llorona px-2">
        <div>
          <h1 className={title.fontTitlemain}>Llorona's Culture</h1>
        </div>
        <div>
          <h4 className={title.fontTitleSub}>Nuestras</h4>
          <h2 className={title.fontTitleline}>Raíces</h2>
          <div className="linea1"></div>
        </div>

        <div className="py-3 px-3 row-qh">
          <p className="text-center sm:text-2xl text-xl text-black">
            If you're looking to explore a wide selection of <b>Mexican craft beers </b> or indulge in mixology with Mexican flavors featuring Mezcal and Tequila, this is the place to be. Enjoy our <b>Avocado Martini or Mazapan Martini </b>, or try some of our cocktails made with Pulque, an ancient Mexican beverage. Experience the fusion of tradition and innovation in every sip!
          </p>
        </div>
        <div
            style={{ gap: "20px", display: "flex", justifyContent: "center", flexWrap: "wrap", marginRight: 20, marginLeft: 10, }}
        >
          <Link href="/menullorona/Alimentos">
            <div>
              <img
                className="iconoAbajoTexto1Home"
                src="https://imagenesrutalab.s3.amazonaws.com/llorona/iconos/bol.png"
                  alt="food menu"
              />
                <p className="textoFotosHome text-black">Food menu</p>
            </div>
          </Link>
          <Link href="/menullorona/Bebidas/Artesanal">
            <div>
              <img
                className="iconoAbajoTexto1Home"
                src="https://imagenesrutalab.s3.amazonaws.com/llorona/iconos/tequila.png"
                  alt="Artisan Mixology"
              />
                <p className="textoFotosHome text-black">Artisan Mixology</p>
            </div>
          </Link>
          <Link href="/menullorona/Bebidas/Artesanal">
            <div>
              <img
                className="iconoAbajoTexto1Home"
                src="https://imagenesrutalab.s3.amazonaws.com/llorona/iconos/mezcal.png"
                  alt="Mezcales & Sotoles Handmade"
              />
              <p className="textoFotosHome text-black">
                  Mezcales & Sotoles
                  <br />
                  handmade
              </p>
            </div>
          </Link>
          <Link href="/menullorona/Bebidas/Artesanal">
            <div>
              <img
                className="iconoAbajoTexto1Home"
                src="https://imagenesrutalab.s3.amazonaws.com/llorona/iconos/cerveza+(1).png"
                  alt="Mexican Craft Beer "
              />
              <p className="textoFotosHome text-black">
                  Craft Beer
                  <br />
                  mexican
              </p>
            </div>
          </Link>
          <Link href="/menullorona/Bebidas/Industrial">
            <div>
              <img
                className="iconoAbajoTexto1Home"
                src="https://imagenesrutalab.s3.amazonaws.com/llorona/iconos/whisky.png"
                  alt="Distillates"
              />
                <p className="textoFotosHome text-black">Distillates</p>
            </div>
          </Link>
          <Link href="/menullorona/Bebidas/Industrial">
            <div>
              <img
                className="iconoAbajoTexto1Home"
                src="https://imagenesrutalab.s3.amazonaws.com/llorona/iconos/taza-de-cafe.png"
                  alt="Coffee, Sodas and Industrial Beers"
              />
              <p className="textoFotosHome text-black">
                  Coffee, Sodas <br /> and Industrial Beers
              </p>
            </div>
          </Link>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }} className="py-3">
          <Link href="/reserva">
            <button type="button" className="buttonComponente focus:outline-none text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              ¡Book Now!
            </button>
          </Link>
        </div>
      </div>}
    </>

  );
}

export default QuickInfo2
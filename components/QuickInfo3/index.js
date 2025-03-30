import Link from 'next/link';
import React from 'react'
import title from "../Main/title.module.css"
import { useAppContext } from '../context/Context';
import YouTube from 'react-youtube';


function QuickInfo3() {

  const opts = {
    height: '300',
    width: '200',

 
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,  // Auto-play the video on load,
 
    },
  };

  const videoOnReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const { espa } = useAppContext();

  return (
    <>
      {espa ? <div className="container-llorona px-2 py-2">
        <div>
          <h1 className="text-center text-3xl md:text-4xl uppercase font-black">Grupos de salsa en vivo</h1>
        </div>
        <div>
          <h4 className={title.fontTitleSub}>Buen Son y Sazón</h4>
          <h2 className={title.fontTitleline}>para todo Corazón</h2>
          <div className="linea"></div>
        </div>

        <div className="row-qh py-3 px-3">
          <p className="text-center sm:text-2xl text-xl text-black">
            Ven a nuestro restaurante y disfruta con nuestros diferentes grupos que tenemos para ti de <b>Música en vivo</b>. Prepárate para sumergirte en el vibrante ritmo de los tambores con nuestros diferentes grupos de <b>Salsa en Vivo</b>, el brillo del trombón y el encanto melódico del piano, todo mientras disfrutas de nuestras delicias culinarias.
            <br />
            Es la combinación perfecta para una noche mágica: platos exquisitos y música cautivadora que te invitará a bailar. Así que trae tu espíritu alegre, tu apetito y tus zapatos de baile, ¡y únete a nosotros para una noche llena de sabor, música y diversión! No hay mejor lugar para disfrutar de la auténtica esencia de la salsa. Te esperamos con los brazos y el corazón abiertos.
          </p>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" }}
        >
          
          <div>
            <YouTube videoId="NEuu3WR1uYo" opts={opts} onReady={videoOnReady} />
            
          
          <p className="textoFotosHome text-black">
              Son Cubano 
              <br />
              en Vivo
            </p>
            </div>

          <Link href="/reserva">
            <div>
              <img
                className="imagen2AbajoTexto1Home"
                src="https://imagenesrutalab.s3.amazonaws.com/llorona/cumple/ninas4pinata.JPG"
                alt="Música en vivo"
              />
              <p className="textoFotosHome text-black">
                Festeja con
                <br />
                Música en Vivo
              </p>
            </div>
          </Link>
          <Link href="/reserva">
            <div>
              <img
                className="imagen2AbajoTexto1Home"
                src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/festejo+cantina+llorona+salsa+baile.jpg"
                alt="Baila en grande con tus amigos"
              />
              <p className="textoFotosHome text-black">
                Festeja y Baila <br />
                con tus amigos
              </p>
            </div>
          </Link>
          <Link href="/menullorona/Bebidas/Artesanal">
            <div>
              <img
                className="imagen2AbajoTexto1Home"
                src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/niurka+cantina+la+llorona+festejo.jpg"
              />
              <p className="textoFotosHome text-black">
                Baila y disfruta
                <br />
                con grandes Artistas
                <br />Niurka
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
      </div> : <div className="container-llorona px-2 py-2">
        <div>
          <h1 className="text-center text-3xl md:text-4xl uppercase font-black">Salsa Live</h1>
        </div>
        <div>
            <h4 className={title.fontTitleSub}>Dance Salsa</h4>
            <h2 className={title.fontTitleline}>With Us</h2>
          <div className="linea"></div>
        </div>

        <div className="row-qh py-3 px-3">
          <p className="text-center sm:text-2xl text-xl text-black">
              Come to our restaurant and enjoy the various live music bands we have for you. Prepare to immerse yourself in the vibrant rhythm of the drums with our various live <b>Salsa bands</b>, the shimmer of the trombone, and the melodic charm of the piano, all while savoring our culinary delights.
<br/>
              It's the perfect combination for a magical night: exquisite dishes and captivating music that will invite you to <b>dance Salsa </b>with us. So bring your cheerful spirit, your appetite, and your dancing shoes, and join us for a night full of flavor, music, and fun! There's no better place to enjoy the authentic essence of salsa. We await you with open arms and hearts.
          </p>
        </div>
          <div
            style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" }}
          >

            <div>
            <YouTube videoId="NEuu3WR1uYo" opts={opts} onReady={videoOnReady} />

              <p className="textoFotosHome text-black">
                Live Cuban <br/>salsa groups.
              </p>
            </div>

            <Link href="/reserva">
              <div>
                <img
                  className="imagen2AbajoTexto1Home"
                  src="https://imagenesrutalab.s3.amazonaws.com/llorona/cumple/ninas4pinata.JPG"
                  alt="Música en vivo"
                />
                <p className="textoFotosHome text-black">
                  We love food and <br/>salsa bands.
                </p>
              </div>
            </Link>
            <Link href="/reserva">
              <div>
                <img
                  className="imagen2AbajoTexto1Home"
                  src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/festejo+cantina+llorona+salsa+baile.jpg"
                  alt="Baila en grande con tus amigos"
                />
                <p className="textoFotosHome text-black">
                  Come dance with <br/>your friends.
                </p>
              </div>
            </Link>
            <Link href="/menullorona/Bebidas/Artesanal">
              <div>
                <img
                  className="imagen2AbajoTexto1Home"
                  src="https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/niurka+cantina+la+llorona+festejo.jpg"
                />
                <p className="textoFotosHome text-black">
                  Dance and enjoy with great <br/>artists, including Niurka
                </p>
              </div>
            </Link>
          </div>

        <div style={{ display: "flex", justifyContent: "center" }} className="py-3">
          <Link href="/reserva">
            <button type="button" className="buttonComponente focus:outline-none text-white bg-green-400 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              ¡Book now!
            </button>
          </Link>
        </div>
      </div>}
    </>
   
  );
}

export default QuickInfo3
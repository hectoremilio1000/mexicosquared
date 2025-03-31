import React from "react";
import NavBar from "../components/NavBarBlack/NavBarEs";
import { InlineWidget } from "react-calendly";
import { Button } from "antd";

function Contacto() {
  return (
    <>
      <NavBar />
      <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-36 md:pt-36">
        {/* Encabezado principal */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 text-center">
          ¡Hablemos de tus ideas de software!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl text-center mb-8">
          En <strong>GROWTHSUITE</strong> nos apasiona convertir tus proyectos
          en grandes realidades digitales. Ya sea que busques desarrollar
          aplicaciones web, integrar sistemas de inteligencia artificial o
          mejorar tus procesos con tecnología de vanguardia, estamos aquí para
          ayudarte.
        </p>

        {/* Datos de ubicación */}
        <div className="text-center max-w-2xl mb-8">
          <p className="text-lg md:text-xl text-gray-700 mb-2">
            Visítanos en nuestra oficina ubicada en:
          </p>
          <p className="text-md md:text-lg text-gray-600">
            <strong>AV. BAJA CALIFORNIA #275,</strong>
            <br />
            Colonia Hipódromo Condesa, C.P. 06170
          </p>
        </div>

        {/* Botón de WhatsApp */}
        <div className="mb-8 text-center">
          <p className="text-lg md:text-xl text-gray-700 font-semibold mb-4">
            ¿Prefieres hablarnos o enviarnos un WhatsApp?
          </p>
          <Button
            type="primary"
            shape="round"
            size="large"
            className="bg-green-500 hover:bg-green-600 border-none"
          >
            <a
              href="https://wa.me/525531491808"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-md md:text-lg"
            >
              Contáctanos al +52 55 3149 1808
            </a>
          </Button>
        </div>

        {/* Mapa de Google Maps */}
        <div className="w-full max-w-4xl mb-12">
          <iframe
            title="Ubicación GrowthSuite"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.0430761299645!2d-99.17036248509837!3d19.406244046355726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff424bc50cbd%3A0x0!2sAv%20Baja%20California%20275%2C%20Hip%C3%B3dromo%2C%2006170%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1684246078984!5m2!1ses-419!2smx"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Calendly para agendar citas */}
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Agenda una reunión con nosotros
          </h2>
          <p className="text-md md:text-lg text-gray-600 text-center mb-4">
            ¡Conversemos sobre las necesidades de tu negocio y cómo
            <strong> growthsuite</strong> puede ayudarte a crecer con soluciones
            tecnológicas a la medida!
          </p>
          <InlineWidget url="https://calendly.com/clientes-impulsorestaurantero/30min" />
        </div>
      </div>
    </>
  );
}

export default Contacto;

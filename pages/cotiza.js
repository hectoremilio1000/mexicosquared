import React from "react";
import NavBar from "../components/NavBarBlack/NavBarEs";
import { InlineWidget } from "react-calendly";
import { Button } from "antd";

function Cotiza() {
  return (
    <>
      <NavBar />
      <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
        {/* Sección de Presentación */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 text-center">
          ¡Hablemos de tus ideas de software!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl text-center mb-8">
          En <strong>GROWTHSUITE</strong>, nos apasiona convertir tus proyectos
          en realidades digitales de forma rápida y a precios muy accesibles.
          Desde páginas web hasta chatbots inteligentes, e-commerce y más,
          tenemos un plan para cada necesidad y presupuesto.
        </p>

        {/* Sección de Planes / Paquetes */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Plan 1: Página Web Básica */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Página Web Básica</h2>
            <p className="text-md text-gray-600 mb-4 text-center">
              Ideal para negocios que inician su presencia en línea. Te
              entregamos un sitio profesional y listo en tan solo 7 días.
            </p>
            <ul className="mb-4 text-sm text-gray-700 list-disc list-inside">
              <li>1-3 secciones principales</li>
              <li>Diseño responsivo</li>
              <li>Dominio y hosting gratuito (1er año)</li>
              <li>Integración a redes sociales</li>
            </ul>
            <p className="text-2xl font-extrabold text-primary mb-4">
              $3,999 MXN
            </p>
            {/* Botón que abre WhatsApp con texto específico */}
            <Button
              type="primary"
              shape="round"
              size="large"
              className="bg-green-500 hover:bg-green-600 border-none"
            >
              <a
                href="https://wa.me/525531491808?text=Hola%20quiero%20contratar%20la%20Página%20Web%20Básica%20con%20ustedes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-md md:text-lg"
              >
                Contratar
              </a>
            </Button>
          </div>

          {/* Plan 2: Chatbot IA Express */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Chatbot IA Express</h2>
            <p className="text-md text-gray-600 mb-4 text-center">
              Implementa un chatbot inteligente que responda 24/7 y mejore la
              atención a tus clientes. ¡Lo configuramos en 5 días!
            </p>
            <ul className="mb-4 text-sm text-gray-700 list-disc list-inside">
              <li>Procesamiento de Lenguaje Natural</li>
              <li>Base de conocimientos personalizable</li>
              <li>Integración a tu sitio web o Facebook</li>
              <li>Soporte básico post-instalación</li>
            </ul>
            <p className="text-2xl font-extrabold text-primary mb-4">
              $2,999 MXN
            </p>
            <Button
              type="primary"
              shape="round"
              size="large"
              className="bg-green-500 hover:bg-green-600 border-none"
            >
              <a
                href="https://wa.me/525531491808?text=Hola%20quiero%20contratar%20el%20Chatbot%20IA%20Express"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-md md:text-lg"
              >
                Contratar
              </a>
            </Button>
          </div>

          {/* Plan 3: E-commerce Económico */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">E-commerce Económico</h2>
            <p className="text-md text-gray-600 mb-4 text-center">
              Vende tus productos en línea con una plataforma segura y fácil de
              administrar. Listo para usar en 10 días.
            </p>
            <ul className="mb-4 text-sm text-gray-700 list-disc list-inside">
              <li>Hasta 50 productos iniciales</li>
              <li>Pasarela de pago integrada</li>
              <li>Panel de administración sencillo</li>
              <li>Optimización SEO básica</li>
            </ul>
            <p className="text-2xl font-extrabold text-primary mb-4">
              $4,999 MXN
            </p>
            <Button
              type="primary"
              shape="round"
              size="large"
              className="bg-green-500 hover:bg-green-600 border-none"
            >
              <a
                href="https://wa.me/525531491808?text=Hola%20quiero%20contratar%20el%20E-commerce%20Económico"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-md md:text-lg"
              >
                Contratar
              </a>
            </Button>
          </div>
        </div>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Plan 4: Web + Chatbot IA */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Web + Chatbot IA</h2>
            <p className="text-md text-gray-600 mb-4 text-center">
              Lanza una página web y un chatbot inteligente, ambos listos en un
              tiempo récord de 10 días, con un precio más accesible.
            </p>
            <ul className="mb-4 text-sm text-gray-700 list-disc list-inside">
              <li>Página web básica</li>
              <li>Diseño responsivo</li>
              <li>Chatbot IA 24/7</li>
              <li>Soporte inicial 1 mes</li>
            </ul>
            <p className="text-2xl font-extrabold text-primary mb-4">
              $5,999 MXN
            </p>
            <Button
              type="primary"
              shape="round"
              size="large"
              className="bg-green-500 hover:bg-green-600 border-none"
            >
              <a
                href="https://wa.me/525531491808?text=Hola%20quiero%20contratar%20el%20plan%20Web%20%2B%20Chatbot%20IA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-md md:text-lg"
              >
                Contratar
              </a>
            </Button>
          </div>

          {/* Plan 5: App Móvil Rápida */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">App Móvil Rápida</h2>
            <p className="text-md text-gray-600 mb-4 text-center">
              ¿Necesitas una aplicación para Android o iOS? Te ofrecemos una
              versión funcional para validar tu idea en 14 días.
            </p>
            <ul className="mb-4 text-sm text-gray-700 list-disc list-inside">
              <li>Prototipo funcional</li>
              <li>Hasta 5 pantallas clave</li>
              <li>Integración a servicios básicos</li>
              <li>Enfoque MVP (Producto Mínimo Viable)</li>
            </ul>
            <p className="text-2xl font-extrabold text-primary mb-4">
              $6,999 MXN
            </p>
            <Button
              type="primary"
              shape="round"
              size="large"
              className="bg-green-500 hover:bg-green-600 border-none"
            >
              <a
                href="https://wa.me/525531491808?text=Hola%20quiero%20contratar%20App%20Móvil%20Rápida"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-md md:text-lg"
              >
                Contratar
              </a>
            </Button>
          </div>

          {/* Plan 6: Integraciones Marketplace */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-center">
              Integraciones Marketplace
            </h2>
            <p className="text-md text-gray-600 mb-4 text-center">
              Vende en plataformas como Mercado Libre o Amazon integrando tu
              stock y pedidos sin complicaciones, en solo 7 días.
            </p>
            <ul className="mb-4 text-sm text-gray-700 list-disc list-inside">
              <li>Sincronización de inventario</li>
              <li>Notificaciones de venta en tiempo real</li>
              <li>Reporte básico de ventas</li>
              <li>Automatización de confirmaciones de envío</li>
            </ul>
            <p className="text-2xl font-extrabold text-primary mb-4">
              $3,499 MXN
            </p>
            <Button
              type="primary"
              shape="round"
              size="large"
              className="bg-green-500 hover:bg-green-600 border-none"
            >
              <a
                href="https://wa.me/525531491808?text=Hola%20quiero%20contratar%20Integraciones%20Marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-md md:text-lg"
              >
                Contratar
              </a>
            </Button>
          </div>
        </div>

        {/* CTA adicional */}
        <div className="text-center mb-12 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¿No encuentras el plan que se ajuste a lo que buscas?
          </h2>
          <p className="text-md md:text-lg text-gray-600 mb-4">
            Podemos crear un proyecto a la medida. Cuéntanos tus necesidades y
            te propondremos la solución ideal a un precio sumamente accesible.
          </p>
          <Button
            type="primary"
            shape="round"
            size="large"
            className="bg-green-500 hover:bg-green-600 border-none"
          >
            <a
              href="https://wa.me/525531491808?text=Hola%20estoy%20buscando%20un%20proyecto%20a%20la%20medida%20con%20ustedes"
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

export default Cotiza;

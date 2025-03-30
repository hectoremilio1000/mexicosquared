import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppContext } from "../components/context/Context";
import * as fbq from "../lib/fpixel"; // si usas Facebook Pixel
import dynamic from "next/dynamic";
import Link from "next/link";
import axios from "axios";

// Componentes que ya tienes
import NavBar from "../components/NavBarEs/NavBarEs";
import CasosEstudio from "../components/CasosEstudio";
import CasosExitosos from "../components/CasosExitosos";

import About from "../components/About";

import WhatsappButton from "../components/WhatsappButton";

// Importa estilos

import { InlineWidget } from "react-calendly";
import { Button } from "antd";

// Carga perezosa (sin SSR) para el Swiper
const MySwiper = dynamic(() => import("../components/SwiperPrueba"), {
  ssr: false,
});

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { ingles, espa } = useAppContext();
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Abre/cierra modal
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Validar formulario
  const validateForm = (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const whatsappRegex = /^[0-9]{10}$/;
    const fieldErrors = {};

    if (!data.first_name) {
      fieldErrors.first_name = "Por favor, ingresa tu nombre.";
    }
    if (!data.last_name) {
      fieldErrors.last_name = "Por favor, ingresa tu apellido.";
    }
    if (!emailRegex.test(data.email)) {
      fieldErrors.email = "Por favor, ingresa un correo electrónico válido.";
    }
    if (!whatsappRegex.test(data.whatsapp)) {
      fieldErrors.whatsapp =
        "Por favor, ingresa un número de WhatsApp válido (10 dígitos).";
    }

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  // Manejo del envío del form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage("");
    setAlertType("");
    setErrors({});

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (!validateForm(data)) {
      setAlertMessage("Por favor, corrige los errores en el formulario.");
      setAlertType("error");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/prospectsmeeting`, data);
      if (response.status === 200) {
        alert("¡Información enviada!");
        e.target.reset();
        toggleModal();
      } else {
        alert("¡Información enviada!");
        e.target.reset();
        toggleModal();
      }
    } catch (error) {
      console.error(
        "Error al enviar el formulario:",
        error.response?.data || error.message
      );
      setAlertMessage(
        "Hubo un error al enviar tu información. Por favor, intenta de nuevo."
      );
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* HEAD con meta tags */}
      {espa ? (
        <Head>
          <title>GrowthSuite | Desarrollo de Software a la Medida</title>
          <link rel="icon" href="../favicon.ico" />
          <meta
            name="description"
            content="Expertos en desarrollo de software, apps móviles y soluciones POS."
          />
          <meta property="og:title" content="GrowthSuite" />
          <meta
            property="og:description"
            content="Expertos en desarrollo de software y POS para negocios."
          />
          <meta property="og:url" content="https://www.growthsuite.com/" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/logo/logoSoloImpulsoRestaurantero.png"
          />
        </Head>
      ) : (
        // Versión en inglés (opcional)
        <Head>
          <title>GrowthSuite | Custom Software Development</title>
          <link rel="icon" href="../favicon.ico" />
          <meta
            name="description"
            content="We create custom software, mobile apps, and POS solutions for businesses."
          />
          <meta property="og:title" content="GrowthSuite" />
          <meta
            property="og:description"
            content="We develop software solutions for businesses worldwide."
          />
          <meta property="og:url" content="https://www.growthsuite.com/" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/logo/logoSoloImpulsoRestaurantero.png"
          />
        </Head>
      )}

      <NavBar />

      {espa ? (
        <>
          {/* Banner principal con Swiper */}
          <MySwiper className="pt-4" />

          <div className="justify-center bg-black w-full section-info-banner">
            <div className="max-w-[90%] mx-auto flex-col md:flex-row flex overflow-hidden items-center px-6">
              {/* <div className="justify-center max-w-[100%] md:justify-start flex self-center items-center mx-auto">
                <h1 className="title3-tw text-principal mt-[4px] text-center md:text-start text-white">
                  <span className="title3-tw">
                    15 DÍAS PARA IMPULSAR TU PROYECTO DE SOFTWARE
                  </span>{" "}
                  <br />
                  <span className="title3-tw text-[#fff]">SESIONES ONLINE</span>
                  <br />
                  <span className="span4-tw">
                    SOLO 15 EMPRESAS SERÁN SELECCIONADAS PARA RECIBIR ASESORÍA
                    PERSONALIZADA
                  </span>
                </h1>
              </div> */}

              {/* <div className="justify-center max-w-[100%] md:justify-start flex self-center items-center mx-auto py-2">
                <button className={styles.button4} onClick={toggleModal}>
                  ¡SOLICITAR UNA REUNIÓN!
                </button>

                {isModalOpen && (
                  <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                      <div className={styles.modalHeader}>
                        <h2>Agenda tu Sesión Gratuita</h2>
                        <button
                          className={styles.closeModal}
                          onClick={toggleModal}
                        >
                          &times;
                        </button>
                      </div>
                      <div className={styles.modalBody}>
                        {alertMessage && (
                          <div
                            className={`${styles.alert} ${
                              alertType === "error"
                                ? styles.alertError
                                : styles.alertSuccess
                            }`}
                          >
                            {alertMessage}
                          </div>
                        )}
                        {loading ? (
                          <div className="flex flex-col items-center justify-center space-y-4 my-4">
                            <div className="animate-spin w-16 h-16 border-4 border-[#FFD700] border-t-transparent rounded-full"></div>
                            <p className="text-xl font-semibold text-yellow-300">
                              Enviando información, por favor espera...
                            </p>
                          </div>
                        ) : (
                          <form id="customForm" onSubmit={handleFormSubmit}>
                            <div>
                              <label htmlFor="first_name"></label>
                              <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                placeholder="Nombre(s) completo"
                                className={styles.hsInput}
                              />
                              {errors.first_name && (
                                <span className={styles.errorText}>
                                  {errors.first_name}
                                </span>
                              )}
                            </div>
                            <div>
                              <label htmlFor="last_name"></label>
                              <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                placeholder="Apellido(s) completo"
                                className={styles.hsInput}
                              />
                              {errors.last_name && (
                                <span className={styles.errorText}>
                                  {errors.last_name}
                                </span>
                              )}
                            </div>
                            <div>
                              <label htmlFor="email"></label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Correo electrónico"
                                className={styles.hsInput}
                              />
                              {errors.email && (
                                <span className={styles.errorText}>
                                  {errors.email}
                                </span>
                              )}
                            </div>
                            <div>
                              <label htmlFor="whatsapp"></label>
                              <input
                                type="tel"
                                id="whatsapp"
                                name="whatsapp"
                                placeholder="Número de WhatsApp (10 dígitos)"
                                pattern="[0-9]{10}"
                                className={styles.hsInput}
                              />
                              {errors.whatsapp && (
                                <span className={styles.errorText}>
                                  {errors.whatsapp}
                                </span>
                              )}
                            </div>
                            <input
                              type="hidden"
                              name="origin"
                              value="asesoriaSoftware"
                            />
                            <input type="hidden" name="status" value="creado" />

                            <div>
                              <button type="submit" className={styles.hsSubmit}>
                                Quiero mi Sesión Gratis
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                )}
             
              </div> */}
            </div>
          </div>

          {/* <div id="section-clientes" className="overflow-hidden">
            <div className="max-w-[90%] mx-auto bg-black rounded-b-[25px] flex items-center pt-[13px] pb-[18px] px-[30px]">
              <div className="flex w-[95%] justify-between">
               
                <img
                  src="https://via.placeholder.com/120x50"
                  alt="Cliente1"
                  className="h-6 md:h-10 px-2"
                />
                <img
                  src="https://via.placeholder.com/120x50"
                  alt="Cliente2"
                  className="h-6 md:h-10"
                />
                <img
                  src="https://via.placeholder.com/120x50"
                  alt="Cliente3"
                  className="h-8 md:h-10"
                />
                <img
                  src="https://via.placeholder.com/120x50"
                  alt="Cliente4"
                  className="h-10 md:h-12"
                />
                <img
                  src="https://via.placeholder.com/120x50"
                  alt="Cliente5"
                  className="h-10 md:h-12"
                />
              </div>
            </div>
          </div> */}

          {/* Sección “Casos de Estudio” (si ya tienes) */}
          <CasosEstudio />

          {/* Calendly, si lo requieres */}
          <div className="w-full">
            <InlineWidget url="https://calendly.com/clientes-impulsorestaurantero/30min" />
          </div>

          {/* About (adaptado a tu info de GrowthSuite) */}
          <About />

          {/* CasosExitosos => sección con ejemplos de software (renombra si quieres) */}
          <CasosExitosos />

          {/* Banner final con overlay */}
          <div
            style={{
              backgroundImage:
                "url('https://imagenesrutalab.s3.us-east-1.amazonaws.com/growthsuite/CASOSEXITOSOS/GROWTHIA.jpg')",
              backgroundPosition: "50%",
              backgroundSize: "cover",
            }}
            className="relative flex flex-col items-center justify-center md:pt-[240px] pb-[58px] md:pb-[126px] px-2"
          >
            <div className="absolute inset-0 bg-black opacity-80"></div>
            <div className="relative z-10 max-w-[500px] mx-auto heading-block flex flex-col justify-center items-center mb-16 mt-16 md:mt-0">
              {/* <img
                src="https://via.placeholder.com/200x200"
                loading="lazy"
                alt="GrowthSuite Software"
              /> */}
              <h2 className="title2-tw text-center uppercase mb-4 text-white">
                RESULTADOS REALES <br /> EN PROYECTOS <br /> DE SOFTWARE
              </h2>
              <p
                className="parrafo-tw text-center mb-4 paragraph cn"
                style={{ color: "white" }}
              >
                En GrowthSuite hemos impulsado a cientos de empresas con
                nuestros desarrollos. ¿Listo para el siguiente nivel?
              </p>

              <div className="flex justify-center">
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  className="
      mt-2
      !bg-[#FFD700]
      !text-[#007bff]
      !border-none
      !rounded-[14px]
      !px-[1.8em]
      !py-[1.2em]
      !text-[1.42em]
      !leading-[1.2em]
      !font-bold
      tracking-[0.025em]
      transition-shadow
      duration-300
      shadow-[0_7px_80px_-12px_rgba(0,0,0,1)]
      hover:shadow-[0_7px_80px_-12px_rgba(0,0,0,0.7)]
    "
                >
                  <a
                    href="https://wa.me/5215531491808?text=Hola%20quiero%20un%20software%20exitoso%20con%20growthsuite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline !text-[#007bff]"
                  >
                    DESCUBRE CÓMO LO LOGRAMOS
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Sección de “Razones de Éxito” (opcional) */}
          <div className="flex flex-col items-center justify-center py-16 px-2">
            <div className="heading-block flex flex-col justify-center items-center mb-16">
              <span className="rounded-full bg-secondary text-primary font-semibold px-4 py-2 mb-4">
                SOLUCIONES TECNOLÓGICAS
              </span>
              <h2 className="title2-tw text-center uppercase">
                6 RAZONES PARA <br /> ELEGIR GROWTHSUITE
              </h2>
            </div>
            <div className="max-w-[1050px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                  <span className="inline-block p-4 rounded text-white bg-primary">
                    1
                  </span>
                  <h5 className="text-[12px] md:text-[18px] font-bold">
                    Desarrollos Personalizados
                  </h5>
                  <p className="parrafo-tw paragraph-feature">
                    Nos adaptamos a tus necesidades específicas. No hay dos
                    proyectos iguales.
                  </p>
                </div>
                <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                  <span className="inline-block p-4 rounded text-white bg-primary">
                    2
                  </span>
                  <h5 className="text-[12px] md:text-[18px] font-bold">
                    Equipos Multidisciplinarios
                  </h5>
                  <p className="parrafo-tw paragraph-feature">
                    Contamos con expertos en Frontend, Backend, UX/UI, QA y
                    gestión de proyectos.
                  </p>
                </div>
                <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                  <span className="inline-block p-4 rounded text-white bg-primary">
                    3
                  </span>
                  <h5 className="text-[12px] md:text-[18px] font-bold">
                    Metodologías Ágiles
                  </h5>
                  <p className="parrafo-tw paragraph-feature">
                    Entregas continuas, comunicación clara y retroalimentación
                    constante.
                  </p>
                </div>
                <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                  <span className="inline-block p-4 rounded text-white bg-primary">
                    4
                  </span>
                  <h5 className="text-[12px] md:text-[18px] font-bold">
                    Innovación y AI
                  </h5>
                  <p className="parrafo-tw paragraph-feature">
                    Implementamos soluciones de inteligencia artificial y
                    últimas tendencias.
                  </p>
                </div>
                <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                  <span className="inline-block p-4 rounded text-white bg-primary">
                    5
                  </span>
                  <h5 className="text-[12px] md:text-[18px] font-bold">
                    Soporte y Mantenimiento
                  </h5>
                  <p className="parrafo-tw paragraph-feature">
                    No te dejamos solo: soporte continuo y actualizaciones
                    programadas.
                  </p>
                </div>
                <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                  <span className="inline-block p-4 rounded text-white bg-primary">
                    6
                  </span>
                  <h5 className="text-[12px] md:text-[18px] font-bold">
                    Enfoque en tu Éxito
                  </h5>
                  <p className="parrafo-tw paragraph-feature">
                    Tu crecimiento es nuestra prioridad. Crecemos contigo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ultima sección (CTA final) */}
          <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16">
            <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden h-64 md:h-96">
              <img
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/growthsuite/banner/softwaretumedidagrowth.png"
                alt="Fondo"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 z-10"></div>

              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-20 p-4">
                <span className="rounded-full bg-primary text-white font-semibold px-4 py-2 mb-4 text-sm md:text-lg">
                  ¿LISTO PARA INICIAR TU PROYECTO?
                </span>
                <p className="my-2 text-white px-2 md:px-24 text-center text-base md:text-lg">
                  En GrowthSuite estamos preparados para impulsar tu idea y
                  llevarla al siguiente nivel con tecnología de punta.
                </p>
                <div className="flex justify-center">
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    className="
      mt-2
      !bg-[#FFD700]
      !text-[#007bff]
      !border-none
      !rounded-[14px]
      !px-[1.8em]
      !py-[1.2em]
      !text-[1.42em]
      !leading-[1.2em]
      !font-bold
      tracking-[0.025em]
      transition-shadow
      duration-300
      shadow-[0_7px_80px_-12px_rgba(0,0,0,1)]
      hover:shadow-[0_7px_80px_-12px_rgba(0,0,0,0.7)]
    "
                  >
                    <a
                      href="https://wa.me/5215531491808?text=Hola%20quiero%20un%20software%20exitoso%20con%20growthsuite"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline !text-[#007bff]"
                    >
                      CONTÁCTANOS
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Si no es español, pintamos nada (o tu versión en inglés)
        <></>
      )}

      {/* Botón flotante de WhatsApp */}
      <WhatsappButton />
    </div>
  );
}

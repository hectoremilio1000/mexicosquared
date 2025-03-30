import React, { useState } from "react";
import Head from "next/head";
import NavBar from "../../components/NavBarBlack/NavBarEs";
import styles from "../../components/SwiperPrueba/Banner.module.css"; // Ajusta la ruta de tu CSS según tu proyecto
import axios from "axios";
import Link from "next/link";

function AyudaIA() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // --- Metadatos para <Head> ---
  const headData = {
    title: "Ayuda con IA | Impulso Restaurantero",
    content:
      "Descubre tu visión y estrategia con nuestro cuestionario inteligente impulsado por IA",
    description:
      "Utilizamos un formulario potenciado con IA para ayudarte a definir la visión, misión y plan de acción de tu restaurante, adaptado a tus objetivos.",
    url: "https://www.impulsorestaurantero.com/",
    image:
      "https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/logo/logoSoloImpulsoRestaurantero.png",
  };

  // --- Datos principales de la página ---
  const info = [
    {
      // Sección superior
      titulo1: "Transforma la Visión de tu Negocio con IA",
      parrafo1:
        "Nuestra tecnología, potenciada por Inteligencia Artificial, analiza las respuestas de un cuestionario personalizado para ayudarte a definir una visión clara, misión sólida y un plan de acción para tu restaurante. Todo se ajusta a tus objetivos a corto y mediano plazo.",
      imagen1:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/diagnostico-ia-impulso-restaurantero.jpg",

      // Segunda sección
      titulo2: "Estudio de Mercado Automático",
      parrafo2:
        "¿No sabes por dónde empezar? Nuestro sistema evalúa la información de tu cuestionario y, en tiempo real, te entrega un análisis de mercado, competidores y oportunidades de diferenciación. Con estos datos, podrás crear un concepto único que resuene con tus clientes.",
      imagen2:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/estudio-mercado-ia-impulso-restaurantero.png",

      // Razones
      titulorazones:
        "3 CLAVES DE NUESTRO CUESTIONARIO IMPULSADO POR IA PARA DEFINIR TU NEGOCIO",
      razon1: "1. Visión y Misión Estructuradas",
      parraforazon1:
        "A partir de tus respuestas, nuestro sistema IA crea un borrador de misión y visión alineadas con tu propuesta de valor y el tipo de cliente que deseas atraer.",
      razon2: "2. Análisis de Tendencias",
      parraforazon2:
        "Integramos datos de mercado y tendencias de consumo para que tu concepto sea relevante y competitivo. Nuestros reportes te señalan oportunidades únicas dentro de tu segmento.",
      razon3: "3. Roadmap a Corto y Mediano Plazo",
      parraforazon3:
        "Recibe recomendaciones de acciones clave para los próximos meses y años, como estrategias de marketing, planes de financiamiento y formatos de menú, todo con base en tus objetivos.",

      // Tercera sección
      titulo3: "Casos de Éxito con IA",
      parrafo3:
        "Hemos ayudado a negocios en planeación y restaurantes ya operando a redefinir su rumbo con información real y estrategias accionables. Con nuestra herramienta de IA, podrás trazar un camino seguro hacia el éxito.",
      imagen3:
        "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/festejo+cantina+llorona+salsa+baile.jpg",

      // Último bloque antes del CTA final
      titulo4:
        "¿Listo para impulsar tu restaurante con una visión clara y respaldada por IA? En Impulso Restaurantero hacemos que tus metas sean alcanzables.",
    },
  ];

  // --- ESTADOS para el modal y su formulario (Demo Gratis) ---
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [alertMessage2, setAlertMessage2] = useState("");
  const [alertType2, setAlertType2] = useState("");
  const [errors2, setErrors2] = useState({});
  const [loading2, setLoading2] = useState(false);

  // Abrir/cerrar modal
  const toggleModal2 = () => {
    setIsModalOpen2((prev) => !prev);
  };

  // Validaciones del formulario
  const validateForm2 = (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const whatsappRegex = /^[0-9]{10}$/;
    const fieldErrors = {};

    if (!data.first_name) {
      fieldErrors.first_name = "Por favor, ingresa tu nombre.";
    }
    if (!data.last_name) {
      fieldErrors.last_name = "Por favor, ingresa tu apellido.";
    }
    if (!data.email || !emailRegex.test(data.email)) {
      fieldErrors.email = "Por favor, ingresa un correo electrónico válido.";
    }
    if (!data.whatsapp || !whatsappRegex.test(data.whatsapp)) {
      fieldErrors.whatsapp =
        "Por favor, ingresa un número de WhatsApp válido (10 dígitos).";
    }
    setErrors2(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  // Manejo del submit
  const handleFormSubmit2 = async (e) => {
    e.preventDefault();
    setAlertMessage2("");
    setAlertType2("");
    setErrors2({});

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (!validateForm2(data)) {
      setAlertMessage2("Por favor, corrige los errores en el formulario.");
      setAlertType2("error");
      return;
    }

    try {
      setLoading2(true);
      // Ajusta la URL hacia tu backend
      const response = await axios.post(`${apiUrl}/prospectsmeeting`, data);

      if (response.status === 200) {
        alert("¡Información enviada con éxito!");
        e.target.reset();
        toggleModal2();
      } else {
        alert("¡Información enviada con éxito!");
        e.target.reset();
        toggleModal2();
      }
    } catch (error) {
      console.error(
        "Error al enviar el formulario:",
        error.response?.data || error.message
      );
      setAlertMessage2(
        "Hubo un error al enviar tu información. Por favor, intenta de nuevo."
      );
      setAlertType2("error");
    } finally {
      setLoading2(false);
    }
  };

  return (
    <>
      <Head>
        <title>{headData.title}</title>
        <link rel="icon" href="../favicon.ico" />
        <meta name="of:title" content={headData.content} />
        <meta name="of:description" content={headData.description} />
        <meta property="og:url" content={headData.url} />
        <meta property="og:image" content={headData.image} />
        <link rel="apple-touch-icon" href="../logo192.png" />
        <link rel="manifest" href="../manifest.json" />
      </Head>

      <NavBar />

      {/* CONTENIDO PRINCIPAL */}
      <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
        {/* Encabezado */}
        <div className="text-center max-w-4xl">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {info[0].titulo1}
          </h1>
          <p className="text-gray-600 text-sm md:text-2xl">
            {info[0].parrafo1}
          </p>
        </div>

        {/* Botón para “Demo Gratis” (sección inicial) */}
        <div className="mt-6 mb-4">
          {/* Botón que ABRE el modal */}
          <button className="button-small" onClick={toggleModal2}>
            ¡Quiero mi Diagnóstico IA!
          </button>
        </div>

        {/* Imagen destacada */}
        <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[#e5e5e5] rounded-[1.2em] max-w-xl">
          <img
            className="w-full object-contain"
            src={info[0].imagen1}
            alt="Visión con IA"
          />
        </div>

        {/* Sección 2-col (Estudio de Mercado) */}
        <div className="content grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-36 px-[20px] items-center mt-8">
          <div className="flex flex-col items-center text-center max-w-2xl">
            <h2 className="title3-tw">{info[0].titulo2}</h2>
            <p className="text-gray-600 text-sm md:text-2xl">
              {info[0].parrafo2}
            </p>
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[#e5e5e5] max-w-xl">
            <img
              className="w-full object-contain rounded-[1.2em]"
              src={info[0].imagen2}
              alt="Estudio de Mercado IA"
            />
          </div>
        </div>

        {/* Razones */}
        <div className="flex flex-col items-center justify-center py-16 px-2">
          <div className="heading-block flex flex-col justify-center items-center mb-16">
            <h2 className="title2-tw text-center uppercase">
              {info[0].titulorazones}
            </h2>
          </div>
          <div className="max-w-[1050px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Razón 1 */}
              <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8 rounded">
                <h5 className="text-[14px] md:text-[18px] font-bold">
                  {info[0].razon1}
                </h5>
                <p className="parrafo-tw paragraph-feature">
                  {info[0].parraforazon1}
                </p>
              </div>
              {/* Razón 2 */}
              <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8 rounded">
                <h5 className="text-[14px] md:text-[18px] font-bold">
                  {info[0].razon2}
                </h5>
                <p className="parrafo-tw paragraph-feature">
                  {info[0].parraforazon2}
                </p>
              </div>
              {/* Razón 3 */}
              <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8 rounded">
                <h5 className="text-[14px] md:text-[18px] font-bold">
                  {info[0].razon3}
                </h5>
                <p className="parrafo-tw paragraph-feature">
                  {info[0].parraforazon3}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Otra Sección 2-col (Casos de Éxito) */}
        <div className="content grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-36 px-[20px] items-center">
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[#e5e5e5] max-w-xl">
            <img
              className="w-full object-contain rounded-[1.2em]"
              src={info[0].imagen3}
              alt="Casos de Éxito IA"
            />
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-center p-8 bg-[#fbfbfad9] border-[#e5e5e5] rounded-[1.2em] max-w-2xl">
            <h2 className="title3-tw">{info[0].titulo3}</h2>
            <p className="text-gray-600 text-sm md:text-2xl text-center">
              {info[0].parrafo3}
            </p>
          </div>
        </div>

        {/* Sección final con imagen de fondo (CTA) */}
        <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
          <div className="text-center max-w-4xl mb-4">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight text-center">
              {info[0].titulo4}
            </h1>
          </div>
          <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden h-64 md:h-96">
            {/* Imagen de fondo */}
            <img
              src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/seccion1/restaurant-hall-with-round-table-some-chairs-fireplace-plants1.jpg"
              alt="Fondo IA"
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
            {/* Gradiente superpuesto */}
            <div className="absolute top-0 left-0 w-full h-full bg-opacity-75 bg-black"></div>
            {/* Contenido */}
            <div className="relative z-20 flex flex-col justify-center items-center h-full p-8 text-white">
              <div>
                <div className="mb-8 text-center">
                  <p className="text-4xl font-bold text-white">
                    15 días gratis
                  </p>
                  <p className="text-lg text-gray-300">Sin compromisos</p>
                </div>
              </div>
              {/* Botón que ABRE el modal */}
              <button className="button-small" onClick={toggleModal2}>
                ¡Comencemos!
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL con Formulario de “Diagnóstico IA” */}
      {isModalOpen2 && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Obtén tu diagnóstico con IA</h2>
              <button className={styles.closeModal} onClick={toggleModal2}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              {/* Alerta global si existe alertMessage2 */}
              {alertMessage2 && (
                <div
                  className={`${styles.alert} ${
                    alertType2 === "error"
                      ? styles.alertError
                      : styles.alertSuccess
                  }`}
                >
                  {alertMessage2}
                </div>
              )}
              {loading2 ? (
                <div className="flex flex-col items-center justify-center space-y-4 my-4">
                  <div className="animate-spin w-16 h-16 border-4 border-[#FFD700] border-t-transparent rounded-full"></div>
                  <p className="text-xl font-semibold text-yellow-300">
                    Enviando información, por favor espera...
                  </p>
                </div>
              ) : (
                <form id="customFormEncuesta" onSubmit={handleFormSubmit2}>
                  <div>
                    <label htmlFor="first_name"></label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      placeholder="Nombre(s) completo"
                      className={styles.hsInput}
                    />
                    {errors2.first_name && (
                      <span className={styles.errorText}>
                        {errors2.first_name}
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
                    {errors2.last_name && (
                      <span className={styles.errorText}>
                        {errors2.last_name}
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email"></label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Correo electrónico"
                      className={styles.hsInput}
                    />
                    {errors2.email && (
                      <span className={styles.errorText}>{errors2.email}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="whatsapp"></label>
                    <input
                      type="text"
                      id="whatsapp"
                      name="whatsapp"
                      placeholder="Número de WhatsApp (10 dígitos)"
                      className={styles.hsInput}
                    />
                    {errors2.whatsapp && (
                      <span className={styles.errorText}>
                        {errors2.whatsapp}
                      </span>
                    )}
                    {/* Campos ocultos para identificar origen y estatus */}
                    <input type="hidden" name="origin" value="ayudaIA" />
                    <input type="hidden" name="status" value="creado" />
                  </div>
                  <div>
                    <button type="submit" className={styles.hsSubmit}>
                      Sí, quiero mi diagnóstico IA
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AyudaIA;

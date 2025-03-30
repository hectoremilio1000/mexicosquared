import React, { useState } from "react";
import Head from "next/head";
import NavBar from "../../components/NavBarBlack/NavBarEs";
import styles from "../../components/SwiperPrueba/Banner.module.css"; // Ajusta la ruta si corresponde
import axios from "axios";
import Link from "next/link";

function Puntoventa() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // --- Metadatos para <Head> ---
  const headData = {
    title: "Punto de Venta 24/7 | Impulso Restaurantero",
    content:
      "Te damos un punto de venta para agilizar tu operación con soporte 24/7",
    description:
      "Con Impulso Restaurantero, tendrás un punto de venta rápido, seguro y con asistencia en todo momento, para que tu equipo se enfoque en ofrecer la mejor experiencia.",
    url: "https://www.impulsorestaurantero.com/",
    image:
      "https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/logo/logoSoloImpulsoRestaurantero.png",
  };

  // --- Datos principales de la página ---
  const info = [
    {
      titulo1: "Punto de Venta con Soporte 24/7",
      parrafo1:
        "Te proporcionamos un punto de venta robusto para agilizar la operación de tu restaurante y atender a tus clientes sin interrupciones. Disfruta de asistencia personalizada en todo momento.",
      imagen1:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/punto-venta%2Bimpuloso%2Brestaurantero.jpg",
      titulo2: "Agilidad y Eficiencia",
      parrafo2:
        "Olvídate de los retrasos y la confusión en tu operación diaria. Con nuestra tecnología, cada pedido se procesa rápido y queda registrado para un seguimiento preciso de las ventas.",
      imagen2:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/punto-impulso-restaurantero-crecer-ventas.png ",
      titulorazones:
        "3 CLAVES PARA OPTIMIZAR TU RESTAURANTE CON NUESTRO PUNTO DE VENTA",
      razon1: "Procesos Sin Errores",
      parraforazon1:
        "El sistema minimiza errores en órdenes y pagos, permitiendo a tu equipo centrarse en la experiencia del cliente. Además, todo se registra automáticamente en un panel de control.",
      razon2: "Soporte 24/7",
      parraforazon2:
        "¿Problemas a mitad del servicio? No hay de qué preocuparse. Nuestro soporte está listo para asistirte en cualquier momento, asegurando que tu restaurante no se detenga.",
      razon3: "Reportes en Tiempo Real",
      parraforazon3:
        "Analiza tus ventas, inventarios y rendimiento de tu equipo en cualquier momento. Toma decisiones rápidas y basadas en datos para maximizar la rentabilidad.",
      titulo3: "Tecnología que Impulsa tu Crecimiento",
      parrafo3:
        "Conoce cómo cientos de dueños de restaurantes han elevado sus ventas gracias a un punto de venta confiable y fácil de usar. Agiliza tus operaciones y enfócate en lo que importa: el cliente.",
      imagen3:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/Punto-de-Venta-impulso.png",
      titulo4:
        "¿Listo para un punto de venta que nunca te falle? Nuestro soporte 24/7 te permitirá ofrecer un servicio impecable en cada pedido.",
    },
  ];

  // --- ESTADOS para el modal y formulario (Demo Gratis) ---
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [alertMessage2, setAlertMessage2] = useState("");
  const [alertType2, setAlertType2] = useState("");
  const [errors2, setErrors2] = useState({});
  const [loading2, setLoading2] = useState(false);

  // Función para abrir/cerrar modal
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

  // Envío del formulario
  const handleFormSubmit2 = async (e) => {
    e.preventDefault();
    setAlertMessage2("");
    setAlertType2("");
    setErrors2({});

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Validar
    if (!validateForm2(data)) {
      setAlertMessage2("Por favor, corrige los errores en el formulario.");
      setAlertType2("error");
      return;
    }

    try {
      setLoading2(true);
      // Ajusta la URL según tu backend
      const response = await axios.post(`${apiUrl}/prospectsmeeting`, data);

      if (response.status === 200) {
        alert("¡Email enviado!");
        e.target.reset();
        toggleModal2();
      } else {
        alert("¡Email enviado!");
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

        {/* Botón para abrir el modal */}
        <div className="mt-6 mb-4">
          {/* Botón que ABRE el nuevo modal de Demo Gratis */}
          <Link href="/prueba">
            <button className="button-small">Prueba Gratis ¡YA!</button>
          </Link>
        </div>

        {/* Imagen destacada */}
        <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[#e5e5e5] rounded-[1.2em] max-w-xl">
          <img
            className=" w-full object-contain "
            src={info[0].imagen1}
            alt="Punto de Venta 24/7"
          />
        </div>

        {/* Sección 2-col */}
        <div className="content grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-36 px-[20px] items-center">
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
              alt="Agilidad y Eficiencia"
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
              <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                <span className="inline-block p-4 rounded text-white bg-principal">
                  1
                </span>
                <h5 className="text-[12px] md:text-[18px] font-bold">
                  {info[0].razon1}
                </h5>
                <p className="parrafo-tw paragraph-feature">
                  {info[0].parraforazon1}
                </p>
              </div>
              {/* Razón 2 */}
              <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                <span className="inline-block p-4 rounded text-white bg-principal">
                  2
                </span>
                <h1 className="text-[12px] md:text-[18px] font-bold">
                  {info[0].razon2}
                </h1>
                <p className="parrafo-tw paragraph-feature">
                  {info[0].parraforazon2}
                </p>
              </div>
              {/* Razón 3 */}
              <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                <span className="inline-block p-4 rounded text-white bg-principal">
                  3
                </span>
                <h1 className="text-[12px] md:text-[18px] font-bold">
                  {info[0].razon3}
                </h1>
                <p className="parrafo-tw paragraph-feature">
                  {info[0].parraforazon3}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Otra Sección 2-col */}
        <div className="content grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-36 px-[20px] items-center">
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[#e5e5e5] max-w-xl">
            <img
              className="w-full object-contain rounded-[1.2em]"
              src={info[0].imagen3}
              alt="Tecnología de Punto de Venta"
            />
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-center p-8 bg-[#fbfbfad9] border-[#e5e5e5] rounded-[1.2em] max-w-2xl">
            <h2 className="title3-tw">{info[0].titulo3}</h2>
            <p className="text-gray-600 text-sm md:text-2xl text-center">
              {info[0].parrafo3}
            </p>
          </div>
        </div>

        {/* Sección final con la imagen de fondo */}
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
              alt="Background"
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
                <div className="text-center"></div>
              </div>
              <button className="button-small" onClick={toggleModal2}>
                Demo Gratis ¡YA!
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL con Formulario de Demo Gratis */}
      {isModalOpen2 && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Obtén Tu Demo Gratis Ahora</h2>
              <button className={styles.closeModal} onClick={toggleModal2}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
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
                <form id="puntoVentaForm" onSubmit={handleFormSubmit2}>
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
                    {/* Campos ocultos */}
                    <input
                      type="hidden"
                      name="origin"
                      value="puntoventaDemogratis"
                    />
                    <input type="hidden" name="status" value="creado" />
                  </div>
                  <div>
                    <button type="submit" className={styles.hsSubmit}>
                      Sí, quiero mi demo gratis
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

export default Puntoventa;

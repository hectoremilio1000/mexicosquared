import React, { useState } from "react";
import Link from "next/link";
import FAQ from "../components/FAQ/faq";
import NavBar from "../components/NavBarBlack/NavBarEs";
import axios from "axios";

// Importa tus estilos para el modal y form
import styles from "../components/SwiperPrueba/Banner.module.css"; // Ajusta la ruta si es necesario
import { InlineWidget } from "react-calendly";
import WhatsappButton from "../components/WhatsappButton";

function Comolohacemos() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // Datos de Preguntas Frecuentes
  const faqs = [
    {
      question: "¿Qué pasará con mi sitio web actual?",
      answer:
        "Cuando te registras con Impulso Restaurantero, obtendrás un nuevo sitio web optimizado para atraer tráfico y aumentar tus ventas. Este reemplazará tu sitio web actual. Tu dominio y URL seguirán siendo los mismos. No eliminaremos tu sitio web actual. Si en algún momento decides cancelar tu suscripción con nosotros, restauraremos tu sitio web a como estaba antes de registrarte.",
    },
    {
      question: "¿Qué tan personalizable es el diseño?",
      answer:
        "En Impulso Restaurantero creemos que las ventas son lo más importante. Por eso, te ofrecemos un diseño probado que puedes personalizar con la identidad de tu marca. Así es como nuestros sitios web para restaurantes tienen un estilo único. Hemos estudiado las mejores marcas online, generado más de $100 millones en ventas para restaurantes y ayudado a miles de dueños de restaurantes a hacer crecer su base de clientes con nuestros sitios web. Si buscas total libertad en el diseño, Impulso Restaurantero puede no ser la mejor opción para tu negocio.",
    },
    {
      question: "¿Cuánto tiempo tomará?",
      answer:
        "Si tienes todo listo, solo te tomará unos pocos días. La mayoría de nuestros clientes logran tener su nueva presencia en línea configurada en aproximadamente una semana. Al registrarte, necesitaremos algo de información sobre tu restaurante. Esto incluye los datos de tu dominio web, así como los detalles de tu cuenta de Google Business, Facebook, Tik tok, Instagram. Cuanta más información tengas preparada, más rápido podremos lanzar tu nueva plataforma.",
    },
  ];

  // --- ESTADOS para el modal y formulario de “Demo Gratis” ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Función para abrir/cerrar el modal
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Validaciones del formulario
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
    if (!data.email || !emailRegex.test(data.email)) {
      fieldErrors.email = "Por favor, ingresa un correo electrónico válido.";
    }
    if (!data.whatsapp || !whatsappRegex.test(data.whatsapp)) {
      fieldErrors.whatsapp =
        "Por favor, ingresa un número de WhatsApp válido (10 dígitos).";
    }
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  // Manejo del submit
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
      // Ajusta la URL según tu backend
      const response = await axios.post(`${apiUrl}/prospectsmeeting`, data);

      if (response.status === 200) {
        alert("¡Email enviado!");
        e.target.reset();
        toggleModal();
      } else {
        alert("¡Email enviado!");
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
    <>
      <NavBar />
      <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
        {/* Header */}
        <div className="text-center max-w-4xl">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Podrías estar obteniendo MUCHAS más ventas en línea.
          </h1>
          <p className="text-gray-600 text-sm md:text-2xl">
            Impulso Restaurantero es la manera más sencilla de CONSEGUIR MÁS
            reservas en línea y ofrecer la mejor experiencia a tus clientes.
            Descubre cómo lo hacemos.
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="mt-6 mb-4">
          {/* Botón que ABRE el modal para “Demo Gratis” */}
          <Link href="/prueba">
            <button className="button-small">Prueba Gratis ¡YA!</button>
          </Link>
        </div>

        <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[#e5e5e5] rounded-[1.2em] max-w-xl">
          <img
            className=" w-full object-contain "
            src="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/seccion1/649c99bf1948a130a34f7abb_Wins+copy.png"
            alt=""
          />
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-2 mt-4 leading-tight">
            ¿Cómo lo hacemos?
          </h2>
        </div>
        {/* Image Section */}
        <>
          <div className="content grid grid-cols-1 md:grid-cols-2 gap-8 px-[20px] items-start">
            <div className="w-full flex flex-col items-center gap-4 p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <Link href="/comolohacemos/destacaeninternet">
                <img
                  className=" w-full object-contain"
                  src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/googleSeo.png"
                  alt=""
                />
              </Link>
              <h2 className="title3-tw text-center">01. Destaca en Internet</h2>
              <p className="parrafo-tw paragraph-feature text-center">
                Con técnicas avanzadas de SEO y estrategias de marketing
                digital, optimizamos tu presencia en línea para que tu
                restaurante aparezca en los primeros lugares de Google, Tik Tok,
                Facebook e Instagram.
              </p>
              <Link href="/comolohacemos/destacaeninternet">
                <button className="button-small">Descubre más</button>
              </Link>
            </div>

            <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <img
                className=" w-full object-contain rounded-2xl h-[500px]"
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/pagina%2Bvisitas%2Bwebsite.jpg"
                alt=""
              />
              <h2 className="title3-tw text-center">
                02. LLenamos tu Restaurante
              </h2>
              <p className="parrafo-tw paragraph-feature text-center">
                Diseñamos tu web y sistema de reservas para llenar tu
                restaurante
              </p>
              <Link href="/comolohacemos/llenamosturestaurante">
                <button className="button-small">Descubre más</button>
              </Link>
            </div>

            <div className="w-full flex flex-col items-center gap-4 p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <Link href="/casosexito">
                <img
                  className=" w-full object-contain rounded-2xl"
                  src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/punto-venta%2Bimpuloso%2Brestaurantero.jpg"
                  alt=""
                />
              </Link>
              <h2 className="title3-tw text-center">
                03. Punto de venta con soporte 24/7{" "}
              </h2>
              <p className="parrafo-tw paragraph-feature text-center">
                Te damos un punto de venta para que puedas agilizar tu operación
                con soporte 24/7
              </p>
              <Link href="/comolohacemos/puntoventa">
                <button className="button-small">Descubre más</button>
              </Link>
            </div>

            <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <img
                className=" w-full object-contain"
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/recursos%2Bhumanps%2Bmanuales%2Bia.png"
                alt=""
              />
              <h2 className="title3-tw text-center">
                04. Recursos humanos & Manuales con Inteligencia Artificial
              </h2>
              <p className="parrafo-tw paragraph-feature text-center">
                Te ofrecemos manuales y un departamento de recursos humanos con
                inteligencia artificial, así como manejo de despidos.
              </p>
              <Link href="/comolohacemos/recursoshumanos">
                <button className="button-small">Descubre más</button>
              </Link>
            </div>
            <div className="w-full flex flex-col items-center gap-4 p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <Link href="/comolohacemos/lealtad">
                <img
                  className=" w-full object-contain"
                  src="https://img.freepik.com/free-photo/office-meeting_144627-35624.jpg"
                  alt=""
                />
              </Link>
              <h2 className="title3-tw text-center">05. Programa de lealtad</h2>
              <p className="parrafo-tw paragraph-feature text-center">
                Creamos programas de lealtad innovadores utilizando a través de
                una tarjeta de recompensas
              </p>
              <Link href="/comolohacemos/lealtad">
                <button className="button-small">Descubre más</button>
              </Link>
            </div>

            <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <img
                className=" w-full object-contain rounded-2xl"
                src="https://img.freepik.com/free-photo/explaining-work_1098-18099.jpg"
                alt=""
              />
              <h2 className="title3-tw text-center">
                06. Permisos y asesoría personalizada 24/7
              </h2>
              <p className="parrafo-tw paragraph-feature text-center">
                Te ayudamos a mantener todos los permisos y requisitos legales
                de tu restaurante siempre al día, asegurando que cumplas con
                todas las normativas vigentes de manera eficiente y sin
                preocupaciones.
              </p>
              <Link href="/comolohacemos/permisos">
                <button className="button-small">Descubre más</button>
              </Link>
            </div>

            <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <img
                className=" w-full object-contain rounded-2xl"
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/financiamiento-empresa-impulso.jpg"
                alt=""
              />
              <h2 className="title3-tw text-center">
                07. Financiamiento a tasas muy bajas
              </h2>
              <p className="parrafo-tw paragraph-feature text-center">
                Financiamiento para compra de equipo y crecimiento.
              </p>
              <Link href="/comolohacemos/financiamiento">
                <button className="button-small">Descubre más</button>
              </Link>
            </div>
            <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <img
                className=" w-full object-contain rounded-2xl"
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/encuesta-servicio-tiempo-real-impulso.jpg"
                alt=""
              />
              <h2 className="title3-tw text-center">
                08. Encuestas de servicio
              </h2>
              <p className="parrafo-tw paragraph-feature text-center">
                Encuestas de servicio en tiempo Real
              </p>
              <Link href="/comolohacemos/encuesta">
                <button className="button-small">Descubre más</button>
              </Link>
            </div>

            <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <img
                className=" w-full object-contain rounded-2xl"
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/inventarios%2Bcontrol%2Beficiencia%2Bimpulso.jpg"
                alt=""
              />
              <h2 className="title3-tw text-center">
                09. Inventarios Inteligentes
              </h2>
              <p className="parrafo-tw paragraph-feature text-center">
                Control preciso y procesos optimizados para reducir costos y
                aumentar ganancias
              </p>
              <Link href="/comolohacemos/inventarios">
                <button className="button-small">Descubre más</button>
              </Link>
            </div>
            <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <img
                className=" w-full object-contain rounded-2xl"
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/reconocimiento-impulso-restaurante.jpg"
                alt=""
              />
              <h2 className="title3-tw text-center">
                10. Monitoreo con Inteligencia Artificial{" "}
              </h2>
              <p className="parrafo-tw paragraph-feature text-center">
                Medimos la productividad de las personas con monitoreo 24/7, así
                como datos de los clientes que te visitan.
              </p>
              <Link href="/comolohacemos/monitoreo">
                <button className="button-small">Descubre más</button>
              </Link>
            </div>
            <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <img
                className=" w-full object-contain rounded-2xl h-[450px]"
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/diagnostico-ia-impulso-restaurantero.jpg"
                alt=""
              />
              <h2 className="title3-tw text-center">
                11. Estudio de Mercado con Inteligencia Artificial{" "}
              </h2>
              <p className="parrafo-tw paragraph-feature text-center">
                Nuestra tecnología, potenciada por Inteligencia Artificial,
                analiza las respuestas de un cuestionario personalizado para
                ayudarte a definir una visión clara, misión sólida y un plan de
                acción para tu restaurante.
              </p>
              <Link href="/comolohacemos/ayudaia">
                <button className="button-small">Descubre más</button>
              </Link>
            </div>
            <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <div className="w-full">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight text-center">
                  Recibe ayuda ahora
                </h2>
                <InlineWidget url="https://calendly.com/clientes-impulsorestaurantero/30min?month=2025-03" />
              </div>
            </div>
          </div>
        </>

        <div className="content grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24 px-[20px] items-start">
          <FAQ items={faqs} />
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[#e5e5e5] rounded-[1.2em] max-w-xl">
            <img
              className=" w-full object-contain "
              src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/comolohacemos/comolohacemos%2Bpagina.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16">
        <div className="text-center max-w-4xl mb-4">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight text-center">
            Podrías estar obteniendo MUCHAS más ventas en línea.
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
                <p className="text-lg text-gray-300">Facturado mensualmente</p>
              </div>
              <div className="text-center"></div>
            </div>
            {/* Botón que abre el mismo modal */}
            <button className="button-small" onClick={toggleModal}>
              Demo Gratis
            </button>
          </div>
        </div>
      </div>

      {/* MODAL con Formulario de “Demo Gratis” */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Obtén Tu Demo Gratis Ahora</h2>
              <button className={styles.closeModal} onClick={toggleModal}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              {/* Alerta global si existe alertMessage */}
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
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Correo electrónico"
                      className={styles.hsInput}
                    />
                    {errors.email && (
                      <span className={styles.errorText}>{errors.email}</span>
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
                    {errors.whatsapp && (
                      <span className={styles.errorText}>
                        {errors.whatsapp}
                      </span>
                    )}
                    {/* Campos ocultos */}
                    <input type="hidden" name="origin" value="demoGratis" />
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
      <WhatsappButton />
    </>
  );
}

export default Comolohacemos;

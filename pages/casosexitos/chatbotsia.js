import React, { useState } from "react";
import NavBar from "../../components/NavBarBlack/NavBarEs";
import Link from "next/link";
import FAQ from "../../components/FAQ/faq";
import axios from "axios";

// Importa el CSS para el modal, ajusta la ruta si cambia
import styles from "../../components/SwiperPrueba/Banner.module.css";
import { Button } from "antd";

function MejorarProcesos() {
  // URL de tu backend
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // Datos adaptados para enfatizar la mejora de procesos, maquinaria, financiamiento
  const info = [
    {
      titulo1:
        "De una atención al cliente básica a un soporte inteligente 24/7: La historia de éxito de AcmeCorp",
      parrafo1:
        "AcmeCorp, una reconocida empresa de software con sede en Estados Unidos, buscaba optimizar su atención al cliente para manejar un creciente volumen de consultas. Con el apoyo de growthsuite, implementamos chatbots inteligentes con procesamiento de lenguaje natural, permitiendo a AcmeCorp brindar asistencia 24/7 y mejorar sustancialmente la satisfacción de sus usuarios a nivel global.",
      imagen1:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/growthsuite/casosExitopage/iachat.png",
      titulo2: "Tecnología Innovadora para Atender a Millones de Usuarios",
      parrafo2:
        "Gracias a nuestros chatbots basados en IA, AcmeCorp logró automatizar la mayoría de las preguntas frecuentes, reducir el tiempo de respuesta y escalar su servicio al cliente sin sacrificar calidad. Con un enfoque centrado en la experiencia del usuario, creamos un flujo de soporte capaz de manejar miles de interacciones diarias.",
      imagen2:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/growthsuite/casosExitopage/iachatbots.png",
      titulorazones:
        "3 CLAVES QUE IMPULSARON EL CRECIMIENTO Y LA EFICIENCIA DE ACMECORP",
      razon1: "Chatbots IA con Procesamiento de Lenguaje Natural",
      parraforazon1:
        "Desarrollamos bots capaces de comprender preguntas complejas y responder con un tono más humano. Esto aumentó la satisfacción del cliente y redujo los tiempos de espera drásticamente.",
      razon2: "Implementación Multicanal Global",
      parraforazon2:
        "Los usuarios de AcmeCorp pueden acceder a soporte desde el sitio web, aplicaciones móviles y redes sociales, sin perder consistencia en la experiencia y recibiendo ayuda inmediata en cualquier dispositivo.",
      razon3: "Análisis de Datos y Mejora Continua",
      parraforazon3:
        "Integramos un sistema de analítica que permite identificar las preguntas más comunes, los principales retos de los usuarios y oportunidades de optimización. Así, el chatbot se hace cada vez más inteligente y predictivo.",
      titulo3: "Preparados para un Futuro Global de la Atención al Cliente",
      parrafo3:
        "Con estos chatbots inteligentes, AcmeCorp continúa expandiendo su alcance internacional mientras mantiene altos estándares de soporte. IA y automatización se combinan para ofrecer una experiencia de usuario impecable, impulsando la fidelización y el crecimiento sostenido de la empresa.",
      imagen3:
        "https://imagenesrutalab.s3.us-east-1.amazonaws.com/growthsuite/casosExitopage/chatbotsiasuite.png",
      titulo4:
        "¿Quieres llevar tu servicio al cliente al siguiente nivel? Descubre cómo growthsuite puede ayudarte a escalar tu atención al cliente con IA y chatbots inteligentes.",
    },
  ];

  // Preguntas frecuentes
  const faqs = [
    {
      question: "¿Puedo financiar toda mi operación?",
      answer:
        "Sí, contamos con convenios que permiten adquirir equipos y maquinaria con tasas muy bajas. Además, ofrecemos asesoría para que tu rentabilidad sea la óptima y puedas ir cubriendo las cuotas sin presiones.",
    },
    {
      question: "¿Cómo garantiza Impulso Restaurantero la mejora de procesos?",
      answer:
        "Nos enfocamos en la optimización integral: mapeamos tu flujo de trabajo, identificamos cuellos de botella y aplicamos tecnología para eliminar ineficiencias. Con reportes en tiempo real, siempre sabrás dónde están tus gastos y tus ganancias.",
    },
    {
      question: "¿En cuánto tiempo veré resultados?",
      answer:
        "Cada restaurante es diferente, pero en promedio, nuestros clientes comienzan a notar mejoras significativas en ventas y rentabilidad dentro de los primeros 3 a 6 meses. La inversión en maquinaria y mejoras operativas se recupera en menos de 2 años.",
    },
  ];

  // -------------------
  // ESTADOS Y LÓGICA DEL MODAL DE “DEMO GRATIS”
  // -------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Función para abrir/cerrar el modal
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Validaciones
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

      <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-36 md:pt-36">
        {/* Encabezado */}
        <div className="text-center max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {info[0].titulo1}
          </h1>
          <p className="text-gray-600 text-xl md:text-2xl">
            {info[0].parrafo1}
          </p>
        </div>
        <div className="w-full flex flex-col items-center gap-4 justify-start p-2 bg-[#fbfbfad9] border-[#e5e5e5] max-w-2xl">
          <img
            className="w-1/2 object-cover rounded-[1.2em]"
            src={info[0].imagen1}
            alt=""
          />
        </div>

        {/* Imagen destacada */}
        <div>
          {/* Botón que ABRE el nuevo modal de Demo Gratis */}
          <div className="relative z-20 flex flex-col justify-center items-center h-full text-white">
            <div>
              <div className="text-center"></div>
            </div>
            {/* Botón que ABRE el modal “Demo Gratis” */}
            <div className="mt-6 mb-4">
              {/* Botón que ABRE el nuevo modal de Demo Gratis */}
              <div className="flex justify-center">
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  className="
                                mt-2 !text-[#007bff]
                                !bg-[#FFD700]
                                
                                !border-none
                                !rounded-[14px]
                                !px-[1.8em]
                                !py-[1.6em]
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
                    SOLICITA TU DEMO <br /> DE SOFTWARE GRATIS
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sección 2-col */}
        <div className="content grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-36 px-[20px] items-center mt-8">
          <div className="flex flex-col items-center text-center max-w-2xl">
            <h2 className="md:text-5xl font-bold text-gray-900 mb-2 leading-tight text-2xl">
              {info[0].titulo2}
            </h2>
            <p className="text-gray-600 text-xl md:text-2xl">
              {info[0].parrafo2}
            </p>
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-start p-2 bg-[#fbfbfad9] border-[#e5e5e5] max-w-xl">
            <img
              className="w-full object-contain rounded-[1.2em]"
              src={info[0].imagen2}
              alt="Maquinaria financiada"
            />
          </div>
        </div>

        {/* Razones de éxito */}
        <div className="flex flex-col items-center justify-center py-6 px-2">
          <div className="heading-block flex flex-col justify-center items-center mb-16">
            <h2 className="title2-tw text-center uppercase">
              {info[0].titulorazones}
            </h2>
          </div>
          <div className="max-w-[1050px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Razón 1 */}
              <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                <span className="inline-block p-4 rounded text-white bg-primary">
                  1
                </span>
                <h5 className="text-[16px] md:text-[18px] font-bold">
                  {info[0].razon1}
                </h5>
                <p className="parrafo-tw paragraph-feature">
                  {info[0].parraforazon1}
                </p>
              </div>

              {/* Razón 2 */}
              <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                <span className="inline-block p-4 rounded text-white bg-primary">
                  2
                </span>
                <h1 className="text-[16px] md:text-[18px] font-bold">
                  {info[0].razon2}
                </h1>
                <p className="parrafo-tw paragraph-feature">
                  {info[0].parraforazon2}
                </p>
              </div>

              {/* Razón 3 */}
              <div className="bg-gray-100 flex flex-col gap-3 items-start p-6 md:p-8">
                <span className="inline-block p-4 rounded text-white bg-primary">
                  3
                </span>
                <h1 className="text-[16px] md:text-[18px] font-bold">
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
          <div className="w-full flex flex-col items-center gap-4 justify-start p-2 bg-[#fbfbfad9] border-[#e5e5e5] max-w-xl">
            <img
              className="w-full object-contain rounded-[1.2em]"
              src={info[0].imagen3}
              alt="Procesos rentables"
            />
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-center p-2 bg-[#fbfbfad9] border-[#e5e5e5] rounded-[1.2em] max-w-2xl">
            <h2 className="text-2xl md:text-5xl font-bold text-gray-900 leading-tight text-center">
              {info[0].titulo3}
            </h2>
            <p className="text-gray-600 text-xl md:text-2xl text-center">
              {info[0].parrafo3}
            </p>
          </div>
        </div>
        <div className="bg-gray-50 flex flex-col items-center py-2 md:px-16 pt-6 md:pt-12">
          <div className="text-center max-w-4xl">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight text-center">
              {info[0].titulo4}
            </h1>
          </div>
          <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden h-64 md:h-96">
            {/* Imagen de fondo */}
            <img
              src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/growthsuite/casosExitopage/iachat.png"
              alt="Background"
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
            {/* Gradiente superpuesto */}
            <div className="absolute top-0 left-0 w-full h-full bg-opacity-75 bg-black"></div>
            {/* Contenido */}
            <div className="relative z-20 flex flex-col justify-center items-center h-full text-white">
              <div>
                <div className="mb-8 text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    Gratis
                  </p>
                  <p className="text-lg text-gray-300">Sin compromisos</p>
                </div>
                <div className="text-center"></div>
              </div>
              {/* Botón que ABRE el modal “Demo Gratis” */}
              <div className="mt-6 mb-4">
                {/* Botón que ABRE el nuevo modal de Demo Gratis */}
                <div className="flex justify-center">
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    className="
                      mt-2 !text-[#007bff]
                      !bg-[#FFD700]
                      
                      !border-none
                      !rounded-[14px]
                      !px-[1.8em]
                      !py-[1.6em]
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
                      SOLICITA TU DEMO <br /> DE SOFTWARE GRATIS
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* CTA final */}
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
                <form id="demoForm" onSubmit={handleFormSubmit}>
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
    </>
  );
}

export default MejorarProcesos;

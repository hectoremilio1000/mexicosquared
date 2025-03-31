import React, { useState } from "react";
import NavBar from "../../components/NavBarBlack/NavBarEs";
import Link from "next/link";
import styles from "../../components/SwiperPrueba/Banner.module.css"; // Ajusta la ruta si es necesario
import axios from "axios";
import { InlineWidget } from "react-calendly";
import WhatsappButton from "../../components/WhatsappButton";
import { Button } from "antd";

function Casosexito() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // --- ESTADOS para el modal y el formulario de “Demo Gratis” ---
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

    // Validar datos
    if (!validateForm(data)) {
      setAlertMessage("Por favor, corrige los errores en el formulario.");
      setAlertType("error");
      return;
    }

    try {
      setLoading(true);
      // Ajusta la URL si tu backend está en otro lugar
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
      <div className="flex flex-col items-center px-4 py-8 md:px-16 pt-36 md:pt-36">
        {/* Header */}
        <div className="text-center max-w-4xl">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight text-center">
            Casos de Éxito: Soluciones de Software para Impulsar tu Negocio
          </h1>
          <p className="text-gray-600 text-sm md:text-2xl">
            Descubre cómo diferentes organizaciones han utilizado nuestras
            integraciones de IA, plataformas de e-commerce, sistemas de pago con
            Mercado Libre y otras soluciones para hacer crecer sus proyectos.
          </p>
        </div>
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

      <>
        <div className="content grid grid-cols-1 md:grid-cols-2 gap-8 px-[20px] items-start mb-4">
          <div className="w-full flex flex-col items-center gap-4 p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <Link href="/casosexitos/seguridaditam">
              <img
                className=" w-full object-contain"
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/growthsuite/CASOSEXITOSOS/itam-logo.png"
                alt=""
              />
            </Link>
            <h2 className="title3-tw text-center">ITAM: Seguridad Web</h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Descubre cómo ayudamos al ITAM a reforzar la seguridad y
              desarrollar un ecosistema de páginas web resistentes, cumpliendo
              con los estándares más exigentes de protección y fiabilidad.
            </p>
            <Link href="/casosexitos/seguridaditam">
              <button className="button-small">Ver Historia</button>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <img
              className=" w-full object-contain"
              src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/growthsuite/CASOSEXITOSOS/mercadolibreia.png"
              alt=""
            />
            <h2 className="title3-tw text-center">Integración Mercado Libre</h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Implementamos una pasarela de pago y herramientas de gestión de
              productos dentro del ecosistema de Mercado Libre para simplificar
              la experiencia de compra y aumentar la conversión.
            </p>
            <Link href="/casosexitos/mercadolibresoftware">
              <button className="button-small">Ver Detalles</button>
            </Link>
          </div>
        </div>

        <div className="content grid grid-cols-1 md:grid-cols-2 gap-8 px-[20px] items-start mb-4">
          <div className="w-full flex flex-col items-center gap-4 p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <Link href="/casosexitos/chatbotsia">
              <img
                className=" w-full object-contain"
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/growthsuite/casosExitopage/iachatbots.png"
                alt=""
              />
            </Link>
            <h2 className="title3-tw text-center">Chatbots con IA</h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Implementamos chatbots inteligentes con procesamiento de lenguaje
              natural para atender a usuarios 24/7, mejorando la satisfacción y
              la retención de clientes en distintas industrias.
            </p>
            <Link href="/casosexitos/chatbotsia">
              <button className="button-small">Ver Implementación</button>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <img
              className=" w-full object-contain"
              src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/growthsuite/CASOSEXITOSOS/casosExitosos.png"
              alt=""
            />
            <h2 className="title3-tw text-center">Plataforma eCommerce</h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Con nuestra tecnología, un negocio local se transformó en una
              plataforma de e-commerce a gran escala, ofreciendo una excelente
              experiencia de usuario y un sistema de ventas automatizado.
            </p>
            <Link href="/casosexitos/ecommerce">
              <button className="button-small">Lee Cómo Lo Logramos</button>
            </Link>
          </div>
        </div>
      </>
      <div className="w-full">
        <InlineWidget url="https://calendly.com/clientes-impulsorestaurantero/30min?month=2025-03" />
      </div>
      <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
        <div className="text-center max-w-4xl mb-4">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight text-center">
            ¿Listo para optimizar tus procesos y aumentar tus ventas con
            tecnología?
          </h1>
          {/* <p className="text-gray-600 text-sm md:text-2xl text-center">
            Obten tu demo gratis ya
          </p> */}
        </div>
        <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden h-64 md:h-96">
          {/* Imagen de fondo */}
          <img
            src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/growthsuite/banner/softwaretumedidagrowth.png"
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          {/* Gradiente superpuesto */}
          <div className="absolute top-0 left-0 w-full h-full bg-opacity-75 bg-black"></div>
          {/* Contenido */}
          <div className="relative z-20 flex flex-col justify-center items-center h-full p-8 text-white">
            <div>
              <div className="mb-8 text-center">
                {/* <p className="text-4xl font-bold text-white">$9,999</p> */}
                <p className="text-lg text-gray-300">
                  Conoce nuestras soluciones de IA, growth hacking y más.
                </p>
              </div>
              <div className="text-center"></div>
            </div>
            {/* Botón que abre el modal */}
            <button className="button-small" onClick={toggleModal}>
              PIDE TU PRUEBA DE SOFTWARE GRATIS
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
                    <input
                      type="hidden"
                      name="origin"
                      value="CasosExitoModaldemogratis"
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
      <WhatsappButton />
    </>
  );
}

export default Casosexito;

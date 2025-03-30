import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import Link from "next/link";
import axios from "axios";
import styles from "../components/SwiperPrueba/Banner.module.css"; // Importa tu CSS

const RestauranterosExitosos = () => {
  const ref = useRef(null);

  // -- Lógica 3D (sin cambios) --
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const z = useMotionValue(0);
  const translateY = useMotionValue(0);
  const translateX = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const zSpring = useSpring(z);
  const txSpring = useSpring(translateX);
  const tySpring = useSpring(translateY);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const transform = useMotionTemplate`translate3d(${translateX}%, ${translateY}em, 0px) 
    scale3d(1, 1, 1) 
    rotateX(${x}deg) 
    rotateY(${y}deg) 
    rotateZ(${z}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = (height / 2 - mouseY) / 20;
    const rotateY = (mouseX - width / 2) / 20;

    const tX = ((mouseX - width / 2) / width) * 10;
    const tY = ((mouseY - height / 2) / height) * 10;

    translateX.set(tX);
    translateY.set(tY);
    x.set(rotateX);
    y.set(rotateY);
  };

  const handleMouseLeave = () => {
    x.set(15);
    y.set(-25);
    z.set(15);
  };

  // -- Lógica del modal y formulario reutilizable --
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(""); // Título dinámico
  const [modalOrigin, setModalOrigin] = useState(""); // Valor origin dinámico

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Abrir modal con valores específicos
  const openModal = (title, originValue) => {
    setModalTitle(title || "Descarga tu PDF");
    setModalOrigin(originValue || "pdfDefault");
    setIsModalOpen(true);
  };

  // Cerrar modal
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Bloquear scroll body si el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isModalOpen]);

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

  // Submit del formulario
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (!validateForm(data)) {
      alert("Por favor, corrige los errores en el formulario.");
      return;
    }

    try {
      setLoading(true);
      // Envío al backend

      const response = await axios.post(`${apiUrl}/prospectswebsite`, data);

      console.log("Respuesta del backend:", response);

      if (response.status === 200) {
        alert("¡Email enviado!");
        e.target.reset();
        toggleModal(); // cierra modal
      } else {
        // si status es 201/202/etc
        alert("Email enviado");
        e.target.reset();
        toggleModal();
      }
    } catch (error) {
      console.error("Error al enviar:", error.response?.data || error.message);
      alert("Hubo un error. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center py-16 px-2"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Encabezado */}
      <div className="heading-block flex flex-col justify-center items-center mb-8">
        <span className="rounded-full bg-secundario text-principal font-semibold px-4 py-2 mb-4">
          #RESTAURANTEROSEXITOSOS
        </span>
        <motion.h2
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="title2-tw text-center uppercase"
        >
          ¿Listo para empezar a recibir <br />
          a millones <br />
          de nuevos clientes?
        </motion.h2>
      </div>

      {/* Contenido principal */}
      <div className="max-w-[1085px] mx-auto w-full">
        <div className="grid gap-16 w-full">
          {/* Bloque 1 */}
          <div className="w-full md:col-span-2 relative">
            <div className="w-full bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <div className="w-full relative py-12 px-16 flex items-start justify-start flex-col overflow-hidden perspective md:pr-[30%]">
                <div className="content-text flex flex-col justify-center items-center gap-6">
                  <h2 className="title3-tw uppercase">
                    Cómo Iniciar <br /> un Restaurante
                  </h2>
                  <p className="max-w-[24.5em] parrafo-tw paragraph-feature text-center">
                    Es tu guía esencial para convertirte en dueño de un
                    restaurante exitoso. Desde la elección del tipo de
                    restaurante y ubicación, hasta comprender las complejidades
                    de los arrendamientos...
                  </p>
                  <Link href="/comolohacemos">
                    <button className="button-small font-bold">
                      LEER AHORA
                    </button>
                  </Link>
                </div>
                <motion.img
                  style={{ transformStyle: "preserve-3d", transform }}
                  className="rounded-[1.2em] w-[100%] relative mt-4 md:w-[50%] md:absolute md:right-0 md:top-0"
                  src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/impulsoRestaurantero/seccion1/restaurant-hall-with-round-table-some-chairs-fireplace-plants1.jpg"
                  alt="restaurant"
                />
              </div>
            </div>
          </div>

          {/* Bloque 2 (VER AHORA) */}
          <div className="w-full md:col-span-2 relative">
            <div className="w-full bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <div className="w-full relative py-12 px-16 flex items-start justify-start flex-col overflow-hidden perspective md:pr-[30%]">
                <div className="content-text flex flex-col justify-center items-center gap-6">
                  <h2 className="title3-tw uppercase">
                    3 Modelos de Ingresos <br /> para Restaurantes
                  </h2>
                  <p className="max-w-[24.5em] parrafo-tw paragraph-feature text-center">
                    ¿Quieres hacer crecer tu restaurante o bar y generar más de
                    $1,000,000 al mes? Descarga nuestro PDF gratuito con los 3
                    Modelos de Ingresos y accede a una capacitación en video
                    aquí.
                  </p>
                  {/* Abrimos el modal con datos específicos */}
                  <button
                    className="button-small font-bold"
                    onClick={() =>
                      openModal(
                        "Descarga tu PDF de 3 Modelos de Ingresos",
                        "pdf3Modelos"
                      )
                    }
                  >
                    DESCARGAR AHORA
                  </button>
                </div>
                <motion.img
                  style={{ transformStyle: "preserve-3d", transform }}
                  className="rounded-[1.2em] w-[100%] relative mt-4 md:w-[50%] md:absolute md:right-0 md:top-0"
                  src="https://www.exquisitoperu.com/wp-content/uploads/2019/03/mayta.jpg"
                  alt="mayta"
                />
              </div>
            </div>
          </div>

          {/* Bloque 3 */}
          <div className="w-full md:col-span-2 relative">
            <div className="w-full bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <div className="w-full relative py-12 px-16 flex items-start justify-start flex-col overflow-hidden perspective md:pr-[30%]">
                <div className="content-text flex flex-col justify-center items-center gap-6">
                  <h2 className="title3-tw uppercase">
                    ANUNCIOS QUE ATRAEN <br /> CLIENTES
                  </h2>
                  <p className="max-w-[24.5em] parrafo-tw paragraph-feature text-center">
                    Los dueños de restaurantes consiguen 100-300 nuevos clientes
                    a la semana con este plan de anuncios en Facebook, Tik Tok e
                    Instagram "listo para usar".
                  </p>
                  <Link href="/comolohacemos">
                    <button className="button-small font-bold">
                      PROBAR AHORA
                    </button>
                  </Link>
                </div>
                <motion.img
                  style={{ transformStyle: "preserve-3d", transform }}
                  className="rounded-[1.2em] w-[100%] relative mt-4 md:w-[50%] md:absolute md:right-0 md:top-0"
                  src="https://i.pinimg.com/736x/73/a5/48/73a5481477d4842fc7cb46730557aabc.jpg"
                  alt="anuncios"
                />
              </div>
            </div>
          </div>

          {/* Bloque 4 (SOLICITAR AHORA) */}
          <div className="w-full md:col-span-2 relative">
            <div className="w-full bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <div className="w-full relative py-12 px-16 flex items-start justify-start flex-col overflow-hidden perspective md:pr-[30%]">
                <div className="content-text flex flex-col justify-center items-center gap-6">
                  <h2 className="title3-tw uppercase text-center">
                    SECRETOS DE <br /> IMPULSO RESTAURANTERO
                  </h2>
                  <p className="max-w-[24.5em] parrafo-tw paragraph-feature text-center">
                    La guía paso a paso para que los dueños de restaurantes
                    aprendan a llegar a más clientes, transformar más vidas y
                    utilizamos inteligencia artificial para hacerlo.
                  </p>
                  {/* Mismo modal, distintos valores */}
                  <button
                    className="button-small font-bold"
                    onClick={() =>
                      openModal(
                        "Secretos de Impulso Restaurantero",
                        "pdfSecretos"
                      )
                    }
                  >
                    SOLICITAR AHORA
                  </button>
                </div>
                <motion.img
                  style={{ transformStyle: "preserve-3d", transform }}
                  className="rounded-[1.2em] w-[100%] relative mt-4 md:w-[50%] md:absolute md:right-0 md:top-0"
                  src="https://www.idgastronomic.com/wp-content/uploads/2023/01/tiktok-videos-restaurantes-1.jpg"
                  alt="secretos"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL (mismo formulario reutilizable) */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              {/* Título dinámico */}
              <h2>{modalTitle}</h2>
              <button className={styles.closeModal} onClick={toggleModal}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              {loading ? (
                <div className="flex flex-col items-center justify-center space-y-4 my-4">
                  {/* SPINNER DORADO */}
                  <div className="animate-spin w-16 h-16 border-4 border-[#FFD700] border-t-transparent rounded-full"></div>
                  <p className="text-xl font-semibold text-yellow-300">
                    Enviando información, por favor espera...
                  </p>
                </div>
              ) : (
                <form id="customForm" noValidate onSubmit={handleFormSubmit}>
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
                    {/* Campos ocultos: origin y status dinámicos */}
                    <input type="hidden" name="origin" value={modalOrigin} />
                    <input type="hidden" name="status" value="creado" />
                  </div>
                  <div>
                    <button type="submit" className={styles.hsSubmit}>
                      ¡Descargar PDF ahora!
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestauranterosExitosos;

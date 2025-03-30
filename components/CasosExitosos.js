// components/CasosExitosos.js
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import Link from "next/link";
import axios from "axios";
import styles from "../components/SwiperPrueba/Banner.module.css";

const CasosExitosos = () => {
  const ref = useRef(null);
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

  const transform = useMotionTemplate`
    translate3d(${translateX}%, ${translateY}em, 0px)
    scale3d(1, 1, 1)
    rotateX(${x}deg)
    rotateY(${y}deg)
    rotateZ(${z}deg)
  `;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const { width, height } = rect;
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

  // Modal general
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalOrigin, setModalOrigin] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const openModal = (title, originValue) => {
    setModalTitle(title || "Descarga tu eBook");
    setModalOrigin(originValue || "pdfDefault");
    setIsModalOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isModalOpen]);

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
      const response = await axios.post(`${apiUrl}/prospectswebsite`, data);
      if (response.status === 200) {
        alert("¡Solicitud enviada!");
        e.target.reset();
        toggleModal();
      } else {
        alert("Solicitud enviada");
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
        <span className="rounded-full bg-secondary text-primary font-semibold px-4 py-2 mb-4">
          #CASOSEXITOSOS
        </span>
        <motion.h2
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="title2-tw text-center uppercase"
        >
          Proyectos de Software <br />
          que Marcan la Diferencia
        </motion.h2>
      </div>

      {/* Bloques con animación 3D */}
      <div className="max-w-[1085px] mx-auto w-full">
        <div className="grid gap-16 w-full">
          {/* Bloque 1 */}
          <div className="w-full md:col-span-2 relative">
            <div className="w-full bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <div className="w-full relative py-12 px-16 flex items-start justify-start flex-col overflow-hidden perspective md:pr-[30%]">
                <div className="content-text flex flex-col justify-center items-center gap-6">
                  <h2 className="title3-tw uppercase">
                    Plataforma de <br />
                    E-commerce
                  </h2>
                  <p className="max-w-[24.5em] parrafo-tw paragraph-feature text-center">
                    Caso de éxito donde desarrollamos una plataforma capaz de
                    procesar miles de transacciones por minuto. Integración con
                    pasarelas de pago, stock en tiempo real y análisis de
                    ventas.
                  </p>
                  <Link href="/casosexito">
                    <button className="button-small font-bold">
                      LEER DETALLES
                    </button>
                  </Link>
                </div>
                <motion.img
                  style={{ transformStyle: "preserve-3d", transform }}
                  className="rounded-[1.2em] w-[100%] relative mt-4 md:w-[50%] md:absolute md:right-0 md:top-0"
                  src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/growthsuite/CASOSEXITOSOS/casosExitosos.png"
                  alt="Ecommerce"
                />
              </div>
            </div>
          </div>

          {/* Bloque 2 - eBook Modal */}
          <div className="w-full md:col-span-2 relative">
            <div className="w-full bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <div className="w-full relative py-12 px-16 flex items-start justify-start flex-col overflow-hidden perspective md:pr-[30%]">
                <div className="content-text flex flex-col justify-center items-center gap-6">
                  <h2 className="title3-tw uppercase">Desarrollo Web Seguro</h2>
                  <p className="max-w-[24.5em] parrafo-tw paragraph-feature text-center">
                    Gracias a nuestras soluciones de seguridad y a nuestro
                    equipo especializado en infraestructuras de vanguardia,
                    hemos ayudado al <b>ITAM</b> a crear y optimizar sus sitios
                    web con altos estándares de protección y confiabilidad.
                    Nuestra experiencia garantiza que cada proyecto cumpla con
                    los requisitos más exigentes en materia de seguridad.
                  </p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {/* Botón que ahora redirige a WhatsApp en lugar de abrir modal */}
                    <a
                      href="https://wa.me/5215531491808?text=Hola%20quiero%20un%20software%20exitoso%20con%20growthsuite"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.button4}
                    >
                      ¡Quiero más información!
                    </a>
                  </div>
                </div>
                <motion.img
                  style={{ transformStyle: "preserve-3d", transform }}
                  className="rounded-[1.2em] w-[100%] relative mt-4 md:w-[30%] md:absolute md:right-0 md:top-0"
                  src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/growthsuite/CASOSEXITOSOS/itam-logo.png"
                  alt="DesarrolloWeb"
                />
              </div>
            </div>
          </div>

          {/* Bloque 3 */}
          <div className="w-full md:col-span-2 relative">
            <div className="w-full bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <div className="w-full relative py-12 px-16 flex items-start justify-start flex-col overflow-hidden perspective md:pr-[30%]">
                <div className="content-text flex flex-col justify-center items-center gap-6">
                  <h2 className="title3-tw uppercase">Aplicaciones Móviles</h2>
                  <p className="max-w-[24.5em] parrafo-tw paragraph-feature text-center">
                    Conoce casos de éxito donde integramos sistemas de
                    Inteligencia Artificial y la pasarela de pago de{" "}
                    <b>Mercado Libre</b>, permitiendo automatizar procesos y
                    optimizar las transacciones de nuestros clientes.
                  </p>
                  <Link href="/casosexito">
                    <button className="button-small font-bold">
                      VER PROYECTOS
                    </button>
                  </Link>
                </div>
                <motion.img
                  style={{ transformStyle: "preserve-3d", transform }}
                  className="rounded-[1.2em] w-[100%] relative mt-4 md:w-[50%] md:absolute md:right-0 md:top-0"
                  src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/growthsuite/CASOSEXITOSOS/mercadolibreia.png"
                  alt="MovilApps"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Reutilizable */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{modalTitle}</h2>
              <button className={styles.closeModal} onClick={toggleModal}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              {loading ? (
                <div className="flex flex-col items-center justify-center space-y-4 my-4">
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
                      type="email"
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
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      placeholder="WhatsApp (10 dígitos)"
                      className={styles.hsInput}
                    />
                    {errors.whatsapp && (
                      <span className={styles.errorText}>
                        {errors.whatsapp}
                      </span>
                    )}
                    {/* Campos ocultos */}
                    <input type="hidden" name="origin" value={modalOrigin} />
                    <input type="hidden" name="status" value="creado" />
                  </div>
                  <div>
                    <button type="submit" className={styles.hsSubmit}>
                      ¡Descargar ahora!
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

export default CasosExitosos;

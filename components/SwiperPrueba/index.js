// components/SwiperPrueba/index.js
import React, { useState, useEffect } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import axios from "axios";

import styles from "./Banner.module.css";

const MySwiper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Bloquea scroll del body al abrir modal
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
        alert("¡Información enviada exitosamente!");
        e.target.reset();
        toggleModal();
      } else {
        alert("¡Información enviada!");
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
    <div>
      <div
        className={`${styles.sectionHero} ${isModalOpen ? styles.dimmed : ""}`}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500 }}
          loop
          className="w-full md:h-[90vh]"
        >
          {/* Slide 1 - Software a la medida */}
          <SwiperSlide>
            <div className={styles.content}>
              <div className={styles["block-hero"]}>
                <div className={styles.subtitle}>GROWTHSUITE</div>
                <h1 className={`${styles["heading-13"]} ${styles.desktop}`}>
                  ¿BUSCAS <br /> SOFTWARE <br /> A LA MEDIDA?
                </h1>
                <h1 className={`${styles["heading-13"]} ${styles.mobile}`}>
                  ¿BUSCAS <br /> SOFTWARE <br /> A LA MEDIDA?
                </h1>

                <div className={`${styles.largeText} ${styles.desktop}`}>
                  Somos expertos en crear aplicaciones web y móviles totalmente
                  personalizadas para tu negocio.
                </div>
                <div className={`${styles.largeText} ${styles.mobile}`}>
                  Moderniza tu empresa con tecnología hecha a la medida.
                </div>

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
            </div>
            <div className={styles.blueGradientHero}></div>
          </SwiperSlide>

          {/* Slide 2 - POS para Restaurantes (opcional como otra solución) */}
          {/* <SwiperSlide>
          <div className={styles.content}>
            <div className={styles["block-hero"]}>
              <div className={styles.subtitle}>GROWTHSUITE POS</div>
              <h1 className={`${styles["heading-13"]} ${styles.desktop}`}>
                SOLUCIÓN <br /> INTEGRAL <br /> PARA RESTAURANTES
              </h1>
              <h1 className={`${styles["heading-13"]} ${styles.mobile}`}>
                SOLUCIÓN <br /> INTEGRAL <br /> PARA RESTAURANTES
              </h1>

              <div className={`${styles.largeText} ${styles.desktop}`}>
                Controla inventarios, gestiona mesas y aumenta tus ventas con
                nuestra plataforma POS especializada.
              </div>
              <div className={`${styles.largeText} ${styles.mobile}`}>
                Lleva tu restaurante al siguiente nivel con GrowthSuite POS.
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button className={styles.button4} onClick={toggleModal}>
                  ¡Probar Gratis!
                </button>
              </div>
            </div>
          </div>
          <div className={styles.blueGradientHero}></div>
        </SwiperSlide> */}
        </Swiper>

        {/* Modal para recolectar datos */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>¡Conversemos sobre tu proyecto!</h2>
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
                      <input type="hidden" name="origin" value="SwiperBanner" />
                      <input type="hidden" name="status" value="creado" />
                    </div>
                    <div>
                      <button type="submit" className={styles.hsSubmit}>
                        ¡Enviar Solicitud!
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySwiper;

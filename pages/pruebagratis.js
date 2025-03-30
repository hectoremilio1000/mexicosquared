import React, { useState } from "react";
import NavBar from "../components/NavBarBlack/NavBarEs";
import styles from "../components/Demo/Demo.module.css"; // Ajusta la ruta si corresponde
import Link from "next/link";
import axios from "axios";
import { InlineWidget } from "react-calendly";
import WhatsappButton from "../components/WhatsappButton";

function PruebaGratis({ backgroundImage }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // ESTADOS para validaciones, spinner, alertas
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [errors, setErrors] = useState({});

  // Función de validaciones
  const validateForm = (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const whatsappRegex = /^[0-9]{10,15}$/; // Acepta 10 a 15 dígitos
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
        "Por favor, ingresa un número de WhatsApp válido (10-15 dígitos).";
    }
    // if (!data.restaurant_name) {
    //   fieldErrors.restaurant_name =
    //     "Por favor, ingresa el nombre de tu restaurante.";
    // }
    // if (!data.how_did_you_find_us) {
    //   fieldErrors.how_did_you_find_us =
    //     "Por favor, selecciona cómo te enteraste de nosotros.";
    // }

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  // Manejo de Submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage("");
    setAlertType("");
    setErrors({});

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Validaciones
    if (!validateForm(data)) {
      setAlertMessage("Por favor, corrige los errores en el formulario.");
      setAlertType("error");
      return;
    }

    try {
      setLoading(true);
      // Ajusta la URL según tu backend
      const response = await axios.post(`${apiUrl}/prospectswebsite`, data);

      if (response.status === 200) {
        alert("¡Email enviado!");
        e.target.reset();
      } else {
        alert("¡Email enviado!");
        e.target.reset();
      }
    } catch (error) {
      console.error(
        "Error al enviar formulario:",
        error.response?.data || error.message
      );
      setAlertMessage(
        "Hubo un error al enviar tu información. Intenta de nuevo."
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
        <div className="text-center max-w-4xl mb-4">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Podrías estar obteniendo MUCHAS más ventas en línea.
          </h1>
          <p className="text-gray-600 text-sm md:text-2xl">
            Impulso Restaurantero es la manera más sencilla de CONSEGUIR MÁS
            reservas en línea y ofrecer la mejor experiencia a tus clientes.
            Descubre cómo lo hacemos.
          </p>
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
                {/* <p className="text-4xl font-bold text-white">$9,999</p> */}
                <p className="text-lg text-gray-300">Facturado mensualmente</p>
              </div>
              <div className="text-center"></div>
            </div>
            <Link href="/prueba">
              <button className="button-small">Demo Gratis</button>
            </Link>
          </div>
        </div>

        <div className="text-center max-w-4xl mb-4 mt-4">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Obtén una demostración
          </h1>
          <p className="text-gray-600 text-sm md:text-2xl mb-4">
            Contáctanos a continuación y te responderemos lo antes posible
          </p>

          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <p className="text-xs text-white">
                Pide tu prueba gratis y recibe información única de restaurantes
                exitosos
              </p>
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
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      placeholder="Número de WhatsApp"
                      pattern="[0-9]{10,15}"
                      className={styles.hsInput}
                    />
                    {errors.whatsapp && (
                      <span className={styles.errorText}>
                        {errors.whatsapp}
                      </span>
                    )}
                  </div>
                  {/* <div>
                    <label htmlFor="restaurant_name"></label>
                    <input
                      type="text"
                      id="restaurant_name"
                      name="restaurant_name"
                      placeholder="Nombre del restaurante"
                      className={styles.hsInput}
                    />
                    {errors.restaurant_name && (
                      <span className={styles.errorText}>
                        {errors.restaurant_name}
                      </span>
                    )}
                  </div> */}

                  {/* <div>
                    <select
                      id="how_did_you_find_us"
                      name="how_did_you_find_us"
                      className={styles.hsInput}
                    >
                      <option
                        value=""
                        disabled
                        selected
                        className="text-gray-500"
                      >
                        ¿Cómo te enteraste de nosotros?
                      </option>
                      <option value="facebook">Facebook</option>
                      <option value="google">Google</option>
                      <option value="tiktok">Tik Tok</option>
                      <option value="instagram">Instagram</option>
                      <option value="email">Email</option>
                      <option value="youtube">Youtube</option>
                      <option value="podcast">Podcast</option>
                      <option value="amigo">Amigo o referencia</option>
                      <option value="otro">Otro</option>
                    </select>
                    {errors.how_did_you_find_us && (
                      <span className={styles.errorText}>
                        {errors.how_did_you_find_us}
                      </span>
                    )}
                  </div> */}

                  <div>
                    {/* Campos ocultos */}
                    <input
                      type="hidden"
                      name="origin"
                      value="PruebaGratisFormulariodemogratis"
                    />
                    <input type="hidden" name="status" value="creado" />

                    <button type="submit" className={styles.hsSubmit}>
                      Sí! Quiero el Demo GRATIS
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <InlineWidget url="https://calendly.com/clientes-impulsorestaurantero/30min?month=2025-03" />
      </div>
      <WhatsappButton />
    </>
  );
}

export default PruebaGratis;

import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBarBlack/NavBarEs";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../components/SwiperPrueba/Banner.module.css"; // Importa los estilos CSS

function Prueba() {
  const router = useRouter();

  // Pregunta inicial
  const preguntaInicial = {
    id: 1,
    texto: "¿Ya abriste tu negocio o estás en planeación?",
    opciones: [
      { id: "planeacion", texto: "Planeación" },
      { id: "operando", texto: "Operando" },
    ],
  };

  // Estados
  const [contexto, setContexto] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [cargandoPreguntas, setCargandoPreguntas] = useState(false);
  const [error, setError] = useState(null);

  // NUEVO: estado para spinner (loading)
  const [loading, setLoading] = useState(false);

  // Datos del prospecto
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    whatsapp: "",
    responses: [],
    origin: "inteligenciaArtificial",
    status: "creado",
  });

  // URL de tu backend
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Elegir “Planeación” u “Operando”
  const handleSeleccionInicial = (opcion) => {
    setContexto(opcion);
  };

  // Cargar preguntas
  useEffect(() => {
    if (!contexto) return;

    const fetchPreguntas = async () => {
      setCargandoPreguntas(true);
      setError(null);

      try {
        const response = await axios.get(
          `${apiUrl}/questionsByContext/${contexto}`
        );
        const data = response.data;

        if (data.status === "success") {
          setPreguntas(data.data);
        } else {
          throw new Error("Error al cargar preguntas");
        }
      } catch (err) {
        console.error("Error al cargar preguntas:", err.message);
        setError(err.message);
      } finally {
        setCargandoPreguntas(false);
      }
    };

    fetchPreguntas();
  }, [contexto]);

  // Checkbox
  const handleCheckboxChange = (pregunta, opcion) => {
    setRespuestas((prev) => {
      const existeRespuesta = prev.find(
        (resp) =>
          resp.pregunta_id === pregunta.id && resp.option_id === opcion.id
      );

      if (existeRespuesta) {
        return prev.filter(
          (resp) =>
            !(resp.pregunta_id === pregunta.id && resp.option_id === opcion.id)
        );
      }

      const respuestasMismaPregunta = prev.filter(
        (resp) => resp.pregunta_id === pregunta.id
      );
      if (respuestasMismaPregunta.length < 2) {
        return [...prev, { pregunta_id: pregunta.id, option_id: opcion.id }];
      }
      return prev;
    });
  };

  // Radio
  const handleRadioChange = (pregunta, opcion) => {
    setRespuestas((prev) =>
      prev
        .filter((resp) => resp.pregunta_id !== pregunta.id)
        .concat({ pregunta_id: pregunta.id, option_id: opcion.id })
    );
  };

  // Toggle modal
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // Validaciones de datos
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

  // Submit del prospecto (modal)
  const handleProspectSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    // Construir payload
    const payload = {
      ...form,
      responses: respuestas.map((resp) => {
        const preguntaEncontrada = preguntas.find(
          (p) => p.id === resp.pregunta_id
        );
        return {
          pregunta: preguntaEncontrada?.statement || "",
          opciones: [resp.option_id],
          option_id: resp.option_id,
        };
      }),
    };

    console.log("Payload final al backend:", payload);

    try {
      setLoading(true); // MOSTRAR SPINNER
      const response = await axios.post(
        `${apiUrl}/prospectsWithRecommendations`,
        payload
      );

      setLoading(false); // OCULTAR SPINNER

      if (response.data.status === "success") {
        setModalOpen(false);
        // Redirigir a /gracias
        router.push("/gracias");
      } else {
        throw new Error("Error al enviar respuestas.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error al enviar respuestas:", error);
      alert("Hubo un error al procesar tus respuestas. Intenta nuevamente.");
    }
  };

  // Botón "Enviar Respuestas"
  const handleEnviarRespuestas = () => {
    console.log("Respuestas seleccionadas:", respuestas);
    setModalOpen(true);
  };

  // Render
  if (!contexto) {
    return (
      <>
        <NavBar />
        <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
          <div className="text-center max-w-4xl">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Descubre cómo transformamos tu negocio con tecnología e
              inteligencia artificial
            </h1>
            <p className="text-gray-600 text-sm md:text-2xl">
              Impulso Restaurantero es la manera más sencilla de CONSEGUIR MÁS
              reservas en línea y ofrecer la mejor experiencia a tus clientes,
              empieza contestando la siguiente encuesta.
            </p>
          </div>
          <div className="space-y-4 text-center pt-4">
            <h2 className="text-2xl font-bold">{preguntaInicial.texto}</h2>
            <div className="flex justify-center space-x-4 items-center">
              {preguntaInicial.opciones.map((opcion) => (
                <button
                  key={opcion.id}
                  onClick={() => handleSeleccionInicial(opcion.id)}
                  className="mt-2 px-6 py-3 bg-principal text-white font-bold rounded-lg hover:bg-yellow-400 transition"
                >
                  {opcion.texto}
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (cargandoPreguntas) return <p>Cargando preguntas...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <NavBar />
      <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
        <form className="bg-white rounded p-6 shadow">
          {preguntas.map((pregunta) => (
            <div key={pregunta.id} className="mb-6">
              <p className="text-lg md:text-xl font-semibold text-black mb-4">
                {pregunta.statement}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pregunta.statement ===
                "¿Quién será tu público objetivo principal? escoge 2"
                  ? pregunta.options.map((opcion) => (
                      <label
                        key={opcion.id}
                        className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={opcion.id}
                          onChange={() =>
                            handleCheckboxChange(pregunta, opcion)
                          }
                          checked={respuestas.some(
                            (resp) =>
                              resp.pregunta_id === pregunta.id &&
                              resp.option_id === opcion.id
                          )}
                          className="form-checkbox text-principal focus:ring-secundario"
                        />
                        <span className="text-base md:text-lg">
                          {opcion.text}
                        </span>
                      </label>
                    ))
                  : pregunta.options.map((opcion) => (
                      <label
                        key={opcion.id}
                        className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={opcion.id}
                          onChange={() => handleRadioChange(pregunta, opcion)}
                          checked={respuestas.some(
                            (resp) =>
                              resp.pregunta_id === pregunta.id &&
                              resp.option_id === opcion.id
                          )}
                          required
                          className="form-radio text-principal focus:ring-secundario"
                        />
                        <span className="text-base md:text-lg">
                          {opcion.text}
                        </span>
                      </label>
                    ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            className="mt-8 px-6 py-3 bg-principal text-white font-bold rounded-lg hover:bg-yellow-400 transition"
            onClick={handleEnviarRespuestas}
          >
            Enviar Respuestas
          </button>
        </form>
      </div>

      {/* Modal con formulario */}
      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Llena los datos para recibir tus recomendaciones</h2>
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

              {/* SPINNER mientras loading sea true */}
              {loading && (
                <div className="flex flex-col items-center justify-center space-y-4 my-4">
                  <div className="animate-spin w-16 h-16 border-4 border-principal border-t-transparent rounded-full"></div>
                  <p className="text-xl font-semibold text-yellow-300">
                    Generando recomendaciones con IA, por favor espera...
                  </p>
                </div>
              )}

              <form id="customForm" onSubmit={handleProspectSubmit}>
                <div>
                  <label htmlFor="first_name"></label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Nombre(s) completo"
                    className={styles.hsInput}
                    value={form.first_name}
                    onChange={(e) =>
                      setForm({ ...form, first_name: e.target.value })
                    }
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
                    value={form.last_name}
                    onChange={(e) =>
                      setForm({ ...form, last_name: e.target.value })
                    }
                  />
                  {errors.last_name && (
                    <span className={styles.errorText}>{errors.last_name}</span>
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
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
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
                    pattern="[0-9]{10}"
                    className={styles.hsInput}
                    value={form.whatsapp}
                    onChange={(e) =>
                      setForm({ ...form, whatsapp: e.target.value })
                    }
                  />
                  {errors.whatsapp && (
                    <span className={styles.errorText}>{errors.whatsapp}</span>
                  )}
                </div>
                <input type="hidden" name="origin" value="citaenvivo" />
                <input type="hidden" name="status" value="creado" />
                <div>
                  <button type="submit" className={styles.hsSubmit}>
                    Sí, ayúdame ¡ya!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Prueba;

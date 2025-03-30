import React from "react";

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Política de Privacidad</h1>
      <p>
        En Impulso Restaurantero, valoramos tu privacidad y estamos
        comprometidos a proteger tus datos personales. Esta política describe
        cómo recopilamos, usamos y protegemos tu información.
      </p>
      <h2>1. Información que recopilamos</h2>
      <ul>
        <li>
          Datos de contacto, como nombre, correo electrónico y número de
          teléfono.
        </li>
        <li>Información sobre tus interacciones con nuestra aplicación.</li>
      </ul>
      <h2>2. Cómo usamos tu información</h2>
      <p>
        Utilizamos la información que recopilamos para brindarte un mejor
        servicio, incluyendo:
      </p>
      <ul>
        <li>
          Conexión con WhatsApp a través de nuestros servicios integrados.
        </li>
        <li>Respuestas rápidas y personalizadas mediante webhooks.</li>
      </ul>
      <h2>3. Compartir tu información</h2>
      <p>
        No compartimos tu información con terceros, excepto cuando sea necesario
        para operar nuestros servicios.
      </p>
      <h2>4. Contacto</h2>
      <p>
        Si tienes preguntas sobre esta política, contáctanos en{" "}
        <a href="mailto:soporte@impulsorestaurantero.com">
          soporte@impulsorestaurantero.com
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;

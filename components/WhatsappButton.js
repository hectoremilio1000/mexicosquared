import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  return (
    <div className="fixed bottom-0 right-0 h-screen flex items-end pr-4 pb-4">
      <a
        href="https://wa.me/5215531491808?text=Hola%20quiero%20un%20software%20exitoso%20con%20growthsuite"
        target="_blank"
        className="rounded-full p-4 text-white bg-[#25D366] flex items-center justify-center"
      >
        <FaWhatsapp className="text-[30px]" />
      </a>
    </div>
  );
};

export default WhatsappButton;

import React from "react";
import NavBar from "../components/NavBarBlack/NavBarEs";
import Link from "next/link";

export default function Gracias() {
  return (
    <>
      <NavBar />
      <div className=" flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-36">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          ¡Gracias por confiar en nosotros!
        </h1>
        <p className="text-gray-700 mb-2">
          Hemos enviado tus respuestas y nuestras recomendaciones a tu correo.
        </p>
        <p className="text-gray-700 mb-6">
          Por favor, revisa tu bandeja de entrada (o carpeta de spam) para
          encontrar el correo con más detalles.
        </p>
        <Link href="/">
          <button className="px-6 py-3 bg-principal text-white font-bold rounded-lg hover:bg-yellow-400 transition">
            Volver al Inicio
          </button>
        </Link>
      </div>
    </>
  );
}

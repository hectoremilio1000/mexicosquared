import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useAppContext } from "../context/Context";

function FooterFinal() {
  const { espa, ingles } = useAppContext();

  return (
    <>
      {espa ? (
        <footer className=" fondo2 py-12">
          <div className="max-w-screen-lg mx-auto px-2 sm:px-2 lg:px-8">
            <nav
              className="-my-2 flex flex-wrap justify-center"
              style={{ width: "100%" }}
            >
              <div className=" py-2">
                <Link href="/" className="nav-link hover:text-yellow-400">
                  Inicio
                </Link>
              </div>
              <div className="py-2">
                <Link
                  href="/casosexito"
                  className="nav-link hover:text-yellow-400"
                >
                  Casos de éxito
                </Link>
              </div>
              {/* <div className="px-5 py-2">
                <Link
                  href="/comolohacemos"
                  className="nav-link hover:text-yellow-400"
                >
                  Cómo lo hacemos
                </Link>
              </div> */}
              {/* <div className="px-5 py-2">
                            <Link
                                href="/contacto"
                                className="nav-link hover:text-yellow-400"
                            >
                                Contacto
                            </Link>
                        </div> */}
              <div className="px-5 py-2">
                <Link
                  href="/contacto"
                  className="nav-link hover:text-yellow-400"
                >
                  Contacto
                </Link>
              </div>
            </nav>
            {/* <div className="mt-8 flex justify-center space-x-6">

                        <a href="https://www.facebook.com/Lalloronacantinacdmx">
                            <FaFacebook className="w-6 h-6 text-blue-600 hover:text-white" />
                        </a>
                        <a href="https://www.instagram.com/cantinalallorona/">
                            <FaInstagram className="w-6 h-6 text-pink-600 hover:text-white" />

                        </a>
                    </div> */}
          </div>
          <div className="pt-3">
            <p className="text-white text-center text-xl">
              GROWTHSUITE Copyright 2024
            </p>
          </div>
        </footer>
      ) : (
        <footer className=" fondo2 py-12">
          <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
            <nav
              className="-my-2 flex flex-wrap justify-center"
              style={{ width: "100%" }}
            >
              <div className="px-5 py-2">
                <Link href="/reserva">
                  <p className="text-white hover:text-white">Book</p>
                </Link>
              </div>
              <div className="px-5 py-2">
                <Link href="/menullorona">
                  <p className="text-white hover:text-white">Menu</p>
                </Link>
              </div>
              <div className="px-5 py-2">
                <Link href="/mezcal">
                  <p className="text-white hover:text-white">Mezcal</p>
                </Link>
              </div>
              <div className="px-5 py-2">
                <Link href="/premios">
                  <p className="text-white hover:text-white">Rewards</p>
                </Link>
              </div>
              <div className="px-5 py-2">
                <Link href="/franquicias">
                  <p className="text-white hover:text-white">Franchises</p>
                </Link>
              </div>
              <div className="px-5 py-2">
                <Link href="/vacantes">
                  <p className="text-white hover:text-white">Vacancies</p>
                </Link>
              </div>
            </nav>
            <div className="mt-8 flex justify-center space-x-6">
              <a href="https://www.facebook.com/Lalloronacantinacdmx">
                <FaFacebook className="w-6 h-6 text-blue-600 hover:text-white" />
              </a>
              <a href="https://www.instagram.com/cantinalallorona/">
                <FaInstagram className="w-6 h-6 text-pink-600 hover:text-white" />
              </a>
            </div>
          </div>
          <div className="pt-3">
            <p className="text-white text-center text-2xl">
              Llorona Copyright 2015
            </p>
          </div>
        </footer>
      )}
    </>
  );
}

export default FooterFinal;

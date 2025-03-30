import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../data/imagenes/logo_alta_sin_nombre.png";

// css navbar

// icons react
import { FaAlignRight } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./navbar.module.css";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/Context";

const usFlag =
  "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/banderas/um.svg";

const mxFlag =
  "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/banderas/mx.svg";

function NavBarWhite() {
  const [current, setCurrent] = useState("");
  const [linkswraper, setLinkswraper] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const { espa, ingles, onIdiomaIngles, onIdiomaEspa } = useAppContext();

  // console.log(espa, ingles);

  const changeBackground = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY >= 80) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    }
  };
  if (typeof window !== "undefined") {
    // browser code
    window.addEventListener("scroll", changeBackground);
  }
  const navigate = useRouter();

  const handleNavbar = () => {
    setLinkswraper(!linkswraper);
  };

  const cambiarComponent = (e) => {
    setCurrent(e.key);
    navigate.push(`${e.key}`);
  };

  return (
    <div
      className={
        navbar ? "header-container-white sticky" : "header-container-white"
      }
    >
      <div className="max-w-[1184px] flex items-center justify-between flex-wrap w-full mx-auto  px-4">
        {/* <Link href="/">
        <Image src={logo} width={100}
          alt="llorona" priority />

      </Link> */}
        <div className="header-logo-white">
          <div>
            <Link href="/" className="logo ">
              <Image src={logo} width={100} alt="llorona" priority />
            </Link>
          </div>

          <div className="flex justify-center">
            <FaAlignRight
              className="toggle-icon-white mr-2"
              onClick={() => {
                handleNavbar();
              }}
            />
            <div
              onClick={onIdiomaIngles}
              className="hover:text-emerald-500 toggle-icon-white cursor-pointer mr-2"
            >
              <img src={usFlag} width={20} height={20} />
            </div>

            <div
              onClick={onIdiomaEspa}
              className="hover:text-emerald-500 cursor-pointer toggle-icon-white"
            >
              <img src={mxFlag} width={20} height={20} />
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            handleNavbar();
          }}
          className={
            linkswraper ? "linkswraper-white active" : "linkswraper-white"
          }
        >
          <>
            {" "}
            {espa ? (
              <>
                {" "}
                <li key="0">
                  <Link
                    href="/"
                    className="nav-link-white hover:text-emerald-500"
                  >
                    Inicio
                  </Link>
                </li>
                <li key="1">
                  <Link
                    href="/reserva"
                    className="nav-link-white hover:text-emerald-500"
                  >
                    Reserva
                  </Link>
                </li>
                <li key="2">
                  <Link
                    href="/menullorona"
                    className="nav-link-white hover:text-emerald-500"
                  >
                    Menu
                  </Link>
                </li>
                <li key="3">
                  <Link
                    href="/mezcal"
                    className="nav-link-white hover:text-emerald-500"
                  >
                    Mezcal
                  </Link>
                </li>
                {/* <li key="4">
                  <Link
                    href="/salsavivo"
                    className="nav-link-white hover:text-emerald-500"
                  >
                    Salsa en Vivo
                  </Link>
                </li> */}
                {/* <li key="5">
                  <Link
                    href="/paquetes"
                    className="nav-link-white hover:text-emerald-500"
                  >
                    Paquetes navideños
                  </Link>
                </li> */}
              </>
            ) : (
              <>
                {" "}
                <li key="0">
                  <Link
                    href="/"
                    className="nav-link-white hover:text-emerald-500"
                  >
                    Home
                  </Link>
                </li>
                <li key="1">
                  <Link
                    href="/reserva"
                    className="nav-link-white hover:text-emerald-500"
                  >
                    Book Now
                  </Link>
                </li>
                <li key="2">
                  <Link
                    href="/menullorona"
                    className="nav-link-white hover:text-emerald-500"
                  >
                    Menu
                  </Link>
                </li>
                <li key="3">
                  <Link
                    href="/mezcal"
                    className="nav-link-white hover:text-emerald-500"
                  >
                    Mezcal
                  </Link>
                </li>
                {/* <li key="4">
                  <Link
                    href="/salsavivo"
                    className="nav-link-white hover:text-emerald-500"
                  >
                    Live salsa
                  </Link>
                </li> */}
                <li key="5">
                  <Link
                    href="/mixologia"
                    className="nav-link-white hover:text-emerald-500"
                  >
                    Mixology
                  </Link>
                </li>{" "}
              </>
            )}
          </>
        </div>
        <div className="header-icons">
          <a
            key="0"
            href="https://www.facebook.com/Lalloronacantinacdmx"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="icon facebook-icon hover:text-emerald-500 cursor-pointer" />
          </a>
          <a
            key="1"
            href="https://www.instagram.com/cantinalallorona/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="icon instagram-icon hover:text-emerald-500" />
          </a>
          <div
            onClick={onIdiomaIngles}
            className="hover:text-emerald-500 cursor-pointer"
          >
            <img src={usFlag} width={20} height={20} />
          </div>

          <div
            onClick={onIdiomaEspa}
            className="hover:text-emerald-500 cursor-pointer"
          >
            <img src={mxFlag} width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBarWhite;

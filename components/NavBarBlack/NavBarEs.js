import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../data/imagenes/logoGrowthSuite copyAzul.png";

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

function NavBar() {
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
    <div className={navbar ? "header-container sticky" : "header-container"}>
      <div className="flex items-center justify-between flex-wrap w-full mx-auto py-2  px-2 md:px-6 bg-slate-950">
        {/* <Link href="/">
        <Image src={logo} width={100}
          alt="llorona" priority />

      </Link> */}
        <div className="header-logo">
          <div>
            <Link href="/" className="logo ">
              <Image
                src={logo}
                width={150}
                alt="Impulso Restaurantero"
                priority
              />
            </Link>
          </div>

          <div className="flex justify-center">
            <FaAlignRight
              className="toggle-icon mr-2"
              onClick={() => {
                handleNavbar();
              }}
            />
            {/* <div
              onClick={onIdiomaIngles}
              className="hover:text-amber-600 toggle-icon cursor-pointer mr-2"
            >
              <img src={usFlag} width={20} height={20} />
            </div> */}

            {/* <div
              onClick={onIdiomaEspa}
              className="hover:text-amber-600 cursor-pointer toggle-icon"
            >
              <img src={mxFlag} width={20} height={20} />
            </div> */}
          </div>
        </div>
        <div
          onClick={() => {
            handleNavbar();
          }}
          className={linkswraper ? "linkswraper active" : "linkswraper"}
        >
          <>
            {" "}
            {espa ? (
              <>
                {" "}
                <li key="0">
                  <Link href="/" className="nav-link hover:text-yellow-400">
                    Inicio
                  </Link>
                </li>
                <li key="1">
                  <Link
                    href="/casosexito"
                    className="nav-link hover:text-yellow-400"
                  >
                    Casos de éxito
                  </Link>
                </li>
                {/* <li key="2">
                  <Link
                    href="/comolohacemos"
                    className="nav-link hover:text-yellow-400"
                  >
                    Cómo lo hacemos
                  </Link>
                </li> */}
                {/* <li key="3">
                  <Link
                    href="/contacto"
                    className="nav-link hover:text-yellow-400"
                  >
                    Contacto
                  </Link>
                </li> */}
                {/* <li key="4">
                  <Link href="/blog" className="nav-link hover:text-yellow-400">
                    Blog
                  </Link>
                </li> */}
                <li key="5">
                  <Link
                    href="/contacto"
                    className="nav-link hover:text-yellow-400"
                  >
                    Contacto
                  </Link>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li key="0">
                  <Link href="/" className="nav-link hover:text-emerald-500">
                    Home
                  </Link>
                </li>
                <li key="1">
                  <Link
                    href="/reserva"
                    className="nav-link hover:text-emerald-500"
                  >
                    Case Studies
                  </Link>
                </li>
                <li key="2">
                  <Link
                    href="/menullorona"
                    className="nav-link hover:text-emerald-500"
                  >
                    About
                  </Link>
                </li>
                <li key="3">
                  <Link
                    href="/mezcal"
                    className="nav-link hover:text-emerald-500"
                  >
                    Contact
                  </Link>
                </li>
                {/* <li key="4">
                  <Link
                    href="/salsavivo"
                    className="nav-link hover:text-emerald-500"
                  >
                    Live salsa
                  </Link>
                </li> */}
              </>
            )}
          </>
        </div>
        <div className="header-icons">
          <a
            key="0"
            href="https://www.facebook.com/profile.php?id=61572817134152"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="icon facebook-icon hover:text-emerald-500 cursor-pointer" />
          </a>
          <a
            key="1"
            href="https://www.instagram.com/impulsorestaurantero?igsh=ODczMzE2bTVnbnB3&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="icon instagram-icon hover:text-emerald-500" />
          </a>
          {/* <div
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default NavBar;

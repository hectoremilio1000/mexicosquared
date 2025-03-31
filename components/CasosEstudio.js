import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import Link from "next/link";
const CasosEstudio = () => {
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

  // const transform = useMotionTemplate`translate3d(${txSpring}%, ${tySpring}em, 0px) scale3d(1, 1, 1) rotateX(${xSpring}deg) rotateY(${ySpring}deg) rotateZ(${zSpring}deg)`;
  const transform = useMotionTemplate`translate3d(${translateX}%, ${translateY}em, 0px) scale3d(1, 1, 1) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Valores ajustados para movimientos más suaves
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Ajustes de rotación más suaves
    const rotateX = (height / 2 - mouseY) / 20; // Divide por un número mayor para suavizar
    const rotateY = (mouseX - width / 2) / 20; // Divide por un número mayor para suavizar

    // Traslación ajustada para que se mueva menos y de forma más controlada
    const tX = ((mouseX - width / 2) / width) * 10; // Multiplicador más bajo para control
    const tY = ((mouseY - height / 2) / height) * 10; // Multiplicador más bajo para control

    // Establecer los valores en los motionValues
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
  const handleScroll = (e) => {
    console.log(e);
    translateY.set(50);
  };

  return (
    <div
      className="flex flex-col items-center justify-center py-5 px-2"
      ref={ref}
      onScroll={handleScroll}
      onMouseMove={handleMouseMove}
      // onMouseLeave={handleMouseLeave}
    >
      <div className="heading-block flex flex-col justify-center items-center mb-16">
        <motion.span
          drag="x"
          dragConstraints={{
            top: 0,
            left: -50,
            right: 50,
            bottom: 0,
          }}
          className="rounded-full bg-primary text-white text-principal font-semibold px-4 py-2 mb-4 mt-20 block"
        >
          #BUSCAMOSELÉXITO
        </motion.span>
        <motion.h2
          transition={{ duration: 0.5 }} // Duración ajustada
          initial={{ opacity: 0, y: 50 }} // Cambio a 50 para que la animación inicie más rápido
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} // Solo ejecuta la animación una vez
          className="title2-tw text-center uppercase"
        >
          Con la confianza de más de 1,000+ EMPRESAS <br /> DEL MUNDO
        </motion.h2>
      </div>
      <div className="w-[100%] max-w-[1085px] flex flex-col justify-center items-center">
        <div className="content grid grid-cols-1 md:grid-cols-2 gap-8 px-[20px] items-start">
          <div className="w-full flex flex-col items-center gap-4 p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <Link href="/casosexito">
              <img
                className=" w-full object-contain"
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/growthsuite/casosestudio/casosEstudio.png"
                alt=""
              />
            </Link>
            <h2 className="title3-tw text-center">Historias Inspiradoras</h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Inspírate con relatos de clientes que superaron retos únicos para
              transformar sus negocios a través de soluciones de software
              innovadoras. Conoce cómo growthsuite fue pieza clave en su éxito.
            </p>
            <Link href="/casosexito">
              <button className="button-small">Ver Historias</button>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center gap-4 justify-start p-8 bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
            <img
              className=" w-full object-contain"
              src="https://imagenesrutalab.s3.amazonaws.com/impulsoRestaurantero/seccion1/649c99bf1948a130a34f7abb_Wins+copy.png"
              alt=""
            />
            <h2 className="title3-tw text-center">Construye tu éxito</h2>
            <p className="parrafo-tw paragraph-feature text-center">
              Explora nuestra colección en constante actualización de proyectos
              que van desde pequeñas implementaciones hasta sistemas complejos,
              donde cada caso demuestra cómo el software impulsa el crecimiento.
            </p>
            <Link href="/casosexito">
              <button className="button-small">VER CLIENTES EXITÓSOS</button>
            </Link>
          </div>
          <div className="w-full md:col-span-2 relative">
            <div className="w-full bg-[#fbfbfad9] border-[1px] border-[#e5e5e5] rounded-[1.2em]">
              <div className="w-full relative p-8 md:p-16 flex items-start justify-start flex-col overflow-hidden perspective md:pr-[30%]">
                <div className="z-20 relative content-text flex flex-col justify-center items-center gap-6">
                  <h2 className="title3-tw">
                    GROWTHSUITE <br />
                    TE AYUDA A
                    <br />
                    DESARROLLAR <br />
                    SOLUCIONES <br /> TECNOLÓGICAS <br />
                    PARA TU ÉXITO
                  </h2>
                  <p className="max-w-[24.5em] parrafo-tw paragraph-feature text-center">
                    Descubre por qué cientos de empresas en el mundo confían en
                    nuestras soluciones para crear, mejorar e impulsar sus
                    operaciones tecnológicas con resultados sobresalientes.
                  </p>
                  <Link href="/casosexito">
                    <button className="button-small">
                      VER CASOS DE ESTUDIO
                    </button>
                  </Link>
                </div>
                <motion.img
                  style={{
                    transformStyle: "preserve-3d",
                    transform,
                  }}
                  className="z-10 rounded-[1.2em] w-[100%] relative mt-4 md:mb-0 md:w-[50%] md:absolute md:right-0 md:top-0"
                  src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/growthsuite/casosestudio/softwareexito.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasosEstudio;

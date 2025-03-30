import React from "react";
import styles from "./About.module.css";
const About = () => {
  return (
    <div className={`${styles.containerAbout}`}>
      <div className="max-w-[1300px] mx-auto px-[20px]">
        <div className="w-full flex justify-end">
          <div className="box shadow-2xl md:w-1/2 bg-white border-[1px] border-[#e5e5e5] rounded-[1.2em] p-8 md:py-16 md:px-16 flex flex-col">
            <h1 className=" titlebanner-tw text-center text-clip mb-1 md:mb-4">
              GrowthSuite
            </h1>

            <p className="title4-tw paragraph-feature mb-6">
              GrowthSuite es una empresa de software dedicada a impulsar el
              crecimiento y la innovación de cientos de negocios alrededor del
              mundo. A través de soluciones que integran inteligencia
              artificial, chatbots, aplicaciones web y móviles, tecnología 3D y
              estrategias de web scraping, hemos ayudado a múltiples empresas a
              escalar sus operaciones y a posicionarse de forma competitiva en
              sus respectivos mercados.
            </p>
            <br />
            <p className="title4-tw paragraph-feature mb-6">
              Fundada en 2024, hemos trabajado con más de 1,000 clientes y hemos
              contribuido a que numerosas organizaciones alcancen ingresos
              millonarios gracias a nuestra plataforma exclusiva de crecimiento.
              Nuestro enfoque se basa en la transformación digital integral,
              combinando soluciones de software de vanguardia con una estrategia
              sólida para maximizar el retorno de inversión y los resultados
              comerciales de cada proyecto.
            </p>
            <div className="flex justify-around mt-6">
              {/* <div>
                <h1 className="counter font-bold">10</h1>
                <p className="font-bold title4-tw text-block-6">Restaurantes</p>
              </div>
              <div>
                <h1 className="counter font-bold">3</h1>
                <p className="font-bold title4-tw text-block-6">Dueños</p>
              </div> */}
              <div>
                <h1 className="counter font-bold">+$2B</h1>
                <p className="font-bold title4-tw text-block-6">Ganancias</p>
              </div>
              <div>
                <h1 className="counter font-bold ">+1,000</h1>
                <p className="font-bold title4-tw text-block-6">Clientes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

import React from "react";
import title from "../Main/title.module.css";
import card from "../Main/card.module.css";

function MezcalInfo() {
  return (
    <div className="container-llorona py-2">
      <div className="px-2">
        <h1 className={title.fontTitlemain}>Mezcal Llorona</h1>
      </div>
      <div>
        <h4 className="text-3xl text-center mx-auto">Un amigo, un mezcal</h4>

        <div className="linea"></div>
      </div>

      <div className="py-3 px-3 row-qh">
        <p className="w-full max-w-[800px]  mx-auto text-center sm:text-2xl text-xl text-black">
          Bienvenido a La Llorona Cantina, el lugar donde las fronteras
          desaparecen y la diversidad se convierte en nuestra mejor compañía. En
          nuestra cantina, no solo ofrecemos mezcales artesanales de calidad,
          sino también la oportunidad de conocer a amigos de todos los rincones
          del mundo.
        </p>

        <p className="w-full max-w-[800px] mx-auto  text-center sm:text-2xl text-xl text-black">
          En La Llorona, creemos que la mejor forma de disfrutar un buen mezcal
          es en excelente compañía. Nuestro ambiente acogedor y vibrante es el
          escenario perfecto para entablar conversaciones significativas con
          personas de diferentes culturas. ¡Aquí, cada visita se convierte en
          una experiencia internacional!
        </p>
      </div>
      <div className="subSubDiv1Banner">
        <a href="https://wa.me/+5215549242477">
          <button type="button" className="buttonComponente">
            Buscanos aqui
          </button>
        </a>
      </div>
    </div>
  );
}

export default MezcalInfo;

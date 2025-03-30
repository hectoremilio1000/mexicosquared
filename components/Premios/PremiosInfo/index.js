import React from 'react'
import title from "../../Main/title.module.css"
import card from "../../Main/card.module.css"
import Link from 'next/link';

function PremiosInfo() {
  return (
    <div className="container-llorona py-2">
      <div className='px-2'>
        <h1 className={title.fontTitlemain}>Premio Best Burguer</h1>
      </div>
      <div>
        <h4 className={title.fontTitleSub}>In Mexico 2023</h4>

        <div className="linea"></div>
      </div>



      <div className="py-3 px-3 row-qh">
        <p className="text-center sm:text-2xl text-xl text-black">
          <b>¡Damas y caballeros, amantes de la buena comida y aventureros del paladar!</b>
        </p>

        <p className="text-center sm:text-2xl text-xl text-black">
          Hoy nos complace anunciar que nuestro restaurante ha sido galardonado con el prestigioso premio a la Mejor Hamburguesa, ¡y no es para menos! Permítanme presentarles nuestra deliciosa y aclamada hamburguesa con aros de cebolla y queso cheddar.
        </p>

        <p className="text-center sm:text-2xl text-xl text-black">
          Esta obra maestra culinaria comienza con una jugosa y sabrosa carne de res de primera calidad, seleccionada con esmero y sazonada a la perfección con nuestra exclusiva mezcla de especias </p> <h4 className={title.fontTitleSub}>MEXICANAS</h4>


        <p className="text-center sm:text-2xl text-xl text-black">
          La carne se cocina a fuego lento para asegurar que cada bocado esté lleno de sabor y suavidad. Lo que sigue es la fusión de dos elementos que elevan esta hamburguesa al siguiente nivel: los aros de cebolla y el queso cheddar. Nuestros aros de cebolla se preparan con una receta secreta que les otorga un exterior crujiente y dorado que contrasta perfectamente con la tierna cebolla en su interior. Y cuando hablamos del queso cheddar, no escatimamos en calidad. Este queso añejo se funde sobre la carne caliente, proporcionando un sabor suave y aterciopelado que se combina de manera armoniosa con los demás ingredientes.
        </p>

        <p className="text-center sm:text-2xl text-xl text-black">
          Entonces, ¿por qué no dejarse tentar por esta exquisita hamburguesa, ganadora del premio a la Mejor Hamburguesa por la revista <b>ELLE México</b>? Les invitamos a visitar nuestro restaurante y saborear este manjar que ha conquistado los paladares de críticos y comensales por igual. No pierdan la oportunidad de disfrutar de esta hamburguesa que se ha ganado un lugar en el Olimpo de las delicias culinarias. ¡Los esperamos para que compartan con nosotros esta experiencia única y deliciosa!
        </p>


      </div>
      <div className="subSubDiv1Banner">
        <Link href="/reserva">
          <button type="button" className="buttonComponente">
            ¡Reserva!
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PremiosInfo
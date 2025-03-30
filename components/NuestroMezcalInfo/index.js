import React from 'react'
import title from "../Main/title.module.css"


function NuestroMezcalInfo() {
  return (
    <div className="mt-2">
      <div>
        <h4 className={title.fontTitlemain}>Nuestro Mezcal</h4>
        <h2 className={title.fontTitleSub}>
          Agaves Coyote, Coyote Cannabis & Jabalí
        </h2>
        <div className="linea"></div>
      </div>

      <div className="px-3 row-qh">
        <p className="text-center sm:text-2xl text-xl text-black">
          Preferimos la exclusividad, por tanto decidimos elaborar nuestro
          mezcal con agaves silvestes muy escazos siendo el Jabalí y el Coyote
          nuestra elección por su identidad en sus sabores y facilidad al
          paladar.
        </p>

        <div className="px-3 row-qh">
          
          <ol className='sm:text-2xl text-xl text-black list-disc px-4'>
            <li className='list'>
                Jabalí: el maguey Jabalí es un agave extravagante rojo de hojas
                anchas y puntas filosas, se adorna con filos rojos y sus espinas
                parecen sierras. Endémico en el Estado de Oaxaca, árido,
                requiere poca agua y crece en las barrancas de clima árido.
              </li>
            <li className='list'>
                Coyote: Los maestros mezcaleros coinciden que es un maguey
                escurridizo como un “coyote” de ahí viene el origen de su nombre
                común.
              </li>
            </ol>
      
        </div>
      </div>
    </div>
  );
}

export default NuestroMezcalInfo;
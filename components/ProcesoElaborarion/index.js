import React from 'react'
import title from "../Main/title.module.css"
import card from "../Main/card.module.css"

function ProcesoElaboracion() {
  return (
    <div className=" py-2">
      <div>
        <h4 className={title.fontTitlemain}>PROCESO ANCESTRAL</h4>
        <h2 className={title.fontTitleSub}>DE ELABORACIÓN</h2>
        <div className="linea"></div>
      </div>

      <div className="py-3 px-3 row-qh">
        <p className="text-center sm:text-2xl text-xl text-black">
          Nuestro proceso de elaboración es de un mezcal ancestral, en el cual
          el agave debe de cocerse por completo en un horno de tierra, además de
          que el proceso de fermentación se realiza en tinas de ayacahuite- y,
          posteriormente, debe destilarse en alambiques de barro.
        </p>

        <p className="text-center sm:text-2xl text-xl text-black">
          Nuestro mezcal es 100% natural, sin ningún químico agregado a
          diferencia de otros destilados y, por tanto, nunca te causará ningún
          tipo de malestar, incluso por eso le decimos que es virgen ya que no
          causa cruda.
        </p>
        <div className="py-3 px-3 row-qh">
          <p className="sm:text-2xl text-xl text-black">
            El proceso es:
            </p>
          <div className="px-3 row-qh" >
            
        
          <ul className='sm:text-2xl text-xl text-black list-disc' >
            <li className='list'>
                Se escoge el mejor agave silvestre en este caso Jabalí o
                Tepeztate.
              </li>
              <li>
                Se corta la piña (Tronco corto y grueso del maguey) y se lleva a
                nuestro palenque ubicado en Santa Catarina Minas, Oaxaca.
              </li>
              <li>
                En este momento empieza el proceso de cocción en tierra durante
                1 día.
              </li>

              <li>
                Como es ancestral, una persona lo muele manualmente con un
                pedazo de tronco.
              </li>
              <li>
                Posteriormente, se pone a fermentar (10 días) los agaves cocidos
                y triturados con agua.
              </li>
              <li>
                Se destila en un alambique de barro lo que agrega ciertas notas
                de sabor que lo hacen único en sus características.
              </li>

              <li>
                Para que finalmente, el maestro mezcalero, con su historia
                tradicional que se remonta a generaciones, se encarga de darle
                la graduación correcta.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcesoElaboracion;
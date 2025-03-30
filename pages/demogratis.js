import React from 'react'
import NavBar from '../components/NavBarBlack/NavBarEs'
import styles from "../components/Demo/Demo.module.css" // Importa los estilos CSS

function Demogratis() {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  }
  return (
    <>
     <NavBar />
     <div className="bg-gray-50 flex flex-col items-center px-4 py-8 md:px-16 pt-24 md:pt-24">
     <div className="text-center max-w-4xl mb-4 mt-4">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Estás a un paso de tener un restaurante exitoso
          </h1>
          <p className="text-gray-600 text-sm md:text-2xl mb-4">
          Contáctanos a continuación y te responderemos lo antes posible
          </p>
       
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Recibe la información única de restaurantes exitosos</h2>
              
            </div>
           
            <div className={styles.modalBody}>
              {/* Aquí va el formulario personalizado */}
              <form id="customForm" onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="first_name"></label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Nombre(s) completo"
                    required
                    className={styles.hsInput}
                  />
                </div>
                <div>
                  <label htmlFor="last_name"></label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="Apellido(s) completo"
                    required
                    className={styles.hsInput}
                  />
                </div>
                <div>
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Correo electrónico"
                    required
                    className={styles.hsInput}
                  />
                </div>
               
                <div>
  <label htmlFor="whatsapp"></label>
  <input
    type="tel"  // Cambiado a "tel" para números de teléfono
    id="whatsapp"
    name="whatsapp"
    placeholder="Número de WhatsApp"
    pattern="[0-9]{10,15}"  // Esto es opcional, define un patrón de 10 a 15 dígitos
    required
    className={styles.hsInput}
  />
</div>
<div>
                  <label htmlFor="restaurant_name"></label>
                  <input
                    type="text"
                    id="restaurant_name"
                    name="restaurant_name"
                    placeholder="Nombre del restaurante"
                    required
                    className={styles.hsInput}
                  />
                </div>

                <div>
  {/* <label htmlFor="how_did_you_find_us" className="sr-only">
    ¿Cómo te enteraste de nosotros?
  </label> */}
  <select
    id="how_did_you_find_us"
    name="how_did_you_find_us"
    required
    className={styles.hsInput}
  >
    <option value="" disabled selected className='text-gray-500'>
      ¿Cómo te enteraste de nosotros?
    </option>
    <option value="facebook">Facebook</option>
    <option value="google">Google</option>
    <option value="tiktok">Tik Tok</option>
    <option value="tiktok">Instagram</option>
    <option value="email">Email</option>
    <option value="youtube">Youtube</option>
    <option value="podcast">Podcast</option>
    <option value="amigo">Amigo o referencia</option>
    <option value="otro">Youtube</option>
    


  </select>
</div>

                <div>
                  <button type="submit" className={styles.hsSubmit}>
                    Sí! Quiero el Demo GRATIS
                  </button>
                </div>
              </form>
            </div>
       
          </div>
      </div>
        </div>
    </>
  )
}

export default Demogratis
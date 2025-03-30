import React from 'react'
import modal from "./modalPlatillo.module.css"
// import "./modal.module.css"

function ModalPlatillo({ viewModal, platilloview, ocultarModalEditar }) {


    return (
        viewModal ?
            <div className={modal.containerModal} >
                {/* <div className="containerModal"> */}
                < div className={modal.cardModal} >
                    <div className={modal.bodyModal}>
                        <div className={modal.carruselModal}>

                            <img src="https://static.vecteezy.com/system/resources/previews/007/151/370/non_2x/stylized-inscription-ufo-with-a-flying-saucer-through-the-letter-drawn-as-a-planet-black-and-white-image-on-an-isolated-background-vector.jpg" alt="muestra" />
                        </div>
                        <div className={modal.descriptionPlato}>
                            <h1>{platilloview.nombre}</h1>
                            <p>{platilloview.description}</p>
                            <p>${platilloview.precio}.00</p>

                        </div>
                    </div>
                    <div className={modal.footerModal}>
                        <button onClick={ocultarModalEditar}>Cerrar</button>
                    </div>

                </div>
            </div > : null
    )

}

export default ModalPlatillo
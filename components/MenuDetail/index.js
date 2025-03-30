import React, { useState } from 'react'
import ButtonMenuCategory from '../ButtonMenuCategory'
import ButtonMenuFilter from '../ButtonMenuFilter'
import ModalPlatillo from '../ModalPlatillo'
import platos from "./platos.json"

function MenuDetail() {

    const category_platos = [... new Set(platos.map(plato => plato.category))]

    const [categories, setCategories] = useState(category_platos)
    const [viewCategory, setViewCategory] = useState("alimentos")

    const filterCategory = (category) => {

        const filterData = platos.filter(plato => plato.category === category)
        // console.log(filterData)
        const subcategories = [... new Set(filterData.map(plato => plato.list_category))]
        // console.log(subcategories)
        setPlatillos(platos.filter(plato => plato.list_category === subcategories[0]))
        setViewCategory(category)
        setSubcategory(subcategories)
        setViewSubCategory(subcategories[0])

    }
    // subcatyegories
    const subfilterData = platos.filter(plato => plato.category === viewCategory)
    const subcategory_platos = [... new Set(subfilterData.map(plato => plato.list_category))]

    const [platillos, setPlatillos] = useState(platos.filter(plato => plato.list_category === subcategory_platos[0]))


    const [subcategory, setSubcategory] = useState(subcategory_platos)
    const [viewSubCategory, setViewSubCategory] = useState(subcategory_platos[0])
    const filterSubCategory = (subcategory) => {
        const subdata = platos.filter(plato => plato.list_category === subcategory)
        setPlatillos(subdata)
        setViewSubCategory(subcategory)
    }

    // modal view
    const [platilloview, setPlatilloview] = useState(platos)
    const [viewModal, setViewModal] = useState(false)
    const showModalEditar = (registro) => {
        setPlatilloview(registro)
        setViewModal(true)
    }
    const ocultarModalEditar = () => {
        setViewModal(false)
    }

    return (
        <>
            <div className='container-llorona menu-detail'>
                <div className='row-qh'>
                    <h1 className="text-center text-3xl md:text-4xl uppercase font-black">Menú</h1>
                    <span className="subTitle mb-4">Disfruta de nuestros platillos</span>
                    <ButtonMenuCategory viewCategory={viewCategory} categories={categories} filterCategory={filterCategory} />
                    <div className="container-cards">
                        <ButtonMenuFilter filterSubCategory={filterSubCategory} viewSubCategory={viewSubCategory} subcategory={subcategory} />
                        <div className="card-menu">
                            {platillos.map(plato => {
                                return (
                                    <div className="card-detail" key={plato.id}>
                                        <span className="separator">
                                            <span className="content-name-plat" onClick={() => showModalEditar(plato)}>
                                                {plato.nombre}
                                            </span>
                                        </span>
                                        <div className="precio-plat">${plato.precio}.00</div>
                                        <div className="content-platillo">{plato.description}</div>
                                    </div>
                                );
                            })}

                        </div>

                    </div>
                </div>
            </div>
            <ModalPlatillo ocultarModalEditar={ocultarModalEditar} viewModal={viewModal} platilloview={platilloview} />
        </>

    )
}

export default MenuDetail
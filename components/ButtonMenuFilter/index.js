import React from 'react'
import styles from "../Main/menuFilter.module.css"

function ButtonMenuFilter({ subcategory, viewSubCategory, filterSubCategory, platillos }) {
    // const filterData = platillos.filter(plato => plato.category === viewCategory)
    // console.log(filterData)
    // const subcategory_platos = [new Set(platillos.map(plato => plato.list_category))]
    // console.log(subcategory_platos[0])

    return (
        <div className={styles.menu_categories}>
            {subcategory.map(category => {
                return (
                    <button className={viewSubCategory === category ? styles.activeM : null}
                        onClick={() => filterSubCategory(category)}
                        key={category}
                    >
                        {category}
                    </button>);
            })}
        </div>
    )
}

export default ButtonMenuFilter
import React from 'react'
import styles from "../Main/menuCategory.module.css"

function ButtonMenuCategory({ categories, filterCategory, viewCategory }) {
    return (
        <div className={styles.menu_categories}>
            {categories.map(category => {
                return (
                    <button className={viewCategory === category ? styles.activeM : null}
                        onClick={() => filterCategory(category)}
                        key={category}
                    >
                        {category}
                    </button>);
            })}
        </div>
    )
}

export default ButtonMenuCategory
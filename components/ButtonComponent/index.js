import React from 'react'
import Link from "next/link";

function ButtonComponent({ titulo, enlace }) {
  return (
    <Link href={enlace} className="contenedorA">
      <div className="buttonComponent">
        <p className="buttonText">{titulo}</p>
      </div>
    </Link>
  );

}

export default ButtonComponent
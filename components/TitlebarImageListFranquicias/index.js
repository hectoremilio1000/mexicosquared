import React from 'react'
import title from "../Main/title.module.css"


function TitlebarImageListFranquicias() { 
  const image1 = "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/IMG_0059+(1).jpg"
  const image2 = "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/IMG_0062+(1).jpg"
  const image3 = "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/IMG_0063+(1).jpg"
  const image4 = "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/IMG_0071+(1).jpg"
  const image5 = "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/lloronaDentro+(2).jpg"
  const image6 = "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/lugarAfuera+(2).jpg"
  const image7 = "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/menu%CC%81Veggie+(1).jpg"
  const image8 = "https://imagenesrutalab.s3.amazonaws.com/llorona/nextImage/mixologi%CC%81a%2Bautor+(1).jpg"
  return (
    <div>
      <div>
        <h4 className={title.fontTitleSub}>Experiencias únicas</h4>
        <h2 className={title.fontTitleline}>
          que generan grandes ganancias
        </h2>
        <div className="linea"></div>
      </div>

      <div className="max-w-2xl mx-auto py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img style={{ objectFit: "cover" }}
              alt=""
              src={image1}
              
              className="group-hover:opacity-75"
            />

          </div>
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img style={{ objectFit: "cover" }}
              alt=""
              src={image2}
              
              className="group-hover:opacity-75"
            />

          </div>
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img style={{ objectFit: "cover" }}
              alt=""
              src={image3}
              layout="fill"
            
              className="group-hover:opacity-75"
            />

          </div>
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img style={{ objectFit: "cover" }}
              alt=""
              src={image5}
              layout="fill"
          
              className="group-hover:opacity-75"
            />

          </div>
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img style={{ objectFit: "cover" }}
              alt=""
              src={image6}
              layout="fill"
             
              className="group-hover:opacity-75"
            />

          </div>
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img style={{ objectFit: "cover" }}
              alt=""
              src={image7}
              layout="fill"
          
              className="group-hover:opacity-75"
            />

          </div>
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img style={{ objectFit: "cover" }}
              alt=""
              src={image8}
              layout="fill"
           
              className="group-hover:opacity-75"
            />

          </div>
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img style={{ objectFit: "contain" }}
              alt=""
              src={image4}
              layout="fill"
            
              className="group-hover:opacity-75"
            />

          </div>
        </div>
      </div>

      {/* <div className="max-w-4xl mx-auto py-8 ">
        <div className="flex md:flex-row lg:flex-row flex-wrap justify-center">

          {images.map((image) =>

            <img src={image.img} className="w-full h-auto py-2 max-w-md px-2" alt={image.id} />

          )}
        </div>
      </div> */}
    </div>
  );
}


export default TitlebarImageListFranquicias;
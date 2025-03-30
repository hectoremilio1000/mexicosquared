import { useRouter } from "next/router";
import NavBar from "../../components/NavBarBlack/NavBarEs";

const CasoDeExito = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    // Muestra un estado de carga mientras `id` es undefined
    return <p>Cargando...</p>;
  }
  return (
    <>
      <NavBar />
      <div className="px-4 py-8 md:px-16 pt-24 md:pt-36 relative">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale opacity-5 z-40"
          style={{
            backgroundImage:
              "url('https://imagenesrutalab.s3.us-east-1.amazonaws.com/llorona/nextImage/fotosBanner/cantina%2Bllorona%2Bafuera%2Blugar.jpg')",
          }}
        ></div>
        <div className="mx-auto max-w-[1018px] relative z-50">
          <div className="grid grid-cols-2 gap-12 my-12">
            <div className="w-full flex items-center">
              <div>
                <p className="text-lg text-gray-900">Caso de [exito]</p>
                <h1 className="text-4xl font-bold">La Llorona Cantina</h1>
                <p className="text-lg text-gray-900">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Mollitia quis, aperiam laborum iste consequatur voluptatem
                  distinctio commodi, esse placeat, tempore quibusdam aut
                  praesentium unde cum incidunt vitae ex blanditiis quia?
                </p>
                <p>ID del caso: {id}</p>
              </div>
            </div>
            <div className="w-full">
              {/* <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/FmyFlINPgD0?si=H1bFtMobdFFBTPpO"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                          ></iframe> */}
              <img
                className="w-full object-cover rounded "
                src="https://imagenesrutalab.s3.us-east-1.amazonaws.com/llorona/nextImage/fotosBanner/cantina%2Bllorona%2Bafuera%2Blugar.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-8">
        <div className="grid grid-cols-1 gap-4 flex-row-reverse">
          <div className="mx-auto max-w-[1018px] w-full">
            <div className="w-full">
              <h1 className="text-4xl font-bold mb-6">Resultados</h1>
              <div className="grid grid-cols-4 gap-2">
                <div className="rounded p-3 b-white shadow-md">
                  <h1>TiktokAds</h1>
                  <span>Conversiones</span>
                  <h3>20000</h3>
                </div>
                <div className="rounded p-3 b-white shadow-md">
                  <h1>GoogleAds</h1>
                  <span>Conversiones</span>
                  <h3>25000</h3>
                </div>
                <div className="rounded p-3 b-white shadow-md">
                  <h1>FacebookAds</h1>
                  <span>Conversiones</span>
                  <h3>15000</h3>
                </div>
                <div className="rounded p-3 b-white shadow-md">
                  <h1>Calendly</h1>
                  <span>Conversiones</span>
                  <h3>20000</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8">
        <div className="grid grid-cols-1 gap-4 flex-row-reverse">
          <div className="mx-auto max-w-[1018px] w-full">
            <div className="w-full">
              <h1 className="text-4xl font-bold mb-6">graficas</h1>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded p-3 b-white shadow-md">
                  <h1>GRAFICA 1</h1>
                  <span>Conversiones</span>
                  <h3>20000</h3>
                </div>
                <div className="rounded p-3 b-white shadow-md">
                  <h1>GRAFICA 2</h1>
                  <span>Conversiones</span>
                  <h3>25000</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CasoDeExito;

// pages/blog/[slug].js
import React from "react";
import NavBar from "../../components/NavBarBlack/NavBarEs";
import { blogPosts } from "../../data/blogPosts";

/**
 * 1. getStaticPaths
 * Genera rutas estáticas en build-time para cada `slug` de blogPosts.
 */
export async function getStaticPaths() {
  // Prepara el array de rutas a partir de blogPosts.
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    // fallback: false => Si entras a una URL que no existe en blogPosts, Next.js devolverá un 404.
    fallback: false,
  };
}

/**
 * 2. getStaticProps
 * Dado un slug, busca el post y lo pasa como prop para renderizarlo.
 */
export async function getStaticProps({ params }) {
  const { slug } = params;
  const post = blogPosts.find((p) => p.slug === slug);

  // Si el post no existe, devuélve notFound para un 404.
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}

/**
 * 3. Componente SinglePost
 * Este componente recibe el `post` desde getStaticProps y lo muestra.
 */
const SinglePost = ({ post }) => {
  // En caso de que no llegue `post` (raro si fallback: false)
  if (!post) {
    return (
      <>
        <NavBar />
        <div className="pt-24 md:pt-36 px-4 md:px-16">
          <p>Post no encontrado...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      {/* Hero Banner */}
      <div
        className="relative w-full min-h-[500px] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${post.coverImage})` }}
      >
        {/* Superposición oscura para resaltar texto */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Contenido del banner */}
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif leading-tight">
            {post.title}
          </h1>
          <p className="text-white italic mb-4 text-lg md:text-xl">
            {post.bannerPhrase}
          </p>
          <div className="text-white text-sm md:text-base mb-1">
            <span className="mr-2 font-semibold">Autor:</span>
            {post.authorName}
          </div>
          <div className="text-white text-sm md:text-base">
            <span className="mr-2 font-semibold">Fecha:</span>
            {post.date}
          </div>
        </div>
      </div>

      {/* Contenido principal del Post */}
      <div className="bg-gray-50 px-4 md:px-16 py-8 md:py-16 font-serif">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10">
          {/* Resumen */}
          <div
            className="mb-6 text-gray-700 text-lg md:text-xl leading-relaxed tracking-wide text-justify"
            dangerouslySetInnerHTML={{ __html: post.summary }}
          />

          {/* Imagen opcional dentro del blog */}
          {post.blogImage && (
            <div className="mb-6">
              <img
                src={post.blogImage}
                alt="Imagen Blog"
                className="w-full h-auto object-cover rounded"
              />
            </div>
          )}

          {/* Contenido principal */}
          <div
            className="post-content text-gray-800 tracking-wide leading-relaxed text-justify text-base md:text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </>
  );
};

export default SinglePost;

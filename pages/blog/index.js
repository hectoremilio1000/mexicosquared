// pages/blog/index.js
import React from "react";
import Link from "next/link";
import NavBar from "../../components/NavBarBlack/NavBarEs";
// Importa tu arreglo de posts
import { blogPosts } from "../../data/blogPosts";

const BlogIndex = () => {
  return (
    <>
      <NavBar />
      <div className="pt-24 md:pt-36 px-4 md:px-16 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Blog Impulso Restaurantero
          </h1>
          <p className="text-gray-600 text-xl">
            Tips, estrategias y casos de éxito para restaurantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {/* Imagen de portada */}
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-72 object-cover object-center"
              />

              {/* Contenido del card */}
              <div className="p-4">
                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm mb-2">{post.date}</p>
                <p className="text-gray-700">{post.excerpt}</p>

                {/* Botón para leer más */}
                <Link href={`/blog/${post.slug}`}>
                  <button className="mt-4 py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md">
                    Leer más
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogIndex;

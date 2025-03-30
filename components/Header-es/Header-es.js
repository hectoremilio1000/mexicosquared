// components/Header-en.js (para inglés)
import Head from 'next/head';

const HeaderEs = () => {
    return (
        <Head>
            <title>La Llorona</title>
            <link rel="icon" href="../favicon.ico" />
            <link rel="alternate" hrefLang="en" href="https://your-domain.com/en" />
            <link rel="alternate" hrefLang="es" href="https://your-domain.com/es" />
            <meta name="of:title" content="Llorona" />
            <meta name="of:description" content="Somos un restaurante mexicano con buen son" />
            <meta name="og:description" content="Somos un restaurante mexicano con buen son" />
            <meta property="og:url" content="https://lalloronacantina.com/" />
            <meta name="og:title" content="La Llorona" />
            <meta property="og:type" content="La Llorona" />
            <meta property="og:image" content="https://imagenesrutalab.s3.amazonaws.com/llorona/logo/logo_alta_sin_nombre.png" />
            <link rel="apple-touch-icon" href="../logo192.png" />
            <link rel="manifest" href="../manifest.json" />
        </Head>
    );
};

export default HeaderEs;
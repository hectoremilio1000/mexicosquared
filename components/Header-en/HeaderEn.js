import Head from 'next/head';

const HeaderEn = () => {
    return (
        <Head>
            <title>Llorona Best Mexican cousine in town</title>
            <link rel="alternate" hrefLang="en" href="https://your-domain.com/en" />
            <link rel="alternate" hrefLang="es" href="https://your-domain.com/es" />
            <link rel="icon" href="../favicon.ico" />
            <meta name="of:title" content="Llorona" />
            <meta name="of:description" content="Experience the best cuisine in Mexico City in Roma Condesa at our restaurant." />
            <meta name="og:description" content="Experience the best cuisine in Mexico City in Roma Condesa at our restaurant." />
            <meta property="og:url" content="https://lalloronacantina.com/" />
            <meta name="og:title" content="Llorona" />
            <meta property="og:type" content="Llorona" />
            <meta property="og:image" content="https://imagenesrutalab.s3.amazonaws.com/llorona/logo/logo_alta_sin_nombre.png" />
            <link rel="apple-touch-icon" href="../logo192.png" />
            <link rel="manifest" href="../manifest.json" />
        </Head>
    );
};

export default HeaderEn;
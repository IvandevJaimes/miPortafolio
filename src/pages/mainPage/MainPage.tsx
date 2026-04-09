import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../../components/sections/hero/Hero";
import Header from "../../components/layout/header/Header";
import Projects from "../../components/sections/projects/Projects";
import Skills from "../../components/sections/skills/Skills";
import { DataError } from "../../components/ui/errorComponents/DataError";
import siteData from "../../data/site.json";

const MainPage = () => {
  const { url, ogImage } = siteData;
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (error: Error) => {
    setHasError(true);
    setErrorMessage(error.message);
  };

  const handleRetry = () => {
    setHasError(false);
    setErrorMessage("");
  };

  return (
    <>
      <Helmet>
        <title>Ivan Jaimes | Desarrollador Fullstack</title>
        <meta
          name="description"
          content="Desarrollador Fullstack especializado en React, TypeScript y Node.js. Proyectos con Angular, NestJS, PostgreSQL y más."
        />
        <meta
          property="og:title"
          content="Ivan Jaimes | Desarrollador Fullstack"
        />
        <meta
          property="og:description"
          content="Desarrollador Fullstack especializado en React, TypeScript y Node.js."
        />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={url} />
        <meta
          name="twitter:title"
          content="Ivan Jaimes | Desarrollador Fullstack"
        />
        <meta
          name="twitter:description"
          content="Desarrollador Fullstack especializado en React, TypeScript y Node.js."
        />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      <Header />
      <main>
        <Hero />
        {hasError ? (
          <DataError
            onRetry={handleRetry}
            errorMessage={errorMessage}
            section="data"
          />
        ) : (
          <>
            <Projects onError={handleError} />
            <Skills onError={handleError} />
          </>
        )}
      </main>
    </>
  );
};

export default MainPage;

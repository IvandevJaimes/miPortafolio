import { Helmet } from "react-helmet-async";
import Hero from "../../components/sections/hero/Hero";
import Header from "../../components/layout/header/Header";
import Projects from "../../components/sections/projects/Projects";
import Skills from "../../components/sections/skills/Skills";

const MainPage = () => {
	return (
		<>
			<Helmet>
				<title>Ivan Jaimes | Desarrollador Fullstack</title>
				<meta name="description" content="Desarrollador Fullstack especializado en React, TypeScript y Node.js. Proyectos con Angular, NestJS, PostgreSQL y más." />
				<meta property="og:title" content="Ivan Jaimes | Desarrollador Fullstack" />
				<meta property="og:description" content="Desarrollador Fullstack especializado en React, TypeScript y Node.js." />
				<meta property="og:image" content="https://ivanjaimes.dev/og-image.png" />
				<meta property="og:url" content="https://ivanjaimes.dev/" />
				<meta name="twitter:title" content="Ivan Jaimes | Desarrollador Fullstack" />
				<meta name="twitter:description" content="Desarrollador Fullstack especializado en React, TypeScript y Node.js." />
				<meta name="twitter:image" content="https://ivanjaimes.dev/og-image.png" />
			</Helmet>
			<Header></Header>
			<main>
				<Hero></Hero>
				<Projects></Projects>
				<Skills></Skills>
			</main>
		</>
	);
};

export default MainPage;

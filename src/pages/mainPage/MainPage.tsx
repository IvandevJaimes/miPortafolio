import Hero from "../../components/sections/hero/Hero";
import Header from "../../components/layout/header/Header";
import Projects from "../../components/sections/projects/Projects";
import Skills from "../../components/sections/skills/Skills";

const MainPage = () => {
	return (
		<>
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

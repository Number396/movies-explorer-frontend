import About from "../About/About";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Portfolio from "../Portfolio/Portfolio";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";

function Main() {
  return (
    <main>
      <Promo />
      <About about="О проекте" />
      <AboutProject />
      <Techs />
      <About about="Студент" />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;

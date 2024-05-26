import avatar from "../../images/gagarin2.jpg";
function AboutMe() {
  return (
    <section className="aboutMe">
      <div className="aboutMe__container">
        <div className="aboutMe__info">
          <h3 className="aboutMe__title">Дмитрий</h3>
          <h4 className="aboutMe__subtitle">Фронтенд-разработчик, 40 лет</h4>
          <p className="aboutMe__text">
            Я родился и живу в Архангельске, закончил факультет информационных
            технологий в САФУ. Люблю слушать музыку, а ещё увлекаюсь плаванием.
            Недавно начал кодить. С&nbsp; В 2022 году решил пройти курсы по Веб
            разработке в Яндекс Практикуме чтобы быстро освоится в этом
            популярном направлении. Оно позволяет совмещать работу с графикой,
            программированием и видеть результат своей работы.
          </p>
          <a
            className="aboutMe__link"
            href="https://github.com/Number396"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className="aboutMe__avatar" src={avatar} alt="аватар"></img>
      </div>
    </section>
  );
}

export default AboutMe;

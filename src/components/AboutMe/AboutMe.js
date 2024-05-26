import avatar from "../../images/gagarin2.jpg";
function AboutMe() {
  return (
    <section className="aboutMe">
      <div className="aboutMe__container">
        <div className="aboutMe__info">
          <h3 className="aboutMe__title">Дмитрий</h3>
          <h4 className="aboutMe__subtitle">Фронтенд-разработчик, 40 лет</h4>
          <p className="aboutMe__text">
            Я&nbsp;родился и&nbsp;живу в&nbsp;Архангельске, закончил факультет
            информационных технологий в&nbsp;САФУ. Люблю слушать музыку,
            а&nbsp;ещё увлекаюсь плаванием. <br /> В&nbsp;2022 году решил пройти
            курсы по&nbsp;Веб разработке в&nbsp;Яндекс Практикуме чтобы быстро
            освоится в&nbsp;этом популярном направлении. Оно позволяет совмещать
            работу с&nbsp;графикой, программированием и&nbsp;видеть результат
            своей работы.
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

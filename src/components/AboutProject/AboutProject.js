function AboutProject() {
  return (
    <section className="aboutProject">
      <ul className="aboutProject__info">
        <li className="aboutProject__item">
          <h3 className="aboutProject__title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="aboutProject__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="aboutProject__item">
          <h3 className="aboutProject__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="aboutProject__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="aboutProject__meterContainer">
        <div className="aboutProject__meter">1 неделя</div>
        <div className="aboutProject__meter-background">4 недели</div>
      </div>
      <div className="aboutProject__labelContainer">
        <span className="aboutProject__lable aboutProject__lable_type_back">
          Back-end
        </span>
        <span className="aboutProject__lable aboutProject__lable_type_front">
          Front-end
        </span>
      </div>
    </section>
  );
}

export default AboutProject;

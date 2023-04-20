import avatar from "../../images/avatar.svg";
function AboutMe() {

    return (
        <section className="aboutMe">
            <div className="aboutMe__container">
                <div className="aboutMe__info">
                    <h3 className="aboutMe__title">Виталий</h3>
                    <h4 className="aboutMe__subtitle">Фронтенд-разработчик, 30 лет</h4>
                    <p className="aboutMe__text">Я родился и живу в Саратове, закончил факультет экономики СГУ.
                        У меня есть жена и&nbsp;дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
                        Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
                        После того, как прошёл курс по веб-&nbsp;разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <a className="aboutMe__link" href="https://github.com/Number396" target="_blank" rel="noreferrer">Github</a>
                </div>
                <img className="aboutMe__avatar" src={avatar} alt="аватар"></img>


            </div>

        </section>
    );
}

export default AboutMe;
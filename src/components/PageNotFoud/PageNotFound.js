import { useNavigate } from "react-router-dom";

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div className="PageNotFound">
            <h3 className="pageNotFound__title">404</h3>
            <p className="pageNotFound__text">Страница не найдена</p>
            <button
                className="pageNotFound__back-button"
                onClick={() => navigate(-1)}
            >Назад</button>



        </div>
    )

}

export default PageNotFound;
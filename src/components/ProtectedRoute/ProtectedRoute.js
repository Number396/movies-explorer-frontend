import { Navigate } from "react-router-dom";


function ProtectedRoute({ component: Component, ...props }) {
    // console.log('inside protected route');
    // console.log('logedin---', props.loggedIn);
    // console.log('isloading--', props.isDataLoading);
    // console.log('!isloading--', !props.isDataLoading);

    return (
        // (props.loggedIn && !props.isDataLoading) ? <Component {...props} /> : <Navigate to="/*" />
        props.loggedIn ? <Component {...props} /> : <Navigate to="/" />
    );
}
export default ProtectedRoute;
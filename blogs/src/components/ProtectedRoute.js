import { useContext } from "react";
import UserContext from "./UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {isLogged} = useContext(UserContext);
    return isLogged ? children : <Navigate to='/login' replace />
};

export default ProtectedRoute;
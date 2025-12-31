import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const userInfo = localStorage.getItem('userInfo');

    if (!userInfo) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;

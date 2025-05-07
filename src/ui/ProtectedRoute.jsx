import { useUser } from "../features/authentication/useUser";

function ProtectedRoute({children}) {
    const {user, isLoading} = useUser();

    if

    return children;
}

export default ProtectedRoute

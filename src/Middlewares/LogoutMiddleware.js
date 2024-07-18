import { useNavigate } from 'react-router-dom';

export default function LogoutMiddleware() {
    const navigate = useNavigate();
    if (localStorage.getItem("user-info")) {
        navigate("/welcome");
    }
}

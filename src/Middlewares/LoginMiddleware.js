import { useNavigate } from 'react-router-dom';

export default function LoginMiddleware() {
    const navigate = useNavigate();
        if (localStorage.getItem("user-info")) {
            navigate("/login");
        }
}

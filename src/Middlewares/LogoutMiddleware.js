import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function LogoutMiddleware() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("user-info")) {
            navigate("/welcome");
        }
    });
}

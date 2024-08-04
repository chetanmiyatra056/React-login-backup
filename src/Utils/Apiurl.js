const BASE_URL = "http://127.0.0.1:8000/api";

export async function apiLaravel(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
            Accept: "application/json",
            ...options.headers,
        },
        ...options,
    });

    return response.json();
}
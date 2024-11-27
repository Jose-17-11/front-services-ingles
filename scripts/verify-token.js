async function checkToken() {
    const token = localStorage.getItem('authToken');

    // Si no hay token, redirige al usuario al login
    if (!token) {
        window.location.href = "Pagina1.html";
        return;
    }

    // Verificar el token en el servidor
    try {
        const response = await fetch("https://api.agencia1711.site/verificar-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            // Si el token es inválido o ha expirado
            throw new Error("Token inválido o expirado");
        }
        // Si el token es válido, el usuario puede permanecer en la página
        console.log("Token válido");

    } catch (error) {
        console.error("Error:", error.message);
        // Eliminar el token de localStorage
        localStorage.removeItem('authToken');
        // Redirigir al login
        window.location.href = "Pagina1.html";
    }
}
checkToken()
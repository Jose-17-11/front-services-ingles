document.getElementById('logout').addEventListener('click', () => {
    // Eliminar las cookies
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Eliminar el token del localStorage
    localStorage.removeItem('authToken');

    // Redirigir al usuario a la página de login
    window.location.href = '/index.html';
});

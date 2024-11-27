let form = document.getElementById("loginForm");

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let user = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    const response = postData('https://api.agencia1711.site/user', {email: user, password: pass})
    console.log(response);  
})

        
async function postData(url, data) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    
    if (response.ok) {
        const result = await response.json(); // Convierte a JSON la respuesta                 
        // Almacenar el token en localStorage
        if (result.token) {
            localStorage.setItem('authToken', result.token);
            console.log('Token almacenado en localStorage');
        } else {
            console.log("el token no se pudo almacenar: ");
        }
        // Almacenar el userId en las cookies
        if (result.userId) {
            document.cookie = `userId=${result.userId}; max-age=600; path=/; secure; samesite=strict`;  // max-age es en segundos
            console.log('userId almacenado en cookies');
        } else {
            console.log("el userId no se pudo almacenar en las cookies");
        }
        window.location.href = "Pagina2.html";
        return result;
    } else {
        // Manejo del error si la respuesta no es exitosa
        console.error("Error en la petición:", response.status);
        alert("EL usuario o contraseña son incorrectos")
        return null;
    }
}
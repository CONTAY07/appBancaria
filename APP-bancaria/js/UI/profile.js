import { Storage }  from "../app/LocalStorageService.js";
import { Config } from "../app/Config.js";
import { validateName, validateEmail, validatePhone, validatePassword, clearErrors, showError } from "../UI/utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const userInfrormation = Storage.get("currentUser");

    const userTitle = document.getElementById("name-profile");
    const userId = document.getElementById("id-profile");
    const userName = document.getElementById("profile-name");
    const userEmail = document.getElementById("profile-email");
    const userPhone = document.getElementById("profile-phone");
    const logionOutButton = document.querySelector(".logout");

    userTitle.textContent = userInfrormation.name;
    userId.textContent = userInfrormation.id;
    userName.textContent = userInfrormation.name;
    userEmail.textContent = userInfrormation.email;
    userPhone.textContent = userInfrormation.phone;


    // Obtener los elementos del modal
    const editProfileModal = document.getElementById("editProfileModal");
    const changePasswordModal = document.getElementById("changePasswordModal");

// Obtener los botones que abren los modales
    const editProfileBtn = document.getElementById("edit-profile");
    const changePasswordBtn = document.getElementById("change-password");

// Obtener los elementos que cierran los modales
    const editProfileCloseBtn = editProfileModal.querySelector(".close");
    const changePasswordCloseBtn = changePasswordModal.querySelector(".close");

// Asignar eventos a los botones para abrir los modales
    editProfileBtn.addEventListener("click", () => {
        editProfileModal.style.display = "block";
    });

    changePasswordBtn.addEventListener("click", () => {
        changePasswordModal.style.display = "block";
    });

// Asignar eventos a los botones para cerrar los modales
    editProfileCloseBtn.addEventListener("click", () => {
        editProfileModal.style.display = "none";
    });

    changePasswordCloseBtn.addEventListener("click", () => {
        changePasswordModal.style.display = "none";
    });

// Cerrar el modal si se hace clic fuera del contenido
    window.addEventListener("click", (event) => {
    if (event.target == editProfileModal) {
        editProfileModal.style.display = "none";
    }
    if (event.target == changePasswordModal) {
        changePasswordModal.style.display = "none";
    }
    });
    
    
    logionOutButton.addEventListener("click", ()=>{
        Storage.delete("currentUser");
        window.location.href = "login.html";
    });

    const formEditProfile = document.getElementById("editProfileModal");   
    
    formEditProfile.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        // Captura los valores de los campos del formulario
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();

        // Limpia los mensajes de error anteriores
        clearErrors();

        // Validaciones
        let isValid = true;

        

        if (name === ""){
            name = userInfrormation.name
        }else{
            if (!validateName(name)) {
            showError('name', 'El nombre no debe contener números ni caracteres especiales.');
            isValid = false;
        }
            if (isValid){Config.updateName(userInfrormation.id, name)}
        }


        if (email === ""){
            email = userInfrormation.email
        }else{
            if (!validateEmail(email)) {
            showError('email', 'Por favor, introduce un correo electrónico válido.');
            isValid = false;
        }
            if (isValid){Config.updateEmail(userInfrormation.id, email)}
        }

        if (phone === ""){
            phone = userInfrormation.phone
        }else{
            if (!validatePhone(phone)) {
            showError('phone', 'Por favor, introduce un número de teléfono válido.');
            isValid = false;
        }
        if(isValid){Config.updatePhone(userInfrormation.id, phone)}
        }
        

        window.location.href = "perfil.html";
        
    });

    const fromEditPassword = document.getElementById ("changePasswordModal");

    fromEditPassword.addEventListener("submit", (event)=>{
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        const currentPassword = document.getElementById("currentPassword").value.trim();
        const newPassword = document.getElementById("newPassword").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
            showError('currentPassword', 'Por favor, completa todos los campos.');
            return;
        }
        if (!validatePassword(newPassword)) {
            showError('newPassword', 'La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        if (currentPassword !== userInfrormation.password) {
            showError('currentPassword', 'La contraseña actual es incorrecta.');
            return;    

        }
        if (newPassword !== confirmPassword) {
            showError('confirmPassword', 'Las contraseñas no coinciden.');
            return;
        }

        Config.updatePassword(userInfrormation.id, newPassword);
        alert("Contraseña actualizada con éxito.");

        window.location.href = "perfil.html";

    })

});
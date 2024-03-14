const sendEmailBtn = document.getElementById('sendEmailBtn');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const messageInput = document.getElementById('messageInput');

sendEmailBtn.addEventListener('click', async () => {
    const data = dataConstructor(nameInput.value, emailInput.value, messageInput.value);

    const errorHandler = fieldErrorValidator(data);

    if(!errorHandler){
        sendEmail(data);
    }
});

const dataConstructor = (...args) => {
    const [nameInput, emailInput, messageInput] = args;
    return{
        destinatario: emailInput,
        asunto: 'Asunto del correo electrónico',
        cuerpo: `
            Nombre: ${nameInput}
            Email: ${emailInput}
            Mensaje: ${messageInput}
        `
    }
};

const fieldErrorValidator = (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (Object.values(data).some(value => typeof value === 'string' && value === '')) {
        errorAlert('Algunos campos están vacíos');
        return true;
    } else if (!emailRegex.test(data.destinatario)) {
        errorAlert('El correo electrónico ingresado no es válido');
        return true; 
    }
};

const errorAlert = (text) => {
    Swal.fire({
        title: 'Error!',
        text: text,
        icon: 'error',
        confirmButtonText: 'OK'
    });
}

const successAlert = (text) => {
    Swal.fire({
        text: text,
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

const sendEmail = async (data) => {
    try {
        const response = await fetch('http://localhost:3000/sendemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            successAlert('Mensaje enviado con éxito')
        } else {
            errorAlert('Hubo un error al enviar el correo electrónico');
        }
    } catch (error) {
        console.error(error);
        errorAlert('Hubo un error al enviar el correo electrónico');
    }
}

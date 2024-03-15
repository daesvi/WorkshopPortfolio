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
        asunto: 'Notificación desde la landing portfolio',
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
        const response = await fetch('https://workshop-send-email.vercel.app/sendemail', {
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
jQuery(function($) {
    $(window).on('scroll', function() {
		if ($(this).scrollTop() >= 200) {
			$('.navbar').addClass('fixed-top');
		} else if ($(this).scrollTop() == 0) {
			$('.navbar').removeClass('fixed-top');
		}
	});
	
	function adjustNav() {
		var winWidth = $(window).width(),
			dropdown = $('.dropdown'),
			dropdownMenu = $('.dropdown-menu');
		
		if (winWidth >= 768) {
			dropdown.on('mouseenter', function() {
				$(this).addClass('show')
					.children(dropdownMenu).addClass('show');
			});
			
			dropdown.on('mouseleave', function() {
				$(this).removeClass('show')
					.children(dropdownMenu).removeClass('show');
			});
		} else {
			dropdown.off('mouseenter mouseleave');
		}
	}
	
	$(window).on('resize', adjustNav);
	
	adjustNav();
});
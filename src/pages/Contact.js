// src/pages/Contact.js
import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import DOMPurify from 'dompurify';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        // Sanitizar los datos del formulario
        const sanitizedData = {
            name: DOMPurify.sanitize(form.current.name.value),
            email: DOMPurify.sanitize(form.current.email.value),
            message: DOMPurify.sanitize(form.current.message.value),
        };

        const templateParams = {
            name: sanitizedData.name,
            email: sanitizedData.email,
            message: sanitizedData.message,
        };

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
            .then((result) => {
                alert("Mensaje enviado!");
            }, (error) => {
                alert("Error al enviar el mensaje.");
            });
    };

    return (
        <div>
            <h1>Contacto</h1>
            <form ref={form} onSubmit={sendEmail}>
                <label>Nombre:</label>
                <input type="text" name="name" required />

                <label>Email:</label>
                <input type="email" name="email" required />

                <label>Mensaje:</label>
                <textarea name="message" required></textarea>

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default Contact;

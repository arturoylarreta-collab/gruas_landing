javascript
'use strict';

/*
==============================================================
CONFIGURACIÓN
==============================================================

IMPORTANTE:

Cambia estos datos por los datos reales de la empresa.

Formato WhatsApp:
56 + 9 + número

Ejemplo:
56912345678

NO colocar:
+56912345678
ni espacios
ni guiones
*/

const CONFIG = {
    whatsappNumber: '569XXXXXXXX',

    whatsappMessage:
        'Hola, necesito una grúa en mi ubicación. Mi vehículo es un [TIPO DE VEHÍCULO].',

    phoneNumber:
        '+569XXXXXXXX'
};


/*
==============================================================
GENERAR ENLACE DE WHATSAPP
==============================================================
*/

function buildWhatsAppUrl() {

    const encodedMessage = encodeURIComponent(
        CONFIG.whatsappMessage
    );

    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
}


/*
==============================================================
ACTUALIZAR TODOS LOS BOTONES WHATSAPP
==============================================================
*/

function updateWhatsAppLinks() {

    const whatsappUrl = buildWhatsAppUrl();

    const whatsappLinks = document.querySelectorAll(
        'a[href*="wa.me"]'
    );

    whatsappLinks.forEach((link) => {
        link.href = whatsappUrl;
    });
}


/*
==============================================================
MENÚ MOBILE
==============================================================
*/

function initMobileMenu() {

    const menuButton =
        document.getElementById('menuButton');

    const mobileMenu =
        document.getElementById('mobileMenu');

    const menuOpenIcon =
        document.getElementById('menuOpenIcon');

    const menuCloseIcon =
        document.getElementById('menuCloseIcon');

    if (
        !menuButton ||
        !mobileMenu ||
        !menuOpenIcon ||
        !menuCloseIcon
    ) {
        return;
    }


    menuButton.addEventListener('click', () => {

        const isOpen =
            !mobileMenu.classList.contains('hidden');


        if (isOpen) {

            mobileMenu.classList.add('hidden');

            menuOpenIcon.classList.remove('hidden');

            menuCloseIcon.classList.add('hidden');

            menuButton.setAttribute(
                'aria-expanded',
                'false'
            );

        } else {

            mobileMenu.classList.remove('hidden');

            menuOpenIcon.classList.add('hidden');

            menuCloseIcon.classList.remove('hidden');

            menuButton.setAttribute(
                'aria-expanded',
                'true'
            );
        }

    });


    /*
    Cerrar menú al seleccionar un enlace
    */

    const mobileLinks =
        document.querySelectorAll('.mobile-link');

    mobileLinks.forEach((link) => {

        link.addEventListener('click', () => {

            mobileMenu.classList.add('hidden');

            menuOpenIcon.classList.remove('hidden');

            menuCloseIcon.classList.add('hidden');

            menuButton.setAttribute(
                'aria-expanded',
                'false'
            );

        });

    });

}


/*
==============================================================
AÑO AUTOMÁTICO
==============================================================
*/

function setCurrentYear() {

    const yearElement =
        document.getElementById('currentYear');

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

}


/*
==============================================================
SMOOTH SCROLL
==============================================================

Respeta la preferencia del usuario si tiene
reducido el movimiento activado.
*/

function initSmoothScroll() {

    const links =
        document.querySelectorAll('a[href^="#"]');

    const prefersReducedMotion =
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;


    if (prefersReducedMotion) {
        return;
    }


    links.forEach((link) => {

        link.addEventListener('click', (event) => {

            const targetId =
                link.getAttribute('href');

            if (
                !targetId ||
                targetId === '#'
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        });

    });

}


/*
==============================================================
TRACKING PREPARADO PARA GOOGLE TAG MANAGER
==============================================================

Estos eventos no requieren GTM para que la página funcione.

Si posteriormente instalas GTM, podrás utilizarlos
para registrar conversiones.
*/

function initConversionTracking() {

    const phoneLinks =
        document.querySelectorAll(
            'a[href^="tel:"]'
        );


    phoneLinks.forEach((link) => {

        link.addEventListener('click', () => {

            window.dataLayer =
                window.dataLayer || [];

            window.dataLayer.push({
                event: 'phone_click',
                conversion_type: 'call'
            });

        });

    });


    const whatsappLinks =
        document.querySelectorAll(
            'a[href*="wa.me"]'
        );


    whatsappLinks.forEach((link) => {

        link.addEventListener('click', () => {

            window.dataLayer =
                window.dataLayer || [];

            window.dataLayer.push({
                event: 'whatsapp_click',
                conversion_type: 'whatsapp'
            });

        });

    });

}


/*
==============================================================
INICIALIZACIÓN
==============================================================
*/

document.addEventListener(
    'DOMContentLoaded',
    () => {

        updateWhatsAppLinks();

        initMobileMenu();

        setCurrentYear();

        initSmoothScroll();

        initConversionTracking();

    }
);
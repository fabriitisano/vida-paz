// Datos de cada cabaña
const cabanas = {
    cabana1: {
        titulo: "Cabaña 1",
        capacidad: " 6 personas",
        imagenes: [
            "imagenes/casacama.jpeg",
            "imagenes/casacocina.jpeg",
            "imagenes/casacomedor.jpeg"
        ],
        detalles: [
            "3 camas de 1 plaza y 1 matrimonial",
            "Living y comedor reconfortable",
            "Parrilla propia",
            "Vista a las montañas"
        ]
    },
    cabana2: {
        titulo: "Cabaña Entre Piso",
        capacidad: " 4 personas",
        imagenes: [
            "imagenes/ep_cama.jpeg",
            "imagenes/ep_cocina.jpeg",
            "imagenes/ep_comedor.jpeg",
            "imagenes/ep_escalera.jpeg",
            "imagenes/ep_baño.jpeg",
            "imagenes/ep_baño2.jpeg",
            
        ],
        detalles: [
            "1 cama matrimonial y 1 marinera",
            "Espacio abierto",
            "Parrilla propia",
            "Vista directa a las montañas"
        ]
    },
    cabana3: {
        titulo: "Cabaña Gemela A",
        capacidad: " 4 personas",
        imagenes: [
            "imagenes/comedorGA.jpeg",
            "imagenes/camGA.jpeg",
            "imagenes/piezaGA.jpeg",
            "imagenes/cocinaGA.jpeg",
            "imagenes/bañoGA.jpeg",
            "imagenes/2bañoGA.jpeg",
        ],
        detalles: [
            "1 cama matrimonial y 1 marinera doble",
            "Vista al complejo",
            "Parrilla propia"
        ]
    },
    cabana4: {
        titulo: "Cabaña Gemela B",
        capacidad: " 4 personas",
        imagenes: [
            "imagenes/quinchoGB.jpeg",
            "imagenes/gb_cocina.jpeg",
            "imagenes/gb_comedor.jpeg",
            "imagenes/cuchetaGB.jpeg",
            "imagenes/bañoGB.jpeg",
            "imagenes/2bañoGB.jpeg"
        ],
        detalles: [
            "1 cama matrimonial y 1 marinera doble",
            "Vista al complejo",
            "Parrilla propia"
        ]
    }
};

let imagenesActuales = [];
let indiceActual = 0;

function abrirModal(id) {
    const cabana = cabanas[id];
    imagenesActuales = cabana.imagenes;
    indiceActual = 0;

    actualizarImagen();

    document.getElementById('modal-titulo').textContent = cabana.titulo;
    document.getElementById('modal-capacidad').textContent = cabana.capacidad;

    const lista = document.getElementById('modal-lista');
    lista.innerHTML = '';
    cabana.detalles.forEach(function(detalle) {
        const li = document.createElement('li');
        li.textContent = detalle;
        lista.appendChild(li);
    });

    actualizarPuntos();
    document.getElementById('modal-fondo').style.display = 'flex';
    
}

function actualizarImagen() {
    const img = document.getElementById('modal-img');
    img.src = "";
    img.src = imagenesActuales[indiceActual];
}

function actualizarPuntos() {
    const puntos = document.getElementById('modal-puntos');
    puntos.innerHTML = '';
    imagenesActuales.forEach(function(_, i) {
        const punto = document.createElement('span');
        punto.classList.add('punto');
        if (i === indiceActual) punto.classList.add('activo');
        punto.onclick = function() {
            indiceActual = i;
            actualizarImagen();
            actualizarPuntos();
        };
        puntos.appendChild(punto);
    });
}

function cambiarImagen(direccion) {
    indiceActual = (indiceActual + direccion + imagenesActuales.length) % imagenesActuales.length;
    actualizarImagen();
    actualizarPuntos();
}

function cerrarModal() {
    document.getElementById('modal-fondo').style.display = 'none';
    
}

// Cerrar con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') cerrarModal();
});

// HEADER que cambia al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ANIMACIONES al hacer scroll
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.aparecer, .aparecer-izq, .aparecer-der')
    .forEach(function(el) {
        observer.observe(el);
    });

    const paisejes = [
    "imagenes/p1.jpeg",
    "imagenes/p2.jpeg",
    "imagenes/p3.jpeg",
    "imagenes/p4.jpeg",
    "imagenes/p5.jpeg",
    "imagenes/p6.jpeg",
    "imagenes/p7.jpeg"
];

let lightboxIndice = 0;

function abrirGaleria(indice = 0) {
    lightboxIndice = indice;
    actualizarLightbox();
    document.getElementById('lightbox').style.display = 'flex';
}

function cerrarGaleria() {
    document.getElementById('lightbox').style.display = 'none';
}

function cambiarLightbox(dir) {
    lightboxIndice = (lightboxIndice + dir + paisejes.length) % paisejes.length;
    actualizarLightbox();
}

function actualizarLightbox() {
    document.getElementById('lightbox-img').src = paisejes[lightboxIndice];
    const puntos = document.getElementById('lightbox-puntos');
    puntos.innerHTML = '';
    paisejes.forEach(function(_, i) {
        const p = document.createElement('span');
        p.classList.add('punto');
        if (i === lightboxIndice) p.classList.add('activo');
        p.onclick = function(e) {
            e.stopPropagation();
            lightboxIndice = i;
            actualizarLightbox();
        };
        puntos.appendChild(p);
    });
}

document.addEventListener('keydown', function(e) {
    if (document.getElementById('lightbox').style.display === 'flex') {
        if (e.key === 'ArrowRight') cambiarLightbox(1);
        if (e.key === 'ArrowLeft') cambiarLightbox(-1);
        if (e.key === 'Escape') cerrarGaleria();
    }
});
// TIRA HORIZONTAL ARRASTRABLE
const tira = document.getElementById('tira-contenedor');
let isDown = false;
let startX;
let scrollLeft;

tira.addEventListener('mousedown', function(e) {
    isDown = true;
    tira.classList.add('arrastrando');
    startX = e.pageX - tira.offsetLeft;
    scrollLeft = tira.scrollLeft;
});

tira.addEventListener('mouseleave', function() {
    isDown = false;
    tira.classList.remove('arrastrando');
});

tira.addEventListener('mouseup', function() {
    isDown = false;
    tira.classList.remove('arrastrando');
});

tira.addEventListener('mousemove', function(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - tira.offsetLeft;
    const walk = (x - startX) * 2;
    tira.scrollLeft = scrollLeft - walk;
});

// Soporte táctil para celular
tira.addEventListener('touchstart', function(e) {
    startX = e.touches[0].pageX - tira.offsetLeft;
    scrollLeft = tira.scrollLeft;
});

tira.addEventListener('touchmove', function(e) {
    const x = e.touches[0].pageX - tira.offsetLeft;
    const walk = (x - startX) * 2;
    tira.scrollLeft = scrollLeft - walk;
});
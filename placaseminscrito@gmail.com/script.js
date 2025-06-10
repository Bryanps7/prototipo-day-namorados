// Configuração do carrossel
const carousel = document.getElementById('carousel');
const carouselContainer = document.getElementById('carousel-container');
let currentSlide = 0;
let autoSlideInterval;
let startX = 0;
let isDragging = false;

const images = [
    'image1.jpg', 
    'image2.jpg', 
    'image3.jpg',
    'image4.jpg',
    'image5.jpg',
    'image6.jpg',
    'image7.jpg',
    'image8.jpg',
    'image9.jpg',
    'image10.jpg'
];

// Criar slides
images.forEach((img, index) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `<img src="${img}" alt="Foto do casal ${index + 1}" style="width:100%;">`;
    carousel.appendChild(slide);
});

function updateCarousel() {
    carousel.style.width = `${images.length * 100}%`;
    document.querySelectorAll('.slide').forEach(slide => {
        slide.style.width = `${100 / images.length}%`;
    });
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    carousel.style.transform = `translateX(-${currentSlide * (100 / images.length)}%)`;
    restartAutoSlide();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % images.length;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + images.length) % images.length;
    goToSlide(currentSlide);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
}

function restartAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

carouselContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    clearInterval(autoSlideInterval);
});

carouselContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const diff = startX - x;

    // Atualizar a posição do carrossel enquanto arrasta
    carousel.style.transform = `translateX(calc(-${currentSlide * (100 / images.length)}% - ${diff}px))`;
});

carouselContainer.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    // Limiar para considerar um swipe
    if (diff > 50) {
        nextSlide();
    } else if (diff < -50) {
        prevSlide();
    } else {
        goToSlide(currentSlide);
    }

    // Reinicia o slideshow automático
    restartAutoSlide();
});

updateCarousel();
startAutoSlide();

function calcularAmor() {
    const dataInicio = new Date('2022-05-24T00:00:00');
    const agora = new Date();
    const diffMs = agora - dataInicio;
    if (diffMs < 0) {
        document.getElementById("resultado").innerHTML = "Essa data ainda não chegou!";
        return;
    }
    const segundos = Math.floor(diffMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const anos = Math.floor(dias / 365.25);
    const meses = Math.floor((dias % 365.25) / 30.44); // Corrigir cálculo de meses restantes
    const diasRestantes = Math.floor((dias % 365.25) % 30.44);
    const horasRestantes = horas % 24;
    const minutosRestantes = minutos % 60;
    const segundosRestantes = segundos % 60;

    document.getElementById("resultado").innerHTML = `
        <div>
            ${anos} <br>
            <p>Anos</p> 
        </div>
        <div>
            ${meses} <br>
            <p>Meses</p>
        </div>
        <div>
            ${diasRestantes} <br>
            <p>Dias</p>
        </div>
        <div>
            ${horasRestantes} <br>
            <p>Horas</p>
        </div>
        <div>
            ${minutosRestantes} <br>
            <p>Minutos</p>
        </div>
        <div>
            ${segundosRestantes} <br>
            <p>Segundos</p>
        </div>
    `;
}

setInterval(calcularAmor, 1000);
calcularAmor();
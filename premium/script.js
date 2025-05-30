// Configuração do carrossel
const carousel = document.getElementById('carousel');
const carouselContainer = document.getElementById('carousel-container');
let currentSlide = 0;
let autoSlideInterval;
let startX = 0;
let isDragging = false;

// Lista de imagens para o carrossel (substitua pelas suas imagens)
const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg'
];

// Criar slides
images.forEach((img, index) => {
    // Criar slide
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.style.width = '100%';
    slide.innerHTML = `<img src="${img}" alt="Foto do casal ${index + 1}" style="width:100%;">`;
    carousel.appendChild(slide);
});

// Tornar o carrossel infinito duplicando as imagens do início no final
function makeCarouselInfinite() {
    images.forEach((img, index) => {
        const duplicateSlide = document.createElement('div');
        duplicateSlide.className = 'slide';
        duplicateSlide.style.width = '100%';
        duplicateSlide.innerHTML = `<img src="${img}" alt="Foto do casal duplicada ${index + 1}" style="width:100%;">`;
        carousel.appendChild(duplicateSlide);
    });

    // Ajustar largura do carrossel após duplicação
    updateCarousel();
}

// Ajustar carrossel
function updateCarousel() {
    carousel.style.width = `${images.length * 100}%`;
    document.querySelectorAll('.slide').forEach(slide => {
        slide.style.width = `${100 / images.length}%`;
    });
}

// Navegação do carrossel
function goToSlide(slideIndex) {
    currentSlide = slideIndex;

    // Verificar se estamos no final ou no início duplicado
    if (currentSlide >= images.length) {
        carousel.style.transition = 'none';
        currentSlide = 0;
        carousel.style.transform = `translateX(-${currentSlide * (100 / images.length)}%)`;
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease';
        });
    } else if (currentSlide < 0) {
        carousel.style.transition = 'none';
        currentSlide = images.length - 1;
        carousel.style.transform = `translateX(-${currentSlide * (100 / images.length)}%)`;
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease';
        });
    } else {
        carousel.style.transform = `translateX(-${currentSlide * (100 / images.length)}%)`;
    }

    // Reiniciar o intervalo de transição automática
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

// Transição automática
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000); // Muda a cada 3 segundos
}

function restartAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Controle por toque
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

// Iniciar carrossel
updateCarousel();
startAutoSlide();

// Configuração dos corações
function criarCoracao() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 3 + Math.random() * 3 + "s";
    heart.style.fontSize = (20 + Math.random() * 20) + "px";
    heart.style.opacity = 0.5 + Math.random() * 0.5;

    document.getElementById("hearts-container").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(criarCoracao, 200);

// Contador de amor
function calcularAmor() {
    const dataInput = '2022-12-08';
    const dataInicio = new Date(dataInput + 'T00:00:00');
    const agora = new Date();
    let diffMs = agora - dataInicio;

    if (diffMs < 0) {
        document.getElementById("resultado").innerHTML = "Essa data ainda não chegou!";
        return;
    }

    // faltou o de mês
    const segundos = Math.floor(diffMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44)); // Aproximadamente 30.44 dias por mês
    const anos = Math.floor(dias / 365.25);

    const mesesRestantes = meses % 12;
    const diasRestantes = dias % 365.25;
    const horasRestantes = horas % 24;
    const minutosRestantes = minutos % 60;
    const segundosRestantes = segundos % 60;

    const texto = `
        <div>
            ${anos} <br>
            <p>Anos</p> 
        </div>
        <div>
            ${mesesRestantes} <br>
            <p>Meses</p>
        </div>
        <div>
            ${Math.floor(diasRestantes)} <br>
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
    `
    
    document.getElementById("resultado").innerHTML = texto;
}

setInterval(calcularAmor, 1000);
calcularAmor(); // Chamar imediatamente
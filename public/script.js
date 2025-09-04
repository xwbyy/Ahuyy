// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
    
    // Putar audio otomatis setelah preloader selesai
    setTimeout(() => {
        const weddingAudio = document.getElementById('weddingAudio');
        const audioControl = document.getElementById('audioControl');
        const audioIcon = audioControl.querySelector('i');
        
        // Coba putar audio
        const playPromise = weddingAudio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Audio berhasil diputar
                audioIcon.classList.remove('fa-music');
                audioIcon.classList.add('fa-pause');
                isPlaying = true;
            }).catch(error => {
                // Autoplay mungkin diblokir oleh browser
                console.log('Autoplay prevented:', error);
                // Tetap set isPlaying ke false dan biarkan pengguna menekan tombol
                isPlaying = false;
                audioIcon.classList.remove('fa-pause');
                audioIcon.classList.add('fa-music');
            });
        }
    }, 1500);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Open Invitation Button
const openInvitationBtn = document.getElementById('openInvitation');
openInvitationBtn.addEventListener('click', function() {
    // Scroll to couple section
    document.querySelector('#couple').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Create confetti effect
    createConfetti();
    
    // Play audio
    const audio = document.getElementById('weddingAudio');
    const audioIcon = document.querySelector('.audio-container-bottom i');
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Audio berhasil diputar
            audioIcon.classList.remove('fa-music');
            audioIcon.classList.add('fa-pause');
            isPlaying = true;
        }).catch(error => {
            // Autoplay mungkin diblokir
            console.log('Play prevented:', error);
        });
    }
});

// Audio Control
const audioControl = document.getElementById('audioControl');
const weddingAudio = document.getElementById('weddingAudio');
let isPlaying = false;

audioControl.addEventListener('click', function() {
    const audioIcon = this.querySelector('i');
    if (isPlaying) {
        weddingAudio.pause();
        audioIcon.classList.remove('fa-pause');
        audioIcon.classList.add('fa-music');
    } else {
        const playPromise = weddingAudio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                audioIcon.classList.remove('fa-music');
                audioIcon.classList.add('fa-pause');
                isPlaying = true;
            }).catch(error => {
                console.log('Play prevented:', error);
            });
        }
    }
    isPlaying = !isPlaying;
});

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('July 15, 2026 08:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance < 0) {
        document.getElementById('countdown-days').textContent = '00';
        document.getElementById('countdown-hours').textContent = '00';
        document.getElementById('countdown-minutes').textContent = '00';
        document.getElementById('countdown-seconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
    document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Floating Hearts Animation - Dikurangi jumlahnya
function createFloatingHearts() {
    const floatingHearts = document.getElementById('floatingHearts');
    const heartCount = 5; // Dikurangi dari 20 menjadi 5
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 10 + 8) + 'px'; // Ukuran dikurangi
        heart.style.opacity = Math.random() * 0.3 + 0.2; // Opacity dikurangi
        floatingHearts.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }
}

// Interval dibuat lebih lama untuk mengurangi jumlah hearts
setInterval(createFloatingHearts, 3000);

// Confetti Effect
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation completes
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Gallery Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        modalImage.src = imgSrc;
        modal.style.display = 'block';
    });
});

modalClose.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// RSVP Form Submission
const rsvpForm = document.getElementById('rsvpForm');
const responsesContainer = document.getElementById('responsesContainer');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Load existing responses from localStorage
loadResponses();

rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const message = document.getElementById('message').value;
    
    // Create response object
    const response = {
        name,
        attendance,
        message,
        date: new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    };
    
    // Save to localStorage
    saveResponse(response);
    
    // Add to UI
    addResponseToUI(response);
    
    // Show success message
    showToast('Konfirmasi kehadiran berhasil dikirim!');
    
    // Reset form
    rsvpForm.reset();
});

function saveResponse(response) {
    let responses = JSON.parse(localStorage.getItem('weddingResponses')) || [];
    responses.push(response);
    localStorage.setItem('weddingResponses', JSON.stringify(responses));
}

function loadResponses() {
    const responses = JSON.parse(localStorage.getItem('weddingResponses')) || [];
    
    if (responses.length === 0) {
        responsesContainer.innerHTML = '<p class="no-responses">Belum ada ucapan</p>';
        return;
    }
    
    responsesContainer.innerHTML = '';
    responses.forEach(response => {
        addResponseToUI(response);
    });
}

function addResponseToUI(response) {
    if (responsesContainer.querySelector('.no-responses')) {
        responsesContainer.innerHTML = '';
    }
    
    const responseCard = document.createElement('div');
    responseCard.classList.add('response-card');
    
    responseCard.innerHTML = `
        <div class="response-header">
            <span class="response-name">${response.name}</span>
            <span class="response-date">${response.date}</span>
        </div>
        <div class="response-message">${response.message}</div>
    `;
    
    responsesContainer.prepend(responseCard);
}

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Navbar background on scroll
const navContainer = document.getElementById('navContainer');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navContainer.classList.add('scrolled');
    } else {
        navContainer.classList.remove('scrolled');
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    hero.style.transform = `translateY(${scrolled * 0.4}px)`;
});
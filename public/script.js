// Initialize variables
let audioPlaying = false;
const weddingAudio = document.getElementById('weddingAudio');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePreloader();
    initializeParticles();
    initializeNavigation();
    initializeCountdown();
    initializeGallery();
    initializeRSVPForm();
    initializeAudio();
    initializeOpenInvitation();
    initializeMessages();
});

// Preloader
function initializePreloader() {
    const preloader = document.getElementById('preloader');
    const progress = document.querySelector('.progress');
    
    // Simulate loading progress
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        } else {
            width += 5;
            progress.style.width = width + '%';
        }
    }, 100);
}

// Particles background
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size between 3 and 8 pixels
    const size = Math.random() * 5 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation duration between 10 and 30 seconds
    const duration = Math.random() * 20 + 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Random delay
    particle.style.animationDelay = `-${Math.random() * 20}s`;
    
    container.appendChild(particle);
}

// Navigation
function initializeNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky navigation on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile navigation toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Countdown timer
function initializeCountdown() {
    const weddingDate = new Date('2026-07-15T08:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const timeRemaining = weddingDate - now;
        
        if (timeRemaining <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Gallery modal
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            modalImage.src = imgSrc;
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });
    
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
}

// RSVP Form - UPDATED FOR GOOGLE SHEETS
function initializeRSVPForm() {
    const rsvpForm = document.getElementById('rsvpForm');
    
    rsvpForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(rsvpForm);
        const name = formData.get('name');
        const attendance = formData.get('attendance');
        const message = formData.get('message');
        
        try {
            // Send data to server
            const response = await fetch('/api/rsvp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    attendance: attendance,
                    message: message
                })
            });
            
            if (response.ok) {
                // Show success toast
                showToast('Konfirmasi kehadiran Anda telah berhasil dikirim!');
                
                // Reset form
                rsvpForm.reset();
                
                // Reload messages to show the new one
                loadMessages();
            } else {
                const errorData = await response.json();
                showToast(errorData.error || 'Terjadi kesalahan. Silakan coba lagi.');
            }
        } catch (error) {
            console.error('Error submitting RSVP:', error);
            showToast('Terjadi kesalahan jaringan. Silakan coba lagi.');
        }
    });
}

// Audio player
function initializeAudio() {
    const playAudioBtn = document.getElementById('playAudio');
    
    playAudioBtn.addEventListener('click', function() {
        if (audioPlaying) {
            weddingAudio.pause();
            playAudioBtn.innerHTML = '<i class="fas fa-music"></i>';
            playAudioBtn.classList.remove('playing');
        } else {
            weddingAudio.play().catch(error => {
                console.log('Audio play failed:', error);
                showToast('Klik sekali lagi untuk memutar musik');
            });
            playAudioBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playAudioBtn.classList.add('playing');
        }
        audioPlaying = !audioPlaying;
    });
    
    // Handle audio autoplay restrictions
    document.addEventListener('click', function() {
        if (weddingAudio.paused && !audioPlaying) {
            weddingAudio.play().then(() => {
                audioPlaying = true;
                playAudioBtn.innerHTML = '<i class="fas fa-pause"></i>';
                playAudioBtn.classList.add('playing');
            }).catch(error => {
                // Autoplay was prevented, user interaction is required
                console.log('Autoplay prevented:', error);
            });
        }
    }, { once: true });
}

// Open invitation button
function initializeOpenInvitation() {
    const openInvitationBtn = document.getElementById('openInvitation');
    
    openInvitationBtn.addEventListener('click', function() {
        // Scroll to the couple section
        document.getElementById('couple').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Show a welcome toast
        showToast('Terima kasih telah membuka undangan kami!');
    });
}

// Guestbook messages - UPDATED FOR GOOGLE SHEETS
function initializeMessages() {
    const refreshBtn = document.getElementById('refreshMessages');
    
    // Load messages from server
    loadMessages();
    
    // Refresh messages button
    refreshBtn.addEventListener('click', function() {
        // Rotate icon
        refreshBtn.style.transition = 'transform 0.5s ease';
        refreshBtn.style.transform = 'rotate(360deg)';
        
        setTimeout(() => {
            refreshBtn.style.transform = 'rotate(0deg)';
        }, 500);
        
        // Reload messages
        loadMessages();
        
        showToast('Pesan diperbarui');
    });
}

// Load messages from server - UPDATED FOR GOOGLE SHEETS
async function loadMessages() {
    const messagesContainer = document.getElementById('messagesContainer');
    
    try {
        // Show loading state
        messagesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Memuat pesan...</p>
            </div>
        `;
        
        const response = await fetch('/api/responses');
        
        if (response.ok) {
            const messages = await response.json();
            displayMessages(messages);
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Gagal memuat pesan');
        }
    } catch (error) {
        console.error('Error loading messages:', error);
        messagesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Gagal memuat pesan. Silakan refresh halaman.</p>
            </div>
        `;
    }
}

// Display messages in the guestbook - UPDATED FOR GOOGLE SHEETS
function displayMessages(messages) {
    const messagesContainer = document.getElementById('messagesContainer');
    
    // Clear the container
    messagesContainer.innerHTML = '';
    
    if (!messages || messages.length === 0) {
        // Show empty state
        messagesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-comments"></i>
                <p>Belum ada pesan. Jadilah yang pertama mengirimkan ucapan!</p>
            </div>
        `;
        return;
    }
    
    // Show latest messages first (reverse order)
    const reversedMessages = [...messages].reverse();
    
    reversedMessages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message-card');
        
        const attendanceIcon = msg.attendance === 'Akan Hadir' || msg.attendance === 'yes'
            ? '<i class="fas fa-check-circle" style="color: #28a745;"></i>' 
            : '<i class="fas fa-times-circle" style="color: #dc3545;"></i>';
            
        const attendanceText = msg.attendance === 'Akan Hadir' || msg.attendance === 'yes'
            ? 'Akan Hadir' 
            : 'Tidak Hadir';
        
        // Format date properly
        let displayDate = 'Tanggal tidak tersedia';
        if (msg.timestamp) {
            // If timestamp is already a formatted string from server, use it directly
            if (typeof msg.timestamp === 'string' && msg.timestamp.trim() !== '') {
                displayDate = msg.timestamp;
            } else {
                try {
                    const dateObj = new Date(msg.timestamp);
                    if (!isNaN(dateObj.getTime())) {
                        displayDate = dateObj.toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                    }
                } catch (e) {
                    // If timestamp parsing fails, use as is
                    displayDate = msg.timestamp;
                }
            }
        }
        
        messageElement.innerHTML = `
            <div class="message-header">
                <span class="message-name">${escapeHtml(msg.name || 'Tamu')}</span>
                <span class="message-date">${displayDate}</span>
            </div>
            <div class="message-attendance ${attendanceText === 'Akan Hadir' ? 'attending' : 'not-attending'}">
                ${attendanceIcon} ${attendanceText}
            </div>
            <div class="message-text">
                ${msg.message ? escapeHtml(msg.message) : 'Tidak ada pesan tambahan'}
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
    });
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
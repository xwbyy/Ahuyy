document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
    
    // Auto play audio with user interaction
    const audio = document.getElementById('weddingAudio');
    const audioControl = document.getElementById('audioControl');
    let audioPlayed = false;
    
    // Function to handle first user interaction
    function initAudio() {
        if (!audioPlayed) {
            audio.volume = 0.3;
            audio.play().then(() => {
                audioPlayed = true;
            }).catch(error => {
                console.log('Audio play failed:', error);
            });
            document.removeEventListener('click', initAudio);
            document.removeEventListener('scroll', initAudio);
        }
    }
    
    // Add event listeners for first interaction
    document.addEventListener('click', initAudio);
    document.addEventListener('scroll', initAudio);
    
    // Toggle audio on/off
    audioControl.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            this.innerHTML = '<i class="fas fa-music"></i>';
            showToast('Musik dimulai');
        } else {
            audio.pause();
            this.innerHTML = '<i class="fas fa-music-slash"></i>';
            showToast('Musik dihentikan');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Navbar scroll effect
    const navContainer = document.getElementById('navContainer');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navContainer.classList.add('scrolled');
        } else {
            navContainer.classList.remove('scrolled');
        }
    });
    
    // Open invitation button
    const openInvitation = document.getElementById('openInvitation');
    openInvitation.addEventListener('click', function() {
        // Scroll to couple section
        document.getElementById('couple').scrollIntoView({ behavior: 'smooth' });
        
        // Animate couple cards
        setTimeout(() => {
            const coupleCards = document.querySelectorAll('.couple-card');
            const subtitles = document.querySelectorAll('.section-subtitle');
            
            coupleCards.forEach(card => {
                card.classList.add('animate');
            });
            
            subtitles.forEach(subtitle => {
                subtitle.classList.add('animate');
            });
        }, 500);
        
        // Show confetti
        showConfetti();
    });
    
    // Countdown timer
    const weddingDate = new Date('July 15, 2023 08:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
        document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Animate countdown boxes when in view
        const countdownSection = document.querySelector('.countdown-section');
        const countdownTop = countdownSection.offsetTop;
        const countdownHeight = countdownSection.offsetHeight;
        
        if (window.scrollY > countdownTop - window.innerHeight + 100 && 
            window.scrollY < countdownTop + countdownHeight) {
            const countdownBoxes = document.querySelectorAll('.countdown-box');
            countdownBoxes.forEach(box => {
                box.classList.add('animate');
            });
        }
    }
    
    // Initial call
    updateCountdown();
    // Update every second
    setInterval(updateCountdown, 1000);
    
    // Scroll indicator
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Animate sections when they come into view
        animateOnScroll('couple', '.couple-card');
        animateOnScroll('countdown', '.countdown-box');
        animateOnScroll('gallery', '.gallery-item');
        animateOnScroll('location', '.location-card');
        animateOnScroll('story', '.timeline-item');
        animateOnScroll('event', '.event-card');
        animateOnScroll('rsvp', '.rsvp-form');
        animateOnScroll('dashboard', '.dashboard-container');
        
        // Animate section subtitles
        const subtitles = document.querySelectorAll('.section-subtitle:not(.animate)');
        subtitles.forEach(subtitle => {
            const subtitleTop = subtitle.parentElement.offsetTop;
            const subtitleHeight = subtitle.parentElement.offsetHeight;
            
            if (scrollPosition > subtitleTop - windowHeight + 100 && 
                scrollPosition < subtitleTop + subtitleHeight) {
                subtitle.classList.add('animate');
            }
        });
    });
    
    // Function to animate elements when they come into view
    function animateOnScroll(sectionId, elementSelector) {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (window.scrollY > sectionTop - windowHeight + 100 && 
                window.scrollY < sectionTop + sectionHeight) {
                const elements = document.querySelectorAll(elementSelector + ':not(.animate)');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('animate');
                    }, index * 200);
                });
            }
        }
    }
    
    // Create floating hearts
    createFloatingHearts();
    
    function createFloatingHearts() {
        const heartsContainer = document.getElementById('floatingHearts');
        const heartCount = 20;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            heart.classList.add('heart');
            
            // Random position
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            
            // Random size
            const size = Math.random() * 20 + 10;
            
            // Random animation duration
            const duration = Math.random() * 10 + 5;
            
            // Random delay
            const delay = Math.random() * 5;
            
            // Random color
            const colors = ['#d4af37', '#b76e79', '#e8c8b0', '#b38a6d'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            heart.style.left = `${posX}px`;
            heart.style.top = `${posY}px`;
            heart.style.fontSize = `${size}px`;
            heart.style.animationDuration = `${duration}s`;
            heart.style.animationDelay = `${delay}s`;
            heart.style.color = randomColor;
            
            heartsContainer.appendChild(heart);
        }
    }
    
    // Show confetti
    function showConfetti() {
        const confettiContainer = document.getElementById('confettiContainer');
        confettiContainer.style.display = 'block';
        confettiContainer.innerHTML = '';
        
        const colors = ['#d4af37', '#b76e79', '#e8c8b0', '#b38a6d', '#ffffff'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * window.innerWidth;
            const animationDuration = Math.random() * 3 + 2;
            const animationDelay = Math.random() * 5;
            const shape = Math.random() > 0.5 ? '50%' : '0';
            
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.left = `${left}px`;
            confetti.style.borderRadius = shape;
            confetti.style.animation = `confetti-fall ${animationDuration}s linear ${animationDelay}s forwards`;
            
            confettiContainer.appendChild(confetti);
        }
        
        setTimeout(() => {
            confettiContainer.style.display = 'none';
        }, 5000);
    }
    
    // Gallery image click to open modal
    const galleryImages = document.querySelectorAll('.gallery-image');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImage.src = this.src;
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
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
    
    // RSVP form submission
    const rsvpForm = document.getElementById('rsvpForm');
    
    rsvpForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const attendance = document.getElementById('attendance').value;
        const message = document.getElementById('message').value;
        
        try {
            const response = await fetch('/api/rsvp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    attendance,
                    message
                })
            });
            
            const result = await response.json();
            
            if (response.ok) {
                showToast('Terima kasih! Konfirmasi kehadiran Anda telah kami terima.');
                
                // Show confetti if attending
                if (attendance === 'yes') {
                    showConfetti();
                }
                
                // Reset form
                rsvpForm.reset();
                
                // Refresh dashboard
                loadResponses();
            } else {
                showToast('Gagal mengirim konfirmasi: ' + (result.error || 'Silakan coba lagi.'));
            }
        } catch (error) {
            console.error('Error submitting RSVP:', error);
            showToast('Terjadi kesalahan. Silakan coba lagi.');
        }
    });
    
    // Load responses for dashboard
    async function loadResponses() {
        try {
            const response = await fetch('/api/responses');
            const data = await response.json();
            
            if (response.ok) {
                displayResponses(data);
            } else {
                console.error('Error loading responses:', data.error);
            }
        } catch (error) {
            console.error('Error loading responses:', error);
        }
    }
    
    function displayResponses(responses) {
        const attendingList = document.getElementById('attendingList');
        const notAttendingList = document.getElementById('notAttendingList');
        
        // Clear existing lists
        attendingList.innerHTML = '';
        notAttendingList.innerHTML = '';
        
        // Separate attending and not attending
        const attending = responses.filter(r => r.attendance === 'Akan Hadir');
        const notAttending = responses.filter(r => r.attendance === 'Tidak Hadir');
        
        // Display first 5 of each
        displayResponseItems(attending.slice(0, 5), attendingList);
        displayResponseItems(notAttending.slice(0, 5), notAttendingList);
        
        // Set up "View All" button
        const viewAllBtn = document.getElementById('viewAllBtn');
        viewAllBtn.style.display = (attending.length > 5 || notAttending.length > 5) ? 'block' : 'none';
        
        viewAllBtn.onclick = function() {
            displayResponseItems(attending, attendingList);
            displayResponseItems(notAttending, notAttendingList);
            viewAllBtn.style.display = 'none';
        };
    }
    
    function displayResponseItems(items, container) {
        items.forEach(item => {
            const responseItem = document.createElement('div');
            responseItem.className = 'response-item';
            
            responseItem.innerHTML = `
                <div class="response-header">
                    <span class="response-name">${item.name}</span>
                    <span class="response-date">${new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
                ${item.message ? `<div class="response-message">"${item.message}"</div>` : ''}
            `;
            
            container.appendChild(responseItem);
        });
    }
    
    // Load responses when page loads
    loadResponses();
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
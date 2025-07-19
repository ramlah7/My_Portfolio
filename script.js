document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const backToTopButton = document.querySelector('.back-to-top');
    const generalLightbox = document.getElementById('general-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const prevBtn = generalLightbox.querySelector('.prev');
    const nextBtn = generalLightbox.querySelector('.next');
    let currentImages = []; // Stores images of the current slideshow
    let currentImageIndex = -1;

    // Function to update active nav link on scroll
    const updateActiveNavLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Show/hide back to top button
        if (pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Adjust for fixed nav height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lightbox functionality
    document.querySelectorAll('.slideshow img').forEach((img, index) => {
        img.addEventListener('click', function () {
            generalLightbox.classList.add('visible');
            document.body.style.overflow = 'hidden'; // Prevent scrolling

            const parentSlideshow = this.closest('.slideshow');
            currentImages = Array.from(parentSlideshow.querySelectorAll('img'));
            currentImageIndex = currentImages.indexOf(this);

            updateLightboxImage();
        });
    });

    function updateLightboxImage() {
        if (currentImages.length > 0 && currentImageIndex !== -1) {
            const img = currentImages[currentImageIndex];
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
        }
    }

    // Close lightbox
    generalLightbox.addEventListener('click', function (e) {
        if (e.target === generalLightbox || e.target.classList.contains('close-btn')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        generalLightbox.classList.remove('visible');
        document.body.style.overflow = ''; // Restore scrolling
        currentImages = [];
        currentImageIndex = -1;
    }

    // Prev/Next buttons
    prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentImages.length > 0) {
            currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
            updateLightboxImage();
        }
    });

    nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentImages.length > 0) {
            currentImageIndex = (currentImageIndex + 1) % currentImages.length;
            updateLightboxImage();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function (e) {
        if (generalLightbox.classList.contains('visible')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });

    // Back to top button
    backToTopButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animation on scroll
    const animateOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize sections with hidden state
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Smooth hover effects for header pic
    const headerPic = document.querySelector('.header-pic');
    if (headerPic) {
        headerPic.addEventListener('mouseenter', () => {
            headerPic.querySelector('img').style.transform = 'scale(1.05)';
        });

        headerPic.addEventListener('mouseleave', () => {
            headerPic.querySelector('img').style.transform = 'scale(1)';
        });
    }

    // Mobile nav toggle (for smaller screens)
    const mobileNavToggle = document.createElement('div');
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileNavToggle.style.display = 'none';
    document.body.appendChild(mobileNavToggle);

    const navContainer = document.querySelector('.nav-container');

    const toggleMobileNav = () => {
        if (window.innerWidth <= 576) {
            mobileNavToggle.style.display = 'flex';
            navContainer.style.display = 'none';
        } else {
            mobileNavToggle.style.display = 'none';
            navContainer.style.display = 'flex';
        }
    };

    mobileNavToggle.addEventListener('click', () => {
        if (navContainer.style.display === 'none' || !navContainer.style.display) {
            navContainer.style.display = 'flex';
            mobileNavToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            navContainer.style.display = 'none';
            mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    window.addEventListener('resize', toggleMobileNav);
    toggleMobileNav(); // Initial check
});
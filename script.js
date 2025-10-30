// script.js

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('#navbar nav a');
    const sections = document.querySelectorAll('.content-section, .hero-section');
    
    // 1. Scroll Suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Verifica se o link é o botão CTA que não tem um href/#
            if (this.classList.contains('cta-button') && this.getAttribute('href') === '#contato') {
                 // Deixa o scroll para o CTA
            } else if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Rola suavemente para a seção
                    window.scrollTo({
                        top: targetElement.offsetTop - document.getElementById('navbar').offsetHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. ScrollSpy (Destacar link de navegação ativo)
    function activateScrollSpy() {
        const headerHeight = document.getElementById('navbar').offsetHeight;
        let currentActive = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 10; // Subtrai altura do cabeçalho e um buffer
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActive = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActive)) {
                link.classList.add('active');
            }
        });
    }
    
    // Estilização do link ativo no CSS
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = "#navbar nav a.active { font-weight: bold; color: var(--primary-color); border-bottom: 2px solid var(--primary-color); }";
    document.head.appendChild(styleSheet);


    window.addEventListener('scroll', activateScrollSpy);
    activateScrollSpy(); // Chama uma vez ao carregar a página
});

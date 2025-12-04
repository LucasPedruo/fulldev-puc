// Dados dos Cursos
const coursesData = [
    {
        id: 1,
        title: "Formação em React",
        description: "Formação React Básico ao avançado",
        price: "R$ 59,99",
        originalPrice: "R$ 259,99",
        image: "⚛️",
        badge: "ROCKETSEAT",
        sponsored: true
    },
    {
        id: 2,
        title: "Chat Gpt Completo",
        description: "Domine Prompts",
        price: "R$ 89,99",
        originalPrice: "R$ 199,99",
        image: "🤖",
        badge: "UDEMY",
        sponsored: true
    },
    {
        id: 3,
        title: "Curso de Angular 2",
        description: "Do zero ao profissional",
        price: "R$ 149,99",
        originalPrice: "R$ 299,99",
        image: "🅰️",
        badge: "ROCKETSEAT",
        sponsored: true
    },
    {
        id: 4,
        title: "Node.js Avançado",
        description: "APIs RESTful e GraphQL",
        price: "R$ 199,99",
        originalPrice: "R$ 399,99",
        image: "🟢",
        badge: "UDEMY",
        sponsored: false
    },
    {
        id: 5,
        title: "Python Data Science",
        description: "Machine Learning completo",
        price: "R$ 179,99",
        originalPrice: "R$ 349,99",
        image: "🐍",
        badge: "ROCKETSEAT",
        sponsored: true
    },
    {
        id: 6,
        title: "Flutter Mobile",
        description: "Apps nativos multiplataforma",
        price: "R$ 129,99",
        originalPrice: "R$ 249,99",
        image: "📱",
        badge: "UDEMY",
        sponsored: false
    }
];

// Dados das Postagens
const postsData = [
    {
        id: 1,
        author: "Lucas Pedro",
        avatar: "LP",
        time: "34 minutos atrás",
        title: "Primeiros passos em programação? Curso de Pascal gratuito",
        description: "Esse curso não foi muito produtivo para meu desenvolvimento, gastei tempo e dinheiro.",
        category: "all",
        comments: 509,
        interactions: 2300,
        hypes: 45,
        hasBrandResponse: true
    },
    {
        id: 2,
        author: "Luciano",
        avatar: "LU",
        time: "28/07/2025 às 09:29",
        title: "Gastei muito dinheiro com esse curso",
        description: "Fui professor do curso técnico de Desenvolvimento de Sistemas no Senac e sempre gostei muito de ensinar programação para quem está começando.",
        category: "all",
        comments: 2,
        interactions: 0,
        hypes: 0,
        hasBrandResponse: false
    },
    {
        id: 3,
        author: "Ana Silva",
        avatar: "AS",
        time: "2 horas atrás",
        title: "Como otimizar performance em React",
        description: "Descubra técnicas avançadas para melhorar a performance das suas aplicações React, incluindo memoização, lazy loading e code splitting.",
        category: "frontend",
        comments: 23,
        interactions: 156,
        hypes: 89,
        hasBrandResponse: false
    },
    {
        id: 4,
        author: "Carlos Santos",
        avatar: "CS",
        time: "4 horas atrás",
        title: "API RESTful com Node.js e Express",
        description: "Tutorial completo para criar APIs robustas e escaláveis usando Node.js, Express e boas práticas de desenvolvimento.",
        category: "backend",
        comments: 45,
        interactions: 234,
        hypes: 167,
        hasBrandResponse: false
    },
    {
        id: 5,
        author: "Maria Oliveira",
        avatar: "MO",
        time: "6 horas atrás",
        title: "Flutter vs React Native: Qual escolher?",
        description: "Análise detalhada das duas principais tecnologias para desenvolvimento mobile, comparando performance, comunidade e casos de uso.",
        category: "mobile",
        comments: 67,
        interactions: 189,
        hypes: 145,
        hasBrandResponse: false
    },
    {
        id: 6,
        author: "João Pedro",
        avatar: "JP",
        time: "8 horas atrás",
        title: "Docker e Kubernetes na prática",
        description: "Aprenda a containerizar aplicações e orquestrar com Kubernetes. Inclui exemplos práticos e boas práticas para produção.",
        category: "devops",
        comments: 34,
        interactions: 278,
        hypes: 203,
        hasBrandResponse: false
    }
];

// Variáveis globais
let currentCourseIndex = 0;
let currentFilter = 'all';
let sidebarOpen = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializePosts();
    initializeFilters();
    initializeSidebar();
    initializeSearch();
    initializeInteractions();
});

// Carrossel de Cursos
function initializeCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Renderizar cursos
    renderCourses();
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (currentCourseIndex > 0) {
            currentCourseIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const maxIndex = coursesData.length - Math.floor(carouselTrack.offsetWidth / 315);
        if (currentCourseIndex < maxIndex) {
            currentCourseIndex++;
            updateCarousel();
        }
    });
    
    // Auto-play do carrossel
    setInterval(() => {
        const maxIndex = coursesData.length - Math.floor(carouselTrack.offsetWidth / 315);
        if (currentCourseIndex < maxIndex) {
            currentCourseIndex++;
        } else {
            currentCourseIndex = 0;
        }
        updateCarousel();
    }, 5000);
}

function renderCourses() {
    const carouselTrack = document.getElementById('carouselTrack');
    
    coursesData.forEach((course, index) => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            ${course.badge ? `<div class="course-badge badge-${course.badge.toLowerCase()}">${course.badge}</div>` : ''}
            <div class="course-image">
                ${course.image}
            </div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-price-container">
                    <span class="course-price">${course.price}</span>
                    ${course.originalPrice ? `<span class="course-price-original">${course.originalPrice}</span>` : ''}
                </div>
                <button class="course-btn" onclick="handleCourseClick(${course.id})">
                    Curso patrocinado
                </button>
            </div>
        `;
        
        carouselTrack.appendChild(courseCard);
    });
    
    updateCarousel();
}

function updateCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    const cardWidth = 315; // 300px + 15px gap
    const translateX = -currentCourseIndex * cardWidth;
    carouselTrack.style.transform = `translateX(${translateX}px)`;
    
    // Atualizar botões
    prevBtn.disabled = currentCourseIndex === 0;
    nextBtn.disabled = currentCourseIndex >= coursesData.length - Math.floor(carouselTrack.offsetWidth / cardWidth);
}

// Postagens
function initializePosts() {
    renderPosts();
}

function renderPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';
    
    const filteredPosts = currentFilter === 'all' 
        ? postsData 
        : postsData.filter(post => post.category === currentFilter);
    
    filteredPosts.forEach((post, index) => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.style.animationDelay = `${index * 0.1}s`;
        postCard.innerHTML = `
        <a href="../publicacao/publicacao.html">

            <div class="post-header">
                <div class="post-author-avatar">${post.avatar}</div>
                <div class="post-author-info">
                    <div class="post-author-name">${post.author}</div>
                    <div class="post-time">${post.time}</div>
                </div>
            </div>
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-description">${post.description}</p>
            </div>
            <div class="post-actions">
                <div class="post-action" onclick="handlePostAction(${post.id}, 'comments')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>${post.comments} comentários</span>
                </div>
                <div class="post-action" onclick="handlePostAction(${post.id}, 'interactions')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span>${post.interactions} interações</span>
                </div>
                ${post.hasBrandResponse ? `
                    <div class="post-action">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                        <span>Resposta da marca</span>
                    </div>
                ` : ''}
                <div class="post-action hype-action" onclick="handlePostAction(${post.id}, 'hypes')">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span>${post.hypes} Hype${post.hypes !== 1 ? 's' : ''}</span>
                </div>
            </div>
        </a>
        `;
        
        postsContainer.appendChild(postCard);
    });
}

// Filtros
function initializeFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remover classe active de todos os tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Adicionar classe active ao tab clicado
            tab.classList.add('active');
            
            // Atualizar filtro atual
            currentFilter = tab.dataset.filter;
            
            // Re-renderizar postagens
            renderPosts();
        });
    });
}

// Sidebar
function initializeSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    sidebarToggle.addEventListener('click', () => {
        sidebarOpen = !sidebarOpen;
        sidebar.classList.toggle('open', sidebarOpen);
        
        // Animação do botão
        sidebarToggle.style.transform = sidebarOpen ? 'rotate(90deg)' : 'rotate(0deg)';
    });
    
    // Fechar sidebar ao clicar fora (mobile)
    document.addEventListener('click', (e) => {
        if (sidebarOpen && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            sidebarOpen = false;
            sidebar.classList.remove('open');
            sidebarToggle.style.transform = 'rotate(0deg)';
        }
    });
    
    // Navegação da sidebar
/*     const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remover active de todos os links
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Adicionar active ao link clicado
            link.parentElement.classList.add('active');
            
            // Fechar sidebar no mobile após clicar
            if (window.innerWidth <= 768) {
                sidebarOpen = false;
                sidebar.classList.remove('open');
                sidebarToggle.style.transform = 'rotate(0deg)';
            }
        });
    }); */
}

// Busca
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchInput.value);
        }
    });
    
    searchBtn.addEventListener('click', () => {
        handleSearch(searchInput.value);
    });
    
    // Busca em tempo real
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length > 2) {
            // Filtrar postagens por título ou descrição
            const filteredPosts = postsData.filter(post => 
                post.title.toLowerCase().includes(query) || 
                post.description.toLowerCase().includes(query)
            );
            
            // Aplicar filtro visual
            highlightSearchResults(query);
        } else {
            // Limpar destaques
            clearSearchHighlights();
        }
    });
}

function handleSearch(query) {
    if (query.trim()) {
        console.log(`Buscando por: ${query}`);
        // Aqui você pode implementar a lógica de busca real
        // Por enquanto, apenas logamos a query
    }
}

function highlightSearchResults(query) {
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        const title = card.querySelector('.post-title');
        const description = card.querySelector('.post-description');
        
        if (title.textContent.toLowerCase().includes(query) || 
            description.textContent.toLowerCase().includes(query)) {
            card.style.borderColor = 'var(--accent-orange)';
            card.style.boxShadow = '0 4px 12px rgba(255, 102, 0, 0.3)';
        } else {
            card.style.opacity = '0.6';
        }
    });
}

function clearSearchHighlights() {
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        card.style.borderColor = '';
        card.style.boxShadow = '';
        card.style.opacity = '';
    });
}

// Interações
function initializeInteractions() {
    // Contadores dinâmicos
    animateCounters();
    
    // Efeitos de hover
    initializeHoverEffects();
}

function animateCounters() {
    const counters = document.querySelectorAll('.post-action span');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 30;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 50);
    });
}

function initializeHoverEffects() {
    // Efeito de hover nos cards de postagem
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efeito de hover nos cards de curso
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Handlers de eventos
function handleCourseClick(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    
    // Efeito visual de clique
    const courseCards = document.querySelectorAll('.course-card');
    const clickedCard = courseCards[courseId - 1];
    
    clickedCard.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickedCard.style.transform = '';
    }, 150);
    
    console.log(`Curso clicado: ${course.title}`);
    
    // Aqui você pode implementar a navegação para a página do curso
    // window.location.href = `/curso/${courseId}`;
}

function handlePostAction(postId, action) {
    const post = postsData.find(p => p.id === postId);
    
    if (post) {
        // Simular incremento do contador
        const actionElement = event.currentTarget;
        const counter = actionElement.querySelector('span');
        const currentValue = parseInt(counter.textContent);
        
        // Efeito visual
        actionElement.style.transform = 'scale(1.2)';
        actionElement.style.color = 'var(--accent-orange)';
        
        setTimeout(() => {
            actionElement.style.transform = 'scale(1)';
            actionElement.style.color = '';
        }, 200);
        
        // Atualizar contador
        counter.textContent = currentValue + 1;
        
        // Atualizar dados
        post[action]++;
        
        console.log(`${action} incrementado para o post ${postId}: ${post[action]}`);
    }
}

// Utilitários
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Responsividade
function handleResize() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    if (window.innerWidth > 768) {
        sidebarOpen = false;
        sidebar.classList.remove('open');
        sidebarToggle.style.transform = 'rotate(0deg)';
    }
    
    // Re-calcular carrossel
    updateCarousel();
}

// Event listeners para responsividade
window.addEventListener('resize', debounce(handleResize, 250));

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading para imagens (quando implementadas)
function observeImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading quando disponível
if ('IntersectionObserver' in window) {
    observeImages();
}

// Notificações (simulação)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--bg-secondary);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-lg);
        z-index: 1002;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// CSS para animações de notificação
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Exemplo de uso das notificações
setTimeout(() => {
    showNotification('Bem-vindo ao FullDev! 🚀', 'success');
}, 1000);

// Simulação de dados em tempo real
setInterval(() => {
    // Simular novos comentários/likes ocasionalmente
    const randomPost = postsData[Math.floor(Math.random() * postsData.length)];
    const randomAction = ['comments', 'likes', 'hypes'][Math.floor(Math.random() * 3)];
    
    if (Math.random() < 0.1) { // 10% de chance
        randomPost[randomAction]++;
        renderPosts();
    }
}, 10000); // A cada 10 segundos


// Переключение темы
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Проверяем, есть ли сохраненная тема в localStorage
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');

// Устанавливаем текущую тему
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
} else {
    themeToggle.textContent = '🌙';
}

// Переключение темы при клике
themeToggle.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    }
});

// Анимация счетчиков статистики
function animateCounters() {
    const projectsCount = document.getElementById('projectsCount');
    const clientsCount = document.getElementById('clientsCount');
    const experienceCount = document.getElementById('experienceCount');
    
    if (projectsCount) {
        let count = 0;
        const target = 87;
        const speed = 10;
        
        const updateCount = () => {
            const increment = Math.ceil(target / speed);
            count += increment;
            
            if (count < target) {
                projectsCount.textContent = count;
                setTimeout(updateCount, 50);
            } else {
                projectsCount.textContent = target;
            }
        };
        
        updateCount();
    }
    
    if (clientsCount) {
        let count = 0;
        const target = 42;
        const speed = 5;
        
        const updateCount = () => {
            const increment = Math.ceil(target / speed);
            count += increment;
            
            if (count < target) {
                clientsCount.textContent = count;
                setTimeout(updateCount, 50);
            } else {
                clientsCount.textContent = target;
            }
        };
        
        updateCount();
    }
    
    if (experienceCount) {
        let count = 0;
        const target = 5;
        const speed = 1;
        
        const updateCount = () => {
            const increment = Math.ceil(target / speed);
            count += increment;
            
            if (count < target) {
                experienceCount.textContent = count;
                setTimeout(updateCount, 300);
            } else {
                experienceCount.textContent = target;
            }
        };
        
        updateCount();
    }
}

// Анимация появления элементов при скролле
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.portfolio-item, .stat-item, .skill-item, .blog-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Фильтрация работ на странице портфолио
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.getElementById('portfolioGrid');
    
    if (!portfolioGrid || !filterButtons.length) return;
    
    // Данные портфолио
    const portfolioItems = [
        {
            id: 1,
            title: "Логотип для TechStart",
            category: "logo",
            image: "https://via.placeholder.com/400x300?text=Логотип+TechStart",
            description: "Разработка современного логотипа для технологического стартапа."
        },
        {
            id: 2,
            title: "Сайт для кафе",
            category: "web",
            image: "https://via.placeholder.com/400x300?text=Сайт+кафе",
            description: "Полный редизайн сайта уютного городского кафе."
        },
        {
            id: 3,
            title: "Приложение для фитнеса",
            category: "mobile",
            image: "https://via.placeholder.com/400x300?text=Фитнес-приложение",
            description: "UI/UX дизайн мобильного приложения для тренировок."
        },
        {
            id: 4,
            title: "Фирменный стиль для бренда одежды",
            category: "logo",
            image: "https://via.placeholder.com/400x300?text=Фирменный+стиль",
            description: "Создание полного фирменного стиля для молодежного бренда одежды."
        },
        {
            id: 5,
            title: "Сайт для фотографа",
            category: "web",
            image: "https://via.placeholder.com/400x300?text=Портфолио+фотографа",
            description: "Веб-сайт-портфолио для профессионального фотографа."
        },
        {
            id: 6,
            title: "Приложение для путешествий",
            category: "mobile",
            image: "https://via.placeholder.com/400x300?text=Путешествия+приложение",
            description: "Дизайн мобильного приложения для планирования путешествий."
        },
        {
            id: 7,
            title: "Логотип для ресторана",
            category: "logo",
            image: "https://via.placeholder.com/400x300?text=Логотип+ресторана",
            description: "Элегантный логотип для нового ресторана итальянской кухни."
        },
        {
            id: 8,
            title: "Корпоративный сайт",
            category: "web",
            image: "https://via.placeholder.com/400x300?text=Корпоративный+сайт",
            description: "Современный корпоративный сайт для производственной компании."
        }
    ];
    
    // Функция для отображения работ
    function displayPortfolioItems(category = 'all') {
        portfolioGrid.innerHTML = '';
        
        const filteredItems = category === 'all' 
            ? portfolioItems 
            : portfolioItems.filter(item => item.category === category);
        
        filteredItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'blog-item portfolio-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="blog-content">
                    <h3>${item.title}</h3>
                    <div class="blog-meta">
                        <span>${item.category === 'logo' ? 'Логотип' : item.category === 'web' ? 'Веб-дизайн' : 'Мобильное приложение'}</span>
                    </div>
                    <p>${item.description}</p>
                    <a href="#" class="read-more">Подробнее →</a>
                </div>
            `;
            portfolioGrid.appendChild(itemElement);
        });
        
        // Инициализация анимаций для новых элементов
        initScrollAnimations();
    }
    
    // Обработчики событий для кнопок фильтрации
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем класс active у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем класс active к нажатой кнопке
            button.classList.add('active');
            
            // Отображаем соответствующие работы
            const category = button.dataset.filter;
            displayPortfolioItems(category);
        });
    });
    
    // Отображение всех работ при загрузке страницы
    displayPortfolioItems();
}

// Обработка формы контактов
function initContactForm() {
    const contactForm = document.getElementById('messageForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!contactForm || !formMessage) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Здесь обычно отправляли бы данные на сервер
        // Для демо-версии просто покажем сообщение
        
        // Сохраняем данные в localStorage для демо-версии
        const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        messages.push({
            name,
            email,
            subject,
            message,
            date: new Date().toISOString()
        });
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        // Отображаем сообщение об успешной отправке
        formMessage.innerHTML = `
            <div style="background-color: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin-top: 15px;">
                Спасибо, ${name}! Ваше сообщение успешно отправлено. Я свяжусь с вами в ближайшее время.
            </div>
        `;
        
        // Очищаем форму
        contactForm.reset();
        
        // Скрываем сообщение через 5 секунд
        setTimeout(() => {
            formMessage.innerHTML = '';
        }, 5000);
    });
}

// Функция для сохранения истории посещений
function trackPageVisit() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const visits = JSON.parse(localStorage.getItem('pageVisits')) || [];
    
    // Добавляем текущую страницу в историю
    visits.push({
        page: currentPage,
        timestamp: new Date().toISOString()
    });
    
    // Ограничиваем историю последними 10 посещениями
    if (visits.length > 10) {
        visits.shift();
    }
    
    localStorage.setItem('pageVisits', JSON.stringify(visits));
}

// Отображение последних посещенных страниц
function showRecentVisits() {
    const visits = JSON.parse(localStorage.getItem('pageVisits')) || [];
    if (visits.length === 0) return;
    
    const footer = document.querySelector('footer .container');
    if (!footer) return;
    
    const recentVisits = document.createElement('div');
    recentVisits.className = 'recent-visits';
    recentVisits.style.marginTop = '20px';
    recentVisits.innerHTML = '<h4>Недавно просмотренные страницы:</h4><ul></ul>';
    
    const ul = recentVisits.querySelector('ul');
    
    // Показываем только последние 3 уникальных посещения
    const uniquePages = [...new Set(visits.map(v => v.page).reverse())].slice(0, 3);
    
    uniquePages.forEach(page => {
        const li = document.createElement('li');
        let pageName = '';
        
        switch(page) {
            case 'index.html':
                pageName = 'Главная';
                break;
            case 'about.html':
                pageName = 'Обо мне';
                break;
            case 'blog.html':
                pageName = 'Портфолио';
                break;
            case 'contact.html':
                pageName = 'Контакты';
                break;
            default:
                pageName = page.replace('.html', '').replace('-', ' ');
        }
        
        li.innerHTML = `<a href="${page}">${pageName}</a>`;
        ul.appendChild(li);
    });
    
    footer.prepend(recentVisits);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Анимация счетчиков на главной странице
    if (document.getElementById('projectsCount')) {
        animateCounters();
    }
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
    
    // Инициализация фильтрации портфолио
    initPortfolioFilter();
    
    // Инициализация формы контактов
    initContactForm();
    
    // Отслеживание посещений страниц
    trackPageVisit();
    showRecentVisits();
    
    // Сохранение темы при перезагрузке страницы
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }
});
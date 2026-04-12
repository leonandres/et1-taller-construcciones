// sidebar.js - Unificar header y botón de tema (FORZADO)
(function() {
    const aside = document.querySelector('aside');
    if (!aside) return;
    
    // ===== 1. ELIMINAR BOTÓN VIEJO SI EXISTE =====
    const oldThemeBtn = document.getElementById('btn-theme');
    if (oldThemeBtn) {
        oldThemeBtn.remove();
    }
    
    // ===== 2. CREAR BOTÓN NUEVO DESDE CERO =====
    const newThemeBtn = document.createElement('button');
    newThemeBtn.id = 'btn-theme';
    newThemeBtn.className = 'theme-btn';
    newThemeBtn.setAttribute('aria-label', 'Cambiar tema claro/oscuro');
    newThemeBtn.innerHTML = document.body.classList.contains('dark-mode') ? '☼' : '☾';
    
    // Insertar el botón ANTES del nav (o al final del aside)
    const nav = aside.querySelector('nav');
    if (nav) {
        aside.insertBefore(newThemeBtn, nav);
    } else {
        aside.appendChild(newThemeBtn);
    }
    
    // ===== 3. CONFIGURAR EVENTO DEL BOTÓN =====
    function updateThemeButton() {
        const isDark = document.body.classList.contains('dark-mode');
        newThemeBtn.innerHTML = isDark ? '☼' : '☾';
    }
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
        document.body.classList.add('dark-mode');
        updateThemeButton();
    }
    
    newThemeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark-mode' : 'light');
        updateThemeButton();
    });
    
    // ===== 4. UNIFICAR HEADER (sin duplicar) =====
    if (!aside.querySelector('.school-header')) {
        const existingNav = aside.querySelector('nav');
        
        const schoolHeader = document.createElement('div');
        schoolHeader.className = 'school-header';
        schoolHeader.innerHTML = `
            <div class="school-logo-text">
                <span class="barra">|</span> ET N°1
            </div>
            <div class="school-titles">
                <h1>Sistemas constructivos</h1>
                <span class="school-name">4° Año - Taller</span>
            </div>
        `;
        
        // Remover elementos antiguos
        const oldLogo = aside.querySelector('.school-logo, .school-logo-text, .school-logo-original');
        const oldTitle = aside.querySelector('h1:not(.school-titles h1)');
        const oldSchoolName = aside.querySelector('.school-name:not(.school-titles .school-name)');
        
        if (oldLogo) oldLogo.remove();
        if (oldTitle) oldTitle.remove();
        if (oldSchoolName) oldSchoolName.remove();
        
        // Insertar nuevo header al principio
        aside.insertBefore(schoolHeader, aside.firstChild);
    }
    
    // ===== 5. LIMPIAR FUNCIONES GLOBALES VIEJAS =====
    // Eliminar toggleTheme del objeto window si existe
    if (window.toggleTheme) {
        window.toggleTheme = undefined;
    }
})();
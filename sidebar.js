// sidebar.js - Unificar header del sidebar
(function() {
    const aside = document.querySelector('aside');
    if (!aside) return;
    if (aside.querySelector('.school-header')) return;
    
    const existingThemeBtn = document.getElementById('btn-theme');
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
    
    // Insertar nuevo header
    aside.insertBefore(schoolHeader, aside.firstChild);
    
    // Asegurar que el botón de tema esté después
    if (existingThemeBtn) {
        existingThemeBtn.remove();
        aside.insertBefore(existingThemeBtn, existingNav || null);
    }
})();
document.addEventListener('DOMContentLoaded', function() {
    // Dropdown menyular üçün elementləri seçirik
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Desktop üçün hover funksionallığı (768px-dən böyük ekranlarda)
    function setupDesktopNavigation() {
        if (window.innerWidth > 768) {
            document.querySelectorAll('.has-dropdown').forEach(function(dropdown) {
                dropdown.addEventListener('mouseenter', function() {
                    // Digər açıq dropdown-ları bağlayırıq
                    document.querySelectorAll('.has-dropdown').forEach(function(otherDropdown) {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Bu dropdown-u açırıq
                    dropdown.classList.add('active');
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    dropdown.classList.remove('active');
                });
            });
        }
    }
    
    // Mobil cihazlar üçün klik funksionallığı
    function setupMobileNavigation() {
        // Mobil menyu toggle
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
        
        // Dropdown toggle üçün klik funksionallığı
        dropdownToggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    const parent = this.parentElement;
                    
                    // Digər açıq dropdown-ları bağlayırıq
                    document.querySelectorAll('.has-dropdown').forEach(function(dropdown) {
                        if (dropdown !== parent) {
                            dropdown.classList.remove('active');
                        }
                    });
                    
                    // Bu dropdown-u açıb/bağlayırıq
                    parent.classList.toggle('active');
                }
            });
        });
    }
    
    // Səhifənin hər hansı bir yerinə klik edildikdə dropdown-ları bağlayırıq
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768) {
            if (!e.target.closest('.has-dropdown')) {
                document.querySelectorAll('.has-dropdown').forEach(function(dropdown) {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
    
    // Ekran ölçüsü dəyişdikdə
    window.addEventListener('resize', function() {
        // Bütün dropdown-ları bağlayırıq
        document.querySelectorAll('.has-dropdown').forEach(function(dropdown) {
            dropdown.classList.remove('active');
        });
        
        // Mobil menyunu bağlayırıq
        mainNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        
        // Desktop/Mobil naviqasiya quraşdırması
        setupDesktopNavigation();
    });
    
    // İlkin quraşdırma
    setupDesktopNavigation();
    setupMobileNavigation();
});
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    // ハンバーガーメニューの表示制御
    menuToggle.style.display = window.innerWidth <= 768 ? 'block' : 'none';
    
    // メニューの開閉
    menuToggle.addEventListener('click', function() {
        document.body.classList.toggle('menu-open');
    });

    // オーバーレイクリックでメニューを閉じる
    menuOverlay.addEventListener('click', function() {
        document.body.classList.remove('menu-open');
    });

    // モバイルドロップダウンの制御
    mobileDropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const dropdownMenu = this.nextElementSibling;
        
        if (mobileDropdown.classList.contains('active')) {
            // メニューを閉じる
            mobileDropdown.classList.remove('active');
            dropdownMenu.style.maxHeight = '0px';
        } else {
            // メニューを開く
            mobileDropdown.classList.add('active');
            dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
        }
    });

    // ウィンドウリサイズ時の制御
    window.addEventListener('resize', function() {
        menuToggle.style.display = window.innerWidth <= 768 ? 'block' : 'none';
        if (window.innerWidth > 768) {
            document.body.classList.remove('menu-open');
        }
    });

    // メニュー項目クリック時に閉じる
    const menuItems = document.querySelectorAll('.mobile-nav a:not(.mobile-dropdown-toggle)');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            document.body.classList.remove('menu-open');
        });
    });
});

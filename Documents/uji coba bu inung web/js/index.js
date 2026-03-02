// Sidebar functionality
const sidebarToggle = document.getElementById('sidebarToggle');
// ensure toggle is accessible to screen readers
if (sidebarToggle && !sidebarToggle.hasAttribute('aria-label')) {
    sidebarToggle.setAttribute('aria-label', 'Buka menu');
}
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarClose = document.getElementById('sidebarClose');

// Open sidebar
function openSidebar() {
    // if contact modal open, close it to avoid overlap
    if (kontakModal && kontakModal.classList.contains('active')) {
        closeModal();
    }
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close sidebar
function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for sidebar
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (sidebar.classList.contains('active')) {
            closeSidebar();
            sidebarToggle.setAttribute('aria-expanded', 'false');
        } else {
            openSidebar();
            sidebarToggle.setAttribute('aria-expanded', 'true');
        }
    });
    // initialize aria-expanded
    sidebarToggle.setAttribute('aria-expanded', 'false');
}

if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}

// Close sidebar with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});

// Contact Modal functionality
const kontakBtn = document.getElementById('kontakBtn');
const kontakModal = document.getElementById('kontakModal');
const modalClose = document.getElementById('modalClose');

// Open modal
function openModal() {
    kontakModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Close sidebar if open
    closeSidebar();
}

// Close modal
function closeModal() {
    kontakModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for modal
if (kontakBtn) {
    kontakBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (kontakModal) {
    kontakModal.addEventListener('click', (e) => {
        if (e.target === kontakModal) {
            closeModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && kontakModal.classList.contains('active')) {
        closeModal();
    }
});

// Handle click on Kontak link in sidebar
const kontakLink = document.querySelector('.kontak-link');
if (kontakLink) {
    kontakLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}

// Exit button(s) - ensure consistent SVG back icon and navigate back
const exitButtons = document.querySelectorAll('.exit-btn');
if (exitButtons.length) {
    const backSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">\n      <polyline points="15 18 9 12 15 6"/>\n    </svg>';

    exitButtons.forEach(btn => {
        // inject SVG if there is no visible icon already
        if (!btn.querySelector('svg')) {
            btn.innerHTML = backSvg;
        }

        // ensure clickable behavior is consistent (history.back or fallback to tutorial)
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (history.length > 1) {
                history.back();
            } else {
                window.location.href = 'tutorial.html';
            }
        });
    });
}


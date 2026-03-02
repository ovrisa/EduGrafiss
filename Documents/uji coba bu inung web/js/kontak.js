// Sidebar functionality
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarClose = document.getElementById('sidebarClose');

// Open sidebar
function openSidebar() {
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
    sidebarToggle.addEventListener('click', openSidebar);
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

// Auto-open modal when on kontak.html page
window.addEventListener('load', () => {
    if (window.location.pathname.includes('kontak.html')) {
        openModal();
    }
});

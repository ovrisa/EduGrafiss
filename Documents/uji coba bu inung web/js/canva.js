// Canva page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const optionItems = document.querySelectorAll('.option-item');

    // Helper: close all overlays
    function closeAllChoices() {
        optionItems.forEach(it => {
            it.classList.remove('show-choices');
            const content = it.querySelector('.option-item-content');
            if (content) content.setAttribute('aria-expanded', 'false');
            const overlay = it.querySelector('.choice-overlay');
            if (overlay) overlay.setAttribute('aria-hidden', 'true');
        });
    }

    // Toggle overlay when the card area is clicked (or Enter/Space pressed)
    optionItems.forEach(item => {
        const content = item.querySelector('.option-item-content');
        const overlay = item.querySelector('.choice-overlay');

        if (!content) return;

        function openChoices() {
            closeAllChoices();
            item.classList.add('show-choices');
            content.setAttribute('aria-expanded', 'true');
            if (overlay) overlay.setAttribute('aria-hidden', 'false');
        }

        content.addEventListener('click', function(e) {
            // open choices overlay instead of immediate navigation
            e.stopPropagation();
            if (item.classList.contains('show-choices')) {
                // already open -> close it
                closeAllChoices();
            } else {
                openChoices();
            }
        });

        // keyboard support
        content.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                content.click();
            }
        });

        // touch devices: open overlay immediately on touchstart so the user
        // sees the two big choices (prevents accidental immediate navigation)
        content.addEventListener('pointerdown', function(e) {
            try {
                if (e.pointerType === 'touch') {
                    // prevent the default synthetic click that would follow
                    e.preventDefault();
                    openChoices();
                }
            } catch (err) {
                // ignore environments without pointer events
            }
        }, { passive: false });

        // handle clicks on the overlay choice buttons
        if (overlay) {
            overlay.addEventListener('click', function(evt) {
                // If user clicked on the overlay background, close choices
                if (evt.target === overlay) {
                    closeAllChoices();
                    return;
                }

                // Otherwise, if a choice link was clicked, intercept and navigate
                const link = evt.target.closest('a');
                if (!link) return;
                evt.preventDefault();
                const href = link.getAttribute('href');
                item.classList.add('clicked');
                setTimeout(() => {
                    window.location.href = href;
                }, 220);
            });
        }
    });

    // close overlays when clicking outside
    document.addEventListener('click', function() {
        closeAllChoices();
    });

    // close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeAllChoices();
    });

    // Positioning: let CSS control desktop placement; clear inline styles on resize/scroll
    function positionBackButton() {
        const btn = document.querySelector('.page-back-btn');
        if (!btn) return;

        if (window.innerWidth <= 920) {
            // mobile: clear to allow mobile CSS rules
            btn.style.position = '';
            btn.style.top = '';
            btn.style.left = '';
            btn.style.width = '';
            btn.style.height = '';
            btn.style.zIndex = '';
            return;
        }

        // desktop: remove inline overrides so CSS fixed coordinates apply
        btn.style.position = '';
        btn.style.top = '';
        btn.style.left = '';
        btn.style.width = '';
        btn.style.height = '';
        btn.style.zIndex = '';
    }

    positionBackButton();
    window.addEventListener('resize', positionBackButton);
    window.addEventListener('scroll', positionBackButton);
});
// Gallery carousel initializer that connects HTML, CSS and JS
document.addEventListener('DOMContentLoaded', () => {
    function createSlider({ sliderId, prevId, nextId, indicatorsId, captionTitleId, captionTextId, captions }) {
        const slider = document.getElementById(sliderId);
        if (!slider) return;

        const slides = Array.from(slider.querySelectorAll('.slide'));
        const total = slides.length;
        const prevBtn = document.getElementById(prevId);
        const nextBtn = document.getElementById(nextId);
        const indicators = document.getElementById(indicatorsId);
        const captionTitle = captionTitleId ? document.getElementById(captionTitleId) : null;
        const captionText = captionTextId ? document.getElementById(captionTextId) : null;

        // wire up dots inside indicators container
        const dots = indicators ? Array.from(indicators.querySelectorAll('.dot')) : [];

        let current = 0;

        function update() {
            slider.style.transform = `translateX(-${current * 100}%)`;

            dots.forEach((d, i) => d.classList.toggle('active', i === current));

            if (captionTitle && captionText) {
                const c = captions && captions[current] ? captions[current] : { title: '', text: '' };
                captionTitle.textContent = c.title || '';
                captionText.textContent = c.text || '';
            }
        }

        function next() { current = (current + 1) % total; update(); }
        function prev() { current = (current - 1 + total) % total; update(); }
        function goTo(i) { current = i; update(); }

        if (nextBtn) nextBtn.addEventListener('click', next);
        if (prevBtn) prevBtn.addEventListener('click', prev);

        dots.forEach(d => d.addEventListener('click', () => { const i = parseInt(d.dataset.index, 10); if (!Number.isNaN(i)) goTo(i); }));

        // keyboard navigation scoped: global keys move both sliders; keep default behavior
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        });

        update();
    }

    const canvaCaptions = [
        { title: 'Canva 1', text: 'Gradient pink-purple dengan font bold playful. Ilustrasi karakter cartoon dan boxes pastel terstruktur. Elemen bintang dekoratif dan typography 3D.' },
        { title: 'Canva 2', text: 'Background gradasi sunset ungu-oranye. 3 karakter dengan smartphone mockup Google. Typography bold 3D, layout EASY boxes merah di sudut, elemen awan dan sparkle.' }
    ];

    const figmaCaptions = [
        { title: 'Figma 1', text: 'Background gradasi gelap dengan dot pattern. Ilustrasi karakter hijab 3D dengan crown glowing. Layout 4 boxes hijau-orange, typography bold outline putih, elemen trophy dan tulip pink.' },
        { title: 'Figma 2', text: 'Background ilustrasi masjid dengan gradient biru-kuning. Karakter muslimah 3D dengan bubble quote. Typography bold 3D glow, layout boxes ikon circle dan section MAS. Elemen lentera dan dots.' }
    ];

    createSlider({ sliderId: 'slider', prevId: 'prevBtn', nextId: 'nextBtn', indicatorsId: 'indicatorDots', captionTitleId: 'caption-title', captionTextId: 'caption-text', captions: canvaCaptions });
    createSlider({ sliderId: 'sliderFigma', prevId: 'prevBtnFigma', nextId: 'nextBtnFigma', indicatorsId: 'indicatorDotsFigma', captionTitleId: 'caption-title-figma', captionTextId: 'caption-text-figma', captions: figmaCaptions });
});
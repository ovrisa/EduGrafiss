const pageInfo = { poster:{icon:'📄',title:'Poster'}, presentasi:{icon:'📊',title:'Presentasi'}, logo:{icon:'💡',title:'Logo'}, infografis:{icon:'📈',title:'Infografis'} };
let activeCard = null;

function expandCard(name){
    if(activeCard===name) return;
    if(activeCard) collapseCard(activeCard);
    const card = document.getElementById('card-'+name);
    card.classList.add('expanded');
    document.querySelector('.grid-wrapper').classList.add('dim');
    activeCard = name;
    card.setAttribute('aria-expanded','true');
}

function collapseCard(name){
    const card = document.getElementById('card-'+name);
    if(!card) return;
    card.classList.remove('expanded');
    document.querySelector('.grid-wrapper').classList.remove('dim');
    card.setAttribute('aria-expanded','false');
}

function goToPage(e,name,version){
    e.stopPropagation();
    const target = `canva-${name}-${version}.html`;
    const card = document.getElementById('card-'+name);
    card.animate([
        { transform: 'scale(1.00)' },
        { transform: 'scale(0.995)' },
        { transform: 'scale(1.02)' },
        { transform: 'scale(0.999)' }
    ], { duration: 280, easing: 'cubic-bezier(.4,0,.2,1)' });
    setTimeout(()=> { window.location.href = target; }, 260);
}

// Close card on outside click
document.addEventListener('click', e => {
    if(!activeCard) return;
    const card = document.getElementById('card-'+activeCard);
    if(!card.contains(e.target)){
        collapseCard(activeCard);
        activeCard = null;
    }
});

// Stagger entry animation for cards and accessibility setup
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card').forEach((c,i) => {
        c.style.opacity = '0';
        c.style.transform = 'translateY(30px)';
        c.style.transition = `opacity 0.5s ease ${i*0.08+0.12}s, transform 0.5s ease ${i*0.08+0.12}s, box-shadow 0.32s ease`;
        setTimeout(()=>{ c.style.opacity='1'; c.style.transform='translateY(0)'; }, 50);
        c.setAttribute('role','button');
        c.setAttribute('tabindex','0');
        c.setAttribute('aria-expanded','false');
        c.addEventListener('keydown', ev => { if(ev.key==='Enter' || ev.key===' ') { ev.preventDefault(); expandCard(c.id.replace('card-','')); } });
    });
    // make card sizes match the platform description (width & height)
    function adjustCardSizes(){
        const desc = document.querySelector('.platform-description');
        const cardGrid = document.querySelector('.card-grid');
        if(!desc || !cardGrid) return;
        const descRect = desc.getBoundingClientRect();
        const descW = Math.round(descRect.width);
        const descH = Math.round(descRect.height);
        const gap = 18; // match CSS gap
        const cols = window.innerWidth < 760 ? 1 : 2;

        // compute card width so grid fits exactly inside description width
        let cardW = Math.floor((descW - gap * (cols - 1)) / cols);
        const minCardW = 180;
        if(cardW < minCardW) cardW = minCardW;

        if(cols === 1){
            cardGrid.style.gridTemplateColumns = '1fr';
            cardGrid.style.maxWidth = descW + 'px';
        } else {
            cardGrid.style.gridTemplateColumns = `repeat(2, ${cardW}px)`;
            cardGrid.style.maxWidth = descW + 'px';
        }
        cardGrid.style.margin = '0 auto';

        // set each card minHeight to a compact size (smaller than before)
        // add ~4cm (≈151px) to make the white area longer as requested
        const EXTRA_CM4_PX = 151; // ~4cm at 96dpi
        const targetH = Math.max(110, Math.round(descH * 0.32) + EXTRA_CM4_PX);
        document.querySelectorAll('.card').forEach(c => {
            c.style.minHeight = targetH + 'px';
        });
    }
    adjustCardSizes();
    let resizeTimer = null;
    window.addEventListener('resize', ()=>{
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(adjustCardSizes, 120);
    });
});

// Exit button handler
document.querySelector('.exit-btn').addEventListener('click', function() {
    window.location.href = 'tutorial.html';
});

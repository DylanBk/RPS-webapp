export default function handleBurgermenu() {
    if (document.getElementById('burgermenu')) {
        const bm = document.getElementById('burgermenu');
        const m = document.getElementById('menu');
        if (m.style.display === 'none') {
            m.style.display = 'flex';

            bm.children[0].style.transform = 'translateY(1.5rem) rotate(45deg)';
            bm.children[1].style.scale = 0;
            bm.children[2].style.transform = 'translateY(-1.5rem) rotate(-45deg)';
        } else {
            m.style.display = 'none';

            bm.children[0].style.transform = 'translateY(0) rotate(0deg)';
            bm.children[1].style.scale = 0;
            bm.children[2].style.transform = 'translateY(0) rotate(0deg)';
        }
    };
};
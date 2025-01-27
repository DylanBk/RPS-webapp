export default function handleBurgermenu() {
    if (document.getElementById('burgermenu')) {
        const bm = document.getElementById('burgermenu');
        const m = document.getElementById('menu');
        if (m.style.display === 'none') {
            console.log('hidden')
            m.style.display = 'flex';

            bm.style.transform = 'translateX(4rem) translateY(-3rem)';
            bm.children[0].style.transform = 'translateY(1.5rem) rotate(45deg)';
            bm.children[1].style.scale = 0;
            bm.children[2].style.transform = 'translateY(-1.5rem) rotate(-45deg)';
        } else {
            console.log('unhidden')
            m.style.display = 'none';

            bm.style.transform = 'translateX(0) translateY(0)';
            bm.children[0].style.transform = 'translateY(0) rotate(0deg)';
            bm.children[1].style.scale = 1;
            bm.children[2].style.transform = 'translateY(0) rotate(0deg)';
        }
    } else {
        console.log('no bm')
    }
};
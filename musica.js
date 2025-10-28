document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('musica');

    document.body.addEventListener('click', () => {
        audio.play().catch(err => console.log('Autoplay bloccato:', err));
    }, { once: true });

    audio.addEventListener('pause', () => {
        audio.play().catch(err => console.log('Autoplay bloccato:', err));
    });
});

const emojiList = ['🎃','👻','🦇','💀','🕷️','🍬','🕸️'];
const emojiContainer = document.getElementById('emoji-container');
const audio = document.querySelector('audio');

function createEmoji() {
    const span = document.createElement('span');
    span.classList.add('emoji');
    span.innerText = emojiList[Math.floor(Math.random() * emojiList.length)];
    span.style.left = Math.random() * window.innerWidth + 'px';
    span.style.top = '-50px';
    const size = 20 + Math.random() * 30;
    span.style.fontSize = size + 'px';
    const duration = 5 + Math.random() * 5;
    emojiContainer.appendChild(span);
    span.animate([
        { transform: `translateY(0px)` },
        { transform: `translateY(${window.innerHeight + 50}px)` }
    ], {
        duration: duration * 1000,
        iterations: 1,
        easing: 'linear'
    }).onfinish = () => span.remove();
}

setInterval(createEmoji, 300);

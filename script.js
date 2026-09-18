const contactBtns = document.getElementsByClassName("contactBtns");
const contactWin = document.getElementById("contactWin");
const contactClose = document.getElementById("contactClose");
const contactForm = document.getElementById("contactForm");

Array.from(contactBtns).forEach((btn) => {
	btn.addEventListener("click", () => {
		if (contactWin.open) {
			contactWin.close();
		} else {
			contactWin.show();
		}
	});
});

contactClose.addEventListener("click", () => contactWin.close());


contactForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const response = await fetch(contactForm.action, {
		method: 'POST',
		headers: {Accept: 'application/json'},
		body: new FormData(contactForm),
	});

	if (response.ok) {
		contactForm.reset();
		contactWin.close();
	} else {
		console.error('Formspree error', response.status);
	}
});



/* TEMPORARY PLUG */

const canvas = document.getElementById('matrix');
if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = ['0', '1'];
    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize);

    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * (canvas.height / fontSize)));

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ff0000';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.9) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 80);
}
const contactBtn = document.getElementById("contactBtn");
const contactWin = document.getElementById("contactWin");
const contactClose = document.getElementById("contactClose");
const contactForm = document.getElementById("contactForm");

contactBtn.addEventListener("click", () => {
	if (contactWin.open) {
		contactWin.close();
	} else {
		contactWin.show();
	}
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
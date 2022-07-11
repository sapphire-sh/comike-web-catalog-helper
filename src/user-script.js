// ==UserScript==
// @name         comike web catalog helper
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://raw.githubusercontent.com/sapphire-sh/comike-web-catalog-helper/main/src/user-script.js
// @updateURL    https://raw.githubusercontent.com/sapphire-sh/comike-web-catalog-helper/main/src/user-script.js
// @version      1
// @description  comike web catalog helper
// @match        https://webcatalog.circle.ms/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const wait = async () => {
	while (true) {
		const el = document.querySelector('.t-user-favorites');
		if (!(el instanceof HTMLElement)) {
			await sleep(1000);

			continue;
		}

		if (el.style.display === 'none') {
			await sleep(1000);

			continue;
		}

		return;
	}
};

const main = async () => {
	await wait();

	const elements = document.querySelectorAll('.webcatalog-circle-list-detail');
	for (const element of elements) {
		const circleNameEl = element.querySelector('.infotable-circlename');
		const circleName = circleNameEl.textContent.trim();

		const res = await fetch(`http://localhost:8081/api/circles/${circleName}`);
		const data = await res.text();

		const circle = JSON.parse(data);

		const artistNameEl = document.createElement('p');
		artistNameEl.innerHTML = circle.artistName;

		circleNameEl.appendChild(artistNameEl);
	}
};

main();

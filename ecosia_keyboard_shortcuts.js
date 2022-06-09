const moveDownKey = "j";
const moveUpKey = "k";
const extraScroll = 30;
const borderColor = "blue";

const results = document.querySelectorAll(".web-result, .layout-card, .card-web .result");
let selected = -1;

const isChrome = typeof(browser) === "undefined";

const moveSelection = function(moveBy) {
	const updated = selected + moveBy;
	if (updated >= 0 && updated < results.length) {
		if (selected != -1) {
			results[selected].style.border = "none";
		}
		selected = updated;
		results[selected].style.border = "1px solid " + borderColor;
		if (!isChrome) {
			results[selected].querySelector("a").focus();
		}

		const bounding = results[selected].getBoundingClientRect();
		if (bounding.top < 0) {
			results[selected].scrollIntoView();
			window.scrollBy(0, -extraScroll);
		} else if (bounding.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
			results[selected].scrollIntoView(false);
			window.scrollBy(0, extraScroll);
		}
	}
}

document.addEventListener("keydown", e => {
	if (e.target.tagName.toLowerCase() !== "input") {
		if (e.key == moveDownKey) {
			moveSelection(1);
		} else if (e.key == moveUpKey) {
			moveSelection(-1);
		} else if (isChrome) {
			if (e.key == "Enter") {
				if (!e.ctrlKey) {
					results[selected].querySelector("a").click();
				} else {
					results[selected].querySelector("a").dispatchEvent(new MouseEvent("click", {ctrlKey: true}));
				}
			}
		}
	}
});

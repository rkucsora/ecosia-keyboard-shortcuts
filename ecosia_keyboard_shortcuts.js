const moveDownKey = "j";
const moveUpKey = "k";
const searchKey = "?";
const exitSearchKey = "Escape";
const extraScroll = 30;
const borderColor = "blue";

const results = document.querySelectorAll(".web-result, .layout-card, .card-web .result");
const search = document.querySelector(".search-form__input");
let selected = -1;

const isChrome = typeof(browser) === "undefined";

const moveSelectionTo = function(updated) {
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
			moveSelectionTo(selected + 1);
		} else if (e.key == moveUpKey) {
			moveSelectionTo(selected - 1);
		} else if (!isNaN(e.key)) {
			if (e.key == 0) {
				moveSelectionTo(9);
			} else {
				moveSelectionTo(e.key - 1)
			}
		} else if (e.key == searchKey) {
			e.preventDefault();
			let startSelection = search.value.length;
			if (e.ctrlKey) {
				startSelection = 0;
			}
			search.focus();
			search.setSelectionRange(startSelection, search.value.length);
		} else if (isChrome) {
			if (e.key == "Enter") {
				if (!e.ctrlKey) {
					results[selected].querySelector("a").click();
				} else {
					results[selected].querySelector("a").dispatchEvent(new MouseEvent("click", {ctrlKey: true}));
				}
			}
		}
	} else {
		if (e.key == exitSearchKey) {
			document.activeElement.blur();
		}
	}
});

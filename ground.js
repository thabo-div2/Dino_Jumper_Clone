import {
	getCustomProperty,
	incrementCustomProperty,
	setCustomProperty,
} from "./updateCustomProperty.js";

const groundEls = document.querySelectorAll("[data-ground]");

const SPEED = 0.05;

export const setupGround = () => {
	// makes the ground longer
	setCustomProperty(groundEls[0], "--left", 0);
	setCustomProperty(groundEls[1], "--left", 300);
};

export const updateGround = (delta, speedScale) => {
	groundEls.forEach((ground) => {
		//  print the ground
		incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1);

		// infinitely loop the ground
		if (getCustomProperty(ground, "--left") <= -300) {
			incrementCustomProperty(ground, "--left", 600);
		}
	});
};

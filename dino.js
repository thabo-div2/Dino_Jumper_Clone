import {
	incrementCustomProperty,
	getCustomProperty,
	setCustomProperty,
} from "./updateCustomProperty.js";

const dinoEl = document.querySelector("[data-dino]");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;

export const setupDino = () => {
	isJumping = false;
	dinoFrame = 0;
	currentFrameTime = 0;
	yVelocity = 0;
	setCustomProperty(dinoEl, "--bottom", 0);
	document.removeEventListener("keydown", onJump);
	document.addEventListener("keydown", onJump);
};

export const updateDino = (delta, speedScale) => {
	handleRun(delta, speedScale);
	handleJump(delta);
};

export const getDinoRects = () => {
	return dinoEl.getBoundingClientRect();
};

export const setDinoLose = () => {
	dinoEl.src = "./images/dino-lose.png";
};

const handleRun = (delta, speedScale) => {
	if (isJumping) {
		// checks if the dinosaur is running
		dinoEl.src = "./images/dino-stationary.png";
		return;
	}

	if (currentFrameTime >= FRAME_TIME) {
		//  updates the frame
		// switches between the two running images
		dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
		dinoEl.src = `./images/dino-run-${dinoFrame}.png`;
		currentFrameTime -= FRAME_TIME;
	}
	currentFrameTime += delta * speedScale;
};

const handleJump = (delta) => {
	if (!isJumping) return;

	incrementCustomProperty(dinoEl, "--bottom", yVelocity * delta);

	// dinosaur cannot get lower than 0 or cant jump down
	if (getCustomProperty(dinoEl, "--bottom") <= 0) {
		setCustomProperty(dinoEl, "--bottom", 0);
		isJumping = false;
	}

	yVelocity -= GRAVITY * delta;
};

const onJump = (e) => {
	if (e.code !== "Space" || isJumping) return;
	yVelocity = JUMP_SPEED;
	isJumping = true;
};

import { updateGround, setupGround } from "./ground.js";
import { updateDino, setupDino, getDinoRects, setDinoLose } from "./dino.js";
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js";

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const worldEl = document.querySelector("[data-world]");
const startScreen = document.querySelector(".startScreen");
const scoreEl = document.querySelector(".score");
// setupGround();

const setPixelToWorldScale = () => {
	let worldToPixelScale;
	if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
		worldToPixelScale = window.innerWidth / WORLD_WIDTH;
	} else {
		worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
	}

	worldEl.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
	worldEl.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
};

let lastTime;
let speedScale;
let score;
const update = (time) => {
	if (lastTime == null) {
		lastTime = time;
		window.requestAnimationFrame(update);
		return;
	}
	const delta = time - lastTime;
	updateGround(delta, speedScale);
	updateDino(delta, speedScale);
	updateCactus(delta, speedScale);
	updateSpeedScale(delta);
	updateScore(delta);
	if (checkLoss()) {
		return handleLose();
	}
	lastTime = time;
	window.requestAnimationFrame(update, speedScale);
};

const checkLoss = () => {
	const dinoRect = getDinoRects();
	return getCactusRects().some((rect) => {
		return isCollision(rect, dinoRect);
	});
};

const isCollision = (cactus, dino) => {
	return (
		cactus.left < dino.right &&
		cactus.top < dino.bottom &&
		cactus.right > dino.left &&
		cactus.bottom > dino.top
	);
};

const updateSpeedScale = (delta) => {
	speedScale += delta * SPEED_SCALE_INCREASE;
};

const updateScore = (delta) => {
	score += delta * 0.01;
	scoreEl.innerText = `${Math.floor(score)}`;
};

const handleStart = () => {
	lastTime = null;
	score = 0;
	speedScale = 1;
	setupGround();
	setupDino();
	setupCactus();
	window.requestAnimationFrame(update);
	startScreen.classList.add("hide");
};

const handleLose = () => {
	setDinoLose();
	setTimeout(() => {
		document.addEventListener("keydown", handleStart, { once: true });
		startScreen.classList.remove("hide");
	}, 100);
};

document.addEventListener("keydown", handleStart, { once: true });

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);

export const getCustomProperty = (element, prop) => {
	return parseFloat(getComputedStyle(element).getPropertyValue(prop)) || 0;
};

export const setCustomProperty = (element, prop, value) => {
	element.style.setProperty(prop, value);
};

export const incrementCustomProperty = (element, prop, inc) => {
	setCustomProperty(element, prop, getCustomProperty(element, prop) + inc);
};

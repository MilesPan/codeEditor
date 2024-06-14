export function randomRgb() {
  return (
    '#' +
    hslToRgb(Math.random() * 360, 0.5 + Math.random() * 0.3, 0.35 + Math.random() * 0.3)
      .map(x => x.toString(16))
      .join('')
  );
}

export function hslToRgb(hue: number, saturation: number, lightness: number) {
  // based on algorithm from http://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
  if (hue == undefined) {
    return [0, 0, 0];
  }

  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  let huePrime = hue / 60;
  const secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

  huePrime = Math.floor(huePrime);
  let red = chroma;
  let green = secondComponent;
  let blue = 0;

  if (huePrime === 1) {
    red = secondComponent;
    green = chroma;
    blue = 0;
  } else if (huePrime === 2) {
    red = 0;
    green = chroma;
    blue = secondComponent;
  } else if (huePrime === 3) {
    red = 0;
    green = secondComponent;
    blue = chroma;
  } else if (huePrime === 4) {
    red = secondComponent;
    green = 0;
    blue = chroma;
  } else if (huePrime === 5) {
    red = chroma;
    green = 0;
    blue = secondComponent;
  }

  const lightnessAdjustment = lightness - chroma / 2;
  red += lightnessAdjustment;
  green += lightnessAdjustment;
  blue += lightnessAdjustment;

  return [Math.abs(Math.round(red * 255)), Math.abs(Math.round(green * 255)), Math.abs(Math.round(blue * 255))];
}

export const randomId = () => Math.random().toString(36).substr(2).toUpperCase()

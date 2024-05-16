import imgError from "images/critical/error-bg.svg";
import imgNoImage from "images/critical/no-image.svg";

export const preloadedImages = [
  imgError, 
  imgNoImage
];

export function loadCriticalImages() {
  preloadedImages.forEach(image => {new Image().src = image});
} 

import PropTypes from "prop-types";

/**
 * Handles cross-browser smooth scrolling with given duration.
 * @param {number} targetOffset Offset where to scroll.
 * @param {number} duration Scroll duration in ms.
 */
export const smoothScroll = (duration, scrollOffset) => {
  const startPosition = document.documentElement.scrollTop;
  const targetPosition = scrollOffset;

  const distance = targetPosition - startPosition;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) {
      start = timestamp;
    }
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }

  function easeInOutCubic(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t + 2) + b;
  };
}

smoothScroll.PropTypes = {
  targetOffset: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
}

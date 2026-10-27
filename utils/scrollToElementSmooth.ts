
type SmoothScrollOptions = {
  delay?: number;
  offset?: number;
  duration?: number;
  maxAttempts?: number;
  retryDelay?: number;
};

export function scrollToElementSmooth(
  elementId: string,
  {
    delay = 300,
    offset = 24,
    duration = 1100,
    maxAttempts = 20,
    retryDelay = 100,
  }: SmoothScrollOptions = {},
) {
  let timeoutId: number | undefined;
  let animationFrameId: number | undefined;
  let attempts = 0;
  let cancelled = false;

  const findTarget = () => {
    if (cancelled) return;

    const element = document.getElementById(elementId);

    if (!element) {
      attempts += 1;

      if (attempts < maxAttempts) {
        timeoutId = window.setTimeout(
          findTarget,
          retryDelay,
        );
      }

      return;
    }

    const startY = window.scrollY;
    const targetY =
      element.getBoundingClientRect().top +
      window.scrollY -
      offset;

    const distance = targetY - startY;

    if (Math.abs(distance) < 2) return;

    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (cancelled) return;

      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Décélération progressive : départ fluide, arrivée douce.
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(
        0,
        startY + distance * easedProgress,
      );

      if (progress < 1) {
        animationFrameId =
          window.requestAnimationFrame(animate);
      }
    };

    animationFrameId =
      window.requestAnimationFrame(animate);
  };

  timeoutId = window.setTimeout(findTarget, delay);

  // Fonction de nettoyage utilisable dans un useEffect.
  return () => {
    cancelled = true;

    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId);
    }

    if (animationFrameId !== undefined) {
      window.cancelAnimationFrame(animationFrameId);
    }
  };
}

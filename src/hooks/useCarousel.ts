import { numberWithinRange } from "@/lib/betweenFuncs";
import UseEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";

const TWEEN_FACTOR = 4;

export const useCarousel = () => {
  const [emblaRef, api] = UseEmblaCarousel({ loop: true });
  const [tweenValues, setTweenValues] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);

  const onScroll = useCallback(() => {
    if (!api) return;

    const engine = api.internalEngine();
    const scrollProgress = api.scrollProgress();

    const styles = api.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR);
      return numberWithinRange(tweenValue, 0, 1);
    });
    setTweenValues(styles);
  }, [api, setTweenValues]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    onScroll();
    api.on("scroll", () => {
      flushSync(() => onScroll());
    });
    api.on("reInit", onScroll);
  }, [api]);

  return {
    api,
    current,
    emblaRef,
    tweenValues,
  };
};

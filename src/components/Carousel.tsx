import TweetCard from "./TweetCard";
import tweetsData from "@/data/tweetsData.json";
import { useCallback } from "react";
import { CaretLeft, CaretRigth } from "./icons/Carets";
import { useCarousel } from "@/hooks/useCarousel";
import { adjustTween } from "@/lib/betweenFuncs";
import { Button } from "./ui/button";
import { useTemplate } from "@/context/useTemplate";
import { useSelectedCountries } from "@/context/useSelectedCountries";
import { toast } from "sonner";

const TweetCarousel = () => {
  const { api, current, emblaRef, tweenValues } = useCarousel();

  const { setFormat } = useTemplate();
  const { setSelectedCountries } = useSelectedCountries();

  const onPrevButtonClick = useCallback(() => {
    if (!api) return;
    api.scrollPrev();
  }, [api]);

  const onNextButtonClick = useCallback(() => {
    if (!api) return;
    api.scrollNext();
  }, [api]);

  return (
    <div className="space-y-4 py-8">
      <div ref={emblaRef} className="relative overflow-hidden px-[200px]">
        <div className="flex">
          {tweetsData.map((data, index) => {
            return (
              <div
                key={index}
                className="basis-1/3"
                style={{
                  ...(tweenValues.length && {
                    opacity: adjustTween(tweenValues[index]),
                  }),
                  zIndex: current - 1 === index ? 100 : 0,
                }}
              >
                <TweetCard
                  countries={data.countries}
                  date={data.date}
                  format={data.format}
                  includeDate={data.includeDate}
                  name={`${data.name} ${index}`}
                  ppImage={data.ppImage}
                  text={data.text}
                  username={data.username}
                  verified={data.verified}
                  style={{
                    ...(tweenValues.length && {
                      scale: `${Math.max(0.9, tweenValues[index])}`,
                    }),
                  }}
                />
              </div>
            );
          })}
        </div>
        <button
          className="absolute left-[50%] top-[30%] translate-x-[calc(-50%-260px)] text-8xl font-bold"
          onClick={onPrevButtonClick}
        >
          <CaretLeft />
        </button>
        <button
          className="absolute left-[50%] top-[30%] translate-x-[calc(-50%+260px)] text-8xl font-bold"
          onClick={onNextButtonClick}
        >
          <CaretRigth />
        </button>
      </div>
      <div className="flex justify-center">
        <Button
          variant={"outline"}
          className="w-[400px] font-medium"
          onClick={() => {
            const currentConfig = tweetsData[current - 1];
            setFormat(currentConfig.format);
            setSelectedCountries(() => currentConfig.countries);
            window.scrollTo({ top: 0, behavior: "smooth" });
            toast.success("Set example template succesfully");
          }}
        >
          Use Template
        </Button>
      </div>
    </div>
  );
};

export default TweetCarousel;

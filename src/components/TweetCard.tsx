import ThreeDots from "./icons/threeDots";
import Verified from "./icons/Verified";
import Comment from "./icons/Comment";
import Retweet from "./icons/Retweet";
import Heart from "./icons/Heart";
import Save from "./icons/Save";
import Share from "./icons/Share";
import TweetCardResult from "./TweetCardResult";
import type { Country } from "@/types/timezone";
import clsx from "clsx";
import type { CSSProperties } from "react";

type Props = {
  countries: Country[];
  date: string;
  includeDate: boolean;
  name: string;
  ppImage: string;
  text: string;
  username: string;
  verified: boolean;
  inactive?: boolean;
  style?: CSSProperties;
  format: string;
};

const TweetCard = ({
  countries,
  date,
  includeDate,
  name,
  ppImage,
  text,
  username,
  verified,
  inactive = false,
  style,
  format,
}: Props) => {
  return (
    <div
      className={clsx(
        inactive && "grid items-center",
        "relative -z-10 inline-block",
      )}
      style={style}
    >
      <div
        className={clsx(
          "w-[400px] min-w-[400px] rounded-md border border-zinc-300 bg-white p-5",
          inactive && "scale-95 opacity-75",
        )}
      >
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <picture>
              <img
                className="size-10 overflow-hidden rounded-full"
                src={ppImage}
                alt="user profile picture"
              />
            </picture>
            <div className="flex flex-col [&_span]:leading-none">
              <div className="flex items-center gap-1">
                <span>{name}</span>
                {verified && <Verified />}
              </div>
              <span className="mt-1 text-sm text-zinc-500">{username}</span>
            </div>
          </div>
          <div className="text-xl">
            <ThreeDots />
          </div>
        </header>
        <main className="my-2 p-3">
          <p className="[&_span]:block [&_span]:pb-2">
            {text.split("\n").map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </p>
          <TweetCardResult
            tweetDate={{
              date: new Date(date).toDateString(),
              includeDate,
            }}
            tweetCountries={countries}
            tweetFormat={format}
          />
        </main>
        <footer className="flex justify-around border-t border-zinc-300 pt-4 text-lg text-zinc-500">
          <Comment />
          <Retweet />
          <Heart />
          <Save />
          <Share />
        </footer>
      </div>
    </div>
  );
};

export default TweetCard;

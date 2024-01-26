interface Props {
  emoji: string[];
  time: string;
}

const ResultLine = ({ emoji, time }: Props) => {
  return (
    <p className="whitespace-nowrap">
      <span>{time} </span>
      <span className="font-emoji">{emoji}</span>
    </p>
  );
};

export default ResultLine;

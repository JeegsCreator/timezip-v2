import { useDate } from "@/context/useDate";
import { Switch } from "./ui/switch";

const includeDateSwitch = () => {
  const { includeDate, setIncludeDate } = useDate();

  return (
    <Switch
      checked={includeDate}
      onCheckedChange={(value) => setIncludeDate(value)}
    />
  );
};

export default includeDateSwitch;

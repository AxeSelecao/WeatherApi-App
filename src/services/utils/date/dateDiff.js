import { useSelector } from "react-redux";
import dateNow from "./dateNow";

export default function dateDiff() {
  const date = useSelector((state) => state.weather.date);
  if (+Date.parse(dateNow()) - +Date.parse(date) == 0) {
    return 1;
  } else if (+Date.parse(dateNow()) - +Date.parse(date) == -86400000) {
    return 2;
  } else if (+Date.parse(dateNow()) - +Date.parse(date) == -172800000) {
    return 3;
  }
}

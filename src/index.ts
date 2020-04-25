import moment from "moment";

// types
import { GraphPoint } from "./types";

import dataJSON from "./data/data.json";

const getPoints = (start_date: string, end_date: string): GraphPoint[] => {
  const { data } = dataJSON;
  if (!data || data.length === 0) return [];

  const res = data
    .filter(({ slug }) => slug === "aggregation-overall")
    .reduce((acc, { details }) => {
      const se = details
        .filter(({ key }) => key === "score")
        .reduce((acc2, { series }) => {
          if (Array.isArray(series)) return [...acc2, ...series];
          return acc2;
        }, [])

      return [...acc, ...se];
    }, [])
    .filter(({ x }) => moment(x).isBetween(start_date, end_date, null, "[]"));

  return res;
};

export default getPoints;

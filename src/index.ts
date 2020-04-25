import moment from "moment";

// types
import { GraphPoint } from "./types";

import dataJSON from "./data/data.json";

const getPoints = (start_date: string, end_date: string): GraphPoint[] => {
  const { data } = dataJSON;
  if (!data || data.length === 0) return [];

  const res: GraphPoint[] = [];

  data
    .filter(({ slug }) => slug === "aggregation-overall")
    .forEach((el) => {
      el.details
        .filter(({ key }) => key === "score")
        .forEach(({ series }) => {
          if (Array.isArray(series)) {
            for (let i = 0; i < series.length; i++) {
              const isMatch = moment(series[i].x).isBetween(start_date, end_date, "milliseconds", "[]");

              if (isMatch) {
                res.push(series[i]);
              }
            }
          }
        });
    });

  return res;
};

export default getPoints;

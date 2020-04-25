import moment from "moment";

// types
import { GraphPoint, GraphExtraPoint } from "./types";

// data
import dataJSON from "./data/data.json";

/**
 * getPoints
 * description: return all score points between 2 dates
 *
 * @param {string} start_date
 * @param {string} end_date
 * @returns {GraphPoint[]}
 */
export const getPoints = (start_date: string, end_date: string): GraphPoint[] => {
  const { data } = dataJSON;
  if (!data || data.length === 0) return [];

  if (!start_date || !end_date) return [];

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

/**
 * getPointsExtra
 * description: return all score points between 2 dates with extra info
 *
 * @param {string} start_date
 * @param {string} end_date
 * @returns {GraphExtraPoint[]}
 */
export const getPointsExtra = (start_date: string, end_date: string): GraphExtraPoint[] => {
  const { data } = dataJSON;
  if (!data || data.length === 0) return [];

  const points = getPoints(start_date, end_date);
  if (points.length === 0) return [];

  const res: GraphExtraPoint[] = [];

  data
    .filter(({ slug }) => slug === "aggregation-overall")
    .forEach((el) => {
      el.details
        .filter(({ key }) => key === "extra")
        .forEach(({ series }) => {
          if (Array.isArray(series)) {
            for (let i = 0; i < series.length; i++) {
              points.find((p) => {
                if (moment(p.x).isSame(series[i].x)) {
                  res.push({
                    extra: series[i].y,
                    y: p.y,
                    x: series[i].x,
                  });
                }
              });
            }
          }
        });
    });

  return res;
};

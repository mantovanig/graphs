// types
import { GraphPoint, GraphExtraPoint } from "./types";

// data
import dataJSON from "./data/data.json";

const sortByDate = (scores: GraphPoint[]): GraphPoint[] => {
  return scores.sort((a, b) => {
    const aDate = new Date(a.x);
    const bDate = new Date(b.x);

    if (aDate.getTime() < bDate.getTime()) {
      return -1;
    }

    if (aDate.getTime() > bDate.getTime()) {
      return 1;
    }

    return 0;
  });
};

const searchByDate = (scores: GraphPoint[], date: Date): number => {
  const binarySearch = (data: any[], target: Date, startIndex: number, endIndex: number) => {
    const m = Math.floor((startIndex + endIndex) / 2);

    const middleTime = new Date(data[m].x).getTime();

    if (target.getTime() == middleTime) return m;

    const be = endIndex - 1;
    if (be === startIndex) {
      const startIndexTime = new Date(data[startIndex].x).getTime();
      const endIndexTime = new Date(data[endIndex].x).getTime();
      const targetTime = target.getTime();
      const startDiff = startIndexTime - targetTime;
      const endDiff = endIndexTime - targetTime;

      return Math.abs(startDiff) > endDiff ? endIndex : startIndex;
    }
      

    if (target.getTime() > middleTime) return binarySearch(data, target, m, endIndex);

    if (target.getTime() < middleTime) return binarySearch(data, target, startIndex, m);
  };

  return binarySearch(scores, date, 0, scores.length - 1);
};

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

  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  if (!startDate.getTime() || !endDate.getTime()) return [];

  const res: GraphPoint[] = [];

  // get scores by slug
  const scores = data.find((d) => d.slug === "aggregation-overall")?.details.find((d) => d.key === "score")?.series;

  if (scores && scores.length > 0) {
    // order scores by asc date
    const scoresSorted = sortByDate(scores);

    // search closest start_date index
    const startDateIndex = searchByDate(scoresSorted, startDate);
    if (startDateIndex === -1) return [];

    // search closest end_date index
    const endDateIndex = searchByDate(scoresSorted, endDate);
    if (endDateIndex === -1) return [];

    // loop until end_date and save scores
    const slicedScores = scoresSorted.slice(startDateIndex, endDateIndex + 1);
    for (let i = 0; i < slicedScores.length; i++) {
      const isMatch = new Date(slicedScores[i].x).getTime() <= endDate.getTime();

      if (isMatch) {
        res.push(slicedScores[i]);
      } else {
        break;
      }
    }
  }

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

  // get scores points
  const points = getPoints(start_date, end_date);
  if (points.length === 0) return [];

  // get extra by slug
  const scores = data.find((d) => d.slug === "aggregation-overall")?.details.find((d) => d.key === "extra")?.series;

  const res: GraphExtraPoint[] = [];

  if (scores && scores.length > 0) {
    for (let i = 0; i < scores.length; i++) {
      points.find((p) => {
        if (new Date(p.x).getTime() === new Date(scores[i].x).getTime()) {
          res.push({
            extra: scores[i].y,
            y: p.y,
            x: scores[i].x,
          });
        }
      });
    }
  }

  return res;
};

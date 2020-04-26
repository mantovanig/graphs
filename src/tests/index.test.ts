// Index tests
import { getPoints, getPointsExtra } from "../index";

test("test suite", () => {
  expect(true).toBe(true);
});

test("sample test", () => {
  const res = getPoints("2015-08-19T14:00:19.352000Z", "2015-10-12T07:27:47.493000Z");

  const expectedResult = [
    { y: 282, x: "2015-08-19T14:00:19.352000Z" },
    { y: 227, x: "2015-10-08T14:45:31.991000Z" },
    { y: 185, x: "2015-10-12T07:27:47.493000Z" },
  ];

  expect(res).toEqual(expectedResult);
});

test("middle period", () => {
  const res = getPoints("2017-01-17T13:25:44.678229Z", "2017-01-17T13:30:14.085793Z");

  const expectedResult = [
    {
      y: 58,
      x: "2017-01-17T13:25:44.678229Z",
    },
    {
      y: 58,
      x: "2017-01-17T13:27:26.587358Z",
    },
    {
      y: 58,
      x: "2017-01-17T13:28:00.839484Z",
    },
    {
      y: 58,
      x: "2017-01-17T13:30:14.044621Z",
    },
    {
      y: 58,
      x: "2017-01-17T13:30:14.085793Z",
    },
  ];

  expect(res).toEqual(expectedResult);
});

test("start_date not in the series", () => {
  const res = getPoints("2017-01-17T13:26:44.678229Z", "2017-01-17T13:30:14.085793Z");

  const expectedResult = [
    {
      y: 58,
      x: "2017-01-17T13:27:26.587358Z",
    },
    {
      y: 58,
      x: "2017-01-17T13:28:00.839484Z",
    },
    {
      y: 58,
      x: "2017-01-17T13:30:14.044621Z",
    },
    {
      y: 58,
      x: "2017-01-17T13:30:14.085793Z",
    },
  ];

  expect(res).toEqual(expectedResult);
});

test("start_date and end_date not in the series", () => {
  const res = getPoints("2017-01-17T13:26:44.678229Z", "2017-01-17T13:29:14.085793Z");

  const expectedResult = [
    {
      y: 58,
      x: "2017-01-17T13:27:26.587358Z",
    },
    {
      y: 58,
      x: "2017-01-17T13:28:00.839484Z",
    }
  ];

  expect(res).toEqual(expectedResult);
});

test("equals date", () => {
  const res = getPoints("2015-08-19T14:00:19.352000Z", "2015-08-19T14:00:19.352000Z");

  const expectedResult = [{ y: 282, x: "2015-08-19T14:00:19.352000Z" }];

  expect(res).toEqual(expectedResult);
});

test("no results", () => {
  const res = getPoints("1950-08-19T14:00:19.352000Z", "1950-08-19T14:00:19.352000Z");

  expect(res).toEqual([]);
});

test("invalid start_date", () => {
  const res = getPoints("", "2015-10-12T07:27:47.493000Z");

  expect(res).toEqual([]);
});

test("invalid end_date", () => {
  const res = getPoints("2015-08-19T14:00:19.352000Z", "");

  expect(res).toEqual([]);
});

test("points with extra", () => {
  const res = getPointsExtra("2015-08-19T14:00:19.352000Z", "2015-10-12T07:27:47.493000Z");

  const expectedResult = [
    {
      y: 282,
      x: "2015-08-19T14:00:19.352000Z",
      extra: {
        quiz_session_type: "Study",
        priority: 282,
        // tslint:disable-next-line
        score_delta: null,
        quiz_session: 6775,
        quiz_config: 226,
        quiz_config_title: "Platform Reference for AWS",
      },
    },
    {
      y: 227,
      x: "2015-10-08T14:45:31.991000Z",
      extra: {
        quiz_session_type: "Study",
        priority: 55,
        score_delta: -55,
        quiz_session: 19037,
        quiz_config: 226,
        quiz_config_title: "Platform Reference for AWS",
      },
    },
    {
      y: 185,
      x: "2015-10-12T07:27:47.493000Z",
      extra: {
        quiz_session_type: "Study",
        priority: 42,
        score_delta: -42,
        quiz_session: 19337,
        quiz_config: 226,
        quiz_config_title: "Platform Reference for AWS",
      },
    },
  ];

  expect(res).toEqual(expectedResult);
});

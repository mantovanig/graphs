// Index tests
import getPoints from '../index';

test("initial test", () => {
  expect(true).toBe(true);
});

test("sample test", () => {
  const res = getPoints("2015-08-19T14:00:19.352000Z", "2015-10-12T07:27:47.493000Z");

  const expectedResult = {
    results: [
      { Y: 282, x: "2015-08-19T14:00:19.352000Z" },
      { Y: 227, x: "2015-10-08T14:45:31.991000Z" },
      { Y: 185, x: "2015-10-12T07:27:47.493000Z" },
    ],
  };

  expect(res).toEqual(JSON.stringify(expectedResult));
});

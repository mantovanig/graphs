// Index tests
import getPoints from "../index";

test("initial test", () => {
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

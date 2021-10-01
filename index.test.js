const { hecele } = require("./index");

test("merhaba", () => {
  expect(hecele("merhaba")).toEqual(["mer", "ha", "ba"]);
});

test("tren", () => {
  expect(hecele("tren")).toEqual(["tren"]);
});

test("yayınevi", () => {
  expect(hecele("yayınevi")).toEqual(["ya", "yı", "ne", "vi"]);
});

test("hanımeli", () => {
  expect(hecele("hanımeli")).toEqual(["ha", "nı", "me", "li"]);
});

test("long text", () => {
  expect(hecele("merhaba arkadaşlar naber")).toEqual([
    ["mer", "ha", "ba"],
    ["ar", "ka", "daş", "lar"],
    ["na", "ber"],
  ]);
});

test("long text 2", () => {
  expect(hecele(["yoğurt", "metal"])).toEqual([
    ["yo", "ğurt"],
    ["me", "tal"],
  ]);
});

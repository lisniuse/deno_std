// Copyright 2018-2019 the Deno authors. All rights reserved. MIT license.
import { test } from "../testing/mod.ts";
import { assert, assertEquals } from "../testing/asserts.ts";
import * as datetime from "./mod.ts";

test(function parseDateTime() {
  assertEquals(
    datetime.parseDateTime("01-03-2019 16:34", "mm-dd-yyyy hh:mm"),
    new Date(2019, 1, 3, 16, 34)
  );
  assertEquals(
    datetime.parseDateTime("03-01-2019 16:34", "dd-mm-yyyy hh:mm"),
    new Date(2019, 1, 3, 16, 34)
  );
  assertEquals(
    datetime.parseDateTime("2019-01-03 16:34", "yyyy-mm-dd hh:mm"),
    new Date(2019, 1, 3, 16, 34)
  );
  assertEquals(
    datetime.parseDateTime("16:34 01-03-2019", "hh:mm mm-dd-yyyy"),
    new Date(2019, 1, 3, 16, 34)
  );
  assertEquals(
    datetime.parseDateTime("16:34 03-01-2019", "hh:mm dd-mm-yyyy"),
    new Date(2019, 1, 3, 16, 34)
  );
  assertEquals(
    datetime.parseDateTime("16:34 2019-01-03", "hh:mm yyyy-mm-dd"),
    new Date(2019, 1, 3, 16, 34)
  );
});

test(function invalidParseDateTimeFormatThrows() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (datetime as any).parseDateTime("2019-01-01 00:00", "x-y-z");
    assert(false, "no exception was thrown");
  } catch (e) {
    assertEquals(e.message, "Invalid datetime format!");
  }
});

test(function parseDate() {
  assertEquals(
    datetime.parseDate("01-03-2019", "mm-dd-yyyy"),
    new Date(2019, 1, 3)
  );
  assertEquals(
    datetime.parseDate("03-01-2019", "dd-mm-yyyy"),
    new Date(2019, 1, 3)
  );
  assertEquals(
    datetime.parseDate("2019-01-03", "yyyy-mm-dd"),
    new Date(2019, 1, 3)
  );
});

test(function invalidParseDateFormatThrows() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (datetime as any).parseDate("2019-01-01", "x-y-z");
    assert(false, "no exception was thrown");
  } catch (e) {
    assertEquals(e.message, "Invalid date format!");
  }
});

test(function DayOfYear() {
  assertEquals(1, datetime.dayOfYear(new Date("2019-01-01T03:24:00")));
  assertEquals(70, datetime.dayOfYear(new Date("2019-03-11T03:24:00")));
  assertEquals(365, datetime.dayOfYear(new Date("2019-12-31T03:24:00")));
});

test(function currentDayOfYear() {
  assertEquals(datetime.currentDayOfYear(), datetime.dayOfYear(new Date()));
});

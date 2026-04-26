import { expect, test } from "vitest";
import { addNums } from '../src/index.mjs'

test('1 + 2 = 3', () => {
    expect(addNums(1, 2)).toBe(3)
})

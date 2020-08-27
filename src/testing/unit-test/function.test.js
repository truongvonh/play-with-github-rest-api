import { isValidURL, randomArrayItem } from '../../utils/helper';
import { ALL_COLORS } from '../../constants/static/color';
import { expect } from '@jest/globals';

describe('Testing all function', () => {
  test('Random item in array', () => {
    const colorRandom = randomArrayItem(ALL_COLORS);
    const noContainInArray = 'dangerous';
    expect(ALL_COLORS.includes(colorRandom)).toBeTruthy();
    expect(ALL_COLORS.includes(noContainInArray)).toBe(false);
  });

  test('String is valid url', () => {
    expect(isValidURL('http://google.com')).toBeTruthy();
    expect(isValidURL('http://google.com description')).toBe(false);
    expect(isValidURL('acbd')).toBe(false);
  });
});

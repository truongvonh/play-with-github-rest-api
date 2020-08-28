import puppeteer from 'puppeteer';
import { test } from '@jest/globals';
import axios from 'axios';
import { randomArrayItem, sleep } from './../utils/helper';

// const TEST_DOMAIN = 'http://localhost:3000';
const TEST_DOMAIN = 'https://fast-garden-23541.herokuapp.com/';
const KEY_WORD = 'golang';
const SELECTOR = {
  INPUT_ELM: '.ant-input',
  LIST_ELM: '.ant-list-item',
  META_TITLE: '.ant-list-item-meta-title',
  USER_NAME: '.user-name',
};
let browser = null;
let page = null;

describe('Test ', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 720,
    });
    jest.setTimeout(60000);
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    await page.goto(TEST_DOMAIN);
  });

  test('Check result with keyword', async () => {
    expect.assertions(2);
    try {
      const searchBox = await page.$(SELECTOR.INPUT_ELM);
      await searchBox.type(KEY_WORD);
      await sleep(5000);
      const searchResult = await page.$$(SELECTOR.LIST_ELM);
      expect(searchResult.length > 0).toBeTruthy();

      if (!searchResult.length) await browser.close();
      const searchText = await page.$$(SELECTOR.META_TITLE);
      const randomResult = randomArrayItem(searchText);
      const textRandom = await page.evaluate(
        (element) => element.textContent,
        randomResult
      );
      await page.goto(`${TEST_DOMAIN}/user/${textRandom}`);
      await sleep(5000);
      const userNameResult = await page.$$(SELECTOR.USER_NAME);
      const textResult = await page.evaluate(
        (element) => element.textContent,
        userNameResult[0]
      );
      const { data } = await axios.get(
        `https://api.github.com/users/${textRandom}`
      );
      expect(data.name).toBe(textResult);
    } catch (error) {
      console.log(error);
    }
  });
});

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { load } from 'cheerio';

@Injectable()
export class LeetcodeService {
  async getQuestions() {
    const html = await this.fetchProblem();
    return this.parseProblemHtml(html);
  }

  private parseProblemHtml(html: string) {
    const $ = load(html);

    const regex =
      /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/;
    const match = html.match(regex);
    console.log(JSON.parse(match[1]));
    return JSON.parse(match[1]);
  }
  private async fetchProblem() {
    const url = `https://leetcode.cn/problems/two-sum/description/`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch problem page. Error: ${error.message}`);
    }
  }
}

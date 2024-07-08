import { GetQuestionDto } from './dto/index';
import { FetchProblemsListRes } from '@Types/leetcode/index';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LeetcodeService {
  async getQuestions(getQuestionDto: GetQuestionDto) {
    const problemsListRes = await this.fetchProblems(getQuestionDto);
    return problemsListRes.list[0].leetcode.content;
  }
  // 获取问题列表
  private async fetchProblems(getQuestionDto: GetQuestionDto) {
    let url = 'https://codetop.cc/api/questions/';
    Object.keys(getQuestionDto).forEach((key) => {
      url += `?${key}=${getQuestionDto[key]}`;
    });
    try {
      const response = await axios.get<FetchProblemsListRes>(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch problem page. Error: ${error.message}`);
    }
  }

  async getHtml(slug: string) {
    const html = await this.fetchProblemHTML(slug);
    return this.parseProblemHtml(html);
  }

  // 将问题页面的问题转换成前端数据
  private parseProblemHtml(html: string) {
    const regex =
      /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/;
    const match = html.match(regex);
    return JSON.parse(match[1]);
  }

  // 请求问题页面内容
  private async fetchProblemHTML(slug: string) {
    const url = `https://leetcode.cn/problems/${slug}/description/`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch problem page. Error: ${error.message}`);
    }
  }
}

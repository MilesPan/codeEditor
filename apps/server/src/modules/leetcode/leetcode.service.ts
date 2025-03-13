import { GetQuesionCommentsDto, GetQuestionDto } from './dto/index';
import {
  FetchCTProblemsListRes,
  LC,
  Level,
  ProblemItemType,
} from '@Types/leetcode/index';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class LeetcodeService {
  constructor(private readonly httpService: HttpService) {}
  async getQuestions(getQuestionDto: GetQuestionDto) {
    const problemsListRes = await this.fetchProblems(getQuestionDto);
    const res = await this.transformProblems(problemsListRes);
    return res;
  }
  // 获取评论
  async getQuestionComment(getQuestionCommentDto: GetQuesionCommentsDto) {
    const { data } = await firstValueFrom(
      this.httpService
        .request({
          url: 'https://leetcode.cn/graphql/',
          data: {
            query:
              'query questionDiscussComments($topicId: Int!, $orderBy: CommentOrderBy, $skip: Int!, $numPerPage: Int = 10) {commonTopicComments(topicId: $topicId orderBy: $orderBy skip: $skip first: $numPerPage ) { edges {   node {     ...commentFields   } } totalNum }}  fragment commentFields on CommentRelayNode { id ipRegion numChildren isEdited post { id content voteUpCount creationDate updationDate status voteStatus isOwnPost author {   username   isDiscussAdmin   isDiscussStaff   profile {     userSlug     userAvatar     realName   } } mentionedUsers {   key   username   userSlug   nickName } }} ',
            variables: {
              topicId: getQuestionCommentDto.questionId,
              skip: getQuestionCommentDto.start || 0,
              numPerPage: getQuestionCommentDto.limit || 10,
              orderBy: 'HOT',
            },
            operationName: 'questionDiscussComments',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new Error(error.message);
          }),
        ),
    );
    return data;
    // https://leetcode.cn/graphql/', {
    //   query:
    //     'query questionDiscussComments($topicId: Int!, $orderBy: CommentOrderBy, $skip: Int!, $numPerPage: Int = 10) {commonTopicComments(topicId: $topicId orderBy: $orderBy skip: $skip first: $numPerPage ) { edges {   node {     ...commentFields   } } totalNum }}  fragment commentFields on CommentRelayNode { id ipRegion numChildren isEdited post { id content voteUpCount creationDate updationDate status voteStatus isOwnPost author {   username   isDiscussAdmin   isDiscussStaff   profile {     userSlug     userAvatar     realName   } } mentionedUsers {   key   username   userSlug   nickName } }} ',
    //   variables: {
    //     topicId: 1065,
    //     skip: 0,
    //     numPerPage: 10,
    //     orderBy: 'HOT',
    //   },
    //   operationName: 'questionDiscussComments',
    // })
    // .pipe(
    //   catchError((error: AxiosError) => {
    //     console.log(error);
    //     throw new Error(error.message);
    //   }),
    // );
  }
  // 将codeTop中获取到的slug再去请求leetcode网页从而获取更多信息
  async transformProblems(problemList: FetchCTProblemsListRes) {
    const htmls = await Promise.all(
      problemList.list.map((problem) =>
        this.getHtml(problem.leetcode.slug_title),
      ),
    );
    const list: ProblemItemType[] = htmls.map((html) => {
      return {
        title:
          html?.props?.pageProps?.dehydratedState?.queries?.[1]?.state?.data
            ?.question?.translatedTitle,
        content:
          html?.props?.pageProps?.dehydratedState?.queries?.[1]?.state?.data
            ?.question?.translatedContent,
        frontend_question_id:
          html?.props?.pageProps?.dehydratedState?.queries?.[1]?.state?.data
            ?.question?.questionFrontendId,
        tags:
          html?.props?.pageProps?.dehydratedState?.queries?.[1]?.state?.data
            ?.question?.topicTags || [],
        testCase: {
          metaData: JSON.parse(
            html?.props?.pageProps?.dehydratedState?.queries?.[1]?.state?.data
              ?.question.metaData,
          ),
          exampleTestCases: JSON.parse(
            html?.props?.pageProps?.dehydratedState?.queries?.[1]?.state?.data
              ?.question.jsonExampleTestcases,
          ),
        },
        level: html?.props?.pageProps?.dehydratedState?.queries?.[1]?.state
          ?.data?.question?.difficulty as Level,
      };
    });
    return list;
  }
  // 获取问题列表
  private async fetchProblems(getQuestionDto: GetQuestionDto) {
    let url = 'https://codetop.cc/api/questions/';
    Object.keys(getQuestionDto).forEach((key) => {
      url += `?${key}=${getQuestionDto[key]}`;
    });
    // try {
    //   const response = await this.httpService.get<FetchCTProblemsListRes>(url);
    //   return response.data;
    // } catch (error) {
    //   throw new Error(`Failed to fetch problem page. Error: ${error.message}`);
    // }
    const { data } = await firstValueFrom(
      this.httpService.get<FetchCTProblemsListRes>(url).pipe(
        catchError((error: AxiosError) => {
          throw new Error(
            `Failed to fetch problem page. Error: ${error.message}`,
          );
        }),
      ),
    );
    return data;
  }

  async getHtml(slug: string) {
    const html = await this.fetchProblemHTML(slug);
    return this.parseProblemHtml(html);
  }

  // 将问题页面的问题转换成前端数据
  private parseProblemHtml(html: string): LC.ExampleGenerate {
    const regex =
      /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/;
    const match = html.match(regex);
    return JSON.parse(match[1]);
  }

  // 请求问题页面内容
  private async fetchProblemHTML(slug: string) {
    const url = `https://leetcode.cn/problems/${slug}/description/`;
    const { data } = await firstValueFrom(
      this.httpService.get<string>(url).pipe(
        catchError((error: AxiosError) => {
          throw new Error(
            `Failed to fetch problem page. Error: ${error.message}`,
          );
        }),
      ),
    );
    return data;
  }
}

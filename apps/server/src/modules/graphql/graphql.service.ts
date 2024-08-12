import { Injectable } from '@nestjs/common';
import {
  ApolloClient,
  gql,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import fetch from 'cross-fetch';

@Injectable()
export class GraphqlService {
  private readonly client: ApolloClient<NormalizedCacheObject>;
  constructor() {
    this.client = new ApolloClient({
      link: new HttpLink({
        uri: 'https://leetcode.cn/graphql/',
        fetch,
      }),
      cache: new InMemoryCache(),
    });
  }
  async getProblems() {
    const query = gql`
      query problemsetQuestionList(
        $categorySlug: String
        $limit: Int
        $skip: Int
        $filters: QuestionListFilterInput
      ) {
        problemsetQuestionList(
          categorySlug: $categorySlug
          limit: $limit
          skip: $skip
          filters: $filters
        ) {
          hasMore
          total
          questions {
            acRate
            difficulty
            freqBar
            frontendQuestionId
            isFavor
            paidOnly
            solutionNum
            status
            title
            titleCn
            titleSlug
            topicTags {
              name
              nameTranslated
              id
              slug
            }
            extra {
              hasVideoSolution
              topCompanyTags {
                imgUrl
                slug
                numSubscribed
              }
            }
          }
        }
      }
    `;
    const variables = {
      categorySlug: 'all-code-essentials',
      limit: 100,
      skip: 0,
      filters: {},
    };
    try {
      const { data } = await this.client.query({ query, variables });
      console.log(data);
      return data;
    } catch (error) {}
  }
}

import { Controller, Post } from '@nestjs/common';
import { GraphqlService } from './graphql.service';

@Controller('graphql')
export class GraphqlController {
  constructor(private readonly graphqlService: GraphqlService) {}
  @Post('problemList')
  getProblemList() {
    return this.graphqlService.getProblems();
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateCodeDto } from './run-code.dto';

export class UpdateCodeDto extends PartialType(CreateCodeDto) {}

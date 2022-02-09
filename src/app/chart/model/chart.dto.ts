import { ConnectionDto } from './connection.dto';
import { NodeDto } from './node.dto';

export class ChartDto {
  constructor(
    public readonly title: string,
    public readonly nodes: NodeDto[],
    public readonly connections: ConnectionDto[]
  ) {}
}

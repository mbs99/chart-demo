import { Endpoint } from '@jsplumb/core';
import { EndpointDto } from './endpoint.dto';

export class NodeDto {
  constructor(
    public readonly id: string,
    public readonly endpoints: EndpointDto[]
  ) {}
}

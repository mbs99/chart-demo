import { Endpoint } from '@jsplumb/core';
import { EndpointDto } from './endpoint.dto';
import { RectDto } from './rect.dto';

export class NodeDto {
  constructor(
    public readonly id: string,
    public readonly rect: RectDto,
    public readonly endpoints: EndpointDto[]
  ) {}
}

export class ConnectionDto {
  constructor(
    public readonly sourceId: string,
    public readonly targetId: string
  ) {}
}

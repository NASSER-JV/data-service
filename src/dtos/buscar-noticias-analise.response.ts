export class BuscarNoticiasAnaliseResponse {
  constructor(
    public url: string,
    public titulo: string,
    public texto: string,
    public sentimento: number,
    public tickers: string[],
  ) {}
}

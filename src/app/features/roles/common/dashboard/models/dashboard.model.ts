export interface BorrowersDateModel{
  name: string;
  number: number;
  buyers: Array<BuyerModel>;
}
interface BuyerModel{
  image: string;
  name: string;
  address: string;
  date: Date;
}

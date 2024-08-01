interface IDataset {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }
export interface IColumnData {
   labels: string[];
   datasets: IDataset[];
}
export interface IBasicOptions {
  plugins?: {
    legend?: {
      labels?: {
        usePointStyle?: boolean,
        color?: string;
      };
    };
  };
  scales?: {
    y: {
      beginAtZero?: boolean;
      ticks?: {
        color: string;
      };
      grid?: {
        color?: string;
        drawBorder?: boolean;
      };
    };
    x?: {
      ticks?: {
        color?: string;
      };
      grid?: {
        color?: string;
        drawBorder?: boolean;
      };
    };
  };
}

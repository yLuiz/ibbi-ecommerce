import { Component } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';
import { colors } from '../../shared/utils/colors';
import { IBasicOptions } from '../../shared/interfaces/chartsjs/IBasicOptions';
import { IData } from '../../shared/interfaces/chartsjs/IData';
import { ITopProduct } from '../../shared/interfaces/models/IProduct';
import { IPurchase } from '../../shared/interfaces/models/IPurchase';
import { IColumnData } from '../../shared/interfaces/chartsjs/IColumnData';
import { MessageService } from 'primeng/api';
import { ToastSeverity } from '../../shared/types/ToastSeverity';
import { IErrorResponse } from '../../shared/interfaces/api/IErrorResponse';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  // TABLE
  latestsPurchases: IPurchase[] = [];

  // COLUMN
  columnData?: IColumnData;
  basicOptions?: IBasicOptions;

  // DOUGHNUT
  doughnutData?: IData;
  options?: IBasicOptions;
  totalSalesCategory?: number;
  private _socketSubscription?: Subscription;

  isLoading = true;

  constructor(
    private _purchaseService: PurchaseService,
    private _messageService: MessageService
  ) {}

  ngOnInit() {
    // Pega o arquivo de estilo e obtém as propriedades de váriveis via JavaScript
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // DOUGHNUT
    this.doughnutData = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };

    // COLUMN
    this.columnData = {
      labels: [],
      datasets: [
        {
          label: 'Vendas',
          data: [],
          backgroundColor: [
            'rgb(65,105,225)',
            'rgb(220,20,60)',
            'rgb(60,179,113)',
            'rgb(255,215,0)',
            'rgb(50,205,50)',
            'rgb(60,179,113)',
            'rgb(46,139,87)',
            'rgb(0,255,255)',
            'rgb(238,130,238)',
            'rgb(128,0,128)',
          ],
          borderColor: [
            'rgb(65,105,225)',
            'rgb(220,20,60)',
            'rgb(60,179,113)',
            'rgb(255,215,0)',
            'rgb(50,205,50)',
            'rgb(60,179,113)',
            'rgb(46,139,87)',
            'rgb(0,255,255)',
            'rgb(238,130,238)',
            'rgb(128,0,128)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    this.getTop10Products();
    this.getPurchasesByCategory();
    this.getLatestsPurchases();

    this._socketSubscription = this._purchaseService.listenNewPurchase().subscribe({
      next: (purchase) => {
        this.getTop10Products();
        this.getPurchasesByCategory();
        this.getLatestsPurchases();
        this._messageService.add({
          severity: ToastSeverity.SUCCESS,
          summary: 'Nova compra registrada!',
          detail: `Um produto foi vendido!`,
          key: 'dashboard-tst',
        });
      },
      error: (response: IErrorResponse) => {
          console.error(response);
          const errorMessage =
            typeof response.error.message === 'string'
              ? response.error.message
              : response.error.message.at(-1);

          this._messageService.add({
            key: 'product-tst',
            severity: 'error',
            summary: 'Erro',
            detail: errorMessage,
          });
        },
    });
  }

  ngOnDestroy() {
    if (this._socketSubscription) {
      this._socketSubscription.unsubscribe();
    }
  }

  getTop10Products() {

    //Verifica se há dados no gráfico de top produtos 
    this.isLoading = !this.columnData?.labels.length

    this._purchaseService
      .listTop10Products()
      .subscribe({
        next: (response) => {
          const productsName = response.content.map((product) => product.name);
          const productsSalesQuantity = response.content.map(
            (product) => product.sales_quantity
          );
          this.columnData = {
            ...this.columnData,
            labels: [...productsName],
            datasets: [
              {
                ...this.columnData!.datasets[0],
                data: [...productsSalesQuantity],
              },
            ],
          };
        },
        error: (response: IErrorResponse) => {
          console.error(response);
          const errorMessage =
            typeof response.error.message === 'string'
              ? response.error.message
              : response.error.message.at(-1);

          this._messageService.add({
            key: 'product-tst',
            severity: 'error',
            summary: 'Erro',
            detail: errorMessage,
          });
        },
      })
      .add(() => (this.isLoading = false));
  }

  getPurchasesByCategory() {

    //Verifica se há dados no gráfico de top produtos 
    this.isLoading = !this.doughnutData?.labels.length

    this._purchaseService
      .listPurchaseGroupByCategory()
      .subscribe({
        next: (response) => {
          this.totalSalesCategory = response.total;
          const categories = response.content;
          const categoriesName = categories.map(
            (category) => `${category.name}(${category.sales_quantity})`
          );
          const purchasesQuantity = categories.map(
            (category) => category.sales_quantity
          );
          const bgColors = categories.map(
            (c, index) => `rgb(${colors[index].rgb})`
          );

          this.doughnutData = {
            ...this.doughnutData,
            labels: [...categoriesName],
            datasets: [
              {
                ...this.doughnutData!.datasets[0],
                data: [...purchasesQuantity],
                backgroundColor: [...bgColors],
                hoverBackgroundColor: [...bgColors],
              },
            ],
          };
        },
        error: (response: IErrorResponse) => {
          console.error(response);
          const errorMessage =
            typeof response.error.message === 'string'
              ? response.error.message
              : response.error.message.at(-1);

          this._messageService.add({
            key: 'product-tst',
            severity: 'error',
            summary: 'Erro',
            detail: errorMessage,
          });
        },
      })
      .add(() => (this.isLoading = false));
  }

  getLatestsPurchases() {

    //Verifica se há dados no gráfico de top produtos 
    this.isLoading = !this.latestsPurchases.length

    this._purchaseService
      .listPurchase({
        skip: 0,
        take: 4,
        order: 'desc',
      })
      .subscribe({
        next: (response) => {
          this.latestsPurchases = [...response.content];
        },
        error: (response: IErrorResponse) => {
          console.error(response);
          const errorMessage =
            typeof response.error.message === 'string'
              ? response.error.message
              : response.error.message.at(-1);

          this._messageService.add({
            key: 'product-tst',
            severity: 'error',
            summary: 'Erro',
            detail: errorMessage,
          });
        },
      })
      .add(() => (this.isLoading = false));
  }
}

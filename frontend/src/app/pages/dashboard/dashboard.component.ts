import { Component } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';
import { colors } from '../../shared/utils/colors';
import { IBasicOptions } from '../../shared/interfaces/chartsjs/IBasicOptions';
import { IData } from '../../shared/interfaces/chartsjs/IData';
import { ITopProduct } from '../../shared/interfaces/models/IProduct';
import { IPurchase } from '../../shared/interfaces/models/IPurchase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  // TABLE
  latestsPurchases: IPurchase[] = [];
  
  // COLUMN
  basicData: any;
  basicOptions?: IBasicOptions;

  // DOUGHNUT
  data?: IData;
  options: any;

  constructor(private _purchaseService: PurchaseService) {}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // DOUGHNUT
    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
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
    this.basicData = {
      labels: [],
      datasets: [
        {
          label: 'Vendas',
          data: [],
          backgroundColor: [
            'rgba(65,105,225, 0.2)',
            'rgba(220,20,60, 0.2)',
            'rgba(60,179,113, 0.2)',
            'rgba(255,215,0, 0.2)',
            'rgba(50,205,50, 0.2)',
            'rgba(60,179,113)',
            'rgba(46,139,87, 0.2)',
            'rgba(0,255,255, 0.2)',
            'rgba(238,130,238, 0.2)',
            'rgba(128,0,128, 0.2)',
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
    this.getPurrchasesByCategory();
    this.getLatestsPurchases();

    this._purchaseService.listenNewPurchase().subscribe({
      next: (purchase) => {
        this.getTop10Products();
        this.getPurrchasesByCategory();
        this.getLatestsPurchases();        
      },
      error: (error) => console.error(error),
    })

  }

  getTop10Products() {
    return this._purchaseService.listTop10Products().subscribe({
      next: (response) => {
        const productsName = response.content.map((product) => product.name);
        const productsSalesQuantity = response.content.map(
          (product) => product.sales_quantity
        );
        this.basicData = {
          ...this.basicData,
          labels: [...productsName],
          datasets: [
            {
              ...this.basicData.datasets[0],
              data: [...productsSalesQuantity],
            },
          ],
        };
      },
      error: (error) => console.error(error),
    });
  }

  getPurrchasesByCategory() {
    return this._purchaseService.listPurchaseGroupByCategory().subscribe({
      next: (response) => {
        const categories = response.content;
        const categoriesName = categories.map((category) => `${category.name}(${category.sales_quantity})`);
        const purchasesQuantity = categories.map(
          (category) => category.sales_quantity
        );
        const bgColors = categories.map((c, index) => `rgb(${colors[index].rgb})`);
        

        this.data = {
          ...this.data,
          labels: [...categoriesName],
          datasets: [
            {
              ...this.data!.datasets[0],
              data: [...purchasesQuantity],
              backgroundColor: [...bgColors],
              hoverBackgroundColor: [...bgColors],
            },
          ],
        };
      },
      error: (error) => console.error(error),
    });
  }

  getLatestsPurchases() {
    return this._purchaseService.listPurchase({
      skip: 0,
      take: 4,
      order: 'desc'
    }).subscribe({
      next: (response) => {
        this.latestsPurchases = [...response.content];
      },
      error: (error) => console.error(error),
    });
  }
}

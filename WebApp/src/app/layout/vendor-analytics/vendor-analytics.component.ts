import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-vendor-analytics',
  templateUrl: './vendor-analytics.component.html',
  styleUrls: ['./vendor-analytics.component.scss']
})
export class VendorAnalyticsComponent implements OnInit {

  constructor() {
    this.pieChart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Service Analytics'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
      },     
      series: [{
        type: 'pie',
        name: 'Service',
        data: [10, 20, 30, 25, 15]
    }]
    });
    this.lineChart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Income Analytics'
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'line',
        name: 'Service',
        data: [100, 2000, 30, 2500, 15]
    }]
    });
   }
   pieChart : any;
   lineChart : any;
   title : string = "Analytics";
  ngOnInit(): void {
  }

}

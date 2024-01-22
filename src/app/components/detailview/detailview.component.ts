import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-detailview',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.scss']
})
export class DetailviewComponent {
  tabIdentifier: string = '';
  dataValue: any;
  finalData: any;
  tabData: any;
  mobileQuery: MediaQueryList;
  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService, media: MediaMatcher,) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
    this.initialApi();
  }
  
  private initialApi() {
    this.route.params.subscribe(params => {
      this.tabIdentifier = params['tab_identifier'];
      this.dataService.getData().subscribe(data => {
        this.dataValue = data.data
        this.tabData = data.data.find((item: any) => item.tab_identifier === this.tabIdentifier);
        this.finalData = this.transformData(this.tabData) 
      });
    });
  }

  private transformData(inputData: any): any {
    const outputData: any = {
      headerText: inputData?.headerText,
      tab_identifier: inputData?.tab_identifier,
      order: inputData?.order,
      tab_available_locale: '',
      contentbox_Data: [],
    };
    for (let i = 1; i <= 10; i++) {
      const contentboxKey = `contentbox${i}_Data`;
      const positionKey = `contentbox${i}_Position`;

      const contentboxDataItem: { [key: string]: any } = {};
      contentboxDataItem[contentboxKey] = inputData[contentboxKey] ?? null;

      if (inputData[positionKey]) {
        const positionDataItem: { [key: string]: any } = {};
        positionDataItem[positionKey] = inputData[positionKey].charAt(2);
        contentboxDataItem['positionDataItem'] = positionDataItem;
      }

      outputData.contentbox_Data.push(contentboxDataItem);
    }

    return outputData;
  }

  public detialsViewChange(event: string) {
    this.router.navigate([event]);
    this.tabIdentifier = event
    this.tabData = this.dataValue.find((item: any) => item.tab_identifier === event);
    this.finalData = this.transformData(this.tabData)
  }
}
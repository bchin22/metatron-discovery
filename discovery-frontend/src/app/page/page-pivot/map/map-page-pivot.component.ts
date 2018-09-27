/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, ElementRef, Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {PagePivotComponent} from "../page-pivot.component";
import {Pivot} from "../../../domain/workbook/configurations/pivot";
import { Field as AbstractField } from '../../../domain/workbook/configurations/field/field';
import { BIType, Field, FieldPivot, FieldRole, LogicalType } from '../../../domain/datasource/datasource';
import { DimensionField } from '../../../domain/workbook/configurations/field/dimension-field';
import { AggregationType, MeasureField } from '../../../domain/workbook/configurations/field/measure-field';
import {
  GranularityType, TimestampField, TimeUnit,
  ByTimeUnit
} from '../../../domain/workbook/configurations/field/timestamp-field';
import {
  ChartType, SeriesType, ShelveFieldType,
  UIFormatType, ShelveType, EventType, BarMarkType, UIFormatCurrencyType, UIFormatNumericAliasType
} from '../../../common/component/chart/option/define/common';

import * as _ from 'lodash';

@Component({
  selector: 'map-page-pivot',
  templateUrl: './map-page-pivot.component.html'
})
export class MapPagePivotComponent extends PagePivotComponent implements OnInit, OnDestroy {
  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   | Private Variables
   |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   | Protected Variables
   |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   | Public Variables
   |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  @Input('pivot')
  set setPivot(pivot: Pivot) {

    if (pivot === undefined) {
      this.pivot = new Pivot();
      this.pivot.columns = [];
      this.pivot.rows = [];
      this.pivot.aggregations = [];
  } else {
      this.pivot = pivot;
    }

    this.changePivot();
  }


  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   | Constructor
   |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  // 생성자
  constructor(protected elementRef: ElementRef,
              protected injector: Injector) {

    super(elementRef, injector);
  }

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   | Override Method
   |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  // Init
  public ngOnInit() {

    // Init
    super.ngOnInit();
  }

  // Destory
  public ngOnDestroy() {

    // Destory
    super.ngOnDestroy();
  }

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   | Public Method
   |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

   public addLayer(layerNum: number): void {
     debugger

     if(layerNum < this.layerNum) {
       for(let column of this.pivot.columns) {
         if(column["layerNum"] === this.layerNum) {
           this.removeField("event", FieldPivot.COLUMNS, this.pivot.columns, this.pivot.columns.indexOf(column));
         }
       }

       for(let aggregation of this.pivot.aggregations) {
         if(aggregation["layerNum"] === this.layerNum) {
           this.removeField("event", FieldPivot.AGGREGATIONS, this.pivot.aggregations, this.pivot.aggregations.indexOf(aggregation));
         }
       }

       // this.removeField("event", )
     }

     this.layerNum = layerNum;

     if(layerNum === 1) {
       document.getElementsByClassName("ddp-ui-chart-contents")[0]["style"].top = '104px';
     } else if(layerNum === 2) {
       document.getElementsByClassName("ddp-ui-chart-contents")[0]["style"].top = '149px';
     } else if(layerNum === 3) {
       document.getElementsByClassName("ddp-ui-chart-contents")[0]["style"].top = '194px';
     }
   }

   /**
    * 선반 삭제
    * @param shelf
    * @param {number} idx
    */
   public removeField(event: any, fieldPivot: FieldPivot, shelf, idx: number) {

     // 선반에서 필드제거
     let field: AbstractField = shelf.splice(idx, 1)[0];

     // if (shelf[idx]) {
     // let aggregationType = shelf[idx].aggregationType;

     // aggregationTypeList에서 해당 aggregationType 제거
     // shelf.forEach((item) => {
     //   _.remove(item.aggregationTypeList, aggregationType);
     // })
     // }

     // 필드의 선반정보 제거
     field.field.pivot.splice(field.field.pivot.indexOf(fieldPivot), 1);

     // 필드의 Alias정보 제거
     // delete field.field.pivotAlias;

     // 해당 선반을 타겟으로 잡기
     // if (event) {
     //   let target = $(event.currentTarget.parentElement.parentElement.parentElement.parentElement);
     //
     //   // 선반 total width 설정, 애니메이션 여부 설정
     //   this.onShelveAnimation(target);
     // }

     // 이벤트
     this.changePivot(EventType.CHANGE_PIVOT);
   }

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   | Private Method
   |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

}

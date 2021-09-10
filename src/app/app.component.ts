import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from "rxjs";
import { concatMap, delay, exhaustMap, map, mergeMap, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  arrayExample: any[] = []

  constructor() { }

  ngOnInit() {
    ajax(`https://random-data-api.com/api/vehicle/random_vehicle?size=8`).pipe(map((value:any)=> value.response)).subscribe((val:any) => {
      let x=1
      val.forEach((element:any) => {
        this.arrayExample.push(x + ' - ' + element.make_and_model)
        x++
      })      
    })
  }

  concatMapExample(){

    from(this.arrayExample)
    .pipe(concatMap(param => of(param).pipe(delay(1000))))
    .subscribe(val => console.log('concatMap = ', val));

  }

  exhaustMapExample(){

    from(this.arrayExample)
    .pipe(exhaustMap(param => of(param).pipe(delay(1000))))
    .subscribe(val => console.log('exhaustMap = ', val));

  }

  mapExample(){
    ajax(`https://random-data-api.com/api/nation/random_nation`).subscribe(value => {
      console.log("Without Map:")
      console.log(value)
    })
    ajax(`https://random-data-api.com/api/nation/random_nation`).pipe(map(value=> value.response)).subscribe(value => {
      console.log("With Map (resource):")
      console.log(value)
    })
  }

  mergeMapExample(){

    from(this.arrayExample)
    .pipe(mergeMap(param => of(param).pipe(delay(1000))))
    .subscribe(val => console.log('mergeMap = ', val));

  }

  switchMapExample(){

    from(this.arrayExample)
    .pipe(switchMap(param => of(param).pipe(delay(1000))))
    .subscribe(val => console.log('switchMap = ', val));

  }

}

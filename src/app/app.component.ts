import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'visualdata';
  selectedValues: any = {};
  reset : boolean = false
  resetMethod() {
    console.log('here')
    this.selectedValues = {};
    this.reset = true
  }
  
  handleSelectedValuesChange(selectedValues: any) {
    console.log(this.selectedValues)
    this.selectedValues = selectedValues;
  }
  constructor() {
    
  }
}

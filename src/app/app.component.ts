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
    this.selectedValues = {};
    this.reset = !this.reset
  }
  
  handleSelectedValuesChange(selectedValues: any) {
    console.log(this.selectedValues)
    this.selectedValues = selectedValues;
  }
  constructor() {
    
  }
}

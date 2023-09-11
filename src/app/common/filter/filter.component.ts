import { Component, EventEmitter, Output } from '@angular/core';
import { BarchartsectorComponent } from 'src/app/barchartsector/barchartsector.component';
import { Data } from 'src/app/interfaces/data.interface';
import { DataService } from 'src/app/service/data.api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Output() selectedValuesChange = new EventEmitter<any>();
  selectedYear: string = '';
  selectedTopic: string = '';
  selectedSector: string = '';
  selectedRegion: string = '';
  selectedPestle: string = '';
  selectedSource: string = '';
  selectedSwot: string = '';
  selectedCountry: string = '';

  constructor( private dataService : DataService )  {
  this.dataService.globalData.subscribe((res) => {
    this.Data = res;
    this.initializeDataArrays();
  });


  }
  Data: any  = [] 
  years: string[] = [];
  topics: string[] = [];
  sectors: string[] = [];
  regions: string[] = [];
  pestles: string[] = [];
  sources: string[] = [];
  swots: string[] = [];
  countrys: string[] = [];
  emitSelectedValues() {
    const selectedValues = {
      year: this.selectedYear,
      topic: this.selectedTopic,
      sector : this.selectedSector,
      region : this.selectedRegion,
      pestles : this.selectedPestle,
      sources : this.selectedSource,
      swot : this.selectedSwot,
      country : this.selectedCountry,
    };
    this.selectedValuesChange.emit(selectedValues);
  }


  
  initializeDataArrays() {
    if (this.Data && this.Data.data) {
      const actualData = this.Data.data;
      this.years = this.getUniqueValues('end_year', actualData).sort();
      this.topics = this.getUniqueValues('topic', actualData);
      this.sectors = this.getUniqueValues('sector', actualData);
      this.regions = this.getUniqueValues('region', actualData);
      this.pestles = this.getUniqueValues('pestle', actualData);
      this.sources = this.getUniqueValues('source', actualData);
      this.swots = this.getUniqueValues('swot', actualData);
      this.countrys = this.getUniqueValues('country', actualData);
    }
  }


  ngOnInit()  {
     this.years = this.getUniqueValues(`end_year`, this.Data);
      this.topics = this.getUniqueValues('topic', this.Data);
      this.sectors = this.getUniqueValues('sector', this.Data);
      this.regions = this.getUniqueValues('region', this.Data);
      this.pestles = this.getUniqueValues('pestle', this.Data);
      this.sources = this.getUniqueValues('source', this.Data);
      this.swots = this.getUniqueValues('swot', this.Data);
      this.countrys = this.getUniqueValues('country', this.Data);
  }
 

  getUniqueValues(property: string, data: any[]): any[] {
    const values: string[] = [];
    if (!Array.isArray(data)) {
      console.error('data is not an array:', data);
      return values;
    }
    data.filter((item) => {
      if (item.hasOwnProperty(property) && !values.includes(item[property])&& item[property] !== "") {
        values.push(item[property]);
      }
    });
    return values;
  }
 
  

}

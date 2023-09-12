import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/service/data.api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnChanges {
  @Output() selectedValuesChange = new EventEmitter<any>();
  @Input() reset = false;

  selectedYear = '';
  selectedTopic = '';
  selectedSector = '';
  selectedRegion = '';
  selectedPestle = '';
  selectedSource = '';
  selectedSwot = '';
  selectedCountry = '';

  Data: any = [];
  years: string[] = [];
  topics: string[] = [];
  sectors: string[] = [];
  regions: string[] = [];
  pestles: string[] = [];
  sources: string[] = [];
  swots: string[] = [];
  countries: string[] = [];

  constructor(private dataService: DataService) {
    this.dataService.globalData.subscribe((res) => {
      this.Data = res;
      this.initializeDataArrays();
    });
  }

  ngOnChanges(change : SimpleChanges) {
    if (change['reset']) {
      this.resetSelectedValues();
      this.reset = !this.reset;
    }
  }

  ngOnInit() {
    this.initializeDataArrays();
  }

  emitSelectedValues() {
    const selectedValues = {
      year: this.selectedYear,
      topic: this.selectedTopic,
      sector: this.selectedSector,
      region: this.selectedRegion,
      pestle: this.selectedPestle,
      source: this.selectedSource,
      swot: this.selectedSwot,
      country: this.selectedCountry,
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
      this.countries = this.getUniqueValues('country', actualData);
    }
  }

  resetSelectedValues() {
    this.selectedYear = '';
    this.selectedTopic = '';
    this.selectedSector = '';
    this.selectedRegion = '';
    this.selectedPestle = '';
    this.selectedSource = '';
    this.selectedSwot = '';
    this.selectedCountry = '';
  }

  getUniqueValues(property: string, data: any[]): string[] {
    const values: string[] = [];
    if (!Array.isArray(data)) {
      console.error('data is not an array:', data);
      return values;
    }
    data.filter((item) => {
      if (item.hasOwnProperty(property) && !values.includes(item[property]) && item[property] !== "") {
        values.push(item[property]);
      }
    });
    return values;
  }
}

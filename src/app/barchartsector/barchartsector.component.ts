import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../service/data.api.service';
@Component({
  selector: 'app-barchartsector',
  templateUrl: './barchartsector.component.html',
  styleUrls: ['./barchartsector.component.css'],
})
export class BarchartsectorComponent
  implements OnInit, AfterViewInit, OnChanges
{ 
  @Input() reset !: boolean;
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;
  @Input() selectedYear: string = '';
  @Input() selectedTopic: string = '';
  @Input() selectedSector: string = '';
  @Input() selectedRegion: string = '';
  @Input() selectedPestle: string = '';
  @Input() selectedSource: string = '';
  @Input() selectedSwot: string = '';
  @Input() selectedCountry: string = '';

  data: any[] = [];
  FilteredData!: any[];

  constructor(private dataService: DataService) {
    this.dataService.globalData.subscribe((res) => {
      this.data = res.data;
    });
   
  }
 
  ngOnInit(): void {
    if(this.reset) {
      console.log('bar compo')
      this.FilteredData = []
      this.createBarChart()
   }
  }

  onFilterChange(): void {
    this.filterDataByField('end_year', this.selectedYear);
    this.filterDataByField('topic', this.selectedTopic);
    this.filterDataByField('sector', this.selectedSector);
    this.filterDataByField('region', this.selectedRegion);
    this.filterDataByField('source', this.selectedSource);
    this.filterDataByField('swot', this.selectedSwot);
    this.filterDataByField('country', this.selectedCountry);

    // After applying filters, update or recreate the bar chart
    this.createBarChart();
  }
  ngOnChanges() {
    this.onFilterChange();
   
  }
 

  ngAfterViewInit(): void {
      setTimeout(() => {
        if (this.FilteredData && this.FilteredData.length > 0) {
        } else {
          this.FilteredData = this.data
          this.createBarChart();
        }
      }, 3000);
  }
  filterDataByField(fieldName: string, filterValue: any): void {
    if (filterValue && filterValue !== '') {
      this.FilteredData = this.FilteredData.filter(
        (d: any) => d[fieldName] === filterValue
      );
    }
  }


  createBarChart(): void {
    // Remove any existing SVG elements before rendering
    d3.select(this.chartContainer.nativeElement).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 1600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    const filteredData = this.FilteredData ? this.FilteredData.filter((d: any) => d.sector !== '') : this.data.filter((d: any) => d.sector !== '');
    // xScale
    const xScale = d3
      .scaleBand()
      .domain(filteredData.map((d: any) => d.sector)!)
      .range([0, width])
      .padding(0.1);

    // yScale
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d: any) => d.intensity)!])
      .nice()
      .range([height, 0]);
    console.log('Filtered Data:', filteredData);
    console.log('xScale Domain:', xScale.domain());
    console.log('yScale Domain:', yScale.domain());

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale));

    // Create and append the bars
    svg
      .selectAll('.bar')
      .data(filteredData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .filter((d: any) => d.sector !== '' && d.intensity !== '')
      .attr('x', (d: any) => xScale(d.sector)!)
      .attr('y', (d: any) => yScale(d.intensity)!)
      .attr('width', xScale.bandwidth())
      .attr('height', (d: any) => height - yScale(d.intensity)!); // Add 'any' type to d for height
  }
}

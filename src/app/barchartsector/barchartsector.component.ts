import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
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
  implements OnInit, AfterViewInit, OnChanges {
  @Input() reset !: boolean;
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;
  @Input() selectedYear = '';
  @Input() selectedTopic = '';
  @Input() selectedSector = '';
  @Input() selectedRegion = '';
  @Input() selectedPestle = '';
  @Input() selectedSource = '';
  @Input() selectedSwot = '';
  @Input() selectedCountry = '';

  data: any[] = [];
  FilteredData: any[] = [];

  constructor(private dataService: DataService) {
    this.dataService.globalData.subscribe((res) => {
      this.data = res.data;
    });
  }

  ngOnInit(): void {}

  onFilterChange(): void {
    this.filterDataByField('end_year', this.selectedYear);
    this.filterDataByField('topic', this.selectedTopic);
    this.filterDataByField('sector', this.selectedSector);
    this.filterDataByField('region', this.selectedRegion);
    this.filterDataByField('source', this.selectedSource);
    this.filterDataByField('swot', this.selectedSwot);
    this.filterDataByField('country', this.selectedCountry);
    this.createBarChart();
  }

  ngOnChanges(changes : SimpleChanges): void {
    if (changes['reset']) {
      this.FilteredData = this.data; // Reset filtered data to the original data
      this.createBarChart();
      this.reset = !this.reset;
    } else {
      this.onFilterChange();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.FilteredData = this.data;
      this.createBarChart();
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

    const filteredData = this.FilteredData
      ? this.FilteredData.filter((d: any) => d.sector !== '')
      : this.data.filter((d: any) => d.sector !== '');

    // xScale
    const xScale = d3
      .scaleBand()
      .domain(filteredData.map((d: any) => d.sector))
      .range([0, width])
      .padding(0.1);

    // yScale
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d: any) => d.intensity)])
      .nice()
      .range([height, 0]);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale));

    svg
      .selectAll('.bar')
      .data(filteredData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .filter((d: any) => d.sector !== '' && d.intensity !== '')
      .attr('x', (d: any) => xScale(d.sector)!)
      .attr('y', (d: any) => yScale(d.intensity))
      .attr('width', xScale.bandwidth())
      .attr('height', (d: any) => height - yScale(d.intensity));
  }
}

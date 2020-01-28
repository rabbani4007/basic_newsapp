import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../news-api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  mArticles: Array<any>;
  mSources: Array<any>;
  sourceCtrl = new FormControl();
  filteredSources: Observable<Array<any>>;
  selectedSource;
  selectedSoureName;
  constructor(private newsapi: NewsApiService) {
    this.filteredSources = this.sourceCtrl.valueChanges
      .pipe(
        startWith(''),
        map(source => source ? this._filterSources(source) : this.mSources.slice())
      );


  }

  ngOnInit() {
    //load articles
    this.newsapi.initArticles().subscribe(data => this.mArticles = data['articles']);
    //load news sources
    this.newsapi.initSources().subscribe(data => this.mSources = data['sources']);
    this.filteredSources = this.sourceCtrl.valueChanges
      .pipe(
        startWith(''),
        map(source => source ? this._filterSources(source) : this.mSources.slice())
      );
  }

  searchArticles(source) {
    console.log("selected source is: " + source);
    this.newsapi.getArticlesByID(source).subscribe(data => this.mArticles = data['articles']);
  }
  private _filterSources(value: string) {
    const filterValue = value.toLowerCase();

    return this.mSources.filter(source => source.name.toLowerCase().indexOf(filterValue) === 0);
  }
  onSelectionChanged(event) {
    this.newsapi.getArticlesByID(event.option.value).subscribe(data => this.mArticles = data['articles']);
    this.selectedSource = this.mSources.filter(source => source.id.toLowerCase().indexOf(event.option.value) === 0);
    this.selectedSoureName = this.selectedSource[0].name;
    console.log(event.option.value);

  }

}

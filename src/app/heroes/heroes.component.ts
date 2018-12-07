import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Hero } from '../hero';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  /*
  hero = 'Windstorm';
  */
   public showAddSuccessMessage: boolean = false;
   public showVoteSuccessMessage: boolean = false;

  searchForm: FormGroup;
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
  list = [];

  listData: any = [];
  voteDetails;
  constructor(private fb: FormBuilder, private http: Http) {
    this.searchForm = new FormBuilder().group({
      'title': [''],
      'tags': [],
      'description': [''],
      'vote': 0,
      'createdBy': 'test@mail.com',
      'createdDate': new Date(),
      'updatedDate': null,
      'updatedBy': null    
    });
  }

  ngOnInit() {
    this.getGitUserDetailData();
  }

  submitData() {
    // console.log(this.searchForm.value);
    var stringForSepration = this.searchForm.value.tags;
    // console.log(stringForSepration);
    var ans = stringForSepration.split(" ");
    this.searchForm.value.tags = ans;
    this.showAddSuccessMessage = false;
    this.submitService(this.searchForm.value).subscribe(resp => {
      console.log(resp);
      this.showAddSuccessMessage = true;
      this.getGitUserDetailData();
    });
  }


  public submitService(data): Observable<any> {
    return this.http.post('http://34.216.213.156:1032/v1/articles/', data);
  }


  getGitUserDetailData() {
    this.getGitUserDetail().subscribe(resp => {
      this.listData = (resp.json());
      this.showAddSuccessMessage = false;
      console.log('data  : ' + JSON.stringify(this.listData));
    }, err => {
      console.log('Error on gett all data');
    });
  }

  getVoteDetail(id){
    this.getVoteData(id).subscribe(resp => {
      this.voteDetails = (resp.json());
      console.log(this.voteDetails);
    }, err => {
      console.log('Error on gett all TechStacks' + JSON.stringify(err));
    });
  }

  voteCount(id){
    this.showVoteSuccessMessage = false;
    this.getVote(id).subscribe(resp => {
      this.showVoteSuccessMessage = true;
      this.getGitUserDetailData();
    }, err => {
      this.showVoteSuccessMessage = false;
      console.log('Error on gett all TechStacks' + JSON.stringify(err));
    });
  }

  public getGitUserDetail(): Observable<any> {
    return this.http.get('http://34.216.213.156:1032/v1/articles/');
  }

  public getVoteData(id): Observable<any> {
    return this.http.get('http://34.216.213.156:1032/v1/articles/' + id)
  }

  public getVote(id): Observable<any> {
    return this.http.put('http://34.216.213.156:1032/v1/articles/' + id, '')
  }

}

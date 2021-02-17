import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {HomeDetails, HomeModel} from '../../models/favorites.model';
import {SearchHomeService} from '../../../../common/search-homes/services/search-home.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {
  @Input() homeDetails: HomeDetails = {} as HomeDetails;
  @Output() removeFavorite = new EventEmitter<any>();
  constructor(private searchHomeService: SearchHomeService,
              private toaster: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
  }

  removeFromFavorites(): void{
    this.searchHomeService.removeFavorite(this.homeDetails.details.id).pipe(take(1)).subscribe(res => {
      console.log(res);
      this.toaster.success('Removed From Favorites');
      this.removeFavorite.emit(res.result);
    }, error => {
      this.toaster.error('Failed To Remove From Favorites');
    });
  }
  propertyDetails(): void{
    this.router.navigateByUrl(`/home/propertyDetails/${this.homeDetails.details.id}`).then();
  }
}

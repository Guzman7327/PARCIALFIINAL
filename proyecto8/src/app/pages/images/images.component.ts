import { Component ,inject} from '@angular/core';
import {imagesService} from '../../service/images.service';
import { imagesDetailComponent } from '../../components/images-detail/images-detail.component';
import { Item } from '../../interfaces/Iimages';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [ imagesDetailComponent ],
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})

export class ImagesComponent {

  imagesService = inject(imagesService);

  get Images(): Image[] {
    return this.imagesService.imagesQuery;
}


}

import { Component, inject, input } from '@angular/core';
import { Item } from '../../interfaces/Iimages';
import { imageService } from '../../services/image.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-images-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './images-detail.component.html',
  styleUrl: './images-detail.component.css'
})
export class imagesDetailComponent {
  images = input.required<Item[]>();
  imageService= inject(imageService);


  prefetchData(number:number){
    this.Service.prefetchCharacter(number.toString());
  }


}

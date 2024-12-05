import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { imageService } from '../../services/image.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map,tap } from 'rxjs';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export default class imageComponent {
  route = inject(ActivatedRoute);
  imageService= inject(imageService);

  imageId = toSignal<string>(
    this.route.paramMap.pipe(
      map((params) => params.get('id') ?? '' ),
      tap((id) => this.imageService.setimageId(id)  )
    )
  );

    imageQuery  = this.imageService.imagesQuery;





}

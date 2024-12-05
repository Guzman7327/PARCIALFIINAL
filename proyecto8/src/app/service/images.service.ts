import { Injectable } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getimages } from '../actions/getimages';
import { Iimages } from '../interfaces/images';


@Injectable({
  providedIn: 'root'
})

 export class ImagesService {
    imagesQuery: Image[] = [];


  imagesQuery = injectQuery(() => ({
    queryKey: ['images'],
    queryFn: () => getimages()
  }));

}

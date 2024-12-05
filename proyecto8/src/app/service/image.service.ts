import { Injectable, signal } from '@angular/core';
import { injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';
import { getimage } from '../actions/getimage';

@Injectable({
  providedIn: 'root'
})
export class imageService {

  private imageId = signal<string| null>(null);
  private quieryClient=  injectQueryClient();


  setCharacterId(imageId: string){
    this.imageId.set(imageId);
  }


  charactersQuery = injectQuery(()=>({
    queryKey: ['images', this.imageId()]  ,
    queryFn: () => getCharacter( this.imageId()!),
    enabled: !!this.imageId()
 }))

 prefetchCharacter(imageId: string){

  this.quieryClient.prefetchQuery({
    queryKey: ['images', imageId],
    queryFn: () => getCharacter(imageId),
    staleTime: 1000 * 60 * 5 ////// 5 minutos
  })


 }





}

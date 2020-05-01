import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Fish {
  
  constructor(@Inject(Number)
    public Userid: number,
    @Inject(String)
    public fishid: string,
    @Inject(Number)
    public size: number,
    @Inject(Number)
    public minprice: number,
    @Inject(String)
    public status: string
  ){ }

 }

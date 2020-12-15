import { ImagenPipe } from './imagen.pipe';
import { NgModule } from '@angular/core';
import { LimitToPipe } from './limit-to.pipe';



@NgModule({
  declarations: [ ImagenPipe, LimitToPipe ],
  imports: [

  ],
  exports: [ ImagenPipe,
            LimitToPipe ]
})
export class PipesModule { }

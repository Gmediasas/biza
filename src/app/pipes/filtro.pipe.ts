import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], texto: string): any[] {
    if(texto === ''){
      return arreglo;
    }

    texto = texto.toLowerCase();
    
    return arreglo.filter( item => {
      return item.nombre_apellido.toLowerCase().includes(texto) || item.codigo_boleta.toLowerCase().includes(texto);
    });
  }

}

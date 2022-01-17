import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

  private _listFilter: string = "";

  get listFilter():string {

    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter', value);
    //Cuando se establece la palabra a filtrar por el usuario comenzamos la función de filtrado
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];

  //obtendremos los productos del service
  products: IProduct[] = [];

  //inyectamos el servicio a través del constructor. Existe la propiedad productService en nuestra clase (no hace falta declararla fuera)
  constructor(private productService: ProductService) {

  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().includes(filterBy));

  }


  //el message viene desde el emiter
  onRatingClicked(message: string):void {
    this.pageTitle = 'Product list: ' + message;
  }


  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.products =  this.productService.getProducts();
    this.filteredProducts = this.products;

  }



}

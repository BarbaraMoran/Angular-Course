import { ThisReceiver } from "@angular/compiler";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy{
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = "";
  sub!: Subscription | undefined;

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
    this.sub =  this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },

      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }



}

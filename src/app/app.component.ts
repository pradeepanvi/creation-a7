import { Component, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

export interface Product {
  price: number;
  viewValue: string;
  desc: any;
}

export interface Location {
  state: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'creation-a7';
  invoiceForm: FormGroup;
  priceBeforeTax:any;
  card_gst:any;
  card_igst:any;

  holder_gst:any;
  holder_igst:any;

  lanyard_gst:any;
  lanyard_igst:any;

  total_tax:any;
  gross_total:any;

  discount_edit = false;
  discount = 0;

  location_edit = true;
  location:any;

  lanyards: Product[] = [
    {price: 30, viewValue: '12mm Digital Lanyards', desc: [
      {des: 'Non Washable Printing'},
      {des: 'Both side printing'},
      {des: 'Dog Hook'}
    ]},
    {price: 35, viewValue: '16mm Digital Lanyards', desc: [
      {des: 'Non Washable Printing'},
      {des: 'Both side printing'},
      {des: 'Dog Hook'}
    ]},
    {price: 40, viewValue: '20mm Digital Lanyards', desc: [
      {des: 'Non Washable Printing'},
      {des: 'Both side printing'},
      {des: 'Dog Hook'}
    ]},
    {price: 10, viewValue: 'Normal Offical Lanyards', desc: [
      {des: 'Non Washable Printing'},
      {des: 'Both side printing'},
      {des: 'Dog Hook'}
    ]},
  ];  

  holders: Product[] = [
    {price: 5, viewValue: 'Normal White Transparent Holders', desc: [
      {des: 'Non Washable Printing'},
      {des: 'Both side printing'},
      {des: 'Dog Hook'}
    ]},
    {price: 10, viewValue: 'Double Sided Black Holders', desc: [
      {des: 'Non Washable Printing'},
      {des: 'Both side printing'},
      {des: 'Dog Hook'}
    ]},
    {price: 10, viewValue: 'Double Sided White Transparent Holders', desc: [
      {des: 'Non Washable Printing'},
      {des: 'Both side printing'},
      {des: 'Dog Hook'}
    ]},
  ];  

  cards: Product[] = [
    {price: 40, viewValue: 'PCV Cards', desc: [
      {des: 'Non Washable Printing'},
      {des: 'Both side printing'},
      {des: 'Dog Hook'}
    ]},
  ];
  
  locations: Location[] = [
    {state:'Delhi'},
    {state:'Other'},
  ]
  
  ngOnInit(){
    this.initForm();
  }

  ngDoCheck(){
    this.location = this.invoiceForm.value.location.state;
    if(this.location == 'Delhi'){
      this.card_gst = ((this.invoiceForm.value.card_q * this.invoiceForm.value.card.price) * 18 / 100) / 2;
      this.card_igst = 0;
  
      this.holder_gst = ((this.invoiceForm.value.holder_q * this.invoiceForm.value.holder.price) * 18 / 100) / 2;
      this.holder_igst = 0;
  
      this.lanyard_gst = ((this.invoiceForm.value.lanyard_q * this.invoiceForm.value.lanyard.price) * 18 / 100) / 2;
      this.lanyard_igst = 0;

      this.location_edit = true;
    } else {
      this.card_gst = 0;
      this.card_igst = (this.invoiceForm.value.card_q * this.invoiceForm.value.card.price) * 18 / 100;
  
      this.holder_gst = 0;
      this.holder_igst = (this.invoiceForm.value.holder_q * this.invoiceForm.value.holder.price) * 18 / 100;
  
      this.lanyard_gst = 0;
      this.lanyard_igst = (this.invoiceForm.value.lanyard_q * this.invoiceForm.value.lanyard.price) * 18 / 100;

      this.location_edit = false;
    }

    this.discount = this.invoiceForm.value.discount;

    if(this.discount > 0){
        this.discount_edit = true;
    } else {
        this.discount_edit = false;
    }

    this.total_tax = (this.card_gst + this.holder_gst + this.lanyard_gst) + (this.card_gst + this.holder_gst + this.lanyard_gst) + (this.card_igst + this.holder_igst + this.lanyard_igst);

    this.priceBeforeTax = (this.invoiceForm.value.card_q * this.invoiceForm.value.card.price) + (this.invoiceForm.value.holder_q * this.invoiceForm.value.holder.price) + (this.invoiceForm.value.lanyard_q * this.invoiceForm.value.lanyard.price) - this.discount;

    this.gross_total = this.total_tax + this.priceBeforeTax;
  }

  onSubmit(){
    console.log(this.invoiceForm.value);
  }

  private initForm(){
    this.invoiceForm = new FormGroup({
      'invoice_no': new FormControl(),
      'to' : new FormControl(),
      'date' : new FormControl(),
      'card' : new FormControl('', Validators.required),
      'card_q': new FormControl('1'),
      'holder_q': new FormControl('1'),
      'lanyard_q': new FormControl('1'),
      'holder': new FormControl('', Validators.required),
      'lanyard': new FormControl('', Validators.required),
      'location': new FormControl('Delhi', Validators.required),
      'discount': new FormControl('0'),
    });
  }
}

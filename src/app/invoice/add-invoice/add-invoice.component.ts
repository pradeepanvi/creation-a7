import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Product } from '../../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface Product {
  price: number;
  viewValue: string;
  desc: any;
}

export interface Location {
  state: string;
}

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit {
  constructor(private http:HttpClient,
              private route:ActivatedRoute,
              private router:Router) { }
      
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

  gst_no_edit = true;
  company_status:any;

  admin:any;
  lanyards:any;

  holders:any;  

  cards:any;
  
  locations:any;
  
  ngOnInit(){
    this.http.get('../../../assets/code.json').subscribe(
      (res) => {
        this.admin = res;
      }
    )
    this.initForm();
  }

  ngDoCheck(){
    this.company_status = this.invoiceForm.value.comapny_register;
    console.log(this.company_status);
    if(this.company_status == 'register'){
      this.gst_no_edit = true;
    } else {
      this.gst_no_edit = false;
    }

    this.location = this.invoiceForm.value.location.state;
    if(this.location == 'Delhi'){
      if(this.invoiceForm.value.card != ''){
        this.card_gst = ((this.invoiceForm.value.card_q * this.invoiceForm.value.card.price) * 18 / 100) / 2;  
      } else {
        this.card_gst = 0;
      }
      this.card_igst = 0;
  
      if(this.invoiceForm.value.holder != ''){
        this.holder_gst = ((this.invoiceForm.value.holder_q * this.invoiceForm.value.holder.price) * 18 / 100) / 2;
      } else {
        this.holder_gst = 0;
      }
      this.holder_igst = 0;
  
      if(this.invoiceForm.value.lanyard != ''){
        this.lanyard_gst = ((this.invoiceForm.value.lanyard_q * this.invoiceForm.value.lanyard.price) * 18 / 100) / 2;
      } else {
        this.lanyard_gst = 0;
      }
      this.lanyard_igst = 0;

      this.location_edit = true;
    } else {
      this.card_gst = 0;
      if(this.invoiceForm.value.card != ''){
        this.card_igst = (this.invoiceForm.value.card_q * this.invoiceForm.value.card.price) * 18 / 100;
      } else {
        this.card_igst = 0;
      }
  
      this.holder_gst = 0;
      if(this.invoiceForm.value.holder != ''){
        this.holder_igst = (this.invoiceForm.value.holder_q * this.invoiceForm.value.holder.price) * 18 / 100;
      } else {
        this.holder_igst = 0;
      }
      
  
      this.lanyard_gst = 0;
      if(this.invoiceForm.value.lanyard != ''){
        this.lanyard_igst = (this.invoiceForm.value.lanyard_q * this.invoiceForm.value.lanyard.price) * 18 / 100;
      } else {
        this.lanyard_igst = 0;
      }

      this.location_edit = false;
    }

    this.discount = this.invoiceForm.value.discount;

    if(this.discount > 0){
        this.discount_edit = true;
    } else {
        this.discount_edit = false;
    }

    this.total_tax = (this.card_gst + this.holder_gst + this.lanyard_gst) + (this.card_gst + this.holder_gst + this.lanyard_gst) + (this.card_igst + this.holder_igst + this.lanyard_igst);
    console.log(this.card_gst + this.holder_gst + this.lanyard_gst);

    this.priceBeforeTax = 0;

    if(this.invoiceForm.value.card != ''){
      this.priceBeforeTax += (this.invoiceForm.value.card_q * this.invoiceForm.value.card.price);
    } 
    if(this.invoiceForm.value.holder != '') {
      this.priceBeforeTax += (this.invoiceForm.value.holder_q * this.invoiceForm.value.holder.price)
    }
    if(this.invoiceForm.value.lanyard != ''){
      this.priceBeforeTax += (this.invoiceForm.value.lanyard_q * this.invoiceForm.value.lanyard.price);      
    }
    this.priceBeforeTax - this.discount;

    this.gross_total = this.total_tax + this.priceBeforeTax;
  }

  onSubmit(){
    console.log(this.invoiceForm.value);
    //window.print();
  }
  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }

  private initForm(){
    this.invoiceForm = new FormGroup({
      'invoice_no': new FormControl(),
      'company' : new FormControl(),
      'comapny_register': new FormControl('register'),
      'gst_no' : new FormControl(),
      'date' : new FormControl(),
      'card' : new FormControl('', Validators.required),
      'holder': new FormControl('', Validators.required),
      'lanyard': new FormControl('', Validators.required),
      'card_q': new FormControl('1'),
      'holder_q': new FormControl('1'),
      'lanyard_q': new FormControl('1'),
      'location': new FormControl('Delhi', Validators.required),
      'discount': new FormControl('0'),
    });
  }

}

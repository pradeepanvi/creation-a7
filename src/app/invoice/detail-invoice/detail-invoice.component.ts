import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';

export interface Invoice{
  invoice_list: any;
}

@Component({
  selector: 'app-detail-invoice',
  templateUrl: './detail-invoice.component.html',
  styleUrls: ['./detail-invoice.component.scss']
})
export class DetailInvoiceComponent implements OnInit {
  admin:any;
  invoice_list:any;
  id:any;
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

  location:any;

  gst_no_edit = true;
  company_status:any;
  
  location_edit = false;
  location_edit2 = false;
  location_edit_innter = false;
  location_edit_innter2 = false;  

  constructor(private http:HttpClient,
              private route:ActivatedRoute,
              private router:Router,
              private authService:AuthService) { }
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    )
    this.http.get(this.authService.code).subscribe(
      (res) => {
        this.admin = res;
        //console.log(this.admin);
      }
    )
    this.http.get(this.authService.code).subscribe(
      (res:Invoice) => {
        this.invoice_list = res.invoice_list[this.id];
        //console.log(this.invoice_list);

        this.company_status = this.invoice_list.comapny_register;
        //console.log(this.company_status);
        if(this.company_status == 'register'){
          this.gst_no_edit = true;
        } else {
          this.gst_no_edit = false;
        }
    
        this.location = this.invoice_list.location.value;
        if(this.location == 'delhi' || this.location == 'yes'){
          this.card_gst = ((this.invoice_list.card_q * this.invoice_list.card.price) * 18 / 100) / 2;
          this.card_igst = 0;
      
          this.holder_gst = ((this.invoice_list.holder_q * this.invoice_list.holder.price) * 18 / 100) / 2;
          this.holder_igst = 0;
      
          this.lanyard_gst = ((this.invoice_list.lanyard_q * this.invoice_list.lanyard.price) * 18 / 100) / 2;
          this.lanyard_igst = 0;
    
          if(this.location == 'delhi'){
            this.location_edit = true;
            this.location_edit2 = false;
            this.location_edit_innter = false;
            this.location_edit_innter2 = false;
          }
          if(this.location == 'yes'){
            this.location_edit = false;
            this.location_edit2 = false;
            this.location_edit_innter = true;
            this.location_edit_innter2 = false;
          }
        } else if(this.location == 'other' || this.location == 'no') {
          this.card_gst = 0;
          this.card_igst = (this.invoice_list.card_q * this.invoice_list.card.price) * 18 / 100;
      
          this.holder_gst = 0;
          this.holder_igst = (this.invoice_list.holder_q * this.invoice_list.holder.price) * 18 / 100;
      
          this.lanyard_gst = 0;
          this.lanyard_igst = (this.invoice_list.lanyard_q * this.invoice_list.lanyard.price) * 18 / 100;
    
          if(this.location == 'other'){
            this.location_edit = false;
            this.location_edit2 = true;
            this.location_edit_innter = false;
            this.location_edit_innter2 = false;
          }
          if(this.location == 'no'){
            this.location_edit = false;
            this.location_edit2 = false;
            this.location_edit_innter = false;
            this.location_edit_innter2 = true;
          }
        }
    
        this.discount = this.invoice_list.discount;
    
        if(this.discount > 0){
            this.discount_edit = true;
        } else {
            this.discount_edit = false;
        }
    
        this.total_tax = (this.card_gst + this.holder_gst + this.lanyard_gst) + (this.card_gst + this.holder_gst + this.lanyard_gst) + (this.card_igst + this.holder_igst + this.lanyard_igst);
    
        this.priceBeforeTax = (this.invoice_list.card_q * this.invoice_list.card.price) + (this.invoice_list.holder_q * this.invoice_list.holder.price) + (this.invoice_list.lanyard_q * this.invoice_list.lanyard.price) - this.discount;
    
        this.gross_total = this.total_tax + this.priceBeforeTax;    
    
      }

    )
  }

  back(){
    this.router.navigate(['../../'], {relativeTo:this.route});
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.scss']
})
export class ListInvoiceComponent implements OnInit {
invoice_list:any;

constructor(private http:HttpClient,
            private route:ActivatedRoute,
            private router:Router) { }

ngOnInit() {
  this.http.get('http://identitycards.co.in/invoice/assets/code.json').subscribe(
    (res) => {
      this.invoice_list = res;
      //console.log(this.invoice_list);
    }
  )
}

add(){
  this.router.navigate(['add-invoice'], {relativeTo:this.route});
}
view(id){
  this.router.navigate(['detail-invoice/'+id], {relativeTo:this.route});
}

}

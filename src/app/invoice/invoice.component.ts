import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
  }

  add(){
    this.router.navigate(['add-invoice'], {relativeTo:this.route});
  }

}

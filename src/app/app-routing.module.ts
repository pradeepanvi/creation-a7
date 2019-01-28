import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { AddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { ListInvoiceComponent } from './invoice/list-invoice/list-invoice.component';
import { DetailInvoiceComponent } from './invoice/detail-invoice/detail-invoice.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../shared/auth-guard.service';

const routes: Routes = [
  { path:'', component:LoginComponent},
  { path:'invoice', canActivate:[AuthGuard], component:InvoiceComponent, children:[
  //{ path:'invoice', component:InvoiceComponent, children:[    
    {path:'', component:ListInvoiceComponent},
    {path:'add-invoice', component:AddInvoiceComponent},
    {path:'detail-invoice/:id', component:DetailInvoiceComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

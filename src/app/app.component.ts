import { Component, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as jsPDF from 'jspdf';

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
export class AppComponent{
}

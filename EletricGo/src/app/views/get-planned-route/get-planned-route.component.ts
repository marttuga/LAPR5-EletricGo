import { PathLocationStrategy } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import {PlannedRouteService} from "../../services/node/plannedRoute.service";
import {TrucksService} from "../../services/node/truck.service";


@Component({
  selector: 'app-get-planned-route',
  templateUrl: './get-planned-route.component.html',
  styleUrls: ['./get-planned-route.component.css']
})
export class GetPlannedRouteComponent implements OnInit {
  @Input() networkChecker=0;
  @Output() getRouteAndTruckEvent = new EventEmitter<Map<string,string[]>>();

  plannedRoutes: PlannedRoute[];
  fleetPlaningId:string;
  truckId:string;
  date: string;
  totalTime: string;
  searchDate: string;
  routes: string[];
  plannedRoute:any;
  allTrucks:Truck[]=[];
  choice: string;
  constructor(private  plannedRouteService:PlannedRouteService,private trucksService:TrucksService) {}
  



  ngOnInit(): void {
    //this.getPlannedRoutes();
    this.getAllTrucks();
  }
  ngAfterViewInit(): void {
    this.turnOff(this.networkChecker);

  }

  submit = false;

  public getBestRoute():void{
    this.plannedRouteService.getBestRoute(this.date,this.truckId).subscribe(data => {
      this.plannedRoute=data;
      this.getRouteAndTruck();
    });
    this.plannedRoutes=[];
    this.submit = !this.submit;
  }
  public getNearestWarehouse():void{
    this.plannedRouteService.getNearestWarehouse(this.date,this.truckId).subscribe(data => {console.log(data);
      this.plannedRoute=data
      this.getRouteAndTruck();
    });
    this.plannedRoutes=[];
    this.submit = !this.submit;

  }

  public getRouteGreaterMass():void{
    this.plannedRouteService.getRouteGreaterMass(this.date,this.truckId).subscribe(data => {console.log(data);
      this.plannedRoute=data
      this.getRouteAndTruck();
    });
    this.plannedRoutes=[];
    this.submit = !this.submit;
  }

  public getRouteBestRelation():void{
    this.plannedRouteService.getRouteBestRelation(this.date,this.truckId).subscribe(data => {console.log(data);
      this.plannedRoute=data
      this.getRouteAndTruck();
    });
    this.plannedRoutes=[];
    this.submit = !this.submit;
  }

  public turnOff(checker:number){
   if(checker==1){
    let x1=document.getElementById("navBar")
    let x2=document.getElementById("truck")
     let x3=document.getElementById("truck1")

     if(x1!=null&&x2!=null&&x3!=null) {
      x1.style.display = "none"
      x2.style.display = "none"
       x3.style.display = "block"

     }
    }
  }
  public getAllTrucks(){
    this.trucksService.getTrucks().subscribe(data=>{
      this.allTrucks=data;
    })
  }
  public getRouteAndTruck(){
    let map=new Map<string,string[]>();
    map.set(this.truckId,this.plannedRoute);
    this.getRouteAndTruckEvent.emit(map);

  }


  callFunction(){
    switch(this.choice) {
      case "bestRoute": {
        this.getBestRoute();
        break;
      }
      case "nearestWarehouse": {
        this.getNearestWarehouse();
        break;
      }
      case "greaterMass": {
        this.getRouteGreaterMass();
        break;
      }
      case "bestRelation": {
        this.getRouteBestRelation();
        break;
      }
    }
  }
}

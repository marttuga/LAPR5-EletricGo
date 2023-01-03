import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTruckComponent } from './views/create-truck/create-truck.component';
import { FleetManagerComponent } from './views/fleet-manager/fleet-manager.component';
import {LoginComponent} from "./views/login/login.component";
import {NetworkComponent} from "./views/network/network.component";
import {WarehouseManagerComponent} from "./views/warehouse-manager/warehouse-manager.component";
import {LogisticsManagerComponent} from "./views/logistics-manager/logistics-manager.component";
import {CreateWarehouseComponent} from "./views/create-warehouse/create-warehouse.component";
import {CreateDeliveryComponent} from "./views/create-delivery/create-delivery.component";
import {CreateRouteComponent} from "./views/create-route/create-route.component";
import {ListWarehousesComponent} from "./views/list-warehouses/list-warehouses.component";
import {ListTruckComponent} from "./views/list-truck/list-truck.component";
import {ListDeliveriesComponent} from "./views/list-deliveries/list-deliveries.component";
import { GetPlannedRouteComponent } from './views/get-planned-route/get-planned-route.component';
import { ListRoutesComponent } from './views/list-routes/list-routes.component';
import { ListPlannedRoutesComponent } from './views/list-planned-routes/list-planned-routes.component';
import { CreateUserComponent } from './views/create-user/create-user.component';
import { AdminPageComponent } from './views/admin-page/admin-page.component';


const routes: Routes = [
  { path: '',redirectTo: '/views/login', pathMatch: 'full' },
  { path: 'views/login', component: LoginComponent},
  { path: 'views/network', component:NetworkComponent},
  { path: 'views/warehouse-manager', component:WarehouseManagerComponent},
  { path: 'views/logistics-manager', component:LogisticsManagerComponent},
  { path: 'views/fleet-manager', component:FleetManagerComponent},
  { path: 'views/create-truck', component:CreateTruckComponent},
  { path: 'views/create-delivery', component:CreateDeliveryComponent},
  { path: 'views/create-route', component:CreateRouteComponent},
  { path: 'views/create-warehouse', component:CreateWarehouseComponent},
  { path: 'views/create-truck', component:CreateTruckComponent},
  { path: 'views/create-delivery', component:CreateDeliveryComponent},
  {path: 'views/list-warehouses',  component:ListWarehousesComponent},
  { path: 'views/create-delivery', component:CreateDeliveryComponent},
  { path: 'views/list-truck', component:ListTruckComponent},
  { path: 'views/list-deliveries', component:ListDeliveriesComponent},
  { path: 'views/get-planned-route', component:GetPlannedRouteComponent},
  { path: 'views/list-routes', component:ListRoutesComponent},
  { path: 'views/list-planned-routes', component:ListPlannedRoutesComponent},
  { path: 'views/create-user', component:CreateUserComponent},
  { path: 'views/admin-page', component:AdminPageComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


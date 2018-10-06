import { Component, OnInit } from '@angular/core';
import { VehicleServiceService} from '../services/vehicle-service.service';
import {MatDialog} from '@angular/material';
import { NotificationsComponent} from '../notifications/notifications.component'
var vId;
@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  interval: any;
  allVehicles: any[];
  constructor(
    private getVehicles:VehicleServiceService,
    public dialog: MatDialog
  ) { };

  openDialog() {
    const dialogRef = this.dialog.open(AddVehiclePopup,{
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  };

  deleteConfirmDialog(vehicleId){
    const dialogRef = this.dialog.open(DeleteVehiclePopup,{
      height: '350px',
      width: '400px',
    });
    vId=vehicleId;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      //console.log( vehicleId);
    });
  };

  updateDialog(){
    const dialogRef = this.dialog.open(UpdateVehiclePopup,{
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.getVehicles.getAllVehicles().subscribe(result=>{
      this.allVehicles = result;
    });
    this.interval = setInterval(() => { 
      this.getVehicles.getAllVehicles().subscribe(result=>{
        this.allVehicles = result;
      });
    }, 1000);
  }
}

@Component({
  selector: 'add-vehicle-popup',
  templateUrl: 'add-vehicle-popup.html',
})
export class AddVehiclePopup {
  vehicleNo: String;
  deviceImei: String;
  userName: String;
  vehicleDetails: String;
  //notification: NotificationsComponent
  constructor(
    private addNewVehicles:VehicleServiceService,
    //private notification: NotificationsComponent
  ) { };


  addVehicle(){
    const vehicleObj = { 
      vehicleNo:this.vehicleNo,
	    Imie:this.deviceImei,
	    userName:this.userName,
	    details:this.vehicleDetails
    }
    this.addNewVehicles.addNewVehicle(vehicleObj).subscribe(res=>{
      if(res.success){
        //this.notification.showNotification('top','left');
        
      }
      else{

      };
    });
  };

  
}

@Component({
  selector: 'delete-vehicle-popup',
  templateUrl: 'delete-vehicle-popup.html',
})
export class DeleteVehiclePopup {
  constructor(
    private delVehicles:VehicleServiceService,
  ) { };
  deleteVehicle(){
    this.delVehicles.deleteVehicle(vId).subscribe(res=>{
      console.log(res);
    });
  }
}

@Component({
  selector: 'update-vehicle-popup',
  templateUrl: 'update-vehicle-popup.html',
})
export class UpdateVehiclePopup {
  constructor(
    private updVehicles:VehicleServiceService,
  ) { };
  updateVehicle(){
    // this.delVehicles.deleteVehicle(vId).subscribe(res=>{
    //   console.log(res);
    // });
  }
}


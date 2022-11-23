import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { ActivatedRoute, Router } from "@angular/router";
import TextSprite from "@seregpie/three.text-sprite";
import {Camera, CatmullRomCurve3, Object3D, PerspectiveCamera, Vector3} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {WarehousesService} from "../../services/dotnet/warehouses.service";
import {RoutesService} from "../../services/node/routes.service";


@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  //* Stage Properties;
  @Input() public cameraZ: number = 500; //* Aproximação da câmara || Coordenada Z
  @Input() public fieldOfView: number = 5;  //* Distância da câmara
  @Input('nearClipping') public nearClippingPlane: number = 1;//* Proximidade do plano
  @Input('farClipping') public farClippingPlane: number = 2000;//* Afastamento do plano

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  private warehouses:any[]=[];
  private routes:any[]=[];

  private warehouseBaseGeometry = new THREE.CylinderGeometry(2, 2, 0.22, 64);
  private warehouseBaseMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });


  constructor(private route: ActivatedRoute,private  warehousesService:WarehousesService, private routesService:RoutesService) { }

  ngOnInit(): void {

console.log(NetworkComponent.getAspectRatio())
  }

  ngAfterViewInit(): void {
    this.warehousesService.getWarehouses().subscribe(async data=>{
      this.warehouses=data;
      console.log(this.warehouses)

      this.routesService.getRoutes().subscribe(async data=>{
        this.routes=data;
        console.log(this.routes)
        await this.createScene();
        await this.startRenderingLoop();
      })
    })


  }

  private get canvas(): HTMLCanvasElement {
      return this.canvasRef.nativeElement;
  }

  private static getAspectRatio() {
    return window.innerWidth/ window.innerHeight;
  }

  private createScene() {

    //* Scene
    this.scene = new THREE.Scene();

    //* Camera
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      NetworkComponent.getAspectRatio(),
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ;

//this.camera.lookAt(new Vector3(2,-2,0));
    this.scene.add(this.camera);
    this.addWarehousesToScene()
    this.addLights()

  }



  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    //definir janela
    this.renderer.setSize(window.innerWidth,window.innerHeight);

    //Orbit Controls
    let controls = new OrbitControls(this.camera, this.renderer.domElement);

    controls.maxDistance = 1000;//900;
    controls.minDistance = 50;//100;
    controls.minAzimuthAngle = -Math.PI/2 ;//Rotação
    controls.maxAzimuthAngle = Math.PI/2 ;

    let component: NetworkComponent = this;
    (function render() {
      requestAnimationFrame(render);
      //render perspective camera/graph
      component.renderer.setViewport(-200, 0, window.innerWidth, window.innerHeight);
      component.renderer.setClearColor(0xCADFED, 1);
      component.renderer.render(component.scene, component.camera);

    }());
  }

  private addWarehousesToScene(){
    for (let i = 0; i < this.warehouses.length; i++)
    {

      const base = new THREE.Mesh(this.warehouseBaseGeometry, this.warehouseBaseMaterial);//*Base da Warehouse
      base.position.set(
        NetworkComponent.getCoordinates(this.warehouses[i].latitude, this.warehouses[i].longitude, this.warehouses[i].warehouseAltitude)[0],
        NetworkComponent.getCoordinates(this.warehouses[i].latitude, this.warehouses[i].longitude, this.warehouses[i].warehouseAltitude)[1],
        NetworkComponent.getCoordinates(this.warehouses[i].latitude, this.warehouses[i].longitude, this.warehouses[i].warehouseAltitude)[2]);

       base.name=this.warehouses[i].warehouseIdentifier;

       let sprite=new TextSprite({ text: this.warehouses[i].designation,alignment: 'left',
         color: '#000000',
         fontFamily: '"Times New Roman", Times, serif',
         fontStyle: 'italic', });
      sprite.position.setX(base.position.x);
      sprite.position.setY(base.position.y+2.3);
      sprite.position.setZ(base.position.z);
      this.scene.add(sprite)


      const loader = new GLTFLoader();
      loader.load('/assets/network/warehouse.glb', (gltf) => {
        gltf.scene.name = this.warehouses[i].designation;
        gltf.scene.position.set(base.position.x, base.position.y, base.position.z);
        gltf.scene.scale.set(0.1, 0.2, 0.1);
        this.scene.add(gltf.scene);

      }, undefined, function (error) {

        console.error(error);
      });
      this.scene.add(base);
      this.warehouseBaseMaterial.map = new THREE.TextureLoader().load('assets/network/rotunda.jpg');
    }
    this.addRoads();
  }



  private addRoads() {

    for (let i = 0; i < this.routes.length; i++) {
      let ware1 = <Object3D>this.scene.getObjectByName((this.routes[i].arrivalId));
      let ware2 = <Object3D>this.scene.getObjectByName((this.routes[i].departureId));

      if (ware1 != undefined && ware2 != undefined) {
        let points = [];
        points.push(new THREE.Vector3(ware1.position.x, ware1.position.y, ware1.position.z));
        points.push(new THREE.Vector3(ware2.position.x, ware2.position.y, ware2.position.z));



        let warehouseCubeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        let warehouseCubeGeometry =new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 4, 0.1, 28, false )
        warehouseCubeMaterial.map = new THREE.TextureLoader().load('assets/network/road1.jpg');
        let road=new THREE.Mesh(warehouseCubeGeometry,warehouseCubeMaterial);

        this.scene.add(road)
      }
    }
  }

  private addLights(){
    //*Light
    const light1 = new THREE.PointLight(0xFFFFFF, 1, 10000);
    light1.position.set(-window.innerWidth, 0, 0);
    this.scene.add(light1);
    const light2 = new THREE.PointLight(0xFFFFFF, 1, 10000);
    light2.position.set(window.innerWidth, 0, 0);
    this.scene.add(light2);
    const light3 = new THREE.PointLight(0xFFFFFF, 1, 10000);
    light3.position.set(0, -window.innerHeight, 0);
    this.scene.add(light3);
    const light4 = new THREE.PointLight(0xFFFFFF, 1, 10000);
    light4.position.set(0, window.innerHeight, 0);
    this.scene.add(light4);
    const light_amb = new THREE.AmbientLight(0x8080ff, 0.01);
    this.scene.add(light_amb);

    const focusLight = new THREE.SpotLight(0xffffff, 1);
    this.camera.add(focusLight);
  }


  private static getCoordinates(lat:number, lon:number, alt: number):any {
   let coordinatesArr: number[]=[];
    coordinatesArr[0]=(((50-(-50))/(8.7613-8.2451))*(lon-8.2451)+(-50));
    coordinatesArr[1]=((((50-(-50))/(42.1115-40.8387))*(lat-40.8387)+(-50)));
    coordinatesArr[2]=((((50 / 800) * alt))/10);
    parseInt( coordinatesArr[0].toFixed(4));
    parseInt( coordinatesArr[1].toFixed(4));
    parseInt( coordinatesArr[2].toFixed(4));
    return coordinatesArr;
  }

  onClick() {

  }

  onMouseMove(event: MouseEvent) {

  }

}

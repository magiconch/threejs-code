import * as THREE from "three";
import { AxesHelper, MeshLambertMaterial, Plane, PlaneGeometry } from "three";


/**
 * 第三节：添加一个坐标轴和一个底边
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerWidth);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;
camera.position.x = -1;
camera.position.y = 1;
camera.lookAt(scene.position);


// 光源直接放置于场景之上，光照颜色从天空光线颜色颜色渐变到地面光线颜色。
// skyColor: 天空中发出光线的颜色
// groundColor: 地面发出光线的颜色
const directionalLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(directionalLight);

function addAxes(): void {
    const axes = new AxesHelper(50);
    scene.add(axes);

}

function createPlane() {
    const planeGeometry = new PlaneGeometry(10, 10);
    const planeMaterial = new MeshLambertMaterial({ color: 0x222222});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);


    plane.rotateY(-0.5 * Math.PI);
    plane.rotateX(-0.5 * Math.PI);
}


function createBox(color: number): void {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial( {
        color: color
    });

    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    cube.position.y = 0.5;
    // cube.position.z = 1;    
    cube.rotateY(0.25* Math.PI);
    scene.add(cube);
}

createPlane();
createBox(0xff00ff);
addAxes();


renderer.render(scene, camera);

// 这里创建了几个webgl渲染？
// 
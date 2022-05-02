import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

/**
 * 材质篇：实现一个玻璃材质
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerHeight, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

// 光源直接放置于场景之上，光照颜色从天空光线颜色颜色渐变到地面光线颜色。
// skyColor: 天空中发出光线的颜色
// groundColor: 地面发出光线的颜色
const directionalLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(directionalLight);


// 添加背景
const bgTexture = new THREE.TextureLoader().load("../../asset/image/texture.jpg");
const bgGeometry = new THREE.PlaneGeometry(5, 5);
const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture });
const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
bgMesh.position.set(0, 0, -1);
scene.add(bgMesh);

// 
const hdrEquirect = new RGBELoader().load(
    "../../asset/image/empty_warehouse_01_2k.hdr",
    () => {
      hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
    }
  );

function createIcosahedron(): void {
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    // const meterial = new THREE.MeshNormalMaterial();

    /** 
     * matalness： 金属度
     * roughness： 粗糙度
     * reflectivity 反射度
    */
    const material = new THREE.MeshPhysicalMaterial({
       //  metalness: 0,
        roughness: 0,
        transmission: 1,
        // reflectivity: 0.5, // Add refraction!
        envMap: hdrEquirect
      });

      material.thickness = 1.5;

    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = 0;
    scene.add(cube);
    const animate = function () {
        requestAnimationFrame(animate);
    
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    
        renderer.render(scene, camera);
    };
    
    animate();
}

createIcosahedron();

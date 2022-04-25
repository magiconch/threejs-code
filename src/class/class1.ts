
import * as THREE from "three";



/**
 * 第一节：编写一个旋转的正方体
 */
const scene = new THREE.Scene();

// PerspectiveCamera 透视摄像机
// FOV 视野角度，视野角度就是无论在什么时候，你所能在显示器上看到的场景的范围，它的值是角度单位。
// aspect — 长宽比. Default value is 1.
// 近截面
// 远截面
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const geometry = new THREE.BoxGeometry(1, 1, 1);

// 我们需要让立方体能够反射光，所以不使用MeshBasicMaterial，而是改用MeshPhongMaterial
// const material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );

// 一种按深度绘制几何体的材质。深度基于相机远近平面。白色最近，黑色最远。
// const material = new THREE.MeshDepthMaterial();
const material = new THREE.MeshPhongMaterial({ color: 0x00ffff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);



camera.position.z = 2;

// 光源直接放置于场景之上，光照颜色从天空光线颜色颜色渐变到地面光线颜色。
// skyColor: 天空中发出光线的颜色
// groundColor: 地面发出光线的颜色
const directionalLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(directionalLight);

const animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();


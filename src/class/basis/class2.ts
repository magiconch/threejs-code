import * as THREE from "three";


/**
 * 第二节：编写三个旋转的正方体，并且有不同的颜色
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerWidth);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

// 光源直接放置于场景之上，光照颜色从天空光线颜色颜色渐变到地面光线颜色。
// skyColor: 天空中发出光线的颜色
// groundColor: 地面发出光线的颜色
const directionalLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(directionalLight);


function createBox(color: number, positionx: number): void {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial( {
        color: color
    });

    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = positionx
    scene.add(cube);
    const animate = function () {
        requestAnimationFrame(animate);
    
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    
        renderer.render(scene, camera);
    };
    
    animate();
}

createBox(0x00ffff, -2);
createBox(0xff00ff, 0);


// 这里创建了几个webgl渲染？
// 
import * as THREE from 'three';
import Stats from 'stats.js';

// ----- 주제: 초당 프레임 수 보기(Stats) three.js 에는 없어서 패키지 설치 해줘야됨 npm i stats.js

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.x = 1;
	camera.position.y = 3;
	camera.position.z = 0;
	scene.add(camera);

    //Light
    const ambientLight = new THREE.AmbientLight('white', 0.5); //전체적인 조명, 그림자 없음
    scene.add(ambientLight)
	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.x = 1;
	directionalLight.position.y = 2;
	scene.add(directionalLight);
    
    //AxesHelper
    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);

    //GridHelper
    const gridHelper = new THREE.GridHelper(5);
    scene.add(gridHelper);
    

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		color: 'seagreen'
	});
	const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 2;
    mesh.position.z = 2;
	scene.add(mesh);

    camera.lookAt(mesh.position);

    //Stats
    const stats = new Stats();
    document.body.append(stats.domElement);

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const time = clock.getElapsedTime();

        stats.update();//개발자 도구도 없애고 프레임 체크 하는게 좋음
		mesh.rotation.y = time;

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}

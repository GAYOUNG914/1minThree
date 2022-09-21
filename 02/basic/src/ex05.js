import * as THREE from 'three';

// ----- 주제: 기본 장면

export default function example() {
//Renderer

//html에서 캔버스 가져와서 사용하기
const canvas = document.querySelector('#three-canvas');
// const renderer = new WebGLRenderer({ canvas : canvas});
const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true, //선을 부드럽게 만들어주는 안티엘리어스 작업. 전체적인 성능은 떨어질 수 있다
    // alpha: true //배경 흰색
});
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(window.devicePixelRatio);//현재 디바이스가 사용하는 픽셀의 밀도
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); //레티나 사용해서 캔버스 크기를 배수로 늘리고 다시 압축시켜서 화질이 좋아보이게 만들어준다.(three.js에서 고해상도로 표현하게 하는 api))
// renderer.setClearColor('salmon'); //배경 색 바꾸기
// renderer.setClearAlpha(0.5); //배경 투명도

//Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color('blue');//renderer 보다 위에 있음

//Camera

//원근카메라 (Perspective Camera)
// const camera = new THREE.PerspectiveCamera(
//     75, //시야각(field of view)
//     window.innerWidth / window.innerHeight, //종횡비(aspect)
//     0.1, //near
//     1000 //far
// );

// camera.position.x = 1;
// camera.position.y = 2;
// camera.position.z = 5;

//직교카메라 (Orthographic Camera)
const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), //left
    window.innerWidth / window.innerHeight, //right
    1, //top
    -1, //bottom
    0.1,
    1000
);

camera.position.z = 5;
camera.lookAt(0,0,0);
//줌아웃같은 효과를 원하면 줌 api 써야됨. 업데이트 프로젝션 매트릭스 호출도 꼭 같이.
// camera.zoom = 0.5;
// camera.updateProjectionMatrix();
scene.add(camera);

const light = new THREE.DirectionalLight(0xffffff, 1); // 인자 : 빛 색깔, 빛 강도
light.position.x = 0;
light.position.z = 2;
scene.add(light);

//Mesh //Mesh는 geometry, material로 이루어짐
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({ 
        color: '#ff0000'
    });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 그리기

//디바이스간의 성능 갭을 줄여주기 위함
const clock = new THREE.Clock();

function draw() {
    const time = clock.getElapsedTime();
    //각도는 radian을 사용
    //360도는 2파이
    // mesh.rotation.y += 0.01;
    // mesh.rotation.y += THREE.MathUtils.degToRad(0.5); // 회전율을 라디안으로 바꿔주는 api
    mesh.rotation.y = 0.5 * time; //어떤 디바이스에서든 같은 시간동안 같은 거리 움직이기
    // mesh.position.y += 0.01; // 회전율을 라디안으로 바꿔주는 api
    mesh.position.y = time;
    if(mesh.position.y > 1){
        mesh.position.y = 0;
    }
    renderer.render(scene, camera);

    // window.requestAnimationFrame(draw); // 애니매이션 줄 때 이 api 자주 사용
    renderer.setAnimationLoop(draw); // ar, vr 만들 때 이 api 자주 사용
}

    function setSize() {
        //카메라
        camera.aspect = window.innerWidth / window.innerHeight;
        //updateProjectionMatrix 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

//이벤트
window.addEventListener('resize',setSize);

draw();
}


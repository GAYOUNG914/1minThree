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
});
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(window.devicePixelRatio);//현재 디바이스가 사용하는 픽셀의 밀도
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); //레티나 사용해서 캔버스 크기를 배수로 늘리고 다시 압축시켜서 화질이 좋아보이게 만들어준다.(three.js에서 고해상도로 표현하게 하는 api))

//Scene
const scene = new THREE.Scene();

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
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;
camera.lookAt(0,0,0);
//줌아웃같은 효과를 원하면 줌 api 써야됨. 업데이트 프로젝션 매트릭스 호출도 꼭 같이.
// camera.zoom = 0.5;
// camera.updateProjectionMatrix();
scene.add(camera);

//Mesh //Mesh는 geometry, material로 이루어짐
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
    // color: 0xff0000
    // color: 'red'
    color: '#ff0000'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 그리기
renderer.render(scene, camera);

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
}


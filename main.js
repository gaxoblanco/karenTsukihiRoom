import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import { dracoModel } from './components/dracoModel'
import {spotLightII} from './components/spotLight'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

// addScene, GLTFLoader(config to dracoLoader), ../Obj.gltf 
dracoModel(scene, gltfLoader, '/models/bed/bed.gltf')
dracoModel(scene, gltfLoader, '/models/cajonera/cajonera.gltf')
dracoModel(scene, gltfLoader, '/models/chears/chears.gltf')
dracoModel(scene, gltfLoader, '/models/desk-objs/desk-objs.gltf')
dracoModel(scene, gltfLoader, '/models/lights/lightModel.gltf')
dracoModel(scene, gltfLoader, '/models/pared-suelo/floor-wall.gltf')
dracoModel(scene, gltfLoader, '/models/sofa/sofaGLB.gltf')
dracoModel(scene, gltfLoader, '/models/stairs/stairs.gltf')
dracoModel(scene, gltfLoader, '/models/windows/windows.gltf')




/**
 * Lights
 */
 const ambientLight = new THREE.AmbientLight(0xffffff, 1.6)
 scene.add(ambientLight)

// spotLight - addScene, watts,distance,aperture positionXYZ, directionXYZ, 
spotLightII(scene, 3,27,0.4, -23,21,0, -24,0,0)
spotLightII(scene, 30,27,0.4, 23,21,0, 23,0,0)

spotLightII(scene, 3,12,0.2, -20.8,5,-24.8, -23.94,-0.4,-21)
spotLightII(scene, 5,12,0.2, 26.79,4.93,-25.36, 23,-1.94,-24)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(8, 3, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
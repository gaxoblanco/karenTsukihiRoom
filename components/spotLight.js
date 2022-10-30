import * as THREE from 'three'


export const spotLightII = (scene, W,distance,aperture, Px,Py,Pz, Dx,Dy,Dz,) => {
    const spotLight = new THREE.SpotLight(0xffffff, W, distance, Math.PI * aperture, 0.25, 3)
    // spotLight.quaternion.set(20,20,20)
    spotLight.position.set (Px, Py, Pz)
    spotLight.target.position.set (Dx,Dy,Dz)
    scene.add(spotLight)
    scene.add(spotLight.target)
    console.log('spot-target-position',spotLight.target.position);

}
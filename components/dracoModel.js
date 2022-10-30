import * as THREE from 'three'

export const dracoModel = (scene, gltfLoader, obj) => {

    gltfLoader.load(obj,
        //load de model 
        (gltf) =>{

            const children = [...gltf.scene.children]
            for (const child of children) {
                scene.add(child)
            }
        },
        () => {
            console.log('progress');
        },
        () => {
            console.error('error');
        }
    )
}
YUI.add('WG.Objects.Cube', function (Y) {
    
    Y.namespace('WG.Objects').Cube = Y.Base.create('WG.Objects.Cube', Y.WG.Core.Object, [], {

        /**
         * Constructor
         *
         */
        initializer: function (options) {

            // Create a shaded, texture-mapped cube and add it to the scene
            // First, create the texture map
            var mapUrl = 'img/cactuar.png';
                map = THREE.ImageUtils.loadTexture(mapUrl);

            // Now, create a Phong material to show shading; pass in the map
            var material = new THREE.MeshPhongMaterial({ map: map });
            
            // Create the cube geometry
            var geometry = new THREE.CubeGeometry(1, 1, 1);            

            // And put the geometry and material together into a mesh
            var mesh = new THREE.Mesh(geometry, material);
            
            // Turn it toward the scene, or we won't see the cube shape!
            mesh.rotation.x = Math.PI / 5;
            mesh.rotation.y = Math.PI / 5;

            // Tell the framework about our object
            this.setObject3D(mesh);
        },

        /**
         *
         *
         */
         update: function () {

            this.object3D.rotation.z += 0.01;
            this.object3D.rotation.y -= 0.01;
        }
    },
    {
        ATTRS: {}
    });

}, '1.0.0', { requires: ['WG.Core.Object'] });

YUI.add('WG.Objects.Earth', function (Y) {
    
    Y.namespace('WG.Objects').Earth = Y.Base.create('WG.Objects.Earth', Y.WG.Core.Object, [], {

        ROTATION_Y: 0.0025,
        TILT: 0.41,

        /**
         * Constructor
         *
         */
        initializer: function (options) {

            // Create our Earth with nice texture
            var earthmap = "img/earth-surface.jpg";
            var geometry = new THREE.SphereGeometry(1, 32, 32);
            var texture = THREE.ImageUtils.loadTexture(earthmap);
            var material = new THREE.MeshBasicMaterial( { map: texture } );
            var mesh = new THREE.Mesh( geometry, material );
            // Let's work in the tilt
            mesh.rotation.z = this.TILT;
            // Tell the framework about our object
            this.setObject3D(mesh);
        },

        /**
         *
         *
         */
         update: function () {

            // "I feel the Earth move..."
            this.object3D.rotation.y += this.ROTATION_Y;
        }
    },
    {
        ATTRS: {}
    });

}, '1.0.0', { requires: ['WG.Core.Object'] });

YUI.add('WG.Objects.StarFighter', function (Y) {
    
    Y.namespace('WG.Objects').StarFighter = Y.Base.create('WG.Objects.StarFighter', Y.WG.Core.Object, [], {

        /**
         * Constants
         *
         */
        ROTATION_Y: 0.01,

        /**
         * Constructor
         *
         */
        initializer: function (options) {

            var group = new THREE.Object3D;

            var scale = 1;
            this.scale = new THREE.Vector3(scale, scale, scale);

            var loader = new THREE.JSONLoader();
            loader.load('models/pony_basemesh.js', Y.bind(this._handleLoaded, this));

            // Tell the framework about our object
            this.setObject3D(group);
        },

        /**
         *
         *
         */
        _handleLoaded: function(data) {
            
            if (data instanceof THREE.Geometry) {
                var geometry = data;
                // Just in case model doesn't have normals
                geometry.computeVertexNormals();

                var material = new THREE.MeshPhongMaterial();
                var mesh = new THREE.Mesh(geometry, material);
                mesh.scale.copy(this.scale);
                this.object3D.add(mesh);
            }
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

}, '1.0.0', { requires: ['WG.Core.App'] });
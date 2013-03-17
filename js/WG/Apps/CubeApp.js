YUI.add('WG.Apps.CubeApp', function (Y) {
    
    Y.namespace('WG.Apps').CubeApp = Y.Base.create('WG.Apps.CubeApp', Y.WG.Core.App, [], {

        /**
         * Constructor
         *
         */
        initializer: function (options) {

            var cube = new Y.WG.Objects.Cube();
            this.addObject(cube);

            // Create a directional light to show off the object
            var light = new THREE.DirectionalLight(0xffffff, 1.5);
            light.position.set(0, 0, 1);
            this.scene.add(light);
        }

    },
    {
        ATTRS: {}
    });

}, '1.0.0', { requires: ['WG.Core.App', 'WG.Objects.Cube'] });
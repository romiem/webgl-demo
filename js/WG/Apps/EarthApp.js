YUI.add('WG.Apps.EarthApp', function (Y) {
    
    Y.namespace('WG.Apps').EarthApp = Y.Base.create('WG.Apps.EarthApp', Y.WG.Core.App, [], {

        /**
         * Constructor
         *
         */
        initializer: function (options) {

            // Create the Earth and add it to our sim
            var earth = new Y.WG.Objects.Earth();
            this.addObject(earth);

            // Add a light
            this.scene.add(new THREE.AmbientLight(0x505050));
        }

    },
    {
        ATTRS: {}
    });

}, '1.0.0', { requires: ['WG.Core.App', 'WG.Objects.Earth'] });
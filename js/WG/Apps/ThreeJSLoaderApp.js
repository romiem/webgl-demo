YUI.add('WG.Apps.ThreeJSLoaderApp', function (Y) {
    
    Y.namespace('WG.Apps').ThreeJSLoaderApp = Y.Base.create('WG.Apps.ThreeJSLoaderApp', Y.WG.Core.App, [], {

        /**
         * Constructor
         *
         */
        initializer: function (options) {

            var starFighter = new Y.WG.Objects.StarFighter();
            this.addObject(starFighter);

            starFighter.object3D.rotation.x += 0.4;

            // Create a directional light to show off the object
            var light = new THREE.DirectionalLight(0xffffff, 0.5);
            light.position.set(0, 0, 1);
            this.scene.add(light);
        }

    },
    {
        ATTRS: {}
    });

}, '1.0.0', { requires: ['WG.Core.App', 'WG.Objects.StarFighter'] });
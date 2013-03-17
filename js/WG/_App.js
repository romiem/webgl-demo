YUI.add('WG.App', function (Y) {
    
    Y.namespace('WG').App = Y.Base.create('WG.App', Y.Base, [], {

        /**
         * Public vars
         *
         */
        node: null,

        /**
         * Private vars
         *
         */
        _renderer: null,
        _scene: null,
        _camera: null,
        _cube: null,
        _animating: false,

        /**
         * Constructor
         *
         */
        initializer: function (options) {

            this.node = Y.one('#app');

            this._render();
        },

        /**
         * Render UI
         *
         */
        _render: function () {

            var container = this.node.getDOMNode();

            // Create the Three.js renderer, add it to our div
            this._renderer = new THREE.WebGLRenderer( { antialias: true } );
            this._renderer.setSize(container.offsetWidth, container.offsetHeight);
            container.appendChild( this._renderer.domElement );
            
            // Create a new Three.js scene
            this._scene = new THREE.Scene();
            
            // Put in a camera
            this._camera = new THREE.PerspectiveCamera( 45,
                container.offsetWidth / container.offsetHeight, 1, 4000 );
            this._camera.position.set( 0, 0, 3 );
            
            // Create a directional light to show off the object
            var light = new THREE.DirectionalLight( 0xffffff, 1.5);
            light.position.set(0, 0, 1);
            this._scene.add( light );

            // Create a shaded, texture-mapped cube and add it to the scene
            // First, create the texture map
            var mapUrl = 'img/cactuar.png';
            var map = THREE.ImageUtils.loadTexture(mapUrl);
            
            // Now, create a Phong material to show shading; pass in the map
            var material = new THREE.MeshPhongMaterial({ map: map });
            
            // Create the cube geometry
            var geometry = new THREE.CubeGeometry(1, 1, 1);
            
            // And put the geometry and material together into a mesh
            this._cube = new THREE.Mesh(geometry, material);
            
            // Turn it toward the scene, or we won't see the cube shape!
            this._cube.rotation.x = Math.PI / 5;
            this._cube.rotation.y = Math.PI / 5;
            
            // Add the cube to our scene
            this._scene.add( this._cube );

            // Add a mouse up handler to toggle the animation
            this._addMouseHandler();
            
            // Run our render loop
            this._run();
        },

        /**
         *
         *
         */
        _run: function () {
        
            // Render the scene
            this._renderer.render( this._scene, this._camera );
            
            // Spin the cube for next frame
            if (this._animating) {
                this._cube.rotation.z += 0.01;
                this._cube.rotation.y -= 0.01;
            }
            // Ask for another frame
            requestAnimationFrame(Y.bind(this._run, this));
        },

        /**
         *
         *
         */
        _addMouseHandler: function () {

            var dom = this._renderer.domElement;
            dom.addEventListener( 'mouseup', Y.bind(this._onMouseUp, this), false);
        },

        /**
         *
         *
         */
        _onMouseUp: function (event) {

            event.preventDefault();
            this._animating = !this._animating;
        }

    },
    {
        ATTRS: {}
    });

}, '1.0.0', { requires: [] });
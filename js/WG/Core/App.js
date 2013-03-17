YUI.add('WG.Core.App', function (Y) {
    
    Y.namespace('WG.Core').App = Y.Base.create('WG.Core.App', Y.Base, [], {

        /**
         * Public vars
         *
         */
        node: null,
        canvas: null,
        renderer: null,
        scene: null,
        camera: null,
        objects: null,
        root: null,
        projector: null,

        /**
         * Private vars
         *
         */

        /**
         * Constructor
         *
         */
        initializer: function (options) {

            this.node = options.node;
            this.canvas = options.canvas;
            
            var width = this.node.getDOMNode().offsetWidth,
                height = this.node.getDOMNode().offsetHeight;

            // Create renderer
            this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.canvas });
            this.renderer.setSize(width, height);
            this.node.append(this.renderer.domElement);

            // Create scene
            this.scene = new THREE.Scene();
            this.scene.data = this;

            // Put in a camera at a good default location
            this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
            this.camera.position.set(0, 0, 3.3333);
            this.scene.add(this.camera);

            this.objects = [];

            // Create a root object to contain all other scene objects
            this.root = new THREE.Object3D();
            this.scene.add(this.root);
            
            // Create a projector to handle picking
            this.projector = new THREE.Projector();

            // Set up event handlers
            //this.initMouse();
            //this.initKeyboard();
            this.addDomHandlers();
        },

        //Core run loop
        run: function()
        {
            this.update();
            this.renderer.render( this.scene, this.camera );
            var that = this;
            requestAnimationFrame(function() { that.run(); });  
        },

        // Update method - called once per tick
        update: function()
        {
            var i, len;
            len = this.objects.length;
            for (i = 0; i < len; i++)
            {
                this.objects[i].update();
            }
        },

        // Add/remove objects
        addObject: function(obj)
        {
            this.objects.push(obj);

            // If this is a renderable object, add it to the root scene
            if (obj.object3D)
            {
                this.root.add(obj.object3D);
            }
        },

        removeObject: function(obj)
        {
            var index = this.objects.indexOf(obj);
            if (index != -1)
            {
                this.objects.splice(index, 1);
                // If this is a renderable object, remove it from the root scene
                if (obj.object3D)
                {
                    this.root.remove(obj.object3D);
                }
            }
        },

        // Event handling
        initMouse: function()
        {
            var dom = this.renderer.domElement;

            var that = this;
            dom.addEventListener( 'mousemove', 
                    function(e) { that.onDocumentMouseMove(e); }, false );
            dom.addEventListener( 'mousedown', 
                    function(e) { that.onDocumentMouseDown(e); }, false );
            dom.addEventListener( 'mouseup', 
                    function(e) { that.onDocumentMouseUp(e); }, false );

            $(dom).mousewheel(
                    function(e, delta) {
                        that.onDocumentMouseScroll(e, delta);
                    }
                );

            this.overObject = null;
            this.clickedObject = null;
        },

        initKeyboard: function()
        {
            var dom = this.renderer.domElement;

            var that = this;
            dom.addEventListener( 'keydown', 
                    function(e) { that.onKeyDown(e); }, false );
            dom.addEventListener( 'keyup', 
                    function(e) { that.onKeyUp(e); }, false );
            dom.addEventListener( 'keypress', 
                    function(e) { that.onKeyPress(e); }, false );

            // so it can take focus
            dom.setAttribute("tabindex", 1);
            dom.style.outline='none';
        },

        addDomHandlers: function()
        {
            var that = this;
            window.addEventListener( 'resize', function(event) { that.onWindowResize(event); }, false );
        },

        onDocumentMouseMove: function(event)
        {
            event.preventDefault();
            
            if (this.clickedObject && this.clickedObject.handleMouseMove)
            {
                var hitpoint = null, hitnormal = null;
                var intersected = this.objectFromMouse(event.pageX, event.pageY);
                if (intersected.object == this.clickedObject)
                {
                    hitpoint = intersected.point;
                    hitnormal = intersected.normal;
                }
                this.clickedObject.handleMouseMove(event.pageX, event.pageY, hitpoint, hitnormal);
            }
            else
            {
                var handled = false;

                var oldObj = this.overObject;
                var intersected = this.objectFromMouse(event.pageX, event.pageY);
                this.overObject = intersected.object;

                if (this.overObject != oldObj)
                {
                    if (oldObj)
                    {
                        this.container.style.cursor = 'auto';
                        
                        if (oldObj.handleMouseOut)
                        {
                            oldObj.handleMouseOut(event.pageX, event.pageY);
                        }
                    }

                    if (this.overObject)
                    {
                        if (this.overObject.overCursor)
                        {
                            this.container.style.cursor = this.overObject.overCursor;
                        }

                        if (this.overObject.handleMouseOver)
                        {
                            this.overObject.handleMouseOver(event.pageX, event.pageY);
                        }
                    }

                    handled = true;
                }

                if (!handled && this.handleMouseMove)
                {
                    this.handleMouseMove(event.pageX, event.pageY);
                }
            }
        },

        onDocumentMouseDown: function(event)
        {
            event.preventDefault();
                
            var handled = false;

            var intersected = this.objectFromMouse(event.pageX, event.pageY);
            if (intersected.object)
            {
                if (intersected.object.handleMouseDown)
                {
                    intersected.object.handleMouseDown(event.pageX, event.pageY, intersected.point, intersected.normal);
                    this.clickedObject = intersected.object;
                    handled = true;
                }
            }
            
            if (!handled && this.handleMouseDown)
            {
                this.handleMouseDown(event.pageX, event.pageY);
            }
        },

        onDocumentMouseUp: function(event)
        {
            event.preventDefault();
            
            var handled = false;
            
            var intersected = this.objectFromMouse(event.pageX, event.pageY);
            if (intersected.object)
            {
                if (intersected.object.handleMouseUp)
                {
                    intersected.object.handleMouseUp(event.pageX, event.pageY, intersected.point, intersected.normal);
                    handled = true;
                }
            }
            
            if (!handled && this.handleMouseUp)
            {
                this.handleMouseUp(event.pageX, event.pageY);
            }
            
            this.clickedObject = null;
        },

        onDocumentMouseScroll: function(event, delta)
        {
            event.preventDefault();

            if (this.handleMouseScroll)
            {
                this.handleMouseScroll(delta);
            }
        },

        objectFromMouse: function(pagex, pagey)
        {
            // Translate page coords to element coords
            var offset = $(this.renderer.domElement).offset();  
            var eltx = pagex - offset.left;
            var elty = pagey - offset.top;

            // Translate client coords into viewport x,y
            var vpx = ( eltx / this.container.offsetWidth ) * 2 - 1;
            var vpy = - ( elty / this.container.offsetHeight ) * 2 + 1;
            
            var vector = new THREE.Vector3( vpx, vpy, 0.5 );

            this.projector.unprojectVector( vector, this.camera );

            var ray = new THREE.Ray( this.camera.position, vector.subSelf( this.camera.position ).normalize() );

            var intersects = ray.intersectScene( this.scene );

            if ( intersects.length > 0 ) {      
                
                var i = 0;
                while(!intersects[i].object.visible)
                {
                    i++;
                }
                
                var intersected = intersects[i];
                var mat = new THREE.Matrix4().getInverse(intersected.object.matrixWorld);
                var point = mat.multiplyVector3(intersected.point);
                
                return (this.findObjectFromIntersected(intersected.object, intersected.point, intersected.face.normal));                                                 
            }
            else
            {
                return { object : null, point : null, normal : null };
            }
        },

        findObjectFromIntersected: function(object, point, normal)
        {
            if (object.data)
            {
                return { object: object.data, point: point, normal: normal };
            }
            else if (object.parent)
            {
                return this.findObjectFromIntersected(object.parent, point, normal);
            }
            else
            {
                return { object : null, point : null, normal : null };
            }
        },


        onKeyDown: function(event)
        {
            // N.B.: Chrome doesn't deliver keyPress if we don't bubble... keep an eye on this
            event.preventDefault();

            if (this.handleKeyDown)
            {
                this.handleKeyDown(event.keyCode, event.charCode);
            }
        },

        onKeyUp: function(event)
        {
            // N.B.: Chrome doesn't deliver keyPress if we don't bubble... keep an eye on this
            event.preventDefault();

            if (this.handleKeyUp)
            {
                this.handleKeyUp(event.keyCode, event.charCode);
            }
        },

        onKeyPress: function(event)
        {
            // N.B.: Chrome doesn't deliver keyPress if we don't bubble... keep an eye on this
            event.preventDefault();

            if (this.handleKeyPress)
            {
                this.handleKeyPress(event.keyCode, event.charCode);
            }
        },

        onWindowResize: function(event) {

            this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);

            this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
            this.camera.updateProjectionMatrix();

        },

        focus: function()
        {
            if (this.renderer && this.renderer.domElement)
            {
                this.renderer.domElement.focus();
            }
        }

    },
    {
        ATTRS: {}
    });

}, '1.0.0', { requires: [] });
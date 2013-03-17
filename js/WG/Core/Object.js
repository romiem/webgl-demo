YUI.add('WG.Core.Object', function (Y) {
    
    Y.namespace('WG.Core').Object = Y.Base.create('WG.Core.Object', Y.Base, [], {

        /**
         * Private vars
         *
         */
        object3D: null,
        children: null,

        /**
         * Constructor
         *
         */
        initializer: function (options) {

            this.object3D = null;
            this.children = [];
        },

        /**
         *
         *
         */
        update: function () {

            this.updateChildren();
        },

        // setPosition - move the object to a new position
        setPosition: function(x, y, z) {
            if (this.object3D)
            {
                this.object3D.position.set(x, y, z);
            }
        },

        //setScale - scale the object
        setScale: function(x, y, z) {
            if (this.object3D)
            {
                this.object3D.scale.set(x, y, z);
            }
        },

        //setScale - scale the object
        setVisible: function(visible) {
            
            function setVisible(obj, visible)
            {
                obj.visible = visible;
                var i, len = obj.children.length;
                for (i = 0; i < len; i++)
                {
                    setVisible(obj.children[i], visible);
                }
            }

            if (this.object3D)
            {
                setVisible(this.object3D, visible);
            }
        },

        // updateChildren - update all child objects
        updateChildren: function() {

            var i, len;
            len = this.children.length;
            for (i = 0; i < len; i++)
            {
                this.children[i].update();
            }
        },

        setObject3D: function(object3D) {

            object3D.data = this;
            this.object3D = object3D;
        },

        //Add/remove children
        addChild: function(child) {

            this.children.push(child);

            // If this is a renderable object, add its object3D as a child of mine
            if (child.object3D)
            {
                this.object3D.add(child.object3D);
            }
        },

        removeChild: function(child) {

            var index = this.children.indexOf(child);
            if (index != -1)
            {
                this.children.splice(index, 1);
                // If this is a renderable object, remove its object3D as a child of mine
                if (child.object3D)
                {
                    this.object3D.remove(child.object3D);
                }
            }
        },

        // Some utility methods
        getScene: function() {

            var scene = null;
            if (this.object3D)
            {
                var obj = this.object3D;
                while (obj.parent)
                {
                    obj = obj.parent;
                }

                scene = obj;
            }

            return scene;
        },

        getApp: function() {
            var scene = this.getScene();
            return scene ? scene.data : null;
        }

    },
    {
        ATTRS: {}
    });

}, '1.0.0', { requires: ['base'] });
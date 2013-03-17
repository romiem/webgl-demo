(function () {

    var modules = {

        'WG.Core': {
            use: ['WG.Core.App', 'WG.Core.Object']
        },
        'WG.Core.App': {
            fullpath: 'js/WG/Core/App.js'
        },
        'WG.Core.Object': {
            fullpath: 'js/WG/Core/Object.js'
        },

        'WG.Apps': {
            use: ['WG.Apps.CubeApp', 'WG.Apps.EarthApp', 'WG.Apps.ThreeJSLoaderApp']
        },        
        'WG.Apps.CubeApp': {
            fullpath: 'js/WG/Apps/CubeApp.js'
        },
        'WG.Apps.EarthApp': {
            fullpath: 'js/WG/Apps/EarthApp.js'
        },
        'WG.Apps.ThreeJSLoaderApp': {
            fullpath: 'js/WG/Apps/ThreeJSLoaderApp.js'
        },

        'WG.Objects.Earth': {
            fullpath: 'js/WG/Objects/Earth.js'
        },
        'WG.Objects.Cube': {
            fullpath: 'js/WG/Objects/Cube.js'
        },
        'WG.Objects.StarFighter': {
            fullpath: 'js/WG/Objects/StarFighter.js'
        },

        'WG.Meshes.Plane': {
            fullpath: 'js/WG/Meshes/Plane.js'
        }
    };

    // Register custom modules
    YUI({ modules: modules });
    
    /**
     * Start application
     *
     */
    YUI().use('node', 'base', 'WG.Core', 'WG.Apps', function (Y) {

        var node = Y.one('#app');

        // CubeApp
        //var app = new Y.WG.Apps.CubeApp({ node: node });
        
        // EarthApp
        //var app = new Y.WG.Apps.EarthApp({ node: node });
        
        // Three JSON loader
        var app = new Y.WG.Apps.ThreeJSLoaderApp({ node: node });

        app.run();

        /*
        var app = new Y.WG.App();

        var shape = Y.Base.create('Shape', Y.Base, [], {
            sides:null,
            initializer: function () {
                console.log('Shape:init');
          },
            render: function () {
                console.log('Shape:render');
            }
        });

        var square = Y.Base.create('Square', shape, [], {
            initializer: function () {
                console.log('Square:init');
                this.sides = 4;
                this.render();
            },
            render: function () {
                square.superclass.render.apply(this, arguments);
                console.log('Square:render');
            }
        });

        var sq = new square();
        */

    });

})();

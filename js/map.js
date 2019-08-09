// Initialize map
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2hlcm1hbnQiLCJhIjoiY2pncDUwcnRmNDQ4ZjJ4czdjZXMzaHZpNyJ9.3rFyYRRtvLUngHm027HZ7A';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ghermant/cjydrh8o43d8r1dnjmomx9x7b',
    center: [134.15, 43.34],
    zoom: 8,
});


// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl(), 'top-left');
map.addControl(new mapboxgl.ScaleControl(), 'bottom-right');


// Draw map
map.on('load', function () {
    // Файлы с данными
    // Add geodata as source

    // Заповедник одной точкой
    map.addSource('one', {
        type: 'geojson',
        data: './data/one.geojson'
    })

    // Заповедник двумя точками
    map.addSource('two', {
        type: 'geojson',
        data: './data/two.geojson'
    })

    // Кордоны
    map.addSource('kordon', {
        type: 'geojson',
        data: './data/kordon.geojson',
    })

    // Контора
    map.addSource('kontora', {
        type: 'geojson',
        data: './data/kontora.geojson',
    })

    // Вершины
    map.addSource('mountains', {
        type: 'geojson',
        data: './data/mountains.geojson',
    })

    // Реки
    map.addSource('rivers', {
        type: 'geojson',
        data: './data/rivers.geojson',
    })


    // Слои
    // Add geodata to the map as a layer 
    // Одной точкой
    map.addLayer({
        id: 'one',
        type: 'symbol',
        // Add a GeoJSON source containing place coordinates and information.
        source: 'one',
        layout: {
            'icon-image': 'park-15',
            'icon-allow-overlap': true,
        },
        maxzoom: 4
    });

    // Двумя точками
    map.addLayer({
        id: 'two',
        type: 'symbol',
        // Add a GeoJSON source containing place coordinates and information.
        source: 'two',
        layout: {
            'icon-image': 'park-11',
            'icon-allow-overlap': true,
        },
        minzoom: 4,
        maxzoom: 7
    });

    // Реки
    map.addLayer({
        id: 'rivers',
        type: 'line',
        // Add a GeoJSON source containing place coordinates and information.
        source: 'rivers',
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#03dffc",
            "line-width": 4,
            "line-opacity": 0.4
        },
        minzoom: 7
    }, 'settlement-label');

    // Реки, подсветка при выборе
    map.addLayer({
        id: 'rivers-highlighted',
        type: 'line',
        // Add a GeoJSON source containing place coordinates and information.
        source: 'rivers',
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#03dffc",
            "line-width": 5,
            "line-opacity": 1
        },
        // none can be selected by the filter, we'll set it later in 'Highlight rivers'
        filter: ["in", "id", ""], 
        minzoom: 7
    }, 'settlement-label');

    // Вершины
    map.addLayer({
        id: 'mountains',
        type: 'symbol',
        // Add a GeoJSON source containing place coordinates and information.
        source: 'mountains',
        layout: {
            'icon-image': 'mountain-11',
            'icon-allow-overlap': true,
        },
        minzoom: 7
    });

    // Контора
    map.addLayer({
        id: 'kontora',
        type: 'symbol',
        // Add a GeoJSON source containing place coordinates and information.
        source: 'kontora',
        layout: {
            'icon-image': 'town-hall-15',
            'icon-allow-overlap': true,
        },
        minzoom: 7
    }, 'settlement-label');

    // Кордоны
    map.addLayer({
        id: 'kordon',
        type: 'symbol',
        // Add a GeoJSON source containing place coordinates and information.
        source: 'kordon',
        layout: {
            'icon-image': 'ranger-station-15',
            'icon-allow-overlap': true,
        },
        minzoom: 7
    });



    // Всплывающие окна
    // Функция вывода информации о слое
    var showInfo = function(e) {
        // Show info in sidebar

        // Title
        document.getElementById("infoTitle").innerHTML = ''  // clear content
        var name = e.features[0].properties.name
        document.getElementById("infoTitle").innerHTML = name

        // Information
        document.getElementById("info").innerHTML = ''  // clear content
        var descr = e.features[0].properties.description
        console.log(descr)
        if (descr && descr != 'null') {  // check if null is a string 'null'
            document.getElementById("info").innerHTML = descr
        }

        // Photo
        document.getElementById("gallery").getElementsByTagName("h3")[0].style.display = "none"
        document.getElementById("lightgallery").innerHTML = ''  // clear content
        var photos = e.features[0].properties.photos
        if (photos && photos != 'null') {  // check if null is a string 'null'
            photos = JSON.parse(photos)
            document.getElementById("gallery").getElementsByTagName("h3")[0].style.display = "block"
            photos.forEach(function (ph) {
                // УКАЗАТЬ КОРРЕКТНЫЕ ПАПКИ ПРИ НЕОБХОДИМОСТИ
                link = './photos/' + ph.link  // photos are stored in './photos/' folder
                thumb = './thumbs/' + ph.link  // thumbs are stored in './thumbs/' folder
                document.getElementById("lightgallery").innerHTML += '<a href="' + link + '" data-sub-html="' + ph.title + '">' +
                    '<img src="' + thumb + '" style="border: 2px solid rgba(0, 0, 0, 0)">' +
                    '</a>'
            })
            lightGallery(document.getElementById("lightgallery"));  // initialize lightGallery
        }


        // Documents
        document.getElementById("documentation").getElementsByTagName("h3")[0].style.display = "none"
        document.getElementById("docs").innerHTML = '<ol></ol>'  // clear content
        var docs = e.features[0].properties.docs
        if (docs && docs != 'null') {
            docs = JSON.parse(docs)
            document.getElementById("documentation").getElementsByTagName("h3")[0].style.display = "block"
            docs.forEach(function (doc) {
                document.getElementById("docs").getElementsByTagName("ol")[0].innerHTML += '<li><a href="' + doc.link + '" target="_blank">' +
                    doc.title +
                    '</a></li>'
            })
        }
    }

    // Слои
    var layers = ['one', 'two', 'kordon', 'kontora', 'mountains', 'rivers']
    layers.forEach(function (lr) {
        // Информация о слое
        map.on('click', lr, showInfo);

        // Change the cursor to a pointer when the mouse is over the places layer and change it back to a pointer when it leaves
        map.on('mouseenter', lr, function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', lr, function () {
            map.getCanvas().style.cursor = '';
        });
    });


    // Подсветка выбранной реки
    // Highlight rivers
    map.on('click', function (e) {  // if layer's chosen highlight won't disappear when click ex
        // set bbox as 5px reactangle area around clicked point
        var bbox = [[e.point.x - 1, e.point.y - 1], [e.point.x + 1, e.point.y + 1]];
        // select features from layer 'rivers' inside bbox
        var features = map.queryRenderedFeatures(bbox, { layers: ['rivers'] });
        // Run through the selected features and set a filter
        // to match features with unique FIPS codes to activate
        // the `counties-highlighted` layer.
        var filter = features.reduce(function (acc, feature) {
            acc.push(feature.properties.id);
            return acc;
        }, ['in', 'id']);  // initial data (for first iteration): acc on iter=1

        map.setFilter("rivers-highlighted", filter);
    });


    // // Управление слоями
    // // Toggle layers
    // var toggleLayers = ['rivers']
    // toggleLayers.forEach(function(lr) {
    //     var link = document.createElement('a');
    //     link.href = '#';
    //     link.className = 'active';
    //     link.textContent = lr;

    //     link.onclick = function(e) {
    //         var clickedLayer = this.textContent;
    //         e.preventDefault();
    //         e.stopPropagation();
             
    //         var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
             
    //         if (visibility === 'visible') {
    //         map.setLayoutProperty(clickedLayer, 'visibility', 'none');
    //         this.className = '';
    //         } else {
    //         this.className = 'active';
    //         map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
    //         }
    //         };
             
    //         var layers = document.getElementById('menu');
    //         layers.appendChild(link);
    // });

});



// // Get coordinates of the mouse pointer - just uncomment
// // Comment in production
// map.on('mousemove', function (event) {
//     // event.lngLat is the longitude, latitude geographical position of the event
//     var lon = event.lngLat.lng.toFixed(3);
//     var lat = event.lngLat.lat.toFixed(3);
//     document.getElementById('coordinates').innerHTML = lon + "<br>" + lat;
// });
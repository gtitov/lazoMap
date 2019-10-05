/* INITIALIZATION */
// Initialize map
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2hlcm1hbnQiLCJhIjoiY2pncDUwcnRmNDQ4ZjJ4czdjZXMzaHZpNyJ9.3rFyYRRtvLUngHm027HZ7A';
var map = new mapboxgl.Map({
    container: 'map',  // id html-элемента, куда должна быть помещена карта
    style: 'mapbox://styles/ghermant/cjydrh8o43d8r1dnjmomx9x7b',  // идентификатор созданной базовой карты
    center: [134.15, 43.34],  // центр карты при загрузке
    zoom: 8,  // уровень увеличения при загрузке
});

// Initialize menu info
initInfo = function () {
    document.querySelector('#infoTitle').innerHTML = 'Лазовский заповедник имени Л. Г. Капланова'
    document.querySelector('#info').innerHTML = '<p><span>Лазовский заповедник расположен на юго-востоке Приморского края. В административном отношении он находится в пределах Лазовского района. К началу заселения русскими в начале ХХ века эти места относились к числу наиболее заселённых в крае.</span></p><p><span>С 1928 года здесь существовал Южно-Уссурийский (Судзухинский) заказник площадью около 70 тыс. га. Его охраняли два конных объездчика и шесть сторожей из охотобщества. Лазовский (Судзухинский) заповедник был организован в 1935 году как филиал Сихотэ-Алинского заповедника. С 1940 он объявлен самостоятельным заповедником площадью около 150 тыс. га. Целью организации заповедника являлось сохранение и изучение природных комплексов лиановых хвойно-широколиственных и широколиственных лесов Южного Сихотэ-Алиня, охрана и восстановление популяций обитающих в них ценных и редких животных: горала, пятнистого оленя, амурского тигра.</span></p><p><span>В 1951 году заповедник был закрыт, а для сохранения ценных видов животных был организован заказник сроком на 10 лет. Заповедник был воссоздан в 1957 году на площади 172,5 тыс. га. С 1970 года заповедник, ранее именующийся Судзухинским, стал носить название — Лазовский заповедник имени Л. Г. Капланова. В 2014 году объединён с национальным парком &quot;Зов тигра&quot; в форме ФГБУ «Объединенная дирекция Лазовского государственного заповедника имени Л.Г. Капланова и национального парка «Зов тигра».</span></p>'
    document.querySelector('#lightgallery').innerHTML = '<a href="photos/IMG_6946.JPG" data-sub-html="бухта Заря"><img src="thumbs/IMG_6946.JPG"/></a><a href="photos/IMG_6242.JPG" data-sub-html="остров Петрова и остров Бельцова"><img src="thumbs/IMG_6242.JPG" /></a><a href="photos/DJI_0017.JPG" data-sub-html="озеро Заря"><img src="thumbs/DJI_0017.JPG"/></a><a href="photos/DJI_0128.JPG" data-sub-html="лежбище тюленей"><img src="thumbs/DJI_0128.JPG"/></a><a href="photos/Houses_Petrov.JPG" data-sub-html="домики для туристов на острове Петрова"><img src="thumbs/Houses_Petrov.JPG"/></a><a href="photos/map.JPG" data-sub-html="карта заповедника"><img src="thumbs/map.JPG"/></a>'
    document.querySelector('#docs').innerHTML = '<ol><li><a href="http://oopt.aari.ru/doc/Приказ-министерства-природных-ресурсов-и-экологии-Российской-Федерации-от-23072014-№336" target="_blank">Об утверждении Устава Федерального государственного бюджетного учреждения "Объединенная дирекция Лазовского государственного природного заповедника имени Л.Г.Капланова и национального парка "Зов тигра"</a></li></ol>'
    lightGallery(document.getElementById('lightgallery'))  // initialize lightGallery
}
initInfo()
var homebutton = document.querySelector('#homebutton');
homebutton.onclick = initInfo;



/* CONTROLS */
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl(), 'top-left');
map.addControl(new mapboxgl.ScaleControl(), 'bottom-right');
// Get coordinates of the mouse pointer - just uncomment
map.on('mousemove', function (event) {
    // event.lngLat is the longitude, latitude geographical position of the event
    var precision = 5;  // decimal places
    var lon = event.lngLat.lng.toFixed(precision);
    var lat = event.lngLat.lat.toFixed(precision);
    document.getElementById('coordinates').innerHTML = "долгота: " + lon + 
                                                        "<br>" +
                                                        "широта: " + lat;
});


/* CONSTRUCTOR */
// Draw map
map.on('load', function () {
    /* SOURCES */
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

    // Дороги
    map.addSource('roads', {
        type: 'geojson',
        data: './data/roads.geojson',
    })

    // Зимние маршруты учёта (ЗМУ)
    map.addSource('zmu', {
        type: 'geojson',
        data: './data/zmu.geojson',
    })




    /* LAYERS */
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
            "line-color": "#0099ff",
            "line-width": 1,
            "line-opacity": 0.6
        },
        minzoom: 7
    }, 'settles');

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
            "line-color": "#0099ff",
            "line-width": 4,
            "line-opacity": 1
        },
        // none can be selected by the filter, we'll set it later in 'Highlight rivers'
        filter: ["in", "id", ""],
        minzoom: 7
    }, 'settles');

    // Дороги
    map.addLayer({
        id: 'roads',
        type: 'line',
        // Add a GeoJSON source containing place coordinates and information.
        source: 'roads',
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": [
                'match',
                ['get', 'name'],
                'дорога на Просёлочный', '#fbb03b',
                'дорога на Звёздочку', '#223b53',
                'дорога на Америку', '#e55e5e',
                'дорога на Корпадь', '#a832a2',
                'дорога на Петров', '#ff9999',
                /* others */ '#ccc'
            ],
            "line-width": 3,
            "line-opacity": 0.8
        },
        minzoom: 7
    }, 'settles');

    // Дороги, подсветка при выборе
    map.addLayer({
        id: 'roads-highlighted',
        type: 'line',
        // Add a GeoJSON source containing place coordinates and information.
        source: 'roads',
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": [
                'match',
                ['get', 'name'],
                'дорога на Просёлочный', '#fbb03b',
                'дорога на Звёздочку', '#223b53',
                'дорога на Америку', '#e55e5e',
                'дорога на Корпадь', '#a832a2',
                'дорога на Петров', '#ff9999',
                /* others */ '#ccc'
            ],
            "line-width": 4,
            "line-opacity": 0.9
        },
        // none can be selected by the filter, we'll set it later in 'Highlight rivers'
        filter: ["in", "id", ""],
        minzoom: 7
    }, 'settles');

    // Вершины
    map.addLayer({
        id: 'mountains',
        type: 'symbol',
        // Add a GeoJSON source containing place coordinates and information.
        source: 'mountains',
        layout: {
            'icon-image': 'mountain',
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
            'icon-image': 'embassy-15',
            'icon-allow-overlap': true,
        },
        minzoom: 7
    }, 'settles');

    // Кордоны
    map.addLayer({
        id: 'kordon',
        type: 'symbol',
        // Add a GeoJSON source containing place coordinates and information.
        source: 'kordon',
        layout: {
            'icon-image': 'house',
            'icon-allow-overlap': true,
        },
        minzoom: 7
    });

    // ЗМУ
    map.addLayer({
        id: 'zmu',
        type: 'line',
        // Add a GeoJSON source containing place coordinates and information.
        source: 'zmu',
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#006400",
            "line-width": 2,
            "line-opacity": 0.6
        },
        minzoom: 7
    }, 'settles');

    // ЗМУ, подсветка при выборе
    map.addLayer({
        id: 'zmu-highlighted',
        type: 'line',
        // Add a GeoJSON source containing place coordinates and information.
        source: 'zmu',
        layout: {
            "line-join": "round",
            "line-cap": "round"
        },
        paint: {
            "line-color": "#006400",
            "line-width": 4,
            "line-opacity": 1
        },
        // none can be selected by the filter, we'll set it later in 'Highlight rivers'
        filter: ["in", "id", ""],
        minzoom: 7
    }, 'settles');




    /* SHOW INFO */
    // Функция вывода информации о слое
    var showInfo = function (e) {
        // Clear content function
        var clearContent = function (divName) {  // clear content using DOM
            var div = document.getElementById(divName);
            while (div.firstChild) {  // delete until there is no first child
                div.removeChild(div.firstChild);
            }
        }

        // Title
        clearContent("infoTitle")
        var name = e.features[0].properties.name
        document.getElementById("infoTitle").innerHTML = name

        // Information
        clearContent("info")  // clear content
        var descr = e.features[0].properties.description
        if (descr && descr != 'null') {  // check if null is a string 'null'
            document.getElementById("info").innerHTML = descr
        }

        // Photo
        document.getElementById("gallery").getElementsByTagName("h3")[0].style.display = "none"
        clearContent("lightgallery")
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
        clearContent("docs")
        document.getElementById("docs").appendChild(document.createElement("ol"))  // create ol using DOM 
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

    // Change the cursor to a pointer when the mouse is over the places layer and change it back to a pointer when it leaves
    var pointer = function(layer) {
        map.on('mouseenter', layer, function() {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', layer, function() {
            map.getCanvas().style.cursor = '';
        });
    }

    // Слои
    var layers = ['one', 'two', 'kordon', 'kontora', 'mountains', 'rivers', 'roads', 'zmu']

    layers.forEach(function(lr) {
        // Информация о слое
        map.on('click', lr, showInfo);
        // Курсор в указатель
        pointer(lr);
    });




    /* HIGHLIGHTS */
    // Подсветка выбранного слоя
    var hlayers = ['rivers', 'roads', 'zmu']
    // Highlight rivers
    hlayers.forEach(function(hlr) {
        map.on('click', function (e) {  // if layer's chosen highlight won't disappear when click ex
            // set bbox as 1px reactangle area around clicked point
            var bbox = [[e.point.x - 1, e.point.y - 1], [e.point.x + 1, e.point.y + 1]];
            // select features from layer hlr inside bbox
            var features = map.queryRenderedFeatures(bbox, { layers: [hlr] });
            // Run through the selected features and set a filter
            // to match features with unique id to activate
            // the hlr`-highlighted` layer.
            var filter = features.reduce(function (acc, feature) {
                acc.push(feature.properties.id);
                return acc;
            }, ['in', 'id']);  // initial data (for first iteration): acc on iter=1

            map.setFilter(hlr.concat('-highlighted'), filter);
        });
    })




    /* TOGGLE LAYERS */
    // Управление слоями
    // Toggle layers
    var toggleLayers = ['rivers', 'roads', 'mountains', 'kordon', 'kontora', 'zmu']
    var toggleLayersRu = ['водотоки', 'пути к кордонам', 'вершины', 'кордоны', 'офис', 'зимние маршруты учёта']
    for (var i = 0; i < toggleLayers.length; i++) {
        var tlr = toggleLayers[i];
        var tlrRu = toggleLayersRu[i];

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        var checklabel = document.createElement('span')
        checklabel.textContent = " " + tlrRu;

        var checkrow = document.createElement('label');
        checkrow.id = tlr;
        checkrow.appendChild(checkbox);
        checkrow.appendChild(checklabel);
        
        // TODO: галочки не всегда отмечаются!
        checkrow.onclick = function (e) {
            var clickedRow = this.id;
            // e.preventDefault();  // default works with checkbox but not with checkrow
            // e.stopPropagation();

            var visibility = map.getLayoutProperty(clickedRow, 'visibility');

            if (visibility != 'none' || visibility === 'visible') {  // don't use '==="visible"' because first click returns undefined
                map.setLayoutProperty(clickedRow, 'visibility', 'none');
                this.firstChild.checked = false;
            } else {
                map.setLayoutProperty(clickedRow, 'visibility', 'visible');
                this.firstChild.checked = true;
            }
        };

        var layers = document.getElementById('menu');
        layers.appendChild(checkrow);
    }

});
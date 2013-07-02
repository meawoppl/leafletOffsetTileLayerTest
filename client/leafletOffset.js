offsetTileLayer = L.TileLayer.extend({
	initialize: function (url, options) {
	    // TODO: Refactor based on 
	    // http://leafletjs.com/reference.html#class  
	    // (use inheritance super() like functions)

	    // "You can call parent methods (including constructor) from corresponding 
	    //  child ones (as you do with super calls in other languages) by accessing 
	    //  parent class prototype and using JavaScript's call or apply . . ."

	    options = L.setOptions(this, options);

	    // detecting retina displays, adjusting tileSize and zoom levels
	    if (options.detectRetina && L.Browser.retina && options.maxZoom > 0) {
		
		options.tileSize = Math.floor(options.tileSize / 2);
		options.zoomOffset++;
		
		if (options.minZoom > 0) {
		    options.minZoom--;
		}
		this.options.maxZoom--;
	    }
	    
	    if (options.bounds) {
		options.bounds = L.latLngBounds(options.bounds);
	    }

	    this._url = url;

	    var subdomains = this.options.subdomains;

	    if (typeof subdomains === 'string') {
		this.options.subdomains = subdomains.split('');
	    }

	    // the only change from the standard TileLayer constructor
	    this._offset = options.offset;
	},

	// tilePoint is the "x:y" key.  This function gets the 
	// pixel position for a given "x:y" key.
	_getTilePos: function (tilePoint) {
	    var origin = this._map.getPixelOrigin(),
	    tileSize = this.options.tileSize;
	    
	    return tilePoint.multiplyBy(tileSize)
	    .subtract(origin)
	    .add(this._offset);
	},

	_update: function () {
	    if (!this._map) { return; }
	    
	    var bounds = this._map.getPixelBounds();
	    var zoom = this._map.getZoom();
	    var tileSize = this.options.tileSize;
	    var offset = this._offset;

	    if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
		return;
	    }

	    // We need to offset the map bounds before figuring out which 
	    // tile "x:y" keys to load.
	    var offsetMapBounds = L.bounds(bounds.min.subtract(offset),
					   bounds.max.subtract(offset));
	    
	    var tileBounds = L.bounds(offsetMapBounds.min.divideBy(tileSize)._floor(),
				      offsetMapBounds.max.divideBy(tileSize)._floor());

	    this._addTilesFromCenterOut(tileBounds);
	    
	    if (this.options.unloadInvisibleTiles || this.options.reuseTiles) {
		this._removeOtherTiles(tileBounds);
	    }
	},

	_tileShouldBeLoaded: function (tilePoint) {
	    if ((tilePoint.x + ':' + tilePoint.y) in this._tiles) {
		return false; // already loaded
	    }

	    var options = this.options;

	    if (!options.continuousWorld) {
		var limit = this._getWrapTileNum();
		
		// don't load if exceeds world bounds
		if ((options.noWrap && (tilePoint.x < 0 || tilePoint.x >= limit)) ||
		    tilePoint.y < 0 || tilePoint.y >= limit) { return false; }
	    }

	    if (options.bounds) {
		var tileSize = options.tileSize,
		// This code should really look like this in the standard
		// leaflet anyway.  The only difference is that I call the
		// _getTilePos instead of hardcoding multiplying by the 
		// tileSize.

		// nwPoint = tilePoint.multiplyBy(tileSize),
		nwPoint = this._getTilePos(tilePoint),
		        
		sePoint = nwPoint.add([tileSize, tileSize]),
		nw = this._map.unproject(nwPoint),
		se = this._map.unproject(sePoint);

		// TODO temporary hack, will be removed after refactoring projections
		// https://github.com/Leaflet/Leaflet/issues/1618
		if (!options.continuousWorld && !options.noWrap) {
		    nw = nw.wrap();
		    se = se.wrap();
		}

		if (!options.bounds.intersects([nw, se])) { return false; }
	    }

	    return true;
	}
    });

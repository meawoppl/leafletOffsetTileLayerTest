offsetTileLayer = L.TileLayer.extend({
  options: {
    offset: 0
  },
  initialize: function (url, options) {
    console.log('Initializing offsetTileLayer...');

    L.TileLayer.prototype.initialize.call(this, url, options);
  },

  // tilePoint is the "x:y" key.  This function gets the 
  // pixel position for a given "x:y" key.
  _getTilePos: function (tilePoint) {
    var origin = this._map.getPixelOrigin(),
    tileSize = this.options.tileSize;
    
    var position = tilePoint.multiplyBy(tileSize)
                            .subtract(origin)
                            .add(this.options.offset);

    //console.log('position x: '+position.x+', y: '+position.y);

    return position;
  },

  _update: function () {
    if (!this._map) { return; }
    
    var bounds = this._map.getPixelBounds();
    var zoom = this._map.getZoom();
    var tileSize = this.options.tileSize;
    var offset = this.options.offset;

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

  _getWrapTileNum: function () {
    // TODO refactor, limit is not valid for non-standard projections
    console.log('getting wrap tile num...');
    return Math.pow(2, this._getZoomForUrl());
  },


  _tileShouldBeLoaded: function (tilePoint) {
    if ((tilePoint.x + ':' + tilePoint.y) in this._tiles) {
      console.log('Tile already loaded, not doing that again...');
      return false; // already loaded
    }

    var options = this.options;

    if (!options.continuousWorld) {
      var limit = this._getWrapTileNum();
  
      // don't load if exceeds world bounds
      if ((options.noWrap && (tilePoint.x < 0 || tilePoint.x >= limit)) ||
           tilePoint.y < 0 || tilePoint.y >= limit) { 

        console.log('tile exceeded world bounds.');
        return false; 
      }
    }

    if (options.bounds) {

      console.log('checking whether tile should be loaded.');

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

      if (!options.bounds.intersects([nw, se])) {
        console.log('tile out of bounds.');

        return false; 
      }
    } 

    console.log('Loading tile!');

    return true;
  }
});

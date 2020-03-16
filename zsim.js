/*! zsim 0.1.0 */
window["zsim"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/zdog/js/anchor.js":
/*!****************************************!*\
  !*** ./node_modules/zdog/js/anchor.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Anchor
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! ./boilerplate */ "./node_modules/zdog/js/boilerplate.js"), __webpack_require__(/*! ./vector */ "./node_modules/zdog/js/vector.js"),
        __webpack_require__(/*! ./canvas-renderer */ "./node_modules/zdog/js/canvas-renderer.js"), __webpack_require__(/*! ./svg-renderer */ "./node_modules/zdog/js/svg-renderer.js") );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Anchor = factory( Zdog, Zdog.Vector, Zdog.CanvasRenderer,
        Zdog.SvgRenderer );
  }
}( this, function factory( utils, Vector, CanvasRenderer, SvgRenderer ) {

var TAU = utils.TAU;
var onePoint = { x: 1, y: 1, z: 1 };

function Anchor( options ) {
  this.create( options || {} );
}

Anchor.prototype.create = function( options ) {
  this.children = [];
  // set defaults & options
  utils.extend( this, this.constructor.defaults );
  this.setOptions( options );

  // transform
  this.translate = new Vector( options.translate );
  this.rotate = new Vector( options.rotate );
  this.scale = new Vector( onePoint ).multiply( this.scale );
  // origin
  this.origin = new Vector();
  this.renderOrigin = new Vector();

  if ( this.addTo ) {
    this.addTo.addChild( this );
  }
};

Anchor.defaults = {};

Anchor.optionKeys = Object.keys( Anchor.defaults ).concat([
  'rotate',
  'translate',
  'scale',
  'addTo',
]);

Anchor.prototype.setOptions = function( options ) {
  var optionKeys = this.constructor.optionKeys;

  for ( var key in options ) {
    if ( optionKeys.indexOf( key ) != -1 ) {
      this[ key ] = options[ key ];
    }
  }
};

Anchor.prototype.addChild = function( shape ) {
  if ( this.children.indexOf( shape ) != -1 ) {
    return;
  }
  shape.remove(); // remove previous parent
  shape.addTo = this; // keep parent reference
  this.children.push( shape );
};

Anchor.prototype.removeChild = function( shape ) {
  var index = this.children.indexOf( shape );
  if ( index != -1 ) {
    this.children.splice( index, 1 );
  }
};

Anchor.prototype.remove = function() {
  if ( this.addTo ) {
    this.addTo.removeChild( this );
  }
};

// ----- update ----- //

Anchor.prototype.update = function() {
  // update self
  this.reset();
  // update children
  this.children.forEach( function( child ) {
    child.update();
  });
  this.transform( this.translate, this.rotate, this.scale );
};

Anchor.prototype.reset = function() {
  this.renderOrigin.set( this.origin );
};

Anchor.prototype.transform = function( translation, rotation, scale ) {
  this.renderOrigin.transform( translation, rotation, scale );
  // transform children
  this.children.forEach( function( child ) {
    child.transform( translation, rotation, scale );
  });
};

Anchor.prototype.updateGraph = function() {
  this.update();
  this.updateFlatGraph();
  this.flatGraph.forEach( function( item ) {
    item.updateSortValue();
  });
  // z-sort
  this.flatGraph.sort( Anchor.shapeSorter );
};

Anchor.shapeSorter = function( a, b ) {
  return a.sortValue - b.sortValue;
};

// custom getter to check for flatGraph before using it
Object.defineProperty( Anchor.prototype, 'flatGraph', {
  get: function() {
    if ( !this._flatGraph ) {
      this.updateFlatGraph();
    }
    return this._flatGraph;
  },
  set: function( graph ) {
    this._flatGraph = graph;
  },
});

Anchor.prototype.updateFlatGraph = function() {
  this.flatGraph = this.getFlatGraph();
};

// return Array of self & all child graph items
Anchor.prototype.getFlatGraph = function() {
  var flatGraph = [ this ];
  return this.addChildFlatGraph( flatGraph );
};

Anchor.prototype.addChildFlatGraph = function( flatGraph ) {
  this.children.forEach( function( child ) {
    var childFlatGraph = child.getFlatGraph();
    Array.prototype.push.apply( flatGraph, childFlatGraph );
  });
  return flatGraph;
};

Anchor.prototype.updateSortValue = function() {
  this.sortValue = this.renderOrigin.z;
};

// ----- render ----- //

Anchor.prototype.render = function() {};

// TODO refactor out CanvasRenderer so its not a dependency within anchor.js
Anchor.prototype.renderGraphCanvas = function( ctx ) {
  if ( !ctx ) {
    throw new Error( 'ctx is ' + ctx + '. ' +
      'Canvas context required for render. Check .renderGraphCanvas( ctx ).' );
  }
  this.flatGraph.forEach( function( item ) {
    item.render( ctx, CanvasRenderer );
  });
};

Anchor.prototype.renderGraphSvg = function( svg ) {
  if ( !svg ) {
    throw new Error( 'svg is ' + svg + '. ' +
      'SVG required for render. Check .renderGraphSvg( svg ).' );
  }
  this.flatGraph.forEach( function( item ) {
    item.render( svg, SvgRenderer );
  });
};

// ----- misc ----- //

Anchor.prototype.copy = function( options ) {
  // copy options
  var itemOptions = {};
  var optionKeys = this.constructor.optionKeys;
  optionKeys.forEach( function( key ) {
    itemOptions[ key ] = this[ key ];
  }, this );
  // add set options
  utils.extend( itemOptions, options );
  var ItemClass = this.constructor;
  return new ItemClass( itemOptions );
};

Anchor.prototype.copyGraph = function( options ) {
  var clone = this.copy( options );
  this.children.forEach( function( child ) {
    child.copyGraph({
      addTo: clone,
    });
  });
  return clone;
};

Anchor.prototype.normalizeRotate = function() {
  this.rotate.x = utils.modulo( this.rotate.x, TAU );
  this.rotate.y = utils.modulo( this.rotate.y, TAU );
  this.rotate.z = utils.modulo( this.rotate.z, TAU );
};

// ----- subclass ----- //

function getSubclass( Super ) {
  return function( defaults ) {
    // create constructor
    function Item( options ) {
      this.create( options || {} );
    }

    Item.prototype = Object.create( Super.prototype );
    Item.prototype.constructor = Item;

    Item.defaults = utils.extend( {}, Super.defaults );
    utils.extend( Item.defaults, defaults );
    // create optionKeys
    Item.optionKeys = Super.optionKeys.slice(0);
    // add defaults keys to optionKeys, dedupe
    Object.keys( Item.defaults ).forEach( function( key ) {
      if ( !Item.optionKeys.indexOf( key ) != 1 ) {
        Item.optionKeys.push( key );
      }
    });

    Item.subclass = getSubclass( Item );

    return Item;
  };
}

Anchor.subclass = getSubclass( Anchor );

return Anchor;

}));


/***/ }),

/***/ "./node_modules/zdog/js/boilerplate.js":
/*!*********************************************!*\
  !*** ./node_modules/zdog/js/boilerplate.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Zdog v1.1.1
 * Round, flat, designer-friendly pseudo-3D engine
 * Licensed MIT
 * https://zzz.dog
 * Copyright 2019 Metafizzy
 */

/**
 * Boilerplate & utils
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    root.Zdog = factory();
  }
}( this, function factory() {

var Zdog = {};

Zdog.TAU = Math.PI * 2;

Zdog.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

Zdog.lerp = function( a, b, alpha ) {
  return ( b - a ) * alpha + a;
};

Zdog.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

var powerMultipliers = {
  2: function( a ) {
    return a * a;
  },
  3: function( a ) {
    return a * a * a;
  },
  4: function( a ) {
    return a * a * a * a;
  },
  5: function( a ) {
    return a * a * a * a * a;
  },
};

Zdog.easeInOut = function( alpha, power ) {
  if ( power == 1 ) {
    return alpha;
  }
  alpha = Math.max( 0, Math.min( 1, alpha ) );
  var isFirstHalf = alpha < 0.5;
  var slope = isFirstHalf ? alpha : 1 - alpha;
  slope /= 0.5;
  // make easing steeper with more multiples
  var powerMultiplier = powerMultipliers[ power ] || powerMultipliers[2];
  var curve = powerMultiplier( slope );
  curve /= 2;
  return isFirstHalf ? curve : 1 - curve;
};

return Zdog;

}));


/***/ }),

/***/ "./node_modules/zdog/js/box.js":
/*!*************************************!*\
  !*** ./node_modules/zdog/js/box.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Box composite shape
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! ./boilerplate */ "./node_modules/zdog/js/boilerplate.js"), __webpack_require__(/*! ./anchor */ "./node_modules/zdog/js/anchor.js"),
        __webpack_require__(/*! ./shape */ "./node_modules/zdog/js/shape.js"), __webpack_require__(/*! ./rect */ "./node_modules/zdog/js/rect.js") );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Box = factory( Zdog, Zdog.Anchor, Zdog.Shape, Zdog.Rect );
  }
}( this, function factory( utils, Anchor, Shape, Rect ) {

// ----- BoxRect ----- //

var BoxRect = Rect.subclass();
// prevent double-creation in parent.copyGraph()
// only create in Box.create()
BoxRect.prototype.copyGraph = function() {};

// ----- Box ----- //

var TAU = utils.TAU;
var faceNames = [
  'frontFace',
  'rearFace',
  'leftFace',
  'rightFace',
  'topFace',
  'bottomFace',
];

var boxDefaults = utils.extend( {}, Shape.defaults );
delete boxDefaults.path;
faceNames.forEach( function( faceName ) {
  boxDefaults[ faceName ] = true;
});
utils.extend( boxDefaults, {
  width: 1,
  height: 1,
  depth: 1,
  fill: true,
});

var Box = Anchor.subclass( boxDefaults );

Box.prototype.create = function( options ) {
  Anchor.prototype.create.call( this, options );
  this.updatePath();
  // HACK reset fill to trigger face setter
  this.fill = this.fill;
};

Box.prototype.updatePath = function() {
  // reset all faces to trigger setters
  faceNames.forEach( function( faceName ) {
    this[ faceName ] = this[ faceName ];
  }, this );
};

faceNames.forEach( function( faceName ) {
  var _faceName = '_' + faceName;
  Object.defineProperty( Box.prototype, faceName, {
    get: function() {
      return this[ _faceName ];
    },
    set: function( value ) {
      this[ _faceName ] = value;
      this.setFace( faceName, value );
    },
  });
});

Box.prototype.setFace = function( faceName, value ) {
  var rectProperty = faceName + 'Rect';
  var rect = this[ rectProperty ];
  // remove if false
  if ( !value ) {
    this.removeChild( rect );
    return;
  }
  // update & add face
  var options = this.getFaceOptions( faceName );
  options.color = typeof value == 'string' ? value : this.color;

  if ( rect ) {
    // update previous
    rect.setOptions( options );
  } else {
    // create new
    rect = this[ rectProperty ] = new BoxRect( options );
  }
  rect.updatePath();
  this.addChild( rect );
};

Box.prototype.getFaceOptions = function( faceName ) {
  return {
    frontFace: {
      width: this.width,
      height: this.height,
      translate: { z: this.depth/2 },
    },
    rearFace: {
      width: this.width,
      height: this.height,
      translate: { z: -this.depth/2 },
      rotate: { y: TAU/2 },
    },
    leftFace: {
      width: this.depth,
      height: this.height,
      translate: { x: -this.width/2 },
      rotate: { y: -TAU/4 },
    },
    rightFace: {
      width: this.depth,
      height: this.height,
      translate: { x: this.width/2 },
      rotate: { y: TAU/4 },
    },
    topFace: {
      width: this.width,
      height: this.depth,
      translate: { y: -this.height/2 },
      rotate: { x: -TAU/4 },
    },
    bottomFace: {
      width: this.width,
      height: this.depth,
      translate: { y: this.height/2 },
      rotate: { x: TAU/4 },
    },
  }[ faceName ];
};

// ----- set face properties ----- //

var childProperties = [ 'color', 'stroke', 'fill', 'backface', 'front',
  'visible' ];
childProperties.forEach( function( property ) {
  // use proxy property for custom getter & setter
  var _prop = '_' + property;
  Object.defineProperty( Box.prototype, property, {
    get: function() {
      return this[ _prop ];
    },
    set: function( value ) {
      this[ _prop ] = value;
      faceNames.forEach( function( faceName ) {
        var rect = this[ faceName + 'Rect' ];
        var isFaceColor = typeof this[ faceName ] == 'string';
        var isColorUnderwrite = property == 'color' && isFaceColor;
        if ( rect && !isColorUnderwrite ) {
          rect[ property ] = value;
        }
      }, this );
    },
  });
});

return Box;

}));


/***/ }),

/***/ "./node_modules/zdog/js/canvas-renderer.js":
/*!*************************************************!*\
  !*** ./node_modules/zdog/js/canvas-renderer.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * CanvasRenderer
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    root.Zdog.CanvasRenderer = factory();
  }
}( this, function factory() {

var CanvasRenderer = { isCanvas: true };

CanvasRenderer.begin = function( ctx ) {
  ctx.beginPath();
};

CanvasRenderer.move = function( ctx, elem, point ) {
  ctx.moveTo( point.x, point.y );
};

CanvasRenderer.line = function( ctx, elem, point ) {
  ctx.lineTo( point.x, point.y );
};

CanvasRenderer.bezier = function( ctx, elem, cp0, cp1, end ) {
  ctx.bezierCurveTo( cp0.x, cp0.y, cp1.x, cp1.y, end.x, end.y );
};

CanvasRenderer.closePath = function( ctx ) {
  ctx.closePath();
};

CanvasRenderer.setPath = function() {};

CanvasRenderer.renderPath = function( ctx, elem, pathCommands, isClosed ) {
  this.begin( ctx, elem );
  pathCommands.forEach( function( command ) {
    command.render( ctx, elem, CanvasRenderer );
  });
  if ( isClosed ) {
    this.closePath( ctx, elem );
  }
};

CanvasRenderer.stroke = function( ctx, elem, isStroke, color, lineWidth ) {
  if ( !isStroke ) {
    return;
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
};

CanvasRenderer.fill = function( ctx, elem, isFill, color ) {
  if ( !isFill ) {
    return;
  }
  ctx.fillStyle = color;
  ctx.fill();
};

CanvasRenderer.end = function() {};

return CanvasRenderer;

}));


/***/ }),

/***/ "./node_modules/zdog/js/cone.js":
/*!**************************************!*\
  !*** ./node_modules/zdog/js/cone.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Cone composite shape
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! ./boilerplate */ "./node_modules/zdog/js/boilerplate.js"), __webpack_require__(/*! ./vector */ "./node_modules/zdog/js/vector.js"),
        __webpack_require__(/*! ./path-command */ "./node_modules/zdog/js/path-command.js"), __webpack_require__(/*! ./anchor */ "./node_modules/zdog/js/anchor.js"), __webpack_require__(/*! ./ellipse */ "./node_modules/zdog/js/ellipse.js") );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Cone = factory( Zdog, Zdog.Vector, Zdog.PathCommand,
        Zdog.Anchor, Zdog.Ellipse );
  }
}( this, function factory( utils, Vector, PathCommand, Anchor, Ellipse ) {

var Cone = Ellipse.subclass({
  length: 1,
  fill: true,
});

var TAU = utils.TAU;

Cone.prototype.create = function(/* options */) {
  // call super
  Ellipse.prototype.create.apply( this, arguments );
  // composite shape, create child shapes
  this.apex = new Anchor({
    addTo: this,
    translate: { z: this.length },
  });

  // vectors used for calculation
  this.renderApex = new Vector();
  this.renderCentroid = new Vector();
  this.tangentA = new Vector();
  this.tangentB = new Vector();

  this.surfacePathCommands = [
    new PathCommand( 'move', [ {} ] ), // points set in renderConeSurface
    new PathCommand( 'line', [ {} ] ),
    new PathCommand( 'line', [ {} ] ),
  ];
};

Cone.prototype.updateSortValue = function() {
  // center of cone is one third of its length
  this.renderCentroid.set( this.renderOrigin )
    .lerp( this.apex.renderOrigin, 1/3 );
  this.sortValue = this.renderCentroid.z;
};

Cone.prototype.render = function( ctx, renderer ) {
  this.renderConeSurface( ctx, renderer );
  Ellipse.prototype.render.apply( this, arguments );
};

Cone.prototype.renderConeSurface = function( ctx, renderer ) {
  if ( !this.visible ) {
    return;
  }
  this.renderApex.set( this.apex.renderOrigin )
    .subtract( this.renderOrigin );

  var scale = this.renderNormal.magnitude();
  var apexDistance = this.renderApex.magnitude2d();
  var normalDistance = this.renderNormal.magnitude2d();
  // eccentricity
  var eccenAngle = Math.acos( normalDistance / scale );
  var eccen = Math.sin( eccenAngle );
  var radius = this.diameter/2 * scale;
  // does apex extend beyond eclipse of face
  var isApexVisible = radius * eccen < apexDistance;
  if ( !isApexVisible ) {
    return;
  }
  // update tangents
  var apexAngle = Math.atan2( this.renderNormal.y, this.renderNormal.x ) +
      TAU/2;
  var projectLength = apexDistance / eccen;
  var projectAngle = Math.acos( radius / projectLength );
  // set tangent points
  var tangentA = this.tangentA;
  var tangentB = this.tangentB;

  tangentA.x = Math.cos( projectAngle ) * radius * eccen;
  tangentA.y = Math.sin( projectAngle ) * radius;

  tangentB.set( this.tangentA );
  tangentB.y *= -1;

  tangentA.rotateZ( apexAngle );
  tangentB.rotateZ( apexAngle );
  tangentA.add( this.renderOrigin );
  tangentB.add( this.renderOrigin );

  this.setSurfaceRenderPoint( 0, tangentA );
  this.setSurfaceRenderPoint( 1, this.apex.renderOrigin );
  this.setSurfaceRenderPoint( 2, tangentB );

  // render
  var elem = this.getSurfaceRenderElement( ctx, renderer );
  renderer.renderPath( ctx, elem, this.surfacePathCommands );
  renderer.stroke( ctx, elem, this.stroke, this.color, this.getLineWidth() );
  renderer.fill( ctx, elem, this.fill, this.color );
  renderer.end( ctx, elem );
};

var svgURI = 'http://www.w3.org/2000/svg';

Cone.prototype.getSurfaceRenderElement = function( ctx, renderer ) {
  if ( !renderer.isSvg ) {
    return;
  }
  if ( !this.surfaceSvgElement ) {
    // create svgElement
    this.surfaceSvgElement = document.createElementNS( svgURI, 'path');
    this.surfaceSvgElement.setAttribute( 'stroke-linecap', 'round' );
    this.surfaceSvgElement.setAttribute( 'stroke-linejoin', 'round' );
  }
  return this.surfaceSvgElement;
};

Cone.prototype.setSurfaceRenderPoint = function( index, point ) {
  var renderPoint = this.surfacePathCommands[ index ].renderPoints[0];
  renderPoint.set( point );
};

return Cone;

}));


/***/ }),

/***/ "./node_modules/zdog/js/cylinder.js":
/*!******************************************!*\
  !*** ./node_modules/zdog/js/cylinder.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Cylinder composite shape
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! ./boilerplate */ "./node_modules/zdog/js/boilerplate.js"),
        __webpack_require__(/*! ./path-command */ "./node_modules/zdog/js/path-command.js"), __webpack_require__(/*! ./shape */ "./node_modules/zdog/js/shape.js"), __webpack_require__(/*! ./group */ "./node_modules/zdog/js/group.js"),
        __webpack_require__(/*! ./ellipse */ "./node_modules/zdog/js/ellipse.js") );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Cylinder = factory( Zdog, Zdog.PathCommand, Zdog.Shape,
        Zdog.Group, Zdog.Ellipse );
  }
}( this, function factory( utils, PathCommand, Shape, Group, Ellipse ) {

function noop() {}

// ----- CylinderGroup ----- //

var CylinderGroup = Group.subclass({
  color: '#333',
  updateSort: true,
});

CylinderGroup.prototype.create = function() {
  Group.prototype.create.apply( this, arguments );
  this.pathCommands = [
    new PathCommand( 'move', [ {} ] ),
    new PathCommand( 'line', [ {} ] ),
  ];
};

CylinderGroup.prototype.render = function( ctx, renderer ) {
  this.renderCylinderSurface( ctx, renderer );
  Group.prototype.render.apply( this, arguments );
};

CylinderGroup.prototype.renderCylinderSurface = function( ctx, renderer ) {
  if ( !this.visible ) {
    return;
  }
  // render cylinder surface
  var elem = this.getRenderElement( ctx, renderer );
  var frontBase = this.frontBase;
  var rearBase = this.rearBase;
  var scale = frontBase.renderNormal.magnitude();
  var strokeWidth = frontBase.diameter * scale + frontBase.getLineWidth();
  // set path command render points
  this.pathCommands[0].renderPoints[0].set( frontBase.renderOrigin );
  this.pathCommands[1].renderPoints[0].set( rearBase.renderOrigin );

  if ( renderer.isCanvas ) {
    ctx.lineCap = 'butt'; // nice
  }
  renderer.renderPath( ctx, elem, this.pathCommands );
  renderer.stroke( ctx, elem, true, this.color, strokeWidth );
  renderer.end( ctx, elem );

  if ( renderer.isCanvas ) {
    ctx.lineCap = 'round'; // reset
  }
};

var svgURI = 'http://www.w3.org/2000/svg';

CylinderGroup.prototype.getRenderElement = function( ctx, renderer ) {
  if ( !renderer.isSvg ) {
    return;
  }
  if ( !this.svgElement ) {
    // create svgElement
    this.svgElement = document.createElementNS( svgURI, 'path');
  }
  return this.svgElement;
};

// prevent double-creation in parent.copyGraph()
// only create in Cylinder.create()
CylinderGroup.prototype.copyGraph = noop;

// ----- CylinderEllipse ----- //

var CylinderEllipse = Ellipse.subclass();

CylinderEllipse.prototype.copyGraph = noop;

// ----- Cylinder ----- //

var Cylinder = Shape.subclass({
  diameter: 1,
  length: 1,
  frontFace: undefined,
  fill: true,
});

var TAU = utils.TAU;

Cylinder.prototype.create = function(/* options */) {
  // call super
  Shape.prototype.create.apply( this, arguments );
  // composite shape, create child shapes
  // CylinderGroup to render cylinder surface then bases
  this.group = new CylinderGroup({
    addTo: this,
    color: this.color,
    visible: this.visible,
  });
  var baseZ = this.length/2;
  var baseColor = this.backface || true;
  // front outside base
  this.frontBase = this.group.frontBase = new Ellipse({
    addTo: this.group,
    diameter: this.diameter,
    translate: { z: baseZ },
    rotate: { y: TAU/2 },
    color: this.color,
    stroke: this.stroke,
    fill: this.fill,
    backface: this.frontFace || baseColor,
    visible: this.visible,
  });
  // back outside base
  this.rearBase = this.group.rearBase = this.frontBase.copy({
    translate: { z: -baseZ },
    rotate: { y: 0 },
    backface: baseColor,
  });
};

// Cylinder shape does not render anything
Cylinder.prototype.render = function() {};

// ----- set child properties ----- //

var childProperties = [ 'stroke', 'fill', 'color', 'visible' ];
childProperties.forEach( function( property ) {
  // use proxy property for custom getter & setter
  var _prop = '_' + property;
  Object.defineProperty( Cylinder.prototype, property, {
    get: function() {
      return this[ _prop ];
    },
    set: function( value ) {
      this[ _prop ] = value;
      // set property on children
      if ( this.frontBase ) {
        this.frontBase[ property ] = value;
        this.rearBase[ property ] = value;
        this.group[ property ] = value;
      }
    },
  });
});

// TODO child property setter for backface, frontBaseColor, & rearBaseColor

return Cylinder;

}));


/***/ }),

/***/ "./node_modules/zdog/js/dragger.js":
/*!*****************************************!*\
  !*** ./node_modules/zdog/js/dragger.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Dragger
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    root.Zdog.Dragger = factory();
  }
}( this, function factory() {

// quick & dirty drag event stuff
// messes up if multiple pointers/touches

// check for browser window #85
var hasWindow = typeof window != 'undefined';
// event support, default to mouse events
var downEvent = 'mousedown';
var moveEvent = 'mousemove';
var upEvent = 'mouseup';
if ( hasWindow ) {
  if ( window.PointerEvent ) {
    // PointerEvent, Chrome
    downEvent = 'pointerdown';
    moveEvent = 'pointermove';
    upEvent = 'pointerup';
  } else if ( 'ontouchstart' in window ) {
    // Touch Events, iOS Safari
    downEvent = 'touchstart';
    moveEvent = 'touchmove';
    upEvent = 'touchend';
  }
}

function noop() {}

function Dragger( options ) {
  this.create( options || {} );
}

Dragger.prototype.create = function( options ) {
  this.onDragStart = options.onDragStart || noop;
  this.onDragMove = options.onDragMove || noop;
  this.onDragEnd = options.onDragEnd || noop;

  this.bindDrag( options.startElement );
};

Dragger.prototype.bindDrag = function( element ) {
  element = this.getQueryElement( element );
  if ( !element ) {
    return;
  }
  // disable browser gestures #53
  element.style.touchAction = 'none';
  element.addEventListener( downEvent, this );
};

Dragger.prototype.getQueryElement = function( element ) {
  if ( typeof element == 'string' ) {
    // with string, query selector
    element = document.querySelector( element );
  }
  return element;
};

Dragger.prototype.handleEvent = function( event ) {
  var method = this[ 'on' + event.type ];
  if ( method ) {
    method.call( this, event );
  }
};

Dragger.prototype.onmousedown =
Dragger.prototype.onpointerdown = function( event ) {
  this.dragStart( event, event );
};

Dragger.prototype.ontouchstart = function( event ) {
  this.dragStart( event, event.changedTouches[0] );
};

Dragger.prototype.dragStart = function( event, pointer ) {
  event.preventDefault();
  this.dragStartX = pointer.pageX;
  this.dragStartY = pointer.pageY;
  if ( hasWindow ) {
    window.addEventListener( moveEvent, this );
    window.addEventListener( upEvent, this );
  }
  this.onDragStart( pointer );
};

Dragger.prototype.ontouchmove = function( event ) {
  // HACK, moved touch may not be first
  this.dragMove( event, event.changedTouches[0] );
};

Dragger.prototype.onmousemove =
Dragger.prototype.onpointermove = function( event ) {
  this.dragMove( event, event );
};

Dragger.prototype.dragMove = function( event, pointer ) {
  event.preventDefault();
  var moveX = pointer.pageX - this.dragStartX;
  var moveY = pointer.pageY - this.dragStartY;
  this.onDragMove( pointer, moveX, moveY );
};

Dragger.prototype.onmouseup =
Dragger.prototype.onpointerup =
Dragger.prototype.ontouchend =
Dragger.prototype.dragEnd = function(/* event */) {
  window.removeEventListener( moveEvent, this );
  window.removeEventListener( upEvent, this );
  this.onDragEnd();
};

return Dragger;

}));


/***/ }),

/***/ "./node_modules/zdog/js/ellipse.js":
/*!*****************************************!*\
  !*** ./node_modules/zdog/js/ellipse.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Ellipse
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! ./shape */ "./node_modules/zdog/js/shape.js") );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Ellipse = factory( Zdog.Shape );
  }

}( this, function factory( Shape ) {

var Ellipse = Shape.subclass({
  diameter: 1,
  width: undefined,
  height: undefined,
  quarters: 4,
  closed: false,
});

Ellipse.prototype.setPath = function() {
  var width = this.width != undefined ? this.width : this.diameter;
  var height = this.height != undefined ? this.height : this.diameter;
  var x = width / 2;
  var y = height / 2;
  this.path = [
    { x: 0, y: -y },
    { arc: [ // top right
      { x: x, y: -y },
      { x: x, y: 0 },
    ]},
  ];
  // bottom right
  if ( this.quarters > 1 ) {
    this.path.push({ arc: [
      { x: x, y: y },
      { x: 0, y: y },
    ]});
  }
  // bottom left
  if ( this.quarters > 2 ) {
    this.path.push({ arc: [
      { x: -x, y: y },
      { x: -x, y: 0 },
    ]});
  }
  // top left
  if ( this.quarters > 3 ) {
    this.path.push({ arc: [
      { x: -x, y: -y },
      { x: 0, y: -y },
    ]});
  }
};

return Ellipse;

}));


/***/ }),

/***/ "./node_modules/zdog/js/group.js":
/*!***************************************!*\
  !*** ./node_modules/zdog/js/group.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Group
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! ./anchor */ "./node_modules/zdog/js/anchor.js") );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Group = factory( Zdog.Anchor );
  }
}( this, function factory( Anchor ) {

var Group = Anchor.subclass({
  updateSort: false,
  visible: true,
});

// ----- update ----- //

Group.prototype.updateSortValue = function() {
  var sortValueTotal = 0;
  this.flatGraph.forEach( function( item ) {
    item.updateSortValue();
    sortValueTotal += item.sortValue;
  });
  // average sort value of all points
  // def not geometrically correct, but works for me
  this.sortValue = sortValueTotal / this.flatGraph.length;

  if ( this.updateSort ) {
    this.flatGraph.sort( Anchor.shapeSorter );
  }
};

// ----- render ----- //

Group.prototype.render = function( ctx, renderer ) {
  if ( !this.visible ) {
    return;
  }

  this.flatGraph.forEach( function( item ) {
    item.render( ctx, renderer );
  });
};

// actual group flatGraph only used inside group
Group.prototype.updateFlatGraph = function() {
  // do not include self
  var flatGraph = [];
  this.flatGraph = this.addChildFlatGraph( flatGraph );
};

// do not include children, group handles rendering & sorting internally
Group.prototype.getFlatGraph = function() {
  return [ this ];
};

return Group;

}));


/***/ }),

/***/ "./node_modules/zdog/js/hemisphere.js":
/*!********************************************!*\
  !*** ./node_modules/zdog/js/hemisphere.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Hemisphere composite shape
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! ./boilerplate */ "./node_modules/zdog/js/boilerplate.js"), __webpack_require__(/*! ./vector */ "./node_modules/zdog/js/vector.js"),
        __webpack_require__(/*! ./anchor */ "./node_modules/zdog/js/anchor.js"), __webpack_require__(/*! ./ellipse */ "./node_modules/zdog/js/ellipse.js") );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Hemisphere = factory( Zdog, Zdog.Vector, Zdog.Anchor, Zdog.Ellipse );
  }
}( this, function factory( utils, Vector, Anchor, Ellipse ) {

var Hemisphere = Ellipse.subclass({
  fill: true,
});

var TAU = utils.TAU;

Hemisphere.prototype.create = function(/* options */) {
  // call super
  Ellipse.prototype.create.apply( this, arguments );
  // composite shape, create child shapes
  this.apex = new Anchor({
    addTo: this,
    translate: { z: this.diameter/2 },
  });
  // vector used for calculation
  this.renderCentroid = new Vector();
};

Hemisphere.prototype.updateSortValue = function() {
  // centroid of hemisphere is 3/8 between origin and apex
  this.renderCentroid.set( this.renderOrigin )
    .lerp( this.apex.renderOrigin, 3/8 );
  this.sortValue = this.renderCentroid.z;
};

Hemisphere.prototype.render = function( ctx, renderer ) {
  this.renderDome( ctx, renderer );
  // call super
  Ellipse.prototype.render.apply( this, arguments );
};

Hemisphere.prototype.renderDome = function( ctx, renderer ) {
  if ( !this.visible ) {
    return;
  }
  var elem = this.getDomeRenderElement( ctx, renderer );
  var contourAngle = Math.atan2( this.renderNormal.y, this.renderNormal.x );
  var domeRadius = this.diameter/2 * this.renderNormal.magnitude();
  var x = this.renderOrigin.x;
  var y = this.renderOrigin.y;

  if ( renderer.isCanvas ) {
    // canvas
    var startAngle = contourAngle + TAU/4;
    var endAngle = contourAngle - TAU/4;
    ctx.beginPath();
    ctx.arc( x, y, domeRadius, startAngle, endAngle );
  } else if ( renderer.isSvg ) {
    // svg
    contourAngle = (contourAngle - TAU/4) / TAU * 360;
    this.domeSvgElement.setAttribute( 'd', 'M ' + -domeRadius + ',0 A ' +
        domeRadius + ',' + domeRadius + ' 0 0 1 ' + domeRadius + ',0' );
    this.domeSvgElement.setAttribute( 'transform',
        'translate(' + x + ',' + y + ' ) rotate(' + contourAngle + ')' );
  }

  renderer.stroke( ctx, elem, this.stroke, this.color, this.getLineWidth() );
  renderer.fill( ctx, elem, this.fill, this.color );
  renderer.end( ctx, elem );
};

var svgURI = 'http://www.w3.org/2000/svg';

Hemisphere.prototype.getDomeRenderElement = function( ctx, renderer ) {
  if ( !renderer.isSvg ) {
    return;
  }
  if ( !this.domeSvgElement ) {
    // create svgElement
    this.domeSvgElement = document.createElementNS( svgURI, 'path');
    this.domeSvgElement.setAttribute( 'stroke-linecap', 'round' );
    this.domeSvgElement.setAttribute( 'stroke-linejoin', 'round' );
  }
  return this.domeSvgElement;
};

return Hemisphere;

}));


/***/ }),

/***/ "./node_modules/zdog/js/illustration.js":
/*!**********************************************!*\
  !*** ./node_modules/zdog/js/illustration.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Illustration
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! ./boilerplate */ "./node_modules/zdog/js/boilerplate.js"), __webpack_require__(/*! ./anchor */ "./node_modules/zdog/js/anchor.js"),
        __webpack_require__(/*! ./dragger */ "./node_modules/zdog/js/dragger.js") );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Illustration = factory( Zdog, Zdog.Anchor, Zdog.Dragger );
  }
}( this, function factory( utils, Anchor, Dragger ) {

function noop() {}
var TAU = utils.TAU;

var Illustration = Anchor.subclass({
  element: undefined,
  centered: true,
  zoom: 1,
  dragRotate: false,
  resize: false,
  onPrerender: noop,
  onDragStart: noop,
  onDragMove: noop,
  onDragEnd: noop,
  onResize: noop,
});

utils.extend( Illustration.prototype, Dragger.prototype );

Illustration.prototype.create = function( options ) {
  Anchor.prototype.create.call( this, options );
  Dragger.prototype.create.call( this, options );
  this.setElement( this.element );
  this.setDragRotate( this.dragRotate );
  this.setResize( this.resize );
};

Illustration.prototype.setElement = function( element ) {
  element = this.getQueryElement( element );
  if ( !element ) {
    throw new Error( 'Zdog.Illustration element required. Set to ' + element );
  }

  var nodeName = element.nodeName.toLowerCase();
  if ( nodeName == 'canvas' ) {
    this.setCanvas( element );
  } else if ( nodeName == 'svg' ) {
    this.setSvg( element );
  }
};

Illustration.prototype.setSize = function( width, height ) {
  width = Math.round( width );
  height = Math.round( height );
  if ( this.isCanvas ) {
    this.setSizeCanvas( width, height );
  } else if ( this.isSvg ) {
    this.setSizeSvg( width, height );
  }
};

Illustration.prototype.setResize = function( resize ) {
  this.resize = resize;
  // create resize event listener
  if ( !this.resizeListener ) {
    this.resizeListener = this.onWindowResize.bind( this );
  }
  // add/remove event listener
  if ( resize ) {
    window.addEventListener( 'resize', this.resizeListener );
    this.onWindowResize();
  } else {
    window.removeEventListener( 'resize', this.resizeListener );
  }
};

// TODO debounce this?
Illustration.prototype.onWindowResize = function() {
  this.setMeasuredSize();
  this.onResize( this.width, this.height );
};

Illustration.prototype.setMeasuredSize = function() {
  var width, height;
  var isFullscreen = this.resize == 'fullscreen';
  if ( isFullscreen ) {
    width = window.innerWidth;
    height = window.innerHeight;
  } else {
    var rect = this.element.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
  }
  this.setSize( width, height );
};

// ----- render ----- //

Illustration.prototype.renderGraph = function( item ) {
  if ( this.isCanvas ) {
    this.renderGraphCanvas( item );
  } else if ( this.isSvg ) {
    this.renderGraphSvg( item );
  }
};

// combo method
Illustration.prototype.updateRenderGraph = function( item ) {
  this.updateGraph();
  this.renderGraph( item );
};

// ----- canvas ----- //

Illustration.prototype.setCanvas = function( element ) {
  this.element = element;
  this.isCanvas = true;
  // update related properties
  this.ctx = this.element.getContext('2d');
  // set initial size
  this.setSizeCanvas( element.width, element.height );
};

Illustration.prototype.setSizeCanvas = function( width, height ) {
  this.width = width;
  this.height = height;
  // up-rez for hi-DPI devices
  var pixelRatio = this.pixelRatio = window.devicePixelRatio || 1;
  this.element.width = this.canvasWidth = width * pixelRatio;
  this.element.height = this.canvasHeight = height * pixelRatio;
  var needsHighPixelRatioSizing = pixelRatio > 1 && !this.resize;
  if ( needsHighPixelRatioSizing ) {
    this.element.style.width = width + 'px';
    this.element.style.height = height + 'px';
  }
};

Illustration.prototype.renderGraphCanvas = function( item ) {
  item = item || this;
  this.prerenderCanvas();
  Anchor.prototype.renderGraphCanvas.call( item, this.ctx );
  this.postrenderCanvas();
};

Illustration.prototype.prerenderCanvas = function() {
  var ctx = this.ctx;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.clearRect( 0, 0, this.canvasWidth, this.canvasHeight );
  ctx.save();
  if ( this.centered ) {
    var centerX = this.width/2 * this.pixelRatio;
    var centerY = this.height/2 * this.pixelRatio;
    ctx.translate( centerX, centerY );
  }
  var scale = this.pixelRatio * this.zoom;
  ctx.scale( scale, scale );
  this.onPrerender( ctx );
};

Illustration.prototype.postrenderCanvas = function() {
  this.ctx.restore();
};

// ----- svg ----- //

Illustration.prototype.setSvg = function( element ) {
  this.element = element;
  this.isSvg = true;
  this.pixelRatio = 1;
  // set initial size from width & height attributes
  var width = element.getAttribute('width');
  var height = element.getAttribute('height');
  this.setSizeSvg( width, height );
};

Illustration.prototype.setSizeSvg = function( width, height ) {
  this.width = width;
  this.height = height;
  var viewWidth = width / this.zoom;
  var viewHeight = height / this.zoom;
  var viewX = this.centered ? -viewWidth/2 : 0;
  var viewY = this.centered ? -viewHeight/2 : 0;
  this.element.setAttribute( 'viewBox', viewX + ' ' + viewY + ' ' +
    viewWidth + ' ' + viewHeight );
  if ( this.resize ) {
    // remove size attributes, let size be determined by viewbox
    this.element.removeAttribute('width');
    this.element.removeAttribute('height');
  } else {
    this.element.setAttribute( 'width', width );
    this.element.setAttribute( 'height', height );
  }
};

Illustration.prototype.renderGraphSvg = function( item ) {
  item = item || this;
  empty( this.element );
  this.onPrerender( this.element );
  Anchor.prototype.renderGraphSvg.call( item, this.element );
};

function empty( element ) {
  while ( element.firstChild ) {
    element.removeChild( element.firstChild );
  }
}

// ----- drag ----- //

Illustration.prototype.setDragRotate = function( item ) {
  if ( !item ) {
    return;
  } else if ( item === true ) {
    /* eslint consistent-this: "off" */
    item = this;
  }
  this.dragRotate = item;

  this.bindDrag( this.element );
};

Illustration.prototype.dragStart = function(/* event, pointer */) {
  this.dragStartRX = this.dragRotate.rotate.x;
  this.dragStartRY = this.dragRotate.rotate.y;
  Dragger.prototype.dragStart.apply( this, arguments );
};

Illustration.prototype.dragMove = function( event, pointer ) {
  var moveX = pointer.pageX - this.dragStartX;
  var moveY = pointer.pageY - this.dragStartY;
  var displaySize = Math.min( this.width, this.height );
  var moveRY = moveX / displaySize * TAU;
  var moveRX = moveY / displaySize * TAU;
  this.dragRotate.rotate.x = this.dragStartRX - moveRX;
  this.dragRotate.rotate.y = this.dragStartRY - moveRY;
  Dragger.prototype.dragMove.apply( this, arguments );
};

return Illustration;

}));


/***/ }),

/***/ "./node_modules/zdog/js/index.js":
/*!***************************************!*\
  !*** ./node_modules/zdog/js/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Index
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory(
        __webpack_require__(/*! ./boilerplate */ "./node_modules/zdog/js/boilerplate.js"),
        __webpack_require__(/*! ./canvas-renderer */ "./node_modules/zdog/js/canvas-renderer.js"),
        __webpack_require__(/*! ./svg-renderer */ "./node_modules/zdog/js/svg-renderer.js"),
        __webpack_require__(/*! ./vector */ "./node_modules/zdog/js/vector.js"),
        __webpack_require__(/*! ./anchor */ "./node_modules/zdog/js/anchor.js"),
        __webpack_require__(/*! ./dragger */ "./node_modules/zdog/js/dragger.js"),
        __webpack_require__(/*! ./illustration */ "./node_modules/zdog/js/illustration.js"),
        __webpack_require__(/*! ./path-command */ "./node_modules/zdog/js/path-command.js"),
        __webpack_require__(/*! ./shape */ "./node_modules/zdog/js/shape.js"),
        __webpack_require__(/*! ./group */ "./node_modules/zdog/js/group.js"),
        __webpack_require__(/*! ./rect */ "./node_modules/zdog/js/rect.js"),
        __webpack_require__(/*! ./rounded-rect */ "./node_modules/zdog/js/rounded-rect.js"),
        __webpack_require__(/*! ./ellipse */ "./node_modules/zdog/js/ellipse.js"),
        __webpack_require__(/*! ./polygon */ "./node_modules/zdog/js/polygon.js"),
        __webpack_require__(/*! ./hemisphere */ "./node_modules/zdog/js/hemisphere.js"),
        __webpack_require__(/*! ./cylinder */ "./node_modules/zdog/js/cylinder.js"),
        __webpack_require__(/*! ./cone */ "./node_modules/zdog/js/cone.js"),
        __webpack_require__(/*! ./box */ "./node_modules/zdog/js/box.js")
    );
  } else if ( true ) {
    /* globals define */ // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (root.Zdog),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
})( this, function factory( Zdog, CanvasRenderer, SvgRenderer, Vector, Anchor,
    Dragger, Illustration, PathCommand, Shape, Group, Rect, RoundedRect,
    Ellipse, Polygon, Hemisphere, Cylinder, Cone, Box ) {

      Zdog.CanvasRenderer = CanvasRenderer;
      Zdog.SvgRenderer = SvgRenderer;
      Zdog.Vector = Vector;
      Zdog.Anchor = Anchor;
      Zdog.Dragger = Dragger;
      Zdog.Illustration = Illustration;
      Zdog.PathCommand = PathCommand;
      Zdog.Shape = Shape;
      Zdog.Group = Group;
      Zdog.Rect = Rect;
      Zdog.RoundedRect = RoundedRect;
      Zdog.Ellipse = Ellipse;
      Zdog.Polygon = Polygon;
      Zdog.Hemisphere = Hemisphere;
      Zdog.Cylinder = Cylinder;
      Zdog.Cone = Cone;
      Zdog.Box = Box;

      return Zdog;
});


/***/ }),

/***/ "./node_modules/zdog/js/path-command.js":
/*!**********************************************!*\
  !*** ./node_modules/zdog/js/path-command.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * PathCommand
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! ./vector */ "./node_modules/zdog/js/vector.js") );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.PathCommand = factory( Zdog.Vector );
  }
}( this, function factory( Vector ) {

function PathCommand( method, points, previousPoint ) {
  this.method = method;
  this.points = points.map( mapVectorPoint );
  this.renderPoints = points.map( mapNewVector );
  this.previousPoint = previousPoint;
  this.endRenderPoint = this.renderPoints[ this.renderPoints.length - 1 ];
  // arc actions come with previous point & corner point
  // but require bezier control points
  if ( method == 'arc' ) {
    this.controlPoints = [ new Vector(), new Vector() ];
  }
}

function mapVectorPoint( point ) {
  if ( point instanceof Vector ) {
    return point;
  } else {
    return new Vector( point );
  }
}

function mapNewVector( point ) {
  return new Vector( point );
}

PathCommand.prototype.reset = function() {
  // reset renderPoints back to orignal points position
  var points = this.points;
  this.renderPoints.forEach( function( renderPoint, i ) {
    var point = points[i];
    renderPoint.set( point );
  });
};

PathCommand.prototype.transform = function( translation, rotation, scale ) {
  this.renderPoints.forEach( function( renderPoint ) {
    renderPoint.transform( translation, rotation, scale );
  });
};

PathCommand.prototype.render = function( ctx, elem, renderer ) {
  return this[ this.method ]( ctx, elem, renderer );
};

PathCommand.prototype.move = function( ctx, elem, renderer ) {
  return renderer.move( ctx, elem, this.renderPoints[0] );
};

PathCommand.prototype.line = function( ctx, elem, renderer ) {
  return renderer.line( ctx, elem, this.renderPoints[0] );
};

PathCommand.prototype.bezier = function( ctx, elem, renderer ) {
  var cp0 = this.renderPoints[0];
  var cp1 = this.renderPoints[1];
  var end = this.renderPoints[2];
  return renderer.bezier( ctx, elem, cp0, cp1, end );
};

var arcHandleLength = 9/16;

PathCommand.prototype.arc = function( ctx, elem, renderer ) {
  var prev = this.previousPoint;
  var corner = this.renderPoints[0];
  var end = this.renderPoints[1];
  var cp0 = this.controlPoints[0];
  var cp1 = this.controlPoints[1];
  cp0.set( prev ).lerp( corner, arcHandleLength );
  cp1.set( end ).lerp( corner, arcHandleLength );
  return renderer.bezier( ctx, elem, cp0, cp1, end );
};

return PathCommand;

}));


/***/ }),

/***/ "./node_modules/zdog/js/polygon.js":
/*!*****************************************!*\
  !*** ./node_modules/zdog/js/polygon.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Shape
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! ./boilerplate */ "./node_modules/zdog/js/boilerplate.js"), __webpack_require__(/*! ./shape */ "./node_modules/zdog/js/shape.js") );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Polygon = factory( Zdog, Zdog.Shape );
  }
}( this, function factory( utils, Shape ) {

var Polygon = Shape.subclass({
  sides: 3,
  radius: 0.5,
});

var TAU = utils.TAU;

Polygon.prototype.setPath = function() {
  this.path = [];
  for ( var i=0; i < this.sides; i++ ) {
    var theta = i/this.sides * TAU - TAU/4;
    var x = Math.cos( theta ) * this.radius;
    var y = Math.sin( theta ) * this.radius;
    this.path.push({ x: x, y: y });
  }
};

return Polygon;

}));


/***/ }),

/***/ "./node_modules/zdog/js/rect.js":
/*!**************************************!*\
  !*** ./node_modules/zdog/js/rect.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Rect
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! ./shape */ "./node_modules/zdog/js/shape.js") );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Rect = factory( Zdog.Shape );
  }
}( this, function factory( Shape ) {

var Rect = Shape.subclass({
  width: 1,
  height: 1,
});

Rect.prototype.setPath = function() {
  var x = this.width / 2;
  var y = this.height / 2;
  /* eslint key-spacing: "off" */
  this.path = [
    { x: -x, y: -y },
    { x:  x, y: -y },
    { x:  x, y:  y },
    { x: -x, y:  y },
  ];
};

return Rect;

}));


/***/ }),

/***/ "./node_modules/zdog/js/rounded-rect.js":
/*!**********************************************!*\
  !*** ./node_modules/zdog/js/rounded-rect.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * RoundedRect
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! ./shape */ "./node_modules/zdog/js/shape.js") );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.RoundedRect = factory( Zdog.Shape );
  }
}( this, function factory( Shape ) {

var RoundedRect = Shape.subclass({
  width: 1,
  height: 1,
  cornerRadius: 0.25,
  closed: false,
});

RoundedRect.prototype.setPath = function() {
  /* eslint
     id-length: [ "error", { "min": 2, "exceptions": [ "x", "y" ] }],
     key-spacing: "off" */
  var xA = this.width / 2;
  var yA = this.height / 2;
  var shortSide = Math.min( xA, yA );
  var cornerRadius = Math.min( this.cornerRadius, shortSide );
  var xB = xA - cornerRadius;
  var yB = yA - cornerRadius;
  var path = [
    // top right corner
    { x: xB, y: -yA },
    { arc: [
      { x: xA, y: -yA },
      { x: xA, y: -yB },
    ]},
  ];
  // bottom right corner
  if ( yB ) {
    path.push({ x: xA, y: yB });
  }
  path.push({ arc: [
    { x: xA, y:  yA },
    { x: xB, y:  yA },
  ]});
  // bottom left corner
  if ( xB ) {
    path.push({ x: -xB, y: yA });
  }
  path.push({ arc: [
    { x: -xA, y:  yA },
    { x: -xA, y:  yB },
  ]});
  // top left corner
  if ( yB ) {
    path.push({ x: -xA, y: -yB });
  }
  path.push({ arc: [
    { x: -xA, y: -yA },
    { x: -xB, y: -yA },
  ]});

  // back to top right corner
  if ( xB ) {
    path.push({ x: xB, y: -yA });
  }

  this.path = path;
};

return RoundedRect;

}));


/***/ }),

/***/ "./node_modules/zdog/js/shape.js":
/*!***************************************!*\
  !*** ./node_modules/zdog/js/shape.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Shape
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! ./boilerplate */ "./node_modules/zdog/js/boilerplate.js"), __webpack_require__(/*! ./vector */ "./node_modules/zdog/js/vector.js"),
        __webpack_require__(/*! ./path-command */ "./node_modules/zdog/js/path-command.js"), __webpack_require__(/*! ./anchor */ "./node_modules/zdog/js/anchor.js") );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Shape = factory( Zdog, Zdog.Vector, Zdog.PathCommand, Zdog.Anchor );
  }
}( this, function factory( utils, Vector, PathCommand, Anchor ) {

var Shape = Anchor.subclass({
  stroke: 1,
  fill: false,
  color: '#333',
  closed: true,
  visible: true,
  path: [ {} ],
  front: { z: 1 },
  backface: true,
});

Shape.prototype.create = function( options ) {
  Anchor.prototype.create.call( this, options );
  this.updatePath();
  // front
  this.front = new Vector( options.front || this.front );
  this.renderFront = new Vector( this.front );
  this.renderNormal = new Vector();
};

var actionNames = [
  'move',
  'line',
  'bezier',
  'arc',
];

Shape.prototype.updatePath = function() {
  this.setPath();
  this.updatePathCommands();
};

// place holder for Ellipse, Rect, etc.
Shape.prototype.setPath = function() {};

// parse path into PathCommands
Shape.prototype.updatePathCommands = function() {
  var previousPoint;
  this.pathCommands = this.path.map( function( pathPart, i ) {
    // pathPart can be just vector coordinates -> { x, y, z }
    // or path instruction -> { arc: [ {x0,y0,z0}, {x1,y1,z1} ] }
    var keys = Object.keys( pathPart );
    var method = keys[0];
    var points = pathPart[ method ];
    // default to line if no instruction
    var isInstruction = keys.length == 1 && actionNames.indexOf( method ) != -1;
    if ( !isInstruction ) {
      method = 'line';
      points = pathPart;
    }
    // munge single-point methods like line & move without arrays
    var isLineOrMove = method == 'line' || method == 'move';
    var isPointsArray = Array.isArray( points );
    if ( isLineOrMove && !isPointsArray ) {
      points = [ points ];
    }

    // first action is always move
    method = i === 0 ? 'move' : method;
    // arcs require previous last point
    var command = new PathCommand( method, points, previousPoint );
    // update previousLastPoint
    previousPoint = command.endRenderPoint;
    return command;
  });
};

// ----- update ----- //

Shape.prototype.reset = function() {
  this.renderOrigin.set( this.origin );
  this.renderFront.set( this.front );
  // reset command render points
  this.pathCommands.forEach( function( command ) {
    command.reset();
  });
};

Shape.prototype.transform = function( translation, rotation, scale ) {
  // calculate render points backface visibility & cone/hemisphere shapes
  this.renderOrigin.transform( translation, rotation, scale );
  this.renderFront.transform( translation, rotation, scale );
  this.renderNormal.set( this.renderOrigin ).subtract( this.renderFront );
  // transform points
  this.pathCommands.forEach( function( command ) {
    command.transform( translation, rotation, scale );
  });
  // transform children
  this.children.forEach( function( child ) {
    child.transform( translation, rotation, scale );
  });
};

Shape.prototype.updateSortValue = function() {
  // sort by average z of all points
  // def not geometrically correct, but works for me
  var pointCount = this.pathCommands.length;
  var firstPoint = this.pathCommands[0].endRenderPoint;
  var lastPoint = this.pathCommands[ pointCount - 1 ].endRenderPoint;
  // ignore the final point if self closing shape
  var isSelfClosing = pointCount > 2 && firstPoint.isSame( lastPoint );
  if ( isSelfClosing ) {
    pointCount -= 1;
  }

  var sortValueTotal = 0;
  for ( var i = 0; i < pointCount; i++ ) {
    sortValueTotal += this.pathCommands[i].endRenderPoint.z;
  }
  this.sortValue = sortValueTotal / pointCount;
};

// ----- render ----- //

Shape.prototype.render = function( ctx, renderer ) {
  var length = this.pathCommands.length;
  if ( !this.visible || !length ) {
    return;
  }
  // do not render if hiding backface
  this.isFacingBack = this.renderNormal.z > 0;
  if ( !this.backface && this.isFacingBack ) {
    return;
  }
  if ( !renderer ) {
    throw new Error( 'Zdog renderer required. Set to ' + renderer );
  }
  // render dot or path
  var isDot = length == 1;
  if ( renderer.isCanvas && isDot ) {
    this.renderCanvasDot( ctx, renderer );
  } else {
    this.renderPath( ctx, renderer );
  }
};

var TAU = utils.TAU;
// Safari does not render lines with no size, have to render circle instead
Shape.prototype.renderCanvasDot = function( ctx ) {
  var lineWidth = this.getLineWidth();
  if ( !lineWidth ) {
    return;
  }
  ctx.fillStyle = this.getRenderColor();
  var point = this.pathCommands[0].endRenderPoint;
  ctx.beginPath();
  var radius = lineWidth/2;
  ctx.arc( point.x, point.y, radius, 0, TAU );
  ctx.fill();
};

Shape.prototype.getLineWidth = function() {
  if ( !this.stroke ) {
    return 0;
  }
  if ( this.stroke == true ) {
    return 1;
  }
  return this.stroke;
};

Shape.prototype.getRenderColor = function() {
  // use backface color if applicable
  var isBackfaceColor = typeof this.backface == 'string' && this.isFacingBack;
  var color = isBackfaceColor ? this.backface : this.color;
  return color;
};

Shape.prototype.renderPath = function( ctx, renderer ) {
  var elem = this.getRenderElement( ctx, renderer );
  var isTwoPoints = this.pathCommands.length == 2 &&
    this.pathCommands[1].method == 'line';
  var isClosed = !isTwoPoints && this.closed;
  var color = this.getRenderColor();

  renderer.renderPath( ctx, elem, this.pathCommands, isClosed );
  renderer.stroke( ctx, elem, this.stroke, color, this.getLineWidth() );
  renderer.fill( ctx, elem, this.fill, color );
  renderer.end( ctx, elem );
};

var svgURI = 'http://www.w3.org/2000/svg';

Shape.prototype.getRenderElement = function( ctx, renderer ) {
  if ( !renderer.isSvg ) {
    return;
  }
  if ( !this.svgElement ) {
    // create svgElement
    this.svgElement = document.createElementNS( svgURI, 'path');
    this.svgElement.setAttribute( 'stroke-linecap', 'round' );
    this.svgElement.setAttribute( 'stroke-linejoin', 'round' );
  }
  return this.svgElement;
};

return Shape;

}));


/***/ }),

/***/ "./node_modules/zdog/js/svg-renderer.js":
/*!**********************************************!*\
  !*** ./node_modules/zdog/js/svg-renderer.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * SvgRenderer
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    root.Zdog.SvgRenderer = factory();
  }
}( this, function factory() {

var SvgRenderer = { isSvg: true };

// round path coordinates to 3 decimals
var round = SvgRenderer.round = function( num ) {
  return Math.round( num * 1000 ) / 1000;
};

function getPointString( point ) {
  return round( point.x ) + ',' + round( point.y ) + ' ';
}

SvgRenderer.begin = function() {};

SvgRenderer.move = function( svg, elem, point ) {
  return 'M' + getPointString( point );
};

SvgRenderer.line = function( svg, elem, point ) {
  return 'L' + getPointString( point );
};

SvgRenderer.bezier = function( svg, elem, cp0, cp1, end ) {
  return 'C' + getPointString( cp0 ) + getPointString( cp1 ) +
    getPointString( end );
};

SvgRenderer.closePath = function(/* elem */) {
  return 'Z';
};

SvgRenderer.setPath = function( svg, elem, pathValue ) {
  elem.setAttribute( 'd', pathValue );
};

SvgRenderer.renderPath = function( svg, elem, pathCommands, isClosed ) {
  var pathValue = '';
  pathCommands.forEach( function( command ) {
    pathValue += command.render( svg, elem, SvgRenderer );
  });
  if ( isClosed ) {
    pathValue += this.closePath( svg, elem );
  }
  this.setPath( svg, elem, pathValue );
};

SvgRenderer.stroke = function( svg, elem, isStroke, color, lineWidth ) {
  if ( !isStroke ) {
    return;
  }
  elem.setAttribute( 'stroke', color );
  elem.setAttribute( 'stroke-width', lineWidth );
};

SvgRenderer.fill = function( svg, elem, isFill, color ) {
  var fillColor = isFill ? color : 'none';
  elem.setAttribute( 'fill', fillColor );
};

SvgRenderer.end = function( svg, elem ) {
  svg.appendChild( elem );
};

return SvgRenderer;

}));


/***/ }),

/***/ "./node_modules/zdog/js/vector.js":
/*!****************************************!*\
  !*** ./node_modules/zdog/js/vector.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Vector
 */

( function( root, factory ) {
  // module definition
  if (  true && module.exports ) {
    // CommonJS
    module.exports = factory( __webpack_require__(/*! ./boilerplate */ "./node_modules/zdog/js/boilerplate.js") );
  } else {
    // browser global
    var Zdog = root.Zdog;
    Zdog.Vector = factory( Zdog );
  }

}( this, function factory( utils ) {

function Vector( position ) {
  this.set( position );
}

var TAU = utils.TAU;

// 'pos' = 'position'
Vector.prototype.set = function( pos ) {
  this.x = pos && pos.x || 0;
  this.y = pos && pos.y || 0;
  this.z = pos && pos.z || 0;
  return this;
};

// set coordinates without sanitizing
// vec.write({ y: 2 }) only sets y coord
Vector.prototype.write = function( pos ) {
  if ( !pos ) {
    return this;
  }
  this.x = pos.x != undefined ? pos.x : this.x;
  this.y = pos.y != undefined ? pos.y : this.y;
  this.z = pos.z != undefined ? pos.z : this.z;
  return this;
};

Vector.prototype.rotate = function( rotation ) {
  if ( !rotation ) {
    return;
  }
  this.rotateZ( rotation.z );
  this.rotateY( rotation.y );
  this.rotateX( rotation.x );
  return this;
};

Vector.prototype.rotateZ = function( angle ) {
  rotateProperty( this, angle, 'x', 'y' );
};

Vector.prototype.rotateX = function( angle ) {
  rotateProperty( this, angle, 'y', 'z' );
};

Vector.prototype.rotateY = function( angle ) {
  rotateProperty( this, angle, 'x', 'z' );
};

function rotateProperty( vec, angle, propA, propB ) {
  if ( !angle || angle % TAU === 0 ) {
    return;
  }
  var cos = Math.cos( angle );
  var sin = Math.sin( angle );
  var a = vec[ propA ];
  var b = vec[ propB ];
  vec[ propA ] = a*cos - b*sin;
  vec[ propB ] = b*cos + a*sin;
}

Vector.prototype.isSame = function( pos ) {
  if ( !pos ) {
    return false;
  }
  return this.x === pos.x && this.y === pos.y && this.z === pos.z;
};

Vector.prototype.add = function( pos ) {
  if ( !pos ) {
    return this;
  }
  this.x += pos.x || 0;
  this.y += pos.y || 0;
  this.z += pos.z || 0;
  return this;
};

Vector.prototype.subtract = function( pos ) {
  if ( !pos ) {
    return this;
  }
  this.x -= pos.x || 0;
  this.y -= pos.y || 0;
  this.z -= pos.z || 0;
  return this;
};

Vector.prototype.multiply = function( pos ) {
  if ( pos == undefined ) {
    return this;
  }
  // multiple all values by same number
  if ( typeof pos == 'number' ) {
    this.x *= pos;
    this.y *= pos;
    this.z *= pos;
  } else {
    // multiply object
    this.x *= pos.x != undefined ? pos.x : 1;
    this.y *= pos.y != undefined ? pos.y : 1;
    this.z *= pos.z != undefined ? pos.z : 1;
  }
  return this;
};

Vector.prototype.transform = function( translation, rotation, scale ) {
  this.multiply( scale );
  this.rotate( rotation );
  this.add( translation );
  return this;
};

Vector.prototype.lerp = function( pos, alpha ) {
  this.x = utils.lerp( this.x, pos.x || 0, alpha );
  this.y = utils.lerp( this.y, pos.y || 0, alpha );
  this.z = utils.lerp( this.z, pos.z || 0, alpha );
  return this;
};

Vector.prototype.magnitude = function() {
  var sum = this.x*this.x + this.y*this.y + this.z*this.z;
  return getMagnitudeSqrt( sum );
};

function getMagnitudeSqrt( sum ) {
  // PERF: check if sum ~= 1 and skip sqrt
  if ( Math.abs( sum - 1 ) < 0.00000001 ) {
    return 1;
  }
  return Math.sqrt( sum );
}

Vector.prototype.magnitude2d = function() {
  var sum = this.x*this.x + this.y*this.y;
  return getMagnitudeSqrt( sum );
};

Vector.prototype.copy = function() {
  return new Vector( this );
};

return Vector;

}));


/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: defaults, reactive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaults", function() { return defaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactive", function() { return reactive; });
/* harmony import */ var _moves__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moves */ "./src/moves.js");

function defaults(obj) {
  var config = Object.assign({
    zoom: 1,
    size: 400,
    fov: 0,
    tps: 4,
    backface: false,
    cubies: true,
    colors: ['#ffffff', '#0045ad', '#b90000', '#009b48', '#ff5900', '#ffd500'],
    cubeColor: '#000000',
    rotate: {
      x: -_moves__WEBPACK_IMPORTED_MODULE_0__["quarter"] / 2,
      y: _moves__WEBPACK_IMPORTED_MODULE_0__["quarter"] / 2
    }
  }, obj); // computed values

  Object.defineProperty(config, 'baseZoom', {
    get: function get() {
      return config.size / 400;
    }
  });
  return config;
} // expose config

function reactive(config, API) {
  Object.keys(config).forEach(function (key) {
    Object.defineProperty(API, key, {
      get: function get() {
        return config[key];
      },
      set: function set(value) {
        config[key] = value;
        API.onChange(key);
      }
    });
  });
  Object.defineProperty(API, 'onChange', {
    enumerable: false
  });
  return API;
}

/***/ }),

/***/ "./src/cube.js":
/*!*********************!*\
  !*** ./src/cube.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var zdog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zdog */ "./node_modules/zdog/js/index.js");
/* harmony import */ var zdog__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zdog__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _moves__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moves */ "./src/moves.js");
/* harmony import */ var _cubies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubies */ "./src/cubies.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./src/config.js");
/* harmony import */ var _fov__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fov */ "./src/fov.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var element = _ref.element,
      originalConfig = _ref.config;
  var config = Object(_config__WEBPACK_IMPORTED_MODULE_3__["defaults"])(originalConfig);
  var illo = new zdog__WEBPACK_IMPORTED_MODULE_0___default.a.Illustration({
    element: element,
    dragRotate: true
  });

  var setSize = function setSize() {
    element.setAttribute('width', config.size);
    element.setAttribute('height', config.size);
    illo.setMeasuredSize();
  };

  var setZoom = function setZoom() {
    illo.zoom = config.zoom;
  };

  var setRotate = function setRotate() {
    illo.rotate = config.rotate;
  };

  setSize();
  setZoom();
  setRotate();
  Object(_fov__WEBPACK_IMPORTED_MODULE_4__["default"])(config.fov);
  var queue = [];

  var clearQueue = function clearQueue() {
    return queue.splice(0, queue.length).map(function (move) {
      return move.source;
    });
  };

  var cube = _objectSpread({}, Object(_cubies__WEBPACK_IMPORTED_MODULE_2__["Model"])(), {
    cubies: Object(_cubies__WEBPACK_IMPORTED_MODULE_2__["Cubies"])({
      illo: illo,
      config: config
    }),
    setCubieColors: function setCubieColors(positions, type) {
      for (var i = 0; i < positions.length; i++) {
        var index = positions[i];
        cube.cubies[type][index].setColors(cube[type][index]);
      }
    },
    reset: function reset() {
      Object.assign(cube, Object(_cubies__WEBPACK_IMPORTED_MODULE_2__["Model"])());
      cube.setAllCubies();

      if (queue.length) {
        queue[0].tween(0);
        clearQueue();
      }
    },
    setAllCubies: function setAllCubies() {
      cube.setCubieColors([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 'edges');
      cube.setCubieColors([0, 1, 2, 3, 4, 5, 6, 7], 'corners');
      cube.setCubieColors([0, 1, 2, 3, 4, 5], 'centres');
    },
    reload: function reload() {
      cube.cubies.edges.forEach(function (edge) {
        return edge.destroy();
      });
      cube.cubies.corners.forEach(function (corner) {
        return corner.destroy();
      });
      cube.cubies.centres.forEach(function (centre) {
        return centre.destroy();
      });
      cube.cubies = Object(_cubies__WEBPACK_IMPORTED_MODULE_2__["Cubies"])({
        illo: illo,
        config: config
      });
      cube.setAllCubies();

      if (queue.length) {
        var sources = clearQueue();
        var moves = Object(_moves__WEBPACK_IMPORTED_MODULE_1__["getMoves"])(sources, cube); // TODO: check epoch is actually set here

        moves[0].epoch = sources[0].epoch;
        queue.push.apply(queue, _toConsumableArray(moves));
      }
    }
  }); // API


  return Object(_config__WEBPACK_IMPORTED_MODULE_3__["reactive"])(config, {
    onChange: function onChange(key) {
      key === 'fov' && Object(_fov__WEBPACK_IMPORTED_MODULE_4__["default"])(config.fov);
      key === 'size' && setSize();
      key === 'zoom' && setZoom();
      key === 'rotate' && setRotate();
      cube.reload();
    },
    // preload for element width/ height, illo rotate
    // moveProcessing: crushAxial|expand
    // combine axial { moves: [] }
    // move.invert()
    // animation spring for moves
    // stickerheight for LL
    // setState
    // getState
    // disable autorotate
    // fov
    reset: cube.reset,
    move: function move(_move) {
      queue.push(Object(_moves__WEBPACK_IMPORTED_MODULE_1__["getMove"])(_move, cube));
    },
    moves: function moves(_moves) {
      return queue.push.apply(queue, _toConsumableArray(Object(_moves__WEBPACK_IMPORTED_MODULE_1__["getMoves"])(_moves, cube)));
    },
    setupMoves: function setupMoves(moves) {
      var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      reset && cube.reset();
      Object(_moves__WEBPACK_IMPORTED_MODULE_1__["getMoves"])(moves, cube).forEach(function (move) {
        return move.apply();
      });
    },
    isSolved: function isSolved() {
      var _cube$cubies = cube.cubies,
          centres = _cube$cubies.centres,
          edges = _cube$cubies.edges,
          corners = _cube$cubies.corners;
      var lookup = {};
      centres.forEach(function (_ref2) {
        var _ref2$stickers = _slicedToArray(_ref2.stickers, 1),
            _ref2$stickers$ = _ref2$stickers[0],
            color = _ref2$stickers$.color,
            axis = _ref2$stickers$.axis,
            offset = _ref2$stickers$.offset;

        lookup["".concat(axis, "|").concat(offset)] = color;
      });
      var pieces = edges.concat(corners).map(function (piece) {
        return piece.stickers;
      });

      for (var i = 0; i < pieces.length; i++) {
        for (var j = 0; j < pieces[i].length; j++) {
          var _pieces$i$j = pieces[i][j],
              axis = _pieces$i$j.axis,
              offset = _pieces$i$j.offset,
              color = _pieces$i$j.color;

          if (color !== lookup["".concat(axis, "|").concat(offset)]) {
            return false;
          }
        }
      }

      return true;
    },
    render: function render() {
      // snap off
      // if (queue.length > 1) {
      //     queue.splice(0, queue.length-1).forEach((move) => {
      //         move.apply()
      //     })
      // }
      if (queue.length !== 0) {
        var diff = 1000 / config.tps;
        var now = performance.now();
        var move = queue[0]; // const { axis } = move;
        // for (let i = 0; i < queue.length; i++) {
        //     const move = queue[i]
        //     if (move.axis !== axis) break;
        //     if (!move.epoch) {
        //         move.epoch = now;
        //     }
        //     const elapsed = now - move.epoch;
        //     if (elapsed > diff && i === 0) {
        //         move.apply();
        //         queue.shift();
        //     } else {
        //         move.tween(elapsed / diff);
        //     }
        // }

        if (!move.epoch) {
          move.epoch = now;
        }

        var elapsed = now - move.epoch;

        if (elapsed > diff) {
          move.apply();
          queue.shift();
        } else {
          move.tween(elapsed / diff);
        }
      }

      illo.updateRenderGraph();
    }
  });
});

/***/ }),

/***/ "./src/cubies.js":
/*!***********************!*\
  !*** ./src/cubies.js ***!
  \***********************/
/*! exports provided: Model, Cubies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Model", function() { return Model; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cubies", function() { return Cubies; });
/* harmony import */ var zdog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zdog */ "./node_modules/zdog/js/index.js");
/* harmony import */ var zdog__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zdog__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _moves__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moves */ "./src/moves.js");

 // TODO: axis and offset can be inferred from color

var centres = [// U B R F L D
{
  color: 0,
  axis: 'y',
  offset: -1
}, {
  color: 1,
  axis: 'z',
  offset: -1
}, {
  color: 2,
  axis: 'x',
  offset: 1
}, {
  color: 3,
  axis: 'z',
  offset: 1
}, {
  color: 4,
  axis: 'x',
  offset: -1
}, {
  color: 5,
  axis: 'y',
  offset: 1
}];
var edges = [// UB UR UF UL
[{
  color: 1,
  axis: 'z',
  offset: -1
}, {
  color: 0,
  axis: 'y',
  offset: -1
}], [{
  color: 2,
  axis: 'x',
  offset: 1
}, {
  color: 0,
  axis: 'y',
  offset: -1
}], [{
  color: 3,
  axis: 'z',
  offset: 1
}, {
  color: 0,
  axis: 'y',
  offset: -1
}], [{
  color: 4,
  axis: 'x',
  offset: -1
}, {
  color: 0,
  axis: 'y',
  offset: -1
}], // BR FR FL BL
[{
  color: 2,
  axis: 'x',
  offset: 1
}, {
  color: 1,
  axis: 'z',
  offset: -1
}], [{
  color: 2,
  axis: 'x',
  offset: 1
}, {
  color: 3,
  axis: 'z',
  offset: 1
}], [{
  color: 4,
  axis: 'x',
  offset: -1
}, {
  color: 3,
  axis: 'z',
  offset: 1
}], [{
  color: 4,
  axis: 'x',
  offset: -1
}, {
  color: 1,
  axis: 'z',
  offset: -1
}], // DB DR DF DL
[{
  color: 1,
  axis: 'z',
  offset: -1
}, {
  color: 5,
  axis: 'y',
  offset: 1
}], [{
  color: 2,
  axis: 'x',
  offset: 1
}, {
  color: 5,
  axis: 'y',
  offset: 1
}], [{
  color: 3,
  axis: 'z',
  offset: 1
}, {
  color: 5,
  axis: 'y',
  offset: 1
}], [{
  color: 4,
  axis: 'x',
  offset: -1
}, {
  color: 5,
  axis: 'y',
  offset: 1
}]];
var corners = [// UBR URF UFL ULB
[{
  color: 2,
  axis: 'x',
  offset: 1
}, {
  color: 0,
  axis: 'y',
  offset: -1
}, {
  color: 1,
  axis: 'z',
  offset: -1
}], [{
  color: 2,
  axis: 'x',
  offset: 1
}, {
  color: 0,
  axis: 'y',
  offset: -1
}, {
  color: 3,
  axis: 'z',
  offset: 1
}], [{
  color: 4,
  axis: 'x',
  offset: -1
}, {
  color: 0,
  axis: 'y',
  offset: -1
}, {
  color: 3,
  axis: 'z',
  offset: 1
}], [{
  color: 4,
  axis: 'x',
  offset: -1
}, {
  color: 0,
  axis: 'y',
  offset: -1
}, {
  color: 1,
  axis: 'z',
  offset: -1
}], // DRB DFR DLF DBL
[{
  color: 2,
  axis: 'x',
  offset: 1
}, {
  color: 5,
  axis: 'y',
  offset: 1
}, {
  color: 1,
  axis: 'z',
  offset: -1
}], [{
  color: 2,
  axis: 'x',
  offset: 1
}, {
  color: 5,
  axis: 'y',
  offset: 1
}, {
  color: 3,
  axis: 'z',
  offset: 1
}], [{
  color: 4,
  axis: 'x',
  offset: -1
}, {
  color: 5,
  axis: 'y',
  offset: 1
}, {
  color: 3,
  axis: 'z',
  offset: 1
}], [{
  color: 4,
  axis: 'x',
  offset: -1
}, {
  color: 5,
  axis: 'y',
  offset: 1
}, {
  color: 1,
  axis: 'z',
  offset: -1
}]];
function Model() {
  return {
    edges: edges.map(function (edge) {
      return edge.map(function (sticker) {
        return sticker.color;
      });
    }),
    corners: corners.map(function (corner) {
      return corner.map(function (sticker) {
        return sticker.color;
      });
    }),
    centres: centres.map(function (centre) {
      return [centre.color];
    })
  };
}
function Cubies(obj) {
  return {
    edges: edges.map(function (edge) {
      return Cubie(cloneStickers(edge), obj);
    }),
    corners: corners.map(function (corner) {
      return Cubie(cloneStickers(corner), obj);
    }),
    centres: centres.map(function (centre) {
      return Cubie(cloneStickers([centre]), obj);
    })
  };
}

function cloneStickers(stickers) {
  return stickers.map(function (sticker) {
    return Object.assign({}, sticker);
  });
}

function Cubie(stickers, _ref) {
  var illo = _ref.illo,
      config = _ref.config;
  var colorsRGB = config.colors,
      baseZoom = config.baseZoom;
  var distance = baseZoom * 76;
  var anchor = new zdog__WEBPACK_IMPORTED_MODULE_0___default.a.Anchor({
    addTo: illo
  }); // infer position from cube stickers, because why not

  var translate = stickers.reduce(function (acc, _ref2) {
    var offset = _ref2.offset,
        axis = _ref2.axis;
    acc[axis] = distance * offset;
    return acc;
  }, {});
  var container = new zdog__WEBPACK_IMPORTED_MODULE_0___default.a.Anchor({
    addTo: anchor,
    translate: translate
  });
  var size = baseZoom * 72;

  if (config.cubies) {
    new zdog__WEBPACK_IMPORTED_MODULE_0___default.a.Box({
      addTo: container,
      width: size,
      height: size,
      depth: size,
      stroke: false,
      color: config.cubeColor
    });
  }

  var stickerOffset = size / 2 + 1;
  var rotations = {
    x: {
      y: _moves__WEBPACK_IMPORTED_MODULE_1__["quarter"]
    },
    y: {
      x: _moves__WEBPACK_IMPORTED_MODULE_1__["quarter"]
    }
  };
  var stickerElements = stickers.map(function (_ref3) {
    var color = _ref3.color,
        axis = _ref3.axis,
        offset = _ref3.offset;
    var group = new zdog__WEBPACK_IMPORTED_MODULE_0___default.a.Group({
      addTo: container
    });
    var stickerEl = new zdog__WEBPACK_IMPORTED_MODULE_0___default.a.Rect({
      addTo: group,
      width: size * 0.9,
      height: size * 0.9,
      stroke: 2,
      fill: true,
      color: colorsRGB[color],
      rotate: rotations[axis]
    });
    stickerEl.translate[axis] += stickerOffset * offset;

    if (config.backface) {
      var back = stickerEl.copy();
      back.translate[axis] += size * offset;
      var zOffset = axis === 'z' ? -1 : 1;
      back.front = {
        z: _moves__WEBPACK_IMPORTED_MODULE_1__["quarter"] * offset * zOffset
      };
      back.opacity = 0.5;
      back.alpha = 0.5;
      back.backface = false;
    }

    return group;
  });
  return {
    anchor: anchor,
    stickers: stickers,
    setColors: function setColors(colors) {
      for (var i = 0; i < stickerElements.length; i++) {
        var color = colorsRGB[colors[i]];
        stickerElements[i].children[0].color = color;

        if (config.backface) {
          stickerElements[i].children[1].color = color;
        }

        stickers[i].color = colors[i];
      }
    },
    destroy: function destroy() {
      return anchor.remove();
    }
  };
}

/***/ }),

/***/ "./src/fov.js":
/*!********************!*\
  !*** ./src/fov.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setFov; });
/* harmony import */ var zdog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zdog */ "./node_modules/zdog/js/index.js");
/* harmony import */ var zdog__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zdog__WEBPACK_IMPORTED_MODULE_0__);

var _Zdog$CanvasRenderer = zdog__WEBPACK_IMPORTED_MODULE_0___default.a.CanvasRenderer,
    move = _Zdog$CanvasRenderer.move,
    line = _Zdog$CanvasRenderer.line;
function setFov(i) {
  if (i === 0) {
    Object.assign(zdog__WEBPACK_IMPORTED_MODULE_0___default.a.CanvasRenderer, {
      move: move,
      line: line
    });
  } else {
    var sign = i < 0 ? -1 : 1;
    var fov = sign * Object(zdog__WEBPACK_IMPORTED_MODULE_0__["lerp"])(-20000, -250, Math.abs(Math.cos(sign - i)));

    zdog__WEBPACK_IMPORTED_MODULE_0___default.a.CanvasRenderer.move = function (ctx, elem, point) {
      var s = fov / (fov + point.z);
      ctx.moveTo(point.x * s, point.y * s);
    };

    zdog__WEBPACK_IMPORTED_MODULE_0___default.a.CanvasRenderer.line = function (ctx, elem, point) {
      var s = fov / (fov + point.z);
      ctx.lineTo(point.x * s, point.y * s);
    };
  }
}

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cube__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cube */ "./src/cube.js");

/*
 * examples
 *
 * stickerless
 * backface
 * japanese
 * snap to position
 * record/playback
 * alg demo
 * ksim flexlayout-react
 * solve playback
 * LL case
 * move slider (slide during moves) | lerp | snap
 * return to position lerp / delay
 * timer
 * -2 order
 * bld
 * solver
 * trainer
 * controlled position
 * disco / trippy
 * pillowed
 * R3 M'R2 axial
 * R2'
 */

function zsim(container) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var cube = Object(_cube__WEBPACK_IMPORTED_MODULE_0__["default"])({
    element: container.appendChild(document.createElement('canvas')),
    config: config
  });

  (function loop() {
    cube.render();
    requestAnimationFrame(loop);
  })();

  return cube;
}

/* harmony default export */ __webpack_exports__["default"] = (zsim);

/***/ }),

/***/ "./src/moves.js":
/*!**********************!*\
  !*** ./src/moves.js ***!
  \**********************/
/*! exports provided: quarter, half, getMove, getMoves */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quarter", function() { return quarter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "half", function() { return half; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMove", function() { return getMove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMoves", function() { return getMoves; });
/* harmony import */ var zdog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zdog */ "./node_modules/zdog/js/index.js");
/* harmony import */ var zdog__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zdog__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


var quarter = zdog__WEBPACK_IMPORTED_MODULE_0__["TAU"] / 4;
var half = zdog__WEBPACK_IMPORTED_MODULE_0__["TAU"] / 2; // U B R F L D

var moveList = {
  R: {
    edges: [5, 9, 4, 1],
    corners: [5, 4, 0, 1],
    centre: 2,
    axis: 'x'
  },
  U: {
    edges: [3, 2, 1, 0],
    corners: [3, 2, 1, 0],
    centre: 0,
    axis: 'y'
  },
  F: {
    edges: [6, 10, 5, 2],
    corners: [1, 2, 6, 5],
    centre: 3,
    axis: 'z'
  },
  L: {
    edges: [3, 7, 11, 6],
    corners: [2, 3, 7, 6],
    centre: 4,
    axis: 'x',
    axisFlip: true
  },
  B: {
    edges: [4, 8, 7, 0],
    corners: [4, 7, 3, 0],
    centre: 1,
    axis: 'z',
    axisFlip: true
  },
  D: {
    edges: [8, 9, 10, 11],
    corners: [4, 5, 6, 7],
    centre: 5,
    axis: 'y',
    axisFlip: true
  },
  M: {
    centres: [0, 1, 5, 3],
    edges: [2, 0, 8, 10],
    axis: 'x',
    axisFlip: true
  },
  E: {
    centres: [3, 4, 1, 2],
    edges: [4, 5, 6, 7],
    axis: 'y',
    axisFlip: true
  },
  S: {
    centres: [4, 5, 2, 0],
    edges: [3, 11, 9, 1],
    axis: 'z'
  },
  r: {
    moves: [toObject("R"), toObject("M'")]
  },
  l: {
    moves: [toObject("L"), toObject("M")]
  },
  f: {
    moves: [toObject("F"), toObject("S")]
  },
  b: {
    moves: [toObject("B"), toObject("S'")]
  },
  u: {
    moves: [toObject("U"), toObject("E'")]
  },
  d: {
    moves: [toObject("D"), toObject("E")]
  },
  x: {
    moves: [toObject("R"), toObject("M'"), toObject("L'")]
  },
  y: {
    moves: [toObject("U"), toObject("E'"), toObject("D'")]
  },
  z: {
    moves: [toObject("F"), toObject("S"), toObject("B'")]
  }
};
function getMove(moveRaw, cube) {
  var _toObject = toObject(moveRaw),
      move = _toObject.move,
      order = _toObject.order;

  if (!moveList[move]) throw new Error("invalid move ".concat(move));
  var _moveList$move = moveList[move],
      corners = _moveList$move.corners,
      edges = _moveList$move.edges,
      centres = _moveList$move.centres,
      centre = _moveList$move.centre,
      axis = _moveList$move.axis,
      axisFlip = _moveList$move.axisFlip,
      moves = _moveList$move.moves; // calculate transforms

  var transforms = [];
  corners && transforms.push.apply(transforms, _toConsumableArray(corners.map(function (index) {
    return cube.cubies.corners[index];
  })));
  edges && transforms.push.apply(transforms, _toConsumableArray(edges.map(function (index) {
    return cube.cubies.edges[index];
  })));
  centres && transforms.push.apply(transforms, _toConsumableArray(centres.map(function (index) {
    return cube.cubies.centres[index];
  })));
  typeof centre !== 'undefined' && transforms.push(cube.cubies.centres[centre]);
  var axisOrder = axisFlip ? -1 : 1;
  var extraMoves = moves && moves.map(function (move) {
    return getMove(applyOrder(clone(move), order), cube);
  }); // animate cubies

  function tween(_i) {
    var i = Object(zdog__WEBPACK_IMPORTED_MODULE_0__["easeInOut"])(_i);

    if (extraMoves) {
      extraMoves.forEach(function (move) {
        return move.tween(i);
      });
    }

    if (transforms.length !== 0) {
      for (var j = 0; j < transforms.length; j++) {
        var cubie = transforms[j];
        cubie.anchor.rotate[axis] = Object(zdog__WEBPACK_IMPORTED_MODULE_0__["lerp"])(0, quarter * order * axisOrder, i);
      }
    }
  } // swap stickers / clean up move


  function apply() {
    extraMoves && extraMoves.forEach(function (move) {
      return move.apply();
    });

    if (edges) {
      // force axis as z if we have a slice move (for some reason?)
      doCycle(cube.edges, order, edges, centres ? 'z' : axis);
      cube.setCubieColors(edges, 'edges');
    }

    if (centres) {
      doCycle(cube.centres, order, centres);
      cube.setCubieColors(centres, 'centres');
    }

    if (corners) {
      doCycle(cube.corners, order, corners, axis);
      cube.setCubieColors(corners, 'corners');
    } // reset transforms


    tween(0);
  }

  return {
    apply: apply,
    tween: tween,
    transforms: transforms,
    axis: axis,
    source: {
      move: move,
      order: order
    }
  };
}
function getMoves(moves, cube) {
  return splitMoves(moves).map(function (move) {
    return getMove(move, cube);
  });
}

function splitMoves(str) {
  if (typeof str !== 'string') return str;
  return str.split(/(\ww?['\d]?)/).filter(function (d) {
    return d.trim();
  });
}

function toObject(move) {
  if (typeof move !== 'string') return move;
  if (move[1] === 'w') move = "".concat(move[0].toLowerCase()).concat(move[2] || '');
  return {
    move: move[0],
    order: {
      '\'': -1,
      '2': 2
    }[move[1]] || 1
  };
}

function clone(move) {
  return Object.assign({}, move);
}

function applyOrder(move, order) {
  if (order === 1) return move;

  if (order === -1) {
    move.order = move.order === 2 ? 2 : -move.order;
  }

  if (order == 2) {
    move.order = move.order === 2 ? 0 : 2;
  }

  return move;
}

var cornerSwaps = {
  x: [1, 2],
  y: [0, 2],
  z: [0, 1]
};

function doCycle(arr, order, cycle, axis) {
  if (order === 0) return;

  if (order === -1 || order === 3) {
    cycle = _toConsumableArray(cycle).reverse();
  }

  if (order === 2) {
    doCycle(arr, 1, cycle, axis);
  } // cycles


  for (var i = 0; i < cycle.length - 1; i++) {
    swap(arr, cycle[i], cycle[i + 1]);
  } // corner 'twists'


  if (arr[0].length === 3) {
    for (var _i2 = 0; _i2 < cycle.length; _i2++) {
      swap.apply(void 0, [arr[cycle[_i2]]].concat(_toConsumableArray(cornerSwaps[axis])));
    }
  } // edge flips
  else if (axis === 'z') {
      for (var _i3 = 0; _i3 < cycle.length; _i3++) {
        swap(arr[cycle[_i3]], 0, 1);
      }
    }
}

function swap(arr, first, second) {
  var tmp = arr[first];
  arr[first] = arr[second];
  arr[second] = tmp;
}

/***/ })

/******/ });
//# sourceMappingURL=zsim.js.map
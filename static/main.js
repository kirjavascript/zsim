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

 // TODO: destroy -> return stickers
// TODO: config -> generate setters/getters from an array

/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var illo = _ref.illo,
      zoom = _ref.zoom,
      colorsRGB = _ref.colors,
      cubeColor = _ref.cubeColor;
  var distance = zoom * 38;

  function Cubie(_ref2) {
    var stickers = _ref2.stickers;
    var anchor = new zdog__WEBPACK_IMPORTED_MODULE_0___default.a.Anchor({
      addTo: illo
    }); // infer position from cube stickers, because why not

    var translate = stickers.reduce(function (acc, _ref3) {
      var offset = _ref3.offset,
          axis = _ref3.axis;
      acc[axis] = distance * offset;
      return acc;
    }, {});
    var container = new zdog__WEBPACK_IMPORTED_MODULE_0___default.a.Anchor({
      addTo: anchor,
      translate: translate
    });
    var size = zoom * 36;
    new zdog__WEBPACK_IMPORTED_MODULE_0___default.a.Box({
      addTo: container,
      width: size,
      height: size,
      depth: size,
      stroke: false,
      color: cubeColor
    });
    var stickerOffset = size / 2 + 1;
    var rotations = {
      x: {
        y: _moves__WEBPACK_IMPORTED_MODULE_1__["quarter"]
      },
      y: {
        x: _moves__WEBPACK_IMPORTED_MODULE_1__["quarter"]
      }
    };
    var stickerElements = stickers.map(function (_ref4) {
      var color = _ref4.color,
          axis = _ref4.axis,
          offset = _ref4.offset;
      var stickerEl = new zdog__WEBPACK_IMPORTED_MODULE_0___default.a.Rect({
        addTo: container,
        width: size * 0.9,
        height: size * 0.9,
        stroke: 2,
        fill: true,
        color: colorsRGB[color],
        rotate: rotations[axis]
      });
      stickerEl.translate[axis] += stickerOffset * offset;
      return stickerEl;
    });
    return {
      anchor: anchor,
      stickers: stickers,
      setColors: function setColors(colors) {
        for (var i = 0; i < stickerElements.length; i++) {
          var color = colors[i];
          stickerElements[i].color = colorsRGB[color];
          stickers[i].color = color;
        }
      }
    };
  }

  var centres = [Cubie({
    stickers: [{
      color: 0,
      axis: 'y',
      offset: -1
    }]
  }), Cubie({
    stickers: [{
      color: 1,
      axis: 'z',
      offset: -1
    }]
  }), Cubie({
    stickers: [{
      color: 2,
      axis: 'x',
      offset: 1
    }]
  }), Cubie({
    stickers: [{
      color: 3,
      axis: 'z',
      offset: 1
    }]
  }), Cubie({
    stickers: [{
      color: 4,
      axis: 'x',
      offset: -1
    }]
  }), Cubie({
    stickers: [{
      color: 5,
      axis: 'y',
      offset: 1
    }]
  })];
  var edges = [Cubie({
    stickers: [{
      color: 1,
      axis: 'z',
      offset: -1
    }, {
      color: 0,
      axis: 'y',
      offset: -1
    }]
  }), Cubie({
    stickers: [{
      color: 2,
      axis: 'x',
      offset: 1
    }, {
      color: 0,
      axis: 'y',
      offset: -1
    }]
  }), Cubie({
    stickers: [{
      color: 3,
      axis: 'z',
      offset: 1
    }, {
      color: 0,
      axis: 'y',
      offset: -1
    }]
  }), Cubie({
    stickers: [{
      color: 4,
      axis: 'x',
      offset: -1
    }, {
      color: 0,
      axis: 'y',
      offset: -1
    }]
  }), Cubie({
    stickers: [{
      color: 2,
      axis: 'x',
      offset: 1
    }, {
      color: 1,
      axis: 'z',
      offset: -1
    }]
  }), Cubie({
    stickers: [{
      color: 2,
      axis: 'x',
      offset: 1
    }, {
      color: 3,
      axis: 'z',
      offset: 1
    }]
  }), Cubie({
    stickers: [{
      color: 4,
      axis: 'x',
      offset: -1
    }, {
      color: 3,
      axis: 'z',
      offset: 1
    }]
  }), Cubie({
    stickers: [{
      color: 4,
      axis: 'x',
      offset: -1
    }, {
      color: 1,
      axis: 'z',
      offset: -1
    }]
  }), Cubie({
    stickers: [{
      color: 1,
      axis: 'z',
      offset: -1
    }, {
      color: 5,
      axis: 'y',
      offset: 1
    }]
  }), Cubie({
    stickers: [{
      color: 2,
      axis: 'x',
      offset: 1
    }, {
      color: 5,
      axis: 'y',
      offset: 1
    }]
  }), Cubie({
    stickers: [{
      color: 3,
      axis: 'z',
      offset: 1
    }, {
      color: 5,
      axis: 'y',
      offset: 1
    }]
  }), Cubie({
    stickers: [{
      color: 4,
      axis: 'x',
      offset: -1
    }, {
      color: 5,
      axis: 'y',
      offset: 1
    }]
  })];
  var corners = [Cubie({
    stickers: [{
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
    }]
  }), Cubie({
    stickers: [{
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
    }]
  }), Cubie({
    stickers: [{
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
    }]
  }), Cubie({
    stickers: [{
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
    }]
  }), Cubie({
    stickers: [{
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
    }]
  }), Cubie({
    stickers: [{
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
    }]
  }), Cubie({
    stickers: [{
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
    }]
  }), Cubie({
    stickers: [{
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
    }]
  })];
  var cube = {
    edges: edges.map(function (edge) {
      return edge.stickers.map(function (sticker) {
        return sticker.color;
      });
    }),
    corners: corners.map(function (corner) {
      return corner.stickers.map(function (sticker) {
        return sticker.color;
      });
    }),
    centres: centres.map(function (centre) {
      return centre.stickers.map(function (sticker) {
        return sticker.color;
      });
    }),
    cubies: {
      edges: edges,
      corners: corners,
      centres: centres
    },
    setCubieColors: function setCubieColors(positions, type) {
      for (var i = 0; i < positions.length; i++) {
        var index = positions[i];
        cube.cubies[type][index].setColors(cube[type][index]);
      }
    }
  };
  var queue = [];
  return {
    test_domove: function test_domove() {
      var moves = Object(_moves__WEBPACK_IMPORTED_MODULE_1__["getMoves"])("URUR'UR", cube);
      console.log(moves); // moves.forEach(d => d.apply())
      // do sune, support instant and different tps
    },
    render: function render() {// [5, 9, 4, 1].map(i => edges[i]).forEach(({ anchor }) => {
      //     anchor.rotate.x += 0.05;
      // });
      // [5, 4, 0, 1].map(i => corners[i]).forEach(({ anchor }) => {
      //     anchor.rotate.x += 0.05;
      // })
      // centres[2].anchor.rotate.x += 0.05;
      // if (anc.rotate.z < TAU / 4) {
      //     anc.rotate.z += 0.05;
      // } else {
      //     if (anc.rotate.y < TAU / 4) {
      //         anc.rotate.y += 0.05;
      //     }
      // }
    }
  };
});

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var zdog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zdog */ "./node_modules/zdog/js/index.js");
/* harmony import */ var zdog__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zdog__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _cube__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cube */ "./src/cube.js");



/*
 * examples
 *
 * stickerless
 * backface
 * japanese
 * snap to position
 * alg demo
 * solve playback
 * move slider (slide during moves) | lerp | snap
 * return to position lerp / delay
 * timer
 * solver
 * trainer
 * controlled position
 * disco
 * pillowed
 * R3 M'R2
 */

function zsim(container) {
  var zoom = 2;
  var alpha = 1;
  var colors = ['#ffffff', '#0045ad', '#b90000', '#009b48', '#ff5900', '#ffd500'].map(function (color) {
    return Object(_util__WEBPACK_IMPORTED_MODULE_1__["hexToRgba"])(color, alpha);
  });
  var cubeColor = Object(_util__WEBPACK_IMPORTED_MODULE_1__["hexToRgba"])('#000', alpha); // rgb

  var element = container.appendChild(document.createElement('canvas'));
  element.setAttribute('width', zoom * 400);
  element.setAttribute('height', zoom * 400);
  var illo = new zdog__WEBPACK_IMPORTED_MODULE_0___default.a.Illustration({
    element: element,
    zoom: zoom,
    dragRotate: true
  });
  var cube = Object(_cube__WEBPACK_IMPORTED_MODULE_2__["default"])({
    illo: illo,
    zoom: zoom,
    colors: colors,
    cubeColor: cubeColor
  });

  (function loop() {
    cube.render();
    illo.updateRenderGraph();
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
/*! exports provided: quarter, half, getMoves */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quarter", function() { return quarter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "half", function() { return half; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMoves", function() { return getMoves; });
/* harmony import */ var zdog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zdog */ "./node_modules/zdog/js/index.js");
/* harmony import */ var zdog__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zdog__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var quarter = zdog__WEBPACK_IMPORTED_MODULE_0__["TAU"] / 4;
var half = zdog__WEBPACK_IMPORTED_MODULE_0__["TAU"] / 2;
var moveList = {
  R: {
    edges: [[5, 9, 4, 1]],
    corners: [[5, 4, 0, 1], [-1, 1, -1, 1]],
    centre: 2,
    axis: 'x'
  },
  U: {
    edges: [[3, 2, 1, 0]],
    corners: [[3, 2, 1, 0]],
    centre: 0,
    axis: 'y'
  },
  F: {
    edges: [[6, 10, 5, 2], [1, 1, 1, 1]],
    corners: [[1, 2, 6, 5], [-1, 1, -1, 1]],
    axis: 'z'
  },
  L: {
    edges: [[3, 7, 11, 6]],
    corners: [[2, 3, 7, 6], [-1, 1, -1, 1]]
  },
  B: {
    edges: [[4, 8, 7, 0], [1, 1, 1, 1]],
    corners: [[4, 7, 3, 0], [-1, 1, -1, 1]]
  },
  D: {
    edges: [[8, 9, 10, 11]],
    corners: [[4, 5, 6, 7]]
  },
  M: {
    centres: [0, 1, 5, 3],
    edges: [[2, 0, 8, 10], [1, 1, 1, 1]]
  },
  E: {
    centres: [3, 4, 1, 2],
    edges: [[4, 5, 6, 7], [1, 1, 1, 1]]
  },
  S: {
    centres: [4, 5, 2, 0],
    edges: [[3, 11, 9, 1], [1, 1, 1, 1]]
  }
};

function getMove(moveRaw, cube) {
  var _toObject = toObject(moveRaw),
      move = _toObject.move,
      order = _toObject.order;

  if (!moveList[move]) throw new Error("invalid move ".concat(move));

  var _moveList$move = moveList[move],
      _moveList$move$corner = _slicedToArray(_moveList$move.corners, 2),
      corners = _moveList$move$corner[0],
      cornerTwists = _moveList$move$corner[1],
      _moveList$move$edges = _slicedToArray(_moveList$move.edges, 2),
      edges = _moveList$move$edges[0],
      edgeTwists = _moveList$move$edges[1],
      centre = _moveList$move.centre,
      axis = _moveList$move.axis; // calculate transforms
  // const transforms = [
  //     ...corners.map(index => cube.corners[index]),
  //     ...edges.map(index => cube.edges[index]),
  //     cube.centres[centre],
  // ];


  function doCycle(arr, order, cycle, twists) {
    if (order === -1) {
      cycle = cycle.reverse();
      twists && (twists = twists.reverse());
    } else if (order === 2) {
      doCycle(arr, 1, cycle, twists);
    } // edge twists TODO: change


    if (twists) {
      for (var i = 0; i < twists.length; i++) {
        twist(arr, cycle[i], twists[i]);
      }
    } // cycles


    for (var _i2 = 0; _i2 < cycle.length - 1; _i2++) {
      swap(arr, cycle[_i2], cycle[_i2 + 1]);
    }

    var _z$y$x$axis = _slicedToArray({
      z: [0, 1],
      y: [0, 2],
      x: [1, 2]
    }[axis], 2),
        a = _z$y$x$axis[0],
        b = _z$y$x$axis[1]; // corner 'twists'


    if (arr[0].length === 3) {
      for (var _i3 = 0; _i3 < cycle.length; _i3++) {
        swap(arr[cycle[_i3]], a, b);
      }
    }
  }

  function twist(arr, cubieIndex, order) {
    var cubie = arr[cubieIndex]; // edges

    if (cubie.length == 2) {
      cubie.push(cubie.splice(0, 1)[0]);
    } else {
      //corners
      if (order === 1) {// cubie.splice(0, 0, cubie.splice(2, 1)[0]);
      } else if (order === -1) {// cubie.splice(2, 0, cubie.splice(0, 1)[0]);
      }
    }
  }

  function swap(arr, first, second) {
    var tmp = arr[first];
    arr[first] = arr[second];
    arr[second] = tmp;
  }

  doCycle(cube.edges, order, edges, edgeTwists);
  doCycle(cube.corners, order, corners, cornerTwists);
  cube.setCubieColors(edges, 'edges');
  cube.setCubieColors(corners, 'corners'); // const [a, b, c] = cube.corners;
  // a.stickerElements.forEach((element, i) => {
  //     element.color = b.stickerElements[[0,2,1][i]].color
  // })
  // adjust places
  // doCycle(cube.edges, order, edges);
  // doCycle(cube.corners, order, corners);
  // generate solved state from cubies

  function apply() {
    transforms.forEach(function (_ref) {// anchor.rotate[axis] += quarter;
      // apply
      // run cubies, swap colours
      // resetting rotate makes animations easier

      var anchor = _ref.anchor;
    });
  } // apply
  // calc finalvalue
  // lerp moves
  // list of cubies to update each cube with the update
  // transforms


  return {
    apply: apply,
    edges: edges,
    order: order
  };
}

function getMoves(moves, cube) {
  return splitMoves(moves).map(function (move) {
    return getMove(move, cube);
  });
}

function toObject(move) {
  if (typeof move !== 'string') return move;
  return {
    move: move[0],
    order: {
      '\'': -1,
      '3': -1,
      '2': 2
    }[move[1]] || 1
  };
}

function splitMoves(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/\s/g, '').split(/(\w3|\w2|\w'|\w)/).filter(function (move) {
    return move;
  });
}

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: hexToRgba */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexToRgba", function() { return hexToRgba; });
function hexToRgba(x) {
  var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return "rgba(".concat(x.match(x[5] ? /\w./g : /\w/g).map(function (d) {
    return "0x" + d + d & 255;
  }), ",").concat(a, ")");
}

/***/ })

/******/ });
//# sourceMappingURL=main.js.map
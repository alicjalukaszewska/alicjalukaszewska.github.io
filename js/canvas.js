var canvas = document.getElementById("canvas");
var altBG = document.getElementById("altBG");
var triangle = new TriangleBG({
    canvas : canvas,
    alternateElem : altBG,
    cellHeight : 120,
    cellWidth : 100,
    mouseLight : true,
    mouseLightRadius : 500,
    mouseLightIncrement : 10,
    resizeAdjustment : true,
    variance : 1.3,
    pattern : "x*y",
    baseColor1 : {
      baseHue : 120,
      baseSaturation : 60,
      baseLightness : 38
    },
    baseColor2 : {
      baseHue : 120,
      baseSaturation : 60,
      baseLightness : 40
    },
    colorDelta : {
      hue : 1,
      lightness : 0,
      saturation : 0
    }
});
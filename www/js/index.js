//listen for deviceready event and launch onDeviceReady when phonegap is fully running
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    initializeApp();    //launch the initializeApp function
}

function initializeApp(){
    // add a watch for compass.
    navigator.compass.watchHeading(onCompassSuccess, onCompassError);
}

var saturation = 50;
var value = 50;

function onCompassSuccess(heading) {
    // display the bearing
    var value = heading.magneticHeading.toFixed(2);
    var color = hsvToRgb(heading, saturation, value);
    var cssColor = "rgb(" + color.join() + ")";
    document.getElementById("innerLeft").style.backgroundColor = cssColor;
    document.getElementById("innerLeft").style.borderColor = cssColor;
    document.getElementById("innerRight").style.backgroundColor = cssColor;
    document.getElementById("innerRight").style.borderColor = cssColor;
};


function onCompassError(error) {
    alert('CompassError: ' + error.code);
};

/**
 * HSV to RGB color conversion
 *
 * H runs from 0 to 360 degrees
 * S and V run from 0 to 100
 *
 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
 * http://www.cs.rit.edu/~ncs/color/t_convert.html
 */
function hsvToRgb(h, s, v) {
    var r, g, b;
    var i;
    var f, p, q, t;

    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));

    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;

    if(s == 0) {
        // Achromatic (grey)
        r = g = b = v;
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch(i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;

        case 1:
            r = q;
            g = v;
            b = p;
            break;

        case 2:
            r = p;
            g = v;
            b = t;
            break;

        case 3:
            r = p;
            g = q;
            b = v;
            break;

        case 4:
            r = t;
            g = p;
            b = v;
            break;

        default: // case 5:
            r = v;
            g = p;
            b = q;
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

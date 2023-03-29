function rgbToCmyk(r, g, b) {
  var c, m, y, k;
  r = r / 255;
  g = g / 255;
  b = b / 255;
  max = Math.max(r, g, b);
  k = 1 - max;
  if (k == 1) {
    c = 0;
    m = 0;
    y = 0;
  } else {
    c = (1 - r - k) / (1 - k);
    m = (1 - g - k) / (1 - k);
    y = (1 - b - k) / (1 - k);
  }
  return {c : c, m : m, y : y, k : k};
}
var rgb2cmyk = function (r, g, b, normalized){
  var c = 1 - (r / 255);
  var m = 1 - (g / 255);
  var y = 1 - (b / 255);
  var k = Math.min(c, Math.min(m, y));

  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);

  if(!normalized){
    c = Math.round(c * 10000) / 100;
    m = Math.round(m * 10000) / 100;
    y = Math.round(y * 10000) / 100;
    k = Math.round(k * 10000) / 100;
  }

  c = isNaN(c) ? 0 : c;
  m = isNaN(m) ? 0 : m;
  y = isNaN(y) ? 0 : y;
  k = isNaN(k) ? 0 : k;

  return {
    c: c,
    m: m,
    y: y,
    k: k
  }
}

$(function () {
  $("#someform").validate
  ({
    rules: {
      id1: {
        required: true,
        min: 0,
        max: 100
      },
      id2: {
        required: true,
        min: 0,
        max: 100
      },
      id3: {
        required: true,
        min: 0,
        max: 100
      },

      id4: {
        required: true,
        min: 0,
        max: 100
      }
    },
    messages: {
      id1: {
        required: 'Это поле не должно быть пустым',
        max: 'Это поле не может быть больше 100',
        min: 'Это поле не может быть меньше 0'
      },
      id2: {
        required: 'Это поле не должно быть пустым',
        max: 'Это поле не может быть больше 100',
        min: 'Это поле не может быть меньше 0'
      },
      id3: {
        required: 'Это поле не должно быть пустым',
        max: 'Это поле не может быть больше 100',
        min: 'Это поле не может быть меньше 0'
      },
      id4: {
        required: 'Это поле не должно быть пустым',
        max: 'Это поле не может быть больше 100',
        min: 'Это поле не может быть меньше 0'
      }
    }
  });
})
var cmyk2rgb = function(c, m, y, k, normalized){
  c = (c / 100);
  m = (m / 100);
  y = (y / 100);
  k = (k / 100);

  c = c * (1 - k) + k;
  m = m * (1 - k) + k;
  y = y * (1 - k) + k;

  var r = 1 - c;
  var g = 1 - m;
  var b = 1 - y;

  if(!normalized){
    r = Math.round(255 * r);
    g = Math.round(255 * g);
    b = Math.round(255 * b);
  }

  return {
    r: r,
    g: g,
    b: b
  }
}

function convert()
{
  if($('#someform').valid()){
  $('#example').css('background-color', 'rgb('+ cmyk2rgb($('#id1').val(),$('#id2').val(),$('#id3').val(),$('#id4').val(),false).r+','+cmyk2rgb($('#id1').val(),$('#id2').val(),$('#id3').val(),$('#id4').val(),false).g+','+cmyk2rgb($('#id1').val(),$('#id2').val(),$('#id3').val(),$('#id4').val(),false).b+')');
  $('#rgb').text("R = "+cmyk2rgb($('#id1').val(),$('#id2').val(),$('#id3').val(),$('#id4').val(),false).r+', G = '+cmyk2rgb($('#id1').val(),$('#id2').val(),$('#id3').val(),$('#id4').val(),false).g+', B= '+cmyk2rgb($('#id1').val(),$('#id2').val(),$('#id3').val(),$('#id4').val(),false).b);
  }
}

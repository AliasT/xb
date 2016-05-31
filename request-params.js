
    // url might contains ? letter
    // suppose url always contains a '&' letter, recursive invoke addUrlParams


    function getS(name, value) {
      var s = '';
      if (Object.prototype.toString.call(value) == '[object Array]') {
        var i = 0;

        while (i < value.length) {
          s += '&' + name + '=' + value[i];
          i++;
        }
      } else {
        s += '&' + name + '=' + value;
      }

      return s;
    }


    // when url come to this function, it must have a question mark
    function concatIt (url, requestObject) {
      if (typeof requestObject !== 'object') return url + requestObject;

      for (var name in requestObject) {
        if (requestObject[name] == undefined) continue;

        url += getS(name, requestObject[name]);
      }

      return url;
    }


    function addUrlParams (url, requestObject) {
      if (requestObject == undefined) return url;

      var type = typeof requestObject;

      // function: return directly
      if (type == 'function') return url;

      if (url.indexOf('?') < 0) {
        url += '?';
      }
      return concatIt(url, requestObject);
    }



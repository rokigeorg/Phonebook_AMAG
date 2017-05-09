if(typeof goog !== "undefined") {
  var base64 = {}
}
(function(global) {
  if(global.Base64) {
    return
  }
  var version = "2.1.2";
  var buffer;
  var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var b64tab = function(bin) {
    var t = {};
    for(var i = 0, l = bin.length;i < l;i++) {
      t[bin.charAt(i)] = i
    }
    return t
  }(b64chars);
  var fromCharCode = String.fromCharCode;
  var cb_utob = function(c) {
    if(c.length < 2) {
      var cc = c.charCodeAt(0);
      return cc < 128 ? c : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | cc & 63) : fromCharCode(224 | cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63)
    }else {
      var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
      return fromCharCode(240 | cc >>> 18 & 7) + fromCharCode(128 | cc >>> 12 & 63) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63)
    }
  };
  var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
  var utob = function(u) {
    return u.replace(re_utob, cb_utob)
  };
  var cb_encode = function(ccc) {
    var padlen = [0, 2, 1][ccc.length % 3], ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0), chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? "\x3d" : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? "\x3d" : b64chars.charAt(ord & 63)];
    return chars.join("")
  };
  var btoa = global.btoa || function(b) {
    return b.replace(/[\s\S]{1,3}/g, cb_encode)
  };
  var _encode = buffer ? function(u) {
    return(new buffer(u)).toString("base64")
  } : function(u) {
    return btoa(utob(u))
  };
  var encode = function(u, urisafe) {
    return!urisafe ? _encode(u) : _encode(u).replace(/[+\/]/g, function(m0) {
      return m0 == "+" ? "-" : "_"
    }).replace(/=/g, "")
  };
  var encodeURI = function(u) {
    return encode(u, true)
  };
  var re_btou = new RegExp(["[\u00c0-\u00df][\u0080-\u00bf]", "[\u00e0-\u00ef][\u0080-\u00bf]{2}", "[\u00f0-\u00f7][\u0080-\u00bf]{3}"].join("|"), "g");
  var cb_btou = function(cccc) {
    switch(cccc.length) {
      case 4:
        var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
        return fromCharCode((offset >>> 10) + 55296) + fromCharCode((offset & 1023) + 56320);
      case 3:
        return fromCharCode((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
      default:
        return fromCharCode((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1))
    }
  };
  var btou = function(b) {
    return b.replace(re_btou, cb_btou)
  };
  var cb_decode = function(cccc) {
    var len = cccc.length, padlen = len % 4, n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0), chars = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 255), fromCharCode(n & 255)];
    chars.length -= [0, 0, 2, 1][padlen];
    return chars.join("")
  };
  var atob = global.atob || function(a) {
    return a.replace(/[\s\S]{1,4}/g, cb_decode)
  };
  var _decode = buffer ? function(a) {
    return(new buffer(a, "base64")).toString()
  } : function(a) {
    return btou(atob(a))
  };
  var decode = function(a) {
    return _decode(a.replace(/[-_]/g, function(m0) {
      return m0 == "-" ? "+" : "/"
    }).replace(/[^A-Za-z0-9\+\/]/g, ""))
  };
  global.Base64 = {VERSION:version, atob:atob, btoa:btoa, fromBase64:decode, toBase64:encode, utob:utob, encode:encode, encodeURI:encodeURI, btou:btou, decode:decode};
  if(typeof Object.defineProperty === "function") {
    var noEnum = function(v) {
      return{value:v, enumerable:false, writable:true, configurable:true}
    };
    global.Base64.extendString = function() {
      Object.defineProperty(String.prototype, "fromBase64", noEnum(function() {
        return decode(this)
      }));
      Object.defineProperty(String.prototype, "toBase64", noEnum(function(urisafe) {
        return encode(this, urisafe)
      }));
      Object.defineProperty(String.prototype, "toBase64URI", noEnum(function() {
        return encode(this, true)
      }))
    }
  }
})(this);
if(typeof goog !== "undefined") {
  var Apiomat = {};
  Apiomat.AOMHelper = {}
}
if(typeof exports === "undefined") {
  var Apiomat = Apiomat || {}
}
(function(Apiomat) {
  Apiomat.AOMHelper = function() {
    return{isTitaniumApp:function() {
      return typeof Ti === "object" || typeof Titanium === "object"
    }, isSafari:function() {
      return typeof navigator === "object" && typeof navigator.userAgent !== "undefined" && navigator.userAgent.indexOf("Chrom") <= 0 && navigator.userAgent.indexOf("Safari") > -1 || false
    }, isNodeJS:function() {
      return false;
      return this.isTitaniumApp() === false && typeof module !== "undefined" && module.exports
    }, sendEvent:function(_eventName, _eventData) {
      var event = undefined;
      if(this.isTitaniumApp()) {
        return false;
        Ti.App.fireEvent(_eventName, _eventData || {})
      }else {
        var event = undefined;
        if(typeof CustomEvent !== "undefined" && !(this.detectIE() >= 9)) {
          event = new CustomEvent(_eventName, _eventData || {})
        }else {
          var event = document.createEvent("Event");
          event.initEvent(_eventName, true, true);
          event.customData = _eventData || {}
        }
        window.dispatchEvent(event)
      }
    }, isInteger:function(x) {
      return x % 1 === 0
    }, addEventListener:function(_eventName, _callback) {
      if(Apiomat.AOMHelper.isTitaniumApp()) {
        Ti.App.addEventListener(_eventName, _callback)
      }else {
        window.addEventListener(_eventName, _callback)
      }
    }, detectIE:function() {
      if(this.isTitaniumApp() == false && typeof navigator != "undefined" && typeof navigator.userAgent != "undefined" && navigator.userAgent != null) {
        var ua = navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if(msie > 0) {
          return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10)
        }
        var trident = ua.indexOf("Trident/");
        if(trident > 0) {
          var rv = ua.indexOf("rv:");
          return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10)
        }
        var edge = ua.indexOf("Edge/");
        if(edge > 0) {
          return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10)
        }
      }
      return false
    }}
  }()
})(typeof exports === "undefined" ? Apiomat : exports);
if(!Array.prototype.filter) {
  Array.prototype.filter = function(fun) {
    if(!this) {
      throw new TypeError;
    }
    var objects = Object(this);
    var len = objects.length >>> 0;
    if(typeof fun !== "function") {
      throw new TypeError;
    }
    var res = [];
    var thisp = arguments[1];
    for(var i in objects) {
      if(objects.hasOwnProperty(i)) {
        if(fun.call(thisp, objects[i], i, objects)) {
          res.push(objects[i])
        }
      }
    }
    return res
  }
}
if(!String.prototype.endsWith) {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1
  }
}
if(!Object.keys) {
  Object.keys = function() {
    var hasOwnProperty = Object.prototype.hasOwnProperty, hasDontEnumBug = !{toString:null}.propertyIsEnumerable("toString"), dontEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], dontEnumsLength = dontEnums.length;
    return function(obj) {
      if(typeof obj !== "object" && (typeof obj !== "function" || obj === null)) {
        throw new TypeError("Object.keys called on non-object");
      }
      var result = [], prop, i;
      for(prop in obj) {
        if(hasOwnProperty.call(obj, prop)) {
          result.push(prop)
        }
      }
      if(hasDontEnumBug) {
        for(i = 0;i < dontEnumsLength;i++) {
          if(hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i])
          }
        }
      }
      return result
    }
  }()
}
;if(typeof goog !== "undefined") {
  Apiomat.Status = {}
}
if(typeof exports === "undefined") {
  var Apiomat = Apiomat || {}
}
(function(Apiomat) {
  Apiomat.Status = {SCRIPT_ERROR:701, APPLICATION_NOT_ACTIVE:702, BAD_IMAGE:703, BAD_ID:704, CONCURRENT_ACCESS:705, APPLICATION_SANDBOX:706, MODEL_NOT_DEPLOYED:707, WRONG_REF_TYPE:709, ATTRIBUTE_NOT_SET:710, OPERATION_NOT_POSSIBLE:711, APPLICATION_NAME_MISMATCH:712, WRONG_AUTH_HEADER:713, MODEL_STILL_USED:714, COLLECTION_NOT_ALLOWED:715, FB_NO_VALID_MEMBER:716, FB_NO_OAUTH_TOKEN:717, FB_POST_ID_MISSING:718, RESTORE_NO_DUMPS_FOUND:719, TW_NO_VALID_MEMBER:720, TW_NO_OAUTH_TOKEN:721, IMEXPORT_WRONG_ENCODING:722, 
  IMEXPORT_WRONG_CONTENT:723, PUSH_PAYLOAD_EXCEEDED:724, PUSH_ERROR:725, BAD_EMAIL:726, BAD_PROMOTIONCODE_DISCOUNT:727, BAD_PROMOTIONCODE_CODE:728, PLAN_PRICE:729, PLAN_NO_SYSTEMS:730, SCRIPT_TIME_ERROR:731, INVALID_NAME:732, ATTRIBUTE_IN_SUPERCLASS:733, JSON_TYPE_ERROR:734, TBLR_NO_VALID_MEMBER:735, TBLR_NO_OAUTH_TOKEN:736, TBLR_POST_ID_MISSING:737, LOCATION_INVALID:738, SCRIPT_EXCEPTION:739, BAD_ACCOUNTNAME:740, BAD_IMAGE_ALPHA:746, BAD_IMAGE_BGCOLOR:747, BAD_IMAGE_FORMAT:748, QUERY_ERROR:708, 
  BAD_TYPE_IN_QUERY:741, UNKNOWN_CLASS_IN_QUERY:742, WRONG_NUM_FORMAT_IN_QUERY:743, QUERY_PARSE_ERROR:744, UNKNOWN_ATTRIBUTE_IN_QUERY:745, FOREIGNID_NOT_SET:749, CLASSES_MISSING:750, INVALID_ATTRIBUTE_TYPE:751, TOKEN_VALUE_EXISTS:752, JSON_FORMAT_ERROR:753, MODULE_DEPLOYMENT:754, BAD_USERNAME:755, CSV_ZIP_FORMAT:756, VERIFICATION:757, MODULE_STILL_USED:758, CLASS_NOT_IN_MODULE:759, ORDER_TRANSACTION_TIMESTAMP_OUTDATED:760, ORDER_TRANSACTION_ID_INVALID:761, ORDER_TRANSACTION_SECRET_INVALID:762, MANDATORY_FIELD:763, 
  INVALID_PASSWD_LENGTH:764, BAD_PROMOTIONCODE_VALID:765, BAD_CLASS_NAME_SAME_AS_MODULE:766, NO_ORG_MEMBER:767, MODULE_CLASS_NOT_CONTAINED:768, BAD_GROUP_NAME:769, INVISIBLE_CLASS:770, MODULE_TYPE_NOT_ALLOWED:771, MAX_FILE_SIZE:772, APPLICATION_NOT_FOUND:801, CUSTOMER_NOT_FOUND:802, ID_NOT_FOUND:803, MODEL_NOT_FOUND:804, MODULE_NOT_FOUND:805, PLAN_NOT_FOUND:807, PROMOCODE_NOT_FOUND:808, DEMOAPP_NOT_FOUND:809, ORGANIZATION_NOT_FOUND:810, GROUP_NOT_FOUND:811, ACCOUNT_NOT_FOUND:812, DEFAULT_MODULE_NOT_FOUND:813, 
  MODULE_USE_FORBIDDEN:820, PUSH_ERROR_APIKEY:821, PUSH_ERROR_CERTIFICATE:822, SAME_NAME_USED_IN_SUPERCLASS:823, PAYMENT_MAX_MODULE:824, PAYMENT_SYSTEM:825, PAYMENT_DOWNGRADE:826, SAVE_REFERENECE_BEFORE_REFERENCING:827, PAYMENT_DB_SIZE:828, ENDPOINT_PATH_NOT_ALLOWED:829, PAYMENT_NO_CRON:1820, PAYMENT_MODULE_NOT_FREE:1821, NATIVEMODULE_DEACTIVATED:1822, LICENSE_INVALID:1823, PAYMENT_NO_CUSTOMERROLES:1824, WHITELABEL:1825, WHITELABEL_NOT:1826, MODULE_CONFIG_NO_DOT:1827, PLAN_FALLBACK:1828, PLAN_INACTIVE:1829, 
  ENTERPRISE:1830, ACCOUNT_UNACCEPTED_CONTRACTS:1831, DELETE_MANDATORY_DEFAULT_MODULE:1832, ID_EXISTS:830, NAME_RESERVED:831, CIRCULAR_DEPENDENCY:832, NAME_EXISTS:833, EMAIL_EXISTS:834, CUSTOMER_IN_ORG:835, UNAUTHORIZED:840, WRONG_APIKEY:841, EVALANCHE_UNAUTH:842, PW_CHANGE_W_TOKEN:843, TOKEN_AUTH_ERROR:844, TOKEN_READ_ONLY:845, AUTHENTICATION_REJECTED:846, CRUD_ERROR:901, IMEXPORT_ERROR:902, COMPILE_ERROR:903, REFERENCE_ERROR:904, PUSH_PAYLOAD_ERROR:905, PUSH_SEND_ERROR:906, PUSH_INIT_FAILED:907, 
  FACEBOOK_ERROR:908, FACEBOOK_OAUTH_ERROR:910, FACEBOOK_OAUTH_ERROR2:917, MEMBER_NOT_FOUND:911, WORDPRESS_FETCH_DATA_ERROR:912, TUMBLR_OAUTH_ERROR:913, TUMBLR_ERROR:914, EXECUTE_METHOD_ERROR_PRIMITIVE:915, EXECUTE_METHOD_ERROR:916, OAUTH_TOKEN_REQUEST_ERROR:918, FINDING_RESOURCE_ERROR:919, NATIVEMODULE_DEPLOY:920, TOKEN_SEARCH_ERROR:921, MODULE_CONFIG_MISSING:922, NATIVEMODULE_INIT:923, NATIVEMODULE_PULL:924, NATIVEMODULE_PUSH:925, NO_DOGET_RETURN:926, CUSTOMER_TWO_ORGS:927, NATIVEMODULE_HOOKS_NOT_FOUND:928, 
  ANALYTICS_ERROR:929, EMAIL_ERROR:930, HREF_NOT_FOUND:601, WRONG_URI_SYNTAX:602, WRONG_CLIENT_PROTOCOL:603, IO_EXCEPTION:604, UNSUPPORTED_ENCODING:605, INSTANTIATE_EXCEPTION:606, IN_PERSISTING_PROCESS:607, VERIFY_SOCIALMEDIA:608, TOO_MANY_LOCALIDS:609, MAX_CACHE_SIZE_REACHED:610, CANT_WRITE_IN_CACHE:611, BAD_DATASTORE_CONFIG:612, NO_TOKEN_RECEIVED:613, NO_NETWORK:614, ID_NOT_FOUND_OFFLINE:615, ATTACHED_HREF_MISSING:616, REQUEST_TIMEOUT:617, ASYNC_WAIT_ERROR:618, IN_DELETING_PROCESS:619, SSO_REDIRECT:620, 
  MANUAL_CONCURRENT_WRITE_FAILED:621, SAVE_FAILED:622, SSL_ERROR:623, MAX_FILE_SIZE_OFFLINE_EXCEEDED:624, SQL_CONSTRAINT:625, MALICIOUS_MEMBER:950, getReasonPhrase:function(statusCode) {
    var phrase = undefined;
    switch(statusCode) {
      case Apiomat.Status.SCRIPT_ERROR:
        phrase = "Script error!";
        break;
      case Apiomat.Status.APPLICATION_NOT_ACTIVE:
        phrase = "Application is deactivated!";
        break;
      case Apiomat.Status.BAD_IMAGE:
        phrase = "Image format seems to be corrupted!";
        break;
      case Apiomat.Status.BAD_ID:
        phrase = "ID format is wrong!";
        break;
      case Apiomat.Status.CONCURRENT_ACCESS:
        phrase = "Concurrent access forbidden!";
        break;
      case Apiomat.Status.APPLICATION_SANDBOX:
        phrase = "Application is in sandbox mode!";
        break;
      case Apiomat.Status.MODEL_NOT_DEPLOYED:
        phrase = "Class is not deployed!";
        break;
      case Apiomat.Status.WRONG_REF_TYPE:
        phrase = "Wrong reference type!";
        break;
      case Apiomat.Status.ATTRIBUTE_NOT_SET:
        phrase = "Attribute not set!";
        break;
      case Apiomat.Status.OPERATION_NOT_POSSIBLE:
        phrase = "CRUD operation not possible on this class!";
        break;
      case Apiomat.Status.APPLICATION_NAME_MISMATCH:
        phrase = "Application name does not match the one defined in the class!";
        break;
      case Apiomat.Status.WRONG_AUTH_HEADER:
        phrase = "Wrong authentication header format, must be 'username:password'";
        break;
      case Apiomat.Status.MODEL_STILL_USED:
        phrase = "Class is still used by other attributes, scripts or subclasses!'";
        break;
      case Apiomat.Status.COLLECTION_NOT_ALLOWED:
        phrase = "Collection is not supported for this class type!";
        break;
      case Apiomat.Status.FB_NO_VALID_MEMBER:
        phrase = "Request send from no valid member";
        break;
      case Apiomat.Status.FB_NO_OAUTH_TOKEN:
        phrase = "Requesting member has no oAuth token, please authenticate! See http://doc.apiomat.com";
        break;
      case Apiomat.Status.FB_POST_ID_MISSING:
        phrase = "Facebook post id has to be set!";
        break;
      case Apiomat.Status.RESTORE_NO_DUMPS_FOUND:
        phrase = "No dumps for app on this date exist!";
        break;
      case Apiomat.Status.TW_NO_VALID_MEMBER:
        phrase = "Request send from no valid member";
        break;
      case Apiomat.Status.TW_NO_OAUTH_TOKEN:
        phrase = "Requesting member has no oAuth token, please authenticate! See http://doc.apiomat.com";
        break;
      case Apiomat.Status.IMEXPORT_WRONG_ENCODING:
        phrase = "Wrong Encoding";
        break;
      case Apiomat.Status.IMEXPORT_WRONG_CONTENT:
        phrase = "Wrong Filecontent";
        break;
      case Apiomat.Status.PUSH_PAYLOAD_EXCEEDED:
        phrase = "Payload size exceeded!";
        break;
      case Apiomat.Status.PUSH_ERROR:
        phrase = "Error in push request!";
        break;
      case Apiomat.Status.BAD_EMAIL:
        phrase = "eMail format is wrong!";
        break;
      case Apiomat.Status.BAD_PROMOTIONCODE_DISCOUNT:
        phrase = "Discount value is wrong!";
        break;
      case Apiomat.Status.BAD_PROMOTIONCODE_CODE:
        phrase = "Code is invalid";
        break;
      case Apiomat.Status.PLAN_PRICE:
        phrase = "Plan price must be \x3e\x3d 0!";
        break;
      case Apiomat.Status.PLAN_NO_SYSTEMS:
        phrase = "Plan must have at least one system!";
        break;
      case Apiomat.Status.SCRIPT_TIME_ERROR:
        phrase = "Script was interrupted, execution took too long.";
        break;
      case Apiomat.Status.INVALID_NAME:
        phrase = "Name must start with a letter, followed only by letters or numbers.";
        break;
      case Apiomat.Status.ATTRIBUTE_IN_SUPERCLASS:
        phrase = "Attribute is already defined in superclass.";
        break;
      case Apiomat.Status.JSON_TYPE_ERROR:
        phrase = "The @type is not correctly defined in your JSON (must be: MODULENAME$CLASSNAME";
        break;
      case Apiomat.Status.TBLR_NO_VALID_MEMBER:
        phrase = "Request send from no valid member";
        break;
      case Apiomat.Status.TBLR_NO_OAUTH_TOKEN:
        phrase = "Requesting member has no oAuth token, please authenticate! See http://doc.apiomat.com";
        break;
      case Apiomat.Status.TBLR_POST_ID_MISSING:
        phrase = "Tumblr post id has to be set!";
        break;
      case Apiomat.Status.LOCATION_INVALID:
        phrase = "Location data is invalid (latitude or longitude missing)!";
        break;
      case Apiomat.Status.SCRIPT_EXCEPTION:
        phrase = "Exception was raised in external code!";
        break;
      case Apiomat.Status.BAD_ACCOUNTNAME:
        phrase = "Account name must contain only characters A-Z,a-z or 0-9!";
        break;
      case Apiomat.Status.BAD_IMAGE_ALPHA:
        phrase = "alpha is wrong (must be a double value between 0.0 and 1.0)";
        break;
      case Apiomat.Status.BAD_IMAGE_BGCOLOR:
        phrase = "bgcolor is wrong (must be an RGB hex value without #, like 'FF0000' for red)";
        break;
      case Apiomat.Status.BAD_IMAGE_FORMAT:
        phrase = "format is wrong (can only be png, gif, bmp or jpg/jpeg)";
        break;
      case Apiomat.Status.QUERY_ERROR:
        phrase = "Query could not be parsed!";
        break;
      case Apiomat.Status.BAD_TYPE_IN_QUERY:
        phrase = "The query contains a value with the wrong type";
        break;
      case Apiomat.Status.UNKNOWN_CLASS_IN_QUERY:
        phrase = "The definition of the class couldn't be found";
        break;
      case Apiomat.Status.WRONG_NUM_FORMAT_IN_QUERY:
        phrase = "A number was supplied in the wrong format";
        break;
      case Apiomat.Status.QUERY_PARSE_ERROR:
        phrase = "The query couldn't be parsed";
        break;
      case Apiomat.Status.UNKNOWN_ATTRIBUTE_IN_QUERY:
        phrase = "An attribute that was used in the query doesn't exist in the class";
        break;
      case Apiomat.Status.FOREIGNID_NOT_SET:
        phrase = "Foreign ID must be set to a unique value for this class!";
        break;
      case Apiomat.Status.CLASSES_MISSING:
        phrase = "Not all classes for this module are contained in the jar! This will lead to compile errors.";
        break;
      case Apiomat.Status.INVALID_ATTRIBUTE_TYPE:
        phrase = "Attributes type is invalid";
        break;
      case Apiomat.Status.TOKEN_VALUE_EXISTS:
        phrase = "The token value already exists";
        break;
      case Apiomat.Status.JSON_FORMAT_ERROR:
        phrase = "JSON could not be parsed";
        break;
      case Apiomat.Status.MODULE_DEPLOYMENT:
        phrase = "Module is currently deploying. Please try again later.";
        break;
      case Apiomat.Status.BAD_USERNAME:
        phrase = "User name must not contain a ':'.";
        break;
      case Apiomat.Status.CSV_ZIP_FORMAT:
        phrase = "CSV import only accepts a single .zip file!";
        break;
      case Apiomat.Status.VERIFICATION:
        phrase = "Verification error";
        break;
      case Apiomat.Status.MODULE_STILL_USED:
        phrase = "Module is still used by other modules of this app!'";
        break;
      case Apiomat.Status.CLASS_NOT_IN_MODULE:
        phrase = "Model name not found for this module!";
        break;
      case Apiomat.Status.ORDER_TRANSACTION_TIMESTAMP_OUTDATED:
        phrase = "Transaction outdated!";
        break;
      case Apiomat.Status.ORDER_TRANSACTION_ID_INVALID:
        phrase = "Transaction ID invalid!";
        break;
      case Apiomat.Status.ORDER_TRANSACTION_SECRET_INVALID:
        phrase = "Transaction secret invalid!";
        break;
      case Apiomat.Status.MANDATORY_FIELD:
        phrase = "Mandatory fields must not be empty or null!";
        break;
      case Apiomat.Status.INVALID_PASSWD_LENGTH:
        phrase = "Password must have a length of at least 6 characters!";
        break;
      case Apiomat.Status.BAD_PROMOTIONCODE_VALID:
        phrase = "Valid from/to of Code is null";
        break;
      case Apiomat.Status.BAD_CLASS_NAME_SAME_AS_MODULE:
        phrase = "Class name must not be the same as the module name!";
        break;
      case Apiomat.Status.NO_ORG_MEMBER:
        phrase = "Customer is not a member of the organization";
        break;
      case Apiomat.Status.MODULE_CLASS_NOT_CONTAINED:
        phrase = "Module main class is not contained in the uploaded file! Probably wrong module uploaded?";
        break;
      case Apiomat.Status.BAD_GROUP_NAME:
        phrase = "Account name must contain only characters A-Z,a-z or 0-9!";
        break;
      case Apiomat.Status.INVISIBLE_CLASS:
        phrase = "Class is not visible to REST!";
        break;
      case Apiomat.Status.MODULE_TYPE_NOT_ALLOWED:
        phrase = "The action is not allowed for this module type";
        break;
      case Apiomat.Status.MAX_FILE_SIZE:
        phrase = "File is larger than maximum file size!";
        break;
      case Apiomat.Status.APPLICATION_NOT_FOUND:
        phrase = "Application was not found!";
        break;
      case Apiomat.Status.CUSTOMER_NOT_FOUND:
        phrase = "Customer was not found!";
        break;
      case Apiomat.Status.ID_NOT_FOUND:
        phrase = "ID was not found!";
        break;
      case Apiomat.Status.MODEL_NOT_FOUND:
        phrase = "Class was not found!";
        break;
      case Apiomat.Status.MODULE_NOT_FOUND:
        phrase = "Module was not found!";
        break;
      case Apiomat.Status.PLAN_NOT_FOUND:
        phrase = "Plan was not found!";
        break;
      case Apiomat.Status.PROMOCODE_NOT_FOUND:
        phrase = "Promotion code not valid!";
        break;
      case Apiomat.Status.DEMOAPP_NOT_FOUND:
        phrase = "This language has no demo content";
        break;
      case Apiomat.Status.ORGANIZATION_NOT_FOUND:
        phrase = "Organization was not found!";
        break;
      case Apiomat.Status.GROUP_NOT_FOUND:
        phrase = "Group was not found!";
        break;
      case Apiomat.Status.ACCOUNT_NOT_FOUND:
        phrase = "Account was not found!";
        break;
      case Apiomat.Status.DEFAULT_MODULE_NOT_FOUND:
        phrase = "Default module was not found for the given account";
        break;
      case Apiomat.Status.MODULE_USE_FORBIDDEN:
        phrase = "Required module is not attached to app";
        break;
      case Apiomat.Status.PUSH_ERROR_APIKEY:
        phrase = "No API Key defined for Push service!";
        break;
      case Apiomat.Status.PUSH_ERROR_CERTIFICATE:
        phrase = "No certificate defined for Push service!";
        break;
      case Apiomat.Status.SAME_NAME_USED_IN_SUPERCLASS:
        phrase = "Same name is already used in a superclass.";
        break;
      case Apiomat.Status.PAYMENT_MAX_MODULE:
        phrase = "Maximum number of used modules exceeded for this plan.";
        break;
      case Apiomat.Status.PAYMENT_SYSTEM:
        phrase = "Selected system use is not allowed for this plan.";
        break;
      case Apiomat.Status.PAYMENT_DOWNGRADE:
        phrase = "Up/Downgrading plans is only allowed for super admins.";
        break;
      case Apiomat.Status.SAVE_REFERENECE_BEFORE_REFERENCING:
        phrase = "Object you are trying to reference is not on the server. Please save it first.";
        break;
      case Apiomat.Status.PAYMENT_DB_SIZE:
        phrase = "Used database size exceeds plan";
        break;
      case Apiomat.Status.ENDPOINT_PATH_NOT_ALLOWED:
        phrase = "Endpoint not allowed for app; please add path to your app's config.";
        break;
      case Apiomat.Status.PAYMENT_NO_CRON:
        phrase = "Cronjobs are not allowed for this plan.";
        break;
      case Apiomat.Status.PAYMENT_MODULE_NOT_FREE:
        phrase = "This module is not available for free plan.";
        break;
      case Apiomat.Status.NATIVEMODULE_DEACTIVATED:
        phrase = "Native Module feature is not activated for this installation.";
        break;
      case Apiomat.Status.LICENSE_INVALID:
        phrase = "Your license does not allow this action.";
        break;
      case Apiomat.Status.PAYMENT_NO_CUSTOMERROLES:
        phrase = "Customer role usage is not available for free plan.";
        break;
      case Apiomat.Status.WHITELABEL:
        phrase = "Only available for whitelabel installations.";
        break;
      case Apiomat.Status.WHITELABEL_NOT:
        phrase = "Not available for whitelabel installations.";
        break;
      case Apiomat.Status.MODULE_CONFIG_NO_DOT:
        phrase = "No dot allowed in module config key.";
        break;
      case Apiomat.Status.PLAN_FALLBACK:
        phrase = "Application cannot be activated without valid plan.";
        break;
      case Apiomat.Status.PLAN_INACTIVE:
        phrase = "Plan is not selectable!";
        break;
      case Apiomat.Status.ENTERPRISE:
        phrase = "Only available for enterprise installations.";
        break;
      case Apiomat.Status.ACCOUNT_UNACCEPTED_CONTRACTS:
        phrase = "Account has unaccepted Contracts";
        break;
      case Apiomat.Status.DELETE_MANDATORY_DEFAULT_MODULE:
        phrase = "It is not allowed to remove this default module";
        break;
      case Apiomat.Status.ID_EXISTS:
        phrase = "ID exists!";
        break;
      case Apiomat.Status.NAME_RESERVED:
        phrase = "Name is reserved!";
        break;
      case Apiomat.Status.CIRCULAR_DEPENDENCY:
        phrase = "You can't set circular inheritance!";
        break;
      case Apiomat.Status.NAME_EXISTS:
        phrase = "Name is already used!";
        break;
      case Apiomat.Status.EMAIL_EXISTS:
        phrase = "E-mail is already used!";
        break;
      case Apiomat.Status.CUSTOMER_IN_ORG:
        phrase = "Customer is already member of an organization";
        break;
      case Apiomat.Status.UNAUTHORIZED:
        phrase = "Authorization failed!";
        break;
      case Apiomat.Status.WRONG_APIKEY:
        phrase = "API Key was not correct!";
        break;
      case Apiomat.Status.EVALANCHE_UNAUTH:
        phrase = "Authorization failed! Maybe username/password was not set for evelanche configuration?";
        break;
      case Apiomat.Status.PW_CHANGE_W_TOKEN:
        phrase = "Not authorized to change a user's password when authenticating with a token.";
        break;
      case Apiomat.Status.TOKEN_AUTH_ERROR:
        phrase = "The token could not be authenticated";
        break;
      case Apiomat.Status.TOKEN_READ_ONLY:
        phrase = "The token can only be used for read requests.";
        break;
      case Apiomat.Status.AUTHENTICATION_REJECTED:
        phrase = "Authentication with username/password was rejected by third-party-system.";
        break;
      case Apiomat.Status.CRUD_ERROR:
        phrase = "Internal error during CRUD operation";
        break;
      case Apiomat.Status.IMEXPORT_ERROR:
        phrase = "Error during im/export!";
        break;
      case Apiomat.Status.COMPILE_ERROR:
        phrase = "Classes could not be compiled!";
        break;
      case Apiomat.Status.REFERENCE_ERROR:
        phrase = "Error in class reference!";
        break;
      case Apiomat.Status.PUSH_PAYLOAD_ERROR:
        phrase = "Failed to create payload!";
        break;
      case Apiomat.Status.PUSH_SEND_ERROR:
        phrase = "Failed to send message(s)!";
        break;
      case Apiomat.Status.PUSH_INIT_FAILED:
        phrase = "Failed to initialize push service!";
        break;
      case Apiomat.Status.FACEBOOK_ERROR:
        phrase = "An error occured while communicating with facebook!";
        break;
      case Apiomat.Status.FACEBOOK_OAUTH_ERROR:
        phrase = "facebook throws oAuth error! Please show login dialog again";
        break;
      case Apiomat.Status.FACEBOOK_OAUTH_ERROR2:
        phrase = "Received OAuth2 error from Facebook";
        break;
      case Apiomat.Status.MEMBER_NOT_FOUND:
        phrase = "Can't find member with this id/username";
        break;
      case Apiomat.Status.WORDPRESS_FETCH_DATA_ERROR:
        phrase = "Can't fetch data for wordpress blog";
        break;
      case Apiomat.Status.TUMBLR_OAUTH_ERROR:
        phrase = "tumblr threw oAuth error! Please show login dialog again";
        break;
      case Apiomat.Status.TUMBLR_ERROR:
        phrase = "Error communicating with tumblr!";
        break;
      case Apiomat.Status.EXECUTE_METHOD_ERROR_PRIMITIVE:
        phrase = "Only primitive types are allowed";
        break;
      case Apiomat.Status.EXECUTE_METHOD_ERROR:
        phrase = "Execute method failed";
        break;
      case Apiomat.Status.OAUTH_TOKEN_REQUEST_ERROR:
        phrase = "An error occured during requesting an ApiOmat OAuth2 token";
        break;
      case Apiomat.Status.FINDING_RESOURCE_ERROR:
        phrase = "An error occured while trying to find the resource";
        break;
      case Apiomat.Status.NATIVEMODULE_DEPLOY:
        phrase = "Executing onDeploy failed";
        break;
      case Apiomat.Status.TOKEN_SEARCH_ERROR:
        phrase = "An error occured while searching for tokens";
        break;
      case Apiomat.Status.MODULE_CONFIG_MISSING:
        phrase = "Your module seems not to be configured properly";
        break;
      case Apiomat.Status.NATIVEMODULE_INIT:
        phrase = "Could not initialize git repository";
        break;
      case Apiomat.Status.NATIVEMODULE_PULL:
        phrase = "Could not pull git repository";
        break;
      case Apiomat.Status.NATIVEMODULE_PUSH:
        phrase = "Could not push git repository";
        break;
      case Apiomat.Status.NO_DOGET_RETURN:
        phrase = "The module's doGet didn't return a model";
        break;
      case Apiomat.Status.CUSTOMER_TWO_ORGS:
        phrase = "The customer was found in two organizations";
        break;
      case Apiomat.Status.NATIVEMODULE_HOOKS_NOT_FOUND:
        phrase = "Annotated hook class not found";
        break;
      case Apiomat.Status.ANALYTICS_ERROR:
        phrase = "The analytics instance couldn't process the request correctly";
        break;
      case Apiomat.Status.EMAIL_ERROR:
        phrase = "Error during sending email";
        break;
      case Apiomat.Status.HREF_NOT_FOUND:
        phrase = "Class has no HREF; please save it first!";
        break;
      case Apiomat.Status.WRONG_URI_SYNTAX:
        phrase = "URI syntax is wrong";
        break;
      case Apiomat.Status.WRONG_CLIENT_PROTOCOL:
        phrase = "Client protocol is wrong";
        break;
      case Apiomat.Status.IO_EXCEPTION:
        phrase = "IOException was thrown";
        break;
      case Apiomat.Status.UNSUPPORTED_ENCODING:
        phrase = "Encoding is not supported";
        break;
      case Apiomat.Status.INSTANTIATE_EXCEPTION:
        phrase = "Error on class instantiation";
        break;
      case Apiomat.Status.IN_PERSISTING_PROCESS:
        phrase = "Object is in persisting process. Please try again later";
        break;
      case Apiomat.Status.VERIFY_SOCIALMEDIA:
        phrase = "Can't verify against social media provider";
        break;
      case Apiomat.Status.TOO_MANY_LOCALIDS:
        phrase = "Can't create more localIDs. Please try again later";
        break;
      case Apiomat.Status.MAX_CACHE_SIZE_REACHED:
        phrase = "The maximum cache size is reached.";
        break;
      case Apiomat.Status.CANT_WRITE_IN_CACHE:
        phrase = "Can't persist data to cache.";
        break;
      case Apiomat.Status.BAD_DATASTORE_CONFIG:
        phrase = "For requesting a session token without a refresh token, the Datastore must be configured with a username and password";
        break;
      case Apiomat.Status.NO_TOKEN_RECEIVED:
        phrase = "The response didn't contain a token";
        break;
      case Apiomat.Status.NO_NETWORK:
        phrase = "No network connection available";
        break;
      case Apiomat.Status.ID_NOT_FOUND_OFFLINE:
        phrase = "ID was not found in offline storage";
        break;
      case Apiomat.Status.ATTACHED_HREF_MISSING:
        phrase = "HREF of attached image / file / reference is missing";
        break;
      case Apiomat.Status.REQUEST_TIMEOUT:
        phrase = "The request timed out during connecting or reading the response";
        break;
      case Apiomat.Status.ASYNC_WAIT_ERROR:
        phrase = "An error occured during waiting for an async task to finish";
        break;
      case Apiomat.Status.IN_DELETING_PROCESS:
        phrase = "Object is in deleting process. Please try again later";
        break;
      case Apiomat.Status.SSO_REDIRECT:
        phrase = "The request was redirected to an SSO Identity Provider";
        break;
      case Apiomat.Status.MANUAL_CONCURRENT_WRITE_FAILED:
        phrase = "Concurrent write to own concurrent data type failed";
        break;
      case Apiomat.Status.SAVE_FAILED:
        phrase = "Load not executed because save already failed";
        break;
      case Apiomat.Status.SSL_ERROR:
        phrase = "An error occurred during establishing a secure connection";
        break;
      case Apiomat.Status.MAX_FILE_SIZE_OFFLINE_EXCEEDED:
        phrase = "The max file size for offline saving is exceeded";
        break;
      case Apiomat.Status.SQL_CONSTRAINT:
        phrase = "An error occurred because of an SQL constraint (for example unique ForeignID";
        break;
      case Apiomat.Status.MALICIOUS_MEMBER:
        phrase = "Malicious use of member detected!";
        break;
      default:
        phrase = "No reason found"
    }
    return phrase
  }, getStatusForCode:function(httpCode) {
    var statusCode = undefined;
    switch(httpCode) {
      case 701:
        statusCode = Apiomat.Status.SCRIPT_ERROR;
        break;
      case 702:
        statusCode = Apiomat.Status.APPLICATION_NOT_ACTIVE;
        break;
      case 703:
        statusCode = Apiomat.Status.BAD_IMAGE;
        break;
      case 704:
        statusCode = Apiomat.Status.BAD_ID;
        break;
      case 705:
        statusCode = Apiomat.Status.CONCURRENT_ACCESS;
        break;
      case 706:
        statusCode = Apiomat.Status.APPLICATION_SANDBOX;
        break;
      case 707:
        statusCode = Apiomat.Status.MODEL_NOT_DEPLOYED;
        break;
      case 709:
        statusCode = Apiomat.Status.WRONG_REF_TYPE;
        break;
      case 710:
        statusCode = Apiomat.Status.ATTRIBUTE_NOT_SET;
        break;
      case 711:
        statusCode = Apiomat.Status.OPERATION_NOT_POSSIBLE;
        break;
      case 712:
        statusCode = Apiomat.Status.APPLICATION_NAME_MISMATCH;
        break;
      case 713:
        statusCode = Apiomat.Status.WRONG_AUTH_HEADER;
        break;
      case 714:
        statusCode = Apiomat.Status.MODEL_STILL_USED;
        break;
      case 715:
        statusCode = Apiomat.Status.COLLECTION_NOT_ALLOWED;
        break;
      case 716:
        statusCode = Apiomat.Status.FB_NO_VALID_MEMBER;
        break;
      case 717:
        statusCode = Apiomat.Status.FB_NO_OAUTH_TOKEN;
        break;
      case 718:
        statusCode = Apiomat.Status.FB_POST_ID_MISSING;
        break;
      case 719:
        statusCode = Apiomat.Status.RESTORE_NO_DUMPS_FOUND;
        break;
      case 720:
        statusCode = Apiomat.Status.TW_NO_VALID_MEMBER;
        break;
      case 721:
        statusCode = Apiomat.Status.TW_NO_OAUTH_TOKEN;
        break;
      case 722:
        statusCode = Apiomat.Status.IMEXPORT_WRONG_ENCODING;
        break;
      case 723:
        statusCode = Apiomat.Status.IMEXPORT_WRONG_CONTENT;
        break;
      case 724:
        statusCode = Apiomat.Status.PUSH_PAYLOAD_EXCEEDED;
        break;
      case 725:
        statusCode = Apiomat.Status.PUSH_ERROR;
        break;
      case 726:
        statusCode = Apiomat.Status.BAD_EMAIL;
        break;
      case 727:
        statusCode = Apiomat.Status.BAD_PROMOTIONCODE_DISCOUNT;
        break;
      case 728:
        statusCode = Apiomat.Status.BAD_PROMOTIONCODE_CODE;
        break;
      case 729:
        statusCode = Apiomat.Status.PLAN_PRICE;
        break;
      case 730:
        statusCode = Apiomat.Status.PLAN_NO_SYSTEMS;
        break;
      case 731:
        statusCode = Apiomat.Status.SCRIPT_TIME_ERROR;
        break;
      case 732:
        statusCode = Apiomat.Status.INVALID_NAME;
        break;
      case 733:
        statusCode = Apiomat.Status.ATTRIBUTE_IN_SUPERCLASS;
        break;
      case 734:
        statusCode = Apiomat.Status.JSON_TYPE_ERROR;
        break;
      case 735:
        statusCode = Apiomat.Status.TBLR_NO_VALID_MEMBER;
        break;
      case 736:
        statusCode = Apiomat.Status.TBLR_NO_OAUTH_TOKEN;
        break;
      case 737:
        statusCode = Apiomat.Status.TBLR_POST_ID_MISSING;
        break;
      case 738:
        statusCode = Apiomat.Status.LOCATION_INVALID;
        break;
      case 739:
        statusCode = Apiomat.Status.SCRIPT_EXCEPTION;
        break;
      case 740:
        statusCode = Apiomat.Status.BAD_ACCOUNTNAME;
        break;
      case 746:
        statusCode = Apiomat.Status.BAD_IMAGE_ALPHA;
        break;
      case 747:
        statusCode = Apiomat.Status.BAD_IMAGE_BGCOLOR;
        break;
      case 748:
        statusCode = Apiomat.Status.BAD_IMAGE_FORMAT;
        break;
      case 708:
        statusCode = Apiomat.Status.QUERY_ERROR;
        break;
      case 741:
        statusCode = Apiomat.Status.BAD_TYPE_IN_QUERY;
        break;
      case 742:
        statusCode = Apiomat.Status.UNKNOWN_CLASS_IN_QUERY;
        break;
      case 743:
        statusCode = Apiomat.Status.WRONG_NUM_FORMAT_IN_QUERY;
        break;
      case 744:
        statusCode = Apiomat.Status.QUERY_PARSE_ERROR;
        break;
      case 745:
        statusCode = Apiomat.Status.UNKNOWN_ATTRIBUTE_IN_QUERY;
        break;
      case 749:
        statusCode = Apiomat.Status.FOREIGNID_NOT_SET;
        break;
      case 750:
        statusCode = Apiomat.Status.CLASSES_MISSING;
        break;
      case 751:
        statusCode = Apiomat.Status.INVALID_ATTRIBUTE_TYPE;
        break;
      case 752:
        statusCode = Apiomat.Status.TOKEN_VALUE_EXISTS;
        break;
      case 753:
        statusCode = Apiomat.Status.JSON_FORMAT_ERROR;
        break;
      case 754:
        statusCode = Apiomat.Status.MODULE_DEPLOYMENT;
        break;
      case 755:
        statusCode = Apiomat.Status.BAD_USERNAME;
        break;
      case 756:
        statusCode = Apiomat.Status.CSV_ZIP_FORMAT;
        break;
      case 757:
        statusCode = Apiomat.Status.VERIFICATION;
        break;
      case 758:
        statusCode = Apiomat.Status.MODULE_STILL_USED;
        break;
      case 759:
        statusCode = Apiomat.Status.CLASS_NOT_IN_MODULE;
        break;
      case 760:
        statusCode = Apiomat.Status.ORDER_TRANSACTION_TIMESTAMP_OUTDATED;
        break;
      case 761:
        statusCode = Apiomat.Status.ORDER_TRANSACTION_ID_INVALID;
        break;
      case 762:
        statusCode = Apiomat.Status.ORDER_TRANSACTION_SECRET_INVALID;
        break;
      case 763:
        statusCode = Apiomat.Status.MANDATORY_FIELD;
        break;
      case 764:
        statusCode = Apiomat.Status.INVALID_PASSWD_LENGTH;
        break;
      case 765:
        statusCode = Apiomat.Status.BAD_PROMOTIONCODE_VALID;
        break;
      case 766:
        statusCode = Apiomat.Status.BAD_CLASS_NAME_SAME_AS_MODULE;
        break;
      case 767:
        statusCode = Apiomat.Status.NO_ORG_MEMBER;
        break;
      case 768:
        statusCode = Apiomat.Status.MODULE_CLASS_NOT_CONTAINED;
        break;
      case 769:
        statusCode = Apiomat.Status.BAD_GROUP_NAME;
        break;
      case 770:
        statusCode = Apiomat.Status.INVISIBLE_CLASS;
        break;
      case 771:
        statusCode = Apiomat.Status.MODULE_TYPE_NOT_ALLOWED;
        break;
      case 772:
        statusCode = Apiomat.Status.MAX_FILE_SIZE;
        break;
      case 801:
        statusCode = Apiomat.Status.APPLICATION_NOT_FOUND;
        break;
      case 802:
        statusCode = Apiomat.Status.CUSTOMER_NOT_FOUND;
        break;
      case 803:
        statusCode = Apiomat.Status.ID_NOT_FOUND;
        break;
      case 804:
        statusCode = Apiomat.Status.MODEL_NOT_FOUND;
        break;
      case 805:
        statusCode = Apiomat.Status.MODULE_NOT_FOUND;
        break;
      case 807:
        statusCode = Apiomat.Status.PLAN_NOT_FOUND;
        break;
      case 808:
        statusCode = Apiomat.Status.PROMOCODE_NOT_FOUND;
        break;
      case 809:
        statusCode = Apiomat.Status.DEMOAPP_NOT_FOUND;
        break;
      case 810:
        statusCode = Apiomat.Status.ORGANIZATION_NOT_FOUND;
        break;
      case 811:
        statusCode = Apiomat.Status.GROUP_NOT_FOUND;
        break;
      case 812:
        statusCode = Apiomat.Status.ACCOUNT_NOT_FOUND;
        break;
      case 813:
        statusCode = Apiomat.Status.DEFAULT_MODULE_NOT_FOUND;
        break;
      case 820:
        statusCode = Apiomat.Status.MODULE_USE_FORBIDDEN;
        break;
      case 821:
        statusCode = Apiomat.Status.PUSH_ERROR_APIKEY;
        break;
      case 822:
        statusCode = Apiomat.Status.PUSH_ERROR_CERTIFICATE;
        break;
      case 823:
        statusCode = Apiomat.Status.SAME_NAME_USED_IN_SUPERCLASS;
        break;
      case 824:
        statusCode = Apiomat.Status.PAYMENT_MAX_MODULE;
        break;
      case 825:
        statusCode = Apiomat.Status.PAYMENT_SYSTEM;
        break;
      case 826:
        statusCode = Apiomat.Status.PAYMENT_DOWNGRADE;
        break;
      case 827:
        statusCode = Apiomat.Status.SAVE_REFERENECE_BEFORE_REFERENCING;
        break;
      case 828:
        statusCode = Apiomat.Status.PAYMENT_DB_SIZE;
        break;
      case 829:
        statusCode = Apiomat.Status.ENDPOINT_PATH_NOT_ALLOWED;
        break;
      case 1820:
        statusCode = Apiomat.Status.PAYMENT_NO_CRON;
        break;
      case 1821:
        statusCode = Apiomat.Status.PAYMENT_MODULE_NOT_FREE;
        break;
      case 1822:
        statusCode = Apiomat.Status.NATIVEMODULE_DEACTIVATED;
        break;
      case 1823:
        statusCode = Apiomat.Status.LICENSE_INVALID;
        break;
      case 1824:
        statusCode = Apiomat.Status.PAYMENT_NO_CUSTOMERROLES;
        break;
      case 1825:
        statusCode = Apiomat.Status.WHITELABEL;
        break;
      case 1826:
        statusCode = Apiomat.Status.WHITELABEL_NOT;
        break;
      case 1827:
        statusCode = Apiomat.Status.MODULE_CONFIG_NO_DOT;
        break;
      case 1828:
        statusCode = Apiomat.Status.PLAN_FALLBACK;
        break;
      case 1829:
        statusCode = Apiomat.Status.PLAN_INACTIVE;
        break;
      case 1830:
        statusCode = Apiomat.Status.ENTERPRISE;
        break;
      case 1831:
        statusCode = Apiomat.Status.ACCOUNT_UNACCEPTED_CONTRACTS;
        break;
      case 1832:
        statusCode = Apiomat.Status.DELETE_MANDATORY_DEFAULT_MODULE;
        break;
      case 830:
        statusCode = Apiomat.Status.ID_EXISTS;
        break;
      case 831:
        statusCode = Apiomat.Status.NAME_RESERVED;
        break;
      case 832:
        statusCode = Apiomat.Status.CIRCULAR_DEPENDENCY;
        break;
      case 833:
        statusCode = Apiomat.Status.NAME_EXISTS;
        break;
      case 834:
        statusCode = Apiomat.Status.EMAIL_EXISTS;
        break;
      case 835:
        statusCode = Apiomat.Status.CUSTOMER_IN_ORG;
        break;
      case 840:
        statusCode = Apiomat.Status.UNAUTHORIZED;
        break;
      case 841:
        statusCode = Apiomat.Status.WRONG_APIKEY;
        break;
      case 842:
        statusCode = Apiomat.Status.EVALANCHE_UNAUTH;
        break;
      case 843:
        statusCode = Apiomat.Status.PW_CHANGE_W_TOKEN;
        break;
      case 844:
        statusCode = Apiomat.Status.TOKEN_AUTH_ERROR;
        break;
      case 845:
        statusCode = Apiomat.Status.TOKEN_READ_ONLY;
        break;
      case 846:
        statusCode = Apiomat.Status.AUTHENTICATION_REJECTED;
        break;
      case 901:
        statusCode = Apiomat.Status.CRUD_ERROR;
        break;
      case 902:
        statusCode = Apiomat.Status.IMEXPORT_ERROR;
        break;
      case 903:
        statusCode = Apiomat.Status.COMPILE_ERROR;
        break;
      case 904:
        statusCode = Apiomat.Status.REFERENCE_ERROR;
        break;
      case 905:
        statusCode = Apiomat.Status.PUSH_PAYLOAD_ERROR;
        break;
      case 906:
        statusCode = Apiomat.Status.PUSH_SEND_ERROR;
        break;
      case 907:
        statusCode = Apiomat.Status.PUSH_INIT_FAILED;
        break;
      case 908:
        statusCode = Apiomat.Status.FACEBOOK_ERROR;
        break;
      case 910:
        statusCode = Apiomat.Status.FACEBOOK_OAUTH_ERROR;
        break;
      case 917:
        statusCode = Apiomat.Status.FACEBOOK_OAUTH_ERROR2;
        break;
      case 911:
        statusCode = Apiomat.Status.MEMBER_NOT_FOUND;
        break;
      case 912:
        statusCode = Apiomat.Status.WORDPRESS_FETCH_DATA_ERROR;
        break;
      case 913:
        statusCode = Apiomat.Status.TUMBLR_OAUTH_ERROR;
        break;
      case 914:
        statusCode = Apiomat.Status.TUMBLR_ERROR;
        break;
      case 915:
        statusCode = Apiomat.Status.EXECUTE_METHOD_ERROR_PRIMITIVE;
        break;
      case 916:
        statusCode = Apiomat.Status.EXECUTE_METHOD_ERROR;
        break;
      case 918:
        statusCode = Apiomat.Status.OAUTH_TOKEN_REQUEST_ERROR;
        break;
      case 919:
        statusCode = Apiomat.Status.FINDING_RESOURCE_ERROR;
        break;
      case 920:
        statusCode = Apiomat.Status.NATIVEMODULE_DEPLOY;
        break;
      case 921:
        statusCode = Apiomat.Status.TOKEN_SEARCH_ERROR;
        break;
      case 922:
        statusCode = Apiomat.Status.MODULE_CONFIG_MISSING;
        break;
      case 923:
        statusCode = Apiomat.Status.NATIVEMODULE_INIT;
        break;
      case 924:
        statusCode = Apiomat.Status.NATIVEMODULE_PULL;
        break;
      case 925:
        statusCode = Apiomat.Status.NATIVEMODULE_PUSH;
        break;
      case 926:
        statusCode = Apiomat.Status.NO_DOGET_RETURN;
        break;
      case 927:
        statusCode = Apiomat.Status.CUSTOMER_TWO_ORGS;
        break;
      case 928:
        statusCode = Apiomat.Status.NATIVEMODULE_HOOKS_NOT_FOUND;
        break;
      case 929:
        statusCode = Apiomat.Status.ANALYTICS_ERROR;
        break;
      case 930:
        statusCode = Apiomat.Status.EMAIL_ERROR;
        break;
      case 601:
        statusCode = Apiomat.Status.HREF_NOT_FOUND;
        break;
      case 602:
        statusCode = Apiomat.Status.WRONG_URI_SYNTAX;
        break;
      case 603:
        statusCode = Apiomat.Status.WRONG_CLIENT_PROTOCOL;
        break;
      case 604:
        statusCode = Apiomat.Status.IO_EXCEPTION;
        break;
      case 605:
        statusCode = Apiomat.Status.UNSUPPORTED_ENCODING;
        break;
      case 606:
        statusCode = Apiomat.Status.INSTANTIATE_EXCEPTION;
        break;
      case 607:
        statusCode = Apiomat.Status.IN_PERSISTING_PROCESS;
        break;
      case 608:
        statusCode = Apiomat.Status.VERIFY_SOCIALMEDIA;
        break;
      case 609:
        statusCode = Apiomat.Status.TOO_MANY_LOCALIDS;
        break;
      case 610:
        statusCode = Apiomat.Status.MAX_CACHE_SIZE_REACHED;
        break;
      case 611:
        statusCode = Apiomat.Status.CANT_WRITE_IN_CACHE;
        break;
      case 612:
        statusCode = Apiomat.Status.BAD_DATASTORE_CONFIG;
        break;
      case 613:
        statusCode = Apiomat.Status.NO_TOKEN_RECEIVED;
        break;
      case 614:
        statusCode = Apiomat.Status.NO_NETWORK;
        break;
      case 615:
        statusCode = Apiomat.Status.ID_NOT_FOUND_OFFLINE;
        break;
      case 616:
        statusCode = Apiomat.Status.ATTACHED_HREF_MISSING;
        break;
      case 617:
        statusCode = Apiomat.Status.REQUEST_TIMEOUT;
        break;
      case 618:
        statusCode = Apiomat.Status.ASYNC_WAIT_ERROR;
        break;
      case 619:
        statusCode = Apiomat.Status.IN_DELETING_PROCESS;
        break;
      case 620:
        statusCode = Apiomat.Status.SSO_REDIRECT;
        break;
      case 621:
        statusCode = Apiomat.Status.MANUAL_CONCURRENT_WRITE_FAILED;
        break;
      case 622:
        statusCode = Apiomat.Status.SAVE_FAILED;
        break;
      case 623:
        statusCode = Apiomat.Status.SSL_ERROR;
        break;
      case 624:
        statusCode = Apiomat.Status.MAX_FILE_SIZE_OFFLINE_EXCEEDED;
        break;
      case 625:
        statusCode = Apiomat.Status.SQL_CONSTRAINT;
        break;
      case 950:
        statusCode = Apiomat.Status.MALICIOUS_MEMBER;
        break
    }
    return statusCode
  }}
})(typeof exports === "undefined" ? Apiomat : exports);
/*
 MIT
*/

exports.XMLHttpRequest = function() {
  var self = this;
  var request;
  var response;
  var settings = {};
  var disableHeaderCheck = false;
  var defaultHeaders = {"User-Agent":"node-XMLHttpRequest", "Accept":"*/*"};
  var headers = {};
  var headersCase = {};
  var forbiddenRequestHeaders = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "content-transfer-encoding", "cookie", "cookie2", "date", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "via"];
  var forbiddenRequestMethods = ["TRACE", "TRACK", "CONNECT"];
  var sendFlag = false;
  var errorFlag = false;
  var listeners = {};
  var http;
  var https;
  var Url;
  var spawn;
  var fs;
  this.UNSENT = 0;
  this.OPENED = 1;
  this.HEADERS_RECEIVED = 2;
  this.LOADING = 3;
  this.DONE = 4;
  this.readyState = this.UNSENT;
  this.onreadystatechange = null;
  this.responseText = "";
  this.responseXML = "";
  this.status = null;
  this.statusText = null;
  this.withCredentials = false;

 /* if(Apiomat.AOMHelper.isNodeJS() && Apiomat.isReact == false)
  {
    console.log("*****************abc**********************");
    http = require("http");
    https = require("https");
    Url = require("url");
    spawn = require("child_process").spawn;
    fs = require("fs");
  }
*/
  var isAllowedHttpHeader = function(header) {
    return disableHeaderCheck || header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1
  };
  var isAllowedHttpMethod = function(method) {
    return method && forbiddenRequestMethods.indexOf(method) === -1
  };
  this.open = function(method, url, async, user, password) {
    this.abort();
    errorFlag = false;
    if(!isAllowedHttpMethod(method)) {
      throw new Error("SecurityError: Request method not allowed");
    }
    settings = {"method":method, "url":url.toString(), "async":typeof async !== "boolean" ? true : async, "user":user || null, "password":password || null};
    setState(this.OPENED)
  };
  this.setDisableHeaderCheck = function(state) {
    disableHeaderCheck = state
  };
  this.setRequestHeader = function(header, value) {
    if(this.readyState !== this.OPENED) {
      throw new Error("INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN");
    }
    if(!isAllowedHttpHeader(header)) {
      console.warn('Refused to set unsafe header "' + header + '"');
      return
    }
    if(sendFlag) {
      throw new Error("INVALID_STATE_ERR: send flag is true");
    }
    header = headersCase[header.toLowerCase()] || header;
    headersCase[header.toLowerCase()] = header;
    headers[header] = headers[header] ? headers[header] + ", " + value : value
  };
  this.getResponseHeader = function(header) {
    if(typeof header === "string" && this.readyState > this.OPENED && response && response.headers && response.headers[header.toLowerCase()] && !errorFlag) {
      return response.headers[header.toLowerCase()]
    }
    return null
  };
  this.getAllResponseHeaders = function() {
    if(this.readyState < this.HEADERS_RECEIVED || errorFlag) {
      return""
    }
    var result = "";
    for(var i in response.headers) {
      if(i !== "set-cookie" && i !== "set-cookie2") {
        result += i + ": " + response.headers[i] + "\r\n"
      }
    }
    return result.substr(0, result.length - 2)
  };
  this.getRequestHeader = function(name) {
    if(typeof name === "string" && headersCase[name.toLowerCase()]) {
      return headers[headersCase[name.toLowerCase()]]
    }
    return""
  };
  this.send = function(data) {
    if(this.readyState !== this.OPENED) {
      throw new Error("INVALID_STATE_ERR: connection must be opened before send() is called");
    }
    if(sendFlag) {
      throw new Error("INVALID_STATE_ERR: send has already been called");
    }
    var ssl = false, local = false;
    var url = Url.parse(settings.url);
    var host;
    switch(url.protocol) {
      case "https:":
        ssl = true;
      case "http:":
        host = url.hostname;
        break;
      case "file:":
        local = true;
        break;
      case undefined:
      ;
      case null:
      ;
      case "":
        host = "localhost";
        break;
      default:
        throw new Error("Protocol not supported.");
    }
    if(local) {
      if(settings.method !== "GET") {
        throw new Error("XMLHttpRequest: Only GET method is supported");
      }
      if(settings.async) {
        fs.readFile(url.pathname, "utf8", function(error, data) {
          if(error) {
            self.handleError(error)
          }else {
            self.status = 200;
            self.responseText = data;
            setState(self.DONE)
          }
        })
      }else {
        try {
          this.responseText = fs.readFileSync(url.pathname, "utf8");
          this.status = 200;
          setState(self.DONE)
        }catch(e) {
          this.handleError(e)
        }
      }
      return
    }
    var port = url.port || (ssl ? 443 : 80);
    var uri = url.pathname + (url.search ? url.search : "");
    for(var name in defaultHeaders) {
      if(!headersCase[name.toLowerCase()]) {
        headers[name] = defaultHeaders[name]
      }
    }
    headers.Host = host;
    if(!(ssl && port === 443 || port === 80)) {
      headers.Host += ":" + url.port
    }
    if(settings.user) {
      if(typeof settings.password === "undefined") {
        settings.password = ""
      }
      var authBuf = new Buffer(settings.user + ":" + settings.password);
      headers.Authorization = "Basic " + authBuf.toString("base64")
    }
    if(settings.method === "GET" || settings.method === "HEAD") {
      data = null
    }else {
      if(data) {
        headers["Content-Length"] = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);
        if(!headers["Content-Type"]) {
          headers["Content-Type"] = "text/plain;charset\x3dUTF-8"
        }
      }else {
        if(settings.method === "POST") {
          headers["Content-Length"] = 0
        }
      }
    }
    var options = {host:host, port:port, path:uri, method:settings.method, headers:headers, agent:false, withCredentials:self.withCredentials};
    errorFlag = false;
    if(settings.async) {
      var doRequest = ssl ? https.request : http.request;
      sendFlag = true;
      self.dispatchEvent("readystatechange");
      var responseHandler = function responseHandler(resp) {
        response = resp;
        if(response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
          settings.url = response.headers.location;
          var url = Url.parse(settings.url);
          host = url.hostname;
          var newOptions = {hostname:url.hostname, port:url.port, path:url.path, method:response.statusCode === 303 ? "GET" : settings.method, headers:headers, withCredentials:self.withCredentials};
          request = doRequest(newOptions, responseHandler).on("error", errorHandler);
          request.end();
          return
        }
        response.setEncoding("utf8");
        setState(self.HEADERS_RECEIVED);
        self.status = response.statusCode;
        response.on("data", function(chunk) {
          if(chunk) {
            self.responseText += chunk
          }
          if(sendFlag) {
            setState(self.LOADING)
          }
        });
        response.on("end", function() {
          if(sendFlag) {
            setState(self.DONE);
            sendFlag = false
          }
        });
        response.on("error", function(error) {
          self.handleError(error)
        })
      };
      var errorHandler = function errorHandler(error) {
        self.handleError(error)
      };
      request = doRequest(options, responseHandler).on("error", errorHandler);
      if(data) {
        request.write(data)
      }
      request.end();
      self.dispatchEvent("loadstart")
    }else {
      var contentFile = ".node-xmlhttprequest-content-" + process.pid;
      var syncFile = ".node-xmlhttprequest-sync-" + process.pid;
      fs.writeFileSync(syncFile, "", "utf8");
      var execString = "var http \x3d require('http'), https \x3d require('https'), fs \x3d require('fs');" + "var doRequest \x3d http" + (ssl ? "s" : "") + ".request;" + "var options \x3d " + JSON.stringify(options) + ";" + "var responseText \x3d '';" + "var req \x3d doRequest(options, function(response) {" + "response.setEncoding('utf8');" + "response.on('data', function(chunk) {" + "  responseText +\x3d chunk;" + "});" + "response.on('end', function() {" + "fs.writeFileSync('" + contentFile + 
      "', JSON.stringify({err: null, data: {statusCode: response.statusCode, headers: response.headers, text: responseText}}), 'utf8');" + "fs.unlinkSync('" + syncFile + "');" + "});" + "response.on('error', function(error) {" + "fs.writeFileSync('" + contentFile + "', JSON.stringify({err: error}), 'utf8');" + "fs.unlinkSync('" + syncFile + "');" + "});" + "}).on('error', function(error) {" + "fs.writeFileSync('" + contentFile + "', JSON.stringify({err: error}), 'utf8');" + "fs.unlinkSync('" + syncFile + 
      "');" + "});" + (data ? "req.write('" + JSON.stringify(data).slice(1, -1).replace(/'/g, "\\'") + "');" : "") + "req.end();";
      var syncProc = spawn(process.argv[0], ["-e", execString]);
      while(fs.existsSync(syncFile)) {
      }
      var resp = JSON.parse(fs.readFileSync(contentFile, "utf8"));
      syncProc.stdin.end();
      fs.unlinkSync(contentFile);
      if(resp.err) {
        self.handleError(resp.err)
      }else {
        response = resp.data;
        self.status = resp.data.statusCode;
        self.responseText = resp.data.text;
        setState(self.DONE)
      }
    }
  };
  this.handleError = function(error) {
    this.status = 0;
    this.statusText = error;
    this.responseText = error.stack;
    errorFlag = true;
    setState(this.DONE);
    this.dispatchEvent("error")
  };
  this.abort = function() {
    if(request) {
      request.abort();
      request = null
    }
    headers = defaultHeaders;
    this.status = 0;
    this.responseText = "";
    this.responseXML = "";
    errorFlag = true;
    if(this.readyState !== this.UNSENT && (this.readyState !== this.OPENED || sendFlag) && this.readyState !== this.DONE) {
      sendFlag = false;
      setState(this.DONE)
    }
    this.readyState = this.UNSENT;
    this.dispatchEvent("abort")
  };
  this.addEventListener = function(event, callback) {
    if(!(event in listeners)) {
      listeners[event] = []
    }
    listeners[event].push(callback)
  };
  this.removeEventListener = function(event, callback) {
    if(event in listeners) {
      listeners[event] = listeners[event].filter(function(ev) {
        return ev !== callback
      })
    }
  };
  this.dispatchEvent = function(event) {
    if(typeof self["on" + event] === "function") {
      self["on" + event]()
    }
    if(event in listeners) {
      for(var i = 0, len = listeners[event].length;i < len;i++) {
        listeners[event][i].call(self)
      }
    }
  };
  var setState = function(state) {
    if(state == self.LOADING || self.readyState !== state) {
      self.readyState = state;
      if(settings.async || self.readyState < self.OPENED || self.readyState === self.DONE) {
        self.dispatchEvent("readystatechange")
      }
      if(self.readyState === self.DONE && !errorFlag) {
        self.dispatchEvent("load");
        self.dispatchEvent("loadend")
      }
    }
  }
};
if(typeof goog !== "undefined") {
  Apiomat.MemoryStorage = {}
}
Array.prototype.contains = function(obj) {
  var i = this.length;
  while(i--) {
    if(this[i] === obj) {
      return true
    }
  }
  return false
};
var _collectionStorage = {};
var _objectStorage = {};
var _useDeltaSync = false;
(function(Apiomat) {
  Apiomat.MemoryStorage = function() {
    return{addOrUpdateCollection:function(href, responseJSON) {
      if(responseJSON instanceof Array) {
        if(_useDeltaSync) {
          if(!_collectionStorage.hasOwnProperty(href)) {
            _collectionStorage[href] = _createIdArray(responseJSON)
          }else {
            _collectionStorage[href] = _updateIdArray(responseJSON, href)
          }
        }else {
          _collectionStorage[href] = _createIdArray(responseJSON)
        }
        for(i = 0;i < responseJSON.length;i++) {
          this.addOrUpdateObject(responseJSON[i])
        }
      }else {
        this.addOrUpdateObject(responseJSON, href)
      }
    }, addOrUpdateObject:function(object, href) {
      if(object.id != undefined) {
        if(_objectStorage.hasOwnProperty(object.id) && _objectStorage[object.id].lastModifiedAt <= object.lastModifiedAt || !_objectStorage.hasOwnProperty(object.id)) {
          _objectStorage[object.id] = object
        }
      }else {
        if(href.indexOf("images/") > -1) {
          _objectStorage[href.substring(href.lastIndexOf("images/") + "images/".length, href.lastIndexOf(".img"))] = object
        }else {
          if(href.indexOf("files/") > -1) {
            _objectStorage[href.substring(href.lastIndexOf("files/") + "files/".length, href.lastIndexOf(".img"))] = object
          }
        }
      }
    }, getCollection:function(href) {
      return _collectionStorage[href]
    }, getCollectionObjects:function(href) {
      collection = this.getCollection(href);
      if(!collection) {
        var id = href.substring(href.lastIndexOf("/") + 1, href.length);
        if(id.indexOf(".img") > -1) {
          id = id.substring(0, id.lastIndexOf(".img"))
        }
        return this.getObject(id)
      }
      var objectArray = new Array;
      for(i = 0;i < collection.length;i++) {
        if(_objectStorage[collection[i]]) {
          objectArray.push(_objectStorage[collection[i]])
        }
      }
      return objectArray
    }, getObject:function(id) {
      return _objectStorage[id]
    }, removeCollection:function(href) {
      delete _collectionStorage[href]
    }, removeObjectByHref:function(href) {
      var potentialHref = href.substring(0, href.lastIndexOf("/"));
      var id = href.substring(href.lastIndexOf("/") + 1, href.length);
      var splits = potentialHref.split("/");
      var isReference = false;
      for(i = splits.length - 1;i > 2;i--) {
        if(splits[i].slice(0, 1).match(/[0-9]/) != null) {
          isReference = true;
          break
        }
      }
      if(potentialHref in _collectionStorage && isReference) {
        _removeIdFromCollection(potentialHref, id)
      }else {
        if(id in _objectStorage && !isReference) {
          _removeObject(id)
        }
      }
    }, removeObjectById:function(id) {
      _removeObject(id)
    }, removeObjectsOnDelta:function(href, ids) {
      if(_useDeltaSync) {
        if(href in _collectionStorage) {
          for(i = 0;i < ids.length;i++) {
            _removeIdFromCollection(href, ids[i])
          }
        }
      }
    }, getCollectionStorage:function() {
      return _collectionStorage
    }, setUseDeltaSync:function(useDeltaSync) {
      _useDeltaSync = useDeltaSync
    }, getObjectStorage:function() {
      return _objectStorage
    }, clearStorage:function() {
      this.clearCollections();
      this.clearObjects()
    }, clearCollections:function() {
      _collectionStorage = {}
    }, clearObjects:function() {
      _objectStorage = {}
    }};
    function _createIdArray(collection) {
      var idArray = new Array;
      for(i = 0;i < collection.length;i++) {
        if(collection[i] && collection[i].id != undefined) {
          idArray.push(collection[i].id)
        }
      }
      return idArray
    }
    function _updateIdArray(collection, href) {
      var idArray = _collectionStorage[href];
      for(i = 0;i < collection.length;i++) {
        if(collection[i].id != undefined && !idArray.contains(collection[i].id)) {
          idArray.push(collection[i].id)
        }
      }
      return idArray
    }
    function _removeObject(id) {
      delete _objectStorage[id];
      for(var key in _collectionStorage) {
        _removeIdFromCollection(key, id)
      }
    }
    function _removeIdFromCollection(href, id) {
      var index = _collectionStorage[href].indexOf(id);
      if(index !== undefined && index > -1) {
        _collectionStorage[href].splice(index, 1)
      }
    }
  }()
})(typeof exports === "undefined" ? Apiomat : exports);
if(typeof goog !== "undefined") {
  Apiomat.ApiomatRequestError = {}
}
if(typeof exports === "undefined") {
  var Apiomat = Apiomat || {}
}
(function(Apiomat) {
  Apiomat.ApiomatRequestError = function(_statusCode, _expectedCodes, _message) {
    this.message = _message || Apiomat.Status.getReasonPhrase(_statusCode);
    this.name = "ApiomatRequestError";
    this.expectedCodes = _expectedCodes;
    this.statusCode = _statusCode;
    this.extraInformations = {};
    this.getStatusObj = function() {
      return Apiomat.Status.getStatusForCode(this.statusCode)
    };
    this.setExtraInformations = function(_extraInformations) {
      this.extraInformations = _extraInformations
    };
    this.getExtraInformations = function() {
      return this.extraInformations
    }
  };
  Apiomat.ApiomatRequestError.prototype = new Error;
  Apiomat.ApiomatRequestError.prototype.constructor = Apiomat.ApiomatRequestError
})(typeof exports === "undefined" ? Apiomat : exports);
if(typeof goog !== "undefined") {
  Apiomat.AOMFileHandler = {}
}
if(typeof exports === "undefined") {
  var Apiomat = Apiomat || {}
}
(function(Apiomat) {
  Apiomat.AOMFileHandler = function() {
    var fileList = {};
    var fileSystem = undefined;
    var subdir = "apiomatpersists";
    var supporFileApi = typeof window !== "undefined" && window.File && window.FileReader && window.FileList && window.Blob;
    if(supporFileApi) {
      var fail = function(evt) {
        console.log(evt.target.error.code)
      };
      var gotFS = function(_fileSystem) {
        fileSystem = _fileSystem
      };
      var persObj = window.PERSISTENT;
      if(!persObj && typeof LocalFileSystem !== "undefined") {
        persObj = LocalFileSystem.PERSISTENT
      }
      if(persObj) {
        if(typeof window !== "undefined" && window.requestFileSystem) {
          window.requestFileSystem(persObj, 0, gotFS, fail)
        }
      }
    }
    this.getAppDirectory = function(successCB, errorCB) {
      if(typeof fileSystem !== "undefined") {
        fileSystem.root.getDirectory(subdir, {create:true}, function(dirEntry) {
          if(successCB) {
            successCB(dirEntry)
          }
        }, function(evt) {
          console.error("Can't get directory handle!!");
          if(errorCB) {
            errorCB(evt)
          }
        })
      }else {
        if(successCB) {
          successCB(undefined)
        }
      }
    };
    this.getFileHandler = function(_fileName, successCB, errorCB, _options) {
      var getDirCB = function(dir) {
        if(typeof dir !== "undefined") {
          dir.getFile(_fileName, {}, function(fileEntry) {
            if(successCB) {
              successCB(fileEntry)
            }
          }, errorCB)
        }else {
          errorCB()
        }
      };
      this.getAppDirectory(getDirCB, errorCB)
    };
    this.getSizeOfAppDir = function(successCB, errorCB) {
      if(typeof fileSystem !== "undefined") {
        var obj = this;
        var getSizeOfFiles = function(_entries, _name, _pointer, _currentSize, _successCB, _errorCB) {
          if(_pointer >= _entries.length) {
            _successCB(_currentSize);
            return
          }
          obj.getFileHandler(_name, function(fileEntry) {
            fileEntry.file(function(file) {
              _currentSize = _currentSize + file.size;
              var nextName = undefined;
              if(typeof _entries[++_pointer] !== "undefined") {
                nextName = _entries[_pointer].name
              }
              getSizeOfFiles(_entries, nextName, _pointer, _currentSize, _successCB, _errorCB)
            }, _errorCB)
          }, function(evt) {
            if(evt.code !== FileError.NOT_FOUND_ERR && errorCB) {
              _errorCB(evt)
            }else {
              if(typeof _entries[++_pointer] !== "undefined") {
                nextName = _entries[_pointer].name
              }
              getSizeOfFiles(_entries, _nextName, _pointer, _currentSize, _successCB, _errorCB)
            }
          })
        };
        var gotList = function(entries) {
          if(typeof entries !== undefined && entries.length > 0) {
            getSizeOfFiles(entries, entries[0].name, 0, 0, function(dirSize) {
              if(successCB) {
                successCB(dirSize)
              }
            }, errorCB)
          }else {
            if(successCB) {
              successCB(0)
            }
          }
        };
        var getSizeOfAppDir = function(dir) {
          var reader = dir.createReader();
          reader.readEntries(gotList, errorCB)
        };
        this.getAppDirectory(getSizeOfAppDir, errorCB)
      }else {
        if(successCB) {
          successCB(0)
        }
      }
    };
    this.createFileName = function(_prefix) {
      return _prefix + "_" + (new Date).getTime()
    };
    this.removeFile = function(_fileName, successCB, errorCB) {
      if(typeof fileSystem !== "undefined") {
        var getFileCB = function(file) {
          file.remove(function() {
            if(successCB) {
              successCB()
            }
          }, errorCB)
        };
        this.getFileHandler(_fileName, getFileCB, function(evt) {
          if(evt.code !== FileError.NOT_FOUND_ERR && errorCB) {
            errorCB(evt)
          }else {
            if(successCB) {
              successCB()
            }
          }
        })
      }else {
        delete fileList[_fileName];
        if(successCB) {
          successCB()
        }
      }
    };
    this.readFile = function(_fileName, successCB, errorCB) {
      if(typeof fileSystem !== "undefined") {
        var getFileCB = function(fileEntry) {
          fileEntry.file(function(file) {
            var reader = new FileReader;
            reader.onloadend = function(evt) {
              if(successCB) {
                successCB(evt.target.result)
              }
            };
            reader.readAsText(file)
          })
        };
        this.getFileHandler(_fileName, getFileCB, function(evt) {
          if(evt.code !== FileError.NOT_FOUND_ERR && errorCB) {
            errorCB(evt)
          }else {
            if(successCB) {
              successCB(undefined)
            }
          }
        })
      }else {
        if(successCB) {
          successCB(fileList[_fileName])
        }
      }
    };
    this.writeFile = function(_fileName, _content, successCB, errorCB) {
      if(typeof fileSystem !== "undefined") {
        var getFileCB = function(fileEntry) {
          var gotFileWriter = function(writer) {
            writer.onwriteend = function(evt) {
              if(successCB) {
                successCB()
              }
            };
            writer.write(_content)
          };
          fileEntry.createWriter(gotFileWriter, errorCB)
        };
        this.getFileHandler(_fileName, getFileCB, errorCB, {create:true, exclusive:false})
      }else {
        fileList[_fileName] = _content;
        if(successCB) {
          successCB()
        }
      }
    }
  };
  Apiomat.AOMFileHandler.HREFMAP_FILENAME = "hrefMap";
  Apiomat.AOMFileHandler.USEDLOCALIDS_FILENAME = "usedLocalIDs";
  Apiomat.AOMFileHandler.TASKLIST_FILENAME = "taskList";
  Apiomat.AOMFileHandler.prototype = {}
})(typeof exports === "undefined" ? Apiomat : exports);
if(typeof goog !== "undefined") {
  Apiomat.AOMFileHandlerTi = {}
}
if(typeof exports === "undefined") {
  var Apiomat = Apiomat || {}
}
(function(Apiomat) {
  Apiomat.AOMFileHandlerTi = function() {
    var getDirectoryHandle = function() {
      var subdir = "apiomatpersists";
      var appDir = Ti.Filesystem.applicationDataDirectory;
      var dir = Ti.Filesystem.getFile(appDir, subdir);
      if(dir.exists() === false) {
        dir.createDirectory()
      }
      return dir
    };
    this.getAppDirectory = function(successCB, errorCB) {
      var dir = getDirectoryHandle();
      if(typeof dir === "undefined" && errorCB) {
        errorCB()
      }else {
        if(successCB) {
          successCB(dir.nativePath)
        }
      }
    };
    this.getSizeOfAppDir = function(successCB, errorCB) {
      var dir = getDirectoryHandle();
      if(typeof dir === "undefined" && errorCB) {
        errorCB()
      }else {
        if(successCB) {
          successCB(dir.size)
        }
      }
    }
  };
  if(Apiomat.AOMHelper.isTitaniumApp()) {
    Apiomat.AOMFileHandlerTi.prototype = new Apiomat.AOMFileHandler;
    Apiomat.AOMFileHandlerTi.prototype.constructor = Apiomat.AOMFileHandlerTi;
    Apiomat.AOMFileHandlerTi.prototype.removeFile = function(_fileName, successCB, errorCB) {
      var success = false;
      var getDirCB = function(dir) {
        var f = Ti.Filesystem.getFile(dir, _fileName);
        if(f.exists() && f.writeable) {
          success = f.deleteFile()
        }
        if(success) {
          if(successCB) {
            successCB()
          }
        }else {
          if(errorCB) {
            errorCB()
          }
        }
      };
      this.getAppDirectory(getDirCB, errorCB)
    };
    Apiomat.AOMFileHandlerTi.prototype.readFile = function(_fileName, successCB, errorCB) {
      var getDirCB = function(dir) {
        var contents = undefined;
        var f = Ti.Filesystem.getFile(dir, _fileName);
        if(f.exists()) {
          contents = f.read()
        }
        if(contents && typeof contents !== "undefined") {
          if(successCB) {
            successCB(contents.text)
          }
        }else {
          if(successCB) {
            successCB(undefined)
          }
        }
      };
      this.getAppDirectory(getDirCB, errorCB)
    };
    Apiomat.AOMFileHandlerTi.prototype.writeFile = function(_fileName, _content, successCB, errorCB) {
      var getDirCB = function(dir) {
        var f = Ti.Filesystem.getFile(dir, _fileName);
        var success = f.write(_content);
        if(success) {
          if(successCB) {
            successCB()
          }
        }else {
          if(errorCB) {
            errorCB()
          }
        }
      };
      this.getAppDirectory(getDirCB, errorCB)
    }
  }
})(typeof exports === "undefined" ? Apiomat : exports);
if(typeof goog !== "undefined") {
  Apiomat.AOMNetworkHandler = {}
}
if(typeof exports === "undefined") {
  var Apiomat = Apiomat || {}
}
(function(Apiomat) {
  Apiomat.AOMNetworkHandler = function() {
    return{AOMNETWORKEVENT:"AomNetworkEvent", isChecking:false, checkForConnection:function() {
      Apiomat.AOMNetworkHandler.isChecking = true;
      if(Apiomat.AOMNetworkHandler.isConnected() === false) {
        setTimeout(Apiomat.AOMNetworkHandler.checkForConnection, 150)
      }else {
        console.log("Connection is back...");
        Apiomat.AOMNetworkHandler.isChecking = false;
        Apiomat.AOMHelper.sendEvent(Apiomat.AOMNetworkHandler.AOMNETWORKEVENT, {"isConnected":true})
      }
    }, isConnected:function(connectedCallback) {
      console.log("isConnected");
      var connected = true;
      if(true) {
        console.log("isReact");
        return true;
      }
      if(Apiomat.AOMHelper.isTitaniumApp()) {
        connected = Titanium.Network.online
      }else {
        connected = navigator.onLine
      }
      if(Apiomat.forceOffline === true) {
        connected = !Apiomat.forceOffline
      }
      if(connected === false && Apiomat.AOMNetworkHandler.isChecking === false) {
        Apiomat.AOMNetworkHandler.checkForConnection()
      }
      return connected
    }}
  }()
})(typeof exports === "undefined" ? Apiomat : exports);
if(typeof goog !== "undefined") {
  Apiomat.AOMOfflineStorage = {}
}

Apiomat = exports;

if(Apiomat.AOMHelper.isTitaniumApp()) {
  localStorage = Ti.App.Properties;
  localStorage.setItem = function(key, value) {
    localStorage.setString(key, value)
  };
  localStorage.getItem = function(key) {
    return localStorage.getString(key)
  };
  localStorage.removeItem = function(key) {
    localStorage.removeProperty(key)
  };
  localStorage.clear = function() {
    var props = localStorage.listProperties();
    for(i = 0;i < props.length;i++) {
      localStorage.removeProperty(props[i])
    }
    return true
  };
  localStorage.keys = function() {
    return localStorage.listProperties()
  }()
}
(function(Apiomat) {
  Apiomat.AOMOfflineStorage = function() {
    return{addOrUpdateCollection:function(href, collection) {
      if(collection instanceof Array) {
        if(_useDeltaSync) {
          if(localStorage.getItem(href) === null) {
            localStorage.setItem(href, JSON.stringify(_createIdArray(collection)))
          }else {
            localStorage.setItem(href, JSON.stringify(_updateIdArray(collection, href)))
          }
        }else {
          localStorage.setItem(href, JSON.stringify(_createIdArray(collection)))
        }
        for(i = 0;i < collection.length;i++) {
          this.addOrUpdateObject(collection[i])
        }
      }else {
        this.addOrUpdateObject(collection, href)
      }
    }, addOrUpdateObject:function(object, href) {
      if(object.id != undefined) {
        if(localStorage.getItem(object.id) !== null && JSON.parse(localStorage.getItem(object.id)).lastModifiedAt <= object.lastModifiedAt || localStorage.getItem(object.id) === null) {
          localStorage.setItem(object.id, JSON.stringify(object))
        }
      }else {
        if(href.indexOf("images/") > -1) {
          localStorage.setItem(href.substring(href.lastIndexOf("images/") + "images/".length, href.lastIndexOf(".img")), JSON.stringify(object))
        }else {
          if(href.indexOf("files/") > -1) {
            localStorage.setItem(href.substring(href.lastIndexOf("files/") + "files/".length, href.lastIndexOf(".img")), JSON.stringify(object))
          }
        }
      }
    }, getCollection:function(href) {
      var ret = JSON.parse(localStorage.getItem(href));
      if(ret == null) {
        return undefined
      }
      return ret
    }, getCollectionObjects:function(href) {
      var collection = this.getCollection(href);
      if(!collection) {
        var id = href.substring(href.lastIndexOf("/") + 1, href.length);
        if(id.indexOf(".img") > -1) {
          id = id.substring(0, id.lastIndexOf(".img"))
        }
        var ret = this.getObject(id);
        if(ret == null) {
          return undefined
        }
        return ret
      }
      var objectArray = new Array;
      for(i = 0;i < collection.length;i++) {
        if(localStorage.getItem(collection[i]) !== null) {
          objectArray.push(JSON.parse(localStorage.getItem(collection[i])))
        }
      }
      return objectArray
    }, getObject:function(id) {
      var ret = JSON.parse(localStorage.getItem(id));
      if(ret == null) {
        return undefined
      }
      return ret
    }, removeCollection:function(href) {
      localStorage.removeItem(href)
    }, removeObjectByHref:function(href) {
      var potentialHref = href.substring(0, href.lastIndexOf("/"));
      var id = href.substring(href.lastIndexOf("/") + 1, href.length);
      var splits = potentialHref.split("/");
      var isReference = false;
      for(i = splits.length - 1;i > 2;i--) {
        if(splits[i].slice(0, 1).match(/[0-9]/) != null) {
          isReference = true;
          break
        }
      }
      if(localStorage.getItem(potentialHref) !== null && isReference) {
        _removeIdFromCollection(potentialHref, id)
      }else {
        if(localStorage.getItem(id) !== null && !isReference) {
          _removeObject(id)
        }
      }
    }, removeObjectById:function(id) {
      _removeObject(id)
    }, removeObjectsOnDelta:function(href, ids) {
      if(_useDeltaSync) {
        if(localStorage.getItem(href) !== null) {
          for(i = 0;i < ids.length;i++) {
            _removeIdFromCollection(href, ids[i])
          }
        }
      }
    }, setUseDeltaSync:function(useDeltaSync) {
      _useDeltaSync = useDeltaSync
    }, getCollectionStorage:function() {
      return localStorage
    }, clearStorage:function() {
      localStorage.clear()
    }};
    function _string2Bin(str) {
      var result = [];
      for(var i = 0;i < str.length;i++) {
        result.push(str.charCodeAt(i))
      }
      return result
    }
    function _bin2String(array) {
      return String.fromCharCode.apply(String, array)
    }
    function _createIdArray(collection) {
      var idArray = new Array;
      for(i = 0;i < collection.length;i++) {
        if(collection[i] && collection[i].id != undefined) {
          idArray.push(collection[i].id)
        }
      }
      return idArray
    }
    function _updateIdArray(collection, href) {
      var idArray = JSON.parse(localStorage.getItem(href));
      for(i = 0;i < collection.length;i++) {
        if(collection[i].id != undefined) {
          var contains = false;
          for(j = 0;j < idArray.length;j++) {
            if(idArray[j] === collection[i].id) {
              contains = true;
              break
            }
          }
          if(!contains) {
            idArray.push(collection[i].id)
          }
        }
      }
      if(idArray == null) {
        return undefined
      }
      return idArray
    }
    function _removeIdFromCollection(href, id) {
      try {
        var idArray = JSON.parse(localStorage.getItem(href));
        if(idArray instanceof Array) {
          var index = idArray.indexOf(id);
          if(index !== undefined && index > -1) {
            idArray.splice(index, 1);
            localStorage.setItem(href, JSON.stringify(idArray))
          }
        }
      }catch(e) {
      }finally {
      }
    }
    function _removeObject(id) {
      localStorage.removeItem(id);
      if(!Apiomat.AOMHelper.isTitaniumApp()) {
        for(var key in localStorage) {
          _removeIdFromCollection(key, id)
        }
      }else {
        var items = localStorage.listProperties();
        var i;
        for(i = 0;i < items.length;i++) {
          _removeIdFromCollection(items[i], id)
        }
        var items = localStorage.listProperties()
      }
    }
  }()
})(typeof exports === "undefined" ? Apiomat : exports);
if(typeof goog !== "undefined") {
  Apiomat.Datastore = {}
}
if(typeof exports === "undefined") {
  var Apiomat = Apiomat || {}
}
function headerHook(header) {
  return header
}
function responseHook(http) {
  return http
}
function processOfflineHook(flag) {
  return flag
}
(function(Apiomat) {
  Apiomat.AOMOfflineStrategy = {"NO_OFFLINE_HANDLING":0, "USE_OFFLINE_CACHE":1};
  Apiomat.AOMCacheStrategy = {"NETWORK_ONLY":0, "NETWORK_ELSE_CACHE":1, "CACHE_ELSE_NETWORK":2, "CACHE_THEN_NETWORK":3};
  Apiomat.AOMAuthType = {GUEST:0, USERNAME_PASSWORD:1, OAUTH2_TOKEN:2};
  Apiomat.SSO_REDIRECT_URL = "AOM_SSO_REDIRECT_URL";
  Apiomat.SSO_REDIRECT_DATA = "AOM_SSO_REDIRECT_DATA";
  Apiomat.HEADER = {ETAG:"Etag", LAST_MODIFIED:"Last-Modified", MODIFIED_SINCE:"If-Modified-Since", EXPIRES:"Expires", CACHE_CONTROL:"Cache-Control"};
  Apiomat.isReact = true;
  Apiomat.Datastore = function() {
    var instantiated;
    var _isReact = true;
    var _password;
    var _username;
    var _baseURL;
    var _apiKey;
    var _system;
    var _version;
    var _useASync = true;
    var _offlineStrategy = Apiomat.AOMOfflineStrategy.NO_OFFLINE_HANDLING;
    var _offlineHandler = undefined;
    var _authType = Apiomat.AOMAuthType.GUEST;
    var _sessionToken;
    var _checkObjectState = undefined;
    var _idpHosts = [];
    var _useDeltaSync = false;
    var _offlineMapping = {};
    var _cacheStrategy = Apiomat.AOMCacheStrategy.NETWORK_ELSE_CACHE;
    var is_safari = Apiomat.AOMHelper.isSafari();
    var is_titanium = Apiomat.AOMHelper.isTitaniumApp();
    var is_nodejs = Apiomat.AOMHelper.isNodeJS();
    var is_ie = Apiomat.AOMHelper.detectIE();
    var lastModified = new Array;
    var eTag = Array();
    Apiomat.MemoryStorage.clearCollections();
    Apiomat.MemoryStorage.clearObjects();
    function positiveCallback(_callback, returnValue, meta) {
      var func;
      if(typeof _callback !== "undefined" && _callback != {}) {
        for(func in _callback) {
          var cbStatement = "onok";
          var onok = typeof _callback[func] == "function" && func.toString().toLowerCase() == cbStatement ? func.toString() : undefined;
          if(typeof onok != "undefined") {
            if(returnValue && typeof returnValue != "undefined" && returnValue !== null) {
              _callback[onok](returnValue, meta)
            }else {
              _callback[onok](undefined, meta)
            }
            break
          }
        }
      }
    }
    function secondPositiveCallback(_callback, returnValue, meta) {
      var func;
      if(typeof _callback !== "undefined" && _callback != {}) {
        for(func in _callback) {
          var cbStatement = "onsecondok";
          var onsecondok = typeof _callback[func] == "function" && func.toString().toLowerCase() == cbStatement ? func.toString() : undefined;
          if(typeof onsecondok != "undefined") {
            if(returnValue && typeof returnValue != "undefined") {
              _callback[onsecondok](returnValue, meta)
            }else {
              _callback[onsecondok]()
            }
            break
          }
        }
      }
    }
    function negativeCallback(_callback, returnValue, meta) {
      var func;
      if(typeof _callback !== "undefined" && _callback != {}) {
        for(func in _callback) {
          var cbStatement = "onerror";
          var onerror = typeof _callback[func] == "function" && func.toString().toLowerCase() == cbStatement ? func.toString() : undefined;
          if(typeof onerror != "undefined") {
            if(returnValue && typeof returnValue != "undefined") {
              _callback[onerror](returnValue)
            }else {
              _callback[onerror]()
            }
            break
          }
        }
      }
    }
    function configure(baseURL, apiKey, system, version, username, password, sessionToken) {
      _baseURL = baseURL;
      _apiKey = apiKey;
      _system = system;
      _version = version;
      _username = username;
      _password = password;
      _sessionToken = sessionToken;
      if(typeof _sessionToken !== "undefined") {
        _authType = Apiomat.AOMAuthType.OAUTH2_TOKEN
      }else {
        if(typeof _username !== "undefined" && typeof _password !== "undefined") {
          _authType = Apiomat.AOMAuthType.USERNAME_PASSWORD
        }else {
          _authType = Apiomat.AOMAuthType.GUEST
        }
      }
      _checkObjectState = true
    }
    function init() {
      return{getUsername:function() {
        return _username
      }, getPassword:function() {
        return _password
      }, getAuthType:function() {
        return _authType
      }, setUseAsyncRequests:function(_asyncReq) {
        _useASync = _asyncReq
      }, setUseDeltaSync:function(useDeltaSync) {
        _useDeltaSync = useDeltaSync
      }, getUseDeltaSync:function() {
        return _useDeltaSync
      }, setOfflineUsageForClass:function(clazz, usePersistentStorage) {
        _offlineMapping[clazz] = usePersistentStorage
      }, getOfflineUsageForClass:function(clazz) {
        var result = _offlineMapping[clazz];
        return result ? false : result
      }, loadFromServer:function(modelHref, callback, dataModel, withReferencedHrefs, _query, clazz, isCollection, usePersistentStorage) {
        var isReload = dataModel && modelHref === dataModel.getHref();
        _sendRequest("GET", modelHref, [200, 304], !dataModel ? callback : {onOk:function(obj, meta) {
          if(obj && meta && meta.status !== 304) {
            dataModel.fromJson(obj)
          }else {
            if(meta && meta.status === 304) {
              dataModel = dataModel
            }else {
              dataModel.fromJson(obj)
            }
          }
          Apiomat.Datastore.positiveCallback(callback, meta && meta.status == 304 ? dataModel : undefined, meta)
        }, onError:function(error, meta) {
          Apiomat.Datastore.negativeCallback(callback, error, meta)
        }, onSecondOk:function(obj, meta) {
          dataModel.fromJson(obj);
          Apiomat.Datastore.secondPositiveCallback(callback, meta)
        }}, clazz, {"isReload":isReload, "data":_query, "withReferencedHrefs":withReferencedHrefs}, isCollection, usePersistentStorage)
      }, getOrCreateUser:function(facebookToken, callback, usePersistentStorage) {
        var appName = Apiomat.User.AOMBASEURL.substring(Apiomat.User.AOMBASEURL.lastIndexOf("/") + 1);
        var url = _baseURL.substring(0, _baseURL.indexOf("yambas/rest") + 11) + "/modules/facebook/spec/" + appName + "/aomuser" + "?facebookToken\x3d" + facebookToken;
        _sendRequest("GET", url, [200], callback, undefined, undefined, usePersistentStorage)
      }, loginFacebook:function(facebookToken, callback, usePersistentStorage) {
        Apiomat.Datastore.getInstance().getOrCreateUser(facebookToken, callback, usePersistentStorage)
      }, setCheckObjectState:function(checkObjectState) {
        _checkObjectState = checkObjectState
      }, getCheckObjectState:function() {
        return _checkObjectState
      }, loadResource:function(_url, _callback, usePersistentStorage) {
        _sendRequest("GET", _url, [200, 206], _callback, undefined, {"isByteData":true}, usePersistentStorage)
      }, loadListFromServerWithClass:function(_class, _query, _callback, withReferencedHrefs, usePersistentStorage) {
        _sendRequest("GET", _createHrefFromClass(_class), [200, 304], _callback, _class, {"data":_query, "withReferencedHrefs":withReferencedHrefs}, true, usePersistentStorage)
      }, postOnServer:function(dataModel, callback, href, usePersistentStorage) {
        _postOnServer(dataModel, callback, href, usePersistentStorage)
      }, updateOnServer:function(dataModel, callback, usePersistentStorage) {
        _updateOnServer(dataModel.getHref(), dataModel.toJson(), callback, usePersistentStorage)
      }, updateOnServerWithJSON:function(href, json, callback, usePersistentStorage) {
        _updateOnServer(href, json, callback, usePersistentStorage)
      }, deleteOnServer:function(_href, _callback, usePersistentStorage) {
        _deleteOnServer(_href, undefined, _callback, usePersistentStorage)
      }, deleteModelOnServer:function(_dataModel, _callback, usePersistentStorage) {
        _deleteOnServer(undefined, _dataModel, _callback, usePersistentStorage)
      }, postStaticDataOnServer:function(_data, _isImage, _callback, usePersistentStorage) {
        var href = _createStaticDataHref(_isImage);
        this.postStaticDataOnServerWithHref(_data, href, _callback, usePersistentStorage)
      }, postStaticDataOnServerWithHref:function(_data, _href, _callback, usePersistentStorage) {
        _sendRequest("POST", _href, [201], _callback, undefined, {"isByteData":true, "data":_data}, usePersistentStorage)
      }, shouldSendOffline:function(_httpMethod) {
        var useOffline = _cacheStrategy !== Apiomat.AOMCacheStrategy.NETWORK_ONLY && this.getOfflineHandler() != undefined && this.getOfflineHandler().isConnected() === false;
        return useOffline
      }, getOfflineHandler:function() {
        return _offlineHandler
      }, getOfflineStrategy:function() {
        return _offlineStrategy
      }, syncCollection:function(origin, toAdd, toDel) {
        var ret = new Array;
        var tmp = new Array;
        var found = false;
        var a;
        var b;
        var k;
        var i;
        if(toDel) {
          for(a = 0;a < origin.length;a++) {
            found = false;
            for(b = 0;b < toDel.length;b++) {
              if(origin[a].getID() == toDel[b]) {
                found = true
              }
            }
            if(!found) {
              ret.push(origin[a])
            }
          }
        }else {
          ret = origin
        }
        for(k = 0;k < toAdd.length;k++) {
          found = false;
          for(i = 0;i < ret.length;i++) {
            if(ret[i].getID() === toAdd[k].getID()) {
              ret[i] = toAdd[k];
              found = true
            }
          }
          if(!found) {
            tmp.push(toAdd[k])
          }
        }
        var fin = ret.concat(tmp);
        return fin
      }, sendOffline:function(_httpMethod, _href, _content, _param, _callback) {
        var err = undefined;
        var isStaticData = false;
        if(!_href && _content instanceof Apiomat.AbstractClientDataModel) {
          _href = _createModelHref(_content)
        }else {
          if(!_href) {
            _href = _createStaticDataHref(_param);
            isStaticData = true
          }
        }
        var errorFunc = function(error) {
          if(typeof _callback !== "undefined") {
            if(_httpMethod === "POST") {
              error = new Apiomat.ApiomatRequestError(Apiomat.Status.CRUD_ERROR, 201, "Can't save offline")
            }
            Apiomat.Datastore.negativeCallback(_callback, error)
          }else {
            if(typeof console !== "undefined" && console.error) {
              console.error("Can't send request to offline queue: " + error)
            }
          }
        };
        var successFunc = function(returnedHref) {
          if(_httpMethod === "POST" && returnedHref) {
            Apiomat.Datastore.positiveCallback(_callback, returnedHref)
          }else {
            Apiomat.Datastore.positiveCallback(_callback)
          }
        };
        this.getOfflineHandler().addTask(_httpMethod, _href, _content, _param, successFunc, errorFunc)
      }, requestSessionToken:function(_callback, usePersistentStorage, access_expiration, refresh_expiration) {
        if(_authType !== Apiomat.AOMAuthType.USERNAME_PASSWORD) {
          var error = new Apiomat.ApiomatRequestError(Apiomat.Status.BAD_DATASTORE_CONFIG);
          if(typeof _callback !== "undefined") {
            Apiomat.Datastore.negativeCallback(_callback, error)
          }else {
            if(typeof console !== "undefined" && console.error) {
              console.error("Error occured: " + error)
            }
          }
        }else {
          var appName = _baseURL.substring(_baseURL.lastIndexOf("/") + 1);
          var params = {"grant_type":"aom_user", "client_id":appName, "client_secret":_apiKey, "scope":"read write", "username":_username, "password":_password, "app":appName, "system":_system};
          if(typeof access_expiration !== "undefined" && access_expiration !== "default") {
            params["access_expiration"] = access_expiration
          }
          if(typeof refresh_expiration !== "undefined" && refresh_expiration !== "default") {
            params["refresh_expiration"] = refresh_expiration
          }
          _requestSessionToken(params, _callback, usePersistentStorage)
        }
      }, requestSessionTokenWithRefreshToken:function(refreshToken, callback, usePersistentStorage, access_expiration, refresh_expiration) {
        var appName = _baseURL.substring(_baseURL.lastIndexOf("/") + 1);
        var params = {"grant_type":"refresh_token", "client_id":appName, "client_secret":_apiKey, "refresh_token":refreshToken};
        if(typeof access_expiration !== "undefined" && access_expiration !== "default") {
          params["access_expiration"] = access_expiration
        }
        if(typeof refresh_expiration !== "undefined" && refresh_expiration !== "default") {
          params["refresh_expiration"] = refresh_expiration
        }
        _requestSessionToken(params, callback, usePersistentStorage)
      }, loadCountFromServer:function(_classOrHref, _refName, _query, _callback, usePersistentStorage) {
        var url = undefined;
        if(typeof _classOrHref === "string" && typeof _refName !== "undefined") {
          url = _classOrHref + "/" + _refName
        }else {
          url = _createHrefFromClass(_classOrHref)
        }
        url += "/count";
        _sendRequest("GET", url, [200], {onOk:function(numStr) {
          Apiomat.Datastore.positiveCallback(_callback, Number(numStr))
        }, onError:function(error) {
          if(typeof _callback) {
            Apiomat.Datastore.negativeCallback(_callback, error)
          }
        }}, undefined, {"data":_query, "returnpost":true}, usePersistentStorage)
      }, setIdPHosts:function(idpHosts) {
        _setIdPHosts(idpHosts)
      }, getIdPHosts:function() {
        return _getIdPHosts()
      }, deleteCollectionFromStorage:function(withReferencedHrefs, classObject, query, _callback) {
        var errorOccured = false;
        try {
          collectionHref = _createModelHrefWithParams(classObject.prototype.getModuleName(), classObject.prototype.getSimpleName(), withReferencedHrefs, query);
          headerHook(collectionHref);
          Apiomat.MemoryStorage.removeCollection(collectionHref);
          Apiomat.AOMOfflineStorage.removeCollection(collectionHref);
          Apiomat.Datastore.positiveCallback(_callback)
        }catch(ex) {
          if(is_titanium) {
            Ti.API.log("Error occured: " + ex)
          }else {
            errorOccured = true
          }
        }finally {
          if(errorOccured) {
            var error = new Apiomat.ApiomatRequestError(Apiomat.status.MODEL_NOT_FOUND);
            if(typeof _callback !== "undefined") {
              Apiomat.Datastore.negativeCallback(_callback, error)
            }else {
              if(typeof console !== "undefined" && console.error) {
                console.error("Error occured: " + error)
              }
            }
          }
        }
      }, deleteObjectFromStorage:function(objectId, usePersistentStorage) {
        var storage = _chooseStorageImpl(usePersistentStorage);
        storage.removeObjectById(objectId)
      }, removeCollectionFromStorage:function(collectionHref, usePersistentStorage) {
        var storage = _chooseStorageImpl(usePersistentStorage);
        storage.removeObjectByHref(collectionHref)
      }, createHrefFromClass:function(_class) {
        return _createHrefFromClass(_class)
      }}
    }
    function _postOnServer(dataModel, callback, href, usePersistentStorage) {
      if(!href) {
        href = _createModelHref(dataModel)
      }
      _sendRequest("POST", href, [200, 201], callback, undefined, {"data":dataModel.toJson()}, undefined, usePersistentStorage)
    }
    function _updateOnServer(_href, _json, _callback, usePersistentStorage) {
      _sendRequest("PUT", _href, [200, 204], _callback, undefined, {"data":_json}, undefined, usePersistentStorage)
    }
    function _createModelHrefWithParams(moduleName, simpleModelName, withReferencedHrefs, query) {
      var sb = _baseURL + "/models/" + moduleName + "/" + simpleModelName;
      if(withReferencedHrefs) {
        sb += "?withReferencedHrefs\x3d" + withReferencedHrefs
      }
      if(query) {
        if(withReferencedHrefs) {
          sb += "\x26"
        }else {
          sb += "?"
        }
        sb += "q\x3d" + query
      }
      return sb
    }
    function _deleteOnServer(_href, _dataModel, _callback, usePersistentStorage) {
      if(_href) {
        _sendRequest("DELETE", _href, [204], _callback, undefined, undefined, usePersistentStorage)
      }else {
        if(_dataModel && _dataModel.getHref()) {
          _sendRequest("DELETE", _dataModel.getHref(), [204], _callback, undefined, undefined, usePersistentStorage)
        }else {
          var error = new Apiomat.ApiomatRequestError(Apiomat.Status.HREF_NOT_FOUND);
          if(_callback) {
            Apiomat.Datastore.negativeCallback(_callback, error)
          }else {
            if(console && console.error) {
              console.error("Error occured: " + error)
            }
          }
        }
      }
    }
    function _requestSessionToken(_params, _callback, usePersistentStorage) {
      var url = _baseURL.substring(0, _baseURL.indexOf("yambas") + 6) + "/oauth/token";
      var data = "";
      var prop;
      for(prop in _params) {
        if(data !== "") {
          data += "\x26"
        }
        data += prop + "\x3d" + _params[prop]
      }
      _sendRequest("POST", url, [200], {onOk:function(retData) {
        var result = {};
        var jsonRet = JSON.parse(retData) || {};
        result.sessionToken = jsonRet.access_token;
        result.refreshToken = jsonRet.refresh_token;
        var expirein = jsonRet.expires_in || 0;
        result.expirationDate = (new Date).getTime() + expirein * 1E3;
        result.module = jsonRet.aom_module;
        result.model = jsonRet.aom_model;
        Apiomat.Datastore.positiveCallback(_callback, result)
      }, onError:function(error) {
        var e = new Apiomat.ApiomatRequestError(error.statusCode, 200, "Requesting the session token failed");
        if(typeof _callback !== "undefined") {
          Apiomat.Datastore.negativeCallback(_callback, e)
        }else {
          if(console && console.error) {
            console.error("Error occured: " + e)
          }
        }
      }}, undefined, {"data":data, "returnpost":true, "headerDetails":{"authHeader":false, "contentType":"application/x-www-form-urlencoded"}}, usePersistentStorage)
    }
    function _sendRequest(_httpMethod, _url, _expectedReturnCodes, _callback, clazz, _args, isCollection, usePersistentStorage) {
      _args = _args || {};
      var data = _args.data || undefined;
      var withReferencedHrefs = _args.withReferencedHrefs || undefined;
      var isByteData = _args.isByteData || false;
      var returnpost = _args.returnpost || false;
      var headerDetails = _args.headerDetails || {};
      var isReload = _args.isReload;
      var http;
      if(is_titanium) {
        http = Ti.Network.createHTTPClient({onload:function(e) {
          _processResponse(this, _expectedReturnCodes, _callback, _httpMethod, clazz, returnpost, _url, usePersistentStorage)
        }, onerror:function(e) {
          var errorMsg = e.error || "";
          if(errorMsg.indexOf("connection failure") > -1) {
            var error = new Apiomat.ApiomatRequestError(Apiomat.Status.NO_NETWORK, _expectedReturnCodes, errorMsg);
            if(typeof _callback !== "undefined") {
              Apiomat.Datastore.negativeCallback(_callback, error)
            }else {
              Ti.API.error("Received HTTP error: " + error)
            }
          }else {
            if(_expectedReturnCodes.indexOf(this.status) > -1) {
              throw e;
            }else {
              var error = new Apiomat.ApiomatRequestError(this.status, _expectedReturnCodes, this.responseText);
              if(typeof _callback !== "undefined") {
                Apiomat.Datastore.negativeCallback(_callback, error)
              }else {
                Ti.API.error("Received HTTP error: " + error)
              }
            }
          }
        }});
        http.overrideMimeType = function() {
        }
      }else {
        if(typeof window === "object" && window.XMLHttpRequest || _isReact) {
          http = new XMLHttpRequest
        }else {
          if(is_nodejs) {
            http = new exports.XMLHttpRequest
          }else {
            http = new ActiveXObject("Microsoft.XMLHTTP")
          }
        }
      }
      if(_httpMethod === "GET" && data) {
        _url += "?q\x3d" + encodeURIComponent(data)
      }
      if(is_titanium == false && is_nodejs == false && is_safari == false) {
        var ieVersion = false;
        ieVersion = is_ie;
        if(_httpMethod === "GET" && ieVersion != false && ieVersion <= 10) {
          if(data) {
            _url += "\x26"
          }else {
            _url += "?"
          }
          _url += "dIE\x3d" + (new Date).getTime()
        }
      }
      if(_httpMethod === "GET" && typeof withReferencedHrefs != "undefined" && withReferencedHrefs == true) {
        if(data || ieVersion != false && ieVersion <= 10) {
          _url += "\x26"
        }else {
          _url += "?"
        }
        _url += "withReferencedHrefs\x3d" + withReferencedHrefs
      }
      _url = _createHref(_url);
      if(Apiomat.AOMNetworkHandler.isConnected() && _cacheStrategy !== Apiomat.AOMCacheStrategy.CACHE_ELSE_NETWORK && _cacheStrategy !== Apiomat.AOMCacheStrategy.CACHE_THEN_NETWORK || _httpMethod !== "GET") {
        http.open(_httpMethod, _url, _useASync);
        _setHeader(_url, _httpMethod, http, isByteData, headerDetails, isReload, isCollection, usePersistentStorage);
        if(isByteData && _httpMethod === "GET") {
          http.overrideMimeType("text/plain; charset\x3dx-user-defined")
        }
        if(is_titanium == false) {
          http.onreadystatechange = function() {
            if(http.readyState == 4) {
              _processResponse(http, _expectedReturnCodes, _callback, _httpMethod, clazz, returnpost, _url, usePersistentStorage)
            }
          }
        }
        if((_httpMethod === "POST" || _httpMethod === "PUT") && typeof data !== "undefined") {
          if(_args && _args.isByteData) {
            var bytes = data;
            if(is_titanium === false) {
              var uInt8Array = new Uint8Array(data);
              if("ArrayBufferView" in window) {
                bytes = uInt8Array
              }else {
                bytes = uInt8Array.buffer
              }
            }
            http.send(bytes)
          }else {
            http.send(data)
          }
        }else {
          http.send()
        }
      }else {
        if(_cacheStrategy !== Apiomat.AOMCacheStrategy.NETWORK_ONLY) {
          _processOfflineGet(_callback, clazz, _url, http, _httpMethod, isByteData, headerDetails, isCollection, _expectedReturnCodes, returnpost, usePersistentStorage)
        }else {
          var error = new Apiomat.ApiomatRequestError(Apiomat.Status.NO_NETWORK, _expectedReturnCodes);
          if(typeof _callback !== "undefined") {
            Apiomat.Datastore.negativeCallback(_callback, error)
          }else {
            if(typeof console !== "undefined" && console.error) {
              console.error("Error occured: " + error)
            }
          }
        }
      }
    }
    function _processResponse(http, _expectedReturnCodes, _callback, _httpMethod, clazz, returnpost, _url, usePersistentStorage) {
      var errorOccured = false;
      responseHook(http);
      processOfflineHook(false);
      try {
        var isSamlRedirect = false;
        var responseURL = http.responseURL;
        var contentType = http.getResponseHeader("Content-Type");
        var ssoURL = undefined;
        if(contentType && contentType.indexOf("text/html") > -1) {
          ssoURL = _isSSOHost(http);
          if(typeof ssoURL !== "undefined") {
            isSamlRedirect = true;
            var error = new Apiomat.ApiomatRequestError(Apiomat.Status.SSO_REDIRECT, _expectedReturnCodes, null);
            var ssoInfos = {};
            ssoInfos[Apiomat.SSO_REDIRECT_URL] = ssoURL;
            ssoInfos[Apiomat.SSO_REDIRECT_DATA] = http.responseText;
            error.setExtraInformations(ssoInfos);
            if(typeof _callback !== "undefined" && _callback.onError) {
              _callback.onError(error, {status:http.status})
            }
            return
          }
        }
        if(_expectedReturnCodes.indexOf(http.status) > -1) {
          if(_callback && _callback.hasOwnProperty("onOk")) {
            if((is_safari || is_ie) && _httpMethod === "GET") {
              lastModified[_url] = http.getResponseHeader("Last-Modified");
              if(is_ie) {
                eTag[_url] = http.getResponseHeader(Apiomat.HEADER.ETAG)
              }
            }
            var elem = http.responseText;
            if(_httpMethod === "GET" && elem.length > 0) {
              try {
                if(_cacheStrategy !== Apiomat.AOMCacheStrategy.NETWORK_ONLY) {
                  var storage = _chooseStorageImpl(usePersistentStorage);
                  storage.addOrUpdateCollection(responseURL ? responseURL : _url, JSON.parse(elem));
                  if(_useDeltaSync) {
                    var meta = {deletedItems:JSON.parse(http.getResponseHeader("X-apiomat-delta-deleted"))};
                    if(meta.deletedItems && meta.deletedItems.length > 0) {
                      var storage = _chooseStorageImpl(usePersistentStorage);
                      storage.removeObjectsOnDelta(_url, meta.deletedItems)
                    }
                  }
                }
              }catch(e) {
                var result = "";
                var byteArray = [];
                var i;
                var j;
                for(i = 0;i < elem.length;i++) {
                  byteArray.push(elem[i].charCodeAt(0) & 255)
                }
                for(j = 0;j < byteArray.length;j++) {
                  result += String.fromCharCode(byteArray[j])
                }
                var storage = _chooseStorageImpl(usePersistentStorage);
                storage.addOrUpdateCollection(responseURL ? responseURL : _url, result);
                if(_useDeltaSync) {
                  try {
                    var meta = {deletedItems:JSON.parse(http.getResponseHeader("X-apiomat-delta-deleted"))}
                  }catch(e) {
                    var meta = {deletedItems:undefined}
                  }
                  if(meta.deletedItems && meta.deletedItems.length > 0) {
                    var storage = _chooseStorageImpl(usePersistentStorage);
                    storage.removeObjectsOnDelta(_url, meta.deletedItems)
                  }
                }
              }
            }
            if(_httpMethod === "DELETE") {
              if(_cacheStrategy !== Apiomat.AOMCacheStrategy.NETWORK_ONLY) {
                _chooseStorageImpl(usePersistentStorage).removeObjectByHref(_url)
              }
            }
            var elem = http.responseText;
            if(_httpMethod === "GET" && typeof clazz !== "undefined") {
              var json = [];
              if(_useDeltaSync && _cacheStrategy !== Apiomat.AOMCacheStrategy.NETWORK_ONLY || _cacheStrategy === Apiomat.AOMCacheStrategy.NETWORK_ELSE_CACHE && http.status === 304) {
                json = _chooseStorageImpl(usePersistentStorage).getCollectionObjects(_url)
              }else {
                json = JSON.parse(elem)
              }
              if(json instanceof Array) {
                elem = [];
                var i;
                for(i = 0;i < json.length;i++) {
                  var tmpElem = new clazz;
                  tmpElem.fromJson(json[i]);
                  elem.push(tmpElem)
                }
              }else {
                elem = new clazz;
                elem.fromJson(json)
              }
            }
            var returnedHref = undefined;
            if(_httpMethod === "POST" && returnpost === false) {
              returnedHref = http.getResponseHeader("Location")
            }
            if(_httpMethod === "GET" && _cacheStrategy === Apiomat.AOMCacheStrategy.CACHE_THEN_NETWORK && _callback.hasOwnProperty("onSecondOk")) {
              Apiomat.Datastore.secondPositiveCallback(_callback, elem)
            }else {
              Apiomat.Datastore.positiveCallback(_callback, _httpMethod === "GET" || returnpost ? elem : returnedHref || undefined, meta, {status:http.status})
            }
          }
        }else {
          if(_httpMethod === "GET" && _cacheStrategy === Apiomat.AOMCacheStrategy.NETWORK_ELSE_CACHE) {
            if(typeof clazz !== "undefined") {
              var json = [];
              json = _chooseStorageImpl(usePersistentStorage).getCollectionObjects(_url);
              if(json instanceof Array) {
                elem = [];
                var i;
                for(i = 0;i < json.length;i++) {
                  var tmpElem = new clazz;
                  tmpElem.fromJson(json[i]);
                  elem.push(tmpElem)
                }
              }else {
                elem = new clazz;
                elem.fromJson(json)
              }
            }
            Apiomat.Datastore.positiveCallback(_callback, elem)
          }else {
            errorOccured = true
          }
        }
      }catch(ex) {
        if(is_titanium) {
          Ti.API.log("Error occured: " + ex)
        }
        if(http && _expectedReturnCodes.indexOf(http.status) > -1) {
          throw ex;
        }else {
          errorOccured = true
        }
      }finally {
        if(errorOccured) {
          console.log("Status: " + http.status);
          var error = new Apiomat.ApiomatRequestError(http.status, _expectedReturnCodes, http.responseText);
          if(typeof _callback !== "undefined") {
            Apiomat.Datastore.negativeCallback(_callback, error, {status:http.status})
          }else {
            if(typeof console !== "undefined" && console.error) {
              console.error("Error occured: " + error)
            }
          }
        }
      }
    }
    function _processOfflineGet(_callback, clazz, _url, http, _httpMethod, isByteData, headerDetails, isCollection, _expectedReturnCodes, returnpost, usePersistentStorage) {
      processOfflineHook(true);
      var errorOccured = false;
      var error;
      try {
        if(_callback && _callback.hasOwnProperty("onOk")) {
          var elem;
          var json = _chooseStorageImpl(usePersistentStorage).getCollectionObjects(_url);
          if(!json) {
            if(Apiomat.AOMNetworkHandler.isConnected() && _cacheStrategy === Apiomat.AOMCacheStrategy.CACHE_ELSE_NETWORK || _cacheStrategy === Apiomat.AOMCacheStrategy.CACHE_THEN_NETWORK) {
              if(_cacheStrategy === Apiomat.AOMCacheStrategy.CACHE_THEN_NETWORK) {
                Apiomat.Datastore.positiveCallback(_callback, [])
              }
              http.open(_httpMethod, _url, _useASync);
              _setHeader(_url, _httpMethod, http, isByteData, headerDetails, isCollection, usePersistentStorage);
              if(isByteData && _httpMethod === "GET") {
                http.overrideMimeType("text/plain; charset\x3dx-user-defined")
              }
              if(is_titanium == false) {
                http.onreadystatechange = function() {
                  if(http.readyState == 4) {
                    _processResponse(http, _expectedReturnCodes, _callback, _httpMethod, clazz, returnpost, _url, usePersistentStorage)
                  }
                }
              }
              http.send()
            }else {
              errorOccured = true;
              error = new Apiomat.ApiomatRequestError(Apiomat.Status.ID_NOT_FOUND_OFFLINE, 201, "No data found offline")
            }
          }else {
            if(json instanceof Array) {
              elem = [];
              var i;
              for(i = 0;i < json.length;i++) {
                var tmpElem = new clazz;
                tmpElem.fromJson(json[i]);
                elem.push(tmpElem)
              }
              Apiomat.Datastore.positiveCallback(_callback, elem);
              if(_cacheStrategy === Apiomat.AOMCacheStrategy.CACHE_THEN_NETWORK) {
                http.open(_httpMethod, _url, _useASync);
                _setHeader(_url, _httpMethod, http, isByteData, headerDetails, isCollection, usePersistentStorage);
                if(isByteData && _httpMethod === "GET") {
                  http.overrideMimeType("text/plain; charset\x3dx-user-defined")
                }
                if(is_titanium == false) {
                  http.onreadystatechange = function() {
                    if(http.readyState == 4) {
                      _processResponse(http, _expectedReturnCodes, _callback, _httpMethod, clazz, returnpost, _url, usePersistentStorage)
                    }
                  }
                }
                http.send()
              }
            }else {
              if(clazz) {
                elem = new clazz;
                elem.fromJson(json)
              }else {
                if(json instanceof Object) {
                  elem = JSON.stringify(json)
                }else {
                  elem = json
                }
              }
              Apiomat.Datastore.positiveCallback(_callback, elem);
              if(_cacheStrategy === Apiomat.AOMCacheStrategy.CACHE_THEN_NETWORK) {
                http.open(_httpMethod, _url, _useASync);
                _setHeader(_url, _httpMethod, http, isByteData, headerDetails, isCollection, usePersistentStorage);
                if(isByteData && _httpMethod === "GET") {
                  http.overrideMimeType("text/plain; charset\x3dx-user-defined")
                }
                if(is_titanium == false) {
                  http.onreadystatechange = function() {
                    if(http.readyState == 4) {
                      _processResponse(http, _expectedReturnCodes, _callback, _httpMethod, clazz, returnpost, _url, usePersistentStorage)
                    }
                  }
                }
                http.send()
              }
            }
          }
        }
      }catch(ex) {
        if(is_titanium) {
          Ti.API.log("Error occured: " + ex)
        }
        errorOccured = true
      }finally {
        if(errorOccured) {
          if(!error) {
            error = new Apiomat.ApiomatRequestError(Apiomat.Status.HREF_NOT_FOUND)
          }
          if(typeof _callback !== "undefined") {
            Apiomat.Datastore.negativeCallback(_callback, error)
          }else {
            if(typeof console !== "undefined" && console.error) {
              console.error("Error occured: " + error)
            }
          }
        }
      }
    }
    function _setHeader(_url, _httpMethod, http, _isByteData, headerDetails, isReload, isCollection, usePersistentStorage) {
      http.setRequestHeader("X-apiomat-system", _system);
      http.setRequestHeader("X-apiomat-apikey", _apiKey);
      if(headerDetails.contentType) {
        http.setRequestHeader("Content-Type", headerDetails.contentType)
      }else {
        if(typeof _isByteData !== "undefined" && _isByteData) {
          http.setRequestHeader("Content-Type", "application/octet-stream")
        }else {
          http.setRequestHeader("Content-Type", "application/json");
          http.setRequestHeader("Accept", "application/json")
        }
      }
      http.setRequestHeader("X-apiomat-fullupdate", "true");
      if(headerDetails.hasOwnProperty("authHeader") && headerDetails.authHeader == false) {
      }else {
        if(_authType === Apiomat.AOMAuthType.USERNAME_PASSWORD) {
          var creds = _username + ":" + _password;
          if(Apiomat.Datastore.isReact == false && is_nodejs) {
            try {
              //var buffer = require("buffer").Buffer;
              creds = (new buffer(creds)).toString("base64")
            }catch(e) {
              creds = Base64.Base64.encode(creds)
            }
          }else {
            try {
              creds = Base64.encode(creds)
            }catch(e) {
              creds = Base64.Base64.encode(creds)
            }
          }
          http.setRequestHeader("Authorization", "Basic " + creds)
        }else {
          if(_authType === Apiomat.AOMAuthType.OAUTH2_TOKEN) {
            http.setRequestHeader("Authorization", "Bearer " + _sessionToken)
          }
        }
      }
      http.setRequestHeader("X-apiomat-sdkVersion", _version);
      if((is_safari || is_titanium) && _httpMethod === "GET") {
        var lastModifiedStr = "01.01.1970 00:00:00:00 CEST";
        http.setRequestHeader("If-Modified-Since", lastModifiedStr)
      }else {
        if(is_ie && _httpMethod === "GET") {
          http.setRequestHeader(Apiomat.HEADER.MODIFIED_SINCE, "Wed, 02 Mar 1970 12:00:00 GMT");
          http.setRequestHeader(Apiomat.HEADER.EXPIRES, -1);
          http.setRequestHeader(Apiomat.HEADER.CACHE_CONTROL, "must-revalidate, private");
          if(isReload) {
            if(eTag[_url]) {
              http.setRequestHeader("If-None-Match", eTag[_url])
            }
            if(lastModified[_url] !== null) {
              http.setRequestHeader(Apiomat.HEADER.LAST_MODIFIED, lastModified[_url])
            }
          }
        }
      }
      if(isCollection && _httpMethod == "GET" && _useDeltaSync && _cacheStrategy !== Apiomat.AOMCacheStrategy.NETWORK_ONLY) {
        var storage = _chooseStorageImpl(usePersistentStorage);
        var idArray = storage.getCollection(_url);
        if(idArray) {
          var objectArray = new Array;
          for(i = 0;i < idArray.length;i++) {
            var object = storage.getObject(idArray[i]);
            if(object) {
              objectArray.push(object)
            }
          }
          http.setRequestHeader("X-apiomat-delta", _jsonCollection(objectArray));
          headerHook(objectArray)
        }else {
          http.setRequestHeader("X-apiomat-delta", "{}")
        }
      }
    }
    function _createModelHref(_dataModel) {
      var href = _baseURL;
      href += "/models/";
      href += _dataModel.getModuleName();
      href += "/";
      href += _dataModel.getSimpleName();
      return href
    }
    function _createHrefFromClass(_class) {
      var href = _baseURL;
      href += "/models/";
      href += _class.prototype.getModuleName.call();
      href += "/";
      href += _class.prototype.getSimpleName.call();
      return href
    }
    function _createStaticDataHref(isImage) {
      var href = _baseURL;
      href += "/data/";
      href += isImage ? "images" : "files";
      href += "/";
      return href
    }
    function _createHref(href) {
      if(href.substring(0, 4) === "http") {
        return href
      }
      if(href.substring(0, 5) === "/apps") {
        return _baseURL.substring(0, _baseURL.indexOf("/apps")) + href
      }
      return _baseURL + "/" + href
    }
    function _isSSOHost(http) {
      var ssoURL = undefined;
      var content = http.responseText;
      var regex = /<form.+method.?=.?"POST".+?action=.?"(.*?)".*?>/g;
      var matches;
      while(match = regex.exec(content)) {
        var i;
        for(i in _idpHosts) {
          if(match[1].indexOf(_idpHosts[i]) > -1) {
            ssoURL = match[1];
            break
          }
        }
      }
      return ssoURL
    }
    function _setIdPHosts(idpHosts) {
      _idpHosts = idpHosts
    }
    function _getIdPHosts() {
      return _idpHosts
    }
    function _jsonCollection(_collection) {
      var collectionJson = "{";
      for(i = 0;i < _collection.length;i++) {
        if(i > 0) {
          collectionJson = collectionJson.concat(", ")
        }
        collectionJson = collectionJson.concat("'" + _collection[i].id + "' : '" + _collection[i].lastModifiedAt + "'")
      }
      collectionJson = collectionJson.concat("}");
      return collectionJson
    }
    function _chooseStorageImpl(usePersistentStorage) {
      if(usePersistentStorage && !_offlineHandler) {
        if(!_cacheStrategy) {
          throw"No cachingStrategy is set. Please set the strategy in the Datastore with setCachingStrategy(cacheStrategy, callback)";
        }else {
          if(!_offlineHandler && _cacheStrategy !== Apiomat.AOMCacheStrategy.NETWORK_ONLY) {
            _offlineHandler = new Apiomat.AOMOfflineHandler
          }
          if(typeof _offlineHandler !== "undefined") {
            _offlineHandler.init(undefined, undefined)
          }
        }
      }
      if(usePersistentStorage) {
        return Apiomat.AOMOfflineStorage
      }else {
        return Apiomat.MemoryStorage
      }
    }
    return{getInstance:function() {
      if(!instantiated) {
        instantiated = init()
      }
      return instantiated
    }, isInstantiated:function() {
      return typeof instantiated !== "undefined" && instantiated
    }, positiveCallback:function(_callback, returnValue, meta) {
      if(!_callback) {
        console.log("Positive callback: callback not defined")
      }
      positiveCallback(_callback, returnValue, meta)
    }, secondPositiveCallback:function(_callback, returnValue, meta) {
      if(!_callback) {
        console.log("Second positive callback: callback not defined")
      }
      secondPositiveCallback(_callback, returnValue, meta)
    }, negativeCallback:function(_callback, returnValue, meta) {
      negativeCallback(_callback, returnValue, meta)
    }, configure:function(user) {
      this.configureWithCredentials(user)
    }, configureWithCredentials:function(user) {
      configure(Apiomat.User.AOMBASEURL, Apiomat.User.AOMAPIKEY, Apiomat.User.AOMSYS, Apiomat.User.AOMSDKVERSION, user.getUserName(), user.getPassword())
    }, configureAsGuest:function(baseURL, apiKey, system, version) {
      configure(baseURL, apiKey, system, version)
    }, configureWithUserSessionToken:function(user) {
      this.configureWithSessionToken(user.getSessionToken())
    }, configureWithSessionToken:function(sessionToken) {
      configure(Apiomat.User.AOMBASEURL, Apiomat.User.AOMAPIKEY, Apiomat.User.AOMSYS, Apiomat.User.AOMSDKVERSION, undefined, undefined, sessionToken)
    }, configurePlain:function(baseURL, apiKey, system, version) {
      this.configureAsGuest(baseURL, apiKey, system, version)
    }, setOfflineStrategy:function(offlineStrategy, _callback) {
      _offlineStrategy = offlineStrategy;
      if(!_offlineHandler && _offlineStrategy != Apiomat.AOMOfflineStrategy.NO_OFFLINE_HANDLING) {
        _offlineHandler = new Apiomat.AOMOfflineHandler
      }
      if(typeof _offlineHandler !== "undefined") {
        if(typeof _callback !== "undefined") {
          _offlineHandler.init(_callback.onOk || undefined, _callback.onError || undefined)
        }else {
          _offlineHandler.init(undefined, undefined)
        }
      }
    }, getCachingStrategy:function() {
      return _cacheStrategy
    }, setCachingStrategy:function(cacheStrategy, _callback) {
      if(!this) {
        throw"The datastore hasn't been configured yet - call Datastore.configure(...) before sending requests.";
      }
      _cacheStrategy = cacheStrategy;
      if(!_offlineHandler && _cacheStrategy !== Apiomat.AOMCacheStrategy.NETWORK_ONLY) {
        _offlineHandler = new Apiomat.AOMOfflineHandler
      }
      if(typeof _offlineHandler !== "undefined") {
        if(typeof _callback !== "undefined") {
          _offlineHandler.init(_callback.onOk || undefined, _callback.onError || undefined)
        }else {
          _offlineHandler.init(undefined, undefined)
        }
      }
    }, setUseDeltaSync:function(useDeltaSync) {
      console.log(67);
      _useDeltaSync = useDeltaSync;
      Apiomat.MemoryStorage.setUseDeltaSync(useDeltaSync);
      Apiomat.AOMOfflineStorage.setUseDeltaSync(useDeltaSync)
    }}
  }()
})(typeof exports === "undefined" ? Apiomat : exports);
if(typeof goog !== "undefined") {
  Apiomat.AOMOfflineInfo = {};
  Apiomat.AOMOfflineHandler = {}
}
if(typeof exports === "undefined") {
  var Apiomat = Apiomat || {}
}
(function(Apiomat) {
  Apiomat.AOMOfflineInfo = function(_httpMethod, _url, _fileKey, _class, _localId, _refName, _isStaticData) {
    this.httpMethod = _httpMethod;
    this.fileKey = _fileKey;
    this.timestamp = _class;
    this.url = _url;
    this.clazz = _class;
    this.localId = _localId;
    this.refName = _refName;
    this.isStaticData = _isStaticData
  };
  Apiomat.AOMOfflineHandler = function() {
    Apiomat.AOMOfflineHandler.AOMTASKEVENT = "AomTaskEvent";
    var tasks = [];
    var mapIdToHref = {};
    var mapIdToObj = {};
    var usedLocalIDs = [];
    var isWorking = false;
    var fileHandler = new Apiomat.AOMFileHandler;
    if(Apiomat.AOMHelper.isTitaniumApp()) {
      fileHandler = new Apiomat.AOMFileHandlerTi
    }
    Apiomat.AOMHelper.addEventListener(Apiomat.AOMNetworkHandler.AOMNETWORKEVENT, function(e) {
      sendTasks()
    });
    var restoreDataFromCache = function(fileName, list, _successCB, _errorCB) {
      fileHandler.readFile(fileName, function(content) {
        if(content) {
          list = JSON.parse(content)
        }
        if(_successCB) {
          _successCB()
        }
      }, function(evt) {
        console.error("Error on restoring content of " + fileName + " --\x3e " + evt.code);
        if(_errorCB) {
          _errorCB(evt)
        }
      })
    };
    var sendTasks = function() {
      if(tasks.length < 1) {
        mapIdToHref = {};
        writeHrefMapToCache();
        return
      }else {
        if(Apiomat.AOMNetworkHandler.isConnected() === false) {
          return
        }
      }
      var task = tasks.shift();
      delete usedLocalIDs[task.localId];
      updateCache();
      var errorHandler = function(error) {
        console.error("Error occured on reading file " + error)
      };
      fileHandler.readFile(task.fileKey, function(content) {
        fileHandler.removeFile(task.fileKey);
        if(content && task.isStaticData === false) {
          var tmpModel = new task.clazz;
          tmpModel.fromJson(content);
          content = tmpModel
        }
        if(content || task.isStaticData && task.url) {
          sendRequestToServer(task, content, task.isStaticData, true)
        }
      }, errorHandler)
    };
    var internalCallback = {extCallback:undefined, onOk:function(_returnedVar) {
      if(internalCallback.extCallback && internalCallback.extCallback.onOk) {
        internalCallback.extCallback.onOk(_returnedVar)
      }
      sendTasks()
    }, onError:function(error) {
      if(internalCallback.extCallback && internalCallback.extCallback.onError) {
        internalCallback.extCallback.onError(error)
      }
      sendTasks()
    }};
    var sendRequestToServer = function(_task, _content, _isStaticReq) {
      var url = _task.url;
      var isRef = _task.refName != undefined && _task.refName.length > 0;
      var isSending = true;
      switch(_task.httpMethod) {
        case "POST":
          if(isRef && _isStaticReq === false) {
            var parentID = url.substring(url.lastIndexOf("/") + 1);
            getHref(_content);
            url = mapIdToHref[parentID] + "/" + _task.refName
          }
          internalCallback.extCallback = {onOk:function(href) {
            if(href != null && href.length > 0) {
              mapIdToHref[_task.localId] = href;
              writeHrefMapToCache();
              if(_isStaticReq === false) {
                updateRealModel(_task.localId, href)
              }
              Apiomat.AOMHelper.sendEvent(Apiomat.AOMOfflineHandler.AOMTASKEVENT, {"wasSuccess":true, "info":_task, "href":href})
            }
            isSending = false
          }, onError:function(error) {
            Apiomat.AOMHelper.sendEvent(Apiomat.AOMOfflineHandler.AOMTASKEVENT, {"wasSuccess":false, "reason":error, "info":_task, "href":href});
            isSending = false
          }};
          if(url) {
            if(_isStaticReq) {
              Apiomat.Datastore.getInstance().postStaticDataOnServerWithHref(_content, url, internalCallback, true)
            }else {
              Apiomat.Datastore.getInstance().postOnServer(_content, internalCallback, url, true)
            }
          }else {
            Apiomat.AOMHelper.sendEvent(Apiomat.AOMOfflineHandler.AOMTASKEVENT, {"wasSuccess":false, "reason":error, "info":_task, "href":href})
          }
          break;
        case "PUT":
          var href = getHref(_content);
          if(href !== undefined && href.length > 0) {
            internalCallback.extCallback = {onOk:function() {
              Apiomat.AOMHelper.sendEvent(Apiomat.AOMOfflineHandler.AOMTASKEVENT, {"wasSuccess":true, "info":_task});
              isSending = false
            }, onError:function(error) {
              Apiomat.AOMHelper.sendEvent(Apiomat.AOMOfflineHandler.AOMTASKEVENT, {"wasSuccess":false, "reason":error, "info":_task});
              isSending = false
            }};
            Apiomat.Datastore.getInstance().updateOnServer(_content, internalCallback, true)
          }else {
            Apiomat.AOMHelper.sendEvent(Apiomat.AOMOfflineHandler.AOMTASKEVENT, {"wasSuccess":false, "reason":Apiomat.Status.HREF_NOT_FOUND, "info":_task})
          }
          break;
        case "DELETE":
          var href = undefined;
          if(_isStaticReq) {
            href = getHrefForLocalHref(url)
          }else {
            href = getHref(_content)
          }
          if(isRef) {
            var parentID = url.substring(url.lastIndexOf("/") + 1);
            href = mapIdToHref[parentID] + "/" + _task.refName + "/" + href.substring(href.lastIndexOf("/") + 1)
          }
          if(href && href.length > 0) {
            internalCallback.extCallback = {onOk:function() {
              Apiomat.AOMHelper.sendEvent(Apiomat.AOMOfflineHandler.AOMTASKEVENT, {"wasSuccess":true, "info":_task});
              isSending = false
            }, onError:function(error) {
              Apiomat.AOMHelper.sendEvent(Apiomat.AOMOfflineHandler.AOMTASKEVENT, {"wasSuccess":false, "reason":error, "info":_task});
              isSending = false
            }};
            if(isRef || _isStaticReq) {
              Apiomat.Datastore.getInstance().deleteOnServer(href, true, internalCallback)
            }else {
              Apiomat.Datastore.getInstance().deleteModelOnServer(_content, true, internalCallback)
            }
          }else {
            Apiomat.sendEvent(Apiomat.AOMOfflineHandler.AOMTASKEVENT, {"wasSuccess":false, "reason":Apiomat.Status.HREF_NOT_FOUND, "info":_task})
          }
          break
      }
    };
    var createNewLocalId = function() {
      var trials = 0;
      var localID = Math.floor(Math.random() * 1E6 + 1);
      while(usedLocalIDs[localID] && trials < 5) {
        trials++;
        localID = Math.floor(Math.random() * 1E6 + 1)
      }
      if(trials >= 4) {
        throw new Apiomat.ApiomatRequestError(Apiomat.Status.TOO_MANY_LOCALIDS);
      }
      return localID
    };
    var getHref = function(_model) {
      var href = _model.getHref();
      if(_model.isOffline()) {
        var id = _model.getID();
        if(id !== undefined && id.length > 0) {
          var tmpHref = mapIdToHref[id];
          if(tmpHref) {
            href = tmpHref;
            _model.data.href = href
          }
        }
        for(var dataKey in _model.data) {
          if(dataKey.endsWith("URL")) {
            var realHref = getHrefForLocalHref(_model.data[dataKey]);
            if(realHref) {
              _model.data[dataKey] = realHref
            }
          }
        }
      }
      return href
    };
    var getHrefForLocalHref = function(_localHref) {
      var id = _localHref.substring(_localHref.lastIndexOf("/") + 1);
      return mapIdToHref[id]
    };
    var writeHrefMapToCache = function() {
      return fileHandler.writeFile(Apiomat.AOMFileHandler.HREFMAP_FILENAME, JSON.stringify(mapIdToHref))
    };
    var updateCache = function() {
      fileHandler.writeFile(Apiomat.AOMFileHandler.USEDLOCALIDS_FILENAME, JSON.stringify(usedLocalIDs));
      fileHandler.writeFile(Apiomat.AOMFileHandler.TASKLIST_FILENAME, JSON.stringify(tasks))
    };
    var updateRealModel = function(_localId, _href) {
      model = mapIdToObj[_localId];
      if(model && model.isOffline()) {
        delete mapIdToObj[_localId];
        model.data.href = _href;
        model.setOffline(false)
      }
    };
    var persistObject = function(_content, _prefix, _successCB, _errorCB) {
      var hasDone = false;
      var fileKey = undefined;
      var sizeCB = function(sizeInBytes) {
        if(sizeInBytes && sizeInBytes >= this.cacheSizeInMB * 1024) {
          console.error("Max cache size is reached. Can't add to cache!");
          if(_errorCB) {
            _errorCB(new Apiomat.ApiomatRequestError(Apiomat.Status.MAX_CACHE_SIZE_REACHED))
          }
          return
        }
        fileKey = fileHandler.createFileName(_prefix);
        fileHandler.writeFile(fileKey, _content || "", function() {
          if(_successCB) {
            _successCB(fileKey)
          }
        }, function(evt) {
          console.error("Can't persist to cache: " + evt.code);
          if(_errorCB) {
            _errorCB(new Apiomat.ApiomatRequestError(Apiomat.Status.CANT_WRITE_IN_CACHE))
          }
        })
      };
      fileHandler.getSizeOfAppDir(sizeCB)
    };
    this.cacheSizeInMB = 4;
    this.addTask = function(_httpMethod, _url, _content, _refName, _successCB, _errorCB) {
      var returnedUri = _url;
      var isStaticData = _content instanceof Apiomat.AbstractClientDataModel === false;
      var content = _content;
      if(isStaticData === false) {
        content = _content.toJson()
      }
      var localId = undefined;
      if(_httpMethod === "POST") {
        try {
          localId = createNewLocalId()
        }catch(error) {
          throw error;
        }
        if(returnedUri.indexOf("/", this.length - 1) === -1) {
          returnedUri += "/"
        }
        returnedUri += (_refName ? _refName + "/" : "") + localId;
        if(isStaticData === false) {
          mapIdToObj[localId] = _content
        }
      }
      persistObject(content, localId || _httpMethod, function(fileKey) {
        if(fileKey) {
          var task = new Apiomat.AOMOfflineInfo(_httpMethod, _url, fileKey, _content ? _content.constructor : undefined, localId, _refName, isStaticData);
          tasks.push(task);
          updateCache()
        }
        if(_successCB) {
          _successCB(returnedUri)
        }
      }, function(error) {
        console.error("Got error on adding task to offline queue: " + error);
        if(_errorCB) {
          _errorCB(error)
        }
      })
    };
    this.init = function(_successCB, _errorCB) {
      var initUsedLocalIds = function() {
        restoreDataFromCache(Apiomat.AOMFileHandler.USEDLOCALIDS_FILENAME, usedLocalIDs, function() {
          sendTasks();
          if(typeof _successCB !== "undefined") {
            _successCB()
          }
        }, function(error) {
          if(typeof _errorCB !== "undefined") {
            _errorCB(error)
          }
        })
      };
      var initMapIdToHref = function() {
        restoreDataFromCache(Apiomat.AOMFileHandler.HREFMAP_FILENAME, mapIdToHref, function() {
          initUsedLocalIds()
        }, function(error) {
          initUsedLocalIds()
        })
      };
      restoreDataFromCache(Apiomat.AOMFileHandler.TASKLIST_FILENAME, tasks, function() {
        initMapIdToHref()
      }, function(error) {
        initMapIdToHref()
      })
    };
    this.isConnected = function() {
      return Apiomat.AOMNetworkHandler.isConnected()
    };
    this.clearCache = function() {
      mapIdToHref = {};
      writeHrefMapToCache();
      for(var i = 0, j = tasks.length;i < j;i++) {
        var task = tasks[i];
        if(task.fileKey) {
          fileHandler.removeFile(task.fileKey)
        }
      }
      mapIdToObj = {};
      tasks = [];
      updateCache()
    }
  }
})(typeof exports === "undefined" ? Apiomat : exports);
if(typeof goog !== "undefined") {
  Apiomat.AbstractClientDataModel = {}
}
if(typeof exports === "undefined") {
  var Apiomat = Apiomat || {}
}
(function(Apiomat) {
  Apiomat.ObjectState = {TRANSIENT:"TRANSIENT", DELETING:"DELETING", DELETED:"DELETED", PERSISTING:"PERSISTING", PERSISTED:"PERSISTED", LOCAL_PERSISTED:"LOCAL_PERSISTED", LOCAL_DELETED:"LOCAL_DELETED"};
  Apiomat.AbstractClientDataModel = function() {
    this.data = {};
    this.toJson = function() {
      if(this.getHref()) {
        this.data["id"] = this.getID()
      }
      this.data["@type"] = this.getType();
      var jsonRet = JSON.stringify(this.data);
      delete this.data["id"];
      return jsonRet
    };
    this.fromJson = function(json) {
      if(typeof json === "object") {
        for(var key in json) {
          this.data[key] = json[key]
        }
      }else {
        this.data = JSON.parse(json)
      }
      this.setCurrentState(Apiomat.ObjectState.PERSISTED);
      return this
    };
    this.getCurrentState = function() {
      return this.currentState
    };
    this.setCurrentState = function(currentState) {
      this.currentState = currentState
    }
  };
  Apiomat.AbstractClientDataModel.prototype = {getModuleName:function() {
    throw new Apiomat.ApiomatRequestError(undefined, undefined, "Must be implemented by child");
  }, getSimpleName:function() {
    throw new Apiomat.ApiomatRequestError(undefined, undefined, "Must be implemented by child");
  }, getType:function() {
    return this.getModuleName() + "$" + this.getSimpleName()
  }, getHref:function() {
    return this.data.href
  }, getRefModelHrefs:function() {
    return this.data.referencedHrefs
  }, getRefModelHrefsForName:function(name) {
    var referencedHrefs = this.getRefModelHrefs();
    if(referencedHrefs.hasOwnProperty(name) || name in referencedHrefs) {
      return referencedHrefs[name]
    }else {
      return null
    }
  }, getAllowedRolesGrant:function() {
    return this.data.allowedRolesGrant
  }, setAllowedRolesGrant:function(_allowedRolesGrant) {
    this.data.allowedRolesGrant = _allowedRolesGrant
  }, getAllowedRolesWrite:function() {
    return this.data.allowedRolesWrite
  }, setAllowedRolesWrite:function(_allowedRolesWrite) {
    this.data.allowedRolesWrite = _allowedRolesWrite
  }, getAllowedRolesRead:function() {
    return this.data.allowedRolesRead
  }, setAllowedRolesRead:function(_allowedRolesRead) {
    this.data.allowedRolesRead = _allowedRolesRead
  }, getRstrictResourceAccess:function() {
    return this.data.restrictResourceAccess
  }, setRestrictResourceAccess:function(_restrictResourceAccess) {
    this.data.restrictResourceAccess = _restrictResourceAccess
  }, getForeignId:function() {
    return this.data.foreignId
  }, setForeignId:function(_foreignId) {
    this.data.foreignId = _foreignId
  }, getCreatedAt:function() {
    return new Date(this.data.createdAt)
  }, getLastModifiedAt:function() {
    return new Date(this.data.lastModifiedAt)
  }, getAppName:function() {
    return this.data.applicationName
  }, load:function(callback, usePersistentStorage) {
    this.loadWithHref(undefined, callback, usePersistentStorage)
  }, loadAndRefHref:function(callback, usePersistentStorage) {
    this.loadWithHrefAndRefHref(undefined, callback, usePersistentStorage)
  }, loadWithHref:function(href, callback, usePersistentStorage) {
    var illegalState = this.isIllegalState();
    if(illegalState) {
      var error = "Object is in persisting or deleting process. Please try again later";
      if(this.getCurrentState() == Apiomat.ObjectState.PERSISTING) {
        error = new Apiomat.ApiomatRequestError(Apiomat.Status.IN_PERSISTING_PROCESS, 201, "Object is in persisting process. Please try again later")
      }else {
        if(this.getCurrentState() == Apiomat.ObjectState.DELETING) {
          error = new Apiomat.ApiomatRequestError(Apiomat.Status.IN_DELETING_PROCESS, 201, "Object is in deleting process. Please try again later")
        }
      }
      Apiomat.Datastore.negativeCallback(callback, error)
    }else {
      Apiomat.Datastore.getInstance().loadFromServer(href || this.getHref(), callback, this, false, undefined, undefined, undefined, usePersistentStorage)
    }
  }, loadWithHrefAndRefHref:function(href, callback, usePersistentStorage) {
    var illegalState = this.isIllegalState();
    if(illegalState) {
      var error = "Object is in persisting or deleting process. Please try again later";
      if(this.getCurrentState() == Apiomat.ObjectState.PERSISTING) {
        error = new Apiomat.ApiomatRequestError(Apiomat.Status.IN_PERSISTING_PROCESS, 201, "Object is in persisting process. Please try again later")
      }else {
        if(this.getCurrentState() == Apiomat.ObjectState.DELETING) {
          error = new Apiomat.ApiomatRequestError(Apiomat.Status.IN_DELETING_PROCESS, 201, "Object is in deleting process. Please try again later")
        }
      }
      Apiomat.Datastore.negativeCallback(callback, error)
    }else {
      Apiomat.Datastore.getInstance().loadFromServer(href || this.getHref(), callback, this, true, undefined, undefined, false, usePersistentStorage)
    }
  }, save:function(_callback, loadAfterwards, usePersistentStorage) {
    var illegalState = this.isIllegalState();
    if(illegalState) {
      var error = "Object is in persisting or deleting process. Please try again later";
      if(this.getCurrentState() == Apiomat.ObjectState.PERSISTING) {
        error = new Apiomat.ApiomatRequestError(Apiomat.Status.IN_PERSISTING_PROCESS, 201, "Object is in persisting process. Please try again later")
      }else {
        if(this.getCurrentState() == Apiomat.ObjectState.DELETING) {
          error = new Apiomat.ApiomatRequestError(Apiomat.Status.IN_DELETING_PROCESS, 201, "Object is in deleting process. Please try again later")
        }
      }
      Apiomat.Datastore.negativeCallback(_callback, error)
    }else {
      this.setCurrentState(Apiomat.ObjectState.PERSISTING);
      loadAfterwards = typeof loadAfterwards !== "undefined" && loadAfterwards.constructor === Boolean ? loadAfterwards : true;
      var internCallback = {onOk:function(href) {
        if(!this.parent.getHref() && href) {
          this.parent.data.href = href
        }
        this.parent.setOffline(this.wasLocalSave || false);
        if(!this.wasLocalSave && loadAfterwards) {
          this.parent.setCurrentState(Apiomat.ObjectState.PERSISTED);
          this.parent.load({onOk:function() {
            Apiomat.Datastore.positiveCallback(_callback)
          }, onError:function(error) {
            Apiomat.Datastore.negativeCallback(_callback, error)
          }, onSecondOk:function() {
            Apiomat.Datastore.secondPositiveCallback(_callback)
          }}, usePersistentStorage)
        }else {
          this.parent.setCurrentState(Apiomat.ObjectState.LOCAL_PERSISTED);
          Apiomat.Datastore.positiveCallback(_callback)
        }
      }, onError:function(error) {
        this.parent.setCurrentState(Apiomat.ObjectState.TRANSIENT);
        Apiomat.Datastore.negativeCallback(_callback, error)
      }, onSecondOk:function() {
      }};
      internCallback.parent = this;
      if(!this.getHref()) {
        if(Apiomat.Datastore.getInstance().shouldSendOffline("POST")) {
          internCallback.wasLocalSave = true;
          Apiomat.Datastore.getInstance().sendOffline("POST", undefined, this, undefined, internCallback)
        }else {
          Apiomat.Datastore.getInstance().postOnServer(this, internCallback, undefined, usePersistentStorage)
        }
      }else {
        if(Apiomat.Datastore.getInstance().shouldSendOffline("PUT")) {
          internCallback.wasLocalSave = true;
          Apiomat.Datastore.getInstance().sendOffline("PUT", this.getHref(), this, undefined, internCallback)
        }else {
          Apiomat.Datastore.getInstance().updateOnServer(this, internCallback, usePersistentStorage)
        }
      }
    }
  }, deleteModel:function(_callback, usePersistentStorage) {
    var illegalState = this.isIllegalState();
    if(illegalState) {
      var error = "Object is in persisting or deleting process. Please try again later";
      if(this.getCurrentState() == Apiomat.ObjectState.PERSISTING) {
        error = new Apiomat.ApiomatRequestError(Apiomat.Status.IN_PERSISTING_PROCESS, 201, "Object is in persisting process. Please try again later")
      }else {
        if(this.getCurrentState() == Apiomat.ObjectState.DELETING) {
          error = new Apiomat.ApiomatRequestError(Apiomat.Status.IN_DELETING_PROCESS, 201, "Object is in deleting process. Please try again later")
        }
      }
      Apiomat.Datastore.negativeCallback(_callback, error)
    }else {
      this.setCurrentState(Apiomat.ObjectState.DELETING);
      var internCallback = {onOk:function(obj) {
        this.parent.setCurrentState(this.finishedState);
        if(typeof obj != "undefined") {
          Apiomat.Datastore.positiveCallback(_callback, obj)
        }else {
          Apiomat.Datastore.positiveCallback(_callback)
        }
      }, onError:function(error) {
        this.parent.setCurrentState(Apiomat.ObjectState.TRANSIENT);
        Apiomat.Datastore.negativeCallback(_callback, error)
      }};
      internCallback.parent = this;
      if(Apiomat.Datastore.getInstance().shouldSendOffline("DELETE")) {
        internCallback.finishedState = Apiomat.ObjectState.LOCAL_DELETED;
        Apiomat.Datastore.getInstance().sendOffline("DELETE", this.getHref(), this, undefined, internCallback)
      }else {
        internCallback.finishedState = Apiomat.ObjectState.DELETED;
        Apiomat.Datastore.getInstance().deleteModelOnServer(this, internCallback, usePersistentStorage)
      }
    }
  }, isOffline:function() {
    return this.data.isOffline || false
  }, setOffline:function(_offline) {
    this.data.isOffline = _offline
  }, getID:function() {
    var id = this.getHref().substring(this.getHref().lastIndexOf("/") + 1);
    return id
  }, getAllObjectStates:function() {
    return this.ObjectState
  }, isIllegalState:function() {
    var result = false;
    if(Apiomat.Datastore.getInstance().getCheckObjectState()) {
      result = this.getCurrentState() == Apiomat.ObjectState.PERSISTING || this.getCurrentState() == Apiomat.ObjectState.DELETING
    }
    return result
  }}
})(typeof exports === "undefined" ? Apiomat : exports);
if(typeof goog !== "undefined") {
  Apiomat.AMAGUser = {}
}
if(typeof exports === "undefined") {
  var Apiomat = Apiomat || {}
}
(function(Apiomat) {
  Apiomat.AMAGUser = function() {
    this.init()
  };
  Apiomat.AMAGUser.getAMAGUsers = function(query, callback, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.AMAGUser, query, callback, false, usePersistentStorage)
  };
  Apiomat.AMAGUser.getAMAGUsersAndRefHref = function(query, callback, withReferencedHrefs, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.AMAGUser, query, callback, withReferencedHrefs, usePersistentStorage)
  };
  Apiomat.AMAGUser.getAMAGUsersCount = function(query, callback, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadCountFromServer(Apiomat.AMAGUser, undefined, query, callback, usePersistentStorage)
  };
  Apiomat.AMAGUser.deleteAllFromStorage = function(query, callback) {
    Apiomat.Datastore.getInstance().deleteCollectionFromStorage(false, Apiomat.AMAGUser, query, callback)
  };
  Apiomat.AMAGUser.deleteAllFromStorageWithReferencedHrefs = function(query, callback) {
    Apiomat.Datastore.getInstance().deleteCollectionFromStorage(true, Apiomat.AMAGUser, query, callback)
  };
  Apiomat.AMAGUser.prototype = new Apiomat.AbstractClientDataModel;
  Apiomat.AMAGUser.prototype.constructor = Apiomat.AMAGUser;
  Apiomat.AMAGUser.prototype.init = function() {
    this.data = new Object
  };
  Apiomat.AMAGUser.prototype.getSimpleName = function() {
    return"AMAGUser"
  };
  Apiomat.AMAGUser.prototype.getModuleName = function() {
    return"AMAGPhonebook"
  };
  Apiomat.AMAGUser.prototype.getAddressCity = function() {
    return this.data.addressCity !== null ? this.data.addressCity : undefined
  };
  Apiomat.AMAGUser.prototype.setAddressCity = function(_addressCity) {
    this.data.addressCity = _addressCity
  };
  Apiomat.AMAGUser.prototype.getAddressStreet = function() {
    return this.data.addressStreet !== null ? this.data.addressStreet : undefined
  };
  Apiomat.AMAGUser.prototype.setAddressStreet = function(_addressStreet) {
    this.data.addressStreet = _addressStreet
  };
  Apiomat.AMAGUser.prototype.getAddressStreetNumber = function() {
    return this.data.addressStreetNumber !== null ? this.data.addressStreetNumber : undefined
  };
  Apiomat.AMAGUser.prototype.setAddressStreetNumber = function(_addressStreetNumber) {
    this.data.addressStreetNumber = _addressStreetNumber
  };
  Apiomat.AMAGUser.prototype.getAddressZipcode = function() {
    return this.data.addressZipcode !== null ? this.data.addressZipcode : undefined
  };
  Apiomat.AMAGUser.prototype.setAddressZipcode = function(_addressZipcode) {
    this.data.addressZipcode = _addressZipcode
  };
  Apiomat.AMAGUser.prototype.getEmail = function() {
    return this.data.email !== null ? this.data.email : undefined
  };
  Apiomat.AMAGUser.prototype.setEmail = function(_email) {
    this.data.email = _email
  };
  Apiomat.AMAGUser.prototype.getLanguage = function() {
    return this.data.language !== null ? this.data.language : undefined
  };
  Apiomat.AMAGUser.prototype.setLanguage = function(_language) {
    this.data.language = _language
  };
  Apiomat.AMAGUser.prototype.getMobile = function() {
    return this.data.mobile !== null ? this.data.mobile : undefined
  };
  Apiomat.AMAGUser.prototype.setMobile = function(_mobile) {
    this.data.mobile = _mobile
  };
  Apiomat.AMAGUser.prototype.getOrganization = function() {
    return this.data.organization !== null ? this.data.organization : undefined
  };
  Apiomat.AMAGUser.prototype.setOrganization = function(_organization) {
    this.data.organization = _organization
  };
  Apiomat.AMAGUser.prototype.getTelephone = function() {
    return this.data.telephone !== null ? this.data.telephone : undefined
  };
  Apiomat.AMAGUser.prototype.setTelephone = function(_telephone) {
    this.data.telephone = _telephone
  }
})(typeof exports === "undefined" ? Apiomat : exports);
if(typeof goog !== "undefined") {
  Apiomat.Role = {}
}
if(typeof exports === "undefined") {
  var Apiomat = Apiomat || {}
}
(function(Apiomat) {
  Apiomat.Role = function() {
    this.init()
  };
  Apiomat.Role.getRoles = function(query, callback, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.Role, query, callback, false, usePersistentStorage)
  };
  Apiomat.Role.getRolesAndRefHref = function(query, callback, withReferencedHrefs, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.Role, query, callback, withReferencedHrefs, usePersistentStorage)
  };
  Apiomat.Role.getRolesCount = function(query, callback, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadCountFromServer(Apiomat.Role, undefined, query, callback, usePersistentStorage)
  };
  Apiomat.Role.deleteAllFromStorage = function(query, callback) {
    Apiomat.Datastore.getInstance().deleteCollectionFromStorage(false, Apiomat.Role, query, callback)
  };
  Apiomat.Role.deleteAllFromStorageWithReferencedHrefs = function(query, callback) {
    Apiomat.Datastore.getInstance().deleteCollectionFromStorage(true, Apiomat.Role, query, callback)
  };
  Apiomat.Role.prototype = new Apiomat.AbstractClientDataModel;
  Apiomat.Role.prototype.constructor = Apiomat.Role;
  Apiomat.Role.prototype.init = function() {
    this.data = new Object
  };
  Apiomat.Role.prototype.getSimpleName = function() {
    return"Role"
  };
  Apiomat.Role.prototype.getModuleName = function() {
    return"Basics"
  };
  Apiomat.Role.prototype.getMembers = function() {
    return this.data.members
  };
  Apiomat.Role.prototype.setMembers = function(_members) {
    this.data.members = _members
  };
  Apiomat.Role.prototype.getName = function() {
    return this.data.name !== null ? this.data.name : undefined
  };
  Apiomat.Role.prototype.setName = function(_name) {
    this.data.name = _name
  }
})(typeof exports === "undefined" ? Apiomat : exports);
if(typeof goog !== "undefined") {
  Apiomat.User = {}
}
if(typeof exports === "undefined") {
  var Apiomat = Apiomat || {}
}
(function(Apiomat) {
  Apiomat.User = function(_username, _password) {
    this.init();
    if(typeof _username !== "undefined") {
      this.setUserName(_username)
    }
    if(typeof _password !== "undefined") {
      this.setPassword(_password)
    }
    this.initDatastoreIfNeeded = function(allowGuest) {
      if(Apiomat.Datastore.isInstantiated() === false) {
        if(typeof this.getUserName() !== "undefined" && typeof this.getPassword() !== "undefined") {
          Apiomat.Datastore.configureWithCredentials(this)
        }else {
          if("getSessionToken" in this && typeof this.getSessionToken() !== "undefined" && this.getSessionToken()) {
            Apiomat.Datastore.configureWithSessionToken(this.getSessionToken())
          }else {
            if(typeof allowGuest !== "undefined" && allowGuest) {
              Apiomat.Datastore.configurePlain(Apiomat.User.AOMBASEURL, Apiomat.User.AOMAPIKEY, Apiomat.User.AOMSYS)
            }else {
              throw new Error("The Datastore needs to be configured with user credentials or a session token for this method to work.");
            }
          }
        }
      }
    };
    this.save = function(_callback, loadAfterwards) {
      this.initDatastoreIfNeeded(false);
      Apiomat.AbstractClientDataModel.prototype.save.apply(this, [_callback, loadAfterwards])
    };
    this.requestNewPassword = function(usePersistentStorage, _callback) {
      var callback = {onOk:function(refHref) {
        Apiomat.Datastore.positiveCallback(_callback)
      }, onError:function(error) {
        Apiomat.Datastore.negativeCallback(_callback, error)
      }};
      Apiomat.Datastore.getInstance().postOnServer(this, callback, "models/requestResetPassword/", usePersistentStorage)
    };
    this.resetPasswordAsync = function(_callback, usePersistentStorage) {
      Apiomat.Datastore.getInstance().postOnServer(this, _callback, "models/requestResetPassword/", usePersistentStorage)
    };
    this.resetPassword = function(newPassword, _callback, usePersistentStorage) {
      this.changePassword(newPassword, _callback, usePersistentStorage)
    };
    this.changePassword = function(newPassword, _callback, usePersistentStorage) {
      if(this.getCurrentState == Apiomat.ObjectState.PERSISTING) {
        Apiomat.Datastore.negativeCallback(_callback, error)
      }else {
        var internCallback = {onOk:function() {
          this.parent.setOffline(this.wasLocalSave || false);
          Apiomat.Datastore.configure(this.parent);
          Apiomat.Datastore.positiveCallback(_callback)
        }, onError:function(error) {
          Apiomat.Datastore.negativeCallback(_callback, error)
        }};
        internCallback.parent = this;
        this.setPassword(newPassword);
        if(Apiomat.Datastore.getInstance().shouldSendOffline("PUT")) {
          internCallback.wasLocalSave = true;
          Apiomat.Datastore.getInstance().sendOffline("PUT", this.getHref(), this, undefined, internCallback)
        }else {
          Apiomat.Datastore.getInstance().updateOnServer(this, internCallback, usePersistentStorage)
        }
      }
    };
    this.requestSessionToken = function(configure, callback, access_expiration, refresh_expiration) {
      this.requestSessionTokenWithRefreshToken(undefined, configure, callback, false, access_expiration, refresh_expiration)
    };
    this.requestSessionTokenWithRefreshToken = function(refreshToken, configure, callback, usePersistentStorage, access_expiration, refresh_expiration) {
      refreshToken = refreshToken || undefined;
      this.initDatastoreIfNeeded(refreshToken === "undefined" ? false : true);
      var internCB = callback;
      if(typeof configure !== "undefined" && configure) {
        internCB = {onOk:function(result) {
          var sessionToken = result.sessionToken || "";
          if(sessionToken === "") {
            Apiomat.Datastore.negativeCallback(callback, new Apiomat.ApiomatRequestError(Apiomat.Status.NO_TOKEN_RECEIVED, 200))
          }else {
            this.parent.setSessionToken(sessionToken);
            Apiomat.Datastore.configureWithUserSessionToken(this.parent);
            Apiomat.Datastore.positiveCallback(callback, result)
          }
        }, onError:function(error) {
          Apiomat.Datastore.negativeCallback(callback, error)
        }};
        internCB.parent = this
      }
      if(typeof refreshToken === "undefined") {
        Apiomat.Datastore.getInstance().requestSessionToken(internCB, usePersistentStorage, access_expiration, refresh_expiration)
      }else {
        Apiomat.Datastore.getInstance().requestSessionTokenWithRefreshToken(refreshToken, internCB, usePersistentStorage, access_expiration, refresh_expiration)
      }
    }
  };
  Apiomat.User.AOMBASEURL = "https://192.168.178.60/yambas/rest/apps/AMAG";
  //Apiomat.User.AOMAPIKEY = "2463067928707811267"; //epdemo
  Apiomat.User.AOMAPIKEY = "2728425447826473812";
  Apiomat.User.AOMSYS = "LIVE";
  Apiomat.User.AOMSDKVERSION = "3.0.0-";
  Apiomat.User.APPCONFIG = '{"app" : {"name" : "AMAG","modules" : [{"module" : {"name" : "Basics","type" : "STATIC","usedInSystem" : "TEST","classes" : [{"class" : {"name" : "MemberModel","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}},{"class" : {"name" : "Role","attributes" : [{"attribute" : {"name" : "members","type" : "String"}},{"attribute" : {"name" : "name","type" : "String"}}],"isTransient" : "false"}},{"class" : {"name" : "User","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}},{"class" : {"name" : "MemberModel","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}},{"class" : {"name" : "Role","attributes" : [{"attribute" : {"name" : "members","type" : "String"}},{"attribute" : {"name" : "name","type" : "String"}}],"isTransient" : "false"}},{"class" : {"name" : "User","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}},{"class" : {"name" : "MemberModel","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}},{"class" : {"name" : "Role","attributes" : [{"attribute" : {"name" : "members","type" : "String"}},{"attribute" : {"name" : "name","type" : "String"}}],"isTransient" : "false"}},{"class" : {"name" : "User","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}}]}},{"module" : {"name" : "AMAGMain","type" : "DYNAMIC","usedInSystem" : "TEST","classes" : [{"class" : {"name" : "AMAGUser","attributes" : [{"attribute" : {"name" : "language","type" : "String"}},{"attribute" : {"name" : "organization","type" : "String"}},{"attribute" : {"name" : "mobile","type" : "String"}},{"attribute" : {"name" : "email","type" : "String"}},{"attribute" : {"name" : "addressStreet","type" : "String"}},{"attribute" : {"name" : "addressZipcode","type" : "String"}},{"attribute" : {"name" : "addressCity","type" : "String"}},{"attribute" : {"name" : "addressStreetNumber","type" : "String"}},{"attribute" : {"name" : "telephone","type" : "String"}}],"isTransient" : "false"}}]}},{"module" : {"name" : "Basics","type" : "STATIC","usedInSystem" : "STAGING","classes" : [{"class" : {"name" : "MemberModel","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}},{"class" : {"name" : "Role","attributes" : [{"attribute" : {"name" : "members","type" : "String"}},{"attribute" : {"name" : "name","type" : "String"}}],"isTransient" : "false"}},{"class" : {"name" : "User","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}},{"class" : {"name" : "MemberModel","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}},{"class" : {"name" : "Role","attributes" : [{"attribute" : {"name" : "members","type" : "String"}},{"attribute" : {"name" : "name","type" : "String"}}],"isTransient" : "false"}},{"class" : {"name" : "User","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}},{"class" : {"name" : "MemberModel","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}},{"class" : {"name" : "Role","attributes" : [{"attribute" : {"name" : "members","type" : "String"}},{"attribute" : {"name" : "name","type" : "String"}}],"isTransient" : "false"}},{"class" : {"name" : "User","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}}]}},{"module" : {"name" : "AMAGMain","type" : "DYNAMIC","usedInSystem" : "STAGING","classes" : [{"class" : {"name" : "AMAGUser","attributes" : [{"attribute" : {"name" : "language","type" : "String"}},{"attribute" : {"name" : "organization","type" : "String"}},{"attribute" : {"name" : "mobile","type" : "String"}},{"attribute" : {"name" : "email","type" : "String"}},{"attribute" : {"name" : "addressStreet","type" : "String"}},{"attribute" : {"name" : "addressZipcode","type" : "String"}},{"attribute" : {"name" : "addressCity","type" : "String"}},{"attribute" : {"name" : "addressStreetNumber","type" : "String"}},{"attribute" : {"name" : "telephone","type" : "String"}}],"isTransient" : "false"}}]}},{"module" : {"name" : "AMAGPhonebook","type" : "DYNAMIC","usedInSystem" : "LIVE","classes" : []}},{"module" : {"name" : "LDAP","type" : "NATIVE","usedInSystem" : "LIVE","classes" : [{"class" : {"name" : "LDAPUser","attributes" : [{"attribute" : {"name" : "userAttributes","type" : "Map"}},{"attribute" : {"name" : "distinguishedName","type" : "String"}}],"isTransient" : "false"}}]}},{"module" : {"name" : "Basics","type" : "STATIC","usedInSystem" : "LIVE","classes" : [{"class" : {"name" : "MemberModel","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}},{"class" : {"name" : "Role","attributes" : [{"attribute" : {"name" : "members","type" : "String"}},{"attribute" : {"name" : "name","type" : "String"}}],"isTransient" : "false"}},{"class" : {"name" : "User","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}},{"class" : {"name" : "MemberModel","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}},{"class" : {"name" : "Role","attributes" : [{"attribute" : {"name" : "members","type" : "String"}},{"attribute" : {"name" : "name","type" : "String"}}],"isTransient" : "false"}},{"class" : {"name" : "User","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}},{"class" : {"name" : "MemberModel","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}},{"class" : {"name" : "Role","attributes" : [{"attribute" : {"name" : "members","type" : "String"}},{"attribute" : {"name" : "name","type" : "String"}}],"isTransient" : "false"}},{"class" : {"name" : "User","attributes" : [{"attribute" : {"name" : "password","type" : "String"}},{"attribute" : {"name" : "dynamicAttributes","type" : "Map"}},{"attribute" : {"name" : "salt","type" : "String"}},{"attribute" : {"name" : "lastName","type" : "String"}},{"attribute" : {"name" : "userName","type" : "String"}},{"attribute" : {"name" : "firstName","type" : "String"}},{"attribute" : {"name" : "loc","type" : "Location"}},{"attribute" : {"name" : "sessionToken","type" : "String"}},{"attribute" : {"name" : "dateOfBirth","type" : "Date"}}],"isTransient" : "false"}}]}},{"module" : {"name" : "AMAGMain","type" : "DYNAMIC","usedInSystem" : "LIVE","classes" : [{"class" : {"name" : "AMAGUser","attributes" : [{"attribute" : {"name" : "language","type" : "String"}},{"attribute" : {"name" : "organization","type" : "String"}},{"attribute" : {"name" : "mobile","type" : "String"}},{"attribute" : {"name" : "email","type" : "String"}},{"attribute" : {"name" : "addressStreet","type" : "String"}},{"attribute" : {"name" : "addressZipcode","type" : "String"}},{"attribute" : {"name" : "addressCity","type" : "String"}},{"attribute" : {"name" : "addressStreetNumber","type" : "String"}},{"attribute" : {"name" : "telephone","type" : "String"}}],"isTransient" : "false"}}]}}]}}';
  Apiomat.User.getUsers = function(query, callback, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.User, query, callback, false, usePersistentStorage)
  };
  Apiomat.User.getUsersAndRefHref = function(query, callback, withReferencedHrefs, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.User, query, callback, withReferencedHrefs, usePersistentStorage)
  };
  Apiomat.User.getUsersCount = function(query, callback, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadCountFromServer(Apiomat.User, undefined, query, callback, usePersistentStorage)
  };
  Apiomat.User.deleteAllFromStorage = function(query, callback) {
    Apiomat.Datastore.getInstance().deleteCollectionFromStorage(false, Apiomat.User, query, callback)
  };
  Apiomat.User.deleteAllFromStorageWithReferencedHrefs = function(query, callback) {
    Apiomat.Datastore.getInstance().deleteCollectionFromStorage(true, Apiomat.User, query, callback)
  };
  Apiomat.User.prototype = new Apiomat.AbstractClientDataModel;
  Apiomat.User.prototype.constructor = Apiomat.User;
  Apiomat.User.prototype.loadMe = function(callback, usePersistentStorage) {
    this.initDatastoreIfNeeded(false);
    Apiomat.Datastore.getInstance().loadFromServer("models/me", callback, this, false, usePersistentStorage)
  };
  Apiomat.User.prototype.init = function() {
    this.data = new Object;
    this.data["dynamicAttributes"] = {}
  };
  Apiomat.User.prototype.getSimpleName = function() {
    return"User"
  };
  Apiomat.User.prototype.getModuleName = function() {
    return"Basics"
  };
  Apiomat.User.prototype.getDateOfBirth = function() {
    var retDate = this.data.dateOfBirth;
    return typeof retDate != "undefined" ? new Date(retDate) : undefined
  };
  Apiomat.User.prototype.setDateOfBirth = function(_dateOfBirth) {
    if(_dateOfBirth != null && _dateOfBirth != undefined) {
      this.data.dateOfBirth = _dateOfBirth.getTime()
    }else {
      this.data.dateOfBirth = null
    }
  };
  Apiomat.User.prototype.getFirstName = function() {
    return this.data.firstName !== null ? this.data.firstName : undefined
  };
  Apiomat.User.prototype.setFirstName = function(_firstName) {
    this.data.firstName = _firstName
  };
  Apiomat.User.prototype.getLastName = function() {
    return this.data.lastName !== null ? this.data.lastName : undefined
  };
  Apiomat.User.prototype.setLastName = function(_lastName) {
    this.data.lastName = _lastName
  };
  Apiomat.User.prototype.getLocLatitude = function() {
    var locArr = this.data.loc;
    if(locArr) {
      return locArr[0]
    }
  };
  Apiomat.User.prototype.getLocLongitude = function() {
    var locArr = this.data.loc;
    if(locArr) {
      return locArr[1]
    }
  };
  Apiomat.User.prototype.setLocLatitude = function(_latitude) {
    var locArr = this.data.loc;
    if(!locArr) {
      locArr = [_latitude, undefined]
    }else {
      locArr[0] = _latitude
    }
    this.data.loc = locArr
  };
  Apiomat.User.prototype.setLocLongitude = function(_longitude) {
    var locArr = this.data.loc;
    if(!locArr) {
      locArr = [0, _longitude]
    }else {
      locArr[1] = _longitude
    }
    this.data.loc = locArr
  };
  Apiomat.User.prototype.getPassword = function() {
    return this.data.password !== null ? this.data.password : undefined
  };
  Apiomat.User.prototype.setPassword = function(_password) {
    this.data.password = _password
  };
  Apiomat.User.prototype.getSalt = function() {
    return this.data.salt !== null ? this.data.salt : undefined
  };
  Apiomat.User.prototype.setSalt = function(_salt) {
    this.data.salt = _salt
  };
  Apiomat.User.prototype.getSessionToken = function() {
    return this.data.sessionToken !== null ? this.data.sessionToken : undefined
  };
  Apiomat.User.prototype.setSessionToken = function(_sessionToken) {
    this.data.sessionToken = _sessionToken
  };
  Apiomat.User.prototype.getUserName = function() {
    return this.data.userName !== null ? this.data.userName : undefined
  };
  Apiomat.User.prototype.setUserName = function(_userName) {
    this.data.userName = _userName
  }
})(typeof exports === "undefined" ? Apiomat : exports);
if(typeof goog !== "undefined") {
  Apiomat.LDAPUser = {}
}
if(typeof exports === "undefined") {
  var Apiomat = Apiomat || {}
}
(function(Apiomat) {
  Apiomat.LDAPUser = function(_username, _password) {
    this.init();
    if(typeof _username !== "undefined") {
      this.setUserName(_username)
    }
    if(typeof _password !== "undefined") {
      this.setPassword(_password)
    }
  };
  Apiomat.LDAPUser.getLDAPUsers = function(query, callback, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.LDAPUser, query, callback, false, usePersistentStorage)
  };
  Apiomat.LDAPUser.getLDAPUsersAndRefHref = function(query, callback, withReferencedHrefs, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.LDAPUser, query, callback, withReferencedHrefs, usePersistentStorage)
  };
  Apiomat.LDAPUser.getLDAPUsersCount = function(query, callback, usePersistentStorage) {
    Apiomat.Datastore.getInstance().loadCountFromServer(Apiomat.LDAPUser, undefined, query, callback, usePersistentStorage)
  };
  Apiomat.LDAPUser.deleteAllFromStorage = function(query, callback) {
    Apiomat.Datastore.getInstance().deleteCollectionFromStorage(false, Apiomat.LDAPUser, query, callback)
  };
  Apiomat.LDAPUser.deleteAllFromStorageWithReferencedHrefs = function(query, callback) {
    Apiomat.Datastore.getInstance().deleteCollectionFromStorage(true, Apiomat.LDAPUser, query, callback)
  };
  Apiomat.LDAPUser.prototype = new Apiomat.User;
  Apiomat.LDAPUser.prototype.constructor = Apiomat.LDAPUser;
  Apiomat.LDAPUser.prototype.init = function() {
    Apiomat.User.prototype.init.call(this);
    this.data["dynamicAttributes"] = {}
  };
  Apiomat.LDAPUser.prototype.getSimpleName = function() {
    return"LDAPUser"
  };
  Apiomat.LDAPUser.prototype.getModuleName = function() {
    return"LDAP"
  };
  Apiomat.LDAPUser.prototype.getDistinguishedName = function() {
    return this.data.distinguishedName !== null ? this.data.distinguishedName : undefined
  };
  Apiomat.LDAPUser.prototype.setDistinguishedName = function(_distinguishedName) {
    this.data.distinguishedName = _distinguishedName
  };
  Apiomat.LDAPUser.prototype.getUserAttributes = function() {
    return this.data.userAttributes !== null ? this.data.userAttributes : undefined
  };
  Apiomat.LDAPUser.prototype.setUserAttributes = function(_userAttributes) {
    this.data.userAttributes = _userAttributes
  }
})(typeof exports === "undefined" ? Apiomat : exports);

# JS error handler

Simple custom javascript error handler. Optionally show alert with info about error and send info about error to server.

## Installation
Include error_handler.js with configuration before other scripts.
For more info see file examples/index.htm

## Configuration

### configuration by data attributes 
```javascript
<script src="error_handler.js" id="error-handler" data-alert="true" data-log="http://example.org/logger.php"></script>
```    
- data-alert="true" enable alert on error. Any other value or omitted attribute disable alert.
- data-log must contains absolute url of server logger, if logging is required. Otherwise attribute should be omitted.   
- attribute id="error-handler" is mandatory

### configuration by variables
```javascript
<script>
window.alertOnError = true; // enable or disable alert on error 
window.sendErrorTo = window.location.href + 'logger.php'; // absolute url where error should be send 
</script>
<script src="error_handler.js"></script>
```

Notes:
- if alert ang logging are disabled, error_handler pass error to standard browser error handler and message will be displayed in browser console.
- if server logging is enabled, errors will be send to server as common POST variables. For more info see examples/log/logger.php. 
Url for logging should'nt be publicly accessible.
- alert on error should be enabled only on development machine, on production machine have to be disabled.

## Known issues
- do not work in MSIE 8 or older
- stacktrace is not available in all browsers (i.e. MS Edge)  
- error in script from different domain will be logged only as "Script error on line 0"
- syntax error in script from different domain are still handled by browser 

## License
Released under the WTFPL license, http://www.wtfpl.net/about/.

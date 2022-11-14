------------------------------------------
Master Mentor From's Editor -  Software for creating HTML GUI Interfaces
------------------------------------------

See demo at: https://steamclub.net/products/forms_editor/

------------------------------------------
 LICENSE CC–BY-NC-ND
------------------------------------------
See license.txt

------------------------------------------
 1. INSTALL
------------------------------------------
For use generated GUI layouts (forms) in your software you must include file(s):

dist/gui_generator_class.js

------------------------------------------
 2. DEPENDENCIES
------------------------------------------

You must create global variable _22, and set underscore.js and lodash.js libraries as described below:

_22 =
{
	_			: underscore.js,
	_lo			: lodash.js,
};

------------------------------------------
 3. API
------------------------------------------
Use function GUI_generator.LAYOUT_cmd(...)

var LAYOUT_cmd = GUI_generator.LAYOUT_cmd;

// ATTACH GENERATED LAYOUT
var LAYOUT_json = '...generated json form...';
var LAYOUT = LAYOUT_cmd('layout_alloc', 'YOUR_LAYOUT_ID', LAYOUT_json);

// GENERATE HTML FOR APPEND TO BROWSER DOM
var LAYOUT_html = LAYOUT_cmd('layout_generate', 'YOUR_LAYOUT_ID');

// EXCAHNGE BROWSER DOM <-> FORM ELEMENTS
var is_get_from_gui = false; // false | true
LAYOUT_cmd('layout_exchange_values','YOUR_LAYOUT_ID', is_get_from_gui);

// OR FOR INIT STATIC FIELDS AT 1-st DRAW
LAYOUT_cmd('layout_exchange_values','YOUR_LAYOUT_ID', { is_get_from_gui:false, is_force_static_write:true, is_check_tref:false,  });

------------------------------------------
 4. VALUES EXCHANGE REPORTS
------------------------------------------
If no errors during LAYOUT_cmd('layout_exchange_values' ...) for all layout items:

LAYOUT_cmd(...) == true
LAYOUT.is_exchange_ok == true

or false, otherwise.

Each item report here:

LAYOUT.ITEMS[i].is_exchange_ok

And error reason flags in

LAYOUT.ITEMS[i].TREF_ok
LAYOUT.ITEMS[i].TREF_state

See section EXCHANGE STATES in GUI_generator source file.

------------------------------------------
 5. GET/SET LAYOUT (FORM) VALUES
------------------------------------------
Use:

LAYOUT.ITEMS[i].value

or

var value = LAYOUT_cmd('value_get', layout_id, item_id);
LAYOUT_cmd('value_set', layout_id, item_id, value);

or

var CTX = LAYOUT_cmd('ctx_get', layout_id);
CTX.MAP_id_item[item_id].value

------------------------------------------
 6. FULL API
------------------------------------------

LAYOUT_cmd(cmd, layout_id, ...) commands:

layout_alloc				- append layout to GUI_generator set
layout_delete				- delete layout from GUI_generator set
layout_generate				- generate html for use in Browser DOM
layout_exchange_values		- exchange values from layout <-> Dom
layout_check_values			- check TREF (Type/Pange/Euality) of value
layout_get					- get layout by layout_id
layout_get_json				- get layout as json
layout_clone				- clone and return layout
layout_assign				- assign layout to layout_id
value_get					- return value from form field (call layout_exchange_values before)
value_set					- set value to form field (and call layout_exchange_values after)
ctx_get						- return layout runtime context


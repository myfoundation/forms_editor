/**

Master Mentor From's Editor -  Software for creating HTML GUI Interfaces

Copyright © 2022 Master Mentor, STEAMPC Club (https://steamclub.net)

------------------------------------------
LICENSE (LANG:EN)
------------------------------------------

This information product (hereinafter referred to as the object) is an object of copyright, and is distributed under the CC–BY-NC-ND license.
It is allowed to use, distribute, exchange the object under the following conditions: the authorship of the object is indicated; the object is used for non-commercial purposes; modification of the object or the use of its parts is prohibited; the object, including this license, is distributed unchanged.
It is prohibited to use the object for commercial purposes. It is prohibited to use the facility for any purpose by institutions where the number of staff or students exceeds 5 (five) people, or if the annual cash receipts of the institution exceed 30,000 (thirty thousand) US dollars.
This object can be licensed under other licenses, for which you should contact the copyright holders of the object.
The object was developed by: Master Mentor in 2022.

------------------------------------------
ЛИЦЕНЗИЯ (LANG:RU)
------------------------------------------

Данный информационные продукт (далее – объект) является объектом авторского права, и распространяется под лицензией CC-BY-NC-ND.
Разрешено пользование, распространение, обмен объектом на следующих условиях: указано авторство объекта; объект используются в некоммерческих целях; изменение объекта либо использование его частей запрещено; объект, включая данную лицензию, распространяется в неизменном виде.
Запрещено пользование объекта в коммерческих целях. Запрещено пользование объекта в любых целях учреждениями, где количество персонала либо обучающихся превышает 5 (пять) человек, либо если годовые денежные поступления учреждения превышают 30000 (тридцать тысяч) долларов США.
Данный объект может быть лицензирован под другими лицензиями, для чего следует обратиться к правообладателям объекта.
Объект разработан: Master Mentor в 2022 году.

*/

// ============================SECTION====================================

//------------------------------------------
// LOAD DEPENDENCIES
//------------------------------------------
if((typeof _22 == 'undefined') || (typeof _22._  == 'undefined') || (typeof _22._lo  == 'undefined'))
{
	var msg = 
`
ERROR: You must define global variable _22 with underscore.js and loadsh.js fields
	
	_22 =
	{
		_			: underscore_js,
		_lo			: loadsh_js,
	};
`;

	alert(msg);
	console.log(msg);
}
//------------------------------------------

// ============================SECTION====================================

var TREF_var_checker =
{
/*
//------------------------------------------
// DOCUMENTATION
//------------------------------------------
/*
// CHECK POPERTIES
T - TYPE [s|n|i|a|o|b|l|e] (string, number, number integer, array, object, boolean, null, empty (undefined OR void (NOT EXISTS)))
R - RANGE (>= && <=) of any s|n|i|a|o value. Values: -1 (Don't CHECK) / pair [0, 5] / value [5] === [5, 5]
E - check if value EQUAL on of values from list. Must be array of any values [2, 4, 6, ...]
F - function call
EX - put here walues like null, '' ect. which can be used as exclusions during check
     if exclusions detected, no any check execution

CHECK VALUE BY TREF CASES

ALIASES IS DISABLED BY UNIFORM REASON

YOU MAY USE:
				OR
			T	/	Type
			R	/	Range
			E	/	Equal
			F	/	Function

			EX	/	Exclusion

YOU MAY USE ALIASES FOR T PARAM:
				OR
			s	/	string
			n	/	number
			i	/	integer
			a	/	array
			o	/	object
			b	/	boolean
			l	/	null
			e	/	empty
			j	/	json	Object or Array

CODE FLOW ATTRIBUTES
			d	/	default			- if not, reset to DEFAULT value from field D
			h	/	halt			- if not, HALT

			// u	/	udefined		- if udefined (i.e.not exists) add this value - MAY BE NEED ?! TODO


DEFAULT, PARENT
			D	/	Default			- default value
*/

	_constructor : function ()
	{
		var o=this,_=_22._;
		o.ST.ERR_ANY = 
			o.ST.ERR_T
			| o.ST.ERR_R
			| o.ST.ERR_E
			| o.ST.ERR_F
		;
	},

	ST :
	{
		StateEmpty						: 0,
		
		TYPE_string						: 'string',
		TYPE_integer					: 'integer',
		TYPE_number						: 'number',
		TYPE_boolean					: 'boolean',
		TYPE_null						: 'null',
		TYPE_empty						: 'empty',
		TYPE_json						: 'json',
		// TYPE_html					: 'html',		// INNER HTML
		// TYPE_raw						: 'raw',		// AS IS

		//------------------------------------------
		// ERRORS DECTECTED
		//------------------------------------------
		ERR_T						: 1 << 0,
		ERR_R						: 1 << 1,
		ERR_E						: 1 << 2,
		ERR_F						: 1 << 3,
		ST_EXCLUSION				: 1 << 4, // VALUE FOUND IN EXCLUSION ARRAY
		ERR_ANY						: -1,
		//------------------------------------------
	},

	TREF_struct	:
	{
		T			: '',
		R			: [],	// [FROM, TO], WHERE (X >= FROM) && (X <= TO)
		E			: [],	// EQUAL [1, 100, 1000, ...]
		F			: function(x, RULE, RESULT) { return true; },
		
		EX			: [],	// ARRY WITH VALUES IS EXCLUSIONS
	},
	
	TREF_check		: function(X, RULE, RESULT = { TREF_ok : true, TREF_state : 0 })
	{
		var o=this,_=_22._;
		
		RESULT.TREF_ok = true;
		RESULT.TREF_state = o.ST.StateEmpty;
		
		var st_ = o.ST.StateEmpty;

		if(RULE.EX && RULE.EX.includes(X))
		{
			st_ |= o.ST.ST_EXCLUSION;
		}
		else
		{
			if(RULE.T)
			{
				var ok = true;
				switch(RULE.T)
				{
					// 1
					case 'json':
						ok = _.isString(X) && o.isJSON(X);
					break;
					
					// 2
					case 'string':
						ok = _.isString(X);
					break;

					// 3
					case 'integer':
						ok = _.isNumber(X) && _.isFinite(X) && ((X << 0) === X);
					break;

					// 4
					case 'number':
						ok = _.isNumber(X) && _.isFinite(X);
					break;

					// 5
					case 'boolean':
						ok = _.isBoolean(X);
					break;

					// 6
					case 'null':
						ok = _.isNull(X);
					break;

					// 7	empty =:= null | undefined
					case 'empty':
						ok = _.isNull(X) || _.isUndefined(X);
					break;

					default:
						ok = false;
						console.log('ERR. LOGIC ERROR');
					break;
				}
				
				if(!ok) st_ |= o.ST.ERR_T;
			}

			if(RULE.R)
			{
				var ok = true;
				switch(true)
				{
					case _.isNumber(X):
						ok = _.isFinite(X) && (X >= RULE.R[0]) && (X <= RULE.R[1]);
					break;
					
					case _.isString(X):
					case _.isArray(X):
						ok = (X.length >= RULE.R[0]) && (X.length <= RULE.R[1]);
					break;

					default:
						console.log('WARN: Range not checked. Possible logic error.');
					break;
				}
				
				if(!ok) st_ |= o.ST.ERR_R;
			}
			

			if(RULE.E)
			{
				if(!RULE.E.includes(X)) st_ |= o.ST.ERR_E;
			}

			if(RULE.F)
			{
				if(!RULE.F(X, RULE, RESULT)) st_ |= o.ST.ERR_F;
			}
		}
		
		RESULT.TREF_state = st_;
		RESULT.TREF_ok = !(st_ & o.ST.ERR_ANY);
		
		return RESULT.TREF_ok;
	},
	
	isJSON		: function (str)
	{
		var o=this,_=_22._;
		try { var x = JSON.parse(str); return _.isArray(x) || o.isObject(x); } catch (e) { return false; }
	},
	
	isObject	: function(X)
	{
  		return X instanceof Object && X.constructor === Object;
	},
};
TREF_var_checker._constructor();

// ============================SECTION====================================

var GUI_generator =
{
	/*
	x,y,w,h =:= x,y,width,height
	*/

	_constructor : function ()
	{
		var o=this,_=_22._;
		
		//------------------------------------------
		// CONSTANTS
		//------------------------------------------
		o.ST =
		{
			StateEmpty						: 0,

			//------------------------------------------
			// interaction_type
			//------------------------------------------
			INTERACTION_TYPE_both			: 0,	// ITEM <-> DOM
			INTERACTION_TYPE_static			: 1,	// ITEM /-> DOM IF is_force_static_write SETTED
			INTERACTION_TYPE_skip			: 2,	// ITEM x DOM
			INTERACTION_TYPE_read			: 3,	// ITEM <- DOM
			INTERACTION_TYPE_write			: 4,	// ITEM -> DOM
			//------------------------------------------

			//------------------------------------------
			// EXCHANGE STATES _M_exchange FIELD
			//------------------------------------------
			ST_EXCHANGE_OK					: 1 << 0,
			ST_EXCHANGE_FAIL_no_dom_element	: 1 << 1,
			ST_EXCHANGE_FAIL_TREF_error		: 1 << 2, // TERF CHECK ERROR, SEE TREF_ok TREF_state
			//------------------------------------------
			
			//------------------------------------------
			// ONLY IN EDIT MODE
			//------------------------------------------
			EDITOR_ITEM_INIT_multiply_w		: 1 << 20, // INIT AS w = w * FORM_font_h
			EDITOR_ITEM_INIT_multiply_h		: 1 << 21, // INIT AS h = w * FORM_font_h
			//------------------------------------------
		};
		
		o.ST.ST_EXCHANGE_all =
				o.ST.ST_EXCHANGE_OK 
				| o.ST.ST_EXCHANGE_FAIL_no_dom_element;
				
		o.ST.ST_EXCHANGE_FAIL =
				o.ST.ST_EXCHANGE_FAIL_no_dom_element;

		//------------------------------------------
		
		o.ITEM.TREF = _22._lo.cloneDeep(TREF_var_checker.TREF_struct);

		o.ITEMS_defines			=
		{
			ITEM_default 		:
			{
				TREF				: {	},
				
				_M		: o.ST.EDITOR_ITEM_INIT_multiply_w | o.ST.EDITOR_ITEM_INIT_multiply_h,
				
				w		: 16,
				h		: 16,
			},
			
			FORM_TYPE_form		:
			{
				html	: '<div %FILLA%></div>',
				
				_M					: 0,
				_M_exchange			: 0, // EXCHANGE STATE
				
				id					: 'LAYOUT_FORM_',
				w					: 600,
				h					: 600,
				font				: 'Arial,sans-serif', // Inconsolata,monospace;
				font_h				: 16,

				description		: 'Form',
			},

			FORM_TYPE_label		:
			{
				html	: '<div %FILLA%>Label</div>',
				
				w		: 7,
				h		: 1,

				description		: 'Label',
			},
			
			FORM_TYPE_input_text		:
			{
				html	: '<input %FILLA% type="text">',
				
				w		: 10,
				h		: 1,

				description		: 'Input Text',
			},
			FORM_TYPE_input_number		:
			{
				html	: '<input %FILLA% type="number">',
				
				TREF		: {	T : 'integer', },
				
				w		: 10,
				h		: 1,

				description		: 'Input Number',
			},
			/**
			UOU MUST SET CUSOM type ATTRIBUTE, AND MUST GET/SET VALUE CUSTOM
			*/
			FORM_TYPE_input_any_type		:
			{
				html	: '<input %FILLA%>',
				
				w		: 10,
				h		: 1,
				
				description		: 'Input Any Type',
			},
			FORM_TYPE_input_password		:
			{
				html	: '<input %FILLA% type="password">',
				
				w		: 10,
				h		: 1,

				description		: 'Input',
			},
			FORM_TYPE_input_button		:
			{
				// The difference is that <button> can have content, whereas <input> cannot (it is a null element). While the button-text of an <input> can be specified, you cannot add markup to the text or insert a picture. So <button> has a wider array of display options.
				html	: '<button %FILLA%>Button</button>',
				
				w		: 10,
				h		: 1,

				description		: 'Button',
			},
			FORM_TYPE_input_checkbox		:
			{
				html	: '<input %FILLA% type="checkbox">',
				
				TREF		: {	T : 'boolean', },
				
				w		: 1,
				h		: 1,

				description		: 'Checkbox',
			},
			FORM_TYPE_input_radio		:
			{
				html	: '<input %FILLA% type="radio">',
				
				w		: 1,
				h		: 1,

				description		: 'Radio',
			},
			FORM_TYPE_select		:
			{
				html	: '<select %FILLA%>%SELECTBODY%</select>',
				
				w		: 1,
				h		: 1,

				description		: 'Select',
			},
			FORM_TYPE_textarea		:
			{
				html	: '<textarea %FILLA%></textarea>',
				
				w		: 10,
				h		: 4,

				description		: 'Textarea',
			},
			FORM_TYPE_div_rectangle		:
			{
				html	: '<div %FILLA%></div>',
				
				w		: 10,
				h		: 10,

				description		: 'Rectangle',
			},
			FORM_TYPE_div_container		:
			{
				html	: '<div %FILLA%></div>',
				
				w		: 10,
				h		: 10,

				description		: 'Div',
			},
			FORM_TYPE_img		:
			{
				html	: '<img %FILLA%>',
				
				w		: 4,
				h		: 4,

				description		: 'Image',
			},
		};
		
		o.ITEM.TREF = _22._lo.cloneDeep(TREF_var_checker.TREF_struct);

		o.LAYOUT_struct.FORM	= _.extend(
			_22._lo.cloneDeep(o.ITEM),					// 1
			o.ITEMS_defines.ITEM_default,		// 2
			o.ITEMS_defines.FORM_TYPE_form,		// 3
		);
		
		o.CTX_struct.LAYOUT = _22._lo.cloneDeep(o.LAYOUT_struct)
	},
		
	EDIT_ITEM_COLORS			:
	{
		// 'html'				: '#CB433525',		// INNER HTML
		// 'raw'				: '#CB433525',		// AS IS
		'string'			: '#EAEDED25',
		'integer'			: '#1F618D25',
		'number'			: '#1E844925',
		'boolean'			: '#F4D03F25',
		'null'				: '#F4D03F25',
		'empty'				: '#F4D03F25',
		'json'				: '#F4D03F25',
	},

	ITEM			:
	{
		_M			: 0,
		
		id			: '',	// HTML ID
		value		: '',	// ITEM <-> DOM VALUE
		body		: '',	// ITEM HTML BODY (SETTED UP DURING INIT)
		type		: '',	// FORM_TYPE_xxxxx
		storage		: '',	// ANY CUSTOM DATA AS JSON
		
		interaction_type	: 0, 	// EXCHANGE_FORM_values() INTERACTION, BUT IGNORED IN EXCHANGE_ITEM_value()
		is_exchange_ok	: false, // EXCHANGE_ITEM_value() EXECUTION STATE
		
		//------------------------------------------
		// COORDINATES
		x			: 0,
		y			: 0,
		w			: 0,	// WIDTH
		h			: 0,	// HEIGHT
		z			: 0,	// Z THE SAME AS ITEM INDEX IN LAYOUT.ITEMS
		//------------------------------------------
		
		font		: '',
		font_h		: '',
		
		//------------------------------------------
		// HTML ATTRIBUTES
		class		: '',
		onclick		: '',
		tag_raw_text	: '',
		html		: '', // ITEM NODE HTML
		//------------------------------------------

		//------------------------------------------
		// HTML STATE
		is_disabled	: false,
		is_hidden	: false,
		is_readonly	: false,
		//------------------------------------------
		
		description		: 'Undefined Item', // DESCRIPTION type OF ITEM
		
		//------------------------------------------
		// TREF CHECK
		//------------------------------------------
		TREF		: null, // TREF_struct
		
		TREF_ok		: true,
		TREF_state	: 0,
		//------------------------------------------
	},
			
	LAYOUT_struct	:
	{
		ITEMS		: [],
		
		FORM		: null,
		
		is_exchange_ok	: false,

		//------------------------------------------
		// ONLY IN EDIT MODE
		GRID_step_xy	: 5,
		GRID_is_snap	: false,
		//------------------------------------------

		version			: '1.00.06',
	},
	
	// CONTEXT
	CTX_struct				:
	{
		LAYOUT		: null,
		is_editor_mode	: false,
		is_exchange_ok	: false,

		MAP_id_item	: {}, // JUST LAYOUT HELPER
	},
	
	_CTX					: {},

	//------------------------------------------
	// ONLY FOR EDIT MODE
	//------------------------------------------
	EDITOR_wrapper_prefix	: 'GUI_generator_UNQ80_',
	//------------------------------------------
};
GUI_generator._constructor();

GUI_generator.ITEM_find = function (layout_id, id)
{
	var o=this,_=_22._;
	var CTX = o._CTX[layout_id];
	
	if(CTX.LAYOUT.FORM.id == id) return CTX.LAYOUT.FORM;
	
	return _.find(CTX.LAYOUT.ITEMS, function(v,k,l){ return v.id == id; });
};

GUI_generator.ITEM_new = function (layout_id, extend)
{
	var o=this,_=_22._;
	var CTX = o._CTX[layout_id];
	
	var IT = _.extend(
		_22._lo.cloneDeep(o.ITEM),				// 1
		o.ITEMS_defines.ITEM_default,	// 2
		(extend && extend.type) ? o.ITEMS_defines[extend.type] : {},
		extend ? extend : {}				// 3
	);
	
	if(IT._M & o.ST.EDITOR_ITEM_INIT_multiply_w) IT.w = IT.w * CTX.LAYOUT.FORM.font_h;
	if(IT._M & o.ST.EDITOR_ITEM_INIT_multiply_h) IT.h = IT.h * CTX.LAYOUT.FORM.font_h;
	IT._M &= ~(o.ST.EDITOR_ITEM_INIT_multiply_w | o.ST.EDITOR_ITEM_INIT_multiply_h);
	
	return IT;
}

/**
THE UNIQUE id MUST BE SETTED UP IN extend OBJECT
*/
GUI_generator.ITEM_append_new = function (layout_id, extend)
{
	var o=this,_=_22._;
	var CTX = o._CTX[layout_id];

	var IT = o.ITEM_new(layout_id, extend);
	IT.z = CTX.LAYOUT.ITEMS.length;
	
	CTX.LAYOUT.ITEMS.push(IT);
	CTX.MAP_id_item[IT.id] = IT;
	
	return IT;
}

GUI_generator.LAYOUT_ITEMS_changed = function (layout_id)
{
	var o=this,_=_22._;
	var CTX = o._CTX[layout_id];
	
	CTX.MAP_id_item = {};
	_.each(CTX.LAYOUT.ITEMS, function(v,k,l)
	{
		v.z = k;
		CTX.MAP_id_item[v.id] = v;
	});
}

GUI_generator.LAYOUT_cmd = function (cmd, layout_id, P1, P2)
{
	var o=this,_=_22._;
	
	switch(cmd)
	{
		case 'layout_alloc':
			o._CTX[layout_id] = _22._lo.cloneDeep(o.CTX_struct);
			return P1 ? o.LAYOUT_cmd('layout_assign', layout_id, P1) : o._CTX[layout_id];
		break;

		case 'layout_exchange_values':
			return o.EXCHANGE_FORM_values(layout_id,P1);
		break;

		case 'layout_check_values':
			return o.CHECK_FORM_values(layout_id);
		break;

		case 'layout_get':
			return o._CTX[layout_id].LAYOUT;
		break;
		
		case 'layout_get_json':
			return JSON.stringify(o._CTX[layout_id].LAYOUT, null, '\t');
		break;
		
		case 'layout_generate':
			return o.LAYOUT_generate(layout_id);
		break;
		
		case 'layout_assign':
			if(!o._CTX[layout_id]) o.LAYOUT_cmd('layout_alloc', layout_id);
			
			if(_.isString(P1)) P1 = JSON.parse(P1);
			
			var CTX = o._CTX[layout_id];
			CTX.LAYOUT = P1;

			CTX.MAP_id_item = {};
			_.each(CTX.LAYOUT.ITEMS, function(v,k,l)
			{
				CTX.MAP_id_item[v.id] = v;
			});
			
			return o._CTX[layout_id];
		break;
		
		case 'layout_delete':
			delete o._CTX[layout_id];
			return true;
		break;
		
		case 'layout_clone':
			return _22._lo.cloneDeep(o._CTX[layout_id]);
		break;

		case 'value_get':
			return o._CTX[layout_id].MAP_id_item[P1];
		break;

		case 'value_set':
			o._CTX[layout_id].MAP_id_item[P1] = P2;
			return true;
		break;

		case 'ctx_get':
			return o._CTX[layout_id];
		break;

		default:
			console.log('ERR. LOGIC ERROR');
		break;
	}
	
}

GUI_generator.ITEM_is_form = function(layout_id, IT, id)
{
	var o=this,_=_22._;
	var CTX = o._CTX[layout_id];

	var FORM = CTX.LAYOUT.FORM;
	
	var _r = false;
	switch(true)
	{
		case IT && (FORM.id == IT.id):
			_r = true;
		break;

		case id && (FORM.id == id):
			_r = true;
		break;
		
		default:
		break;
	}
	
	return _r;
}

GUI_generator.LAYOUT_generate = function (layout_id)
{
	var o=this,_=_22._;
	var CTX = o._CTX[layout_id];

	var FM = _22._lo.cloneDeep(CTX.LAYOUT.FORM);
	
	var html_items = _.map(CTX.LAYOUT.ITEMS, function(v,k,l)
	{
		//------------------------------------------
		// DO ITEM
		//------------------------------------------
		var IT = _22._lo.cloneDeep(v);
		var _r = o.ITEMS_defines[IT.type].html;
		
		var FILLA = '';
		
		IT.onclick		= IT.onclick ? `onclick="${IT.onclick}"`:'';
		IT.font			= IT.font ? IT.font : FM.font;
		IT.font_h		= IT.font_h ? IT.font_h : FM.font_h;
		
		if(CTX.is_editor_mode)
		{
			IT.onclick			= '';
			IT.is_disabled		= false;
			IT.is_hidden		= false;
			
			/*
			width 100%, height 100% NEED FOR CORRECT WORK
			pointer-events: none; - DISABLE CLICK EVENTS
			*/
			FILLA = 
			`
				id				= "${IT.id}"

				class			=
					"
						${IT.class}
					"

				style			=
					"
						padding			: 0;
						margin			: 0;
						
						font-family		: ${IT.font};
						font-size		: ${IT.font_h};
						
						position		: absolute;
						width			: 100%;
						height			: 100%;
						
						${IT.is_hidden ? 'display:none;':''}
						
						pointer-events: none;
						background-image: linear-gradient(${o.EDIT_ITEM_COLORS[IT.TREF.T]}, ${o.EDIT_ITEM_COLORS[IT.TREF.T]});

					"
					
				${IT.is_disabled ? 'disabled':''}
				${IT.is_readonly ? 'readonly':''}
				
				${IT.tag_raw_text}

				${IT.onclick}
			`;
		}
		else
		{
			FILLA = 
			`
				id				= "${IT.id}"

				class			=
					"
						${IT.class}
					"

				style			=
					"
						padding			: 0;
						margin			: 0;
						
						font-family		: ${IT.font};
						font-size		: ${IT.font_h};
						
						position		: absolute;
						left			: ${IT.x};
						top				: ${IT.y};
						width			: ${IT.w};
						height			: ${IT.h};

						${IT.is_hidden ? 'display:none;':''}
					"
					
				${IT.is_disabled ? 'disabled':''}
				${IT.is_readonly ? 'readonly':''}
						
				${IT.tag_raw_text}

				${IT.onclick}
			`;
		}
		
		_r = _r.replace(/%FILLA%/g, FILLA);
		
		switch(IT.type)
		{
			case 'FORM_TYPE_select':
				_r = _r.replace(/%SELECTBODY%/g, IT.body);
			break;
			
			default:
			break;
		}
		
		//------------------------------------------

		//------------------------------------------
		// DO DRAGGABLE WRAPPER
		//------------------------------------------
		if(CTX.is_editor_mode)
		{
			_r =
			`<div
					id		= "${o.EDITOR_wrapper_prefix}${IT.id}"
					
					class	=
						"
							ED80_item_draggable_wrapper_stub
							ED80_item_dashed_box
						"
					
					style	=
						"
							padding			: 0;
							margin			: 0;

							position		: absolute;
						
							left			: ${IT.x};
							top				: ${IT.y};
							width			: ${IT.w};
							height			: ${IT.h};

						"
			>${_r}</div>`;
		}
		//------------------------------------------
		
		return _r;
	});
	
	html_items = html_items.join('');

	//------------------------------------------
	// DO FORM
	//------------------------------------------
	FM.onclick = FM.onclick ? `onclick="${FM.onclick}`:'';
	
	var html_form = '';
	
	if(CTX.is_editor_mode)
	{
		FM.onclick = '';
		
		html_form = 
			`<div
					id			= "${FM.id}"

					class		=
						"
							${FM.class}
							ED80_grid_css
						"
					
					style		=
						"
							padding			: 0;
							margin			: 0;

							font-family		: ${FM.font};
							font-size		: ${FM.font_h};
							
							text-align		: left;
							display			: block;
							
							position		: relative;
							left			: 0;
							top				: 0;
							
							float			: none;
							width			: ${FM.w}px;
							height			: ${FM.h}px;
									
							${FM.is_hidden ? 'display:none;':''}

		    				background-size: ${CTX.LAYOUT.GRID_step_xy}px ${CTX.LAYOUT.GRID_step_xy}px;
						"

						${FM.is_disabled ? 'disabled':''}
						${FM.is_readonly ? 'readonly':''}
								
						${FM.tag_raw_text}

						${FM.onclick}
						
			>${html_items}</div>`;
	}
	else
	{
		html_form = 
			`<div
					id			= "${FM.id}"

					class		=
						"
							${FM.class}
						"
					
					style		=
						"
							padding			: 0;
							margin			: 0;

							font-family		: ${FM.font};
							font-size		: ${FM.font_h};
							
							text-align		: left;
							
							position		: relative;
							left			: 0;
							top				: 0;
							
							float			: none;
							width			: ${FM.w}px;
							height			: ${FM.h}px;
									
							${FM.is_hidden ? 'display:none;':''}
						"

						${FM.is_disabled ? 'disabled':''}
						${FM.is_readonly ? 'readonly':''}
								
						${FM.tag_raw_text}

						${FM.onclick}
					
			>${html_items}</div>`;
	}			
	//------------------------------------------
	
	return html_form;
}

GUI_generator.EXCHANGE_ITEM_value = function (IT, is_get_from_gui_)
{
	var o=this,_=_22._;
	
	if(!IT)
	{
		console.log('ERR: Logic error. Form no have item: ' + id);
		return false;
	}
	
	IT.is_exchange_ok = true;
	var st_ = o.ST.StateEmpty;
	
	IT._M_exchange =  o.ST.StateEmpty;
	
	var EL = $(`#${IT.id}`);
	if(!EL.length)
	{
		console.log('ERR: Logic error. Form no have element: ' + id);
		IT.is_exchange_ok = false;
	}

	// DEFAULT SETTINGS
	var S = 
	{
		is_get_from_gui				: is_get_from_gui_,
		is_check_tref				: true,
	};
	
	if(!_.isBoolean(is_get_from_gui_)) _.extend(S, is_get_from_gui_);
	
	if(IT.is_exchange_ok)
	{
		if(S.is_get_from_gui)
		{
			switch(IT.type)
			{
				case 'FORM_TYPE_input_text':
				case 'FORM_TYPE_input_number':
				case 'FORM_TYPE_input_password':
				case 'FORM_TYPE_textarea':
				case 'FORM_TYPE_select':
					IT.value = EL.val();
				break;
				
				case 'FORM_TYPE_label':
				case 'FORM_TYPE_div_container':
				case 'FORM_TYPE_div_rectangle':
				case 'FORM_TYPE_input_button':
					IT.value = EL.html();
				break;
				
				case 'FORM_TYPE_input_checkbox':
					IT.value = EL.prop('checked');
				break;
				
				case 'FORM_TYPE_img':
					IT.value = EL.attr('src');
				break;
				
				case 'FORM_TYPE_input_radio':
					var name = EL.attr('name');
					IT.value = $(`input[name="#${name}"]:checked`).val();
				break;
				
				default:
					console.log('ERR: Logic error.');
				break;
			}

			switch(IT.TREF.T)
			{
				case '':
				break;
				
				case 'string':
					IT.value = '' + IT.value;
				break;

				case 'integer':
				case 'number':
					var tmp =
						IT.TREF.T == 'integer'
						?
						parseInt(IT.value)
						:
						parseFloat(IT.value);
						
					if(_.isNumber(tmp) && _.isFinite(tmp)) IT.value = tmp;
				break;

				case 'boolean':
					IT.value = (IT.value === true);
				break;

				default:
				break;
			}
		}
		else
		{
			var value = IT.value;
		
			switch(IT.type)
			{
				case 'FORM_TYPE_input_text':
				case 'FORM_TYPE_input_number':
				case 'FORM_TYPE_input_password':
				case 'FORM_TYPE_textarea':
				case 'FORM_TYPE_select':
					EL.val(value);
				break;
				
				case 'FORM_TYPE_label':
				case 'FORM_TYPE_div_container':
				case 'FORM_TYPE_div_rectangle':
				case 'FORM_TYPE_input_button':
					 EL.html(value);
				break;
				
				case 'FORM_TYPE_input_checkbox':
					EL.prop('checked', value);
				break;
				
				case 'FORM_TYPE_img':
					EL.attr('src', value);
				break;
				
				case 'FORM_TYPE_input_radio':
					$(`input[name="#${IT.name}"]:checked`).val(value);
				break;
				
				default:
					console.log('ERR: Logic error.');
				break;
			}
		}
	}

	if(S.is_check_tref)
	{
		if(!TREF_var_checker.TREF_check(IT.value, IT.TREF, IT))
		{
			IT.is_exchange_ok = false;
			st_ |= o.ST.ST_EXCHANGE_FAIL_TREF_error;
		}
	}
	
	IT._M_exchange |= (IT.is_exchange_ok ? o.ST.ST_EXCHANGE_OK : st_);
	
	return IT.is_exchange_ok;
}

GUI_generator.EXCHANGE_FORM_values = function (layout_id, is_get_from_gui_)
{
	var o=this,_=_22._;
	var CTX = o._CTX[layout_id];

	var ITEMS = CTX.LAYOUT.ITEMS;

	CTX.LAYOUT.is_exchange_ok = true;
	
	// DEFAULT SETTINGS
	var S = 
	{
		is_force_static_write		: false,
		is_get_from_gui				: is_get_from_gui_,
		is_check_tref				: true,
	};
	
	if(!_.isBoolean(is_get_from_gui_)) _.extend(S, is_get_from_gui_);
	
	_.each(ITEMS, function(v,k,l)
	{
		switch(true)
		{
			case v.interaction_type == o.ST.INTERACTION_TYPE_both:
			break;

			case v.interaction_type == o.ST.INTERACTION_TYPE_static:
				if(S.is_force_static_write && !S.is_get_from_gui) break;
			return;

			case v.interaction_type == o.ST.INTERACTION_TYPE_skip:
			case (v.interaction_type == o.ST.INTERACTION_TYPE_read) && (!S.is_get_from_gui):
			case (v.interaction_type == o.ST.INTERACTION_TYPE_write) && (S.is_get_from_gui):
			return;
			
			default:
			break;
		}
		
		if(!o.EXCHANGE_ITEM_value(v, S.is_get_from_gui)) CTX.LAYOUT.is_exchange_ok = false;
	});
	
	return CTX.LAYOUT.is_exchange_ok;
}

GUI_generator.CHECK_FORM_values = function (layout_id)
{
	var o=this,_=_22._;
	var CTX = o._CTX[layout_id];

	var TREF_ok = true;
	
	_.each(CTX.LAYOUT.ITEMS, function(v,k,l)
	{
		if(!TREF_var_checker.TREF_check(v.value, v.TREF, v)) TREF_ok = false;
	});
	
	return TREF_ok;
}
/*
GUI_generator.LAYOUT_draw = function (layout_id)
{
	var o=this,_=_22._;
	var CTX = o._CTX[layout_id];
}
*/


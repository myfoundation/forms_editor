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
// STRUCTURES
//------------------------------------------

var BAG =
{
	//------------------------------------------
	// FRAMEWORK
	//------------------------------------------
	gui_i18n	 	: {},
	gui_locale		: 'EN', // EN / RU
	Kv				: {},		// ALL PIECES
	
	TEMPLATES		: {},		// UNDERSCORE COMPILED TEMPLATES
	//------------------------------------------

	//------------------------------------------
	// EDITOR
	//------------------------------------------
	GG				: null,		// GUI_generator ALIAS
	
	item_selected	: null,
	item_last_dom	: null,
	
	FORM_PANEL_id	: 'ED80_container___panel_center',

	save_auto_time_ms	: 1000,
	//------------------------------------------
	
	//------------------------------------------
	// UNDO / REDO
	//------------------------------------------
	/**
	TODO: CORRECT UNDO/REDO
	THIS IS SIMPLEST UNDO/REDO, SO SOME "EMPTY" STATES MAY BE SAVED TWICE
	*/
	do_undo		: function()
	{
		var o=this,_=_22._;
		if(!o.state_position) return;
		
		// THE LAST STATE ALWAYS NOT SAVED. SO, SAVE IT IF WE NOT IN DO UNDO/REDO STEPS
		if(o.state_position == LEN(o.state_storage))
		{
			if(JSON.stringify(o.state_storage[o.state_position-1]) != JSON.stringify(o.CTX_form().LAYOUT))
			{
				o.state_storage.push(o.snap_state());
			}
		}
		
		o.state_position--;
		
		var state = o.state_storage[o.state_position];
		o.GG.LAYOUT_cmd('layout_assign', 'layout_edit', new_clone(state.LAYOUT));

		draw_workspace();
		ELEMENT_click(null, state.selected_id);
	},
	do_redo		: function()
	{
		var o=this,_=_22._;
		if(o.state_position == o.state_storage.length) return;
		
		var state = o.state_storage[o.state_position];
		o.GG.LAYOUT_cmd('layout_assign', 'layout_edit',new_clone(state.LAYOUT));
		o.state_position++;
		
		draw_workspace();
		ELEMENT_click(null, state.selected_id);
	},
	do_save_state		: function()
	{
		var o=this,_=_22._;
		o.state_storage.length = o.state_position;
		o.state_position++;
		
		o.state_storage.push(o.snap_state());
		
		// NEED REDRAW LABEL Steps: HERE
	},
	snap_state		: function()
	{
		var o=this,_=_22._;
		var state = 
		{
			LAYOUT			: new_clone(o.CTX_form().LAYOUT),
			selected_id		: o.item_selected ? o.item_selected.id : null,
		};
		return state;
	},
	state_storage		: [],
	state_position		: 0,
	//------------------------------------------
	
	//------------------------------------------
	// FORM GUI (DOM) MIRRORS
	//------------------------------------------
	CFG :
	{
		id_generator			: 1000,
	
		// WS =:= WORKSPACE
		WS:
		{
			EDITOR_is_mode_resizable	: true,
		},
		version			: '1.00.05',
	},
	//------------------------------------------

	_constructor : function ()
	{
		var o=this,_=_22._;
	},
	
	CTX_form : function ()
	{
		var o=this,_=_22._;
		return o.GG._CTX['layout_edit'];
	},
	CTX_editor : function ()
	{
		var o=this,_=_22._;
		return o.GG._CTX['layout_editor'];
	},
};
BAG._constructor();

BAG.init = function()
{
	var o=this,_=_22._;
	
	o.GG = GUI_generator;
	o.GG.LAYOUT_cmd('layout_alloc', 'layout_editor');

	var layout =
	[
		//------------------------------------------
		// FORM GUI MIRRORS
		//------------------------------------------
		{
			id			: 'ED80_GRID_step_xy',
			type		: 'FORM_TYPE_input_text',
			TREF		: {	T : 'integer', },
			
			storage		:
			{
				key		: 'GRID_step_xy',
				part_id	: 'form_raw_part',
			}
		},
		{
			id			: 'ED80_CHECK_grid_snap',
			type		: 'FORM_TYPE_input_checkbox',
			
			storage		:
			{
				key		: 'GRID_is_snap',
				part_id	: 'form_raw_part',
			}
		},
		{
			id			: 'ED80_CHECK_mode_resizable',
			type		: 'FORM_TYPE_input_checkbox',
			
			storage		:
			{
				key		: 'EDITOR_is_mode_resizable',
				part_id	: 'editor_raw_part',
			}
		},
		
		// STATIC
		{
			id			: 'ED80_EDITOR_items_total',
			type		: 'FORM_TYPE_label',
			interaction_type	: o.GG.ST.INTERACTION_TYPE_write,
			
			storage		:
			{
				part_id	: 'editor_static_part',
			}
		},
		{
			id			: 'ED80_EDITOR_undo_steps_total',
			type		: 'FORM_TYPE_label',
			interaction_type	: o.GG.ST.INTERACTION_TYPE_write,
			
			storage		:
			{
				part_id	: 'editor_static_part',
			}
		},
		{
			id			: 'ED80_EDITOR_undo_step_no',
			type		: 'FORM_TYPE_label',
			interaction_type	: o.GG.ST.INTERACTION_TYPE_write,
			
			storage		:
			{
				part_id	: 'editor_static_part',
			}
		},
		{
			id			: 'ED80_EDITOR_pixel_ratio',
			type		: 'FORM_TYPE_label',
			interaction_type	: o.GG.ST.INTERACTION_TYPE_write,
			
			storage		:
			{
				part_id	: 'editor_static_part',
			}
		},
		{
			id			: 'ED80_EDITOR_zoom',
			type		: 'FORM_TYPE_label',
			interaction_type	: o.GG.ST.INTERACTION_TYPE_write,
			
			storage		:
			{
				part_id	: 'editor_static_part',
			}
		},
		//------------------------------------------

		//------------------------------------------
		// ITEM GUI MIRRORS
		//------------------------------------------
		{
			id			: 'ED80_ITEM_id',
			type		: 'FORM_TYPE_input_text',
			
			storage		:
			{
				key		: 'id',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_ITEM_value',
			type		: 'FORM_TYPE_textarea',
			
			storage		:
			{
				key		: 'value',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_ITEM_x',
			type		: 'FORM_TYPE_input_text',
			TREF		: {	T : 'number', },
			
			storage		:
			{
				key		: 'x',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_ITEM_y',
			type		: 'FORM_TYPE_input_text',
			TREF		: {	T : 'number', },
			
			storage		:
			{
				key		: 'y',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_ITEM_z',
			type		: 'FORM_TYPE_input_text',
			TREF		: {	T : 'integer', },
			
			storage		:
			{
				key		: 'z',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_ITEM_w',
			type		: 'FORM_TYPE_input_text',
			TREF		: {	T : 'number', },
			
			storage		:
			{
				key		: 'w',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_ITEM_h',
			type		: 'FORM_TYPE_input_text',
			TREF		: {	T : 'number', },
			
			storage		:
			{
				key		: 'h',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_ITEM_class',
			type		: 'FORM_TYPE_input_text',
			
			storage		:
			{
				key		: 'class',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_ITEM_onclick',
			type		: 'FORM_TYPE_input_text',
			
			storage		:
			{
				key		: 'onclick',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_ITEM_tag_raw_text',
			type		: 'FORM_TYPE_textarea',
			
			storage		:
			{
				key		: 'tag_raw_text',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_ITEM_font_h',
			type		: 'FORM_TYPE_input_text',
			TREF		: {	T : 'number', },
			
			storage		:
			{
				key		: 'font_h',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_ITEM_font',
			type		: 'FORM_TYPE_input_text',
			
			storage		:
			{
				key		: 'font',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_ITEM_storage',
			type		: 'FORM_TYPE_textarea',
			
			storage		:
			{
				key		: 'storage',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_CHECK_ITEM_is_disabled',
			type		: 'FORM_TYPE_input_checkbox',
			
			storage		:
			{
				key		: 'is_disabled',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_CHECK_ITEM_is_hidden',
			type		: 'FORM_TYPE_input_checkbox',
			
			storage		:
			{
				key		: 'is_hidden',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_CHECK_ITEM_is_readonly',
			type		: 'FORM_TYPE_input_checkbox',
			
			storage		:
			{
				key		: 'is_readonly',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_EDITOR_ITEM_description',
			type		: 'FORM_TYPE_label',
			interaction_type	: o.GG.ST.INTERACTION_TYPE_write,
			
			storage		:
			{
				key		: 'description',
				part_id	: 'item_raw_part',
			}
		},
		{
			id			: 'ED80_CHECK_ITEM_interaction_type',
			type		: 'FORM_TYPE_select',
			TREF		: {	T : 'integer', },
			
			storage		:
			{
				key		: 'interaction_type',
				part_id	: 'item_raw_part',
			}
		},

		{
			id			: 'ED80_CHECK_ITEM_tref_T',
			type		: 'FORM_TYPE_select',
			TREF		: {	T : 'string', },
			
			storage		:
			{
				part_id	: 'item_tref_part',
			}
		},
		{
			id			: 'ED80_CHECK_ITEM_tref_R_0',
			type		: 'FORM_TYPE_input_number',
			TREF		: {	T : 'number', },
			
			storage		:
			{
				part_id	: 'item_tref_part',
			}
		},
		{
			id			: 'ED80_CHECK_ITEM_tref_R_1',
			type		: 'FORM_TYPE_input_number',
			TREF		: {	T : 'number', },
			
			storage		:
			{
				part_id	: 'item_tref_part',
			}
		},
		{
			id			: 'ED80_CHECK_ITEM_tref_E',
			type		: 'FORM_TYPE_textarea',
			
			storage		:
			{
				part_id	: 'item_tref_part',
			}
		},
		{
			id			: 'ED80_ITEM_body',
			type		: 'FORM_TYPE_textarea',
			
			storage		:
			{
				key		: 'body',
				part_id	: 'item_raw_part',
			}
		},
		//------------------------------------------
	];
	
	_.each(layout, function(v,k,l)
	{
		var IT = o.GG.ITEM_append_new('layout_editor',v);
	});
}

//------------------------------------------

//------------------------------------------
// GUI DRAW RELATED
//------------------------------------------
function draw_workspace()
{
	var _=_22._,o=BAG;

	draw_layout();
}

/**
DRAW LAYOUT IN EDITOR WINDOW
*/
function draw_layout()
{
	var _=_22._,o=BAG;

	var html = o.GG.LAYOUT_cmd('layout_generate', 'layout_edit');
	canvas_html(o.FORM_PANEL_id, html);
	
	o.GG.LAYOUT_cmd('layout_exchange_values','layout_edit', { is_get_from_gui:false, is_force_static_write:true,  });
	
	//------------------------------------------
	// DO DRAGGABLE
	//------------------------------------------
	var da =
	{
		/*containment: `#${o.FORM_PANEL_id}`,*/
		cancel:				false,
		
		create:	function (event, ui)	{ ELEMENT_drag_gateway('drag_create', ui, event); },
		drag: 	function (event, ui)	{ ELEMENT_drag_gateway('drag_drag', ui, event); },
		start:	function (event, ui)	{ ELEMENT_drag_gateway('drag_start', ui, event); },
		stop:	function (event, ui)	{ ELEMENT_drag_gateway('drag_stop', ui, event); },
	};
	if(o.CTX_form().LAYOUT.GRID_is_snap) da.grid = [o.CTX_form().LAYOUT.GRID_step_xy, o.CTX_form().LAYOUT.GRID_step_xy];
	
	var ra =
	{
		/*containment: `#${o.FORM_PANEL_id}`,*/

		create:	function (event, ui)	{ ELEMENT_drag_gateway('resize_create', ui, event); },
		drag:	function (event, ui)	{ ELEMENT_drag_gateway('resize_resize', ui, event); },
		start:	function (event, ui)	{ ELEMENT_drag_gateway('resize_start', ui, event); },
		stop:	function (event, ui)	{ ELEMENT_drag_gateway('resize_stop', ui, event); },
	};
	
	// http://jsfiddle.net/roylee0704/7WVwN/
	// http://jsfiddle.net/phpdeveloperrahul/6SF2v/
	var E = $(`.ED80_item_draggable_wrapper_stub`);
	E.draggable(da);
	if(o.CFG.WS['EDITOR_is_mode_resizable']) E.resizable(ra);
	//------------------------------------------
}


//------------------------------------------

/**
ONE POINT. ITEMS FILEDS <-> GUI

UPDATE FIELDS CASES:
GUI -> ITEM
GUI -> FORM
GUI -> EDITOR

part_id CASES:
editor_raw_part	=:= DIRECT GUI<->EDITOR VALUE
item_raw_part	=:= DIRECT GUI<->ITEM VALUE
form_raw_part	=:= DIRECT GUI<->FORM VALUE
composite_part	=:= NEED PROCESSING
*/
function EXHANGE_values_gui(part_id, is_get_from_gui, IT)
{
	// IT =:= EDITING ITEM

	var _=_22._,o=BAG;
	var CTX = o.CTX_form();
	var ECTX = o.CTX_editor();
	var IT_ = ECTX.MAP_id_item;

	if(is_get_from_gui)
	{
		o.GG.LAYOUT_cmd('layout_exchange_values','layout_editor',true);
	}
	else
	{
		//------------------------------------------
		// STATIC GUI LABELS
		//------------------------------------------
		var m = measure_screen_sizes();
		IT_['ED80_EDITOR_items_total'].value		= LEN(CTX.LAYOUT.ITEMS);
		IT_['ED80_EDITOR_undo_steps_total'].value	= LEN(o.state_storage);
		IT_['ED80_EDITOR_undo_step_no'].value		= o.state_position;
		IT_['ED80_EDITOR_pixel_ratio'].value		= m.devicePixelRatio;
		IT_['ED80_EDITOR_zoom'].value				= m.zoom;
		//------------------------------------------
	}
	
	var ITEMS = ECTX.LAYOUT.ITEMS;
	_.each(ITEMS, function(v,k,l)
	{
		//------------------------------------------
		// FILTER ELEMENTS
		switch(true)
		{
			// SKIP ELEMENT'S IF NO ITEM PASSED
			case (v.storage.part_id == 'item_raw_part') || (v.storage.part_id == 'item_tref_part'):
				if(!IT) return;
			break;
			
			// FILTER ELEMENTS BY part_id IF IT PASSED
			case (part_id != null) && (v.storage.part_id != part_id):
			return;
		}
		//------------------------------------------

		//------------------------------------------
		// CUSTOM CORRECTION
		//------------------------------------------
		switch(true)
		{
			// CHECKBOX MUST BE boolean IN ITEM, BUT 'true' OR 'false' IN GUI FIELD
			case IT && IT.type == 'FORM_TYPE_input_checkbox' && v.id == 'ED80_ITEM_value':
				if(is_get_from_gui) v.value = v.value == 'true' || v.value == '1';
				else v.value = IT.value ? 'true':'false';
			break;
		}
		//------------------------------------------
		
		//------------------------------------------
		// PROCESS ELEMENTS USE part_id
		switch(v.storage.part_id)
		{
			case 'editor_static_part':
			break;
			
			case 'editor_raw_part':
				if(is_get_from_gui) o.CFG.WS[v.storage.key] = v.value;
				else v.value = o.CFG.WS[v.storage.key];
			break;
			
			case 'item_raw_part':
				if(is_get_from_gui) IT[v.storage.key] = v.value;
				else v.value = IT[v.storage.key];
			break;

			case 'form_raw_part':
				if(is_get_from_gui) CTX.LAYOUT[v.storage.key] = v.value;
				else v.value = CTX.LAYOUT[v.storage.key];
			break;
			
			case 'item_tref_part':
				if(IT)
				{
					switch(v.id)
					{
						case 'ED80_CHECK_ITEM_tref_T':
							switch(true)
							{
								case is_get_from_gui && (v.value == '--'):
									IT.TREF.T = '';
								break;
								case is_get_from_gui:
									IT.TREF.T = v.value;
								break;
								case !is_get_from_gui && !IT.TREF.T:
									v.value = '--';
								break;
								case !is_get_from_gui:
									v.value = IT.TREF.T;
								break;
							}
						break;

						case 'ED80_CHECK_ITEM_tref_R_0':
							switch(true)
							{
								case is_get_from_gui && (v.value == ''):
									IT.TREF.R = null;
								break;
								case is_get_from_gui:
									if(!IT.TREF.R) IT.TREF.R = [];
									IT.TREF.R[0] = v.value;
								break;
								case !is_get_from_gui && !IT.TREF.R:
									v.value = '';
								break;
								case !is_get_from_gui:
									v.value = IT.TREF.R[0];
								break;
							}
						break;
						
						case 'ED80_CHECK_ITEM_tref_R_1':
							switch(true)
							{
								case is_get_from_gui && (v.value == ''):
									IT.TREF.R = null;
								break;
								case is_get_from_gui:
									if(!IT.TREF.R) IT.TREF.R = [];
									IT.TREF.R[1] = v.value;
								break;
								case !is_get_from_gui && !IT.TREF.R:
									v.value = '';
								break;
								case !is_get_from_gui:
									v.value = IT.TREF.R[1];
								break;
							}
						break;
						
						case 'ED80_CHECK_ITEM_tref_E':
							switch(true)
							{
								case is_get_from_gui:
									IT.TREF.E = json_parse(v.value, null);
								break;
								
								case !is_get_from_gui:
									if(IT.TREF.E) v.value = JSON.stringify(IT.TREF.E);
									// AVOID EMPTY ARRAY
									if(!_.isArray(IT.TREF.E) || !IT.TREF.E.length) v.value = '';
								break;
							}
						break;
						
						default:
						break;
					}
				}
			break;
			
			default:
			break;
		}
		//------------------------------------------
	});

	if(!is_get_from_gui)
	{
		o.GG.LAYOUT_cmd('layout_exchange_values','layout_editor',false);
	}
}

/**
DOM ELEMENT <-> ITEM FILEDS
*/
function EXCHANGE_position_gui_item(is_get_from_gui, IT)
{
	var _=_22._,o=BAG;
	
	var EL = $(`#${o.GG.EDITOR_wrapper_prefix}${IT.id}`);
	
	if(!EL)
	{
		LOG('ERR: GUI ELEMENT NOT FOUND. id = ' + IT.id);
		return;
	}
	var xy = EL.offset();

	var EL_parent = $(`#${BAG.FORM_PANEL_id}`);
	var P_xy = EL_parent.offset();
	
	//------------------------------------------
	// CALCULATION
	// https://stackoverflow.com/questions/25197184/get-the-h-of-an-element-minus-padding-margin-border-widths
	// This will not work if element's display is inline.
	// Use inline-block or use getBoundingClientRect()
	
	/*
	var el_raw = EL[0];
	var cs = getComputedStyle(el_raw);

	var paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
	var paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);

	var borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
	var borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

	// Element w and h minus padding and border
	var elementWidth = el_raw.offsetWidth - paddingX - borderX;
	var elementHeight = el_raw.offsetHeight - paddingY - borderY;
	*/
	//------------------------------------------
	
	if(is_get_from_gui)
	{
		IT.x			= parseInt(xy.left - P_xy.left);
		IT.y			= parseInt(xy.top - P_xy.top);
		IT.w			= parseInt(EL.width());
		IT.h			= parseInt(EL.height());
	}
	else
	{
		EL.offset({ left : P_xy.left + IT.x, top : P_xy.top + IT.y });
		EL.width(IT.w);
		EL.height(IT.h);
	}
}

function ELEMENT_drag_gateway(cmd, EL, event)
{
	var _=_22._,o=BAG;

	// https://api.jqueryui.com/draggable/
	// https://api.jqueryui.com/resizable/
	switch(cmd)
	{
		case 'drag_stop':
		case 'resize_stop':
			o.do_save_state();

			var id = event.target.id.substr(LEN(o.GG.EDITOR_wrapper_prefix));
			var IT = o.GG.ITEM_find('layout_edit', id);
			if(!IT)
			{
				events_gateway({ cmd : 'gui_show_error', msg : 'Internal logic error: ELEMENT_drag_gateway#00' });
				break;
			}

			EXCHANGE_position_gui_item(true, IT);
			EXHANGE_values_gui('item_raw_part', false, IT);
			ELEMENT_click(IT);
		break;
	}
}

function ELEMENT_click_unselect_element()
{
	var _=_22._,o=BAG;
	// o.item_selected = null;
	o.item_selected = o.CTX_form().LAYOUT.FORM;
	o.item_last_dom = null;
}

function ELEMENT_click(IT, id)
{
	var _=_22._,o=BAG;
	var LAYOUT = o.CTX_form().LAYOUT;
	
	
	switch(true)
	{
		// CASE: CLICK TO NOT ITEM
		case (IT === null) && (id === null):
			ELEMENT_click_unselect_element();
		return;
		
		case (IT === null):
			IT = o.GG.ITEM_find('layout_edit', id);
		break;
		
		default:
		break;
	}
	
	if(!IT)
	{
		events_gateway({ cmd : 'gui_show_error', msg : 'Internal logic error: ELEMENT_click#00' });
		return;
	}

	//------------------------------------------
	// ACTIVATE ELEMENT
	//------------------------------------------
	var drag_classes = 'ui-corner-all ED80_item_selected_red';
	if(o.item_last_dom)
	{
		$(o.item_last_dom).removeClass(drag_classes);
	}
	
	var EL = $(`#${o.GG.EDITOR_wrapper_prefix}${IT.id}`);
	
	EL.addClass(drag_classes);
	o.item_last_dom = EL;
	
	o.item_selected = IT;
	
	EXHANGE_values_gui('item_raw_part', false, IT);
	//------------------------------------------
}

function event_click_gateway(evt)
{
	var _=_22._,o=BAG;

	switch(evt.node_id)
	{
		case 'ED80_BTN_do_reset_editor':
			storage_value(false, 'CFG', {});
			storage_value(false, 'LAYOUT_edit', {});
			document.location.reload();
		break;
	}
			
	
	var LA_ITEMS = o.CTX_form().LAYOUT.ITEMS;
	
	//------------------------------------------
	// CREATE NEW ELEMENT
	//------------------------------------------
	var __id = evt.node_id.substr(LEN('ED80_'));
	if(_.has(o.GG.ITEMS_defines, __id))
	{
		o.do_save_state();
		
		var IT = o.GG.ITEM_append_new('layout_edit',
		{
			id			: 'id_' + o.CFG.id_generator++,
			type		: __id,
		});

		draw_layout();
		
		ELEMENT_click(IT);
		return;
	}
	//------------------------------------------
	
	var IT = o.GG.ITEM_find('layout_edit', evt.el_raw.id);
	if(IT) ELEMENT_click(IT);
	
	switch(evt.node_id)
	{
		//------------------------------------------
		// ITEM GUI
		//------------------------------------------
		case 'ED80_CHECK_mode_resizable':
		case 'ED80_CHECK_grid_snap':
			evt.node_id = 'ED80_BTN_do_grid_apply';
			event_click_gateway(evt);
		break;
		
		case 'ED80_CHECK_ITEM_is_disabled':
		case 'ED80_CHECK_ITEM_is_hidden':
		case 'ED80_CHECK_ITEM_is_readonly':
		case 'ED80_CHECK_ITEM_interaction_type':
		case 'ED80_CHECK_ITEM_tref_T':
			evt.node_id = 'ED80_BTN_do_apply';
			event_click_gateway(evt);
		break;

		case 'ED80_BTN_Y_up':
		case 'ED80_BTN_Y_down':
		case 'ED80_BTN_X_up':
		case 'ED80_BTN_X_down':
			if(o.GG.ITEM_is_form('layout_edit',o.item_selected)) break;
			if(o.item_selected && (LEN(LA_ITEMS) > 1))
			{
				o.do_save_state();
				var IT = o.item_selected;
				
				var XY =
				{
					'ED80_BTN_Y_up':		[-1,0],
					'ED80_BTN_Y_down':		[+1,0],
					'ED80_BTN_X_up':		[0,+1],
					'ED80_BTN_X_down':		[0,-1],
				};
				
				IT.y += XY[evt.node_id][0];
				IT.x += XY[evt.node_id][1];

				o.GG.LAYOUT_ITEMS_changed('layout_edit');
				draw_layout();
				ELEMENT_click(IT);
			}
		break;
				
		case 'ED80_BTN_Z_up':
		case 'ED80_BTN_Z_down':
		case 'ED80_BTN_Z_top':
		case 'ED80_BTN_Z_end':
			if(o.GG.ITEM_is_form('layout_edit',o.item_selected)) break;
			if(o.item_selected && (LEN(LA_ITEMS) > 1))
			{
				o.do_save_state();
				var IT = o.item_selected;
				
				function swap(arr, from, to)
				{
					arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
				}
				
				switch(evt.node_id)
				{
					case 'ED80_BTN_Z_up':
						if(o.item_selected.z < (LEN(LA_ITEMS)-1))
						{
							swap(LA_ITEMS, o.item_selected.z, o.item_selected.z+1);
						}
					break;
					case 'ED80_BTN_Z_down':
						if(o.item_selected.z > 0)
						{
							swap(LA_ITEMS, o.item_selected.z, o.item_selected.z-1);
						}
					break;
					case 'ED80_BTN_Z_top':
						LA_ITEMS.splice(o.item_selected.z, 1);
						LA_ITEMS.push(IT);
					break;
					case 'ED80_BTN_Z_end':
						LA_ITEMS.splice(o.item_selected.z, 1);
						LA_ITEMS.unshift(IT);
					break;
				}
				
				o.GG.LAYOUT_ITEMS_changed('layout_edit');
				draw_layout();
				ELEMENT_click(IT);
			}
		break;

		case 'ED80_BTN_EL_first':
			if(LEN(LA_ITEMS)) ELEMENT_click(LA_ITEMS[0]);
		break;
		case 'ED80_BTN_EL_last':
			if(LEN(LA_ITEMS)) ELEMENT_click(LA_ITEMS[LEN(LA_ITEMS)-1]);
		break;
		case 'ED80_BTN_EL_prev':
			if(o.GG.ITEM_is_form('layout_edit',o.item_selected)) break;
			if(LEN(LA_ITEMS) && o.item_selected && (o.item_selected.z > 0)) ELEMENT_click(LA_ITEMS[o.item_selected.z-1]);
		break;
		case 'ED80_BTN_EL_next':
			if(o.GG.ITEM_is_form('layout_edit',o.item_selected)) break;
			if(LEN(LA_ITEMS) && o.item_selected && (o.item_selected.z < (LEN(LA_ITEMS)-1))) ELEMENT_click(LA_ITEMS[o.item_selected.z+1]);
		break;

		case 'ED80_BTN_do_apply':
			o.do_save_state();
			EXHANGE_values_gui('item_raw_part', true, o.item_selected);
			draw_layout();
			ELEMENT_click(o.item_selected);
		break;

		case 'ED80_BTN_do_cancel':
			EXHANGE_values_gui(null, false);
		break;

		case 'ED80_BTN_do_clone':
			if(o.GG.ITEM_is_form('layout_edit',o.item_selected)) break;
			
			if(!o.item_selected && LEN(LA_ITEMS)) ELEMENT_click(LA_ITEMS[LEN(LA_ITEMS)-1]);

			if(o.item_selected)
			{
				o.do_save_state();

				var IT = new_clone(o.item_selected);
				IT.id = 'id_' + o.CFG.id_generator++;
				IT.x += 10;
				IT.y += 10;
				LA_ITEMS.push(IT);
				o.GG.LAYOUT_ITEMS_changed('layout_edit');
		
				draw_layout();
				ELEMENT_click(IT);
			}
		break;

		case 'ED80_BTN_do_delete':
			if(o.GG.ITEM_is_form('layout_edit',o.item_selected)) break;
			
			if(!o.item_selected && LEN(LA_ITEMS)) ELEMENT_click(LA_ITEMS[LEN(LA_ITEMS)-1]);
		
			if(o.item_selected)
			{
				o.do_save_state();
				LA_ITEMS.splice(o.item_selected.z, 1);
				o.GG.LAYOUT_ITEMS_changed('layout_edit');
				
				ELEMENT_click_unselect_element();
				draw_layout();
				
				if(LEN(LA_ITEMS)) ELEMENT_click(LA_ITEMS[LEN(LA_ITEMS)-1]);
			}
		break;
		//------------------------------------------

		//------------------------------------------
		// FORM GUI
		//------------------------------------------
		case 'ED80_BTN_do_grid_apply':
			o.do_save_state();
			EXHANGE_values_gui(null, true);
			draw_workspace();
		break;
		
		case 'ED80_BTN_do_grid_cancel':
			EXHANGE_values_gui('form_raw_part', false);
		break;

		case 'ED80_BTN_do_mode_preview':
			o.CTX_form().is_editor_mode = false;
			draw_workspace();
			o.CTX_form().is_editor_mode = true;
		break;

		case 'ED80_BTN_do_mode_edit':
			o.CTX_form().is_editor_mode = true;
			draw_workspace();
		break;

		case 'ED80_BTN_do_layout_clear':
			o.do_save_state();
			LA_ITEMS.length = 0;
			ELEMENT_click_unselect_element();
			draw_workspace();
		break;

		case 'ED80_BTN_do_layout_new':
			evt.node_id = 'ED80_BTN_do_layout_clear';
			event_click_gateway(evt);
		break;

		case 'ED80_BTN_do_from_json':
			var LAYOUT = json_parse($('#ED80_FORM_JSON_textarea').val());
			if(LAYOUT)
			{
				o.do_save_state();
				o.GG.LAYOUT_cmd('layout_assign', 'layout_edit',LAYOUT);
				ELEMENT_click_unselect_element();
				draw_workspace();
			}
			else
			{
				events_gateway({ cmd : 'gui_show_error', msg : 'Error: Form Json incorrect' });
			}
		break;

		case 'ED80_BTN_do_to_json':
			$('#ED80_FORM_JSON_textarea').val(o.GG.LAYOUT_cmd('layout_get_json', 'layout_edit'));
		break;

		case 'ED80_BTN_do_undo':
			o.do_undo();
		break;
		case 'ED80_BTN_do_redo':
			o.do_redo();
		break;

		case 'ED80_FORM_JSON_do_copy':
			evt.node_id = 'ED80_BTN_do_to_json';
			event_click_gateway(evt);
			copyTextToClipboard($('#ED80_FORM_JSON_textarea').val());
		break;
		case 'ED80_FORM_JSON_do_clear':
			$('#ED80_FORM_JSON_textarea').val('').focus();
		break;
		//------------------------------------------
	}
}

async function events_gateway(evt_)
{
	var _=_22._,o=BAG;
	
	evt = _.isString(evt_) ? { cmd:evt_ } : _.extend({}, evt_) ;
	
	switch(evt.cmd)
	{
		case 'init':
			await loadScript2('dist/gui_generator_class.js'); 
			
			/*
			await loadScript2('dist/flowtype.fixed.js');
			window.flowtype = module.exports;
			delete module.exports;
			
			await loadScript2('dist/flowtype.js.js');
			$('body').flowtype();
			*/
			
			//------------------------------------------
			// PREPARE PIECES
			//------------------------------------------
			var gui_pieces = await fetch_api({url : 'gui/gui_pieces.htm', method : 'GET', });
			
			gui_pieces = TextBlockStorageClass.template_items(gui_pieces);
			
			o.gui_i18n['RU'] = TextBlockStorageClass.template_items(gui_pieces['GUI_APP.LANG_RU']);
			o.gui_i18n['EN'] = TextBlockStorageClass.template_items(gui_pieces['GUI_APP.LANG_EN']);
			o.gui_i18n['NEUTRAL'] = TextBlockStorageClass.template_items(gui_pieces['GUI_APP.LANG_NEUTRAL']);
			
			o.gui_i18n = _.mapObject(o.gui_i18n, function(v,k,l){
				return _.object(
					_.filter(_.pairs(v), function(v,k,l){ return _22.us.startsWith(v, 'GUI_APP.'); })
				);
			});
			//------------------------------------------

			o.gui_locale = storage_value(true, 'gui_locale', o.gui_locale);
			
			o.Kv = o.gui_i18n[o.gui_locale];
			o.Kv_NEUTRAL = o.gui_i18n['NEUTRAL'];


			document.open();
			document.write(o.Kv_NEUTRAL['GUI_APP.HTML_PAGE']);
			document.close();

		break;

		case 'init2':
			//------------------------------------------
			// CATCH EVENTS
			//------------------------------------------
			$(document).on('click', guis_events_dispatcher);
			$(document).on('change', guis_events_dispatcher);
			$(document).on('keyup paste focus', guis_events_dispatcher);
			//------------------------------------------
				
			o.init();
			
			_.each(o.Kv['GUI_APP.LAYOUT_TIPS'], function(v,k,l)
			{
				$(`#${k}`).tipso(new_clone(o.Kv_NEUTRAL['GUI_APP.LAYOUT_TIPS_COLORS'], { content : v }));			
			});
			
			//------------------------------------------
			// LOAD LAST LAYOUT
			//------------------------------------------
			var CFG = storage_value(true, 'CFG', o.CFG);
			if(CFG.version == o.CFG.version) o.CFG = CFG;
			
			var LAYOUT = storage_value(true, 'LAYOUT_edit', null);
			if(!LAYOUT || LAYOUT.version != o.GG.LAYOUT_struct.version) LAYOUT = new_clone(o.GG.LAYOUT_struct);
			o.GG.LAYOUT_cmd('layout_assign', 'layout_edit',LAYOUT);

			var CTX = o.CTX_form();
			CTX.is_editor_mode = true;
			
			EXHANGE_values_gui(null, false);
			draw_workspace();
			
			ELEMENT_click(CTX.LAYOUT.FORM);
			EXHANGE_values_gui(null, false);
			
			setInterval(function(){ events_gateway('local_storage_save_layout'); }, o.save_auto_time_ms);
			//------------------------------------------
		break;
		
		case 'local_storage_save_layout':
			storage_value(false, 'CFG', o.CFG);
			storage_value(false, 'LAYOUT_edit', o.CTX_form().LAYOUT);
			events_gateway({ cmd : 'gui_show_info', msg : 'Layout Saved: ' + new Date().getSeconds() });
		break;

		case 'change_gui_locale':
			o.gui_locale = storage_value(false, 'gui_locale', evt.gui_locale);
			document.location.reload();
		break;

// ============================SECTION==================================== 

		case 'static_page':
			canvas_html('gui_layout_content_container', o.Kv[evt.page]);
		break;

// ============================SECTION==================================== 
		/*
		YOU CAN USE static_page EVENT FOR LAYOUTS, BUT IT'S NO GOOD PRACTICE APPLY IT FOR GUI PARTS
		*/
		case 'layout_home':
			canvas_html('gui_layout_content_container', o.Kv['GUI_APP.LAYOUT_HOME']);
		break;

// ============================SECTION==================================== 

		case 'server_info':
		case 'server_error':
			LOG(evt.msg, evt);
		break;

		case 'gui_show_info':
			canvas_html('ED80_EDITOR_info_msg', evt.msg);
		break;
		case 'gui_show_error':
			canvas_html('ED80_EDITOR_error_msg', evt.msg);
			LOG(evt.msg);
		break;

		case 'nop':
		break;
		
// ============================SECTION==================================== 
		case 'click_event':
		{
			var IT = o.CTX_form().LAYOUT.FORM;
			
			IT = IT.id == evt.el_raw.id ? IT : o.GG.ITEM_find('layout_edit',evt.el_raw.id);
			
			if(!IT) IT = o.GG.ITEM_find('layout_edit',evt.el_raw.id.substr(LEN(o.GG.EDITOR_wrapper_prefix)));
			
			if(IT)
			{
				LOG(IT.id);
				ELEMENT_click(IT);
				break;
			}

			LOG(evt.node_id);
			event_click_gateway(evt);
		}
		break;
		
		case 'shortcut_key_event':
		{
			var ACTIONS = 
			[
				// keys : [keyCode, ctrlKey, altKey, shiftKey ]
				{
					do		: 'ED80_BTN_do_delete',
					keys	: [KeyCode.KEY_DELETE, false, false, false],
				},
				{
					do		: 'ED80_BTN_do_clone',
					keys	: [KeyCode.KEY_C, true, false, false],
				},
				{
					do		: 'ED80_BTN_do_undo',
					keys	: [KeyCode.KEY_Z, true, false, false],
				},
				{
					do		: 'ED80_BTN_do_redo',
					keys	: [KeyCode.KEY_Y, true, false, false],
				},
				{
					do		: 'ED80_BTN_Z_top',
					keys	: [KeyCode.KEY_PAGE_UP, false, false, true],
				},
				{
					do		: 'ED80_BTN_Z_end',
					keys	: [KeyCode.KEY_PAGE_DOWN, false, false, true],
				},
				{
					do		: 'ED80_BTN_Z_up',
					keys	: [KeyCode.KEY_PAGE_UP, false, false, false],
				},
				{
					do		: 'ED80_BTN_Z_down',
					keys	: [KeyCode.KEY_PAGE_DOWN, false, false, false],
				},
				{
					do		: 'ED80_BTN_Y_up',
					keys	: [KeyCode.KEY_UP, true, false, false],
				},
				{
					do		: 'ED80_BTN_Y_down',
					keys	: [KeyCode.KEY_DOWN, true, false, false],
				},
				{
					do		: 'ED80_BTN_X_up',
					keys	: [KeyCode.KEY_RIGHT, true, false, false],
				},
				{
					do		: 'ED80_BTN_X_down',
					keys	: [KeyCode.KEY_LEFT, true, false, false],
				},
			];
			
			var oe = evt.original_jquery_event;
			_.some(ACTIONS, function(v,k,l)
			{
				if(
					(oe.keyCode		== v.keys[0])
					&& (oe.ctrlKey	== v.keys[1])
					&& (oe.altKey	== v.keys[2])
					&& (oe.shiftKey	== v.keys[3])
				)
				{
					evt.cmd = 'click_event';
					evt.node_id = v.do;
					event_click_gateway(evt);
					return true;
				}
			});
		}
		break;
// ============================SECTION==================================== 

		default:
		break;
	}
}


// /* kb:Concept:Plugin:Geometry:DetectEvent */
function guis_events_dispatcher(event)
{
	event['__w5e_processed'] = def_val(event['__w5e_processed'], false)
	if(event['__w5e_processed']) return;
	event['__w5e_processed'] = true;

	// jQuery DOG-NAIL FOR SUPPORT ALL BROWSERS
	// jQuery SET event.toElement IN Opera, BUT DON'T SET IN Firefox
	if(!event.toElement && event.originalEvent) event.toElement = event.originalEvent.target;
		
	var el_jq = $(event.toElement);

	var bus_event_cmd = 'click_event';
	
	var is_data_change_event = false;
	var is_click_event = false;
	
	var el_raw = null
	switch(event.type)
	{
		case 'keyup':
		case 'paste':
		case 'focus':
			// 'input:text'
			if(!(el_jq.is('input') || el_jq.is('textarea')))
			{
				if(event.type != 'keyup') return;
				else // SHORTCUTS KEYS
				{
					is_click_event = true;
					bus_event_cmd = 'shortcut_key_event';
				}
			}
		case 'change':
			// event.srcElement MUST BE HERE
			is_data_change_event = true;
			
			el_raw = event.srcElement ? event.srcElement : event.toElement;
			el_raw = el_raw ? el_raw : event.target;
			
			if(get_defined(el_raw['type'], null) == 'select-one') is_click_event = true;
		break;
		
		case 'click':
			is_click_event = true;
			// event.toElement MUST BE HERE
			el_raw = event.toElement;
			
			// IGNORE click EVENTS FOR SELECT, PROCESSING ONLY change
			// OR MAKE SOMETHING LIKE THIS IN select INIT el_raw['process_click'] = true; AND CHECK IT HERE
			if(get_defined(el_raw['type'], null) == 'select-one') return;
		break;

		default:
		return;
	}
	
	if(is_click_event)
	{
		//------------------------------------------
		// DO CLICK CONTEXT
		var bus_event =
		{
			original_jquery_event	: event,
			node_id					: el_raw['id'],
			keys_pressed			: key.getPressedKeyCodes(),
			isTargetBlank			: el_raw['target'] == '_blank', // target HTML ATTRIBUTE
			el_raw					: el_raw,
		};
		bus_event.isControlKeyPressed = bus_event.keys_pressed & KeyCode.KEY_CONTROL;
		bus_event.isNewWindow = (bus_event.isTargetBlank || bus_event.isControlKeyPressed);
		//------------------------------------------
	
		bus_event.cmd = bus_event_cmd;
		events_gateway(bus_event);
	}
	//------------------------------------------
}



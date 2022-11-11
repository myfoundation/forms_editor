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

// https://github.com/jashkenas/underscore/issues/162#issuecomment-99285214
_22._.deepClone = function(obj)
{
	var _=this;
	return (!obj || (typeof obj !== 'object'))?obj:
		(_.isString(obj))?String.prototype.slice.call(obj):
		(_.isDate(obj))?new Date(obj.valueOf()):
		(_.isFunction(obj.clone))?obj.clone():
		(_.isArray(obj)) ? _.map(obj, function(t){return _.deepClone(t)}):
		_.mapObject(obj, function(val, key) {return _.deepClone(val)});
};

function new_clone(mixed_from, merge_with_0 /* merge_with_1, ..., ect */)
{
	var _=_22._;

//	var ret = _22._lo.cloneDeep(mixed_from);
	var ret = _.deepClone(mixed_from);

	var len = LEN(arguments);
	for(var i = 1; i<len; i++) { ret = _22._lo.merge(ret, arguments[i]); }
	return ret;
}

function LOG() { console.log.apply(console, arguments); }

/**
Object, Array, String -> IT'S LENGTH
*/
function LEN(x, def_ret_val)
{
	var _=_22._;
	
	// DO NOT CHANGE RETURN VALUE MUST BE false FOR === CHECK
	if(arguments.length <= 1) def_ret_val = false;
	
	// DON'T CHANGE ORDER ! MORE FREQUENTLY CALLS AT TOP
	if(_.isArray(x) || _.isString(x)) return x.length;
	else if(_.isObject(x)) return _.size(x);
	else return def_ret_val;
}

function json_parse(val, def_ret = false)
{
	try { return JSON.parse(val); }
	catch { return def_ret; }
}

function canvas_html(id, html)
{
	if(LEN(arguments) > 1) $('#' + id).html(html);
	else return $('#' + id).html();
}

function canvas_value(id, value)
{
	if(LEN(arguments) > 1) $('#' + id).val(value);
	else return $('#' + id).val();
}

function storage_value(is_get, id, value)
{
	if(is_get)
	{
		var _r = localStorage.getItem(id);
		try{ _r = JSON.parse(_r).value; }
		catch(e) { _r = value; }
		return _r;
	}
	else localStorage.setItem(id, JSON.stringify({ value : value }));
}

function hidden_property(obj, property)
{
	for (var P of property)
		Object.defineProperty(obj,P,{enumerable: false, writable: true});
}

// /* kb:LangEx:SmallUtils */
function get_defined(x, default_) { var undefined; return x !== undefined ? x:default_; }
// RETURN DEFAULT IF VALUE NOT EXISTS
function def_val(x, default_) { return get_defined(x, default_); }

/**
@packet IS fetch API PACKET + url FIELD
*/
async function fetch_api(packet)
{
	var _=_22._;
	
	var _r = null;
	
	var pk = 
	// Default options are marked with *
	{
		method			: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode			: 'cors', // no-cors, *cors, same-origin
		cache			: 'default', // *default, no-cache, reload, force-cache, only-if-cached
		credentials		: 'same-origin', // include, *same-origin, omit
		headers			:
		{
			// 'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Type'	: 'application/json',
		},
		redirect		: 'follow', // manual, *follow, error
		referrerPolicy	: 'no-referrer', // no-referrer, *client
	};

	if(packet.headers) _.extend(pk.headers, packet.headers);
	_.extend(pk, packet);
	
	
	switch(pk.method)
	{
		case 'POST':
			pk.body			= _.isString(pk.body) ? pk.body : JSON.stringify(pk.body) // body data type must match "Content-Type" header
			pk.cache		= 'no-cache';
		break;

		case 'GET':
		case 'HEAD':
		break;
		
		default:
		break;
	}

	try
	{
		const response = await fetch(pk.url, pk);
		if(!response.ok) throw('ERR: NETWORK ERROR');
		_r = await response.text();
	}
	catch (error)
	{
	  console.error('ERR:', error);
	  throw (error);
	}
	
	return _r;
}

//------------------------------------------
// STATE HELPERS
//------------------------------------------
var StateFuncsClass =
{
	/**
	PATTERN MATCHING
	*/
	CASEN : function(N, state) { var o=this; return o.WOA_N(N, null, null, state); },
	/**
	OPERATIONS: or, without, and
	*/
	STATEN_ : function(N, or = null, without = null, and = null)
	{
		var o=this;
		return o.WOA_N(N, or, without, and);
	},
	WOA_N : function(N, or = null, without = null, and = null)
	{
		// 1
		if(null != without)		N = N & (~without);
		// 2
		if(null != or)			N = N | or;
		// 3
		if(null != and)			N = N & and;
		return N;
	},
}
//------------------------------------------ 
	
//------------------------------------------
// BLOCK OPERATIONS
//------------------------------------------
var TextBlockStorageClass =
{
	//------------------------------------------
	// TEXT BLOCK MARKERS
	st :
	{
		'=Empty'			: 0 << 0,
		'=Json'				: 1 << 1,	// Json
		'=Text'				: 1 << 3,	// DEFAULT
	},
	//------------------------------------------
	
	assigned_text			: '',
	text_blocks				: {},

	spans_descr				:
	{
		uid:			[],
		markers:		[],
		span:			[],
		state:			0,
	},

	get_block_all : function()
	{
		var o=this,_=_22._;
		var k = _.keys(o.text_blocks);
		var v = _.map(k, function(v,k,l) { return o.get_block(v); });
		return _.object(k,v);
	},

	get_block : function(uid, def_ret_val)
	{
		var o=this,_=_22._;
		var st = o.st;
		
		var ret = def_ret_val;

		if(!_.has(o.text_blocks, uid)) return ret;
		
		var sd = o.text_blocks[uid];
		
		for(var i = 0; i < LEN(sd); i+=2)
		{
			var tmp = o.assigned_text.substring(sd[i+0].span[1], sd[i+1].span[0]);
			
			switch(true)
			{
				case !!(sd[i+0].state & st['=Json']):
					tmp = JSON.parse(tmp);
				break;
			}
			
			ret = (i == 0) ? tmp : (ret + tmp);
		}
		
		return ret;
	},
	
	assign_text : function(text)
	{
		var o=this,_=_22._;
		var st = o.st;

		var spans = o.get_spans(text, { rx:'<!--(\\s|\\S)*?-->', opt:'g' });

		spans = _.map(spans, function(v,k,l)
		{
			var sd = new_clone(o.spans_descr);
			sd.span = v;
			
			// SPLIT LINES AND GET IDs & MARKERS
			var chunks = _22.us.clean(text.substring(v[0]+4, v[1]-3)).split(' ');
			_.each(chunks, function(v,k,l)
			{
				if(v[0] == '=') sd.markers.push(v);
				else sd.uid.push(v);
			});

			// SET MARKERS
			_.each(sd.markers, function(v,k,l) { if(_.has(st, v)) sd.state |= st[v]; });
			
			return sd;
		});
		
		// REMOVE ELEMENTS WITH MORE THAN 1 ID
		spans = _.filter(spans, function(v,k,l) { return LEN(v.uid) == 1; });
		// SET ID
		_.each(spans, function(v,k,l) { v.uid = v.uid[0]; });
		
		var tb = _.groupBy(spans, 'uid');
		
		// REMOVE ELEMENTS % 2 (BEGIN, END)
		tb = _.omit(tb, function(v,k,l) { return LEN(v) % 2; });
		
		o.text_blocks = tb;
		o.assigned_text = text;
	},

	//------------------------------------------
	// ENGINE ONE POINT TEXT PIECES STORAGE SERVING
	//------------------------------------------
	// USED FOR CREATE ONE POINT TEXT PIECES STORAGE

	// Единое хранилище текстовых участков (трансформируемых в код, данные, объекты)
	// с доступом по имени (по kлючу)

	// /* kb:Concept:OnePointTextPiecesStorage */ /* kb:Concept:OnePoint */
	template_items : function(body_)
	{
		var storage = new_clone(TextBlockStorageClass);
		storage.assign_text(body_);
		
		return storage.get_block_all();
	},
	//------------------------------------------

	get_spans : function(s, regex)
	{
		var r0 = regex.rx;
		var r1 = regex.opt;
		
		var is_onece = !_22.us.include(r1, 'g');
		
		var re = new RegExp(r0, r1);
		
		var infinity_detector = null;
		var ranges = []; var match = 0;
		while(match = re.exec(s))
		{
			var range = [match.index, re.lastIndex];
			
			// 1. DETECT INIFINITY LOOP
			// CASE: THE SAME EMPTY STRING TWICE FOUND. POSSIBLE INFINITY LOOP
			if((infinity_detector === range[0]) && (range[0] === range[1])) break;
			infinity_detector = range[0];
			
			// 2. PUSH RANGE
			ranges.push(range);
			if(is_onece) break;
		}
		//------------------------------------------
		
		return ranges;
	},
};


function setLocation(curLoc)
{
    try { history.pushState(null, null, curLoc); } catch(e) {}
}


/**
searchParamsAPI('get', 'url', 'param', def_ret_val)
searchParamsAPI('set', 'url', 'param', value)
searchParamsAPI('append', 'url', 'param', value)
searchParamsAPI('delete', 'url', 'param')
*/
function searchParamsAPI(cmd, url_, p0, p1)
{

	var url = new URL(url_);
	var prm = new URLSearchParams(url.search);
	
	var _r;
	
	switch(cmd)
	{
		case 'get':
			_r = prm.get(p0);
			if(_r == null) _r = p1;
		break;

		case 'set':
			prm.set(p0, p1);
			url.search = prm.toString();
			_r = url.href;
		break;
		
		case 'append':
			prm.append(p0, p1);
			url.search = prm.toString();
			_r = url.href;
		break;
		
		case 'delete':
			prm.delete(p0);
			url.search = prm.toString();
			_r = url.href;
		break;
		
		default:
		break;
	}
	
	return _r;
	
	/*
	https://developer.mozilla.org/ru/docs/Web/API/URLSearchParams
	
	var paramsString = "q=URLUtils.searchParams&topic=api"
	var searchParams = new URLSearchParams(paramsString);

	// Итерируем параметры поиска.
	for (let p of searchParams) {  console.log(p); }

	searchParams.has("topic") === true; // true
	searchParams.get("topic") === "api"; // true
	searchParams.getAll("topic"); // ["api"]
	searchParams.get("foo") === null; // true
	searchParams.append("topic", "webdev");
	searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
	searchParams.set("topic", "More webdev");
	searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
	searchParams.delete("topic");
	searchParams.toString(); // "q=URLUtils.searchParams"
	*/
}

function measure_screen_sizes()
{
	const contentWidth = [...document.body.children].reduce( 
		(a, el) => Math.max(a, el.getBoundingClientRect().right), 0) 
		- document.body.getBoundingClientRect().x;

	var _r =
	{
		windowWidth			: document.documentElement.clientWidth,
		windowHeight		: document.documentElement.clientHeight,
		pageWidth			: Math.min(document.body.scrollWidth, contentWidth),
		pageHeight			: document.body.scrollHeight,
		screenWidth			: window.screen.width,
		screenHeight		: window.screen.height,
		pageX				: document.body.getBoundingClientRect().x,
		pageY				: document.body.getBoundingClientRect().y,
		screenX				: -window.screenX,
		screenY				: -window.screenY - (window.outerHeight-window.innerHeight),

		innerWidth			: window.innerWidth,
		innerHeight			: window.innerHeight,
		
		devicePixelRatio	: devicePixelRatio,
		
		zoom				: Math.round((window.outerWidth / window.innerWidth) * 100),
  	};
	
	return _r;
}

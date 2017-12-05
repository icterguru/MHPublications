// +----------------------------------------------------------------------+
// | OpenConf                                                             |
// +----------------------------------------------------------------------+
// | Copyright (c) 2002-2013 Zakon Group LLC.  All Rights Reserved.       |
// +----------------------------------------------------------------------+
// | This source file is subject to the OpenConf License, available on    |
// | the OpenConf web site: www.OpenConf.com                              |
// +----------------------------------------------------------------------+

var oc_transAR = new Array(); // Translation strings

// oc_sprintf - sprintf handler
String.prototype.oc_sprintf = function() {
  var args = arguments;
  return this.replace(/\%(\d+)\$\w/g, function(match, number) { 
  	n = number - 1;
    return typeof args[n] != 'undefined'
      ? args[n]
      : '{' + number + '}'
    ;
  });
};

// popup - displays an informational blurb
var popupObj;
function popup(fldId) {
	if (document.getElementById) {
		var field;
		if (popupObj) { popupObj.close(); }
		if (field = document.getElementById(fldId)) {
			popupObj = window.open('','info','width=300,height=300,menubar=no,location=no,resizable=yes,scrollbars=yes,status=no');
			popupObj.document.write('<html><head><title>Click to Close</title></head><body style="margin:10px; padding:0; font-family: Arial, Helvetica, sans-serif; white-space: pre;" onclick="self.close()"><pre>' + field.innerHTML + '</pre></body></html>');
			popupObj.focus();
		}
	}
}

// oc_checkWordNum - checks textarea field length for # of words
// Note: oc_transAR must be set globally prior to calling
function oc_checkWordNum(fieldID, fieldName, size) {
	var msg = '%1$s field contains %2$d words; limit is %3$d words.';
	var fieldObj = document.getElementById(fieldID);
	var oc_fieldContent = fieldObj.value.replace(/^\s\s*/, "").replace(/\s\s*$/, "").replace(/\s+/g, " ");
	var oc_fieldLength = oc_fieldContent.split(" ").length;
	if (oc_fieldLength > size) {
		alert(oc_transAR[msg].oc_sprintf(fieldName, oc_fieldLength, size));
	}
}

// oc_checkCharNum - checks text field length for # of characters
// Note: oc_transAR must be set globally prior to calling
function oc_checkCharNum(fieldID, fieldName, size) {
	var msg = '%1$s field contains %2$d characters; limit is %3$d characters.';
	var oc_fieldLength = document.getElementById(fieldID).length;
	if (oc_fieldLength > size) {
		alert(oc_transAR[msg].oc_sprintf(fieldName, oc_fieldLength, size));
	}
}

// display show Processing field
function oc_showProcessing() {
	if ( ! document.getElementById) { return; }
	var procdiv = document.getElementById("processing");
	procdiv.style.visibility="visible";
}

// toggle fieldset display
function oc_fsToggle(oc_legend) {
	var oc_fsdiv = document.getElementById(oc_legend.parentNode.id + '_div');
	if (oc_fsdiv.style.display == 'none') {
		oc_fsdiv.style.display = 'block';
		oc_legend.childNodes[1].firstChild.nodeValue = '(hide)';
	} else {
		oc_fsdiv.style.display = 'none';
		oc_legend.childNodes[1].firstChild.nodeValue = '(show)';
	}
}

// collapse/expand all fieldsets (w=0/collapse, w=1/expand)
function oc_fsCollapseExpand(w) {
	var oc_legends = document.getElementsByTagName('legend');
	for (var i=0; i<oc_legends.length; i++) {
		var oc_fsdiv = document.getElementById(oc_legends[i].parentNode.id + '_div');
		if (w == 0) {
			oc_fsdiv.style.display = 'none';
			oc_legends[i].childNodes[1].firstChild.nodeValue = '(show)';
		} else {
			oc_fsdiv.style.display = 'block';
			oc_legends[i].childNodes[1].firstChild.nodeValue = '(hide)';
		}
	}
}
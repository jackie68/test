var common={ 

Select: function (obj) { 
var select = obj, 
option = select.children('option'), 
defalutValue = option.eq(0).html(), 
defaultIndex = 0, 
list = ''; 
for (var i = 0; i < option.length; i++) { 
list += '<li><a data-value="' + option.eq(i).val() + '" href="javascript:;">' + option.eq(i).html() + '</a></li>'; 
if (option.eq(i) [0].selected) { 
defaultIndex = i; 
defalutValue = option.eq(i).html(); 
}; 
}; 
var layout = $('<div class="common_select"><span class="common_select_text">' + defalutValue + '</span><a class="common_select_btn" href="javascript:;"></a><ul>' + list + '</ul></div>'), 
text = layout.find('.common_select_text'), 
btn = layout.find('.common_select_btn'), 
ul = layout.find('ul'), 
li = layout.find('li'), 
a = ul.find('a'); 
if (select.next('.common_select') [0]) { 
select.next('.common_select').remove(); 
}; 
select.hide().after(layout); 
ul.children('li').eq(defaultIndex).hide(); 
if (select[0].disabled) { 
layout.addClass('disabled'); 
} else { 
if (li.length > 1) { 
layout.click(function (e) { 
layout.removeClass('error'); 
if (!ul.is(':visible')) { 
$('.common_select ul').hide(); 
$('.common_select .common_select_btn').removeClass('show'); 
ul.show(); 
btn.addClass('show'); 
e.stopPropagation(); 
$(document).click(function () { 
$('.common_select ul').hide(); 
$('.common_select .common_select_btn').removeClass('show'); 
}); 
} else { 
ul.hide(); 
btn.removeClass('show'); 
} 
}); 
a.click(function (e) { 
e.stopPropagation(); 
text.html($(this).html()); 
for (var i = 0; i < option.length; i++) { 
if (option.eq(i).html() == $(this).html()) { 
select.val(option.eq(i).val()).change(); 
}; 
} 
li.show(); 
$(this).parent('li').hide(); 
ul.hide(); 
btn.removeClass('show'); 
}); 
}; 
}; 
} 
}; 
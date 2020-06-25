
// *** TO BE CUSTOMISED ***

var style_cookie_name = "style" ;
var style_font_cookie_name="stylefont";
var style_cookie_duration = 30 ;

// *** END OF CUSTOMISABLE SECTION ***

function switch_style ( css_title )
{
//alert("pp");
// You may use this script on your site free of charge provided
// you do not remove this notice or the URL below. Script from
// http://www.thesitewizard.com/javascripts/change-style-sheets.shtml
  var i, link_tag ;
  for (i = 0, link_tag = document.getElementsByTagName("link") ;
    i < link_tag.length ; i++ ) {
    if ((link_tag[i].rel.indexOf( "stylesheet" ) != -1) &&
      link_tag[i].title&&(link_tag[i].title=='blue'||link_tag[i].title=='green')) {
      link_tag[i].disabled = true ;
      if (link_tag[i].title == css_title) {
        link_tag[i].disabled = false ;
      //alert("child theme"+css_title);
      }
    }
    set_cookie( style_cookie_name, css_title,
      style_cookie_duration );
  }
}
function switch_style_font ( css_title )
{
// You may use this script on your site free of charge provided
// you do not remove this notice or the URL below. Script from
// http://www.thesitewizard.com/javascripts/change-style-sheets.shtml
  var i, link_tag ;
  for (i = 0, link_tag = document.getElementsByTagName("link") ;
    i < link_tag.length ; i++ ) {
    if ((link_tag[i].rel.indexOf( "stylesheet" ) != -1) &&
      link_tag[i].title&&(link_tag[i].title=='small'||link_tag[i].title=='normal'||link_tag[i].title=='large')) {
      link_tag[i].disabled = true ;
      if (link_tag[i].title == css_title) {
        link_tag[i].disabled = false ;
         
      }
    }
   set_cookie( style_font_cookie_name, css_title,
      style_cookie_duration );
  }
  
 
}

function set_style_from_cookie()
{
  var css_title = get_cookie( style_cookie_name );
  var css_title_font = get_cookie( style_font_cookie_name );
  if (css_title.length) {
    switch_style( css_title );
  }
    //alert("p"+css_title);
  if (css_title_font.length) {
    switch_style_font( css_title_font );
  }
}
function set_cookiep ( cookie_name, cookie_value,
    lifespan_in_days, valid_domain )
{
    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var domain_string = valid_domain ?
                       ("; domain=" + valid_domain) : '' ;
    document.cookie = cookie_name +
                       "=" + encodeURIComponent( cookie_value ) +
                       "; max-age=" + 60 * 60 *
                       24 * lifespan_in_days +
                       "; path=/" + domain_string ;
}

function set_cookie(cname,cvalue,exdays)
{
var d = new Date();
d.setTime(d.getTime()+(exdays*24*60*60*1000));
var expires = "expires="+d.toGMTString();
document.cookie = cname + "=" + cvalue + "; " + expires;
}

function get_cookiep ( cookie_name )
{
    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var cookie_string = document.cookie ;
    
    if (cookie_string.length != 0) {
        var cookie_value = cookie_string.match (
                        '(^|;)[\s]*' +
                        cookie_name +
                        '=([^;]*)' );
        return decodeURIComponent ( cookie_value[2] ) ;
    }
    return '' ;
}

function get_cookie(cname)
{
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++)
  {
  var c = ca[i].trim();
  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
}
if(cname=="style") return "blue";
if(cname=="stylefont") return "normal";
return "";
}

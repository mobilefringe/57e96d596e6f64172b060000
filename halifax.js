
function checkErrorPage(detailObj){
    if (typeof detailObj === "undefined") {
        window.location.replace("/404");
    }
}

function renderRepoTxtMobile(repo_template, repo_txt, repo){
    
    var pathArray = window.location.pathname.split( '/' );
    var slug = pathArray[pathArray.length-1];

    if (slug.length===0 || slug ==="/" ||slug.match(/^\/?home/)){
    
      
        var show = false;
        var item_list = [];
        var repo_template_html = $(repo_template).html();
        Mustache.parse(repo_template_html);   // optional, speeds up future uses
        $.each( repo , function( key, val ) {
            if( val.name == "Special Notice"){
                $.each( val.images , function( key, val ) {
                    var title = val.name.toLowerCase();
                    title = title.trim();
                    
                    if(title.indexOf("special notice") > -1){
                        
                        val.href = '/hours';
                        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || screen.width <= 600) {
                            show= true;
                        }
                        
                        var repo_rendered = Mustache.render(repo_template_html,val);
                        item_list.push(repo_rendered);
                    }
     
                });
            }
        });
        if (show){
            $(repo_txt).show();
            $(repo_txt).html(item_list.join(''));
        }   
    }
}
 function renderRepoTxt(repo_template, repo_txt, repo){
    var show = false;
    var item_list = [];
    var repo_template_html = $(repo_template).html();
    Mustache.parse(repo_template_html);   // optional, speeds up future uses
    $.each( repo , function( key, val ) {
        if( val.name == "Special Notice"){
            $.each( val.images , function( key, val ) {
                var title = val.name.toLowerCase();
                title = title.trim();
                if( title == "holiday hours" ){
                    val.href = '/hours#holiday_hours';
                    show = true;
                    var repo_rendered = Mustache.render(repo_template_html,val);
                    item_list.push(repo_rendered);
                // } else if(title == "special notice"){
                } else if(title.indexOf("special notice") > -1){
                    val.href = '/hours';
                    show= true;
                    var repo_rendered = Mustache.render(repo_template_html,val);
                    item_list.push(repo_rendered);
                }
            });
        }
    });
    if (show){
        $(repo_txt).show();
        $(repo_txt).html(item_list.join(''));
    }
}

function renderSpecialNotice(notice_template, notice_content, repo){
    var show = false;
    var item_list = [];
    var repo_template_html = $(notice_template).html();
    Mustache.parse(repo_template_html);   // optional, speeds up future uses
    $.each( repo , function( key, val ) {
        var title = val.name.toLowerCase();
        if( title == "special notice"){
            $.each( val.images , function( key, val ) {
                var title_two = val.name.toLowerCase();
                // if(title_two == "special notice"){
                if(title_two.indexOf("special notice") > -1){

                    show= true;
                    var repo_rendered = Mustache.render(repo_template_html,val);
                    item_list.push(repo_rendered);
                }
            });
        }
    });
    if (show){
        $(notice_content).show();
        $(notice_content).html(item_list.join(''));
    }
    
}

 function renderBanner(banner_template, home_banner, banners){
    
    var item_list = [];
    var item_rendered = [];
    var banner_template_html = $(banner_template).html();
    Mustache.parse(banner_template_html);   // optional, speeds up future uses
    
    $.each( banners , function( key, val ) {
        today = new Date();
        start = new Date (val.start_date);
       
        start.setDate(start.getDate());
       if(val.url == "" || val.url === null){
           val.css = "style=cursor:default;";
           val.noLink = "return false";
       }
       if (start <= today){
         if (val.end_date){
             end = new Date (val.end_date);
             end.setDate(end.getDate() + 1);
             if (end >= today){
               item_list.push(val);  
             }
             
         } else {
             item_list.push(val);
         }
       }
    });
    $.each( item_list , function( key, val ) {
        var repo_rendered = Mustache.render(banner_template_html,val);
        item_rendered.push(repo_rendered);
       
    });
    $(home_banner).show();
    $(home_banner).html(item_rendered.join(''));
    $('.item').first().addClass('active');
}
   function renderIndicator(indicator_template, home_indicator, repo){
    
    var item_list = [];
    var item_rendered = [];
    var banner_template_html = $(indicator_template).html();
    Mustache.parse(banner_template_html);   // optional, speeds up future uses
    var bannerCount = 0;
    
    
    $.each( repo , function( key, val ) {
           
           
            if (bannerCount == 0){
                val.active_carousel = "active";
            }
            val.slide_number = bannerCount;
            var repo_rendered = Mustache.render(banner_template_html,val);
            item_rendered.push(repo_rendered);
             bannerCount ++;
    });
    
   
    $(home_indicator).show();
    $(home_indicator).html(item_rendered.join(''));
}
function renderingObj(renderItem, templateHtml){
    var item_list = [];
       $.each( renderItem , function( key, val ) {
            var rendered = Mustache.render(templateHtml,val);
            item_list.push(rendered);
        });
        return item_list;
}

function renderPropertyStorePromotionsListTemplate(template_id,template_id_no_image,html_id,not_empty_section_id,empty_section_id,type,promotions){
    var item_list = [];
    var sorted_list = [];
    var toHtml;
    var template_html = $(template_id).html();
    Mustache.parse(template_html);
    
    var template_html_no_image = $(template_id_no_image).html();
    Mustache.parse(template_html_no_image);
    
    $.each( promotions , function( key, val ) {
        localizeObject(val);
        var promotionable_name = "";
        var promotionable_url = "";
        if(val['promotionable_type'] == 'Property' && type == "property" && showOnWeb(val)){
            if(hasImage(val.promo_image_url)){
                val.promo_image_url = getImageURL(val.promo_image_url);
                val.promo_image_url_abs = getAbsoluteImageURL(val.promo_image_url_abs);
                var rendered = Mustache.render(template_html,val);
                item_list.push(rendered);
                
            }else{
                
                var rendered_no_image = Mustache.render(template_html_no_image,val);
                item_list.push(rendered_no_image);
            }  
            
            
    
            
        } else if(val['promotionable_type'] == 'Store'  && type == "store" && showOnWeb(val)){
            var store_details = getStoreDetailsByID(val['promotionable_id']);
            if (store_details){
                localizeObject(store_details);
                val.store = store_details;
                val.promotionable_name = store_details.name;
                val.promotionable_url = "../stores/" + store_details.slug;
            }
            
            if(hasImage(store_details.store_front_url)){
                val.store_img = getImageURL(store_details.store_front_url);
                var rendered = Mustache.render(template_html,val);
                item_list.push(rendered);
            }else{
                var rendered_no_image = Mustache.render(template_html_no_image,val);
                item_list.push(rendered_no_image);
         
            } 
            
        }
    });
    

    if(promotions.length > 0){
        $(not_empty_section_id).show();
        $(empty_section_id).hide();
        $(html_id).html(item_list.join(''));
    }else{
        $(not_empty_section_id).hide();
        $(empty_section_id).show();
    }
}



function renderEventsWithImgTemplate(template_id,html_id,not_empty_section_id,empty_section_id,events, type){
    var item_list = [];
    var sorted_list = [];
    var template_html = $(template_id).html();
    Mustache.parse(template_html);   // optional, speeds up future uses

    $.each( events , function( key, val ) {

        if(($.inArray(type, val.tags) != -1) && showOnWeb(val)){
            if(hasImage(val.event_image_url)){
                val.event_image_url = getImageURL(val.event_image_url);
                val.event_image_url_abs = getAbsoluteImageURL(val.event_image_url_abs);
        
            }else{
                if(type=="development" || type=="news"){
                    val.show = 'display:none';
                }else{
                    val.show = '';
                }
                val.event_image_url =  "//codecloud.cdn.speedyrails.net/sites/5438407c6e6f64462d020000/d17d8c90fe9a800df686233fab0e6569/default.jpg";
                 
            }
            item_list.push(val);        
        }
    });
     item_list.sort(sortByWebDate);
    
      $.each( item_list , function( key, val ) {
            var rendered = Mustache.render(template_html,val);
            sorted_list.push(rendered);
      });
      
   // console.log(sorted_list);
    if(sorted_list.length > 0){
        $(not_empty_section_id).show();
        $(empty_section_id).hide();
        $(html_id).html(sorted_list.join(''));
    }else{
        $(not_empty_section_id).hide();
        $(empty_section_id).show();
    }
}
   
    
function renderStoreWithImgTemplate(template_id,html_id,not_empty_section_id,empty_section_id,promotions){
    var item_list = [];
    var template_html = $(template_id).html();
    Mustache.parse(template_html);

    
    $.each( promotions , function( key, val ) {
        localizeObject(val);
        var promotionable_name = "";
        var promotionable_url = "";
      if(val['promotionable_type'] == 'Store' && showOnWeb(val)){
            var store_details = getStoreDetailsByID(val['promotionable_id']);
            if (store_details){
                localizeObject(store_details);
                val.store = store_details;
                val.promotionable_name = store_details.name;
                val.promotionable_url = "../stores/" + store_details.slug;
            }
            
            if(hasImage(store_details.store_front_url)){
                val.store_img = getImageURL(store_details.store_front_url);
            }else{
                val.store_img = changeStoreImgUrl(store_details);
  
            }
          var rendered = Mustache.render(template_html,val);
        item_list.push(rendered);
      }    
    });
    if(promotions.length > 0){
        $(not_empty_section_id).show();
        $(empty_section_id).hide();
        $(html_id).html(item_list.join(''));
    }else{
        $(not_empty_section_id).hide();
        $(empty_section_id).show();
    }
}

 function renderSpotted(spotted_template, not_empty_section_id, empty_section_id,repo){
    var item_list = [];
    var sorted_list = [];
    var spotted_template_html = $(spotted_template).html();
    Mustache.parse(spotted_template_html);   // optional, speeds up future uses

    $.each( repo , function( key, val ) {
        if( val.name == "spotted"){
            $.each( val.images , function( key, val ) {
                item_list.push(val);
            });
        }
    });
    item_list.sort(sortById);
    $.each( item_list , function( key, val ) {
        
        var repo_rendered = Mustache.render(spotted_template_html,val);
        sorted_list.push(repo_rendered);
    });
    
    
   // var lightBox="<div id='lightbox' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='myLargeModalLabel' aria-hidden='true'><div class='modal-dialog'><button type='button' class='close hidden' data-dismiss='modal' aria-hidden='true'>×</button><div class='modal-content'><div class='modal-body'><img src='' alt='' /></div></div></div></div>";
    var a = sorted_list.join('') ;
    if(repo.length > 0){
        $(not_empty_section_id).show();
        $(empty_section_id).hide();
        $(not_empty_section_id).html(a);
    }else{
        $(not_empty_section_id).hide();
        $(empty_section_id).show();
    }
}
     
     
  function makeEventsPromotions(events, promotions){
        var item_list=[];
        $.each( events , function( key, val ) {
            val.type = 'event';
            item_list.push(val);
        });
        $.each( promotions , function( key, val ) {
            val.type = 'promotion';
            item_list.push(val);
        });
        item_list.sort(sortEventsPromotionsByDate);
        return item_list;
    }
    
    function sortById(a, b){
               
        var aId = a.id;
        var bId = b.id;
        
        return ((aId > bId ) ? -1 : ((aId < bId) ? 1 : 0));
    }
    function sortEventsPromotionsByDate(a, b){
       
        var aDate = a.start_date;
        var bDate = b.start_date;
        
        return ((aDate > bDate) ? -1 : ((aDate < bDate) ? 1 : 0));
    }
    
    function renderEventsPromotions(event_template_id, promo_template_id, promo_template_id_no_image, property_template_id,html_id,not_empty_section_id,empty_section_id,events_promotions){
        var item_list = [];
        var event_template_html = $(event_template_id).html();
        Mustache.parse(event_template_html);   // optional, speeds up future uses
  
        
        var promo_template_html = $(promo_template_id).html();
         Mustache.parse(promo_template_html); 

         
         var property_template_html = $(property_template_id).html();
         Mustache.parse(property_template_html); 
         
         var promo_template_html_no_image = $(promo_template_id_no_image).html();
             Mustache.parse(promo_template_html_no_image); 
             
        $.each( events_promotions , function( key, val ) {
            if( val.type == "event" && showOnWeb(val)){
                if(($.inArray('news', val.tags) != -1) || ($.inArray('development', val.tags) != -1)){
                   if(hasImage(val.event_image_url)){
                        val.event_image_url = getImageURL(val.event_image_url);
                        var rendered = Mustache.render(property_template_html,val);
                        item_list.push(rendered);
                    }else{
                        var rendered_no_image = Mustache.render(promo_template_html_no_image,val);
                        item_list.push(rendered_no_image);
                    }  
                }else{
                    if(hasImage(val.event_image_url)){
                        val.event_image_url = getImageURL(val.event_image_url);
                    }else{
                        val.event_image_url =  "//codecloud.cdn.speedyrails.net/sites/5438407c6e6f64462d020000/d17d8c90fe9a800df686233fab0e6569/default.jpg";
                    }
                    var rendered = Mustache.render(event_template_html,val);
                    item_list.push(rendered);
                }
              
            } else if(val.type == "promotion" && showOnWeb(val)){
               var promotionable_name = "";
                var promotionable_url = "";
                if(val['promotionable_type'] == 'Store'){
                     var store_details = getStoreDetailsByID(val['promotionable_id']);
                    if (store_details){
                        localizeObject(store_details);
                        val.store = store_details;
                        val.promotionable_name = store_details.name;
                        val.promotionable_url = "../stores/" + store_details.slug;
                    }
                    
                    if(hasImage(store_details.store_front_url)){
                        val.store_img = getImageURL(store_details.store_front_url);
                    }else{
                        val.store_img = "//codecloud.cdn.speedyrails.net/sites/5438407c6e6f64462d020000/d17d8c90fe9a800df686233fab0e6569/default.jpg";
          
                    }
                    var rendered = Mustache.render(promo_template_html,val);
                    item_list.push(rendered);
                } 
            }
        });
        if(events_promotions.length > 0){
            $(not_empty_section_id).show();
            $(empty_section_id).hide();
            $(html_id).html(item_list.join(''));
        }else{
            $(not_empty_section_id).hide();
            $(empty_section_id).show();
        }
    }     
     
  
function renderAnyEventDetailsTemplate(template_id,html_id,event_details){
    //console.log(store_slug);
    var template_html = $(template_id).html();
    //console.log(template_html);
    Mustache.parse(template_html);   // optional, speeds up future uses
    //console.log(store_details);
    localizeObject(event_details);
    event_details.event_image_url = getImageURL(event_details.event_image_url);
    event_details.event_image_url_abs = getAbsoluteImageURL(event_details.event_image_url_abs);

        
        
    var rendered = Mustache.to_html(template_html,event_details);
    //console.log(rendered);
    $(html_id).html(rendered);
}      

function sortById(a, b){
    var aId = a.id;
    var bId = b.id;

    return ((aId > bId) ? -1 : ((aId < bId) ? 1 : 0));  
}
function sortByWebDate(a, b){
       
    var aDate = a.show_on_web_date;
    var bDate = b.show_on_web_date;

    return ((aDate > bDate) ? -1 : ((aDate < bDate) ? 1 : 0));
}

function sortByDate(a, b){
       
    var aDate = a.publish_date;
    var bDate = b.publish_date;

    return ((aDate > bDate) ? -1 : ((aDate < bDate) ? 1 : 0));
}

function changeStoreImgUrl(storeObj){
    if(storeObj.store_front_url.indexOf("/store_fronts/original/missing.png") > -1 ){
     
       return "//codecloud.cdn.speedyrails.net/sites/5438407c6e6f64462d020000/d17d8c90fe9a800df686233fab0e6569/default.jpg";
    } else {
         return "//assets.mallmaverick.com" + storeObj.store_front_url;
    }
}
function dateToString(dateString){
    var datePart = dateString.split('T');
    var dateItem = datePart[0].split('-');
    var dateFormat = new Date(dateItem[0], dateItem[1]-1, dateItem[2]);
  
    return dateFormat.toDateString();
}
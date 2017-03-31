function renderStoreList(container, template, collection, starter, breaker){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    var store_initial="";
    $.each( collection , function( key, val ) {
        
        if(!val.store_front_url ||  val.store_front_url.indexOf('missing.png') > -1 || val.store_front_url.length === 0){
            val.alt_store_front_url = "";
        } else {
            val.alt_store_front_url = getImageURL(val.store_front_url);    
        }
            
        //var categories = getStoreCategories();
        var current_initial = val.name[0];
        val.cat_list = val.categories.join(',')
        if(store_initial.toLowerCase() == current_initial.toLowerCase()){
            val.initial = "";
            val.show = "display:none;";
        }
        else{
            val.initial = current_initial;
            store_initial = current_initial;
            val.show = "display:block;";
        }
        if (val.promotions.length > 0){
            val.promotion_exist = "display:inline-block";
        }
        else{
            val.promotion_exist = "display:none";
        }
        if (val.jobs.length > 0){
            val.job_exist = "display:inline-block";
        }
        else{
            val.job_exist = "display:none";
        }
        val.block = current_initial + '-block';
        var rendered = Mustache.render(template_html,val);
        var upper_current_initial = current_initial.toUpperCase();
        if (upper_current_initial.charCodeAt(0) <= breaker.charCodeAt(0) && upper_current_initial.charCodeAt(0) >= starter.charCodeAt(0)){
            item_rendered.push(rendered);
        }
         

    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderGeneral(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        var repo_rendered = Mustache.render(template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(container).html(item_rendered.join(''));
}


function renderStoreDetails(container, template, collection, slug){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if ((val.store_front_url).indexOf('missing.png') > -1){
            val.alt_store_front_url = "http://assets.codecloudapp.com/sites/57e96d596e6f64172b060000/image/png/1486678177000/pen.png";
        } else {
            val.alt_store_front_url = getImageURL(val.store_front_url); 
        }
        
        if (val.website != null && val.website.length > 0){
            val.show = "display:block";
        }
        else{
            val.show = "display:none";
        }
        if (val.phone != null && val.phone.length > 0){
            val.phone_show = "display:block";
        }
        else{
            val.phone_show = "display:none";
        }
        
        if (val.twitter != null && val.twitter.length > 0){
            val.twitter_show = "display:inline-block";
        }
        else{
            val.twitter_show = "display:none";
        }
        
        if((val.twitter == null || val.twitter == "") && (val.facebook == "" || val.facebook == null)){
            val.hide_social = "display:none;";
        }
        if (val.facebook != null && val.facebook.length > 0){
            val.facebook_show = "display:inline-block";
        }
        else{
            val.facebook_show = "display:none";
        }
        val.map_x_coordinate = val.x_coordinate - 19;
        val.map_y_coordinate = val.y_coordinate - 58;
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}


function renderPromotions(container, template, collection, centre){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if (val.promotionable_type == "Store") {
            var store_details = getStoreDetailsByID(val.promotionable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.store_show = "display:inline-block";
            val.image_url = val.promo_image_url_abs;
            val.cat_list = store_details.categories.join(',')
            val.store_slug = "/stores/" + store_details.slug
        }
        else{
            val.image_url = "http://assets.codecloudapp.com/sites/57e96d596e6f64172b060000/image/png/1480532253000/PenCentre_logo.png";
            val.store_name = mall_name;
            val.store_slug = "/"
            val.store_show = "display:none;";
        }
        
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_url  = "";
        }
        
        if(val.description.length > 200){
            val.description_short = val.description.substring(0,200) + "...";
        }
        else{
            val.description_short = val.description
        }
        
        var show_date = new Date (val.show_on_web_date + "T04:00:00Z");
        start = new Date (val.start_date + "T04:00:00Z");
        end = new Date (val.end_date + "T04:00:00Z");
    
        if (start.toDateString() == end.toDateString()) {
            val.dates = (get_month(start.getMonth()))+" "+(start.getDate());    
        } else {
            val.dates = (get_month(start.getMonth()))+" "+(start.getDate())+" - "+get_month(end.getMonth())+" "+end.getDate();    
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderPromoDetails(container, template, collection, centre){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        
        if (val.promotionable_type == "Store") {
            var store_details = getStoreDetailsByID(val.promotionable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.store_image = store_details.store_front_url_abs;
            val.store_slug = store_details.slug
            val.store_show = "display:block";
            if (store_details.website != null && store_details.website.length > 0){
                val.show = "display:block";
                val.website = store_details.website
            }
            else{
                val.show = "display:none";
            }
            if (store_details.phone != null && store_details.phone.length > 0){
                val.phone_show = "display:block";
                val.phone = store_details.phone
            }
            else{
                val.phone_show = "display:none";
            }
        }
        else{
            val.store_name = mall_name;
            val.store_image = "http://assets.codecloudapp.com/sites/57e96d596e6f64172b060000/image/png/1480532253000/PenCentre_logo.png";
            val.store_show = "display:none";
            val.phone_show = "display:none";
            val.show = "display:none";
        }
        val.image_url = val.promo_image_url_abs
        
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_url  = "http://assets.codecloudapp.com/sites/56c740936e6f642d56000000/image/png/1456246178000/promo_image.png";
        }
        
        if(val.promo_image_url_abs.indexOf('missing.png') > -1){
            val.promo_image_show="display:none";
        }
        
        var show_date = new Date (val.show_on_web_date + "T04:00:00Z");
        start = new Date (val.start_date + "T04:00:00Z");
        end = new Date (val.end_date + "T04:00:00Z");
    
        if (start.toDateString() == end.toDateString()) {
            val.dates = (get_month(start.getMonth()))+" "+(start.getDate());    
        } else {
            val.dates = (get_month(start.getMonth()))+" "+(start.getDate())+" - "+get_month(end.getMonth())+" "+end.getDate();    
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderEvents(container, template, collection, centre){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if (val.eventable_type == "Store") {
            var store_details = getStoreDetailsByID(val.eventable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.image_url = store_details.store_front_url_abs;
            val.cat_list = store_details.categories.join(',')
        }
        else{
            val.store_name = centre;
            val.image_url = "http://assets.codecloudapp.com/sites/56c740936e6f642d56000000/image/png/1456246178000/promo_image.png";
        }
        
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_url  = "http://assets.codecloudapp.com/sites/56c740936e6f642d56000000/image/png/1456246178000/promo_image.png";
        }
        
        if(val.description.length > 200){
            val.description_short = val.description.substring(0,200) + "...";
        }
        else{
            val.description_short = val.description
        }
        
        if(val.event_image_url_abs.indexOf('missing.png') > -1){
            val.event_image_url_abs="http://assets.codecloudapp.com/sites/56c740936e6f642d56000000/image/png/1456246178000/promo_image.png";
        }
        
        var show_date = new Date (val.show_on_web_date + "T04:00:00Z");
        start = new Date (val.start_date + "T04:00:00Z");
        end = new Date (val.end_date + "T04:00:00Z");
    
        if (start.toDateString() == end.toDateString()) {
            val.dates = (get_month(start.getMonth()))+" "+(start.getDate());    
        } else {
            val.dates = (get_month(start.getMonth()))+" "+(start.getDate())+" - "+get_month(end.getMonth())+" "+end.getDate();    
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderEventDetails(container, template, collection, mall_name){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if (val.eventable_type == "Store") {
            var store_details = getStoreDetailsByID(val.eventable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.store_image = store_details.store_front_url_abs;
            val.store_slug = store_details.slug
            if (store_details.website != null && store_details.website.length > 0){
                val.show = "display:block";
                val.website = store_details.website
            }
            else{
                val.show = "display:none";
            }
            if (store_details.phone != null && store_details.phone.length > 0){
                val.phone_show = "display:block";
                val.phone = store_details.phone
            }
            else{
                val.phone_show = "display:none";
                val.show = "display:none";
            }
        }
        else{
            val.store_name = mall_name;
            val.store_image = "http://assets.codecloudapp.com/sites/57e96d596e6f64172b060000/image/png/1486678177000/pen.png";
            val.store_show = "display:none";
            val.phone_show = "display:none";
            val.show = "display:none";
        }
        val.image_url = val.event_image_url_abs
        
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_url  = "http://assets.codecloudapp.com/sites/56c740936e6f642d56000000/image/png/1456246178000/promo_image.png";
        }
        
        if(val.event_image_url_abs.indexOf('missing.png') > -1){
            val.promo_image_show="display:none";
        }
        
        var show_date = new Date (val.show_on_web_date + "T04:00:00Z");
        start = new Date (val.start_date + "T04:00:00Z");
        end = new Date (val.end_date + "T04:00:00Z");
    
        if (start.toDateString() == end.toDateString()) {
            val.dates = (get_month(start.getMonth()))+" "+(start.getDate());    
        } else {
            val.dates = (get_month(start.getMonth()))+" "+(start.getDate())+" - "+get_month(end.getMonth())+" "+end.getDate();    
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderJobs(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if(val.jobable_type == "Store"){
            val.store_name = getStoreDetailsByID(val.jobable_id).name;
            val.store_slug = getStoreDetailsByID(val.jobable_id).slug;
            val.store_show = "display:block";
        }
        else{
            val.store_name = mall_name;
            val.store_show = "display:none";
        }
        if(val.description.length > 200){
            val.description_short = val.description.substring(0,200) + "...";
        }
        else{
            val.description_short = val.description;
        }
        
        var show_date = new Date (val.start_date + "T04:00:00Z");
        val.published_on = get_month(show_date.getMonth()) + " " + show_date.getDate();
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}


function renderJobDetails(container, template, collection, mall_name){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if(val.jobable_type == "Store"){
            var store_details = getStoreDetailsByID(val.jobable_id);
            val.store_name = store_details.name;
            val.store_image = store_details.store_front_url_abs;
            if (store_details.website != null && store_details.website.length > 0){
                val.show = "display:block";
                val.website = store_details.website
                val.store_slug = store_details.slug
                val.store_show = "display:block";
            }
            else{
                val.show = "display:none";
                val.store_show = "display:none";
            }
            if (store_details.phone != null && store_details.phone.length > 0){
                val.phone_show = "display:block";
                val.phone = store_details.phone
            }
            else{
                val.phone_show = "display:none";
                val.show = "display:none";
            }
        }
        else{
            val.store_name = mall_name;
            val.store_image = "http://assets.codecloudapp.com/sites/57e96d596e6f64172b060000/image/png/1486678177000/pen.png";
            val.store_show = "display:none";
            val.phone_show = "display:none";
            val.show = "display:none";
        }
        if(val.store_image.indexOf('missing.png') > 0){
            val.store_image = "http://assets.codecloudapp.com/sites/57e96d596e6f64172b060000/image/png/1486678177000/pen.png";
        }
        
        var show_date = new Date (val.start_date + "T04:00:00Z");
        val.published_on = get_month(show_date.getMonth()) + " " + show_date.getDate();
    
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderHours(container, template, collection, type){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    if (type == "property_details"){
        item_list.push(collection);
        collection = []
        collection = item_list;
    }
    if (type == "reg_hours") {
        $.each( collection , function( key, val ) {
            if (!val.store_id && val.is_holiday == false) {
                switch(val.day_of_week) {
                case 0:
                    val.day = "Sunday"
                    break;
                case 1:
                    val.day = "Monday"
                    break;
                case 2:
                    val.day = "Tuesday"
                    break;
                case 3:
                    val.day = "Wednesday"
                    break;
                case 4:
                    val.day = "Thursday"
                    break;
                case 5:
                    val.day = "Friday"
                    break;
                case 6:
                    val.day = "Saturday"
                    break;
                
            }
            if (val.open_time && val.close_time && val.is_closed == false){
                var open_time = new Date (val.open_time)
                var close_time = new Date (val.close_time)
                val.open_time = convert_hour(open_time);
                val.close_time = convert_hour(close_time);    
                val.h = val.open_time+ " - " + val.close_time;
            } else {
                "Closed"
            }
                item_list.push(val)
            }
        });
        collection = []
        collection = item_list;
    }
    
    if (type == "holiday_hours") {
        $.each( collection , function( key, val ) {
            if (!val.store_id && val.is_holiday == true) {
                holiday = new Date (val.holiday_date)
                holiday.setDate(holiday.getDate()+1);
                var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                val.formatted_date = weekdays[holiday.getDay()]+ " " + get_month(holiday.getMonth()) + " " +holiday.getDate()+ " " + holiday.getFullYear()
                if (val.open_time && val.close_time && val.is_closed == false){
                    var open_time = new Date (val.open_time)
                    var close_time = new Date (val.close_time)
                    val.open_time = convert_hour(open_time);
                    val.close_time = convert_hour(close_time);    
                    if (val.open_time == "0:00 AM"){
                        val.open_time = "12:00 AM"
                    }
                     if (val.close_time == "0:00 AM"){
                        val.close_time = "12:00 AM"
                    }
                    val.h = val.open_time+ " - " + val.close_time;
                } else {
                    val.h = "Closed"
                }
                if (val.h != "Closed"){
                    item_list.push(val)
                }
            }
        });
        collection = []
        collection = item_list;
    }
    
    if (type == "closed_hours") {
        $.each( collection , function( key, val ) {
            if (!val.store_id && val.is_holiday == true) {
                holiday = new Date (val.holiday_date + "T05:00:00Z")
                var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                val.formatted_date = weekdays[holiday.getDay()]+ " " + get_month(holiday.getMonth()) + " " +holiday.getDate()+ " " + holiday.getFullYear()
                if (val.open_time && val.close_time && val.is_closed == false){
                    var open_time = new Date (val.open_time)
                    var close_time = new Date (val.close_time)
                    val.open_time = convert_hour(open_time);
                    val.close_time = convert_hour(close_time);    
                    if (val.open_time == "0:00 AM"){
                        val.open_time = "12:00 AM"
                    }
                     if (val.close_time == "0:00 AM"){
                        val.close_time = "12:00 AM"
                    }
                    val.h = val.open_time+ " to " + val.close_time;
                } else {
                    val.h = "Closed"
                }
                if (val.h == "Closed"){
                    item_list.push(val)
                }
            }
        });
        collection = []
        collection = item_list;
    }
    
    $.each( collection , function( key, val ) {
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);

    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
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
                val.event_image_url =  "http://assets.codecloudapp.com/sites/57e96d596e6f64172b060000/image/png/1486678177000/pen.png";
                 
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


function renderHomeHours(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    item_list.push(collection);    
    $.each( item_list , function( key, val ) {
        val.day = get_day(val.day_of_week);
        var d = new Date();
        val.month = get_month(d.getMonth());
        val.weekday = addZero(d.getDate());
        if (val.open_time && val.close_time && (val.is_closed == false || val.is_closed == null)){
            var open_time = new Date (val.open_time);
            var close_time = new Date (val.close_time);
            val.open_time = convert_hour(open_time);
            val.close_time = convert_hour(close_time);    
            val.h = get_day(d.getDay()) + " " + val.open_time+ " - " + val.close_time;
        } else {
            val.h = "Closed";
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderPosts(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    var counter = 1;
    Mustache.parse(template_html);   // optional, speeds up future uses
    $.each( collection , function( key, val ) {
        if (val.image_url.indexOf('missing.png') > -1) {
            val.post_image = "http://assets.codecloudapp.com/sites/57e96d596e6f64172b060000/image/png/1486678177000/pen.png";
        } else {
            val.post_image = val.image_url;
        }
        if(val.body.length > 100){
            val.description_short = val.body.substring(0,100) + "...";
        }
        else{
            val.description_short = val.body;
        }
        val.description_short = val.description_short.replace("&amp;", "&");
        var date_blog = new Date(val.publish_date);
        val.published_on = get_month(date_blog.getMonth()) + " " + date_blog.getDate() + ", " + date_blog.getFullYear();
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
        counter = counter+1;
    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}


function renderFeatureItems(){
    var items = getFeatureList();
    $.each(items, function(i, val){
        $('#feature_' + i).html('<a href="'+ val.url +'"><img src="'+ val.image_url+'" class="hoverer" alt="' +val.name+ '"><h5 class="center_h">'+ val.name +'</h5></a>')
    })
}

















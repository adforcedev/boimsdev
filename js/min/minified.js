function enablerInitHandler(){$(function(){$("#calculator-results").hide(),$("#calculate").click(function(){if(rent=$("#select-rent").val(),area=$("#select-area").val(),rent&&area){var e=prices[rent];$("#mortgage-value").html(e.mortgageAmount),$("#property-value").html(e.maxPurchase),$("#deposit-amount").html(e.depositAmount),$.getJSON(api_base+"search?callback=?",{apiKey:api_key,format:"json",Page:"1",PageSize:"4",SortColumn:"Price",SortDirection:"desc",MaxPrice:e.maxPurchase,LocalityIds:area,PropertyClassIDs:1},function(e){console.log(e),$.each(e.Properties,function(e){$("#properties ul").append('<img src="'+e.MainPhotoUrl+'" />')}),$("#calculator-form").fadeOut(function(){$("#calculator-results").fadeIn()})})}}),$("#recalculate").click(function(){$("#properties").html(""),$("#calculator-results").fadeOut(function(){$("#calculator-form").fadeIn()})})})}function pageLoadedHandler(){var e=document.createElement("link"),t="http://fonts.googleapis.com/css?family=Lato:400,700";e.setAttribute("rel","stylesheet"),e.setAttribute("type","text/css"),e.setAttribute("href",t)}function adVisibilityHandler(){}function bgExitHandler(){Enabler.exitOverride("Background Exit","http://www.mortgagestore.ie")}var api_key="3AB90338-FFC9-497D-BFD0-8043C92E0B45",api_base="http://www.myhome.ie/api/v3/",prices={300:{maxPurchase:"65787",depositAmount:"6579",mortgageAmount:"59208"},400:{maxPurchase:"87716",depositAmount:"8772",mortgageAmount:"78944"},500:{maxPurchase:"109645",depositAmount:"0965",mortgageAmount:"98681"},600:{maxPurchase:"131574",depositAmount:"3157",mortgageAmount:"118417"},700:{maxPurchase:"153503",depositAmount:"5350",mortgageAmount:"138153"},800:{maxPurchase:"175432",depositAmount:"7543",mortgageAmount:"157889"},900:{maxPurchase:"197361",depositAmount:"9736",mortgageAmount:"177625"},1e3:{maxPurchase:"2192900",depositAmount:"21929",mortgageAmount:"197361"},1100:{maxPurchase:"241219",depositAmount:"4122",mortgageAmount:"217097"},1200:{maxPurchase:"263148",depositAmount:"6315",mortgageAmount:"236833"},13e3:{maxPurchase:"285077",depositAmount:"8508",mortgageAmount:"256570"},1400:{maxPurchase:"307006",depositAmount:"0701",mortgageAmount:"276306"},1500:{maxPurchase:"328935",depositAmount:"2894",mortgageAmount:"296042"},1600:{maxPurchase:"350864",depositAmount:"5086",mortgageAmount:"315778"},1700:{maxPurchase:"372793",depositAmount:"7279",mortgageAmount:"335514"},1800:{maxPurchase:"394722",depositAmount:"9472",mortgageAmount:"355250"},1900:{maxPurchase:"416651",depositAmount:"1665",mortgageAmount:"374986"},2e3:{maxPurchase:"438580",depositAmount:"3858",mortgageAmount:"394722"},2100:{maxPurchase:"460509",depositAmount:"6051",mortgageAmount:"414458"},2200:{maxPurchase:"482438",depositAmount:"82448",mortgageAmount:"434195"},23e3:{maxPurchase:"504367",depositAmount:"0437",mortgageAmount:"453931"},2400:{maxPurchase:"526296",depositAmount:"2630",mortgageAmount:"473667"},2500:{maxPurchase:"548225",depositAmount:"4823",mortgageAmount:"493403"},2600:{maxPurchase:"570154",depositAmount:"7015",mortgageAmount:"513139"},2700:{maxPurchase:"592083",depositAmount:"9208",mortgageAmount:"532875"},2800:{maxPurchase:"614012",depositAmount:"14011",mortgageAmount:"552611"},2900:{maxPurchase:"635942",depositAmount:"3594",mortgageAmount:"572347"},3e3:{maxPurchase:"657871",depositAmount:"5787",mortgageAmount:"592083"}};Enabler.isInitialized()?enablerInitHandler():Enabler.addEventListener(studio.events.StudioEvent.INIT,enablerInitHandler),Enabler.isPageLoaded()?pageLoadedHandler():Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED,pageLoadedHandler),Enabler.isVisible()?adVisibilityHandler():Enabler.addEventListener(studio.events.StudioEvent.VISIBLE,adVisibilityHandler),document.getElementById("bg-exit").addEventListener("click",bgExitHandler,!1);
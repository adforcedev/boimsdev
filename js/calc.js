var api_key = '3AB90338-FFC9-497D-BFD0-8043C92E0B45';
var api_base = 'http://www.myhome.ie/api/v3/';
var prop_url = 'http://property.mortgagestore.ie/';  // + PropertyID


// Property Prices
var prices = {
    300: {
        maxPurchase: '65787',
        depositAmount: '6579',
        mortgageAmount: '59208'
    },
    400: {
        maxPurchase: '87716',
        depositAmount: '8772',
        mortgageAmount: '78944'
    },
    500: {
        maxPurchase: '109645',
        depositAmount: '0965',
        mortgageAmount: '98681'
    },
    600: {
        maxPurchase: '131574',
        depositAmount: '3157',
        mortgageAmount: '118417'
    },
    700: {
        maxPurchase: '153503',
        depositAmount: '5350',
        mortgageAmount: '138153'
    },
    800: {
        maxPurchase: '175432',
        depositAmount: '7543',
        mortgageAmount: '157889'
    },
    900: {
        maxPurchase: '197361',
        depositAmount: '9736',
        mortgageAmount: '177625'
    },
    1000: {
        maxPurchase: '2192900',
        depositAmount: '21929',
        mortgageAmount: '197361'
    },
    1100: {
        maxPurchase: '241219',
        depositAmount: '4122',
        mortgageAmount: '217097'
    },
    1200: {
        maxPurchase: '263148',
        depositAmount: '6315',
        mortgageAmount: '236833'
    },
    13000: {
        maxPurchase: '285077',
        depositAmount: '8508',
        mortgageAmount: '256570'
    },
    1400: {
        maxPurchase: '307006',
        depositAmount: '0701',
        mortgageAmount: '276306'
    },
    1500: {
        maxPurchase: '328935',
        depositAmount: '2894',
        mortgageAmount: '296042'
    },
    1600: {
        maxPurchase: '350864',
        depositAmount: '5086',
        mortgageAmount: '315778'
    },
    1700: {
        maxPurchase: '372793',
        depositAmount: '7279',
        mortgageAmount: '335514'
    },
    1800: {
        maxPurchase: '394722',
        depositAmount: '9472',
        mortgageAmount: '355250'
    },
    1900: {
        maxPurchase: '416651',
        depositAmount: '1665',
        mortgageAmount: '374986'
    },
    2000: {
        maxPurchase: '438580',
        depositAmount: '3858',
        mortgageAmount: '394722'
    },
    2100: {
        maxPurchase: '460509',
        depositAmount: '6051',
        mortgageAmount: '414458'
    },
    2200: {
        maxPurchase: '482438',
        depositAmount: '82448',
        mortgageAmount: '434195'
    },
    23000: {
        maxPurchase: '504367',
        depositAmount: '0437',
        mortgageAmount: '453931'
    },
    2400: {
        maxPurchase: '526296',
        depositAmount: '2630',
        mortgageAmount: '473667'
    },
    2500: {
        maxPurchase: '548225',
        depositAmount: '4823',
        mortgageAmount: '493403'
    },
    2600: {
        maxPurchase: '570154',
        depositAmount: '7015',
        mortgageAmount: '513139'
    },
    2700: {
        maxPurchase: '592083',
        depositAmount: '9208',
        mortgageAmount: '532875'
    },
    2800: {
        maxPurchase: '614012',
        depositAmount: '14011',
        mortgageAmount: '552611'
    },
    2900: {
        maxPurchase: '635942',
        depositAmount: '3594',
        mortgageAmount: '572347'
    },
    3000: {
        maxPurchase: '657871',
        depositAmount: '5787',
        mortgageAmount: '592083'
    }
};

// If true, start function. If false, listen for INIT.
if (Enabler.isInitialized()) {
    enablerInitHandler();
} else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
}


// Utility function to add commas to numbers
function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


function enablerInitHandler() {
    // Start ad, initialize animation,
    // load in your image assets, call Enabler methods,
    // and/or include other Studio modules.

    // jQuery...
    $(function() {

        var rent, area;

        // Hide the results display initially
        $('#calculator-results').hide();

        // Activate the calculate button when both fields have values
        $('#select-rent, #select-area').change(function() {
            rent = $('#select-rent').val();
            area = $('#select-area').val();

            if (rent && area) {
                $('#calculate').removeClass('disabled').removeAttr('disabled');
            }
        });

        // Fetch list of properties from MyHome when user clicks #calculate button
        $('#calculate').click(function(e) {
            // Only continue if values have been selected
            if (rent && area) {
                var price = prices[rent];
                $('#mortgage-value').html('&euro;' + addCommas(price.mortgageAmount));
                $('#property-value').html('&euro;' + addCommas(price.maxPurchase));
                $('#deposit-amount').html('&euro;' + addCommas(price.depositAmount));

                $.getJSON( api_base + 'search?callback=?', {
                    apiKey: api_key,
                    format: 'json',
                    Page: '1',
                    PageSize: '4',
                    SortColumn: 'Price',
                    SortDirection: 'desc',
                    MaxPrice: price.maxPurchase,
                    LocalityIds: area,
                    PropertyClassIDs: 1
                }, function( data ) {

                    console.log(data);

                    var i = 0;
                    $.each(data.Properties, function(key, prop) {
                        if (i == 4) { return false; } i += 1;
                        console.log(prop);
                        $('#properties ul').append('<a href="' + prop_url + prop.PropertyID + '"><img src="' + prop.MainPhotoUrl +'" /><span class="property_view">View</span><span class="property_price">' + prop.Price + '</span></a>');
                    });

                    $('#calculator-form').fadeOut(function() {
                        $('#calculator-results').fadeIn();
                    });

                });
            }

        });

        // Switch back to calculation form when user clicks #recalculate
        $('#recalculate').click(function() {
            $('#calculator-results').fadeOut(function() {
                $('#properties ul').html('');
                $('#calculator-form').fadeIn();
            });
        });

    });
}


// If true, start function. If false, listen for PAGE_LOADED.
if (Enabler.isPageLoaded()) {
    pageLoadedHandler();
} else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED,
pageLoadedHandler);
}

function pageLoadedHandler() {
    // Load in additional assets or add animation/video
		var fileref=document.createElement("link");
		var filename = 'http://fonts.googleapis.com/css?family=Lato:400,700';
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
}


//If true, start function. If false, listen for VISIBLE.
if (Enabler.isVisible()) {
      adVisibilityHandler();
} else {
Enabler.addEventListener(studio.events.StudioEvent.VISIBLE,
adVisibilityHandler);
}

function adVisibilityHandler() {
    // Load in additional assets or start the animation/video
}


function bgExitHandler(e) {
	Enabler.exitOverride('Background Exit', 'http://www.mortgagestore.ie');
}

document.getElementById('bg-exit').addEventListener('click', bgExitHandler, false);

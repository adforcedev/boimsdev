// If true, start function. If false, listen for INIT.
if (Enabler.isInitialized()) {
    enablerInitHandler();
} else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
}

function enablerInitHandler() {
    // Start ad, initialize animation,
    // load in your image assets, call Enabler methods,
    // and/or include other Studio modules.
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
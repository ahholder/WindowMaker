//------------------------------------------------------------------------------------------------------------------------------------------------------
//Global Variables
//------------------------------------------------------------------------------------------------------------------------------------------------------

let overlay;
let board;
let context;
let boardWidth = 1200;
let boardHeight = 700;
let winds = [];

//Intended Additions
//-Check if Helper Text Should be Updated and for Which "Helper" Window
//-Check if Clickable and What Actions to Take if Clicked

//------------------------------------------------------------------------------------------------------------------------------------------------------
//Startup Functions
//------------------------------------------------------------------------------------------------------------------------------------------------------

//Initial Load
window.onload = function () {

    overlay = document.getElementById("contents");
    overlay.width = boardWidth;
    overlay.height = boardHeight;
    //overlay.background-size = "auto";
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    testConcept();
}

//Test the Windows' Proof of Concept
function testConcept() {

    let winPendingId;
    let winTerms;
    let winValues;
    let winStyling;

    //Test #1
    winPendingId = "testA";
    winTerms = ["pos", "br", "brr", "z", "w", "h", "user", "fs", "bg", "txt", "marl", "mart"];
    winValues = ["absolute", "1px solid black", 3, 5, 350, 250, "none", 22, "slategray", "center", 0, 0];
    winStyling = cssMake(winValues, winTerms);
    logWin(overlay, winPendingId, "div", winStyling, ["lightgray", "darkgray"], false, false, true, true);
    makeSupportWin("testA", "title", "Important Info");
    makeSupportWin("testA", "helper", "");
    makeSupportWin("testA", "button", "Accept");
    makeSupportWin("testA", "button", "Decline");

    //Test #2
    winPendingId = "testB";
    winTerms = ["pos", "br", "brr", "z", "w", "h", "user", "fs", "bg", "txt", "marl", "mart"];
    winValues = ["absolute", "1px solid black", 3, 5, 200, 100, "none", 22, "slategray", "center", 0, 0];
    winStyling = cssMake(winValues, winTerms);
    logWin(overlay, winPendingId, "div", winStyling, ["indianred", "darkred"], true, false, true, false);

    //Test #3
    winPendingId = "testC";
    winTerms = ["pos", "br", "brr", "z", "w", "h", "user", "fs", "bg", "txt", "marl", "mart"];
    winValues = ["absolute", "1px solid black", 3, 5, 100, 50, "none", 22, "slategray", "center", 100, 0];
    winStyling = cssMake(winValues, winTerms);
    logWin(document.getElementById("testA"), winPendingId, "div", winStyling, ["lightslategray", "darkslategray"], true, false, true, false);
    styleWin(document.getElementById("testC"), "0px", cssAbb("mart"));

}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//Popup Functions
//------------------------------------------------------------------------------------------------------------------------------------------------------

//Creates a Priority Window
function makePopup(madePop) {
    //Types = Generic, Warning, Resource, GameOver, Power
    let winStyling = "";
    let content = madePop.msg;
    let popType = madePop.type;
    if (canMakePopup == false) return;
    if (popType != 3) {
        content += "\n\n\n(*Click Here to Continue*)";
    } else {
        content += "\n\n(*Click Here to Play Again*)";
    }

    let baseW = taskWindowWidth * 1.4;
    let baseH = taskWindowHeight * 1.4;
    let typeWs = [baseW, baseW * 0.8, baseW * 0.5, baseW, baseW]; //Widths
    let typeHs = [baseH, baseH * 0.8, baseH * 0.5, baseH, baseH]; //Heights
    let popBs = ["red", "red", "red", "red", "red"]; //Border Colors
    let popFs = [18, 24, 32, 40, 40]; //Font Sizes
    let popFCs = ["black", "black", "black", "black", "gold"]; //Font Colors

    let popW = typeWs[popType]; //Width
    let popH = typeHs[popType]; //Height
    let popT = boardHeight - (((boardHeight - popH) / 2) + popH); //Top
    let popL = (boardWidth - popW) / 2; //Left
    let popB = popBs[popType]; //Border Color
    let popP = popH * 0.04; //Top Padding
    let popC = popupColorsOff[popType]; //Background Color
    let popF = popFs[popType]; //Font Size
    let popFC = popFCs[popType]; //Font Color
    popH -= popP;
    interactive(true);
    //Event Window
    winStyling = "position: absolute; border: 3px solid " + popB + "; border-radius: 4px; z-index: 5; left: " + popL + "px; ";
    winStyling += "top:" + popT + "px;";
    winStyling += "width: " + popW + "px; height: " + (popH) + "px; user-select: none; font-size: " + popF + "px; ";
    winStyling += "background:  " + popC + "; text-align: center; color: " + popFC + "; padding-top: " + popP + "px; ";
    popup = createWin(overlay, "popup", "div", winStyling);
    popup.innerText = content;
    popup.addEventListener("mouseover", popIn);
    popup.addEventListener("mouseout", popOut);
    popup.addEventListener("click", popEnd);
}

//Highlights a Popup
function popIn() {
    let box = document.getElementById(this.id);
    box.style["background-color"] = popupColorsOn[currentPop.type];
}

//Un-Highlights a PopUp
function popOut() {
    let box = document.getElementById(this.id);
    box.style["background-color"] = popupColorsOff[currentPop.type];
}

//Ends a Popup
function popEnd() {
    if (gameOver && currentPop.type == 3) {
        clearGame();
        newGame();
    } else {
        let box = document.getElementById(this.id);
        let taskCompleted = false;
        if (currentPop.type == 2) taskCompleted = true;
        popupNext();
        interactive(false);
        box.parentNode.removeChild(box);
        if (taskCompleted == true) {
            //if (eventsQueued <= 0) {
            if (eventsQueued <= 0 || dailyTasks == 1) {
                dayLife();
            } else {
                nextTask();
            }
        }
    }

}

//Queues a Popup Message
function popupQueue(content, type) {
    let newPopup = { "msg": content, "type": type };
    pendingMsgs[eventMsgs] = newPopup;
    eventMsgs += 1;
}

//Recalibrates Popup Queue
function popupNext() {
    if (eventMsgs < 1) return;
    for (let i = 0; i < eventMsgs; i++) {
        if (i != (eventMsgs - 1)) {
            pendingMsgs[i] = pendingMsgs[i + 1];
        }
    }
    eventMsgs -= 1;
}

//Manages Popup Creation
function popupCycle() {
    if (canMakePopup && eventMsgs > 0) {
        makePopup(pendingMsgs[0]);
        currentPop = pendingMsgs[0];
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//Primary Window Functions
//------------------------------------------------------------------------------------------------------------------------------------------------------

//Deletes a Specified Document Element
function clearWin(win) {
    let box = document.getElementById(win);
    let log = checkWinLog(win, false);
    let support;

    if (log.title != false) {
        support = document.getElementById(log.title);
        support.parentNode.removeChild(support);
    }
    if (log.helper != false) {
        support = document.getElementById(log.helper);
        support.parentNode.removeChild(support);
    }
    /*if (log.buttons != false) {
        for (let i = 0; i < log.buttons.length; i++) {
            support = document.getElementById(log.buttons[i]);
            support.parentNode.removeChild(support);
        }
    }*/

    box.parentNode.removeChild(box);
}

//Modifies an Existing Window's CSS Style
function styleWin(win, styling, part) {
    win.style[part] = styling;
}

//Creates and Returns a New Window
function createWin(parent, id, type, styling) {
    let newWindow = parent.appendChild(document.createElement(type));
    newWindow.id = id;
    styleWin(newWindow, styling, "cssText");
    return newWindow;
}

//Determines if px Should be Added After a Number
function addPX(checked, topic) {
    let result = "; ";
    let attempt = isNaN(parseInt(checked));
    if (attempt != true && isException(checked, topic) == false) {
        result = "px" + result;
    }
    return result;
}

//Determines if an Exception Should be Made to Adding px After a Number
function isException(checked, topic) {
    if (checked.toString().includes("px")) return true;
    if (cssAbb(topic) == "z-index") return true;
    if (cssAbb(topic).includes("opacity")) return true;
    return false;
}

//Deduces Abbreviations for Common CSS Terms
function cssAbb(term) {
    if (term == "br") return "border";
    if (term == "brr") return "border-radius";
    if (term == "brt") return "border-top";
    if (term == "brb") return "border-bottom";
    if (term == "brtl") return "border-top-left-radius";
    if (term == "brtr") return "border-top-right-radius";
    if (term == "brbl") return "border-bottom-left-radius";
    if (term == "brbr") return "border-bottom-right-radius";
    if (term == "z") return "z-index";
    if (term == "t") return "top";
    if (term == "l") return "left";
    if (term == "w") return "width";
    if (term == "h") return "height";
    if (term == "c") return "color";
    if (term == "txt") return "text-align";
    if (term == "user") return "user-select";
    if (term == "fs") return "font-size";
    if (term == "pos") return "position";
    if (term == "mar") return "margin";
    if (term == "mart") return "margin-top";
    if (term == "marl") return "margin-left";
    if (term == "pad") return "padding";
    if (term == "padl") return "padding-left";
    if (term == "padt") return "padding-top";
    if (term == "bg") return "background";
    return term;
}

//Creates a Component of CSS Text
function cssCombine(value, term) {
    let result = cssAbb(term) + ": " + value + addPX(value, term);
    return result;
}

//Uses Arrays to Form CSS Text
function cssMake(values, terms) {
    let result = "";
    let cycles = terms.length;
    if (values.length > terms.length) cycles = values.length;

    for (let i = 0; i < cycles; i++) {
        result += cssCombine(values[i], terms[i]);
    }
    return result.toString();
}

//Adds a New Window with Specified Properties to the Global List
function logWin(parent, id, type, styling, colors, hoverable, clickable, centered, canvased) {
    let winNum = winds.length;
    let newWin = createWin(parent, id, type, styling);
    if (colors != "none") styleWin(newWin, colors[1], "background-color");
    let newCanvas = false;

    //Specialized Properties
    if (hoverable) {
        newWin.addEventListener("mouseover", highlight);
        newWin.addEventListener("mouseout", unhighlight);
    }

    if (clickable) {
        newWin.addEventListener("click", clicked);
    }

    if (centered) {
        let area = [getParentInfo(parent,"w"), getParentInfo(parent,"h")];
        //if (parent.width == undefined || parent.height == undefined) {
        //    area = [parent.style.width, parent.style.height];
        //}
        styleWin(newWin, centerWin(newWin.style.width, newWin.style.height, area[0], area[1])[0], "margin-left");
        styleWin(newWin, centerWin(newWin.style.width, newWin.style.height, area[0], area[1])[1], "margin-top");
    }

    if (canvased) {
        let cstyle = [];
        cstyle[0] = ["pos", "br", "bg", "w", "h", "l", "t"];
        cstyle[1] = ["absolute", "none", "none", getParentInfo(newWin, "w"), getParentInfo(newWin, "h"), 0, 0];
        let cstyling = cssMake(cstyle[1], cstyle[0]);
        newCanvas = createWin(newWin, id + "-canvas", "canvas", cstyling);
    }

    //Final
    winds[winNum] = {
        "win": newWin, "id": id, "colors": colors, "hover": hoverable, "title": false, "helper": false, "buttons": false,
        "canvas": newCanvas, "info": ""
    };
    return winds[winNum];
}

//Determines Which Window's Log is Present
function checkWinLog(id, numOnly) {
    for (let i = 0; i < winds.length; i++) {
        if (winds[i].id == id) {
            if (numOnly == false) {
                return winds[i]; //Returns the entire object
            } else {
                return i; //Returns only the object's ID#
            }
        }
    }
}

//Creates Companion Windows for a Primary Window
function makeSupportWin(id, type, text) {
    let winNum = checkWinLog(id, true);
    let parent = winds[winNum].win;
    let parentLog = winds[winNum];
    let winPendingId;
    let winTerms;
    let winValues;
    let winStyling;
    let base = parent;
    let newColors = ["lightgray", "darkgray"];
    let details = [false, false, false, false];
    let newW;
    let newH;

    //Detail Support Window
    if (type == "helper") {
        base = overlay;
        winPendingId = parent.id + "-helper";
        newColors = parentLog.colors;
        newW = getParentInfo(parent, "w");
        newH = getParentInfo(parent, "h");
        winTerms = ["pos", "br", "brr", "z", "w", "h", "user", "fs", "bg", "txt", "marl", "mart"];
        winValues = ["absolute", "1px solid black", 3, 5, newW, newH, "none", 18, newColors[1],
            "center", getParentInfo(parent, "marl"), getParentInfo(parent, "mart")];
    } else if (type == "title") {
        base = overlay;
        winPendingId = parent.id + "-title";
        //newColors = parentLog.colors;
        newColors = ["#171717", "#171717"];
        newW = getParentInfo(parent, "w");
        newH = 38;
        winTerms = ["pos", "br", "brr", "z", "w", "h", "user", "fs", "bg", "txt", "marl", "mart", "opacity", "color", "padt"];
        winValues = ["absolute", "1px solid black", getParentInfo(parent, "brr"), 5, newW, newH, "none", 28, "black",
            "center", getParentInfo(parent, "marl"), getParentInfo(parent, "mart"), 0.9, "white", 2];
    } else {
        details = [true, true, true, false];
        if (winds[winNum].buttons == false) {
            winPendingId = parent.id + "-button" + 0;
        } else {
            winPendingId = parent.id + "-button" + winds[winNum].buttons.length;
        }
        newW = 100;
        newH = 28;
        winTerms = ["pos", "br", "brr", "z", "w", "h", "user", "fs", "bg", "txt", "marl", "mart", "opacity"];
        winValues = ["absolute", "1px solid black", 1, 6, newW, newH, "none", 24, newColors[1],
            "center", 0, 0, 0.9];
    }

    //Create Support Window
    winStyling = cssMake(winValues, winTerms);
    let supportLog = logWin(base, winPendingId, "div", winStyling, newColors, details[0], details[1], details[2], details[3]);
    let supportWin = supportLog.win;
    let modStyle = supportWin.style;
    let supportId = supportWin.id;

    //Update Support Window Logs
    if (type == "helper") {
        winds[winNum].helper = supportId;

        let modMarl = (propMin(modStyle[cssAbb("marl")]) - propMin(modStyle[cssAbb("w")]) * 1.1) + "px";
        styleWin(supportWin, modMarl, cssAbb("marl"));
    } else if (type == "title") {
        winds[winNum].title = supportId;
        supportWin.innerText = text;

        let modMart = (propMin(modStyle[cssAbb("mart")]) - (propMin(modStyle[cssAbb("h")]) + propMin(modStyle[cssAbb("padt")]))) + "px";
        styleWin(supportWin, modMart, cssAbb("mart"));
        styleWin(parent, "0px", cssAbb("brtl"));
        styleWin(parent, "0px", cssAbb("brtr"));
        styleWin(supportWin, "0px", cssAbb("brbl"));
        styleWin(supportWin, "0px", cssAbb("brbr"));
        styleWin(parent, "none", cssAbb("border-top"));
        styleWin(supportWin, "none", cssAbb("border-bottom"));
    } else {
        supportWin.innerText = text;
        let lower = propMin(getParentInfo(parent, "h")) - (10 + newH);

        if (winds[winNum].buttons == false) {
            winds[winNum].buttons = [];
            winds[winNum].buttons[0] = supportId;
            styleWin(document.getElementById(winds[winNum].buttons[0]), lower + "px", cssAbb("mart"));
        } else {
            winds[winNum].buttons[winds[winNum].buttons.length] = supportId;

            //let spacing = propMin(getParentInfo(parent, "w")) / winds[winNum].buttons.length;
            //let buffer = (spacing - newW) / 2;
            let spaces = getSpacing(propMin(getParentInfo(parent, "w")), false, newW, winds[winNum].buttons.length);
            for (let i = 0; i < winds[winNum].buttons.length; i++) {
                let buttonWin = document.getElementById(winds[winNum].buttons[i]);
                //styleWin(buttonWin, ((spacing * i) + buffer) + "px", cssAbb("marl"));
                styleWin(buttonWin, spaces[i] + "px", cssAbb("marl"));
                styleWin(buttonWin, lower + "px", cssAbb("mart"));
                checkWinLog(buttonWin.id, false).info = buttonWin.innerText + "!"; //Placeholder Default Info
                checkWinLog(buttonWin.id, false).helper = parentLog.helper;
            }
        }

    }
}

//Removes Stray Info from Window Properties
function propMin(value) {
    let result = value.replace("px", "");
    result = parseFloat(result);
    return result;
}

//Returns Coordinates for Centering a Window within a Space
function centerWin(winW, winH, areaW, areaH) {
    winW = parseInt(winW);
    winH = parseInt(winH);
    areaW = parseInt(areaW);
    areaH = parseInt(areaH);
    let result = [(areaW / 2 - winW / 2).toString() + "px", (areaH / 2 - winH / 2).toString() + "px"];
    return result;
}

//Gets Valid Information from Parent Window
function getParentInfo(parent, term) {
    term = cssAbb(term);
    let result = parent[term];
    if (result == undefined) {
        result = parent.style[term];
    }
    return result;
}

//Generates an Array of Spacing Based on Given Data
function getSpacing(area, buffer, object, count) {
    let result = [];
    let space;

    if (buffer == false) {
        space = area / (object * count);
        buffer = (area % (object * count)) / (count + 1);
    } else {
        space = (area - (buffer * (count + 1))) / (object * count);
    }

    for (let i = 0; i < count; i++) {
        result[i] = ((space + object) * i) + (buffer * (i+1));
    }
    return result;
}

//Window Interactions for Hovering and Clicking
function highlight() {
    let box = document.getElementById(this.id);
    let wind = checkWinLog(this.id, false);

    //Change Color
    let colors = checkWinLog(this.id, false).colors;
    styleWin(box, colors[0], "background-color");

    //Update Help Text
    if (wind.helper != false) {
        document.getElementById(wind.helper).innerText = wind.info;
    }
}

function unhighlight() {
    let box = document.getElementById(this.id);
    let wind = checkWinLog(this.id, false);

    //Change Color
    let colors = checkWinLog(this.id, false).colors;
    styleWin(box, colors[1], "background-color");

    //Update Help Text
    if (wind.helper != false) {
        document.getElementById(wind.helper).innerText = "";
    }
}

function clicked() {
    let box = document.getElementById(this.id);
    let wind = checkWinLog(this.id, true);

    clickResults(this.id, box, wind);
}

//Applied Results for Clicking -- Program Specific
function clickResults(id, box, wind) {
    console.log("successfully clicked " + id + "!");

    //clearWin("testA"); //Testing
}


//------------------------------------------------------------------------------------------------------------------------------------------------------
//Miscellaneous Functions
//------------------------------------------------------------------------------------------------------------------------------------------------------





//------------------------------------------------------------------------------------------------------------------------------------------------------
//Global Variables
//------------------------------------------------------------------------------------------------------------------------------------------------------

let overlay;
let board;
let context;
let boardWidth = 1200;
let boardHeight = 700;
let winds = [];

let pixes = 3;
let globalAnimationCycle = 0;
let animatedZones = [];
let animationsList = [];
let moverList = [];

let eventQueue = [];
let repeatQueue = [];

let gameActive = true;

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

    addAnimationZone(context);

    newGame();
    testBatch1();
}

//(De)activate User Input
function activate(state) {
    gameActive = state;
}

//Starts a New Program
function newGame() {

    //Final
    requestAnimationFrame(update);
}

//Test Proofs of Concept
function testBatch1() {

    let winPendingId;
    let winTerms;
    let winValues;
    let winStyling;
    let winText;

    //Test Win #1
    winPendingId = "testA";
    winTerms = ["pos", "br", "brr", "z", "w", "h", "user", "fs", "bg", "txt", "marl", "mart"];
    winValues = ["absolute", "5px solid rgba(0,150,255,0.7)", 3, 5, 350, 250, "none", 18, "slategray", "center", 0, 0];
    winStyling = cssMake(winValues, winTerms);
    winText = "\nThis window is centered on its parent object and canvased.\n\nThis window is not clickable or hoverable.";
    logWin(overlay, winPendingId, "div", winStyling, ["#959595", "#909090"], false, false, true, true);
    document.getElementById("testA").innerText = winText;
    makeSupportWin("testA", "title", "Test Instance");
    makeSupportWin("testA", "button", "Animate");
    makeSupportWin("testA", "button", "Move");

}

//Test the Windows' Proof of Concept
function testBatch2() {

    let winPendingId;
    let winTerms;
    let winValues;
    let winStyling;

    //Test Win #1
    winPendingId = "testA";
    winTerms = ["pos", "br", "brr", "z", "w", "h", "user", "fs", "bg", "txt", "marl", "mart"];
    winValues = ["absolute", "1px solid black", 3, 5, 350, 250, "none", 22, "slategray", "center", 0, 0];
    winStyling = cssMake(winValues, winTerms);
    logWin(overlay, winPendingId, "div", winStyling, ["lightgray", "darkgray"], false, false, true, true);
    makeSupportWin("testA", "title", "Important Info");
    makeSupportWin("testA", "helper", "");
    makeSupportWin("testA", "button", "Accept");
    makeSupportWin("testA", "button", "Decline");

    //Test Win #2
    winPendingId = "testB";
    winTerms = ["pos", "br", "brr", "z", "w", "h", "user", "fs", "bg", "txt", "marl", "mart"];
    winValues = ["absolute", "1px solid black", 3, 5, 200, 100, "none", 22, "slategray", "center", 0, 0];
    winStyling = cssMake(winValues, winTerms);
    logWin(overlay, winPendingId, "div", winStyling, ["indianred", "darkred"], true, false, true, false);

    //Test Win #3
    winPendingId = "testC";
    winTerms = ["pos", "br", "brr", "z", "w", "h", "user", "fs", "bg", "txt", "marl", "mart"];
    winValues = ["absolute", "1px solid black", 3, 5, 100, 50, "none", 22, "slategray", "center", 100, 0];
    winStyling = cssMake(winValues, winTerms);
    logWin(document.getElementById("testA"), winPendingId, "div", winStyling, ["lightslategray", "darkslategray"], true, false, true, false);
    styleWin(document.getElementById("testC"), "0px", cssAbb("mart"));

    //Test Win #4
    winPendingId = "testD";
    winTerms = ["pos", "br", "z", "w", "h", "user", "bg", "txt", "marl", "mart"];
    winValues = ["absolute", "none", 5, getRatio(30, true), getRatio(30, false), "none", "none", "center", 15, 300];
    winStyling = cssMake(winValues, winTerms);
    let moveWin = logWin(overlay, winPendingId, "div", winStyling, ["none", "none"], false, false, false, true);
    let moveArt = moveWin.canvas.getContext("2d");
    addAnimationZone(moveArt);

    //Test Win #5
    winPendingId = "testE";
    winTerms = ["pos", "br", "z", "w", "h", "user", "bg", "txt", "marl", "mart"];
    winValues = ["absolute", "none", 5, getRatio(30, true), getRatio(30, false), "none", "none", "center", 300, 15];
    winStyling = cssMake(winValues, winTerms);
    let moveWin2 = logWin(overlay, winPendingId, "div", winStyling, ["none", "none"], false, false, false, true);
    let moveArt2 = moveWin2.canvas.getContext("2d");
    addAnimationZone(moveArt2);

    //Test Win #6
    winPendingId = "testF";
    winTerms = ["pos", "br", "z", "w", "h", "user", "bg", "txt", "marl", "mart", "background-color"];
    winValues = ["absolute", "none", 5, getRatio(60, true), getRatio(60, false), "none", "none", "center", 250, 350, "none"];
    winStyling = cssMake(winValues, winTerms);
    let moveWin3 = logWin(overlay, winPendingId, "div", winStyling, ["none", "none"], false, false, false, true);
    let moveArt3 = moveWin3.canvas.getContext("2d");
    addAnimationZone(moveArt3);

    //Test Move #1
    makeMover(moveWin.win, 100, 800, -200, 1, false);
    makeMover(moveWin2.win, 300, -290, 150, 1, false);

    //Test Animation #1
    let defAnim = [];
    defAnim[0] = ["black", "black", "black", "black", "black"];
    defAnim[1] = ["black", "black", "black", "black", "black"];
    defAnim[2] = ["black", "black", "black", "black", "black"];
    defAnim[3] = ["black", "black", "black", "black", "black"];
    defAnim[4] = ["black", "black", "black", "black", "black"];
    defAnim = makeDrawing(defAnim);
    let anim = [];
    anim[0] = ["black", "skyblue", "skyblue", "skyblue", "black"];
    anim[1] = ["skyblue", "skyblue", "skyblue", "skyblue", "skyblue"];
    anim[2] = ["skyblue", "skyblue", "skyblue", "skyblue", "skyblue"];
    anim[3] = ["skyblue", "skyblue", "skyblue", "skyblue", "skyblue"];
    anim[4] = ["black", "skyblue", "skyblue", "skyblue", "black"];
    anim = makeDrawing(anim);
    let anim2 = [];
    anim2[0] = ["black", "black", "black", "black", "black"];
    anim2[1] = ["black", "black", "skyblue", "black", "black"];
    anim2[2] = ["black", "skyblue", "skyblue", "skyblue", "black"];
    anim2[3] = ["black", "black", "skyblue", "black", "black"];
    anim2[4] = ["black", "black", "black", "black", "black"];
    anim2 = makeDrawing(anim2);
    let anim3 = [];
    anim3[0] = ["skyblue", "black", "black", "black", "skyblue"];
    anim3[1] = ["black", "black", "black", "black", "black"];
    anim3[2] = ["black", "black", "black", "black", "black"];
    anim3[3] = ["black", "black", "black", "black", "black"];
    anim3[4] = ["skyblue", "black", "black", "black", "skyblue"];
    anim3 = makeDrawing(anim3);
    let anim4 = [];
    anim4[0] = ["skyblue", "skyblue", "black", "skyblue", "skyblue"];
    anim4[1] = ["skyblue", "black", "black", "black", "skyblue"];
    anim4[2] = ["black", "black", "black", "black", "black"];
    anim4[3] = ["skyblue", "black", "black", "black", "skyblue"];
    anim4[4] = ["skyblue", "skyblue", "black", "skyblue", "skyblue"];
    anim4 = makeDrawing(anim4);
    let anim5 = [];
    anim5[0] = ["skyblue", "skyblue", "skyblue", "skyblue", "skyblue"];
    anim5[1] = ["skyblue", "skyblue", "black", "skyblue", "skyblue"];
    anim5[2] = ["skyblue", "black", "black", "black", "skyblue"];
    anim5[3] = ["skyblue", "skyblue", "black", "skyblue", "skyblue"];
    anim5[4] = ["skyblue", "skyblue", "skyblue", "skyblue", "skyblue"];
    anim5 = makeDrawing(anim5);

    makeAnimation([anim5, anim4, anim3, anim2, anim, anim2, anim3, anim4], 3, 0, 0, moveArt2, 30, "testAnim2", 30);
    makeAnimation([anim, anim2, anim3, anim4, anim5, anim4, anim3, anim2], -1, 0, 0, moveArt, 30, "testAnim", 60);

    //Test Animation #2
    defAnim = [];
    defAnim[0] = ["none", "none", "none", "none", "none", "none", "none"];
    defAnim[1] = ["none", "none", "none", "none", "none", "none", "none"];
    defAnim[2] = ["none", "none", "none", "none", "none", "none", "none"];
    defAnim[3] = ["none", "none", "none", "none", "none", "none", "none"];
    defAnim[4] = ["none", "none", "none", "none", "none", "none", "none"];
    defAnim[5] = ["none", "none", "none", "none", "none", "none", "none"];
    defAnim[6] = ["none", "none", "none", "none", "none", "none", "none"];
    defAnim = makeDrawing(defAnim);
    anim = [];
    anim[0] = ["none", "none", "none", "black", "none", "none", "none"];
    anim[1] = ["none", "none", "none", "navajowhite", "none", "none", "none"];
    anim[2] = ["none", "purple", "purple", "purple", "purple", "purple", "none"];
    anim[3] = ["none", "purple", "purple", "purple", "purple", "purple", "none"];
    anim[4] = ["none", "navajowhite", "purple", "purple", "purple", "navajowhite", "none"];
    anim[5] = ["none", "none", "purple", "none", "purple", "none", "none"];
    anim[6] = ["none", "none", "brown", "none", "brown", "none", "none"];
    anim = makeDrawing(anim);
    anim2 = [];
    anim2[0] = ["none", "none", "none", "black", "none", "none", "none"];
    anim2[1] = ["none", "none", "none", "navajowhite", "none", "none", "none"];
    anim2[2] = ["none", "purple", "purple", "purple", "purple", "purple", "navajowhite"];
    anim2[3] = ["none", "purple", "purple", "purple", "purple", "none", "none"];
    anim2[4] = ["none", "navajowhite", "purple", "purple", "purple", "none", "none"];
    anim2[5] = ["none", "none", "purple", "none", "purple", "none", "none"];
    anim2[6] = ["none", "none", "brown", "none", "brown", "none", "none"];
    anim2 = makeDrawing(anim2);
    anim3 = [];
    anim3[0] = ["none", "none", "none", "black", "none", "none", "none"];
    anim3[1] = ["none", "none", "none", "navajowhite", "none", "none", "none"];
    anim3[2] = ["none", "purple", "purple", "navajowhite", "purple", "none", "none"];
    anim3[3] = ["none", "purple", "purple", "purple", "purple", "none", "none"];
    anim3[4] = ["none", "navajowhite", "purple", "purple", "purple", "none", "none"];
    anim3[5] = ["none", "none", "purple", "none", "purple", "none", "none"];
    anim3[6] = ["none", "none", "brown", "none", "brown", "none", "none"];
    anim3 = makeDrawing(anim3);
    anim4 = [];
    anim4[0] = ["none", "none", "none", "black", "navajowhite", "none", "none"];
    anim4[1] = ["none", "none", "none", "navajowhite", "purple", "none", "none"];
    anim4[2] = ["none", "purple", "purple", "purple", "purple", "none", "none"];
    anim4[3] = ["none", "purple", "purple", "purple", "purple", "none", "none"];
    anim4[4] = ["none", "navajowhite", "purple", "purple", "purple", "none", "none"];
    anim4[5] = ["none", "none", "purple", "none", "purple", "none", "none"];
    anim4[6] = ["none", "none", "brown", "none", "brown", "none", "none"];
    anim4 = makeDrawing(anim4);
    anim5 = [];
    anim5[0] = ["none", "none", "none", "black", "navajowhite", "none", "none"];
    anim5[1] = ["none", "none", "none", "navajowhite", "purple", "none", "none"];
    anim5[2] = ["none", "purple", "purple", "purple", "purple", "none", "none"];
    anim5[3] = ["none", "purple", "purple", "purple", "purple", "none", "none"];
    anim5[4] = ["none", "navajowhite", "purple", "purple", "purple", "none", "none"];
    anim5[5] = ["none", "none", "purple", "none", "purple", "none", "none"];
    anim5[6] = ["none", "none", "brown", "none", "brown", "none", "none"];
    anim5 = makeDrawing(anim5);

    //makeAnimation([anim, anim, anim2, anim3, anim3, anim3, anim3, anim4, anim4, anim2, anim, anim], -1, 0, 0, moveArt3, 20, "testAnim3", 5);

    //Event Queue Test #1
    queueEvent(1000, console.log, [1000 + " animation frames!"]);
    queueEvent(1000, styleWin, [document.getElementById("testA"), document.getElementById("testA").style["background-color"], "background-color"]);
    queueEvent(30, styleWin, [document.getElementById("testA"), "#603030", "background-color"]);
    queueEvent(90, styleWin, [document.getElementById("testA"), "#306030", "background-color"]);
    queueEvent(120, styleWin, [document.getElementById("testA"), "#303060", "background-color"]);
    queueEvent(600, styleWin, [document.getElementById("testA"), "#303030", "background-color"]);
    queueEvent(800, styleWin, [document.getElementById("testA"), "#606060", "background-color"]);
    queueEvent(360, makeMover, [moveWin2.win, 300, 290, -150, 1, false]);
    queueEvent(20, makeMover, [moveWin3.win, 30, 100, -20, 1, false]);
    queueEvent(50, makeMover, [moveWin3.win, 20, 50, 20, 1, false]);
    queueEvent(110, makeMover, [moveWin3.win, 30, -150, 0, 1, false]);
    queueEvent(1, makeAnimation, [[anim, anim, anim3, anim3, anim4, anim4, anim2, anim2, anim2, anim3, anim3, anim3, anim3, anim3, anim3, anim, anim, anim], 1, 0, 0, moveArt3, 20, "testAnim3", 10]);
    queueEvent(170, makeAnimation, [[anim, anim, anim3, anim3, anim], -1, 0, 0, moveArt3, 20, "testAnim3", 30]);
    //queueEvent(360, makeMover, [moveWin2.win, 300, 290, -150, 1, false]);
    queueEvent(1, activate, [false]);
    queueEvent(600, activate, [true]);

    //Repeat Queue Test #1
    queueRepeat("testR", 60, console.log, ["Hello, World!"]);
    queueEvent(301, removeRepeatQueue, ["testR"]);
    queueEvent(301, console.log, ["Ending Repeat"]);
    //queueEvent(5, console.log, [moveWin3.win.id]);
    //queueEvent(300, console.log, [animatedZones]);
    queueEvent(301, clearWin, [moveWin3.win.id, false]);
    //queueEvent(302, console.log, [animatedZones]);
    //queueEvent(325, console.log, [animatedZones]);

}

//List of Test Animations
function testAns(result) {
    let set = [];
    let c = ["none", "navajowhite","purple","brown","darkgoldenrod", "black", "white"]
    let m = 0;

    //set[m][set[m].length] = ["none", "none", "none", "none", "none", "none", "none", "none"];

    set[m] = [];
    set[m][set[m].length] = [c[0], c[0], c[4], c[4], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[1], c[1], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[2], c[2], c[2], c[2], c[0]];
    set[m][set[m].length] = [c[0], c[1], c[2], c[2], c[1], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[2], c[2], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[3], c[3], c[0], c[0]];

    m += 1;
    set[m] = [];
    set[m][set[m].length] = [c[0], c[0], c[4], c[4], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[1], c[1], c[0], c[0]];
    set[m][set[m].length] = [c[1], c[2], c[2], c[2], c[2], c[1]];
    set[m][set[m].length] = [c[0], c[0], c[2], c[2], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[2], c[2], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[3], c[3], c[0], c[0]];

    m += 1;
    set[m] = [];
    set[m][set[m].length] = [c[0], c[0], c[4], c[4], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[1], c[1], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[2], c[2], c[2], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[1], c[2], c[1], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[2], c[2], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[3], c[3], c[0], c[0]];

    m += 1;
    set[m] = [];
    set[m][set[m].length] = [c[0], c[0], c[4], c[4], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[1], c[1], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[2], c[2], c[2], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[1], c[2], c[1], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[2], c[2], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[3], c[3], c[0], c[0]];

    m += 1;
    set[m] = [];
    set[m][set[m].length] = [c[0], c[0], c[5], c[5], c[5], c[5], c[0], c[0], c[0], c[0]];
    set[m][set[m].length] = [c[5], c[5], c[6], c[6], c[1], c[1], c[5], c[5], c[5], c[0]];
    set[m][set[m].length] = [c[5], c[6], c[6], c[6], c[1], c[1], c[1], c[6], c[6], c[5]];
    set[m][set[m].length] = [c[5], c[6], c[6], c[6], c[1], c[1], c[1], c[6], c[6], c[5]];
    set[m][set[m].length] = [c[0], c[5], c[6], c[6], c[1], c[1], c[1], c[6], c[6], c[5]];
    set[m][set[m].length] = [c[0], c[5], c[6], c[6], c[1], c[1], c[1], c[6], c[5], c[0]];
    set[m][set[m].length] = [c[0], c[5], c[6], c[6], c[1], c[1], c[6], c[6], c[6], c[5]];
    set[m][set[m].length] = [c[0], c[0], c[5], c[6], c[6], c[6], c[6], c[6], c[6], c[5]];
    set[m][set[m].length] = [c[0], c[0], c[0], c[5], c[5], c[6], c[6], c[6], c[6], c[5]];
    set[m][set[m].length] = [c[0], c[0], c[0], c[0], c[0], c[5], c[5], c[5], c[5], c[0]];

    m += 1;
    set[m] = [];
    set[m][set[m].length] = [c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[0], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[5], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[5], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[5], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[5], c[0], c[0]];
    set[m][set[m].length] = [c[5], c[6], c[5], c[5], c[5], c[6], c[6], c[5], c[5], c[5], c[6], c[6], c[6], c[6], c[5], c[0]];
    set[m][set[m].length] = [c[5], c[6], c[6], c[5], c[5], c[6], c[6], c[6], c[5], c[5], c[6], c[5], c[5], c[6], c[6], c[5]];
    set[m][set[m].length] = [c[0], c[5], c[6], c[5], c[6], c[6], c[5], c[6], c[6], c[6], c[6], c[6], c[5], c[5], c[6], c[5]];
    set[m][set[m].length] = [c[0], c[5], c[6], c[6], c[5], c[5], c[6], c[6], c[6], c[5], c[5], c[5], c[6], c[5], c[6], c[5]];
    set[m][set[m].length] = [c[0], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[6], c[5], c[6], c[6], c[6], c[5], c[0]];
    set[m][set[m].length] = [c[0], c[5], c[6], c[5], c[6], c[5], c[6], c[5], c[6], c[5], c[6], c[6], c[6], c[5], c[0], c[0]];
    set[m][set[m].length] = [c[5], c[6], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[6], c[6], c[6], c[5], c[0], c[0], c[0]];
    set[m][set[m].length] = [c[5], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[5], c[5], c[0], c[0], c[0], c[0]];
    set[m][set[m].length] = [c[5], c[6], c[6], c[6], c[6], c[6], c[6], c[5], c[5], c[5], c[0], c[0], c[0], c[0], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[5], c[5], c[5], c[5], c[5], c[5], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0]];

    m += 1;
    set[m] = [];
    set[m][set[m].length] = [c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[0], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[5], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[5], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[5], c[5], c[5], c[5], c[6], c[6], c[5], c[5], c[5], c[6], c[6], c[6], c[5], c[0], c[0]];
    set[m][set[m].length] = [c[5], c[6], c[6], c[5], c[5], c[6], c[6], c[6], c[5], c[5], c[6], c[6], c[6], c[6], c[5], c[0]];
    set[m][set[m].length] = [c[5], c[6], c[6], c[5], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[5], c[5], c[6], c[6], c[5]];
    set[m][set[m].length] = [c[0], c[5], c[6], c[6], c[6], c[6], c[5], c[6], c[6], c[6], c[6], c[6], c[5], c[5], c[6], c[5]];
    set[m][set[m].length] = [c[0], c[5], c[6], c[6], c[5], c[5], c[6], c[6], c[6], c[5], c[5], c[5], c[6], c[5], c[6], c[5]];
    set[m][set[m].length] = [c[0], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[6], c[5], c[6], c[6], c[6], c[5], c[0]];
    set[m][set[m].length] = [c[0], c[5], c[5], c[6], c[5], c[6], c[5], c[6], c[5], c[5], c[6], c[6], c[6], c[5], c[0], c[0]];
    set[m][set[m].length] = [c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[5], c[6], c[6], c[6], c[5], c[0], c[0], c[0]];
    set[m][set[m].length] = [c[5], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[6], c[5], c[5], c[0], c[0], c[0], c[0]];
    set[m][set[m].length] = [c[5], c[6], c[6], c[6], c[6], c[6], c[6], c[5], c[5], c[5], c[0], c[0], c[0], c[0], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[5], c[5], c[5], c[5], c[5], c[5], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0]];
    set[m][set[m].length] = [c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0], c[0]];

    for (let i = 0; i < set.length; i++) {
        /*for (let i2 = 0; i2 < set[i].length; i2++) {
            set[i2] = makeDrawing(set[i2]);
        }*/
        set[i] = makeDrawing(set[i]);
    }

    return set[result];
}

//Test Button Clicks
function testButtonClick(clickedButtonId, id) {
    if (clickedButtonId == 0) {

        let winPendingId = "testB";
        let parent = document.getElementById("testA");
        let newSize = [getRatio(100, true), getRatio(100, false)];
        let elevation = (propMin(parent.style["height"]) - (getRatio(100, false) + 10)) + "px";
        let winTerms = ["pos", "br", "brr", "z", "w", "h", "user", "bg", "txt", "l", "t"];
        let winValues = ["absolute", "none", 3, 5, newSize[0], newSize[1], "none", "none", "center", 0, elevation];
        let winStyling = cssMake(winValues, winTerms);
        let anim = logWin(parent, winPendingId, "canvas", winStyling, ["none", "none"], false, false, false, false);
        let aContext = anim.win.getContext("2d");

        addAnimationZone(aContext);
        let aSlate = [testAns(0), testAns(2), testAns(0), testAns(3)];
        let aSlate2 = [testAns(0), testAns(1), testAns(0), testAns(1)];
        let testAnim = makeAnimation(aSlate, 5, 0, 0, aContext, 15, "testB", 15);
        centerAnim(anim.win, testAnim, parent, true, false, true);

        queueEvent(300, makeAnimation, [aSlate2, 5, 0, 0, aContext, 15, "testB", 15]);
        queueEvent(601, clearWin, [anim.win.id, false]);

    } else {

        let testMoving = "testA";
        let testMovingLog = checkWinLog(testMoving, false);
        queueEvent(1, makeMover, [document.getElementById(testMoving), 120, 150, -50, 1, false]);
        queueEvent(121, makeMover, [document.getElementById(testMoving), 60, -200, 100, 1, false]);
        queueEvent(181, makeMover, [document.getElementById(testMoving), 100, 50, -50, 1, false]);
        queueEvent(2, makeMover, [document.getElementById(testMovingLog.buttons[0]), 100, -100, 75, 1, true]);
        queueEvent(102, makeMover, [document.getElementById(testMovingLog.buttons[0]), 60, -300, -225, 1, true]);
        queueEvent(162, makeMover, [document.getElementById(testMovingLog.buttons[0]), 30, 400, 150, 1, true]);
        queueEvent(2, makeMover, [document.getElementById(testMovingLog.buttons[1]), 100, 10, 100, 1, true]);
        queueEvent(92, makeMover, [document.getElementById(testMovingLog.buttons[1]), 200, -10, -100, 1, true]);

        let winPendingId = "testC";
        let parent = document.getElementById("testA");
        let newSize = [getRatio(100, true), getRatio(100, false)];
        let winTerms = ["pos", "br", "brr", "z", "w", "h", "user", "bg", "txt", "l", "t"];
        let winValues = ["absolute", "none", 3, 5, newSize[0], newSize[1], "none", "none", "center", 0, 0];
        let winStyling = cssMake(winValues, winTerms);
        let anim = logWin(parent, winPendingId, "canvas", winStyling, ["none", "none"], false, false, false, false);
        let aContext = anim.win.getContext("2d");
        addAnimationZone(aContext);

        let aSlate = [testAns(5), testAns(6), testAns(5), testAns(6)];
        let testAnim = makeAnimation(aSlate, -1, 0, 0, aContext, 10, "testC", 20);
        centerAnim(anim.win, testAnim, parent, true, true, true);
        makeMover(anim.win, 30, 0, 50, 1, true);
        queueRepeat("testTroll", 60, makeMover, [anim.win, 30, 0, -100, 1, true]);
        queueRepeat("testTroll2", 60, queueEvent, [30, makeMover, [anim.win, 30, 0, 100, 1, true]]);
        queueEvent(361, removeAnimation, [testAnim]);
        queueEvent(362, removeRepeatQueue, ["testTroll"]);
        queueEvent(362, removeRepeatQueue, ["testTroll2"]);
        queueEvent(363, clearWin, [anim.win.id, false]);

    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//Updates
//------------------------------------------------------------------------------------------------------------------------------------------------------

function update() {
    makeEvents();
    makeRepeats();
    animationUpdate();

    //Final
    requestAnimationFrame(update);
}

//Clears and Animates
function animationUpdate() {
    globalAnimationCycle += 1;

    if (animatedZones.length > 0) {
        for (let i = 0; i < animatedZones.length; i++) {
            if (animatedZones[i] != undefined) {
                animatedZones[i].clearRect(0, 0, boardWidth, boardHeight);
            } else {
                console.log("undefined animation zone");
                animatedZones[i] = animatedZones[animatedZones.length - 1];
                animatedZones.pop();
                i -= 1;
            }
        }
    }

    if (animationsList.length > 0) {
        for (let i = 0; i < animationsList.length; i++) {
            drawAnimation(animationsList[i]);
        }
    }

    if (moverList.length > 0) {
        for (let i = 0; i < moverList.length; i++) {
            moveMover(moverList[i]);
        }
    }

    updateCleanup();
}

//Cleans Up Spent Animations
function updateCleanup() {
    if (animationsList.length > 0) {
        for (let i = 0; i < animationsList.length; i++) {
            if (animationsList[i].looping == 0) {
                removeAnimation(animationsList[i]);
                /*if (animationsList.length <= 1) {
                    animationsList = [];
                } else {
                }*/
            }
        }
    }

    if (moverList.length > 0) {
        for (let i = 0; i < moverList.length; i++) {
            if (moverList[i].current >= moverList[i].frames) {
                removeMover(moverList[i]);
                /*if (moverList.length <= 1) {
                    moverList = [];
                } else {
                }*/
            }
        }
    }

    //if (moverList.length < 1) moverList = [];
    //if (animationsList.length < 1) animationsList = [];
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
function clearWin(win, killHelper) {
    let box = document.getElementById(win);
    let log = checkWinLog(win, false);
    let support;

    if (log.title != undefined && log.title != false) {
        support = document.getElementById(log.title);
        support.parentNode.removeChild(support);
    }
    if (log.helper != undefined && log.helper != false && killHelper == true) {
        support = document.getElementById(log.helper);
        support.parentNode.removeChild(support);
    }
    /*if (log.buttons != false) {
        for (let i = 0; i < log.buttons.length; i++) {
            support = document.getElementById(log.buttons[i]);
            support.parentNode.removeChild(support);
        }
    }*/

    if (box.nodeName.toLowerCase() == "canvas" || log.canvas != false) {
        let checked;
        if (box.nodeName.toLowerCase() != "div") {
            checked = box.getContext("2d");
        } else {
            checked = log.canvas.getContext("2d");
        }

        for (let i = 0; i < animatedZones.length; i++) {
            if (animatedZones[i] == checked) {
                animatedZones[i] = animatedZones[animatedZones.length - 1];
                animatedZones.pop();
                i -= 1;
            }
        }
    }

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

    return false;
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
            "center", getParentInfo(parent, "marl"), getParentInfo(parent, "mart"), 0.95, "white", 2];
    } else {
        details = [true, true, true, false];
        if (winds[winNum].buttons == false) {
            winPendingId = parent.id + "-button" + 0;
        } else {
            winPendingId = parent.id + "-button" + winds[winNum].buttons.length;
        }
        newW = 100;
        newH = 28;
        winTerms = ["pos", "br", "brr", "z", "w", "h", "user", "fs", "bg", "txt", "l", "t", "opacity"];
        winValues = ["absolute", "1px solid #505050", 1, 6, newW, newH, "none", 24, newColors[1],
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
        styleWin(supportWin, parent.style["border"], "border");
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
    if (gameActive == false) return;
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
    if (gameActive == false) return;
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
    if (gameActive == false) return;
    let box = document.getElementById(this.id);
    let wind = checkWinLog(this.id, true);

    clickResults(this.id, box, wind);
}

//Returns a Window Scaling Ratio for Uniform Boxes
function getRatio(value, isX) {
    let ratio = boardWidth / boardHeight;
    let result = value * ratio;
    if (isX) {
        return result;
    } else {
        return value;
    }
}

//Returns Centered Animation Coordinates
function centerAnim(target, anim, parent, x, y, alt) {
    let ar = getAnimRatio(anim, false);
    let ps = [propMin(parent.style.width), propMin(parent.style.height)];
    let result = centerWin(ar[0], ar[1], ps[0], ps[1]);
    let part = "mar";
    if (alt) part = "";
    let suffix;

    if (x) {
        suffix = part + "l";
        styleWin(target, result[0], cssAbb(suffix));
    }
    if (y) {
        suffix = part + "t";
        styleWin(target, result[1], cssAbb(suffix));
    }

    return result;
}

//Returns Orientation Based on Animation Scale
function getAnimRatio(anim, px) {
    let tilesX = anim.art[0].width - 1;
    let tilesY = anim.art[0].height - 1;

    let stillCheck = true;
    for (let i = 0; i < anim.art[0].width; i++) {
        if (checkBlank(i, anim.art[0], false) && stillCheck) {
            tilesX -= 1;
        } else {
            stillCheck = false;
        }
    }
    stillCheck = true;
    for (let i = anim.art[0].width - 1; i >= 0; i -= 1) {
        if (checkBlank(i, anim.art[0], false) && stillCheck) {
            tilesX -= 1;
        } else {
            stillCheck = false;
        }
    }

    stillCheck = true;
    for (let i = 0; i < anim.art[0].height; i++) {
        if (checkBlank(i, anim.art[0], true) && stillCheck) {
            tilesY -= 1;
        } else {
            stillCheck = false;
        }
    }
    stillCheck = true;
    for (let i = anim.art[0].height - 1; i >= 0; i -= 1) {
        if (checkBlank(i, anim.art[0], true) && stillCheck) {
            tilesX -= 1;
        } else {
            stillCheck = false;
        }
    }

    let x = tilesX * anim.localPixes;
    let y = tilesY * anim.localPixes;
    if (px) {
        x = x.toString() + "px";
        y = y.toString() + "px";
    }
    let results = [x, y];

    return results;
}

//Applied Results for Clicking -- Program Specific
function clickResults(id, box, wind) {
    console.log("successfully clicked " + id + "!");

    //Test Function -- Animation
    if (id == "testA-button0" && document.getElementById("testB") == undefined) {
        testButtonClick(0, id);

    } else if (id == "testA-button0" && document.getElementById("testB") != undefined) {
        console.log("Animation Test Already Underway!");
    }

    //Test Function -- Movement
    if (id == "testA-button1" && checkMover("testA") == false && document.getElementById("testC") == undefined) {
        testButtonClick(1, id);
    } else if (id == "testA-button1" && (checkMover("testA") == true || document.getElementById("testC") != undefined)) {
        console.log("Movement Test Already Underway!");
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//Animation Functions
//------------------------------------------------------------------------------------------------------------------------------------------------------

//Draws an Image on a Canvas Using Color Blocks
function drawSprite(region, draws, artX, artY, localPixes) {
    if (localPixes == false) localPixes = pixes;
    let width = draws.width;
    let height = draws.height;
    let art = draws.art;

    for (let i = 0; i < height; i++) {
        for (let i2 = 0; i2 < width; i2++) {
            let i3 = (i2 * width) + i;
            if (art[i3] != 0 && art[i3] != "none") {
                region.fillStyle = art[i3];
                let x = artX + (i * localPixes);
                let y = artY + (i2 * localPixes);
                region.fillRect(x, y, localPixes, localPixes);
            }
        }
    }
}

//Returns an Ojbect to be Drawn
function makeDrawing(drawn) {
    let result = { "art": false, "width": drawn[0].length, "height": drawn.length, "original": drawn };
    result.art = drawnArray(drawn, result.width, result.height);
    return result;
}

//Returns an Animated Series of Objects
function makeAnimation(drawings, looping, x, y, region, localPixes, id, frequency) {
    let result = {
        "art": drawings, "cycles": drawings.length, "looping": looping, "x": x, "y": y, "region": region, "localPixes": localPixes, "id": id, "frequency": frequency,
        "current": -1, "special": "none"
    };
    addAnimation(result);
    return result;
}

//Draws an Animation
function drawAnimation(animation) {
    if (globalAnimationCycle % animation.frequency == 0) animation.current += 1;
    if (animation.current <= -1) animation.current = 0;

    if (animation.looping > 0 || animation.looping == -1) {
        if (animation.current >= animation.cycles) {
            if (animation.looping != -1) animation.looping -= 1;
            animation.current -= animation.cycles;
        }

        if (animation.looping != 0) {
            drawSprite(animation.region, animation.art[animation.current], animation.x, animation.y, animation.localPixes);
        }
    } else {
        /*let frame = animation.current;
        if (frame >= animation.cycles) frame = 0;
        drawSprite(animation.region, animation.art[frame], animation.x, animation.y, animation.localPixes);*/
    }
}

//Returns an Array Converting an Image from Drawn Spots
function drawnArray(drawn, width, height) {
    let result = [];
    for (let i = 0; i < height; i++) {
        for (let i2 = 0; i2 < width; i2++) {
            result[drawSpot(i, i2, height)] = drawn[i][i2];
        }
    }
    return result;
}

//Returns Index # for a Drawning Location
function drawSpot(x, y, height) {
    return (x * height) + y;
}

//Returns if a Row or Column is Blank in a Drawing
function checkBlank(id, drawn, isRow) {
    let art = drawn.original;
    let result = true;
    let checks = art.length;
    if (isRow) {
        checks = art[id].length;
    }

    for (let i = 0; i < checks; i++) {
        let checked = art[i][id];
        if (isRow) checked = art[id][i];
        if (checked != "none") result = false;
    }

    return result;
}

//Returns if an Element is Already Moving
function checkMover(elem) {
    let result = false;

    for (let i = 0; i < moverList.length; i++) {
        if (moverList[i].elem.id == elem) {
            result = true;
        }
    }

    return result;
}

//Makes an Element Mobile
function makeMover(elem, frames, distX, distY, frequency, alt) {
    let mx = distX / frames;
    let my = distY / frames;
    let result = { "elem": elem, "frames": frames, "distX": mx, "distY": my, "frequency": frequency, "alt": alt, "current": 0 };
    addMover(result);
    return result;
}

//Moves a Mobile Element
function moveMover(moved) {
    if (globalAnimationCycle % moved.frequency == 0 && moved.current < moved.frames) {
        let mover = moved.elem;
        let propX = cssAbb("marl");
        let propY = cssAbb("mart");
        if (moved.alt == true) {
            propX = cssAbb("l");
            propY = cssAbb("t");
        }
        let newX = propMin(mover.style[propX]) + moved.distX;
        let newY = propMin(mover.style[propY]) + moved.distY;
        newX += addPX(newX, propX);
        newY += addPX(newY, propY);
        newX = newX.replace(";", "");
        newY = newY.replace(";", "");

        moved.current += 1;
        if (moved.current <= -1) moved.current = 0;
        styleWin(mover, newX, propX);
        styleWin(mover, newY, propY);

        //Moves Titles for Windows with Them
        let moveLog = checkWinLog(mover.id, false);
        if (moveLog != false) {
            if (moveLog.title != false) {
                let moveTitle = document.getElementById(moveLog.title);
                propX = cssAbb("marl");
                propY = cssAbb("mart");
                if (moved.alt == true) {
                    propX = cssAbb("l");
                    propY = cssAbb("t");
                }
                newX = propMin(moveTitle.style[propX]) + moved.distX;
                newY = propMin(moveTitle.style[propY]) + moved.distY;
                newX += addPX(newX, propX);
                newY += addPX(newY, propY);
                newX = newX.replace(";", "");
                newY = newY.replace(";", "");
                styleWin(moveTitle, newX, propX);
                styleWin(moveTitle, newY, propY);
            }
        }
    }
}

//Adds an Animated Area to the Global List of Cleared Contexts
function addAnimationZone(region) {
    animatedZones[animatedZones.length] = region;
}

//Adds an Animation to the Global List
function addAnimation(animation) {
    animationsList[animationsList.length] = animation;
}

//Adds a Moved Element to the Global List
function addMover(mover) {
    moverList[moverList.length] = mover;
}

//Removes a Moved Element from the Global List
function removeMover(mover) {
    let id = "none";
    for (let i = 0; i < moverList.length; i++) {
        if (moverList[i] == mover) id = i;
    }

    if (id != "none") {
        if (id != moverList.length - 1) {
            moverList[id] = moverList[moverList.length - 1];
        }
        moverList.pop();
    }
}

//Removes an Animation from the Global List
function removeAnimation(animation) {
    let id = "none";
    for (let i = 0; i < animationsList.length; i++) {
        if (animationsList[i] == animation) id = i;
    }

    if (id != "none") {
        if (id != animationsList.length - 1) {
            animationsList[id] = animationsList[animationsList.length - 1];
        }
        animationsList.pop();
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//Queued Event Functions
//------------------------------------------------------------------------------------------------------------------------------------------------------

//Applies Global Events
function makeEvents() {
    if (eventQueue.length > 0) {
        for (let i = 0; i < eventQueue.length; i++) {
            if (eventQueue[i].when == globalAnimationCycle) {
                eventQueue[i].action.apply(this, eventQueue[i].params);
                eventQueue[i] = eventQueue[eventQueue.length - 1];
                eventQueue.pop();
                i -= 1;
            }
        }
    }
}

//Queues an Event for a Future Frame
function queueEvent(delay, action, params) {
    let when = globalAnimationCycle + delay;
    let result = { "when": when, "action": action, "params": params };
    addEventQueue(result);
}

//Adds an Event to the Global Queue
function addEventQueue(event) {
    eventQueue[eventQueue.length] = event;
}

//Applies Global Repeats
function makeRepeats() {
    if (repeatQueue.length > 0) {
        for (let i = 0; i < repeatQueue.length; i++) {
            if (globalAnimationCycle % repeatQueue[i].when == 0) {
                repeatQueue[i].action.apply(this, repeatQueue[i].params);
            }
        }
    }
}

//Queues a Repeat for a Future Frame
function queueRepeat(id, when, action, params) {
    //let result = { "when": when, "action": action, "params": params };
    let result = { "id": id, "when": when, "action": action, "params": params };
    addRepeatQueue(result);
}

//Adds a Repeat to the Global Queue
function addRepeatQueue(repeat) {
    repeatQueue[repeatQueue.length] = repeat;
}

//Removes a Repeat from the Global Queue
function removeRepeatQueue(repeat) {
    let id = "ignore";
    for (let i = 0; i < repeatQueue.length; i++) {
        if (repeatQueue[i].id == repeat) {
            id = i;
        }
    }

    if (id != "ignore") {
        if (id != repeatQueue.length - 1) {
            repeatQueue[id] = repeatQueue[repeatQueue.length - 1];
        }
        repeatQueue.pop();
        //if (repeatQueue.length < 1) repeatQueue = [];
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------
//Miscellaneous Functions
//------------------------------------------------------------------------------------------------------------------------------------------------------






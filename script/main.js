"use strict";

//*variables declaration

let listSizeInputElement = document.getElementById("listSize");
let listSize = Number(listSizeInputElement.value);

let speedInputElement = document.getElementById("speed");
let speed = Number(speedInputElement.value);

let sortingGoingOn = false;

let listVal = [];
let listBarDiv = [];

let timeOuts = [];
let netDelay = 0;
let delayTime = 1000;

const style = getComputedStyle(document.body);

const generateRandomListButton = document.getElementById("generateRandomList");
const generateCorrectlySortedButton = document.getElementById(
    "generateCorrectlySortedList"
);
const generateWronglySortedButton = document.getElementById(
    "generateWronglySortedList"
);

const sortButton = document.getElementById("sortButton");
const barContainer = document.querySelector(".list_bar_inner_container");
const resetButton = document.querySelector("#resetButton");
const disabledButtons = document.querySelectorAll(".canBeDisabled");

//*funcitons

const resetDelayTime = function () {
    netDelay = 0;
};

const resetAll = function () {
    for (let i = 0; i < timeOuts.length; i++) {
        clearTimeout(timeOuts[i]);
    }

    timeOuts = [];

    sortingGoingOn = false;

    listVal = [];
    listBarDiv = [];

    resetDelayTime();

    enableButtonsFun();
};

//retuns random integer within range [lowRange, highRange)
const getRandomInt = function (lowRange, highRange) {
    let diff = highRange - lowRange;
    return lowRange + Math.floor(Math.random() * diff);
};

const generateList = function (e) {
    console.log("generate new list function called");

    resetAll();

    //reset the inner Html , i.e, remove the already present bars
    barContainer.innerHTML = "";

    let marginSize = 0.1;

    let sortingType = "generateRandomList";

    if (e) {
        sortingType = e.target.id;
    }

    for (let i = 0; i < listSize; i++) {
        if (sortingType === "generateRandomList")
            listVal[i] = getRandomInt(5, 100);
        else if (sortingType === "generateCorrectlySortedList")
            listVal[i] = ((i + 1) * 100) / listSize;
        else if (sortingType === "generateWronglySortedList")
            listVal[i] = ((listSize - i + 1) * 100) / listSize;

        listBarDiv[i] = document.createElement("div");
        barContainer.appendChild(listBarDiv[i]);

        listBarDiv[i].style = `
                background-color: ${style.getPropertyValue("--barColor")};
                margin: ${marginSize}rem;
                height: ${listVal[i]}%;
                width:  ${100 / listSize}%;


                `;
    }
};

const updateListSize = function () {
    listSize = Number(listSizeInputElement.value);
    generateList();
};

const updateSpeed = function () {
    speed = Number(speedInputElement.value);
    delayTime = 1000 / (speed * speed);
};

const sortNumArray = function (numArray) {
    numArray.sort(function (a, b) {
        return a - b;
    });
};

const sortFun = function (e) {
    console.log("sort button clicked");

    if (!sortingGoingOn) {
        console.log("sorting started ");

        sortingGoingOn = true;
        disableButtonsFun();

        // let newSortedList = [...listVal];
        // sortNumArray(newSortedList);

        bubbleSort();

        // for (let i = 0; i < listSize; i++) {
        //     if (newSortedList[i] != listVal[i]) {
        //         alert("Not sorted!!!!!!!!!!!!!!!!!!!!!!");
        //         return;
        //     }
        // }

        // alert("\nsorted :)");
    }

    resetDelayTime();
};

const handleGenerateList = function (e) {
    if (!e.target.classList.contains("disabledButton") && !sortingGoingOn)
        generateList(e);
};

const handleReset = function () {
    resetAll();
    generateList();
};

const disableButtonsFun = function () {
    for (let i = 0; i < disabledButtons.length; i++) {
        disabledButtons[i].disabled = true;
        disabledButtons[i].classList.add("disabledButton");
    }
};

const enableButtonsFun = function () {
    for (let i = 0; i < disabledButtons.length; i++) {
        disabledButtons[i].disabled = false;
        disabledButtons[i].classList.remove("disabledButton");
    }
};

const handleDisabledButtons = function (e) {
    console.log("disabled button hovered");
    console.log("sortingGoingOn : " + sortingGoingOn);
    if (sortingGoingOn || e.target.classList.contains("disabledButton")) {
        e.target.style.cursor = "not-allowed";
    } else {
        e.target.style.cursor = "pointer";
    }
};

const endSorting = function () {
    setTimeout(function () {
        sortingGoingOn = false;
        enableButtonsFun();

        console.log(" sort function finished");
    }, (netDelay += delayTime));
};

//*event listeners

listSizeInputElement.addEventListener("input", updateListSize);
speedInputElement.addEventListener("input", updateSpeed);

sortButton.addEventListener("click", sortFun);
generateRandomListButton.addEventListener("click", handleGenerateList);
generateCorrectlySortedButton.addEventListener("click", handleGenerateList);
generateWronglySortedButton.addEventListener("click", handleGenerateList);

resetButton.addEventListener("click", handleReset);

// for (let i = 0; i < disabledButtons.length; i++) {
//     disabledButtons[i].addEventListener("mouseover", handleDisabledButtons);
// }

updateListSize();
updateSpeed();
generateList();
// disableButtonsFun();

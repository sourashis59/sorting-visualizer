"use strict";

//*variables declaration

const listSize = 25;
let sortingGoingOn = false;

let listVal = [];
let listBarDiv = [];

let netDelay = 0;
let delayTime = 100;

const style = getComputedStyle(document.body);

const generateNewListButton = document.getElementById("generateNewListButton");
const sortButton = document.getElementById("sortButton");
const barContainer = document.querySelector(".list_bar_inner_container");
const resetButton = document.querySelector("#resetButton");
const disabledButtons = document.querySelectorAll(".canBeDisabled");

//*funcitons

const resetDelayTime = function () {
    netDelay = 0;
};

const resetAll = function () {
    sortingGoingOn = false;

    listVal = [];
    listBarDiv = [];

    resetDelayTime();
};

//retuns random integer within range [lowRange, highRange)
const getRandomInt = function (lowRange, highRange) {
    let diff = highRange - lowRange;
    return lowRange + Math.floor(Math.random() * diff);
};

const generateArrayFun = function () {
    console.log("generate new list button clicked");

    resetAll();

    //reset the inner Html , i.e, remove the already present bars
    barContainer.innerHTML = "";

    let marginSize = 0.1;
    for (let i = 0; i < listSize; i++) {
        listVal[i] = getRandomInt(5, 100);

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

        let newSortedList = [...listVal];
        sortNumArray(newSortedList);

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

const handleReset = function () {
    resetAll();
    generateArrayFun();
};

const handleDisabledButtons = function (e) {
    console.log("disabled button hovered");
    console.log("sortingGoingOn : " + sortingGoingOn);
    if (sortingGoingOn) {
        e.target.style.cursor = "not-allowed";
    }
};

//*event listeners
sortButton.addEventListener("click", sortFun);
generateNewListButton.addEventListener("click", generateArrayFun);
resetButton.addEventListener("click", handleReset);

for (let i = 0; i < disabledButtons.length; i++) {
    disabledButtons[i].addEventListener("mouseover", handleDisabledButtons);
}

generateArrayFun();

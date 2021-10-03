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

let selectedAlgo = "bubbleSort";

const style = getComputedStyle(document.body);

const algoMenuDivs = document.getElementsByClassName("algoMenu");
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
const statusTextDiv = document.querySelector(".statusText");
const algoDetailTextDiv = document.querySelector(".algo_detail>p");

let endSortFunTimeOutId = null;

//*funcitons

const updateStatusText = function (text) {
    if (text === "Sorting" || text === "sorting" || text === " SORTING") {
        statusTextDiv.innerHTML = "Sorting...";
        statusTextDiv.style.color = "orange";
        document.getElementById("sedcatImage").classList.add("hidden");
    } else if (text === "reset") {
        statusTextDiv.innerHTML = "Chilling";
        statusTextDiv.style.color = "white";
        document.getElementById("sedcatImage").classList.add("hidden");
    } else if (
        text === "finished" ||
        text == "FINISHED" ||
        text === "Finished"
    ) {
        statusTextDiv.innerHTML = "Finished :)";
        statusTextDiv.style.color = "rgb(96, 250, 96)";
        document.getElementById("sedcatImage").classList.remove("hidden");
    }
};

const resetDelayTime = function () {
    netDelay = 0;
};

const resetAll = function () {
    //Important to ignore bug : First priority is to clear the endSorting timout
    if (endSortFunTimeOutId) clearTimeout(endSortFunTimeOutId);

    for (let i = 0; i < timeOuts.length; i++) {
        // console.log(timeOuts[i]);
        clearTimeout(timeOuts[i]);
    }

    timeOuts = [];

    listVal = [];
    listBarDiv = [];

    resetDelayTime();

    enableButtonsFun();

    sortingGoingOn = false;

    updateStatusText("reset");
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

    let marginSize = 0.05;

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

        //make the bar color normal , if it was previously sorted and kept in sorted color
        for (let i = 0; i < listBarDiv.length; i++)
            barNormalVisualize(listBarDiv[i], listVal[i], false);

        updateStatusText("sorting");

        sortingGoingOn = true;
        disableButtonsFun();

        // let newSortedList = [...listVal];
        // sortNumArray(newSortedList);

        switch (selectedAlgo) {
            case "bubbleSort":
                bubbleSort();
                break;
            case "selectionSort":
                selectionSort();
                break;
            case "insertionSort":
                insertionSort();
                break;
            case "mergeSort":
                mergeSort();
                break;
            case "quickSort":
                quickSort();
                break;
            case "heapSort":
                heapSort();
                break;

            default:
                alert("Algorithm not found :(");
        }

        // for (let i = 0; i < listSize; i++) {
        //     if (newSortedList[i] != listVal[i]) {
        //         console.log(newSortedList[i] + ", ");
        //         alert("Not sorted!!!!!!!!!!!!!!!!!!!!!!");
        //         return;
        //     }
        // }

        // alert("\nsorted :)");

        endSorting();
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
    endSortFunTimeOutId = setTimeout(function () {
        enableButtonsFun();

        updateStatusText("finished");

        sortingGoingOn = false;
        console.log(" sort function finished");
    }, (netDelay += delayTime));
};

const handleAlgoMenuClick = function (e) {
    if (!sortingGoingOn) {
        selectedAlgo = e.target.id;
        console.log(selectedAlgo + "button clicked");

        for (let i = 0; i < algoMenuDivs.length; i++) {
            algoMenuDivs[i].classList.remove("selectedAlgoMenu");
        }

        e.target.classList.add("selectedAlgoMenu");

        switch (selectedAlgo) {
            case "bubbleSort":
                algoDetailTextDiv.innerHTML =
                    "Bubble Sort : Time = O(n<sup>2</sup>) , Space = O(1) ";
                break;

            case "selectionSort":
                algoDetailTextDiv.innerHTML =
                    "Selection Sort : Time = O(n<sup>2</sup>) , Space = O(1) ";
                break;

            case "insertionSort":
                algoDetailTextDiv.innerHTML =
                    "Insertion Sort : Time = O(n<sup>2</sup>) , Space = O(1) ";
                break;

            case "mergeSort":
                algoDetailTextDiv.innerHTML =
                    "Merge Sort : Time = O(n*log(n)) , Space = O(n) ";
                break;

            case "quickSort":
                algoDetailTextDiv.innerHTML =
                    "Quick Sort : Time = O(n<sup>2</sup>) , Space = O(1) ";
                break;

            case "heapSort":
                algoDetailTextDiv.innerHTML =
                    "Heap Sort : Time = O(n*log(n)) , Space = O(1) ";
                break;

            default:
                algoDetailTextDiv.innerHTML =
                    "Algorithm not found :)  : Time = O(-1) , Space = O(-1) ";
                break;
        }
    }
};

//*event listeners

listSizeInputElement.addEventListener("input", updateListSize);
speedInputElement.addEventListener("input", updateSpeed);

for (let i = 0; i < algoMenuDivs.length; i++) {
    algoMenuDivs[i].addEventListener("click", handleAlgoMenuClick);
}

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

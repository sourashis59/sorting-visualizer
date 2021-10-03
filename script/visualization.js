"use strict";

// function sleep(milliseconds) {
//     return new Promise((resolve) => setTimeout(resolve, milliseconds));
// }

// const changeBarStyle = async function (listBarDiv, newHeight, newColor) {
//     //sleep
//     // await sleep(delayTime);

//     listBarDiv.style.backgroundColor = newColor;
//     listBarDiv.style.height = `${newHeight}%`;
// };

const changeBarStyle = function (listBarDiv, newHeight, newColor) {
    sortingGoingOn = true;
    let id = setTimeout(function () {
        listBarDiv.style.backgroundColor = newColor;
        listBarDiv.style.height = `${newHeight}%`;
    }, (netDelay += delayTime));

    timeOuts.push(id);
};

const changeBarStyleWithoutDealy = function (listBarDiv, newHeight, newColor) {
    sortingGoingOn = true;
    let id = setTimeout(function () {
        listBarDiv.style.backgroundColor = newColor;
        listBarDiv.style.height = `${newHeight}%`;
    }, netDelay);

    timeOuts.push(id);
};

// pass false as 3rd argument if you want no delay in the visual change
const barCheckingVisualize = function (listBarDiv, listVal, withDelay = true) {
    const barCheckingColor = style.getPropertyValue("--barCheckingColor");

    if (withDelay) changeBarStyle(listBarDiv, listVal, barCheckingColor);
    else changeBarStyleWithoutDealy(listBarDiv, listVal, barCheckingColor);
};

const barMisplacedVisualize = function (listBarDiv, listVal, withDelay = true) {
    const barMisplacedColor = style.getPropertyValue("--barMisplacedColor");

    if (withDelay) changeBarStyle(listBarDiv, listVal, barMisplacedColor);
    else changeBarStyleWithoutDealy(listBarDiv, listVal, barMisplacedColor);
};

const barNormalVisualize = function (listBarDiv, listVal, withDelay = true) {
    const barNormalColor = style.getPropertyValue("--barColor");

    if (withDelay) changeBarStyle(listBarDiv, listVal, barNormalColor);
    else changeBarStyleWithoutDealy(listBarDiv, listVal, barNormalColor);
};

const barCorrectPositionVisualize = function (
    listBarDiv,
    listVal,
    withDelay = true
) {
    const barCorrectPositionColor = style.getPropertyValue(
        "--barCorrectPositionColor"
    );

    if (withDelay) changeBarStyle(listBarDiv, listVal, barCorrectPositionColor);
    else
        changeBarStyleWithoutDealy(
            listBarDiv,
            listVal,
            barCorrectPositionColor
        );
};

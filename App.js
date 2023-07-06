import './App.css';
import { useState, useEffect } from 'react';

import ReactWordcloud from 'react-wordcloud';
import "d3-transition";
import { select } from "d3-selection";
import original from './original.js';

let words = original;
const size = [600, 400];
function getCallback(callback) {
    return function (word, event) {
        const isActive = callback !== "onWordMouseOut";
        const element = event.target;
        const text = select(element);
        text
            .on("click", () => {
                if (isActive) {
                    window.open(`https://duckduckgo.com/?q=${word.text}`, "_blank");
                }
            })
            .transition()
            .attr("background", "white")
            .attr("font-size", isActive ? "300%" : "100%")
            .attr("text-decoration", isActive ? "underline" : "none");
    };
}

const callbacks = {
    getWordColor: (word) => (word.value%2 === 0 ? "orange" : "purple"),
    getWordTooltip: (word) =>
        `The word "${word.text}" appears ${word.value} times.`,
    onWordClick: getCallback("onWordClick"),
    onWordMouseOut: getCallback("onWordMouseOut"),
    onWordMouseOver: getCallback("onWordMouseOver")
};

function App() {
    const [text, setText] = useState('');

    //use input on click
    function getText() {
        words = [];
        var input = document.getElementById("txtArea").value.toLowerCase();
        setText(input);

        //default wordcloud if input empty
        if (input === "") {
            words = original;
        }
    }

    //make array for wordcloud
    useEffect(() => {
        const wordcloud = text.split(' ');

        console.log(text);

        // read each entry in word, add to words array
        wordcloud.forEach((word) => {
            //set all to lowercase

            if (word.trim() !== '') {
                //if word is not in wordcloud alr, add; if it is, increment value
                if (words.find(e => e.text === word) == null) {
                    words.push({ text: word, value: 1, });
                }
                else {
                    (words.find(e => e.text === word)).value = (words.find(e => e.text === word)).value + 1;
                }
            }
        });
    }, [text]);

    return (
        <div className="App">
            <h1>Word Cloud</h1>
            <p>Generate beautiful word clouds out of any text!</p>

            <div class="grid-container">

                <div class="grid-child text">
                    <textarea
                        id="txtArea"
                        placeholder='Enter the text you would like to make into a word cloud here'
                    ></textarea>

                    <p>
                            <button id="enter" onClick={getText}>Enter</button>
                    </p>
                </div>
             
            <div id="cloud" class="grid-child cloud">
                    <ReactWordcloud callbacks={callbacks} size={size} words={words} />
                </div>

            </div>

            <footer>created by Katherine Li</footer>

        </div>
    );
}

export default App;

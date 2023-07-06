import './App.css';
import { useState, useEffect } from 'react';

import ReactWordcloud from 'react-wordcloud';
import "d3-transition";
import { select } from "d3-selection";

const original = [
    {
        text: 'Lorem',
        value: 64,
    },
    {
        text: 'ipsum',
        value: 11,
    },
    {
        text: 'dolor',
        value: 16,
    },
    {
        text: 'sit',
        value: 17,
    },
    {
        text: 'amet',
        value: 10,
    },
    {
        text: 'consectetur',
        value: 54,
    },
    {
        text: 'adipiscing',
        value: 12,
    },
    {
        text: 'elit',
        value: 77,
    },
    {
        text: 'sed',
        value: 45,
    },
    {
        text: 'do',
        value: 19,
    },
    {
        text: 'eiusmod',
        value: 13,
    },
    {
        text: 'tempor',
        value: 32,
    },
    {
        text: 'incididunt',
        value: 22,
    },
    {
        text: 'ut',
        value: 35,
    },
    {
        text: 'labore',
        value: 24,
    },
    {
        text: 'et',
        value: 38,
    },
    {
        text: 'dolore',
        value: 70,
    },
    {
        text: 'magna',
        value: 26,
    },
    {
        text: 'aliqua',
        value: 14,
    },
    {
        text: 'enim',
        value: 29,
    },
    {
        text: 'ad',
        value: 41,
    },
    {
        text: 'minim',
        value: 49,
    },
    {
        text: 'veniam',
        value: 20,
    },
    {
        text: 'quiz',
        value: 59,
    },
    {
        text: 'nostrud',
        value: 49,
    },
    {
        text: 'felt',
        value: 45,
    },
    {
        text: 'exercitation',
        value: 11,
    },
    {
        text: 'ullamco',
        value: 22,
    },
    {
        text: 'laboris',
        value: 12,
    },
    {
        text: 'free',
        value: 38,
    },
    {
        text: 'nisi',
        value: 54,
    },
    {
        text: 'alliquip',
        value: 14,
    },
    {
        text: 'ex',
        value: 41,
    },
    {
        text: 'root',
        value: 24,
    },
    {
        text: 'ea',
        value: 16,
    },
    {
        text: 'commodo',
        value: 29,
    },
    {
        text: 'Duis',
        value: 20,
    },
    {
        text: 'aute',
        value: 10,
    },
    {
        text: 'irure',
        value: 13,
    },
    {
        text: 'in',
        value: 35,
    },
    {
        text: 'reprehenderit',
        value: 59,
    },
    {
        text: 'voluptate',
        value: 32,
    },
    {
        text: 'velit',
        value: 17,
    },
    {
        text: 'dr',
        value: 77,
    },
    {
        text: 'esse',
        value: 19,
    },
    {
        text: 'cillum',
        value: 26,
    },
    {
        text: 'eu',
        value: 17,
    },
    {
        text: 'fugiat',
        value: 22,
    },
    {
        text: 'hour',
        value: 35,
    },
    {
        text: 'nulla',
        value: 38,
    },
    {
        text: 'pariatur',
        value: 11,
    },
    {
        text: 'sint',
        value: 13,
    },
    {
        text: 'Excepteur',
        value: 10,
    },
    {
        text: 'occaecat',
        value: 49,
    },
    {
        text: 'cupidatat',
        value: 19,
    },
    {
        text: 'non',
        value: 20,
    },
    {
        text: 'proident',
        value: 64,
    },
    {
        text: 'care',
        value: 54,
    },
    {
        text: 'minute',
        value: 29,
    },
    {
        text: 'culpa',
        value: 16,
    },
    {
        text: 'qui',
        value: 59,
    },
    {
        text: 'officia',
        value: 49,
    },
    {
        text: 'deserunt',
        value: 24,
    },
    {
        text: 'mollit',
        value: 19,
    },
    {
        text: 'anim',
        value: 20,
    },
    {
        text: 'id',
        value: 29,
    },
    {
        text: 'est',
        value: 17,
    },
    {
        text: 'laborum',
        value: 26,
    },
    {
        text: 'sure',
        value: 38,
    },
    {
        text: 'work',
        value: 64,
    },
    {
        text: 'pair',
        value: 11,
    },
];

let words = original;

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

            <div>
                <textarea
                    id="txtArea"
                    placeholder='Enter the text you would like to make into a word cloud here'
                    ></textarea>
            </div>

            <button id="enter" onClick={getText}>Enter</button>
             
            <div>
                <ReactWordcloud callbacks={callbacks} words={words} />
            </div>

            <footer>created by Katherine Li</footer>

        </div>
    );
}

export default App;

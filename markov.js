"use strict";
/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    console.log("constructor ran, this is text:", text);
    this.words = text.split(/[ \r\n]+/);
    this.chains = {};
    this.text = "";
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    console.log("makeChains ran");

    for (let i=0; i<this.words.length; i++) {
      let currentWord = this.words[i];
      let nextWord = this.words[i+1]
      console.log("currentWord is:", currentWord, "and nextWord is:", nextWord, "this is i type:", typeof i);

      let currentFollowers = this.chains[currentWord] || [];
      // if nextWord is the last word, push null
      currentFollowers.push(nextWord || null);
      this.chains[currentWord] = currentFollowers;

      // this.chains[currentWord] = (this.chains[currentWord] || []).push(nextWord || null);

      // if word exists in the chains obj:
    //   if (this.chains[currentWord]) {
    //     console.log("word exists");

    //     // check if there is a next word
    //     if (nextWord === undefined) {
    //       // if there is no word, put null in for currentWord
    //       this.chains[currentWord].push(null);
    //     } else {
    //       this.chains[currentWord].push(nextWord);
    //     }
    //   } else {
    //     console.log("word doesnt exist");
    //     // create an empty array
    //     this.chains[currentWord] = [];

    //     // check if there is a next word
    //     if (nextWord === undefined) {
    //       // if there is no word, put null in for currentWord
    //       this.chains[currentWord].push(null);
    //     } else {
    //       this.chains[currentWord].push(nextWord);
    //     }
    //   }
    } 
    console.log("this is chains:", this.chains);
  }


  /** return random text from chains */

  getText(numWords = 100) {
    console.log("getText ran");
    // 1. randomly select a word from this.words
    // 2. append it to this.text
    // 3. find the selected word in this.chains
    // 4. randomly select a word from this.chains[word]
    // 5. repeat steps 2-4

    let randomIdx = Math.floor(Math.random() * this.words.length)
    let randomWord = this.words[randomIdx];

    let nextWord = randomWord;

    for (let i=0; i<numWords && nextWord !== null; i++) {
      console.log("inside for loop, nextWord is:", nextWord, nextWord === null);
      this.text += nextWord + " ";
      nextWord = this.getNextWord(nextWord)
    }

    // let count = 0;
    // while (nextWord !== null && count <= numWords) {
    //   console.log("inside while loop, nextWord is:", nextWord, nextWord === null);
    //   this.text += nextWord + " ";
    //   nextWord = this.getNextWord(nextWord)
    //   count++;
    // }

    console.log("this is the result:", this.text);
  }

  // given a word from this.words, find currentWord in this.chains
  // and return a random word from this.chains[word]
  getNextWord(currentWord) {
    console.log("getNextWord ran and currentWord is:", currentWord);
    let randomIdx = Math.floor(Math.random() * this.chains[currentWord].length);
    let newWord = this.chains[currentWord][randomIdx];

    return newWord;
  }
}

module.exports = { MarkovMachine };

// Good further study: Markov chain bigrams

// Bhagavad Gita
//
// index.js
// This file parses the user request and attempts to construct the
//  appropriate feedback
// Attempts because bugs in voice development often don't sit in
//  the code but the user experience
//
// @author Vivek Bhookya @mrvivacious

// TODO ::
// CURRENT :: Revisit the interaction model and figure out a more effective way
//  of creating the voice user interface, as that design dictates what's
//  written in this file

// Verse (sloka) playback:
// Can we play audio based on inputted chapter and verse?

// Topic playback:
// Can we query the user's topic?
// Can we play an appropriate verse based on the user's topic?

// Figure out what we can do for these cases, cuz implementing them is gonna
//  be annoying:
// Can we prompt the user for the desired verse, given only the chapter?
// Can we prompt the user for the desired chapter, given only the verse?
//
//
// DONE ::
// Can we play anything back, hello world?
// Can we play an audio file in the response, hello world + audio mpeg?


'use strict';
const Alexa = require('alexa-sdk');

// Thank you,
// https://stackoverflow.com/questions/3922994/share-variables-between-files-in-node-js
// Get the file we want to import our exports from
const fullGitaFile = require('./fullGita');
const topicsGitaFile = require('./topicsGita');

// Collect the TOPICS_MAP
const BHAGAVAD_GITA = fullGitaFile.BHAGAVAD_GITA;
const TOPICS_MAP = topicsGitaFile.TOPICS_MAP;

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = process.env.APP_ID;

const SKILL_NAME = 'My Bhagavad Gita';
const HELP_MESSAGE = 'todo';
const HELP_REPROMPT = 'todo';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================

const handlers = {
  'LaunchRequest': function() {
    // hello world
    // Thank you, https://medium.freecodecamp.org/amazon-has-made-it-easier-to-add-sounds-to-custom-alexa-skills-513b865d7528
    // var test = "<audio src='https://raw.githubusercontent.com/mrvivacious/My_Bhagavad_Gita/master/verses_audio/01/01_01_m_mpeg.mp3'/>";
    // var testText = "Dhrtarastra uvaca\nDharma-ksetre kuru-ksetre samaveta yuyutsavah\nMamakah pandavas caiva kim akurvata sanjaya (1.1)\nDhrtastra said, O Sanjaya, blah blah blah~";

    let testText = "What's up folks.";

    this.response.cardRenderer(SKILL_NAME, testText);
    this.response.speak(testText);
    this.emit(':responseReady');
  },
  'TopicEnquiryIntent': function() {
    //   console.log("--- TOPIC MAP FILE ? ---");
    //   console.log(Object.keys(topicsGitaFile['TOPICS_MAP']));

    // Get the user's requested topic
    let topic = this.event.request.intent.slots.topic.value.toLowerCase();

    // TODO If the topic has a synonym, get the more general term
    // Collect the list of verses that corresponds to this topic
    let topicVerses = TOPICS_MAP[topic];

    // console.log("--- OUR VERSES ---");
    // console.log(topicVerses);

    // Randomly select a chapter-verse item from the list
    let randomIdx = Math.floor(Math.random() * topicVerses.length);
    let randomChapterVerse = topicVerses[randomIdx];

    let chapterNumber = randomChapterVerse[0];
    let verseNumber = randomChapterVerse[1];

    // ??? show Sanskrit if desired, ? Gotta figure out how to configure the
    //  two languages
    let verseSanskrit = BHAGAVAD_GITA[chapterNumber][verseNumber][0];
    let verseEnglish = BHAGAVAD_GITA[chapterNumber][verseNumber][1];

    // TODO Construct the output and emit the response
    // Thank you,
    // https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format/32202320#32202320
    let output = `A verse about '${topic}', from chapter ${chapterNumber}, verse ${verseNumber}: ${verseEnglish}`;

    // TODO Else if topic does not exist,
    // TODO Log the request + topic to Cloudwatch so we can see what the request was
    // TODO Do a search through the Gita to see what verses have this requested term
    // TODO If a verse is found, construct the output and emit the respone
    // TODO If no verse found, state what topics are currently supported and prompt
    //  the user for a new request

    this.response.cardRenderer(SKILL_NAME, output);
    this.response.speak(output);
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function() {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;

    this.response.speak(speechOutput).listen(reprompt);
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent': function() {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
  },
  'AMAZON.StopIntent': function() {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
  },
};

exports.handler = function(event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

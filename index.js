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

// Verse (sloka) playback:
// o Can we play anything back, hello world?
// o Can we play an audio file in the response, hello world + audio mpeg?
// o Can we play audio based on inputted chapter and verse?

// Topic playback:
// o Can we query the user's topic?
// o Can we play an appropriate verse based on the user's topic?

// Figure out what we can do for these cases, cuz implementing them is gonna
//  be annoying:
// o Can we prompt the user for the desired verse, given only the chapter?
// o Can we prompt the user for the desired chapter, given only the verse?
//
//
// DONE ::

'use strict';
const Alexa = require('alexa-sdk');

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'My Bhagavad Gita';
const GET_FACT_MESSAGE = "todo";
const HELP_MESSAGE = 'todo';
const HELP_REPROMPT = 'todo';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================

const data = [
    'hi'
];

//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        // hello world
        // Thank you, https://medium.freecodecamp.org/amazon-has-made-it-easier-to-add-sounds-to-custom-alexa-skills-513b865d7528
        // var test = "<audio src='https://s3.amazonaws.com/audiomybhagavadgita/01_01_m_mpeg.mp3'/>";
        var test = "<audio src='https://raw.githubusercontent.com/mrvivacious/My_Bhagavad_Gita/master/verses_audio/01/01_01_m_mpeg.mp3'/>";
        var testText = "Dhrtarastra uvaca\nDharma-ksetre kuru-ksetre samaveta yuyutsavah\nMamakah pandavas caiva kim akurvata sanjaya (1.1)\nDhrtastra said, O Sanjaya, blah blah blah~";

        this.response.cardRenderer(SKILL_NAME, testText);
        this.response.speak("Demo! " + test);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

// variable for google chrome alarms apo
let COUNTDOWN;
// variable for the setTimeout function
let countDownTimer;

// bool value
let isTimerOn;

// gets countdown display
let displayCountDown = document.getElementById('countDown'),
    startPauseToggle = document.getElementById('startPauseToggle');

function setAlarm(event) {

  let minutes = parseFloat(event.target.value);
  chrome.browserAction.setBadgeText({text: 'ON'});

  // add 20 min in milliseconds to current time
  chrome.alarms.create(COUNTDOWN, {
    when: Date.now() + 1200000,
    periodInMinutes: 20
  });
  chrome.storage.sync.set({minutes: minutes});

  // Save state using the Chrome extension storage API
  chrome.storage.sync.set({'doesTimerExist': true}, function() {
    // Notify that we saved.
    console.log('Set doesTimerExist to true in chrome storage');
  });
  displayTime();
}

function clearAlarm() {
  chrome.alarms.clearAll();
  chrome.browserAction.setBadgeText({text: ''});
  clearTimeout(countDownTimer);
  window.close();
}

function displayTime() {
  chrome.storage.sync.get(['doesTimerExist'], function(result) {
    // Notify the return value
    if (result.doesTimerExist === true) timeLeft();
  });
}

function timeLeft() {
  let timeLeftTemp, formattedTime;

  chrome.alarms.get(COUNTDOWN, function(alarm) {
      timeLeftTemp = alarm.scheduledTime - new Date().getTime();
      formattedTime = new Date(timeLeftTemp).toISOString().slice(14, -5);
      console.log(formattedTime);
  });
  window.close();
}

document.getElementById('startPauseToggle').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);

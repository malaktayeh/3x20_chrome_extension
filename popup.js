// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

let COUNTDOWN;

function setAlarm(event) {
  console.log('Set alarm!')
  let minutes = parseFloat(event.target.value);
  chrome.browserAction.setBadgeText({text: 'ON'});
  // add 20 min in milliseconds to current time
  chrome.alarms.create(COUNTDOWN, {when: Date.now() + 1200000});
  chrome.storage.sync.set({minutes: minutes});
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
}

function timeLeft() {
  chrome.alarms.get(COUNTDOWN, function(alarm) {
    // get the leftover time
    let timeLeft = alarm.scheduledTime - new Date().getTime();
    let formattedTime = new Date(timeLeft).toISOString().slice(14, -5)
    console.log(formattedTime)
  })
}

if (window.open() === true) {
  console.log('success!')
}

document.getElementById('sampleSecond').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
document.getElementById('timeLeft').addEventListener('click', timeLeft);

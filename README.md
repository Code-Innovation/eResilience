# eResilience App

## Installation

There is a bug in cordova emulator with Android 8.0

replace `var num = target.split('(API level ')[1].replace(')', '');` on line 214 of platforms/cordova/lib/emulator.js
with `var num = target.match(/\d+/)[0];`


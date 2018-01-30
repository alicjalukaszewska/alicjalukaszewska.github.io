# Simple Alarm

Browser alarm clock with options to choose days and nap time. Current time is shown by an analog clock. Application language is Polish and its convention of time is 24-hour clock.

## Technology:

Application is written in Vanilla JS without any plugins and frameworks. 

CSS for it is made by SCSS, compiled by Gulp with plugin Gulp-Sass. 

## How it works:

Application is waiting for user to input preferred alarm time. It prevents from putting more than two digits, characters other than numbers and numbers greater than units of time. Maximum value for hours is 23 and for minutes is 59. Minimum value is 0. 
When input number has only one digit, clicking outside of input will automatically add 0 before digit. 
Alarm time can be chosen by writing preferred time or by the arrows. If user gets to minimum or maximum value (0, 23 or 59) by clicking arrow, next value is going to be the end or the beginning of the value range. 

User should also decide in which days alarm should ring. They can be chosen one by one or few at once by buttons. If user doesn’t select any day, clicking button to set alarm will show an alert and prevent function from running. 

Clicking button to set alarm turns off options to change alarm time. Clicking it again stops alarm detection and turns on these options.

When alarm rings, user can choose if he or she wants to stop alarm or to snooze for few minutes. Clicking nap buttons adds nap minutes to alarm time. Clicking stop alarm button allow user to set alarm again. 


### Current problems:
- [ ] When tab or window with application is inactive, browsers slow down intervals, which can cause problems with getting right second to ring an alarm. 
- [ ] Because mobile devices don’t support autoplay HTML audio, alarm won’t play music on mobile. 

### Potential future features:
* Option to change language to English
* Option to change ring sound
* Option to change ring sound to another every nap
* Mobile application

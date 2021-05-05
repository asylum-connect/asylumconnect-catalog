/*The MIT License (MIT)

Copyright (c) 2015-2016 Sung Won Cho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Credit: sungwoncho
https://github.com/sungwoncho/convert-time

Minor bugfix
*/

var TWELVE_HOUR_REGEX = /(\d{1,2})\s*:?\s*(\d{0,2})\s*(a\.?m\.?|p\.?m\.?)/i;
var TWENTY_FOUR_HOUR_REGEX = /(\d{1,2})\s*:\s*(\d{1,2})/i;

export const TimeZones = [
  { label: '', value: '' },
  { label: 'AKST', value: 'AKST' },
  { label: 'AST', value: 'AST' },
  { label: 'CST', value: 'CST' },
  { label: 'EST', value: 'EST' },
  { label: 'HST', value: 'HST' },
  { label: 'MDT', value: 'MDT' },
  { label: 'MST', value: 'MST' },
  { label: 'NST', value: 'NST' },
  { label: 'PDT', value: 'PDT' },
  { label: 'PST', value: 'PST' },
]

function maybePrependZero(str) {
  if (str.length === 1) {
    return '0' + str;
  } else {
    return str;
  }
}

function getPeriod(hour) {
  if (parseInt(hour) >= 12) {
    return 'pm';
  } else {
    return 'am';
  }
}

function toTwentyFourHourTime(time, format) {
  var match = time.match(TWELVE_HOUR_REGEX);
  if (!match) return;

  var hour = match[1];
  var minute = match[2] || '00';
  var period = match[3].replace(/\./g, '').toLowerCase();

  // Default argument for format
  if (!format) {
    format = 'hh:MM';
  }

  if (period === 'pm' && hour !== '12') {
    return format
      .replace('hh', parseInt(hour, 10) + 12)
      .replace('HH', maybePrependZero(hour))
      .replace('mm', minute)
      .replace('MM', maybePrependZero(minute));
  } else {
    return format
      .replace('hh', hour)
      .replace('HH', maybePrependZero(hour))
      .replace('mm', minute)
      .replace('MM', maybePrependZero(minute));
  }
}

function toTwelveHourTime(time, format) {
  var match = time.match(TWENTY_FOUR_HOUR_REGEX);
  if (!match) return;

  var hour = match[1];
  var minute = match[2];

  // Default argument for format
  if (!format) {
    format = 'hh:MM a';
  }

  if (parseInt(hour) > 12) {
    return format
      .replace('hh', parseInt(hour, 10) - 12)
      .replace('HH', maybePrependZero(hour))
      .replace('mm', minute)
      .replace('MM', maybePrependZero(minute))
      .replace('a', 'pm')
      .replace('A', 'PM');
  } else {
    return format
      .replace('hh', parseInt(hour, 10))
      .replace('HH', maybePrependZero(hour))
      .replace('mm', minute)
      .replace('MM', maybePrependZero(minute))
      .replace('a', getPeriod(hour))
      .replace('A', getPeriod(hour).toUpperCase());
  }
}

export default function (time, format) {
  return toTwentyFourHourTime(time, format) || toTwelveHourTime(time, format);
}

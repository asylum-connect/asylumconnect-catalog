import React from 'react';

import convertTime from '../utils/convertTime';

export const days = [
  {name: 'Monday', abbr: 'Mon', oneletter: 'M'},
  {name: 'Tuesday', abbr: 'Tue', oneletter: 'T'},
  {name: 'Wednesday', abbr: 'Wed', oneletter: 'W'},
  {name: 'Thursday', abbr: 'Thu', oneletter: 'Th'},
  {name: 'Friday', abbr: 'Fri', oneletter: 'F'},
  {name: 'Saturday', abbr: 'Sat', oneletter: 'S'},
  {name: 'Sunday', abbr: 'Sun', oneletter: 'Su'},
];

export const ScheduleParser = ({
  schedule,
  format = 'condensed',
  hideClosed = true,
} = {}) => {
  let openHours = [],
    final = [];
  days.forEach((item) => {
    let name;
    switch (format) {
      case 'condensed':
        name = item.abbr;
        break;
      case 'expanded':
        name = item.name;
        break;
      case 'minimal':
        name = item.oneletter;
        break;
      default:
        break;
    }
    if (
      typeof schedule[item.name.toLowerCase() + '_start'] !== 'undefined' &&
      schedule[item.name.toLowerCase() + '_start'] &&
      typeof schedule[item.name.toLowerCase() + '_end'] !== 'undefined' &&
      schedule[item.name.toLowerCase() + '_end']
    ) {
      let times =
        convertTime(schedule[item.name.toLowerCase() + '_start'], 'hh:MM A') +
        '-' +
        convertTime(schedule[item.name.toLowerCase() + '_end'], 'hh:MM A');

      openHours.push({
        name: name,
        times: times,
      });
    } else {
      openHours.push({
        name: name,
        times: 'Closed',
      });
    }
  });
  for (let i = 0; i < openHours.length; i++) {
    switch (format) {
      case 'condensed':
        if (i === 0 || openHours[i].times !== openHours[i - 1].times) {
          final.push({
            start: openHours[i].name,
            time: openHours[i].times,
          });
        } else if (openHours[i].times === openHours[i - 1].times) {
          final[final.length - 1].end = openHours[i].name;
        }
        if (i + 1 === openHours.length) {
          final = final
            .map((item) => {
              if (typeof item.end !== 'undefined') {
                return {days: item.start + '-' + item.end, time: item.time};
              } else {
                return {days: item.start, time: item.time};
              }
            })
            .filter((item) => {
              return !hideClosed || (hideClosed && item.time !== 'Closed');
            });
        }
        break;
      case 'expanded':
        break;
      case 'minimal':
        break;
      default:
        break;
    }
  }
  if (final.length === 1 && final.time === 'Closed') {
    final = [];
  }
  return final;
};

export const AddressParser = ({address, format = 'inline'} = {}) => {
  let template;
  switch (format) {
    case 'inline':
      template = '[address] [unit], [city], [state] [zip_code]';
      break;
    default:
      template = '[address]\n[unit]\n[city], [state] [zip_code]';
      break;
  }

  let addr = template;
  for (let part in address) {
    if (typeof part === 'string') {
      addr = addr.replace('[' + part + ']', address[part]);
    }
  }

  addr = addr.replace(/(^|\s)\[\w+\]/g, '');

  let final = addr.split('\n');

  if (final.length > 1) {
    return (
      <span>
        {final.map((part, index) => {
          return (
            <span>
              {part}
              <br />
            </span>
          );
        })}
      </span>
    );
  } else {
    return final[0];
  }
};

import PropTypes from "prop-types";
import * as React from "react";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

// 🔴 🟢  🟠

export default function BadgeCalendar(props) {
  const { freeDays, busyDays, fullDays, day, outsideCurrentMonth, ...other } =
    props;

  const free = !outsideCurrentMonth && freeDays.indexOf(day.date()) >= 0;
  const busy = !outsideCurrentMonth && busyDays.indexOf(day.date()) >= 0;
  const full = !outsideCurrentMonth && fullDays.indexOf(day.date()) >= 0;

  let badgeContent;
  if (free) {
    badgeContent = "🟢";
  } else if (busy) {
    badgeContent = "🟠";
  } else if (full) {
    badgeContent = "🔴";
  }
  return (
    <Badge key={day.toString()} overlap="circular" badgeContent={badgeContent}>
      <PickersDay
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

BadgeCalendar.propTypes = {
  freeDays: PropTypes.arrayOf(PropTypes.number),
  busyDays: PropTypes.arrayOf(PropTypes.number),
  fullDays: PropTypes.arrayOf(PropTypes.number),
  day: PropTypes.shape,
  outsideCurrentMonth: PropTypes.bool,
};

BadgeCalendar.defaultProps = {
  freeDays: null,
  busyDays: null,
  fullDays: null,
  day: null,
  outsideCurrentMonth: null,
};

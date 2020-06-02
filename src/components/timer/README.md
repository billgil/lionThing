# Timer

A lit element component that takes an amount of seconds and a title to display a timer that counts down from the total to 0.

```
import '../timer/timer-item.js';

<timer-item></timer-item>
```

### Features

 - @timer-deleted = a custom function to remove this timer from the active timers array
 - @timer-tick = a custom function that ticks down the seconds of each timer
 - @timer-count-toggle = a custom function that lets you toggle the timer, in other words pausing the timer
 - .timerID = This is very important for the parent to identify which element in the array it is
 - .timerTitle = This the the title for the timer
 - .secondsToCount = The total amount if seconds to count down
 - .isCountingDown = A boolean that tracks and controls the counting down state
 - .isCountComplete= A boolean that tracks when the timer is finished
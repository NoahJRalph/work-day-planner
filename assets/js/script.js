// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  let masterContainerEl = $(`#masterContainer`);
  let saveBtnEl = $(`#saveBtn`);
  saveBtnEl.on(`click`, function () {
    let ParentDivID = $(this).parent().parent().attr('id');
    console.log($(this).parent().parent().attr('id'));
  });
  //Populates the rows with adequately time-labeled bars while keeping the code as clean as possible (not copy-pasting 24 different rowContents here or in the html)
  console.log(dayjs().hour());
  for(let i=0; i<24; i++) {
    // Sets correct hour text
    let hour = i;
    let amPM = `AM`;
    switch(i) {
      case 0:
        hour = 12; break;
      case 12:
        amPM = `PM`; break;
      default: break;
    };
    if (13<=i) {
      hour = i-12;
      amPM = `PM`;
    }
    // Sets correct bar color
    let timeLabel = [`past`, `present`, `future`];
    let timeChoice;
    if(dayjs().hour() > i) {
      timeChoice = 0;
    }
    else if (dayjs().hour() == i) {
      timeChoice = 1;
    }
    else {
      timeChoice = 2;
    }
    // Takes all the data and makes a proper html blurb with it to insert
    let rowContent = (
      `<div id="hour-` + i + `" class="row time-block ` + timeLabel[timeChoice] + `">
        <div class="col-2 col-md-1 hour text-center py-3">` + hour + amPM + `</div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>`
    );
    masterContainerEl.append(rowContent);
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // Displays current day's date
  let currentDay = dayjs().format('MMM DD, YYYY');
  let currentDayEl = $(`#currentDay`);
  currentDayEl.text(currentDay);
});

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  //Populates the rows with adequately time-labeled bars while keeping the code as clean as possible (not copy-pasting 24 different rowContents here or in the html).
  for(let i=0; i<24; i++) {
    // Sets correct hour text.
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
    // Sets correct bar color.
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
    // Sets the textarea content.
    let textAreaContent = ``;
    let storedHourInfo = localStorage.getItem(`hour-${i}`);
    if (storedHourInfo != null && storedHourInfo != undefined) {
      textAreaContent = storedHourInfo;
    }
    // Takes all the data and makes a proper html blurb with it to insert.
    let rowContent = (
      `<div id="hour-${i}" class="row time-block ${timeLabel[timeChoice]}">
        <div class="col-2 col-md-1 hour text-center py-3">${hour}${amPM}</div>
        <textarea class="col-8 col-md-10 description" rows="3">${textAreaContent}</textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>`
    );
    $(`#masterContainer`).append(rowContent);
  };
  // ===OUTSIDE THE HOUR RENDER LOOP===
  // Displays current day's date.
  $(`#currentDay`).text(dayjs().format(`MMM DD, YYYY`));
  // Saves data inputed into the textarea when the save button is hit.
  $(`.saveBtn`).on(`click`, function () {
    localStorage.setItem($(this).parent().attr(`id`), $(this).siblings(`.description`).val());
  });
});
function format(inputDate1, id) {
    inputDate = new Date(inputDate1)
    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();

      date = date
          .toString()
          .padStart(2, '0');

      month = month
          .toString()
          .padStart(2, '0');

    let day = `${date}/${month}/${year}`;
    document.getElementById(id).innerText = day
  }
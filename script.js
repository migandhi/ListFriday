document.addEventListener('DOMContentLoaded', function() {
    // Function to add days to a date
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    // Function to get the next Friday from a given date
    function getNextFriday(date) {
        var day = date.getDay();
        var diff = (5 - day + 7) % 7; // 5 corresponds to Friday
        return addDays(date, diff);
    }

    // Function to generate a list of Fridays for the next 10 years
    function generateFridaysList() {
        var fridaysList = [];
        var currentDate = new Date();

        // Loop for 10 years
        for (var i = 0; i < 10 * 365; i += 7) {
            var nextFriday = getNextFriday(currentDate);
            var hijriDate = HijriDate.fromGregorian(nextFriday);

            fridaysList.push({
                gregorianDate: nextFriday,
                hijriDate: hijriDate
            });

            // Move to the next week
            currentDate = addDays(nextFriday, 7);
        }

        return fridaysList;
    }

    // Function to display the Fridays list
    function displayFridaysList() {
        var fridaysList = generateFridaysList();
        var output = '';

        fridaysList.forEach(function(friday) {
            var gregorianString = friday.gregorianDate.toDateString();
            var hijriString = friday.hijriDate.getDate() + ' ' +
                              HijriDate.getMonthName(friday.hijriDate.getMonth()) + ' ' +
                              friday.hijriDate.getYear();

            output += 'Gregorian: ' + gregorianString + ' - Hijri: ' + hijriString + '<br>';
        });

        document.getElementById('fridays-list').innerHTML = output;
    }

    // Call the display function when the page loads
    displayFridaysList();
});

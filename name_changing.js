let jsonData;

fetch('./names_with_styles.json')
    .then(response => response.json())
    .then(data => {
        // Assign the data to the variable
        jsonData = data;

        let i = 0;
        let jsonKeys = Object.keys(jsonData);
        let jsonValues = Object.values(jsonData);
        const spanElement = document.getElementById('changing-names');
        function start(counter) {

            setTimeout(function () {
                nameData = jsonValues[counter];
                spanElement.textContent = nameData["name"];
                spanElement.style.color = nameData["color"];
                counter = (counter + 1) % jsonValues.length;
                start(counter);
            }, 1500);

        }
        start(0);
    })
    .catch(error => {
        // Handle any errors
        console.log(error);
    });

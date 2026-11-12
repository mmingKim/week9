const locale = document.getElementById("locale");
const weatherButton = document.getElementById("weatherButton");
const info = document.getElementById("info");
const pixelCat = document.getElementById("pixelCat");

function colorCat(temperature) {
  if (temperature < 40) {
    pixelCat.src = "cat-very-cold.png";
  } else if (temperature < 60) {
    pixelCat.src = "cat-cold.png";
  } else if (temperature < 80) {
    pixelCat.src = "cat-warm.png";
  } else {
    pixelCat.src = "cat-hot.png";
  }
}

async function checkWeather() {
  const city = locale.value.trim();

  if (city === "") {
    info.textContent = "Please enter a city.";
    return;
  }

  info.textContent = "Checking the weather...";

  // This is the Visual Crossing weather API used in the class example.
  const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + encodeURIComponent(city);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Weather request failed");
    }

    const result = await response.json();
    const temperature = result.days[0].temp;

    colorCat(temperature);
    info.textContent = city + " is " + temperature + "°F today.";
  } catch (error) {
    info.textContent = "City not found. Please try again.";
    console.error(error);
  }
}

weatherButton.addEventListener("click", checkWeather);

locale.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkWeather();
  }
});

const button = document.querySelector("#button");
const select = document.querySelector("#dropdown");
const options = document.querySelectorAll(".option");
const selectLabel = document.querySelector("#select-label");
const countryContainer = document.querySelector("#country-container");
const inputCountry = document.querySelector(".input-country");
const searchCountry = document.querySelector("#search-country");
const loadMoreBtn = document.querySelector(".custom-btn");
let cardSet;
let clickCount = 1;

button.addEventListener("click", function (e) {
  e.preventDefault();
  toggleHidden();
});

function toggleHidden() {
  select.classList.toggle("hidden");
}

options.forEach(function (option) {
  option.addEventListener("click", function (e) {
    setSelectTitle(e);
  });
});

function setSelectTitle(e) {
  const labelElement = document.querySelector(
    `label[for="${e.target.id}"]`
  ).innerText;
  selectLabel.innerText = labelElement;
  toggleHidden();
  console.log(labelElement);
  getRegionCountries(labelElement); // passing the region to the function
}

console.log("connected to html");

const fetchAllCountries = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const data = await fetch(
      "https://restcountries.com/v3.1/all",
      requestOptions
    ).then((response) => response.json());

    console.log(data);
    displayCountriesCard(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

async function getRegionCountries(region) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const data = await fetch(
      `https://restcountries.com/v3.1/region/${region}`,
      requestOptions
    ).then((response) => response.json());

    console.log(data);
    displayCountriesCard(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

inputCountry.addEventListener("submit", (e) => {
  e.preventDefault();
  getSingleCountry(searchCountry.value);
});
async function getSingleCountry(country) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  try {
    let status = "";
    const data = await fetch(
      `https://restcountries.com/v3.1/name/${country}/?fullText=true`,
      requestOptions
    ).then((response) => {
      status = response.status;
      return response.json();
    });
    console.log(data);
    console.log("status", status);
    if (status === 404) {
      tata.error("API ERROR", "country not found", {
        position: "tr",
        animate: "slide",
      });
    }
    displayCountriesCard(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function displayCountriesCard(data) {
  // const data = await fetchAllCountries();

  const loader = `<div class="load-data">this is loader</div>`;
  countryContainer.innerHTML = loader;
  let htmlContent = "";
  let arrLength = data.length;
  if (data.length > 20) {
    arrLength = 20;
    cardSet = data;
    clickCount = 0;
    loadMoreBtn.classList.remove("hide-button");
    //
  }
  if (data.length === 1) {
    arrLength = data.length;
    console.log("array length is", arrLength);
    console.log("type of data is", typeof data, data);
    loadMoreBtn.classList.add("hide-button");
  }
  for (let i = 0; i < arrLength; i++) {
    const {
      flags: { png: imgSrc } = "image error",
      population,
      continents = ["unknown"],
      capital = ["unknown"],
      name: { common: countryName } = "country name error",
    } = data[i];
    console.log("any missing data", imgSrc, population, continents, capital);
    console.log(data[i]);
    console.log(capital);
    let cap = capital[0];
    htmlContent += `
          <div data-countryId="23121" class="card">
              <div class="image">
                <img
                  src="${imgSrc}"
                  alt="flag"
                  width="100px"
                />
              </div>
              <div class="card-content">
                <h3>${countryName}</h3>
                <p><span class="country-data">Population:</span>${population}</p>
                <p><span class="country-data">Region:</span>${data[i]?.continents[0]}</p>
                <p><span class="country-data">Capital:</span>${cap}</p>
              </div>
            </div>
      `;
  }
  countryContainer.innerHTML = htmlContent;
}

loadMoreBtn.addEventListener("click", () => {
  //
  // console.log(cardSet[20]);
  // let subArray;
  // data
  let adjacentHtmlContent = "";
  if (cardSet.length > clickCount * 20 + 20) {
    for (let i = clickCount * 20; i < clickCount * 20 + 20; i++) {
      const {
        flags: { png: imgSrc } = "image error",
        population,
        continents = ["unknown"],
        capital = ["unknown"],
        name: { common: countryName } = "country name error",
      } = cardSet[i];
      console.log("any missing data", imgSrc, population, continents, capital);
      console.log(cardSet[i]);
      console.log(capital);
      let cap = capital[0];
      adjacentHtmlContent += `
          <div data-countryId="23121" class="card">
              <div class="image">
                <img
                  src="${imgSrc}"
                  alt="flag"
                  width="100px"
                />
              </div>
              <div class="card-content">
                <h3>${countryName}</h3>
                <p><span class="country-data">Population:</span>${population}</p>
                <p><span class="country-data">Region:</span>${cardSet[i]?.continents[0]}</p>
                <p><span class="country-data">Capital:</span>${cap}</p>
              </div>
            </div>
      `;
    }
    // console.log("last child is", countryContainer.lastChild);
    countryContainer.insertAdjacentHTML("beforeend", adjacentHtmlContent);
    if (cardSet.length === clickCount * 20 + 20) {
      loadMoreBtn.classList.add("hide-button");
    }
  } else {
    console.log(
      "cardset length",
      cardSet.length,
      "currently displayed",
      clickCount * 20 + 20
    );
    let adjacentHtmlContent = "";

    if (clickCount * 20 < cardSet.length) {
      for (let i = clickCount * 20; i < cardSet.length; i++) {
        const {
          flags: { png: imgSrc } = "image error",
          population,
          continents = ["unknown"],
          capital = ["unknown"],
          name: { common: countryName } = "country name error",
        } = cardSet[i];
        console.log(
          "any missing data",
          imgSrc,
          population,
          continents,
          capital
        );
        console.log(cardSet[i]);
        console.log(capital);
        let cap = capital[0];
        adjacentHtmlContent += `
          <div data-countryId="23121" class="card">
              <div class="image">
                <img
                  src="${imgSrc}"
                  alt="flag"
                  width="100px"
                />
              </div>
              <div class="card-content">
                <h3>${countryName}</h3>
                <p><span class="country-data">Population:</span>${population}</p>
                <p><span class="country-data">Region:</span>${cardSet[i]?.continents[0]}</p>
                <p><span class="country-data">Capital:</span>${cap}</p>
              </div>
            </div>
      `;
        console.log(i);
      }
      countryContainer.insertAdjacentHTML("beforeend", adjacentHtmlContent);
      loadMoreBtn.classList.add("hide-button");
    }
    // loadMoreBtn.classList.add("hide-button");
  }
  clickCount++;
});

// async function appendCards (data) => {

// }

fetchAllCountries();

/* data.forEach((country = {}) => {
    const {
      flags: { png: imgSrc },
      Population,
      continents,
      capital,
    } = country;
    console.log(imgSrc);
    const cardHTML = `
          <div data-countryId="23121" class="card">
              <div class="image">
                <img
                  src="${imgSrc}"
                  alt="flag"
                  width="100px"
                />
              </div>
              <div class="card-content">
                <h3>Germany</h3>
                <p><span class="country-data">Population:</span>81,770,900</p>
                <p><span class="country-data">Region:</span>Europe</p>
                <p><span class="country-data">Capital:</span>Berlin</p>
              </div>
            </div>
      `;

    //   countryContainer.replaceChildren();
    // countryContainer.child = cardHTML;
  }); */

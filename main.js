const button = document.querySelector("#button");
const select = document.querySelector("#dropdown");
const options = document.querySelectorAll(".option");
const selectLabel = document.querySelector("#select-label");
const countryContainer = document.querySelector("#country-container");
const inputCountry = document.querySelector(".input-country");
const searchCountry = document.querySelector("#search-country");
const loadMoreBtn = document.querySelector("#load-more");
const detailsPage = document.querySelector(".details-page");
const BackButton = document.querySelector("#back-button");
const Main = document.querySelector("#main");
const borderCountries = document.querySelector(".border-countries");
const detailsImage = document.querySelector("#detail-image");
const detailsName = document.querySelector("#details-name");
const detailsPopulation = document.querySelector("#details-population");
const detailsRegion = document.querySelector("#details-region");
const detailsSubRegion = document.querySelector("#details-sub-region");
const detailsCapital = document.querySelector("#details-capital");
const detailsDomain = document.querySelector("#details-domain");
const detailsCurrency = document.querySelector("#details-currency");
const detailsLanguage = document.querySelector("#details-language");

// const card = document.querySelectorAll(".card");
let cardSet;
let clickCount = 1;

BackButton.addEventListener("click", () => {
  detailsPage.classList.add("hide-details");
  Main.classList.remove("hide-main");
});

countryContainer.addEventListener(
  "click",
  (event) => {
    let target = event.target;
    console.log(target);
    console.log(target.dataset);
    console.log(JSON.parse(target.dataset.currencies));
    console.log(JSON.parse(target.dataset.languages));
    detailsImage.removeAttribute("src");
    detailsImage.setAttribute("src", target.dataset.image);
    console.log(target.dataset.image);
    borderCountries.innerHTML = "";
    /* 
    while (borderCountries.firstChild) {
      div.removeChild(div.firstChild);
    }
    */

    if (target.dataset.borders != "undefined") {
      const para = document.createElement("p");
      para.innerHTML = "<p><b>Border countries:</b></p>";
      borderCountries.append(para);
      const arr = JSON.parse(target.dataset.borders);
      console.log("type of is", typeof arr);
      // for (const border of arr) {
      //   console.log(border);
      // }

      arr.forEach((border) => {
        const Span = document.createElement("span");
        const textNode = document.createTextNode(border);
        Span.append(textNode);
        borderCountries.append(Span);
      });
      // borderCountries;
      console.log(JSON.parse(target.dataset.borders));
    }
    // target.dataset
    detailsPage.classList.remove("hide-details");
    Main.classList.add("hide-main");
    document.documentElement.scrollTop = 0;
  },
  { capture: true }
);

button.addEventListener("click", function (e) {
  e.preventDefault();
  detailsImage.removeAttribute("src");
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
  // console.log(labelElement);
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

    // console.log(data);
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

    // console.log(data);
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
    // console.log(data);
    // console.log("status", status);
    if (status === 404) {
      loadMoreBtn.classList.add("hide-button");

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
    loadMoreBtn.classList.remove("hide-button");
    //
  }
  if (data.length === 1) {
    arrLength = data.length;
    // console.log("array length is", arrLength);
    // console.log("type of data is", typeof data, data);
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
    // console.log("any missing data", imgSrc, population, continents, capital);
    // console.log(data[i]);
    // console.log(capital);
    let cap = capital[0];
    htmlContent += `
          <div class="card" data-country-name="${countryName}" data-population="${population}" data-image="${imgSrc}" data-country-name="${countryName}" data-region="${
      cardSet[i]?.continents[0]
    }" data-languages=${JSON.stringify(
      cardSet[i]?.languages
    )} data-capital=${cap} data-currencies='${JSON.stringify(
      cardSet[i]?.currencies
    )}' data-subregion=${
      cardSet[i]?.subregion
    } data-capital="${cap}" data-borders='${JSON.stringify(
      cardSet[i]?.borders
    )}'>
              <div class="image">
                <img
                  src="${imgSrc}"
                  alt="flag"
                  width="100px"
                />
              </div>
              <div class="card-content">
                <h3>${countryName}</h3>
                <p><span class="country-data">Population:</span>&nbsp;&#160;${population}</p>
                <p><span class="country-data">Region:</span>&nbsp;&#160;${
                  data[i]?.continents[0]
                }</p>
                <p><span class="country-data">Capital:</span>&nbsp;&#160;${cap}</p>
              </div>
            </div>
      `;
  }
  // ANCHOR ENTER THE COUNTER HERE
  countryContainer.innerHTML = htmlContent;
}

loadMoreBtn.addEventListener("click", () => {
  //
  // console.log(cardSet[20]);
  // let subArray;
  // data
  let adjacentHtmlContent = "";
  if (cardSet.length > clickCount * 20 + 20) {
    console.log(clickCount);
    for (let i = clickCount * 20; i < clickCount * 20 + 20; i++) {
      const {
        flags: { png: imgSrc } = "image error",
        population,
        continents = ["unknown"],
        capital = ["unknown"],
        name: { common: countryName } = "country name error",
      } = cardSet[i];
      // console.log("any missing data", imgSrc, population, continents, capital);
      // console.log(cardSet[i]);
      // console.log(capital);
      let cap = capital[0];
      adjacentHtmlContent += `
          <div class="card" data-country-name="${countryName}" data-population="${population}" data-image="${imgSrc}" data-country-name="${countryName}" data-region="${
        cardSet[i]?.continents[0]
      }" data-languages=${JSON.stringify(
        cardSet[i]?.languages
      )} data-capital="${cap}" data-currencies=${JSON.stringify(
        cardSet[i]?.currencies
      )} data-subregion="${
        cardSet[i]?.subregion
      }" data-capital="${cap}" data-borders=${JSON.stringify(
        cardSet[i]?.borders
      )}>
              <div class="image">
                <img
                  src="${imgSrc}"
                  alt="flag"
                  width="100px"
                />
              </div>
              <div class="card-content">
                <h3>${countryName}</h3>
                <p><span class="country-data">Population:</span>&nbsp;&#160; ${population}</p>
                <p><span class="country-data">Region:</span>&nbsp;&#160;${
                  cardSet[i]?.continents[0]
                }</p>
                <p><span class="country-data">Capital:</span>&nbsp;&#160;${cap}</p>
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
    // console.log(
    //   "cardset length",
    //   cardSet.length,
    //   "currently displayed",
    //   clickCount * 20 + 20
    // );
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
        // console.log(
        //   "any missing data",
        //   imgSrc,
        //   population,
        //   continents,
        //   capital
        // );
        // console.log(cardSet[i]);
        // console.log(capital);
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
        // console.log(i);
      }
      countryContainer.insertAdjacentHTML("beforeend", adjacentHtmlContent);
      loadMoreBtn.classList.add("hide-button");
      clickCount = 0;
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

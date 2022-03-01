const button = document.querySelector("#button");
const select = document.querySelector("#dropdown");
const options = document.querySelectorAll(".option");
const selectLabel = document.querySelector("#select-label");
const countryContainer = document.querySelector("#country-container");

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
    return data;
  } catch (error) {
    console.error(error);
  }
};

const displayCountriesCard = async () => {
  const data = await fetchAllCountries();

  const loader = `<div class="load-data">this is loader</div>`;
  countryContainer.innerHTML = loader;
  let htmlContent = "";
  for (let i = 0; i < 20; i++) {
    const {
      flags: { png: imgSrc },
      population,
      continents,
      capital = ["unknown"],
      name: { common: countryName },
    } = data[i];
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
};

displayCountriesCard();

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

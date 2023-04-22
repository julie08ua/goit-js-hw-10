import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBoxEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

searchBoxEl.addEventListener('input', debounce(onSearchBoxInput, DEBOUNCE_DELAY));

function onSearchBoxInput(e) {
    e.preventDefault();
    let inputValue = e.target.value.trim();

    if (!inputValue) {
        clearMarkup();
        return;
    }

    clearMarkup();

    fetchCountries(inputValue)
        .then(data => {
            if (data.length === 1) {
                countryInfoEl.innerHTML = createMarkup(data);
            }
            else if (data.length > 10) {
                Notiflix.Notify.warning('Too many matches found. Please enter a more specific name');
            }
            else {
                countryListEl.innerHTML = createMarkup(data);
            }
        })
        .catch(error => Notiflix.Notify.failure("Oops, there is no country with that name"));
}

function createMarkup(arr){
if (arr.length === 1) {
    return arr
        .map(({ name: { official }, capital, population, flags: { svg }, languages }) =>
        `<h2 class='js-container'><img src="${svg}" alt="${official}"/>${official}</h2>
        <p><span class='list-item-part'>Capital:</span> ${capital}</p>
        <p><span class='list-item-part'>Population:</span> ${population}</p>
        <p><span class='list-item-part'>Languages:</span> ${Object.values(languages)}</p>`
        )
        .join('');
} else {
    return arr
        .map(({ name: { official }, flags: { svg } }) =>
            `<li class='list-item'>
                <img src="${svg}" alt="${official}"/>
                <h2 js-title>${official}</h2>
            </li>`
    )
        .join('');
}
}

function clearMarkup() {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
}




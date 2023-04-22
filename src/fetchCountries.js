export function fetchCountries(name){
   return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,languages,population,flags`)
        .then(response => {
            if (!response.ok) {
            throw new Error(response.statusText);
            }
            return response.json();
        })
}
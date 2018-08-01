'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {
        // console.log(results); // eslint-disable-line no-console
        let userList = document.getElementById('z-user-list');
        for (let i = 0; i < results.length; i++) {
            let user = results[i];
            let firstName = capitalize(user.name.first);
            let lastName = capitalize(user.name.last);
            let city = capitalize(user.location.city);
            let state = capitalize(user.location.state);

            userList.insertAdjacentHTML('beforeend', `
            <li class="user">
                <img class="user-photo" src="${user.picture.medium}" alt="Photo of ${firstName} ${lastName}">
                <div class="user-name">${firstName} ${lastName}</div>
                <div class="user-location">${city}, ${state}</div>
                <div class="user-email">${user.email}</div>
            </li>`);
        }
    }

    function capitalize(string) {
        let words = string.split(' ');
        let capWords = words.map(word => word[0].toUpperCase() + word.slice(1));
        return capWords.join(' ');
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);

})();

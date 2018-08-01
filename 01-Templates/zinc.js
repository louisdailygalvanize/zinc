'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {
        // console.log(results); // eslint-disable-line no-console
        let userList = document.getElementById('z-user-list');
        for (let i = 0; i < results.length; i++) {
            let user = results[i];
            userList.insertAdjacentHTML('beforeend', `
            <li class="user">
                <img class="user-photo" src="${user.picture.medium}" alt="Photo of ${user.name.first} ${user.name.last}">
                <div class="user-name">${user.name.first} ${user.name.last}</div>
                <div class="user-location">${user.location.city}, ${user.location.state}</div>
                <div class="user-email">${user.email}</div>
            </li>`);
        }
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();

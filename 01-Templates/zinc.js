'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {
        // let template = 
        // `
        // <li class="user">
        //     <img class="user-photo" src="{{ picture.thumbnail }}" alt="Photo of {{ name.first }} {{ name.last }}">
        //     <div class="user-name">{{ name.first }} {{ name.last }}</div>
        //     <div class="user-location">{{ location.city }}, {{ location.state }}</div>
        //     <div class="user-email">{{ email }}</div>
        // </li>
        // `

        // Grab our user list element.
        let userList = document.getElementById('z-user-list');
        for (let i = 0; i < results.length; i++) {
            let user = results[i];

            // Render our template with the appropriate logic.
            // After rendering the template with the appropriate data, we can insert the rendered template
            // within the userlist.
            console.log(user);
            renderTemplate('user', user)
            .then(userTemplate => userList.insertAdjacentHTML('beforeend', userTemplate));
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

    function renderTemplate(templateString, data) {
        // Declaring regular expression to capture interpolated property.
        let propertyExpression = /{{\s*([\w.]+)\s*}}/g;

        // Taking the template string, finding all occurances of interpolated properties and replacing them with
        // their respective data.
        let url = templateString.includes('http://') ? templateString : `${templateString}.html`;

        return fetch(url)
        .then(res => res.text())
        .then(template => template.replace(propertyExpression, (match, capturedProperty) => capturedProperty.split('.').reduce((acc, cur) => acc[cur], data)));
    }

    document.addEventListener('DOMContentLoaded', init);

})();

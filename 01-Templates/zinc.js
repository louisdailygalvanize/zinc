'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {
        let template = 
        `
        <li class="user">
            <img class="user-photo" src="{{ photo }}" alt="Photo of {{ firstName }} {{ lastName }}">
            <div class="user-name">{{ firstName }} {{ lastName }}</div>
            <div class="user-location">{{ city }}, {{ state }}</div>
            <div class="user-email">{{ email }}</div>
        </li>
        `

        // Grab our user list element.
        let userList = document.getElementById('z-user-list');
        for (let i = 0; i < results.length; i++) {
            let user = results[i];

            let userData = {};
            userData.photo = user.picture.medium;
            userData.firstName = capitalize(user.name.first);
            userData.lastName = capitalize(user.name.last);
            userData.city = capitalize(user.location.city);
            userData.state = capitalize(user.location.state);
            userData.email = user.email;

            // Render our template with the appropriate logic.
            let userTemplate = renderTemplate(template, userData);

            // After rendering the template with the appropriate data, we can insert the rendered template
            // within the userlist.
            userList.insertAdjacentHTML('afterend', userTemplate);   
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
        let propertyExpression = /{{\s*(\w+)\s*}}/g;

        // Taking the template string, finding all occurances of interpolated properties and replacing them with
        // their respective data.
        return templateString.replace(propertyExpression, (match, capturedProperty) => {
            return data[capturedProperty]; 
        });
    }

    document.addEventListener('DOMContentLoaded', init);

})();

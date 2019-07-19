'use strict';
/* global $ */

const baseURL = 'https://api.github.com/users/';


/**
 * Fetch user repos
 */
const getRepos = function() {
  fetch()
    .then(response => response.json())
    .then(jsonData => {
      extractData(jsonData);
    })
    .catch(error => console.log(error));
};

/**
 * Extract data to be used on page
 * @param data - the JSON data
 */
const extractData = function(data){
  data.forEach(repo => {
    let {
      name,
      html_url,
      created_at,
      description
    } = repo;
    
    let dateCreated = new Date(created_at);
    $('.repos').append(createTemplate(name, html_url, dateCreated, description));
  });
};

/**
 * Create HTML template for each result
 * @param repo_name
 * @param url
 * @param created_at
 * @param decription
 */
const createTemplate = function(repo_name, url, date, description) {
  let template = `
  <section>
    <h2><a href="${url}">${repo_name}</a></h2>
    <ul>
      <li>Description: ${description}</li>
      <li>
        Date created: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}
      </li>
    </ul>
  </section>
  `;
  return template;
};

const handleUserSubmit = function() {
  $('form').submit(event => {
    event.preventDefault();
    const handle = $(event.currentTarget).find('input').val();
    formatHandle(handle);
  });
};

const main = function() {
  handleUserSubmit();
};

$(main);
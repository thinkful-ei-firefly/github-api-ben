'use strict';
/* global $ */

const baseURL = 'https://api.github.com/users/';

const getRepos = function(handle) {
  const url = baseURL + handle + '/repos';
  fetch(url)
    .then(response => response.json())
    .then(jsonData => {
      extractData(jsonData);
    })
    .catch(error => console.log(error));
};

const extractData = function(data) {
  data.forEach(repo => {
    let { name, html_url } = repo;
    $('.repos').append(createTemplate(name, html_url));
  });
};

const createTemplate = function(repo_name, url) {
  let template = `
  <section>
    <p><a href="${url}" target="_blank">${repo_name}</a></p>
  </section>
  `;
  return template;
};

const handleUserSubmit = function() {
  $('form').submit(event => {
    event.preventDefault();
    $('.repos').empty();
    const handle = $(event.currentTarget)
      .find('input')
      .val();
    $('.repos').append(`<h2>Repos for User: <br>${handle}</h2>`);
    getRepos(handle);
    $(event.currentTarget)
      .find('input')
      .val('');
  });
};

$(handleUserSubmit);

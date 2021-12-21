// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Take the initial 9 bars and split them in half
// 0-3 on the left and 4-8 on the right
Cypress.Commands.add('weigh', (list) => {
    console.log('inside weigh')
    let l = cy.slice_array(list)
    console.log(l)
    cy.wrap(l[0]).each((num, i, array) => {
      cy.get(`#left_${num}`).type(num);
    });
    cy.wrap(l[1]).each((num, i, array) => {
      cy.get(`#right_${num}`).type(num);
    });
    cy.get('#weigh').click();
})

// take the larger array and split it into 2 and 3
Cypress.Commands.add('compare_results', () => {
  let list = cy.get('.game-info li').last().invoke('text')
  let words = list.split(' ')
  console.log(words[1])
  // should split into [left_array, symbol, right_array]
  if (words[1] == '>') {
    console.log('left is heavier')
    // the left array is heavier than the right so split it
    if (words[0].length > 1) { return cy.slice_array(words[0]) }
    else {  return words[0] }
  }
  else {
    console.log('left is heavier')
      // The right array is heavier
    if (words[2].length > 1) { return cy.slice_array(words[2]) }
    else {  return words[2] }
  }
})

Cypress.Commands.add('slice_array', (list) => {
  const half = Math.floor(list.length / 2);
  const firstHalf = list.splice(0, half)
  const secondHalf = list.splice(-half)
  return [firstHalf, secondHalf]
})

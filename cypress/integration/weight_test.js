/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://ec2-54-208-152-154.compute-1.amazonaws.com/')
  })

  it('Can find the fake bar', () => {
    cy.get('#weigh').should('be.visible')
    let initial_list = [[0,1,2,3], [4,5,6,7,8]]
    cy.weigh(initial_list)
    let new_array = cy.compare_results()
    // weigh the array
    // check the output
    // hit reset
    while (new_array.length > 1) {
        cy.weigh(new_array)
        new_array = cy.compare_results()
        cy.get('#reset').click()
    }
    // cy.get(`#coin_${new_array[0].charAt(1)}`).click()
    // cy.on('window:alert', (str) => {
    //   expect(str).to.equal(`Yay! You find it!`)
    // })
  })
})

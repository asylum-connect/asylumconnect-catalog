/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Utility Functions Tests', () => {

    it('Test Utility Functions',()=>{
        cy.testUtilityFunctions(Cypress.env('utility_variables'));
    });
    
});
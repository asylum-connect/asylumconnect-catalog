Cypress.Commands.add('testSearchDetailPage',(viewport,org)=>{
    cy.viewport(viewport);
    cy.getElementByTestId('search-page-next-button').click();
    cy.waitFor(1000);
    //Check checkbox
    cy.getElementByTestId('search-page-checkbox').click();
    cy.getElementByTestId('search-bar-input').type(org.search);
    cy.getElementByTestId('search-bar-item-suggestion').then($element=>{
        cy.wrap($element[0]).click();
    });
    cy.getElementByTestId('search-bar-search-button').click();
    cy.wait(500);
    
    cy.getElementByTestId('favorites-list-item').then($element=>{
        expect($element).to.be.visible;
        //click the org
        cy.wrap($element).click();
        cy.wait(200);
        cy.getElementByTestId('details-about').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('The Nebraska AIDS Project leads the community in the fight to overcome HIV/AIDS and its stigma through education, supportive services and advocacy.');
        });
        cy.getElementByTestId('details-communities').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('Adults (18+), LGBTQ Youth, Immigrants from Latin America, Latino community, Teens, Seniors, Transgender, non-binary and gender non-conforming community');
        });
        cy.getElementByTestId('details-header').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('Nebraska AIDS Project');
        });
        cy.getElementByTestId('details-header-verified-icon').then($element=>{
            expect($element).to.be.visible;
            expect($element).to.have.attr('width','24');
            expect($element).to.have.attr('height','24');
            expect($element).to.have.attr('version','1.1');
            
        });
        cy.getElementByTestId('details-header-verified-text').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('Verified Information');
        });
        
    });

});
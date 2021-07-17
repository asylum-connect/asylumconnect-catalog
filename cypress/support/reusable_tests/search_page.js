Cypress.Commands.add('testSearchPageElements',(viewport)=>{
    cy.viewport(viewport);
    cy.getElementByTestId('search-page-next-button').click();
    cy.waitFor(2000);
    cy.getElementByTestId('search-form-header').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain("On March 20, 2020, the United States announced the borders with Mexico and Canada will be closed. Asylum seekers will be turned back from all borders.");
    });
    if(viewport!==Cypress.env('mobile')){
        cy.getElementByTestId('search-form-body').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('Welcome to the United States AsylumConnect Catalog!');
        });
    }

    cy.getElementByTestId('search-form-body-2').then($element=>{
        expect($element).to.be.visible;
        expect($element).contain('Search for verified LGBTQ- and immigrant-friendly services near you');
    });

    cy.getElementByTestId('search-bar-input').then($element=>{
        expect($element).to.be.visible;
    })

    cy.getElementByTestId('search-page-checkbox').then($element=>{
        expect($element).to.be.visible;
    });

    cy.getElementByTestId('search-bar-search-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('type','submit');
    });

    cy.getElementByTestId('search-form-download-link').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('target','_blank');
        expect($element).to.have.attr('rel','noopener noreferrer');
        expect($element).contain("Download Legal Guides on LGBTQ Asylum in the U.S.");
    });
});


Cypress.Commands.add('testSearchAction',(viewport,org)=>{
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
    });
    cy.getElementByTestId('search-result-favorite-button').then($element=>{
        expect($element).to.be.visible;
        expect($element).to.have.attr('data-name','Layer 1');
    });
    cy.getElementByTestId('badge').then($element=>{
        expect($element).to.be.visible;
    });
    cy.getElementByTestId('favorites-list-item').then($element=>{
        expect($element).to.be.visible;
        //click the org
        cy.wrap($element).click();

        cy.getElementByTestId('back-button').then($element=>{
            expect($element).to.be.visible;
            if(viewport !==Cypress.env('mobile')){
            expect($element.children()).contain('Back to Search Results');
            }
        });
        cy.getElementByTestId('tabs-value-about').then($element=>{
            expect($element).to.be.visible;
            expect($element).to.have.attr('type','button');
            expect($element.children()).contain('ABOUT');
        });
        cy.getElementByTestId('tabs-value-visit').then($element=>{
            expect($element).to.be.visible;
            expect($element).to.have.attr('type','button');
            viewport === Cypress.env('mobile') ? expect($element.children()).contain('VISIT (MAP)'): expect($element.children()).contain('VISIT');
        });

        cy.getElementByTestId('tabs-value-reviews').then($element=>{
            expect($element).to.be.visible;
            expect($element).to.have.attr('type','button');
            expect($element.children()).contain('REVIEWS');
        });

        cy.getElementByTestId('search-result-favorite-button').then($element=>{
            expect($element).to.be.visible;
            //click and test pop up
           // cy.wrap($element).click();
           // cy.getElementByTestId('resource-detail-dialog-close-button').click();
        });
        cy.scrollTo('top');
        cy.getElementByTestId('resource-details-share').then($element=>{
            expect($element).to.be.visible;
        });
        if(viewport===Cypress.env('desktop')){
        cy.getElementByTestId('resource-star-rating').then($element=>{
            expect($element).to.be.visible;
        });
    }

        cy.getElementByTestId('disclaimer').then($element=>{
            expect($element).to.be.visible;
        });

        cy.getElementByTestId('resource-details-services').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('Services');
        });

        cy.getElementByTestId('resource-details-communities').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('Who this organization serves');
        });

        cy.getElementByTestId('resource-details-services').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('Services');
        });
        cy.getElementByTestId('resource-details-language-services').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('Language services');
        });
        cy.getElementByTestId('resource-details-visit').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('Visit');
        });
        //Non-Mobile only
        if(viewport!==Cypress.env('mobile')){
        cy.getElementByTestId('resource-details-reviews').then($element=>{
            expect($element).to.be.visible;
            expect($element).contain('Reviews');
        });
        }

        cy.getElementByTestId('badge').then($element=>{
            expect($element).to.be.visible;
        });

    });





})
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import '@cypress/code-coverage/support';

// Import Reusable Tests definitions
import './reusable_tests/navigation_bar';
import './reusable_tests/login';
import './reusable_tests/create_account';
import './reusable_tests/account_settings';
import './reusable_tests/favorites';
import './reusable_tests/footer_bar';
import './reusable_tests/suggest_resource';
import './reusable_tests/search_page';
import './reusable_tests/announcement';
import './reusable_tests/language';
import './reusable_tests/utility';
import './reusable_tests/details';


// Alternatively you can use CommonJS syntax:
// require('./commands')

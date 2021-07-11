import convertTime from "../../../src/utils/convertTime";
import language from "../../../src/utils/language";

Cypress.Commands.add('testUtilityFunctions',(utilObject)=>{
    convertTimeTests(utilObject.convertTime);
});


function convertTimeTests(utilObject){
    expect(convertTime('16:00',utilObject.twelve_hour_format)).to.be.eq('4:00 PM');
    expect(convertTime('16:00',null)).to.be.eq('4:00 PM');

    expect(convertTime('16:00',utilObject.twenty_four_hour_format)).to.be.eq('16:00');
    expect(convertTime('16:00',null)).to.be.eq('16:00');
}


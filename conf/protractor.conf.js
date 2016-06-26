exports.config = {"baseUrl":"http://localhost:8090/emprunteur/","specs":["/Users/romakita/WebstormProjects/scenarios/scenario-one-borrower.js"],"directConnect":true,"capabilities":{"browserName":"chrome"},"framework":"jasmine","jasmineNodeOpts":{"defaultTimeoutInterval":30000, print: function() {}}, onPrepare: function() {
      var SpecReporter = require('jasmine-spec-reporter');
      // add jasmine spec reporter
      jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
   }}
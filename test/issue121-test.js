/* eslint-disable no-octal */
// vim: expandtab:ts=2:sw=2

const
  assertions = require('./assertions'),
  childProcess = require('./child-process').childProcess,
  signals = ['SIGINT', 'SIGTERM'];

describe('tmp', function () {
  describe('issue121 - clean up on terminating signals', function () {
    for (var i = 0; i < signals.length; i++) {
      it('for signal ' + signals[i], function (done) {
        issue121Tests(signals[i])(done);
      });
    }
  });
});

function issue121Tests(signal) {
  return function (done) {
    childProcess(this, 'issue121.json', function (err, stderr, stdout) {
      if (err) return done(err);
      else if (stderr) return done(new Error(stderr));
      assertions.assertDoesNotExist(stdout);
      done();
    }, true);
  };
}

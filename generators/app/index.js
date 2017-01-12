'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the divine ' + chalk.red('@yajamon/generator-react-typescript') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.spawnCommandSync('yarn', ['init']);

    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install: function () {
    this.yarnInstall(['webpack', 'typescript', 'awesome-typescript-loader', 'source-map-loader'], { 'dev' : true });
    this.yarnInstall(['react', '@types/react', 'react-dom', '@types/react-dom']);

    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }
});

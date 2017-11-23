#!/usr/bin/env node
// https://developer.atlassian.com/blog/2015/11/scripting-with-node/
const GoogleBookSearchShell = require('./GoogleBookSearchShell');

const shell = new GoogleBookSearchShell();
shell.run();


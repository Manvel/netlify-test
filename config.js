"use strict";

const {getLanguage, highlight} = require("highlight.js");
const argv = require("minimist")(process.argv.slice(2));

// See https://markdown-it.github.io/markdown-it/#MarkdownIt.new
const markdownOptions = {
  highlight(str, langAndi18n)
  {
    const [lang] = langAndi18n.split("-");
    const result = (lang && getLanguage(lang)) ? highlight(lang, str).value : "";
    // Escape i18n bracket to use inside i18n strings
    return result.replace(/\\{/g, "&#123;").replace(/\\}/g, "&#125;");
  }
};
//
const port = {
  https: 4000,
  http: 3000
};
const hostname = "0.0.0.0";

const deployment = {
  where: "git"
};

let gzip = true;
let root = "";
let domain = "cmints.io";
let protocol = "https";
if (argv.deploy)
{
  domain = "manvel.github.io"; // Github Pages default domain
  root = "/cmints-website"; // Github Pages root
  gzip = false;
}
else if (argv.dev)
{
  protocol = "http";
  domain = "127.0.0.1:3000";
}

const templateData =
{
};

module.exports = {};

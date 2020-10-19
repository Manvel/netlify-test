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

const i18nOptions = {
  detectLang: false,
  type: "Double",
  defaultLocale: "en",
  crowdin: {
    id: "cmints-website",
    updateOption: "update_as_unapproved"
  }
};

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
  site: {
    protocol,
    domain,
    root,
    title: "CMintS",
    description: "CMS created with the internationalization in mind",
    github: "https://github.com/cmints/website",
    crowdin: `https://crowdin.com/translate/${i18nOptions.crowdin.id}`,
    navigations: [
      {
        path: "documentation",
        contains: "documentation",
        stringId: "header-menu-item-docs"
      },
      {
        path: "quick-start",
        stringId: "header-menu-item-tutorial"
      },
      {
        path: "contribute",
        contains: "contribute",
        stringId: "header-menu-item-contribute"
      }
    ],
    secondaryNavigations: {
      documentation: [
        {
          category: "getting-started",
          titleId: "nav-doc-title-getting-started"
        },
        {
          category: "pages",
          titleId: "nav-doc-title-pages"
        },
        {
          category: "themes",
          titleId: "nav-doc-title-themes"
        },
        {
          category: "i18n",
          titleId: "nav-doc-title-i18n"
        }
      ],
      contribute:[
        {
          category: "contribute",
          titleId: "nav-doc-title-contribute"
        }
      ]
    },
    footerNavigations: [
      {
        path: "https://single.cmints.io",
        stringId: "footer-menu-item-single-lang"
      },
      {
        path: "https://multi.cmints.io",
        stringId: "footer-menu-item-single-multi"
      },
      {
        path: "/presentation",
        stringId: "footer-menu-item-slides"
      }
    ]
  }
};

module.exports = {templateData, markdownOptions, i18nOptions, port,
  hostname, deployment, gzip, root};

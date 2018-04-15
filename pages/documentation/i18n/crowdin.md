---
title: Crowdin TMS integration
navTitle: Crowdin
showDocNav: true
---

# Crowdin integration

[Crowdin](https://crowdin.com/) is a localization and translation management
platform. CMintS uses Crowdin because of it's user friendly UI, ability to
provide external collaborators with user friendly enviroment for translation and
most importantly because it's free for Open Source projects.

## Setting up

First of all in order to be able to use Crowdin you should [create an
account](https://crowdin.com/join). If you are developing an open source project
you can request [Open Source
setup](https://crowdin.com/page/open-source-project-setup-request). Otherwise
you will have a trial period to try it out. After you have your account ready,
it's time to create a project, [see the Crowdin documentation about creating a
project](https://support.crowdin.com/creating-project/).


## Uploading Source Strings

After setting up the project you can use CMintS crowdin integration API to
upload all the source translation strings of your website to the Crowdin
project, to do that use your Crowdin API key with the CMintS Synchronization
API. You can find Crowdin API key in the  key tab of project settings page:

![Crowdin api location](/images/crowdin-key.png)

After locating crowdin API key, run command below replacing `{crowdin-key}` with
actual one in the CMintS root directory:

```bash
npm run crowdin-update-source -- --key {crowdin-key}
```

This will generate source JSON files from the CMintS project and upload them to
the Crowdin project.

## Download translations

After translations are ready in the crowdin to be downloaded and the translation
project has been built run the command below in the CMintS root directory:

```bash
npm run crowdin-get-translations -- --key {crowdin-key}
```

**Note:** in order to update correct locales, the directory names inside of the
`locales` directory should be consistent with the Crowdin translation [locale
names](https://support.crowdin.com/api/language-codes/).

## Upload translations

Use command below to update crowdin project with the local(CMintS) translations:

```bash
npm run crowdin-update-translations -- --key {crowdin-key}
```
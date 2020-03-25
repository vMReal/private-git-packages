private-git-packages
====================

CLI allows dynamically inject secret variables for git dependencies in package.json. It gives protected way use git dependencies in package.json in CI/CD


```
# ANY CI
pgp change --username=BasicAuthUsername --password=BasicAuthPassword
npm i
pgp rollback

```

```
# GITLAB CI
pgp change --username=gitlab-ci-token --password=$CI_JOB_TOKEN
npm i
pgp rollback

```

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@mreal/private-git-packages.svg)](https://npmjs.org/package/@mreal/private-git-packages)
[![Codecov](https://codecov.io/gh/vMReal/private-git-packages/branch/master/graph/badge.svg)](https://codecov.io/gh/vMReal/private-git-packages)
[![Downloads/week](https://img.shields.io/npm/dw/@mreal/private-git-packages.svg)](https://npmjs.org/package/private-git-packages)
[![License](https://img.shields.io/npm/l/@mreal/private-git-packages.svg)](https://github.com/vMReal/private-git-packages/blob/master/package.json)

<!-- toc -->
* [ANY CI](#any-ci)
* [GITLAB CI](#gitlab-ci)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
<!-- usage -->
```sh-session
$ npm install -g @mreal/private-git-packages
$ pgp COMMAND
running command...
$ pgp (-v|--version|version)
@mreal/private-git-packages/0.1.0 linux-x64 node-v8.10.0
$ pgp --help [COMMAND]
USAGE
  $ pgp COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pgp change [PATTERN]`](#pgp-change-pattern)
* [`pgp help [COMMAND]`](#pgp-help-command)
* [`pgp rollback`](#pgp-rollback)

## `pgp change [PATTERN]`

describe the command here

```
USAGE
  $ pgp change [PATTERN]

ARGUMENTS
  PATTERN  Pattern for restricting selection. Any text or regular expression.

OPTIONS
  -h, --help               show CLI help
  -n, --filename=filename  [default: package] custom name of package.json
  -p, --password=password  (required) password -> https://[username]:[password]@your-git-host.com/...
  -r, --recursively        Apply to all files (package) at any level of nesting
  -u, --username=username  (required) username -> https://[username]:[password]@your-git-host.com/...
```

_See code: [src/commands/change.ts](https://github.com/vMReal/private-git-packages/blob/v0.1.0/src/commands/change.ts)_

## `pgp help [COMMAND]`

display help for pgp

```
USAGE
  $ pgp help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `pgp rollback`

describe the command here

```
USAGE
  $ pgp rollback

OPTIONS
  -h, --help               show CLI help
  -n, --filename=filename  [default: package] custom name of package.json
  -r, --recursively        Apply to all files (package) at any level of nesting
```

_See code: [src/commands/rollback.ts](https://github.com/vMReal/private-git-packages/blob/v0.1.0/src/commands/rollback.ts)_
<!-- commandsstop -->

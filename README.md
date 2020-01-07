private-git-packages
====================

todo

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/private-git-packages.svg)](https://npmjs.org/package/private-git-packages)
[![Codecov](https://codecov.io/gh/vMReal/private-git-packages/branch/master/graph/badge.svg)](https://codecov.io/gh/vMReal/private-git-packages)
[![Downloads/week](https://img.shields.io/npm/dw/private-git-packages.svg)](https://npmjs.org/package/private-git-packages)
[![License](https://img.shields.io/npm/l/private-git-packages.svg)](https://github.com/vMReal/private-git-packages/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
<!-- usage -->
```sh-session
$ npm install -g @vmreal/private-git-packages
$ pgp COMMAND
running command...
$ pgp (-v|--version|version)
@vmreal/private-git-packages/0.0.1 win32-x64 node-v13.1.0
$ pgp --help [COMMAND]
USAGE
  $ pgp COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pgp change [PATTERN]`](#pgp-change-pattern)
* [`pgp hello [FILE]`](#pgp-hello-file)
* [`pgp help [COMMAND]`](#pgp-help-command)
* [`pgp rollback [FILE]`](#pgp-rollback-file)

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

_See code: [src\commands\change.ts](https://github.com/vMReal/private-git-packages/blob/v0.0.1/src\commands\change.ts)_

## `pgp hello [FILE]`

describe the command here

```
USAGE
  $ pgp hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ pgp hello
  hello world from ./src/hello.ts!
```

_See code: [src\commands\hello.ts](https://github.com/vMReal/private-git-packages/blob/v0.0.1/src\commands\hello.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src\commands\help.ts)_

## `pgp rollback [FILE]`

describe the command here

```
USAGE
  $ pgp rollback [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src\commands\rollback.ts](https://github.com/vMReal/private-git-packages/blob/v0.0.1/src\commands\rollback.ts)_
<!-- commandsstop -->

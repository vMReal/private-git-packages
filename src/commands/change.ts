import {Command, flags} from '@oclif/command'

export default class Change extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),

    username: flags.string({char: 'u', description: 'username -> https://[username]:[password]@your-git-host.com/...'}),
    password: flags.string({char: 'u', description: 'password -> https://[username]:[password]@your-git-host.com/...'}),
    filename: flags.string({char: 'n', default: 'package.json', description: 'custom name of package.json'}),
    recursively: flags.boolean({char: 'r', description: 'Apply to all files (package) at any level of nesting'}),
  }

  static args = [{
    name: 'pattern',
    required: false,
    description: "Pattern for restricting selection. Any text or regular expression."
  }]

  async run() {
    const {args, flags} = this.parse(Change)

    /* const name = flags.name || 'world'
    this.log(`hello ${name} from C:\\www\\private-git-packages\\src\\commands\\change.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }

     */
  }
}

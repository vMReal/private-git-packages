import {Command, flags} from '@oclif/command';
import {File} from '../helpers/file';
import {cli} from 'cli-ux';
import {has, reduce, get} from 'lodash'

export default class Change extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),

    username: flags.string({char: 'u', required: true, description: 'username -> https://[username]:[password]@your-git-host.com/...'}),
    password: flags.string({char: 'p', required: true, description: 'password -> https://[username]:[password]@your-git-host.com/...'}),
    filename: flags.string({char: 'n', default: 'package', description: 'custom name of package.json'}),
    recursively: flags.boolean({char: 'r', description: 'Apply to all files (package) at any level of nesting'}),
  }

  static args = [{
    name: 'pattern',
    required: false,
    description: "Pattern for restricting selection. Any text or regular expression."
  }]

  async run() {
    const {args, flags} = this.parse<Flags, Args>(Change);

    const files = [
      ...await File.find(`${flags.filename}.json`, flags.recursively),
      ...await File.find(`${flags.filename}-lock.json`, flags.recursively),
    ].sort()

    const tree = cli.tree();
    files.forEach((uri) => {
      const parts = uri.split('/')
      console.log('parts', parts)
      parts.forEach((value, index) => {
        if (index === parts.length - 1)
          return tree.insert(value);

        const path = reduce(parts.slice(0, index), (res: string[], item: string) => [...res, 'nodes', item], [])
        console.log(value, index, path, !has(tree, path) && index === 0)
        if (!has(tree, path) && index === 0)
          return tree.insert(value, cli.tree());

        if (!has(tree, path)) {
          console.log('ddd', get(tree, path.slice(0, -2)));
          (get(tree, path.slice(0, -2)) as  any).insert(value, cli.tree())
        }
      });
    })

    tree.display();

    /* const name = flags.name || 'world'
    this.log(`hello ${name} from C:\\www\\private-git-packages\\src\\commands\\change.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }

     */
  }
}

export interface Args {
  pattern?: string,
}

export interface Flags {
  username: string,
  password: string,
  filename: string,
  recursively: boolean,
}

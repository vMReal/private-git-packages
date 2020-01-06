import {Command, flags} from '@oclif/command';
import {File} from '../helpers/file';
import {cli} from 'cli-ux';
import {has, reduce, get} from 'lodash'
import {Tree} from "cli-ux/lib/styled/tree";
import {GitDependency} from "../helpers/git-dependency";

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
    ].sort();

    files.forEach(uri => File.makeBackup(uri));

    Promise.all(files
      .map((uri) => ({uri, content: File.load(uri)}))
      .map(async (item) => ({...item, packages: await GitDependency.find(await item.content)}))
    );

    Promise.all(files.map(async (uri) => ({uri, content: await File.load(uri)})))
      .then(file => file.map(async (item) => ({...item, packages: await GitDependency.find(item.content)})))
    


    Change.generateInfoTable(files).display();

  }

  public static generateInfoTable(files: string[]): Tree {
    const tree = cli.tree();
    files.forEach((uri) => {
      const parts = uri.split('/')
      parts.forEach((value, index) => {
        const path = reduce(parts.slice(0, index + 1), (res: string[], item: string) => [...res, 'nodes', item], []);
        if (!has(tree, path) && index === 0)
          return tree.insert(value, cli.tree());

        if (!has(tree, path))
          return (get(tree, path.slice(0, -2)) as  any).insert(value, cli.tree())
      });
    })
    return tree;
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

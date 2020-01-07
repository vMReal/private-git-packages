import {Command, flags} from '@oclif/command';
import {File} from '../helpers/file';
import {cli} from 'cli-ux';
import {has, reduce, get} from 'lodash'
import {Tree} from "cli-ux/lib/styled/tree";
import {GitDependency} from "../helpers/git-dependency";

import Aigle from "aigle";

interface ProcessedItem {
  filepath: string, dependencies: string[],
}

type ProcessedItems = ProcessedItem[];

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

    const items = await Aigle
      .resolve([
        ...await File.find(`${flags.filename}.json`, flags.recursively),
        ...await File.find(`${flags.filename}-lock.json`, flags.recursively),
      ].sort())
      .reduce<string, ProcessedItems>(async (res, filepath) => {
        const content = await File.load(filepath);
        const dependencies = await GitDependency.find(content);
        if (!dependencies.length)
          return [...res];

        await File.makeBackup(filepath);
        const changedContent = await GitDependency.change(content, dependencies, flags.username, flags.password);
        await File.modify(filepath, changedContent);
        return [...res, {filepath, dependencies}];
      }, []);

    this.log(`$ such files and dependencies was changed successful`);
    Change.generateInfoTable(items).display();

  }

  public static generateInfoTable(items: ProcessedItems): Tree {
    const tree = cli.tree();
    items.forEach((item) => {
      item.filepath.split('/').forEach((value, index, parts) => {

        const path = reduce(parts.slice(0, index + 1), (res: string[], item: string) => [...res, 'nodes', item], []);
        if (!has(tree, path) && index === 0)
          tree.insert(value, cli.tree());
        else if (!has(tree, path))
          get(tree, path.slice(0, -2)).insert(value, cli.tree());

        if (index === parts.length - 1)
          item.dependencies.forEach(dependency => get(tree, path).insert(dependency));
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

import {Command, flags} from '@oclif/command'
import Aigle from "aigle";
import {File} from "../helpers/file";
import {GitDependency} from "../helpers/git-dependency";
import Change from "./change";

export default class Rollback extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),

    filename: flags.string({char: 'n', default: 'package', description: 'custom name of package.json'}),
    recursively: flags.boolean({char: 'r', description: 'Apply to all files (package) at any level of nesting'}),
  }

  static args = []

  async run() {
    const {args, flags} = this.parse<Flags, Args>(Rollback);

    const filePaths = [
      ...await File.find(`${flags.filename}.json`, flags.recursively, true),
      ...await File.find(`${flags.filename}-lock.json`, flags.recursively, true),
    ].sort()

    await filePaths.forEach((filePath) => File.rollback(filePath));

    this.log(`$ such files were rolled back to their original state`);
    Change.generateInfoTable(filePaths.map((filepath) => ({filepath, dependencies: []}))).display();
  }
}


export interface Args {
}

export interface Flags {
  recursively: boolean,
  filename: string,
}

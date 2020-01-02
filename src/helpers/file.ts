import * as glob from "glob-promise"
import * as fs from "fs-extra"
import * as path from "path";

export class File {
  public static find (name: string, recursively: boolean): Promise<string[]> {
    return (recursively)
      ? glob(`**/${name}`)
      : glob(`${name}`)
  }

  public static async makeBackup(filepath: string): Promise<void> {
    const fullUri = path.resolve(process.cwd(), filepath);
    await fs.copy(fullUri, fullUri + '.pgp-backup', {overwrite: true});
  }
}

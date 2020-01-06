import * as glob from "glob-promise"
import * as fs from "fs-extra"
import * as path from "path";

const TEMPLATE = '$path.pgp-backup';

const BACKUP_MARKER = 'pgp-backup';

export class File {

  public static find(name: string, recursively: boolean): Promise<string[]>
  public static find(name: string, recursively: boolean, backup: true): Promise<string[]>
  public static async find(name: string, recursively: boolean, existBackup = false): Promise<string[]> {
    const pattern = (recursively)
      ? `**/${name}`
      : `${name}`

    return (existBackup)
      ? await glob(this.getBackupPath(pattern)).then(items => items.map(this.getOriginalPath))
      : glob(pattern)
  }

  public static async makeBackup(filepath: string): Promise<void> {
    await fs.copy(this.getFullPath(filepath), this.getBackupPath(filepath), {overwrite: true});
  }

  public static async rollback(filepath: string): Promise<void> {
    await fs.move(this.getFullPath(this.getBackupPath(filepath)), this.getFullPath(filepath), {overwrite: true});
  }

  public static load(filepath: string): Promise<string> {
    return fs.readFile(this.getFullPath(filepath), 'utf8');
  }

  public static modify(filepath: string, content: string): Promise<void> {
    return fs.outputFile(this.getFullPath(filepath), content);
  }

  protected static getFullPath(filepath: string): string {
    return  path.resolve(process.cwd(), filepath);
  }

  protected static getOriginalPath(backupPath: string): string {
    return backupPath.replace(`.${BACKUP_MARKER}`, '')
  }

  protected static getBackupPath(originalPath: string): string {
    return `${originalPath}.${BACKUP_MARKER}`;
  }
}

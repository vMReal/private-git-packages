import {describe, it, beforeEach, afterEach, before, after} from 'mocha';
import  {expect} from "chai";
import {File} from  './file';

import * as glob from "glob-promise"
import * as fs from "fs-extra"
import * as path from "path";

describe('File', () => {
  describe('find', () => {
    before(async () => {
      await fs.createFile(path.resolve(process.cwd(), 'test-file.find.txt'))
      await fs.createFile(path.resolve(process.cwd(), 'test-data-lvl2', 'test-file.find.txt'));
      await fs.createFile(path.resolve(process.cwd(), 'test-data-lvl2', 'test-data-lvl3', 'test-file.find.txt'));
    })

    after(async () => {
      await fs.remove(path.resolve(process.cwd(), 'test-file.find.txt'))
      await fs.remove(path.resolve(process.cwd(), 'test-data-lvl2', 'test-file.find.txt'));
      await fs.remove(path.resolve(process.cwd(), 'test-data-lvl2', 'test-data-lvl3', 'test-file.find.txt'));
    })

    it('should find correct length of files', async () => {
      const res = await File.find('test-file.find.txt', false);
      expect(res).to.have.lengthOf(1);
    })

    it('should find correct length of files with recursively option', async () => {
      const res = await File.find('test-file.find.txt', true);
      expect(res).to.have.lengthOf(3);
    })

    it('should find 0 length of files with not exist filename', async () => {
      const res = await File.find('exist-exist-file.txt', false);
      expect(res).to.have.lengthOf(0);
    })

    it('should find 0 length of files with not exist filename and recursively option', async () => {
      const res = await File.find('exist-exist-file.txt', true);
      expect(res).to.have.lengthOf(0);
    })
  })

  describe('makeBackup', () => {
    beforeEach(async () => {
      await fs.createFile(path.resolve(process.cwd(), 'test-file.makeBackup.txt'))
    })

    it('should create backup file with overwrite ', async () => {
      await File.makeBackup('test-file.makeBackup.txt');
      await File.makeBackup('test-file.makeBackup.txt');

      expect(await fs.pathExists(path.resolve(process.cwd(), 'test-file.makeBackup.txt.pgp-backup'))).to.be.true;
    })

    afterEach(async () => {
      await fs.remove(path.resolve(process.cwd(), 'test-file.makeBackup.txt.pgp-backup'))
      await fs.remove(path.resolve(process.cwd(), 'test-file.makeBackup.txt'))
    })
  })
})

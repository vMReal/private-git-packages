import {expect, test} from '@oclif/test'
import {beforeEach} from "mocha";
import * as fs from "fs-extra";
import * as path from "path";
import {Package} from "../../src/helpers/git-dependency";

describe('change', () => {
  beforeEach(async () => {
    const json = JSON.stringify(<Package>{
      dependencies: {
        test1: 'v1.1.1',
        test2: 'git://test2.test',
        test3: 'git://test3.test',
        test4: 'v1.1.1'
      },
      devDependencies: {
        test5: 'git://test3.test',
        test4: 'v1.1.1'
      }
    });

    await fs.outputFile(path.resolve(process.cwd(), 'i-test-file.change.json'), json, {encoding: 'utf8'});
  })

  test
  .stdout()
  .command(['change', '-u=u', '-p=p', '-n=i-test-file.change'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

})

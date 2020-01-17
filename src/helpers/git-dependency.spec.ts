import {describe, it} from 'mocha';
import {expect} from "chai";
import {PROTOCOL, Uri} from "./uri";
import {GitDependency, Package, PackageLock} from "./git-dependency";
import {get} from 'lodash';

describe('GitDependency', () => {
  describe('find', () => {
    it('should find correctly the package.json structure with dependencies and devDependencies', async () => {
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

      expect(GitDependency.find(json)).to.have.members(['test2', 'test3', 'test5']);
    })

    it('should find correctly the package.json structure with only dependencies', async () => {
      const json = JSON.stringify(<Package>{
        dependencies: {
          test1: 'v1.1.1',
          test2: 'git://test2.test',
          test3: 'git://test3.test',
          test4: 'v1.1.1'
        },
      });

      expect(GitDependency.find(json)).to.have.members(['test2', 'test3']);
    })

    it('should find correctly the package.json structure with only dependencies', async () => {
      const json = JSON.stringify(<Package>{
        devDependencies: {
          test5: 'git://test4.test',
          test4: 'v1.1.1',
          test6: 'git://test6.test'
        },
      });

      expect(GitDependency.find(json)).to.have.members(['test5', 'test6']);
    })

    it('should find correctly the package-lock.json structure with dependencies', async () => {
      const json = JSON.stringify(<PackageLock>{
        dependencies: {
          test1: {version: 'v1.1.1'},
          test2: {version: 'git://test2.test#master', from: 'git://test2.test'},
          test3: {version: 'git://test3.test', from: 'git://test3.test'},
          test4: {version: 'v1.1.1'}
        },
      });

      expect(GitDependency.find(json)).to.have.members(['test2', 'test3']);
    })

    it('should find correctly the package structure without dependencies and devDependencies', async () => {
      const json = JSON.stringify(<Package>{});
      expect(GitDependency.find(json)).to.have.lengthOf(0);
    })
  })

  describe('change', () => {
    it('should change correctly package.json structure', async () => {
      const json = JSON.stringify(<Package>{
        dependencies: {
          test1: 'v1.1.1',
          test2: 'git://test2.test',
          test3: 'git+http://test3.test',
          test4: 'v1.1.1'
        },
        devDependencies: {
          test5: 'git+file://test3.test',
          test4: 'v1.1.1'
        }
      });

      const res = JSON.parse(GitDependency.change(json, ['test2', 'test3'], 'testuser', 'testpassword'));
      expect(get(res, 'dependencies.test2')).to.equal('git+https://testuser:testpassword@test2.test');
      expect(get(res, 'dependencies.test3')).to.equal('git+https://testuser:testpassword@test3.test');
      expect(get(res, 'devDependencies.test5')).to.equal('git+file://test3.test');
    })

    it('should not affect other not git uri', async () => {
      const json = JSON.stringify(<Package>{
        dependencies: {
          test1: 'v1.1.1',
          test2: 'git://test2.test',
          test3: 'git+http://test3.test',
          test4: 'v1.1.1'
        },
        devDependencies: {
          test5: 'git+file://test3.test',
          test4: 'v1.1.1'
        }
      });

      const res = JSON.parse(GitDependency.change(json, ['test1', 'test2'], 'testuser', 'testpassword'));
      expect(get(res, 'dependencies.test1')).to.equal('v1.1.1');
      expect(get(res, 'dependencies.test2')).to.equal('git+https://testuser:testpassword@test2.test');
    })

    it('should change correctly package-lock.json structure', async () => {
      const json = JSON.stringify(<PackageLock>{
        dependencies: {
          test1: {version: 'v1.1.1'},
          test2: {version: 'git://test2.test#master', from: 'git://test2.test'},
          test3: {version: 'git://test3.test', from: 'git://test3.test'},
          test4: {version: 'v1.1.1'},
          test5: {version: 'git://test5.test#master', from: 'git://test5.test'},
        },
      });

      const res = JSON.parse(GitDependency.change(json, ['test2', 'test3'], 'testuser', 'testpassword'));
      expect(get(res, 'dependencies.test2.version')).to.equal('git+https://testuser:testpassword@test2.test#master');
      expect(get(res, 'dependencies.test2.from')).to.equal('git+https://testuser:testpassword@test2.test');

      expect(get(res, 'dependencies.test3.version')).to.equal('git+https://testuser:testpassword@test3.test');
      expect(get(res, 'dependencies.test3.from')).to.equal('git+https://testuser:testpassword@test3.test');

      expect(get(res, 'dependencies.test5.version')).to.equal('git://test5.test#master')
      expect(get(res, 'dependencies.test5.from')).to.equal('git://test5.test');
    })

    it('should change protocol correctly when given  a simple protocol', async () => {
      expect(Uri.change('git://test.com', 'u', 'p', PROTOCOL.HTTP)).to.match(/^git\+http\:\/\//);
    })
  })
})

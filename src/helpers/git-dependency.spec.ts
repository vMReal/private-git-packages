import {describe, it} from 'mocha';
import {expect} from "chai";
import {PROTOCOL, Uri} from "./uri";
import {Package} from "./git-dependency";



const PACKAGE_TEMPLATE = JSON.stringify(<Package>{
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
})

describe('GitDependency', () => {
  describe('find', () => {
    it('should change protocol correctly when given  a simple protocol', async () => {
      expect(Uri.change('git://test.com', 'u', 'p', PROTOCOL.HTTP)).to.match(/^git\+http\:\/\//);
    })
  })

  describe('change', () => {
    it('should change protocol correctly when given  a simple protocol', async () => {
      expect(Uri.change('git://test.com', 'u', 'p', PROTOCOL.HTTP)).to.match(/^git\+http\:\/\//);
    })
  })
})

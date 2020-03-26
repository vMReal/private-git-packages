import {describe, it} from 'mocha';
import {expect} from "chai";
import {PROTOCOL, Uri} from "./uri";

describe('Uri', () => {
  describe('change', () => {
    it('should change protocol correctly when given  a simple protocol', async () => {
      expect(Uri.change('git://test.com', 'u', 'p', PROTOCOL.HTTP)).to.match(/^git\+http\:\/\//);
    })

    it('should not change protocol correctly when given a not correct protocol', async () => {
      expect(Uri.change('test+test://test.com', 'u', 'p', PROTOCOL.HTTP)).to.match(/^test\+test\:\/\//);
    })

    it('should change protocol correctly when given a correct protocol', async () => {
      expect(Uri.change('git+http://test.com', 'u', 'p', PROTOCOL.HTTP)).to.match(/^git\+http\:\/\//);
    })


    it('should inject credentials correctly to uri with exist basic auth', async () => {
      expect(Uri.change('git+ssh://testu:testp@test.com', 'u', 'p', PROTOCOL.HTTP)).to.include('://u:p@');
    })

    it('should not affect another parts of uri without basic auth', async () => {
      expect(Uri.change('git+ssh://@test.com', 'u', 'p', PROTOCOL.HTTPS)).to.equal('git+https://u:p@test.com/');
    })

    it('should not affect another parts of uri with basic auth', async () => {
      expect(Uri.change('git+ssh://testu:testp@test.com', 'u', 'p', PROTOCOL.HTTPS)).to.equal('git+https://u:p@test.com/');
    })

    it('should not affect another parts of uri with basic auth and branch', async () => {
      expect(Uri.change('git+ssh://testu:testp@test.com#master', 'u', 'p', PROTOCOL.HTTPS)).to.equal('git+https://u:p@test.com/#master');
    })

    it('should correctly change git uri full format', () => {
      expect(Uri.change('git+ssh://git@git.test.com:3535:scope/name?search#test', 'u', 'p', PROTOCOL.HTTPS)).to.be.eq('git+https://u:p@git.test.com:3535/scope/name?search#test')
    })

    it('should correctly change git uri gitlab format', () => {
      expect(Uri.change('git+ssh://git@gitlab.test.com:group/project#branch', 'u', 'p', PROTOCOL.HTTPS)).to.be.eq('git+https://u:p@gitlab.test.com/group/project#branch')
    })
  })

  describe('isGitUri', () => {
    it('should detect any supported git uri by protocol',  () => {
      Object
        .values(PROTOCOL)
        .forEach(protocol => {
          expect(Uri.isGitUri(`${protocol}://test.com#master`)).to.be.true
        });
    })

    it('should correctly parse git uri format', () => {
      expect(Uri.isGitUri('git+ssh://git@git.test.com:3535:scope/name?search#test')).to.be.true
    })

    it('should return false with  unsupported uri',  () => {
      expect(Uri.isGitUri(`http://test.com#master`)).to.be.false
    })


    it('should return false wit any unsupported  string value',  () => {
      expect(Uri.isGitUri(`test.com#master`)).to.be.false;
      expect(Uri.isGitUri(`.`)).to.be.false;
    })
  })
})

import {describe, it} from 'mocha';
import {expect} from "chai";
import {PROTOCOL, Uri} from "./uri";

describe('Uri', () => {
  describe('change', () => {
    it('should change protocol correctly when given  a simple protocol', async () => {
      expect(Uri.change('git://test.com', 'u', 'p', PROTOCOL.HTTP)).to.match(/^git\+http\:\/\//);
    })

    it('should change protocol correctly when given a composite protocol', async () => {
      expect(Uri.change('test+test://test.com', 'u', 'p', PROTOCOL.HTTP)).to.match(/^git\+http\:\/\//);
    })

    it('should change protocol correctly when given a not correct protocol', async () => {
      expect(Uri.change('git+http://test.com', 'u', 'p', PROTOCOL.HTTP)).to.match(/^git\+http\:\/\//);
    })

    it('should inject credentials correctly to uri without basic auth', async () => {
      expect(Uri.change('https://test.com', 'u', 'p', PROTOCOL.HTTP)).to.include('://u:p@');
    })

    it('should inject credentials correctly to uri with exist basic auth', async () => {
      expect(Uri.change('https://testu:testp@test.com', 'u', 'p', PROTOCOL.HTTP)).to.include('://u:p@');
    })

    it('should not affect another parts of uri without basic auth', async () => {
      expect(Uri.change('git+ssh://@test.com', 'u', 'p', PROTOCOL.HTTPS)).to.equal('git+https://u:p@test.com');
    })

    it('should not affect another parts of uri with basic auth', async () => {
      expect(Uri.change('git+ssh://testu:testp@test.com', 'u', 'p', PROTOCOL.HTTPS)).to.equal('git+https://u:p@test.com');
    })

    it('should not affect another parts of uri with basic auth and branch', async () => {
      expect(Uri.change('git+ssh://testu:testp@test.com#master', 'u', 'p', PROTOCOL.HTTPS)).to.equal('git+https://u:p@test.com#master');
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

    it('should return false with  unsupported uri',  () => {
      expect(Uri.isGitUri(`http://test.com#master`)).to.be.false
    })


    it('should return false wit any unsupported  string value',  () => {
      expect(Uri.isGitUri(`test.com#master`)).to.be.false;
      expect(Uri.isGitUri(`.`)).to.be.false;
    })
  })
})

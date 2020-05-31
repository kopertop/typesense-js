import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Typesense from '../../src/Typesense'
import ApiCall from '../../src/Typesense/ApiCall'
import axios from 'axios'
import MockAxiosAdapter from 'axios-mock-adapter'

let expect = chai.expect
chai.use(chaiAsPromised)

describe('Alias', function () {
  let typesense
  let alias
  let apiCall
  let mockAxios
  before(function () {
    typesense = new Typesense.Client({
      'nodes': [{
        'host': 'node0',
        'port': '8108',
        'protocol': 'http'
      }],
      'apiKey': 'abcd'
    })
    alias = typesense.aliases('companies')
    apiCall = new ApiCall(typesense.configuration)
    mockAxios = new MockAxiosAdapter(axios)
  })

  describe('.retrieve', function () {
    it('retrieves the alias', function (done) {
      mockAxios
        .onGet(
          apiCall._uriFor('/aliases/companies', typesense.configuration.nodes[0]),
          null,
          {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
          }
        )
        .reply(200, {})

      // console.log(mockAxios.handlers)

      let returnData = alias.retrieve()

      expect(returnData).to.eventually.deep.equal({}).notify(done)
    })
  })

  describe('.delete', function () {
    it('deletes an alias', function (done) {
      mockAxios
        .onDelete(
          apiCall._uriFor('/aliases/companies', typesense.configuration.nodes[0]),
          null,
          {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
          }
        )
        .reply(200, {})

      let returnData = alias.delete()

      expect(returnData).to.eventually.deep.equal({}).notify(done)
    })
  })
})
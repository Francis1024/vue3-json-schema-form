// Node.js require:
const Ajv = require('ajv').default

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    age: {
      type: 'number'
    },
    pets: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    isWorker: {
      type: 'boolean'
    }
  },
  required: ['name', 'age']
}

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
const validate = ajv.compile(schema)
const valid = validate({})
if (!valid) console.log(validate.errors)

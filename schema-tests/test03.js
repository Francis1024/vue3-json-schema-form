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
      items: [{ type: 'number' }, { type: 'boolean' }],
      minItems: 2,
      additionalItems: false
      // or
      // maxItems: 2
    },
    isWorker: {
      type: 'boolean'
    }
  },
  required: ['name', 'age']
}

// 测试参数
const params = {
  name: '咚咚',
  age: 12,
  pets: [123, false],
  isWorker: false
}

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
const validate = ajv.compile(schema)
const valid = validate(params)
if (!valid) console.log(validate.errors)

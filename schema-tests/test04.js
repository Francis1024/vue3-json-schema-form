const Ajv = require('ajv').default
import addFormats from 'ajv-formats'

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',

      format: 'email'
    },
    decs: {
      type: 'string',
      format: 'test'
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
  name: 'dongdong@yu.com',
  decs: 'haha',
  age: 12,
  pets: [123, false],
  isWorker: false
}

const ajv = new Ajv()

addFormats(ajv)

// 添加自定义format
ajv.addFormat('test', data => {
  console.log('data', '=========')
  return data === 'haha'
})
const validate = ajv.compile(schema)
const valid = validate(params)
if (!valid) console.log(validate.errors)

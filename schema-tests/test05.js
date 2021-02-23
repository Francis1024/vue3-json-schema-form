const Ajv = require('ajv').default
const addFormats = require('ajv-formats').default
// import Ajv from 'ajv'
// import addFormats from 'ajv-formats'

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      format: 'email'
    },
    decs: {
      type: 'string',
      test: true,
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
// 添加自定义关键字
ajv.addKeyword('test', {
  // 可以理解为添加其他自定义校验
  macro() {
    return {
      // minLength: 10
      maxLength: 20
    }
  }
  // 判断类型
  // metaSchema: {
  //   type: 'boolean'
  // }
  // 编译时校验
  // compile(sch, parentSchema) {
  //   console.log('sch', sch)
  //   console.log('parentSchema', parentSchema)
  //   return () => true
  // }
  // validate(schema, data) {
  //   console.log(schema, data)
  //   if (schema === true) return true
  //   else return schema.length === 6
  // }
})

// 添加自定义format
ajv.addFormat('test', data => {
  console.log('data', '=========')
  return data === 'haha'
})
const validate = ajv.compile(schema)
const valid = validate(params)
if (!valid) console.log(validate.errors)

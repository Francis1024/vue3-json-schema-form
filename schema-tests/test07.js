const Ajv = require('ajv').default
const addFormats = require('ajv-formats').default
// const localize = require('ajv-i18n')
// import Ajv from 'ajv'
// import addFormats from 'ajv-formats'
const ajv = new Ajv({ allErrors: true })

require('ajv-errors').default(ajv)

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      format: 'email'
    },
    decs: {
      type: 'string',
      errorMessage: {
        type: '必须是字符串',
        minLength: '长度不能小于8'
      },
      minLength: 8
      // test: true,
      // format: 'test'
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
  decs: 123,
  age: 12,
  pets: [123, false],
  isWorker: false
}

addFormats(ajv)
// 添加自定义关键字
ajv.addKeyword('test', {
  // 可以理解为添加其他自定义校验
  // macro() {
  //   return {
  //     minLength: 10
  //     // maxLength: 20
  //   }
  // }
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
  validate: function fun(schema, data) {
    console.log(schema, data)
    if (data !== 'haha') {
      fun.errors = [
        {
          keyword: 'test',
          dataPath: '/decs',
          schemaPath: '#/properties/decs/test',
          params: {},
          message: '错误：输入值不等于haha'
        }
      ]
      return false
    }
    return true
  }
})

// 添加自定义format
ajv.addFormat('test', data => {
  console.log('data', '=========')
  return data === 'haha'
})
const validate = ajv.compile(schema)
const valid = validate(params)
if (!valid) {
  // localize.zh(validate.errors)
  console.log(validate.errors)
}

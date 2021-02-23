// Node.js require:
const Ajv = require('ajv').default

const schema = {
  type: 'string',
  minLength: 10
}

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
const validate = ajv.compile(schema)
// const valid = validate('咚咚咚咚咚咚咚咚咚咚') //正确的
const valid = validate(12312) // 错误的
if (!valid) console.log(validate.errors)

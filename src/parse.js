const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

module.exports.parseYaml = () => {
    const templatePath = path.join(__dirname, '..', '..', '..', '/template.yaml')
    return yaml.safeLoad(fs.readFileSync(templatePath, 'utf-8'))
}
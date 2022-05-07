module.exports = {
    '*': ['ls-lint'], // 检查文件名称是否规范
    '*.{js,jsx,ts,tsx}': [
        // eslint, prettier 修复
        'eslint --fix',
        'prettier --write',
    ],
    '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write --parser json'], // prettier 一些额外格式的文件
    'package.json': ['prettier --write'], // prettier package.json
    '*.vue': [
        // 修复 vue 文件
        'eslint --fix',
        'prettier --write',
        'stylelint --fix',
    ],
    '*.{scss,less,styl,css,html}': [
        // 修复样式文件
        'stylelint --fix',
        'prettier --write',
    ],
    '*.md': ['prettier --write'],
};

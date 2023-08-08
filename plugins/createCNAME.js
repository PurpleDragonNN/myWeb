const execSync = require("child_process").execSync;

var fs = require('fs');

export default function createCNAME(){
    return {
        buildStart() {
            // console.log('===============buildStart=========');
        },
        buildEnd() {
            // console.log('===============buildEnd==========');
        },
        closeBundle() {
            // 构建完成后在docs生成CNAME，以保持git Pages绑定的域名生效
            fs.writeFileSync('./docs/CNAME', 'purpledragon.top')
            // 构建完成后自动将构建生成的内容添加到暂存区
            execSync('git add docs').toString("utf8").trim();
        },
    }
}

#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
branchName="feature/`date +%Y-%m-%d`"
tempRemoteName="template/`date +%Y-%m-%d-%H-%m-%s`"
currentBranch=`git symbolic-ref --short -q HEAD`

gitUrl=$1
urlArray=(${gitUrl//// })
urlArrayLastIndex=$((${#urlArray[@]}-1))
lastString=${urlArray[urlArrayLastIndex]}
lastStringArray=(${lastString//./ })
dirName=${lastStringArray[0]}

git pull &&
git remote add $tempRemoteName $gitUrl &&
git push $tempRemoteName $currentBranch:$branchName &&
git remote remove $tempRemoteName &&
cd .. &&
git clone $1 &&
cd $dirName &&
git checkout -b $branchName origin/$branchName
start . &&
code . &&
yarn &&
echo "恭喜你，创建成功"

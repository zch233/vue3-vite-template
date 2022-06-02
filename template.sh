#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

gitUrl=$1
gitUrl=${gitUrl:-`date +%Y-%m-%d-%H-%m-%s`}

if [ "${gitUrl/#git@}" = "$gitUrl" ]
then
    echo "本地路径创建模版"
    mkdir ../$gitUrl &&
    cp -r `ls -A | grep .| grep -v ".git"| grep -v "node_modules"| grep -v ".idea"` ../$gitUrl/ &&
    cd ../$gitUrl &&
    git init &&
    start . &&
    code . &&
    yarn &&
    echo "恭喜你，创建成功"
else
    echo "git仓库创建模版"
    branchName="feature/`date +%Y-%m-%d`"
    tempRemoteName="template/`date +%Y-%m-%d-%H-%m-%s`"
    currentBranch=`git symbolic-ref --short -q HEAD`

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
fi

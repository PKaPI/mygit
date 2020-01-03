#!/bin/bash

# set ORIGIN to current git origin
ORIGIN='https://github.com/PKaPI/mygit.git';
FILENAME="data-assets"
VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g');
while [[ "$#" > 0 ]]; do case $1 in
  -b|--branch) branch="$2"; shift;;
  *) 
echo "Unknown parameter passed: $1"; exit 1;;
esac; shift; done
rm -fr $FILENAME
mkdir $FILENAME
echo $PWD 
cp -R `find $PWD -type d -path $PWD/data-assets -prune -o -print | sed 1d ` $PWD/data-assets
cd $FILENAME
rm -rf .git
# #init an empty git repo, checkout branch gh-pages
git init
git add .
git remote add origin $ORIGIN
#git fetch
if [ -z "$branch" ]
then
   branch="master";
else
  git checkout -t origin/$BRANCH;
fi
git pull origin $branch;
git add .
git status
git commit -m "测试";
git push --set-upstream origin $branch
rm -fr *
echo "Origin is $ORIGIN"
echo "Current pull origin Branch is $branch"
# rm -rf $FILENAME
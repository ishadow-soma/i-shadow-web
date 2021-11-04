#!/bin/bash

git push
git checkout master
git merge dev
git push github
git checkout dev



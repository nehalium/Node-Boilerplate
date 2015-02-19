#!/bin/sh

# This is not necessary once the following issue resolved:
# https://github.com/teerapap/grunt-protractor-runner/issues/41
node node_modules/.bin/webdriver-manager update

# Create a symlink to the pre-push hook
PRE_PUSH_HOOK=".git/hooks/pre-push"
if [ ! -f $PRE_PUSH_HOOK ];
	then
		printf "\nSymlink-ing git pre-push hook…\n"
		ln -sf ../../scripts/git-pre-push.sh $PRE_PUSH_HOOK
fi

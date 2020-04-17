#!/bin/sh

# this workaround is needed to upload site to the prefix /docs of s3 bucket
# should not be used when https://github.com/jariz/gatsby-plugin-s3/issues/24 is resolved

case "$1" in
  "prepare")
    if  [ -f public/index.html ] 
    then
    mv public temp-public
    mkdir public
    cp temp-public/404.html public/
    mv temp-public public/docs
    echo "WORKAROUND: ready to deploy by gatsby-s3-plugin"
    else
    echo "ERROR: there is no public/index.html"
    exit 1
    fi
    ;;
  "revert")
    if  [ -d public/docs ] && [ $(ls -1 ./public | wc -l) = 2 ]
    then
    mv public/docs temp-public
    rm -f public/404.html
    rmdir public
    mv temp-public public
    echo "WORKAROUND: reverted"
    else
    echo "ERROR: there is no public/docs or there are other files in ./public/"
    exit 1
    fi
    ;;
  *)
    echo "ERROR: wrong argument. Example: ./gatsby-s3-workaround.sh prepare|revert"
    exit 1
    ;;
esac


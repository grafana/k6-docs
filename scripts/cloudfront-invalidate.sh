#!/bin/sh

# https://stackoverflow.com/questions/34650527/how-to-use-environment-variables-in-package-json
# creating script to pass the CloudFrontDistributionID as env variable
aws cloudfront create-invalidation --distribution-id "$AWS_CLOUDFRONT_DISTRIBUTION_ID" --paths "/docs*"
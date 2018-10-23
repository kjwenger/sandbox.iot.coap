#!/usr/bin/env bash

set -x

coap-client \
    -m post \
    -u "Client_identity" \
    -k "${SECURITY_CODE}" \
    -e '{"9090":"IDENTITY"}' \
    "coaps://${IP_ADDRESS}:5684/15011/9063"

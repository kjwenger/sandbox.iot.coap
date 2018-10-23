#!/usr/bin/env bash

set -x

coap-client \
    -m get \
    -u "IDENTITY" \
    -k "${IDENTITY}" \
    "coaps://${IP_ADDRESS}:5684/15011/15012" 2> /dev/null

#!/usr/bin/env bash

set -x

BULB=${1:-0}
VALUE=${2:-0}
ADDRESS=$((65537 + ${BULB}))
coap-client \
    -m put \
    -u "IDENTITY" \
    -k "${IDENTITY}" \
    -e "{ \"3311\": [ { \"5851\": ${VALUE} } ] }" \
    "coaps://${IP_ADDRESS}:5684/15001/${ADDRESS}"

#include <sys/types.h>
#include <sys/socket.h>
#include <sys/time.h>
#define __USE_POSIX 1
#include <netdb.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <errno.h>
#include <math.h>
#include <gtest/gtest.h>
#include <nethelper.h>
#include <cantcoap.h>

#define BUF_LEN 500
#define URI_BUF_LEN 32

TEST(cantcoap, client_and_server) {
    ssize_t result;

    struct addrinfo* binding;
    EXPECT_EQ(0, setupAddress(
            (char*)"0.0.0.0",
            (char*)"5683",
            &binding,
            SOCK_DGRAM,
            AF_INET));

    int descriptor = socket(
            binding->ai_family,
            binding->ai_socktype,
            binding->ai_protocol);

    EXPECT_EQ(0, bind(descriptor, binding->ai_addr, binding->ai_addrlen));

    char buffer[BUF_LEN];
    CoapPDU coapPDU((uint8_t*)buffer, BUF_LEN, BUF_LEN);

    struct sockaddr_storage receiving;
    socklen_t receivingLength = sizeof(struct sockaddr_storage);
    struct sockaddr_in* v4Incming;
    struct sockaddr_in6* v6Incoming;
    char incoming[INET6_ADDRSTRLEN];

//    while (true) {
        result = recvfrom(
                descriptor,
                &buffer,
                BUF_LEN,
                0,
                (sockaddr *) &receiving,
                &receivingLength);
        EXPECT_NE(-1, result);
        EXPECT_LT(BUF_LEN, result);

        switch (receiving.ss_family) {
            case AF_INET:
                v4Incming = (struct sockaddr_in *) &receiving;
                break;
            case AF_INET6:
                v6Incoming = (struct sockaddr_in6 *) &receiving;
                break;
        }

        coapPDU.setPDULength(result);
        EXPECT_NE(-1, coapPDU.validate());

        coapPDU.printHuman();

        char uriBuffer[URI_BUF_LEN];
        int uriLength = 0;
        EXPECT_EQ(0, coapPDU.getURI(uriBuffer, URI_BUF_LEN, &uriLength));
        EXPECT_NE(0, uriLength);
//    }
}

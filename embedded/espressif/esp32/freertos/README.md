# sandbox.iot.coap
Sandbox for all IoT CoAP Developments - FreeRTOS on Espressif ESP32

## Hardware

This documentation covers the [ESP32](
https://www.espressif.com/en/products/hardware/esp32/overview)
system on a chip [SoC](https://en.wikipedia.org/wiki/System_on_a_chip)
of the manufacturer [Espressif](https://www.espressif.com/).

## Software

The [ESP32-DevKitC](
https://www.espressif.com/en/products/hardware/esp32-devkitc/overview)
software development kit for the ESP32 SoC provides all libraries and tools
to develop for this embedded hardware platform.

In the git repository [ESP-IDF](https://github.com/espressif/esp-idf)
there are further instructions how to do a
[Standard Setup of Toolchain for Linux](
https://esp-idf.readthedocs.io/en/latest/get-started/linux-setup.html)
and then how to [Get ESP-IDF](
https://esp-idf.readthedocs.io/en/latest/get-started/index.html#get-started-get-esp-idf)

## Operating System

[AWS FreeRTOS](
https://aws.amazon.com/freertos/?sc_channel=PS&sc_campaign=acquisition_&sc_publisher=google&sc_medium=ACQ-P%7CPS-GO%7CNon-Brand%7CSU%7CIoT%7CFreeRTOS%7CDE%7CEN%7CText&sc_content=freertos_p&sc_detail=freertos&sc_category=IoT&sc_segment=289353081329&sc_matchtype=p&sc_country=DE&sc_kwcid=AL!4422!3!289353081329!p!!g!!freertos&s_kwcid=AL!4422!3!289353081329!p!!g!!freertos&ef_id=WseBIwAAAiknJzx0:20180826105051:s)
is an IoT operating system for embedded devices.

[Getting Started with Amazon FreeRTOS](
https://aws.amazon.com/freertos/getting-started/)
includes a section for the [Espressif](https://www.espressif.com/)
series of [SoC](https://en.wikipedia.org/wiki/System_on_a_chip)s.

The [amazon-freertos](https://github.com/aws/amazon-freertos)
repository contains the AWS Cloud-native IoT operating system for microcontrollers.
[Getting Started with the Espressif ESP32-DevKitC and the ESP-WROVER-KIT](
https://docs.aws.amazon.com/freertos/latest/userguide/getting_started_espressif.html)
explains how to develop with the above.

### Setup

Simply execute the script [`./setup.sh`](./setup.sh)
to get the development environment set up.

### Build


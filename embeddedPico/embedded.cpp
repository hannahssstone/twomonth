//this is the place for the code on the pico//
#include <Arduino.h>
#include <Wire.h>

#define I2C_SDAPIN = 6
#define I2C_SCLPIN = 7
#define UART_TX_PIN = 1
#define UART_RX_PIN = 2


void setup() {
  // put your setup code here, to run once:
  Serial1.setRX(UART_RX_PIN);
  Serial1.setTX(UART_TX_PIN);
  
}

void loop() {
  // put your main code here, to run repeatedly:
  
}

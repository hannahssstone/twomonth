//this is the place for the code on the pico//

#include <Arduino.h>
#include <Wire.h>
#include <DualMAX14870MotorShield.h>

#define I2C_SDAPIN = 6
#define I2C_SCLPIN = 7
#define UART_TX_PIN = 1
#define UART_RX_PIN = 2
#define MOT_DRIVE_2_PIN = 27


void setup() {
  // put your setup code here, to run once:
  Serial1.setRX(UART_RX_PIN);
  Serial1.setTX(UART_TX_PIN);
  double x-pos,y-pos = 0.0;
  int WH1_speed = 0;
  int WH2_speed = 0;
  int WH3_speed = 0;
  int WH4_speed = 0;
}
int speedcalc(posit_x,posit_y){
  
}
void loop() {
  // put your main code here, to run repeatedly:
  
}

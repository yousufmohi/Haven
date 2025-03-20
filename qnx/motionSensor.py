"""
This is a class for motion sensor
"""

import rpi_gpio as GPIO
import time
import logging
   

class MotionSensor:

    def __init__(self, pin, increment, cooldown):
        self.GPIO_PIR_PIN = pin
        GPIO.setup(self.GPIO_PIR_PIN, GPIO.IN)
        self.increment = increment

        self.awake = False
        self.power = False

        self.isThereMotion = False

        self.timeCooldown = cooldown
    
    # main loop to detect if there is motion if it is powered
    def run(self):
        self.power = True
        self.awake = True

        while self.power:
            while self.awake:
                if (GPIO.input(self.GPIO_PIR_PIN) == 1):
                    self.isThereMotion = True
                    # print("Motion Detected!!!")
                
                else:
                    self.isThereMotion = False
                    # print("No Motion")

                time.sleep(1)
    # return the status whether there is motion or not
    def status(self):
        return self.isThereMotion
    
    # resetMotion
    def resetStatus(self):
        self.pauseTime = time.time()
        self.awake = False

        self.currentTime = time.time()

        while self.currentTime - self.pauseTime < self.timeCooldown :
            self.currentTime = time.time()
        
        self.awake = True

    # Stop counting
    def powerOff(self):
        self.power = False

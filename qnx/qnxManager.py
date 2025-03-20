# For motionsensor
import threading
import time
from motionSensor import MotionSensor

# Update database
import sys
import requests
import json
from dotenv import load_dotenv
import os

# Variables
# Keep count
numberOfPeople = 92
shelter_id = "1"

# Update on database
lastDetectionTime = 0
updateFrequency = 10 #3s

# Motion Functions and Threads
countingMotionSensor = MotionSensor(pin = 21,increment = True, cooldown = 3)

def run_countingMotion():
    countingMotionSensor.run()

# Database
def increment_people(shelter_id, base_url=None, api_key=None):
    """Increment the 'people' count for a shelter by ID."""
    
    # Use environment variables if no arguments are provided
    base_url = base_url or os.getenv("BASE_URL")
    api_key = api_key or os.getenv("API_KEY")
    
    # Step 1: Fetch all shelters
    get_url = f"{base_url}/shelter/"
    headers = {'Content-Type': 'application/json'}
    
    # Include the API key in headers if provided
    if api_key:
        headers['Authorization'] = f'Bearer {api_key}'
    
    try:
        response = requests.get(get_url, headers=headers)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching shelters: {e}")
        sys.exit(1)
    
    # Parse the response
    shelters = response.json()
    
    # Find the target shelter
    target_shelter = None
    for shelter in shelters:
        if shelter.get('id') == shelter_id:
            target_shelter = shelter
            break
    
    if not target_shelter:
        print(f"Error: Shelter with ID {shelter_id} not found")
        sys.exit(1)
    
    # Get current people count
    current_people = target_shelter.get('people', 0)
    new_people = numberOfPeople
    
    # Check if we'll exceed the maximum value (100)
    if new_people > 100:
        print(f"Warning: Cannot increment people count above 100. Current count is {current_people}.")
    
    # Step 2: Update the shelter with incremented people count
    put_url = f"{base_url}/shelter/{shelter_id}"
    update_data = {"people": new_people}
    
    print(f"Updating shelter {shelter_id} - '{target_shelter.get('name')}' from {current_people} to {new_people} people")
    
    try:
        response = requests.put(
            put_url, 
            json=update_data,
            headers=headers
        )
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error updating shelter: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response: {e.response.text}")
        sys.exit(1)
    
    # Parse and print the response
    result = response.json()
    if result.get('success'):
        print(f"Success! Shelter people count updated to {new_people}")
        return True
    else:
        print(f"Error: {result.get('error')}")
        return False


if __name__ == "__main__":
    print("QNX Manager starting")

    # Counting Motion (People entering)
    countingMotion_thread = threading.Thread(target=run_countingMotion)
    countingMotion_thread.start()

    # Decreasing Motion (People leaving)


    # Start QNX System Manager
    while(True):
    
        # Check whether there has been a movement and update accordingly
        if (not countingMotionSensor.status()):
           pass

        else:
            numberOfPeople += 1
            print(f"Motion Detected!!! | People:{numberOfPeople}")
            countingMotionSensor.resetStatus()

           

        # Update the database
        currentTime = time.time()
        if currentTime - lastDetectionTime > updateFrequency:
            print(f"Updated database with a count of {numberOfPeople}")
            increment_people(shelter_id)
            lastDetectionTime = currentTime

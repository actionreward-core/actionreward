import csv
import random
import string

# Function to generate a random code
def generate_random_code():
    code = ""
    for _ in range(20):
        if _ in (4, 9, 14):
            code += "-"
        elif _ in (5, 10, 15):
            code += random.choice(string.ascii_uppercase)
        else:
            code += random.choice(string.digits)
    return code

# Number of codes to generate
num_codes = 200

# Create a list of random codes
codes = [generate_random_code() for _ in range(num_codes)]

# Define the CSV file path
csv_file = 'random_codes.csv'

# Write the codes to a CSV file
with open(csv_file, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Code'])
    for code in codes:
        writer.writerow([code])

print(f"{num_codes} random codes have been generated and saved to {csv_file}.")


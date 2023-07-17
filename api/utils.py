import re

#Function to validate an email, used in my views file for registration
def validateEmail(email):
    pattern = r"[^@]+@[^@]+\.[^@]+"   # Regular expression for a standard email
    if re.match(pattern, email):
        return True
    else:
        return False

import re

def validateEmail(email):
    pattern = r"[^@]+@[^@]+\.[^@]+"   # Regular expression for a standard email
    if re.match(pattern, email):
        return True
    else:
        return False

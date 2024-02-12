# execute.py

import sys
import json
from io import StringIO

def execute_code(code):
    # Redirect stdout to capture output
    sys.stdout = StringIO()
    try:
        exec(code)
        output = sys.stdout.getvalue()
        return {'success': True, 'output': output}
    except Exception as e:
        return {'success': False, 'output': str(e)}

if __name__ == '__main__':
    data = json.load(sys.stdin)
    code = data['code']
    result = execute_code(code)
    print(json.dumps(result))

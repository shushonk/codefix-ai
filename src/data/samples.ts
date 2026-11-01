import { Project } from '../types';

export const SAMPLE_PROJECT: Project = {
  id: 'sample-python',
  name: 'Sample Python Project',
  language: 'python',
  files: [
    {
      path: 'auth.py',
      language: 'python',
      content: `import sqlite3

def get_user(username):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    # SQL Injection Vulnerability
    query = "SELECT * FROM users WHERE username = '" + username + "'"
    cursor.execute(query)
    return cursor.fetchone()

def process_data(data):
    # Potential Null Pointer/None error
    results = []
    for item in data:
        if item.get('id') > 0:
            results.append(item)
    return results

def calculate_average(numbers):
    # Potential Division by Zero
    total = sum(numbers)
    return total / len(numbers)
`
    }
  ]
};

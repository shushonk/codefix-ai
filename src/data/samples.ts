import { Project } from '../types';

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: 'python-security-lab',
    name: 'Security Lab (Python)',
    language: 'python',
    files: [
      {
        path: 'auth/manager.py',
        language: 'python',
        content: `import sqlite3
import hashlib
import os

def login(username, password):
    conn = sqlite3.connect('prod.db')
    cursor = conn.cursor()
    # CRITICAL: SQL Injection
    query = f"SELECT * FROM users WHERE user = '{username}' AND pass = '{password}'"
    cursor.execute(query)
    return cursor.fetchone()

def hash_password(password):
    # LOW: Insecure hashing (MD5)
    return hashlib.md5(password.encode()).hexdigest()

def upload_avatar(user_id, file_path):
    # MEDIUM: Potential path traversal
    save_path = os.path.join("uploads", file_path)
    with open(save_path, "wb") as f:
        f.write(b"data")
`
      },
      {
        path: 'processor/data.py',
        language: 'python',
        content: `def process_batch(items):
    # PERFORMANCE: Inefficient O(N^2) loop
    results = []
    for i in range(len(items)):
        for j in range(len(items)):
            if items[i] == items[j] and i != j:
                results.append(items[i])
    return results

def calculate_metrics(values):
    # BUG: Division by zero if values is empty
    total = sum(values)
    avg = total / len(values)
    return {"avg": avg}
`
      }
    ]
  },
  {
    id: 'ts-api-gateway',
    name: 'API Gateway (TypeScript)',
    language: 'typescript',
    files: [
      {
        path: 'src/middleware/auth.ts',
        language: 'typescript',
        content: `import jwt from 'jsonwebtoken';

export const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    // SECURITY: Weak auth check
    return next(); 
  }

  try {
    // SECURITY: Hardcoded secret
    const decoded = jwt.verify(token, 'super-secret-key-123');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Invalid Token');
  }
};
`
      },
      {
        path: 'src/controllers/user.ts',
        language: 'typescript',
        content: `import { db } from '../db';

export const getUser = async (id: string) => {
  // BUG: No error handling for db query
  const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  
  // QUALITY: Unnecessary double negative
  if (!!user) {
    return user.rows[0];
  }
  return null;
};
`
      }
    ]
  },
  {
    id: 'java-enterprise',
    name: 'Enterprise Core (Java)',
    language: 'java',
    files: [
      {
        path: 'com/corp/service/OrderService.java',
        language: 'java',
        content: `package com.corp.service;

import java.util.*;

public class OrderService {
    private List<Order> orders = new ArrayList<>();

    public void processOrders(List<Order> incoming) {
        // PERFORMANCE: Thread-unsafe operation on shared list
        orders.addAll(incoming);
    }

    public Order findOrder(String id) {
        // BUG: Potential NullPointerException
        for (Order o : orders) {
            if (o.getId().equals(id)) {
                return o;
            }
        }
        return null;
    }
}
`
      }
    ]
  }
];

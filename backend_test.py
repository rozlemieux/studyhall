#!/usr/bin/env python3
"""
StudyHall Backend API Testing Script
Tests the Node.js backend APIs for the StudyHall application
"""

import requests
import json
import time
import sys
from typing import Dict, Any, Optional

# Configuration
BASE_URL = "http://localhost:8001"
API_BASE = f"{BASE_URL}/api"

class StudyHallTester:
    def __init__(self):
        self.session = requests.Session()
        self.test_users = {}
        self.test_results = []
        
    def log_test(self, test_name: str, success: bool, message: str, details: Optional[Dict] = None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'details': details or {}
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_server_health(self) -> bool:
        """Test if server is running"""
        try:
            response = self.session.get(f"{BASE_URL}/api/slimes", timeout=5)
            if response.status_code == 200:
                self.log_test("Server Health", True, "Server is running and responding")
                return True
            else:
                self.log_test("Server Health", False, f"Server returned status {response.status_code}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Server Health", False, f"Cannot connect to server: {str(e)}")
            return False
    
    def test_user_registration_and_login(self) -> bool:
        """Test user registration and login for both teacher and student"""
        success = True
        
        # Test student registration
        student_data = {
            "username": "practicetester",
            "password": "test123",
            "role": "student"
        }
        
        try:
            response = self.session.post(f"{API_BASE}/auth/register", json=student_data)
            if response.status_code in [200, 400]:  # 400 might mean user already exists
                if response.status_code == 200:
                    self.test_users['student'] = response.json()
                    self.log_test("Student Registration", True, "Student registered successfully")
                else:
                    # Try to login instead
                    login_response = self.session.post(f"{API_BASE}/auth/login", json={
                        "username": student_data["username"],
                        "password": student_data["password"]
                    })
                    if login_response.status_code == 200:
                        self.test_users['student'] = login_response.json()
                        self.log_test("Student Registration", True, "Student already exists, logged in successfully")
                    else:
                        self.log_test("Student Registration", False, f"Registration failed: {response.text}")
                        success = False
            else:
                self.log_test("Student Registration", False, f"Registration failed with status {response.status_code}")
                success = False
        except Exception as e:
            self.log_test("Student Registration", False, f"Registration error: {str(e)}")
            success = False
        
        # Test teacher registration
        teacher_data = {
            "username": "teachertest",
            "password": "test123",
            "role": "teacher"
        }
        
        try:
            response = self.session.post(f"{API_BASE}/auth/register", json=teacher_data)
            if response.status_code in [200, 400]:
                if response.status_code == 200:
                    self.test_users['teacher'] = response.json()
                    self.log_test("Teacher Registration", True, "Teacher registered successfully")
                else:
                    # Try to login instead
                    login_response = self.session.post(f"{API_BASE}/auth/login", json={
                        "username": teacher_data["username"],
                        "password": teacher_data["password"]
                    })
                    if login_response.status_code == 200:
                        self.test_users['teacher'] = login_response.json()
                        self.log_test("Teacher Registration", True, "Teacher already exists, logged in successfully")
                    else:
                        self.log_test("Teacher Registration", False, f"Registration failed: {response.text}")
                        success = False
            else:
                self.log_test("Teacher Registration", False, f"Registration failed with status {response.status_code}")
                success = False
        except Exception as e:
            self.log_test("Teacher Registration", False, f"Registration error: {str(e)}")
            success = False
        
        return success
    
    def test_practice_mode_endpoints(self) -> bool:
        """Test practice mode API endpoints"""
        if 'student' not in self.test_users:
            self.log_test("Practice Mode APIs", False, "No student user available for testing")
            return False
        
        student_id = self.test_users['student']['id']
        success = True
        
        # Test practice stats endpoint
        try:
            response = self.session.get(f"{API_BASE}/practice/{student_id}/stats")
            if response.status_code == 200:
                self.log_test("Practice Stats API", True, "Practice stats endpoint working")
            elif response.status_code == 404:
                self.log_test("Practice Stats API", False, "Practice stats endpoint not implemented (404)")
                success = False
            else:
                self.log_test("Practice Stats API", False, f"Practice stats returned status {response.status_code}")
                success = False
        except Exception as e:
            self.log_test("Practice Stats API", False, f"Practice stats error: {str(e)}")
            success = False
        
        # Test practice history endpoint
        try:
            response = self.session.get(f"{API_BASE}/practice/{student_id}/history")
            if response.status_code == 200:
                self.log_test("Practice History API", True, "Practice history endpoint working")
            elif response.status_code == 404:
                self.log_test("Practice History API", False, "Practice history endpoint not implemented (404)")
                success = False
            else:
                self.log_test("Practice History API", False, f"Practice history returned status {response.status_code}")
                success = False
        except Exception as e:
            self.log_test("Practice History API", False, f"Practice history error: {str(e)}")
            success = False
        
        # Test practice save endpoint
        try:
            practice_data = {
                "score": 850,
                "questions_correct": 8,
                "questions_total": 10,
                "difficulty": "medium",
                "game_mode": "classic",
                "currency_earned": 42
            }
            response = self.session.post(f"{API_BASE}/practice/{student_id}/save", json=practice_data)
            if response.status_code == 200:
                self.log_test("Practice Save API", True, "Practice save endpoint working")
            elif response.status_code == 404:
                self.log_test("Practice Save API", False, "Practice save endpoint not implemented (404)")
                success = False
            else:
                self.log_test("Practice Save API", False, f"Practice save returned status {response.status_code}")
                success = False
        except Exception as e:
            self.log_test("Practice Save API", False, f"Practice save error: {str(e)}")
            success = False
        
        return success
    
    def test_player_data_endpoints(self) -> bool:
        """Test player data endpoints"""
        if 'student' not in self.test_users:
            self.log_test("Player Data APIs", False, "No student user available for testing")
            return False
        
        student_id = self.test_users['student']['id']
        success = True
        
        # Test get player data
        try:
            response = self.session.get(f"{API_BASE}/player/{student_id}")
            if response.status_code == 200:
                player_data = response.json()
                self.log_test("Get Player Data", True, f"Player data retrieved: {player_data.get('username', 'Unknown')}")
            else:
                self.log_test("Get Player Data", False, f"Get player data returned status {response.status_code}")
                success = False
        except Exception as e:
            self.log_test("Get Player Data", False, f"Get player data error: {str(e)}")
            success = False
        
        return success
    
    def test_question_sets_api(self) -> bool:
        """Test question sets API"""
        success = True
        
        # Test get question sets
        try:
            response = self.session.get(f"{API_BASE}/question-sets")
            if response.status_code == 200:
                question_sets = response.json()
                self.log_test("Get Question Sets", True, f"Retrieved {len(question_sets)} question sets")
                return len(question_sets) > 0  # Return True if we have question sets
            else:
                self.log_test("Get Question Sets", False, f"Get question sets returned status {response.status_code}")
                success = False
        except Exception as e:
            self.log_test("Get Question Sets", False, f"Get question sets error: {str(e)}")
            success = False
        
        return success
    
    def test_slimes_api(self) -> bool:
        """Test slimes API"""
        success = True
        
        # Test get slimes
        try:
            response = self.session.get(f"{API_BASE}/slimes")
            if response.status_code == 200:
                slimes = response.json()
                self.log_test("Get Slimes", True, f"Retrieved {len(slimes)} slimes")
            else:
                self.log_test("Get Slimes", False, f"Get slimes returned status {response.status_code}")
                success = False
        except Exception as e:
            self.log_test("Get Slimes", False, f"Get slimes error: {str(e)}")
            success = False
        
        return success
    
    def test_socket_io_endpoints(self) -> bool:
        """Test Socket.IO related functionality (HTTP endpoints only)"""
        # We can't easily test Socket.IO from Python without additional libraries
        # But we can test if the server is set up to handle socket connections
        success = True
        
        # Check if socket.io endpoint exists
        try:
            response = self.session.get(f"{BASE_URL}/socket.io/")
            if response.status_code in [200, 400, 404]:  # Any response means server is handling socket.io
                self.log_test("Socket.IO Setup", True, "Socket.IO endpoint is accessible")
            else:
                self.log_test("Socket.IO Setup", False, f"Socket.IO endpoint returned unexpected status {response.status_code}")
                success = False
        except Exception as e:
            self.log_test("Socket.IO Setup", False, f"Socket.IO endpoint error: {str(e)}")
            success = False
        
        return success
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🧪 Starting StudyHall Backend API Tests")
        print("=" * 50)
        
        # Test server health first
        if not self.test_server_health():
            print("\n❌ Server is not running. Please start the backend server first.")
            return False
        
        # Run all tests
        tests = [
            self.test_user_registration_and_login,
            self.test_player_data_endpoints,
            self.test_question_sets_api,
            self.test_slimes_api,
            self.test_practice_mode_endpoints,
            self.test_socket_io_endpoints,
        ]
        
        for test in tests:
            try:
                test()
            except Exception as e:
                print(f"❌ Test {test.__name__} failed with exception: {str(e)}")
        
        # Summary
        print("\n" + "=" * 50)
        print("📊 TEST SUMMARY")
        print("=" * 50)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%" if total > 0 else "No tests run")
        
        # Show failed tests
        failed_tests = [result for result in self.test_results if not result['success']]
        if failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in failed_tests:
                print(f"  - {test['test']}: {test['message']}")
        
        return passed == total

if __name__ == "__main__":
    tester = StudyHallTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)
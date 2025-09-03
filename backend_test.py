#!/usr/bin/env python3
"""
Backend API Test Suite for Prasanth Davuluri's Automotive Specialist Portfolio
Tests all API endpoints for functionality, data structure, and error handling
"""

import requests
import json
import os
from datetime import datetime
from typing import Dict, List, Any

# Get backend URL from environment
BACKEND_URL = "https://auto-portfolio.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name: str, success: bool, message: str, response_data: Any = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        
        if not success:
            self.failed_tests.append(result)
            
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        
    def make_request(self, method: str, endpoint: str, data: Dict = None, params: Dict = None) -> requests.Response:
        """Make HTTP request with error handling"""
        url = f"{self.base_url}{endpoint}"
        try:
            if method.upper() == "GET":
                response = requests.get(url, params=params, timeout=30)
            elif method.upper() == "POST":
                response = requests.post(url, json=data, timeout=30)
            else:
                raise ValueError(f"Unsupported method: {method}")
            return response
        except requests.exceptions.RequestException as e:
            print(f"Request failed for {endpoint}: {str(e)}")
            raise
    
    def test_health_endpoint(self):
        """Test GET /api/health endpoint"""
        try:
            response = self.make_request("GET", "/health")
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["status", "database", "timestamp"]
                
                if all(field in data for field in required_fields):
                    if data["status"] == "healthy" and data["database"] == "connected":
                        self.log_test("Health Check", True, "Health endpoint working correctly", data)
                    else:
                        self.log_test("Health Check", False, f"Health status not healthy: {data}")
                else:
                    self.log_test("Health Check", False, f"Missing required fields in response: {data}")
            else:
                self.log_test("Health Check", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Health Check", False, f"Exception occurred: {str(e)}")
    
    def test_profile_endpoint(self):
        """Test GET /api/profile endpoint"""
        try:
            response = self.make_request("GET", "/profile")
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["name", "title", "email", "phone", "location", "linkedin", "bio", "availability", "yearsExperience"]
                
                if all(field in data for field in required_fields):
                    # Check Prasanth Davuluri's profile data
                    if (data["name"] == "Prasanth Davuluri" and 
                        "Automotive" in data["title"] and 
                        "Westland, Michigan" in data["location"] and
                        data["yearsExperience"] == 13):
                        self.log_test("Profile Data", True, f"Profile endpoint returning correct Prasanth Davuluri data: {data['name']}, {data['title']}, {data['location']}", data)
                    else:
                        self.log_test("Profile Data", False, f"Profile data doesn't match Prasanth Davuluri's expected values: {data}")
                else:
                    self.log_test("Profile Data", False, f"Missing required fields in profile: {data}")
            else:
                self.log_test("Profile Data", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Profile Data", False, f"Exception occurred: {str(e)}")
    
    def test_skills_endpoint(self):
        """Test GET /api/skills endpoint"""
        try:
            response = self.make_request("GET", "/skills")
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list) and len(data) > 0:
                    required_fields = ["name", "level", "category", "yearsExperience"]
                    
                    # Check skills structure
                    valid_skills = all(
                        all(field in skill for field in required_fields) for skill in data
                    )
                    
                    if valid_skills:
                        # Check for automotive-specific skills
                        skill_names = [skill["name"] for skill in data]
                        automotive_skills = ["MATLAB/Simulink", "AUTOSAR", "Model-Based Development", "MIL/SIL/HIL Testing", "CAN/LIN Protocols"]
                        
                        found_automotive_skills = [skill for skill in automotive_skills if skill in skill_names]
                        
                        if len(found_automotive_skills) >= 3:
                            self.log_test("Skills Data", True, f"Skills endpoint working correctly - {len(data)} skills with automotive expertise: {found_automotive_skills}", data)
                        else:
                            self.log_test("Skills Data", False, f"Missing automotive-specific skills. Found: {found_automotive_skills}")
                    else:
                        self.log_test("Skills Data", False, f"Invalid skills structure in data: {data}")
                else:
                    self.log_test("Skills Data", False, f"Skills data is not a valid list: {data}")
            else:
                self.log_test("Skills Data", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Skills Data", False, f"Exception occurred: {str(e)}")
    
    def test_experience_endpoint(self):
        """Test GET /api/experience endpoint"""
        try:
            response = self.make_request("GET", "/experience")
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list) and len(data) > 0:
                    required_fields = ["id", "company", "position", "duration", "location", "type", "description", "achievements", "technologies"]
                    
                    valid_experiences = all(
                        all(field in exp for field in required_fields) for exp in data
                    )
                    
                    if valid_experiences:
                        # Check for TCS experiences with automotive clients (Ford, Stellantis, Lucid Motors, JLR)
                        companies = [exp["company"] for exp in data]
                        clients = []
                        for exp in data:
                            if "client" in exp and exp["client"]:
                                clients.append(exp["client"])
                        
                        automotive_clients = ["Ford Motor Company", "Stellantis", "Lucid Motors", "Jaguar Land Rover"]
                        found_clients = [client for client in automotive_clients if client in clients]
                        
                        if "Tata Consultancy Services" in companies and len(found_clients) >= 2:
                            self.log_test("Experience Data", True, f"Experience endpoint working correctly - TCS with automotive clients: {found_clients}", data)
                        else:
                            self.log_test("Experience Data", False, f"Missing expected TCS automotive experience. Companies: {companies}, Clients: {clients}")
                    else:
                        self.log_test("Experience Data", False, f"Invalid experience structure in data: {data}")
                else:
                    self.log_test("Experience Data", False, f"Experience data is not a valid list: {data}")
            else:
                self.log_test("Experience Data", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Experience Data", False, f"Exception occurred: {str(e)}")
    
    def test_projects_endpoint(self):
        """Test GET /api/projects endpoint"""
        try:
            response = self.make_request("GET", "/projects")
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list) and len(data) > 0:
                    required_fields = ["id", "title", "category", "description", "technologies", "features", "status", "timeline", "client"]
                    
                    valid_projects = all(
                        all(field in project for field in required_fields) for project in data
                    )
                    
                    if valid_projects:
                        # Check for automotive projects (Ford BCM, Stellantis HIL, Lucid automation)
                        project_titles = [project["title"] for project in data]
                        automotive_keywords = ["Ford", "Stellantis", "Lucid", "BCM", "HIL", "Jaguar"]
                        
                        automotive_projects = [title for title in project_titles 
                                             if any(keyword in title for keyword in automotive_keywords)]
                        
                        if len(automotive_projects) >= 3:
                            self.log_test("Projects Data", True, f"Projects endpoint working correctly - {len(data)} projects with automotive focus: {automotive_projects}", data)
                        else:
                            self.log_test("Projects Data", False, f"Missing automotive projects. Found: {automotive_projects}")
                    else:
                        self.log_test("Projects Data", False, f"Invalid project structure in data: {data}")
                else:
                    self.log_test("Projects Data", False, f"Projects data is not a valid list: {data}")
            else:
                self.log_test("Projects Data", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Projects Data", False, f"Exception occurred: {str(e)}")
    
    def test_projects_by_category(self):
        """Test GET /api/projects?category=Model-Based Development"""
        try:
            response = self.make_request("GET", "/projects", params={"category": "Model-Based Development"})
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    # Check if all returned projects have the correct category
                    if len(data) > 0:
                        correct_category = all(project["category"] == "Model-Based Development" for project in data)
                        if correct_category:
                            self.log_test("Projects by Category", True, f"Category filter working correctly - {len(data)} Model-Based Development projects found", data)
                        else:
                            self.log_test("Projects by Category", False, f"Category filter not working - found projects with wrong categories: {[p['category'] for p in data]}")
                    else:
                        self.log_test("Projects by Category", True, "Category filter working - no Model-Based Development projects found (acceptable)", data)
                else:
                    self.log_test("Projects by Category", False, f"Projects by category data is not a valid list: {data}")
            else:
                self.log_test("Projects by Category", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Projects by Category", False, f"Exception occurred: {str(e)}")
    
    def test_testimonials_endpoint(self):
        """Test GET /api/testimonials endpoint"""
        try:
            response = self.make_request("GET", "/testimonials")
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list) and len(data) > 0:
                    required_fields = ["id", "name", "position", "company", "content", "rating"]
                    
                    valid_testimonials = all(
                        all(field in testimonial for field in required_fields) for testimonial in data
                    )
                    
                    if valid_testimonials:
                        # Check if all testimonials are approved
                        all_approved = all(testimonial.get("approved", True) for testimonial in data)
                        if all_approved:
                            self.log_test("Testimonials Data", True, f"Testimonials endpoint working correctly - {len(data)} testimonials found", data)
                        else:
                            self.log_test("Testimonials Data", False, f"Found unapproved testimonials in response: {data}")
                    else:
                        self.log_test("Testimonials Data", False, f"Invalid testimonial structure in data: {data}")
                else:
                    self.log_test("Testimonials Data", False, f"Testimonials data is not a valid list: {data}")
            else:
                self.log_test("Testimonials Data", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Testimonials Data", False, f"Exception occurred: {str(e)}")
    
    def test_awards_endpoint(self):
        """Test GET /api/awards endpoint"""
        try:
            response = self.make_request("GET", "/awards")
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list) and len(data) > 0:
                    required_fields = ["id", "title", "organization", "year", "description"]
                    
                    valid_awards = all(
                        all(field in award for field in required_fields) for award in data
                    )
                    
                    if valid_awards:
                        self.log_test("Awards Data", True, f"Awards endpoint working correctly - {len(data)} awards found", data)
                    else:
                        self.log_test("Awards Data", False, f"Invalid award structure in data: {data}")
                else:
                    self.log_test("Awards Data", False, f"Awards data is not a valid list: {data}")
            else:
                self.log_test("Awards Data", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Awards Data", False, f"Exception occurred: {str(e)}")
    
    def test_contact_endpoint(self):
        """Test POST /api/contact endpoint"""
        try:
            test_contact_data = {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "subject": "Job Opportunity",
                "message": "Hi Bhavyasri, I came across your portfolio and I'm impressed with your automotive embedded systems expertise. We have an exciting opportunity at our company for a Senior Embedded Software Engineer role. Would you be interested in discussing this further?"
            }
            
            response = self.make_request("POST", "/contact", data=test_contact_data)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["message", "id", "status"]
                
                if all(field in data for field in required_fields):
                    if data["status"] == "received" and "successfully" in data["message"]:
                        self.log_test("Contact Form Submission", True, f"Contact form working correctly - Message ID: {data['id']}", data)
                    else:
                        self.log_test("Contact Form Submission", False, f"Contact form response not as expected: {data}")
                else:
                    self.log_test("Contact Form Submission", False, f"Missing required fields in contact response: {data}")
            else:
                self.log_test("Contact Form Submission", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Exception occurred: {str(e)}")
    
    def test_stats_endpoint(self):
        """Test GET /api/stats endpoint"""
        try:
            response = self.make_request("GET", "/stats")
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["totalMessages", "newMessages", "totalProjects", "featuredProjects", "totalTestimonials", "totalAwards", "lastUpdated"]
                
                if all(field in data for field in required_fields):
                    # Check if all values are numeric (except lastUpdated)
                    numeric_fields = ["totalMessages", "newMessages", "totalProjects", "featuredProjects", "totalTestimonials", "totalAwards"]
                    all_numeric = all(isinstance(data[field], int) and data[field] >= 0 for field in numeric_fields)
                    
                    if all_numeric:
                        self.log_test("Portfolio Statistics", True, f"Stats endpoint working correctly", data)
                    else:
                        self.log_test("Portfolio Statistics", False, f"Stats contain non-numeric values: {data}")
                else:
                    self.log_test("Portfolio Statistics", False, f"Missing required fields in stats: {data}")
            else:
                self.log_test("Portfolio Statistics", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Portfolio Statistics", False, f"Exception occurred: {str(e)}")
    
    def run_all_tests(self):
        """Run all API tests"""
        print(f"\n🚀 Starting Backend API Tests for Bhavyasri's Portfolio")
        print(f"Backend URL: {self.base_url}")
        print("=" * 80)
        
        # Run all tests
        self.test_health_endpoint()
        self.test_profile_endpoint()
        self.test_skills_endpoint()
        self.test_experience_endpoint()
        self.test_projects_endpoint()
        self.test_projects_by_category()
        self.test_testimonials_endpoint()
        self.test_awards_endpoint()
        self.test_contact_endpoint()
        self.test_stats_endpoint()
        
        # Print summary
        print("\n" + "=" * 80)
        print("📊 TEST SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t["success"]])
        failed_tests = len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  - {test['test']}: {test['message']}")
        else:
            print("\n🎉 ALL TESTS PASSED!")
        
        return {
            "total": total_tests,
            "passed": passed_tests,
            "failed": failed_tests,
            "success_rate": (passed_tests/total_tests)*100,
            "failed_tests": self.failed_tests
        }

def main():
    """Main function to run the tests"""
    tester = PortfolioAPITester()
    results = tester.run_all_tests()
    
    # Return exit code based on test results
    return 0 if results["failed"] == 0 else 1

if __name__ == "__main__":
    exit(main())
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User


class AuthFlowTests(TestCase):
    """End-to-end tests for registration, login, and profile management."""

    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse("register")
        self.login_url = reverse("login")
        self.profile_url = reverse("profile")

    def test_register_creates_user(self):
        response = self.client.post(self.register_url, {
            "username": "testuser",
            "email": "test@example.com",
            "password": "StrongPass1!",
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username="testuser").exists())

    def test_register_missing_fields(self):
        response = self.client.post(self.register_url, {
            "username": "testuser2",
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    def test_login_returns_tokens(self):
        User.objects.create_user(username="loginuser", email="login@example.com", password="StrongPass1!")
        response = self.client.post(self.login_url, {
            "email": "login@example.com",
            "password": "StrongPass1!",
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_login_invalid_credentials(self):
        response = self.client.post(self.login_url, {
            "email": "nobody@example.com",
            "password": "wrong",
        })
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

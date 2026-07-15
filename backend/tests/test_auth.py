from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User


class DashboardAnalyticsTests(TestCase):
    """Tests for analytics aggregation and social account generation."""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="analyticsuser",
            email="analytics@example.com",
            password="StrongPass1!",
        )
        self.dashboard_url = reverse("dashboard-stats")
        self.accounts_url = reverse("social-accounts-list")

    def test_dashboard_stats_aggregates_data(self):
        token = self._get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(self.dashboard_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("followers", response.data)
        self.assertIn("engagement", response.data)
        self.assertIn("posts", response.data)
        self.assertIn("growth", response.data)

    def test_dashboard_auto_creates_accounts(self):
        token = self._get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(self.dashboard_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["accounts"]), 4)

    def test_social_accounts_list_requires_auth(self):
        response = self.client.get(self.accounts_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def _get_token(self):
        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(self.user)
        return str(refresh.access_token)

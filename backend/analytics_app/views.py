import random

from rest_framework import viewsets

from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response

from rest_framework.views import APIView

from .models import SocialAccount

from .serializers import SocialAccountSerializer


def ensure_demo_accounts(user):
    """Create starter social accounts for users without connected accounts."""
    if SocialAccount.objects.filter(user=user).exists():
        return

    platforms = [
        "instagram",
        "facebook",
        "youtube",
        "twitter",
    ]

    for platform in platforms:
        SocialAccount.objects.create(
            user=user,
            platform=platform,
            username=f"{user.username}_{platform}",
            followers=random.randint(1000, 200000),
            engagement_rate=round(random.uniform(1, 15), 1),
            total_posts=random.randint(50, 1000),
            growth_percentage=round(random.uniform(1, 40), 1),
        )


class SocialAccountViewSet(viewsets.ModelViewSet):
    """API endpoint for listing, creating, updating, and deleting social accounts.

    Automatically generates demo data for new users so the dashboard
    has meaningful content on first login.
    """

    serializer_class = SocialAccountSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return social accounts belonging to the authenticated user."""
        ensure_demo_accounts(self.request.user)

        return SocialAccount.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Attach new social accounts to the authenticated user."""
        serializer.save(user=self.request.user)


class DashboardStatsView(APIView):
    """Aggregate metrics across all connected social accounts for the dashboard."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Return summarized stats and account details for the current user."""
        ensure_demo_accounts(request.user)

        accounts = SocialAccount.objects.filter(user=request.user)

        total_followers = sum(acc.followers for acc in accounts)

        avg_engagement = round(
            sum(acc.engagement_rate for acc in accounts) / len(accounts), 1
        ) if accounts else 0

        total_posts = sum(acc.total_posts for acc in accounts)

        avg_growth = round(
            sum(acc.growth_percentage for acc in accounts) / len(accounts), 1
        ) if accounts else 0

        return Response({
            "followers": total_followers,
            "engagement": avg_engagement,
            "posts": total_posts,
            "growth": avg_growth,
            "accounts": SocialAccountSerializer(accounts, many=True).data,
        })

from django.db import models

from django.contrib.auth.models import User


class SocialAccount(models.Model):
    """Represents a connected social media account for analytics tracking."""

    PLATFORM_CHOICES = (
        ("instagram", "Instagram"),
        ("facebook", "Facebook"),
        ("youtube", "YouTube"),
        ("twitter", "Twitter/X"),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        help_text="Owner of this social account connection",
    )

    platform = models.CharField(
        max_length=20,
        choices=PLATFORM_CHOICES,
        help_text="Social media platform identifier",
    )

    username = models.CharField(
        max_length=100,
        help_text="Handle or display name on the platform",
    )

    followers = models.IntegerField(
        default=0,
        help_text="Total follower / subscriber count",
    )

    engagement_rate = models.FloatField(
        default=0,
        help_text="Average engagement rate as a percentage",
    )

    total_posts = models.IntegerField(
        default=0,
        help_text="Total published posts / videos",
    )

    growth_percentage = models.FloatField(
        default=0,
        help_text="Month-over-month growth percentage",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="When this account was first connected",
    )

    def __str__(self):
        return self.username
from django.contrib import admin
from .models import SocialAccount


@admin.register(SocialAccount)
class SocialAccountAdmin(admin.ModelAdmin):
    list_display = (
        "username",
        "platform",
        "followers",
        "engagement_rate",
        "total_posts",
        "growth_percentage",
        "user",
        "created_at",
    )
    list_filter = ("platform", "created_at")
    search_fields = ("username", "user__username", "user__email")
    readonly_fields = ("created_at",)
    fieldsets = (
        ("Account Owner", {"fields": ("user",)}),
        (
            "Platform Details",
            {"fields": ("platform", "username", "followers", "engagement_rate", "total_posts", "growth_percentage")},
        ),
        ("Timestamps", {"fields": ("created_at",)}),
    )

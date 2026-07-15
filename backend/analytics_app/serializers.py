from rest_framework import serializers

from .models import SocialAccount


class SocialAccountSerializer(serializers.ModelSerializer):
    """Serializes SocialAccount model instances for API responses."""

    class Meta:
        model = SocialAccount
        fields = "__all__"
        read_only_fields = ("user", "created_at")

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q


class RegisterView(APIView):
    """Handle user registration with validation."""

    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        """Create a new user account after validating uniqueness and password strength."""
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not username or not email or not password:
            return Response(
                {"error": "Username, email and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "Email already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            validate_password(password)
        except ValidationError as error:
            return Response(
                {"error": " ".join(error.messages)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    """Authenticate users and return JWT tokens."""

    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        """Validate credentials and return access/refresh tokens."""
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"error": "Please provide both email/username and password"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.filter(Q(email__iexact=email) | Q(username__iexact=email)).first()

        if user:
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                return Response({
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "username": user.username,
                    "email": user.email,
                })

            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND,
        )


class ProfileView(APIView):
    """Retrieve and update the authenticated user's profile."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Return the current user's username and email."""
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
        })

    def put(self, request):
        """Update username, email, and optionally password."""
        user = request.user
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if username:
            if User.objects.filter(username=username).exclude(pk=user.pk).exists():
                return Response(
                    {"error": "Username already exists"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            user.username = username
        if email:
            if User.objects.filter(email=email).exclude(pk=user.pk).exists():
                return Response(
                    {"error": "Email already exists"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            user.email = email
        if password:
            try:
                validate_password(password)
                user.set_password(password)
            except ValidationError as error:
                return Response(
                    {"error": " ".join(error.messages)},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        user.save()
        return Response({
            "username": user.username,
            "email": user.email,
        })

    def delete(self, request):
        """Permanently delete the authenticated user account."""
        user = request.user
        user.delete()
        return Response(
            {"message": "Account deleted"},
            status=status.HTTP_204_NO_CONTENT,
        )


class NotificationCountView(APIView):
    """Return the notification count for the authenticated user."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Return the count of unread notifications."""
        count = 3
        return Response({ "count": count })

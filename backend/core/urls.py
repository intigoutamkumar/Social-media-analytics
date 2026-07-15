from django.contrib import admin

from django.urls import path, include
from django.http import JsonResponse


def health_check(_request):
    """Return a lightweight health response for deployment monitors."""
    return JsonResponse({"status": "ok"})

urlpatterns = [

    path("api/health/", health_check, name="health-check"),

    path('admin/', admin.site.urls),

    path(
        "api/accounts/",
        include("accounts.urls")
    ),

    path(
        "api/analytics/",
        include("analytics_app.urls")
    ),
]

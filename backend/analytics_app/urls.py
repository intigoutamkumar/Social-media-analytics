from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import (

    SocialAccountViewSet,
    DashboardStatsView
)

router = DefaultRouter()

router.register(

    "social-accounts",

    SocialAccountViewSet,

    basename="social-accounts"
)

urlpatterns = router.urls + [

    path(

        "dashboard-stats/",

        DashboardStatsView.as_view(),

        name="dashboard-stats"
    )
]

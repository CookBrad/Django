from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'resume-sections', views.ResumeSectionViewSet)
router.register(r'templates', views.TemplateViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
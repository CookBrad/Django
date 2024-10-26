from rest_framework import viewsets
from rest_framework.response import Response
from .models import ResumeSection, Template
from .serializers import ResumeSectionSerializer, TemplateSerializer

class ResumeSectionViewSet(viewsets.ModelViewSet):
    serializer_class = ResumeSectionSerializer
    queryset = ResumeSection.objects.all()
    
    def get_queryset(self):
        # This should return an actual queryset. Here, we're assuming ResumeSection model exists.
        return ResumeSection.objects.all()

class TemplateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer
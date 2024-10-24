from django.db import models
from django.contrib.auth.models import User

class ResumeSection(models.Model):
    SECTION_TYPES = [
        ('ED', 'Education'),
        ('EX', 'Experience'),
        ('PR', 'Project'),
        ('SK', 'Skills'),
        ('AW', 'Awards'),
        # Add more as needed
    ]
    title = models.CharField(max_length=100)
    content = models.TextField()
    section_type = models.CharField(max_length=2, choices=SECTION_TYPES)
    order = models.PositiveIntegerField()

class Template(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    # You might store template HTML as a string or reference to a file
    html_content = models.TextField()
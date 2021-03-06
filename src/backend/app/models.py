from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Semester(models.Model):
    name = models.CharField(max_length=255)
    made_by = models.ForeignKey(CustomUser, related_name='semesters', on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-date']

class Course(models.Model):
    name = models.CharField(max_length=255)
    belongs_to = models.ForeignKey(Semester, related_name='courses', on_delete=models.CASCADE)

class Component(models.Model):
    name = models.CharField(max_length=255)
    weight = models.IntegerField()
    grade_received = models.IntegerField()
    goal_grade = models.IntegerField()
    belongs_to = models.ForeignKey(Course, related_name='components', on_delete=models.CASCADE)
    due_date = models.DateTimeField()

    class Meta:
        ordering = ['due_date']
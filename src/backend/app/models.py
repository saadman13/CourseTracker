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

class Course(models.Model):
    name = models.CharField(max_length=255)
    belongs_to = models.ForeignKey(Semester, related_name='courses', on_delete=models.CASCADE)



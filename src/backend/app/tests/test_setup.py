from rest_framework.test import APITestCase
from django.urls import reverse
from django.http import HttpResponse
import random
from django.core import serializers

'''
Setups some test data and urls to be used in the test suite, when the tests run
'''

class TestSetup(APITestCase):
    def setUp(self):
        self.obtain_token_url = reverse("create_token")
        self.semester_url = reverse("semesters")

        return super().setUp()

    def tearDown(self):
        return super().tearDown()

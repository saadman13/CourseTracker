from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers, exceptions
from .models import CustomUser, Semester, Course, Component
from django.db import IntegrityError
# ...
class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(
        required=True
    )
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email','password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        if password is not None:
            instance.set_password(password)

        try:
            instance.save()

        # the exception raised here is different than
        # serializers.ValidationError
    
        except IntegrityError as e:
            raise exceptions.AuthenticationFailed('Email already exists')
        return instance


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = "__all__"

class CourseSerializier(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = "__all__"
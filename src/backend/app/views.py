from rest_framework_simplejwt.views import TokenObtainPairView  
from rest_framework import status, permissions, exceptions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Component, Course, CustomUser, Semester
from .serializers import ComponentSerializer, SemesterSerializer,CustomUserSerializer,CourseSerializier
from datetime import datetime
import pytz

class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        # import pdb;
        # pdb.set_trace();
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
            except exceptions.AuthenticationFailed as e:
                return Response({'error': request.data['email'] + " already exists"}, status=status.HTTP_400_BAD_REQUEST)

            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HelloWorldView(APIView):

    def get(self, request):
        return Response(data={"hello":"world"}, status=status.HTTP_200_OK)


class SemesterView(APIView):

    def post(self,request,id):
        user = CustomUser.objects.get(id=id)
        # import pdb; pdb.set_trace()
        request.data['made_by'] = id
        serializer = SemesterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self,request, id):
        # import pdb
        # pdb.set_trace()
        user = CustomUser.objects.get(id=id)
        semesters = user.semesters
        
        serializer = SemesterSerializer(semesters,many=True)
        return Response({'semesters': serializer.data}, status=status.HTTP_200_OK)

    def delete(self,request,id):
        Semester.objects.get(id=id).delete()
        response = {}
        response['details'] = 'Semester Deleted'
        return Response(response, status=status.HTTP_200_OK)

class CourseView(APIView):

    def post(self,request,id):
        user = Semester.objects.get(id=id)
        # import pdb; pdb.set_trace()
        request.data['belongs_to'] = id
        serializer = CourseSerializier(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self,request, id):
        semester = Semester.objects.get(id=id)
        courses = semester.courses
        
        serializer = CourseSerializier(courses,many=True)
        return Response({'courses': serializer.data}, status=status.HTTP_200_OK)

    def delete(self,request,id):
        Course.objects.get(id=id).delete()
        response = {}
        response['details'] = 'Course Deleted'
        return Response(response, status=status.HTTP_200_OK)


class ComponentView(APIView):

    def post(self,request,id):
        # import pdb; pdb.set_trace()
        request.data['belongs_to'] = id #Sets it to the course whose id is passed in
        serializer = ComponentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self,request, id):
        component = Component.objects.get(id=id)
        if not component:
            return Response({}, status= status.HTTP_404_NOT_FOUND)

        serializer = ComponentSerializer(component,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

    def get(self,request, id):
        course = Course.objects.get(id=id)
        components = course.components
        
        serializer = ComponentSerializer(components,many=True)
        return Response({'components': serializer.data}, status=status.HTTP_200_OK)

    def delete(self,request,id):
        Component.objects.get(id=id).delete()
        response = {}
        response['details'] = 'Component Deleted'
        return Response(response, status=status.HTTP_200_OK)
        

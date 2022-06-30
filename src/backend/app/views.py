from rest_framework_simplejwt.views import TokenObtainPairView  
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser, Semester
from .serializers import SemesterSerializer

from .serializers import CustomUserSerializer
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
            user = serializer.save()
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

        

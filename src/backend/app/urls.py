from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import ComponentView, CourseView, CustomUserCreate, HelloWorldView, SemesterView

urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='create_token'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='refresh_token'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('semesters/<int:id>', SemesterView.as_view(), name='semesters'),
    path('courses/<int:id>', CourseView.as_view(), name='courses'),
    path('courses/components/<int:id>', ComponentView.as_view(), name='components')
]
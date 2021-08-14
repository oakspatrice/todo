from django.urls import path

from . import views
from rest_framework.authtoken.views import obtain_auth_token


# changes


urlpatterns = [
    path('', views.ListTodo.as_view()),
    path('<int:pk>/', views.DetailTodo.as_view()),
    path('userinfo/', views.UserInfo.as_view()),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'), 
   
]



#change 2
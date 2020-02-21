# todos/views.py
from rest_framework import generics
from django.shortcuts import get_object_or_404
from .models import Todo
from .serializers import TodoSerializer, UserInfoSerializer
from django.contrib.auth.models import User

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.contrib import auth
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated


from django.core.mail import send_mail


class ListTodo(APIView):
     
    #permission_classes = (IsAuthenticated,)
    """
    List all Todo, or create a new Todo.
    """
    def get(self, request, format=None):
           
            todo = Todo.objects.filter(owner_id= request.user.id)
            serializer = TodoSerializer(todo, many=True)
            return Response(serializer.data)

    def post(self, request, format=None):
            
            mydata = request.data
            mydata.update( {'owner' : request.user.id} )
            serializer = TodoSerializer(data=mydata)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DetailTodo(APIView):
    """
    Retrieve, update or delete a Todo instance.
    """
      

    def get(self, request, pk, format=None):
        todo = get_object_or_404(Todo, pk=pk)
        if todo.owner_id== request.user.id:
            serializer = TodoSerializer( todo )
            return Response(serializer.data)
        return Response("you are not permitted to access this resource", status=403)


    def put(self, request, pk, format=None):
        todo = get_object_or_404(Todo, pk=pk)
        
        if todo.owner_id== request.user.id:
            serializer = TodoSerializer(todo, data=request.data)
            if serializer.is_valid():
                serializer.save()


                send_mail(
                    'Mail subject',
                    'this is the mail message',
                    'testing@informationparlour.com',
                    ['oakspatrice@gmail.com', 'leotechmedia@yahoo.com'],
                    fail_silently=False,
                    auth_user= "testing@informationparlour.com",
                    auth_password="parakletos",
                    )


                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response("you are not permitted to access this resource", status=403)


    def delete(self, request, pk, format=None):
        todo = get_object_or_404(Todo, pk=pk)
        if todo.owner_id== request.user.id:
            todo.delete()
            return Response("Resource deleted Succesfully", status=204)
        return Response("you are not permitted to access this resource", status=403)




class UserInfo(APIView):


    def get(self, request, format=None): 
        user = request.user
        serializer = UserInfoSerializer(user)
        return Response(serializer.data )
# django  imports
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
#rest framework import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from  rest_framework.response import Response
from rest_framework.serializers import Serializer

from django.db import IntegrityError

# restframework jwt
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# local imports 
from app1.models import *
from app1.serializers import UserSerializers, UserSerializersWithToken

# jwt views..
class  MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs) #for validating data

        # serializing the user {} and adding token to it.
        serializer = UserSerializersWithToken(self.user)
        # serializer = UserSerializersWithToken(self.user).data
        # for k,v in serializer.items():
        #     data[k] = v
        data.update(serializer.data)

        return data
    
    @classmethod
    def get_token(cls, user):
        token=super().get_token(user)# for generating token
    
        # add custom claims
        token['username']=user.username
        token['message'] = "hello Proshop"

        return token 

# class based view for login..
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         data = super().validate(attrs)  # validates username & password

#         # Add user data
#         serializer = UserSerializersWithToken(self.user).data
#         for k, v in serializer.items():
#             data[k] = v

#         return data

#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)  # generates token

#         # Add custom claims
#         token['username'] = user.username
#         token['message'] = "hello Proshop"

#         return token

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes =[
        '/api/products/'
        '/api/products/<id>',
        '/api/users',
        '/api/users/register',
        '/api/users/login/',
        '/api/users/profile',
    ]
    return  Response(routes)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    print(data)
    try:
        user= User.objects.create(
            first_name= data['first_name'],
            last_name= data['last_name'],
            username= data['email'],
            email= data['email'],
            password= make_password(data['password']),

        )
        serializer =UserSerializersWithToken(user,many=False)
        print(serializer.data)
        return Response(serializer.data)
    
    except:
        message= {"detail":"User with this email is already registered"}
        return Response(message)

    #  data = request.data
    #  required_fields = ['first_name', 'last_name', 'email', 'password']

    # # Check for missing fields
    #  for field in required_fields:
    #     if field not in data:
    #         return Response(
    #             {"detail": f"'{field}' is required."},
    #             status=status.HTTP_400_BAD_REQUEST
    #         )

    #  try:
    #     # Check if user with the given email already exists
    #      if User.objects.filter(email=data['email']).exists():
    #         return Response(
    #             {"detail": "User with this email already exists."},
    #             status=status.HTTP_400_BAD_REQUEST
    #         )

    #      user = User.objects.create(
    #         first_name=data['first_name'],
    #         last_name=data['last_name'],
    #         username=data['email'],
    #         email=data['email'],
    #         password=make_password(data['password']),
    #     )

    #      serializer = UserSerializersWithToken(user, many=False)
    #      return Response(serializer.data, status=status.HTTP_201_CREATED)

    #  except IntegrityError:
    #     return Response(
    #         {"detail": "User with this email already exists."},
    #         status=status.HTTP_400_BAD_REQUEST
    #     )
    #  except Exception as e:
    #     return Response(
    #         {"detail": str(e)},
    #         status=status.HTTP_400_BAD_REQUEST
    #     )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user= request.User
    Serializer= UserSerializers(user,many=False)
    return Response(Serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user=request.user
    serializer=UserSerializersWithToken(user,many=False)
    data=request.data
    user.first_name= data['name']
    user.username= data['email']
    user.email = data['email']
    if data['password'] !="":
        user.password= make_password(data['password'])
    user.save()
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteUser(request,pk):
    userForDeletion  =  User.objects.get(id=pk)
    userForDeletion.delete()
    return Response("User is deleted")
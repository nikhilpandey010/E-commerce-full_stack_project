from django.urls import path
from app1.views import user_views as views

urlpatterns =[
    path('register',views.registerUser,name='register'),
    path('profile',views.getUserProfile,name='user_profile'),
    path('profile/update',views.updateUserProfile,name='user_profile_update'),
    path('login/',views.MyTokenObtainPairView.as_view(),name="userLogin"),
    path('delete/<str:pk>/',views.deleteUser,name='deleteUser'),
    

    
]


from django.urls import path
from  app1.views import payment as views

urlpatterns = [
    path('create_order/', views.create_order),
    path('verify_payment/', views.verify_payment),
]

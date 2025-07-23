from django.urls import path
from app1.views import product_views as views

urlpatterns =[
    path('',views.getProducts,name='product'),
    path('<str:pk>/reviews/',views.createProductReview,name='create_review'),
    path('top/',views.getTopProduct,name='topProduct'),
    path('<str:pk>/',views.getProduct,name='product'),
   
]
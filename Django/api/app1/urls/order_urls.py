from django.urls import path
from app1.views import order_views as views

urlpatterns =[
    path('add/',views.addOrderItems,name='orders_add'),
    path('myorders/',views.getMyOrder,name='myOrder'),
    path('<str:pk>/',views.getOrderById,name='user_order'),
    path('<str:pk>/pay/',views.updateOrderToPaid,name='pay'),





    

    
]


    

    

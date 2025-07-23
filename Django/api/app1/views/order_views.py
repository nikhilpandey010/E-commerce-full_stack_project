# django import
from django.core.exceptions import RequestDataTooBig
from django.shortcuts import render
from datetime import datetime

from rest_framework import status
#rest framework import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from  rest_framework.response import Response
from rest_framework.serializers import Serializer


# local imports 
from app1.models import *
from app1.serializers import OrderSerializer,ProductSerialisers

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user =request.user
    data= request.data
    # orderItems = data['orderItems']
    orderItems = data.get('orderItems')

    if not orderItems or len(orderItems) == 0:
        return Response({'detail': 'No order items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user =  user,
            payment_method = data['paymentMethod'],
            tax_price = data['taxPrice'],
            shipping_price = data['shippingPrice'],
            total_price = data['totalPrice']

        )

        # (2) create shipping address

        shipping = ShippingAddress.objects.create(
            order = order,
            address= data['shippingAddress']['address'],
            city= data['shippingAddress']['city'],
            postal_code=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country']


        )
        # (3) for i in order Items
        for i in orderItems:
            product = Product.objects.get(_id = i['_id'])
            item= OrderItem.objects.create(
                product=product,
                order=order,
                name= product.name,
                qty=i['qty'],
                price=product.price,

            )
            # update stock
            product.countInStock -= int(item.qty)
            product.save()
        serializer = OrderSerializer(order,many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrder(request):
    user= request.user
    orders = user.order_set.all()
    serializer= OrderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user = request.user

    try:
        order= Order.objects.get(_id=pk)
        if order.user == user:
            serializer = OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            return Response({'detail':'Not authenticated to view this order'},status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'details':'Order not exists'}, status = status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes(IsAuthenticated)
def updateOrderToPaid(request,pk):
    order = Order.objects.get(_id=pk)
    order.is_paid=True
    order.paid_at = datetime.now()
    order.save()
    return Response('Order was paid',status=status.HTTP_200_OK)



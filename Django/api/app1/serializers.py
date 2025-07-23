from django.db.models import fields
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *
from django.contrib.auth.models import User

class UserSerializers(serializers.ModelSerializer):
    name=serializers.SerializerMethodField(read_only=True)
    _id= serializers.SerializerMethodField(read_only=True)
    isAdmin= serializers.SerializerMethodField(read_only=True)
    class Meta:
        model= User
        fields = ['id','_id','username','email','name','isAdmin']
    def get_isAdmin(self,obj):
        return obj.is_staff

    def get_name(self,obj):
        name=obj.first_name
        if name == '':
            name=obj.email
        return name
    
    def get__id(self, obj):
        return obj.id
    
class UserSerializersWithToken(UserSerializers):
    token=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=User
        fields=['id','username','email','name','isAdmin', 'token']

    def get_token(self,obj):
        token= RefreshToken.for_user(obj)
        return str(token.access_token)
    
class  ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Review
        fields= "__all__"

class ProductSerialisers(serializers.ModelSerializer):
    reviews= serializers.SerializerMethodField(read_only= True)
    image = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Product
        fields= "__all__"

    def get_reviews(self,obj):
        qs = Review.objects.filter(product=obj)
        serializer = ReviewSerializer(qs, many=True)
        print("serializer",serializer.data)
        return serializer.data
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            image_url = obj.image.url
            if request:
                return request.build_absolute_uri(image_url)
            return image_url
        return None
    
class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields='__all__'
    
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrderItem
        fields= "__all__"

# class OrderSerializer(serializers.ModelSerializer):
#     orderItems= serializers.SerializerMethodField(read_only=True)
#     shippingAddress=serializers.SerializerMethodField(read_only=True)
#     User=serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = Order
#         fields='__all__'

#     def get_orderItems(self,obj):
#         items= obj.orderitem_set.all()
#         serializer=OrderItemSerializer(items,many=True)
#         return serializer.data
    
#     def get_shippingAddress(self,obj):
#         try:
#             address= ShippingAddressSerializer(obj.shippingaddress,many=False).data
#         except:
#             address= False
#         return address
    
#     def get_User(self,obj):
#         items=obj.user
#         serializer=UserSerializers(items,many=False)
#         return serializer.data




class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)  # renamed from "User"

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer=OrderItemSerializer(items,many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            return ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except Exception:
            return False

    def get_user(self, obj):  # method name now matches "user"
        return UserSerializers(obj.user, many=False).data
